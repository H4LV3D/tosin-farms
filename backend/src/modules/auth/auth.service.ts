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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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

    return this.signTokens(user.id, user.email, user.role);
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
    if (!user || !(user as any).password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (user as any).password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signTokens(user.id, user.email, user.role);
  }

  // ─── Google OAuth Login ───────────────────────────────────────────────────
  async validateOAuthLogin(
    user: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

      return this.signTokens(dbUser.id, dbUser.email, dbUser.role);
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
      const payload = this.jwtService.verify(refreshToken, {
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

      return this.signTokens(user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  private signTokens(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };

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

    return { accessToken, refreshToken, role, email };
  }
}
