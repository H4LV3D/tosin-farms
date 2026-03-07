import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

interface IAuthenticator {
  credentialID: string;
  credentialPublicKey: Buffer;
  counter: bigint;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports: string[];
  userId: string;
}
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';

@Injectable()
export class AuthService {
  private readonly rpID: string;
  private readonly origin: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.rpID = this.configService.get<string>('RP_ID') || 'localhost';
    this.origin =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  }

  // ─── WebAuthn Registration ────────────────────────────────────────────────
  async getRegistrationOptions(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { authenticators: true },
    });

    if (!user) throw new BadRequestException('User not found');

    // Cast with type local to avoid generic Prisma return type issues with `include`
    const userWithAuths = user as User & { authenticators: IAuthenticator[] };

    const options = await generateRegistrationOptions({
      rpName: 'Tosi Farms',
      rpID: this.rpID,
      userID: new Uint8Array(Buffer.from(user.id)),
      userName: user.email,
      userDisplayName: user.name || user.email,
      attestationType: 'none',
      excludeCredentials: userWithAuths.authenticators.map(
        (auth: IAuthenticator) => ({
          id: auth.credentialID,
          type: 'public-key',
        }),
      ),
      authenticatorSelection: {
        residentKey: 'required',
        userVerification: 'preferred',
      },
    });

    // Store challenge
    await this.prisma.passkeyChallenge.upsert({
      where: { userId: user.id },
      update: { challenge: options.challenge },
      create: { userId: user.id, challenge: options.challenge },
    });

    return options;
  }

  async verifyRegistration(userId: string, body: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException('User not found');

    const challenge = await this.prisma.passkeyChallenge.findUnique({
      where: { userId: user.id },
    });

    if (!challenge) throw new BadRequestException('Challenge not found');

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: body,
        expectedChallenge: challenge.challenge,
        expectedOrigin: this.origin,
        expectedRPID: this.rpID,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Verification failed');
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credential, credentialDeviceType, credentialBackedUp } =
        registrationInfo;

      const {
        id: credentialID,
        publicKey: credentialPublicKey,
        counter,
      } = credential;

      await this.prisma.authenticator.create({
        data: {
          userId: user.id,
          credentialID:
            typeof credentialID === 'string'
              ? credentialID
              : isoBase64URL.fromBuffer(credentialID),
          credentialPublicKey: Buffer.from(credentialPublicKey),
          counter: BigInt(counter),
          credentialDeviceType,
          credentialBackedUp,
          transports: body.response.transports || [],
        },
      });

      // Clear challenge
      await this.prisma.passkeyChallenge.delete({ where: { userId: user.id } });
    }

    return { verified };
  }

  // ─── WebAuthn Authentication ──────────────────────────────────────────────
  async getAuthenticationOptions(email?: string) {
    let userAuthenticators: { credentialID: string; transports?: string[] }[] =
      [];
    let userId: string | null = null;

    if (email) {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: { authenticators: true },
      });
      if (user) {
        userId = user.id;
        userAuthenticators = (
          user as User & { authenticators: IAuthenticator[] }
        ).authenticators.map((auth: IAuthenticator) => ({
          credentialID: auth.credentialID,
          transports: auth.transports,
        }));
      }
    }

    const options = await generateAuthenticationOptions({
      rpID: this.rpID,
      allowCredentials: userAuthenticators.map((auth) => ({
        id: auth.credentialID,
        type: 'public-key' as const,
        transports: auth.transports as any,
      })),
      userVerification: 'preferred',
    });

    if (userId) {
      await this.prisma.passkeyChallenge.upsert({
        where: { userId },
        update: { challenge: options.challenge },
        create: { userId, challenge: options.challenge },
      });
      return options;
    }

    // No email / user unknown — store an anonymous challenge keyed by its own id.
    // The id is returned as a sessionToken so the client can send it back on verify.
    const record = await this.prisma.passkeyChallenge.create({
      data: { challenge: options.challenge },
    });

    return { ...options, sessionToken: record.id };
  }

  async verifyAuthentication(body: any, _email?: string, sessionToken?: string) {
    // Find authenticator
    const credentialID = body.id;
    const auth = await this.prisma.authenticator.findUnique({
      where: { credentialID },
      include: { user: true },
    });

    if (!auth) throw new BadRequestException('Authenticator not found');

    // Look up challenge: first by userId (email-based flow), then by sessionToken (anonymous flow)
    let challenge = await this.prisma.passkeyChallenge.findUnique({
      where: { userId: auth.userId },
    });

    if (!challenge && sessionToken) {
      challenge = await this.prisma.passkeyChallenge.findUnique({
        where: { id: sessionToken },
      });
    }

    if (!challenge) throw new BadRequestException('Challenge not found');

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge: challenge.challenge,
        expectedOrigin: this.origin,
        expectedRPID: this.rpID,
        credential: {
          id: auth.credentialID, // base64url string
          publicKey: new Uint8Array(auth.credentialPublicKey),
          counter: Number(auth.counter),
          transports: auth.transports as any,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Authentication failed');
    }

    const { verified, authenticationInfo } = verification;

    if (verified) {
      // Update counter
      await this.prisma.authenticator.update({
        where: { credentialID: auth.credentialID },
        data: { counter: BigInt(authenticationInfo.newCounter) },
      });

      // Clear challenge (use id since userId may be null for anonymous flow)
      await this.prisma.passkeyChallenge.delete({
        where: { id: challenge.id },
      });

      return this.signTokens(
        auth.user.id,
        auth.user.email,
        auth.user.role,
        auth.user.name,
      );
    }

    throw new UnauthorizedException('Authentication failed');
  }

  // ─── Legacy methods ───────────────────────────────────────────────

  // ─── Email / Password Register ──────────────────────────────────────────────
  async register(email: string, password: string, name?: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, name: name ?? email, password: hashedPassword },
    });

    return this.signTokens(user.id, user.email, user.role, user.name);
  }

  // ─── Email / Password Login ───────────────────────────────────────────────
  async login(email: string, password: string) {
    if (!email) throw new BadRequestException('Email is required');

    const user = await this.prisma.user.findUnique({
      where: { email },
      // Optional: if password is omitted from default Prisma selects, force inclusion here
      // select: { id: true, email: true, role: true, password: true }
    });

    // We cast user here if password is normally omitted, but `findUnique` typically returns all
    // scalars unless specified otherwise. We'll use any to bypass strict type omitted-password issues,
    // or properly check if it exists in the type if Prisma schema omits it.
    const userWithPassword = user as unknown as {
      password?: string;
      name?: string | null;
    };
    if (!user || !userWithPassword.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signTokens(
      user.id,
      user.email,
      user.role,
      userWithPassword.name ?? null,
    );
  }

  // ─── Google OAuth Login ───────────────────────────────────────────────────
  async validateOAuthLogin(user: {
    email: string;
    displayName?: string;
    googleId: string;
  }): Promise<{
    id: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
    name: string;
  }> {
    try {
      let dbUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        dbUser = await this.prisma.user.create({
          data: {
            email: user.email,
            name: user.displayName || user.email,
            googleId: user.googleId,
          },
        });
      }

      return this.signTokens(dbUser.id, dbUser.email, dbUser.role, dbUser.name);
    } catch {
      throw new InternalServerErrorException('Failed to validate OAuth login');
    }
  }

  // ─── Token Refresh ────────────────────────────────────────────────────────
  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const payload = this.jwtService.verify<{ sub: string }>(refreshToken, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.signTokens(user.id, user.email, user.role, user.name);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  private signTokens(
    id: string,
    email: string,
    role: string,
    name: string | null,
  ): {
    id: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
    name: string;
  } {
    const payloadName = name || email;
    const payload = { sub: id, email, role, name: payloadName };

    // Configurable secrets + fallbacks if not explicitly defined differently
    const accessSecret =
      this.configService.get<string>('JWT_SECRET') || 'placeholder-secret';
    const refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') || accessSecret;

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: '15m', // Short-lived access token
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: '7d', // Long-lived refresh token
    });

    return { id, accessToken, refreshToken, role, email, name: payloadName };
  }
}
