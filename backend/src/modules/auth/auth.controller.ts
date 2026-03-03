import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

class LoginDto {
  @IsEmail({}, { message: 'A valid email address is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

class RegisterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail({}, { message: 'A valid email address is required' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─── Email / Password Register ──────────────────────────────────────────────
  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.register(
      body.email,
      body.password,
      body.name,
    );
    this.setRefreshCookie(res, data.refreshToken);

    return {
      token: data.accessToken,
      role: data.role,
      email: data.email,
    };
  }

  // ─── Email / Password Login ───────────────────────────────────────────────
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(body.email, body.password);
    this.setRefreshCookie(res, data.refreshToken);

    return {
      token: data.accessToken,
      role: data.role,
      email: data.email,
    };
  }

  // ─── Google OAuth ─────────────────────────────────────────────────────────
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Note: If google redirect lands off-domain, additional configuration is needed
    const data = await this.authService.validateOAuthLogin(req.user);
    // @ts-ignore
    this.setRefreshCookie(res, data.refreshToken);

    // Usually OAuth redirects to the frontend with an access token in URL
    // Here we'll just redirect to the frontend base path and let it fetch.
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    // @ts-ignore
    res.redirect(`${frontendUrl}?token=${data.accessToken}`);
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;
    const data = await this.authService.refreshTokens(refreshToken);

    // Rotate refresh token
    this.setRefreshCookie(res, data.refreshToken);

    return {
      token: data.accessToken,
      role: data.role,
      email: data.email,
    };
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // For cross-origin
      path: '/api/auth',
    });
    return { success: true };
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Must be true when SameSite=None
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' required for cross-domain
      path: '/api/auth', // Important: Limit cookie to auth routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matching JWT expiration)
    });
  }
}
