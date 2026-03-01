import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  // ─── Email / Password Login ───────────────────────────────────────────────
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  // ─── Google OAuth Login ───────────────────────────────────────────────────
  async validateOAuthLogin(user: any): Promise<{ token: string }> {
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

      return this.signToken(dbUser.id, dbUser.email, dbUser.role);
    } catch {
      throw new InternalServerErrorException('Failed to validate OAuth login');
    }
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  private signToken(id: string, email: string, role: string) {
    const payload = { sub: id, email, role };
    return { token: this.jwtService.sign(payload), role, email };
  }
}
