import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  constructor(private readonly authService: AuthService) { }

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
      id: data.id,
      token: data.accessToken,
      role: data.role,
      email: data.email,
      name: data.name,
    };
  }

  // ─── Email / Password Login ───────────────────────────────────────────────
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(body.email, body.password);
    this.setRefreshCookie(res, data.refreshToken);

    return {
      id: data.id,
      token: data.accessToken,
      role: data.role,
      email: data.email,
      name: data.name,
    };
  }

  // ─── Google OAuth ─────────────────────────────────────────────────────────
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Note: If google redirect lands off-domain, additional configuration is needed
    const user = req.user as {
      email: string;
      displayName?: string;
      googleId: string;
    };
    const data = await this.authService.validateOAuthLogin(user);
    this.setRefreshCookie(res, data.refreshToken);

    // Usually OAuth redirects to the frontend with an access token in URL
    // Here we'll just redirect to the frontend base path and let it fetch.
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}?token=${data.accessToken}`);
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookies = req.cookies as Record<string, string> | undefined;
    const refreshToken = cookies?.refreshToken;
    const data = await this.authService.refreshTokens(refreshToken as string);

    // Rotate refresh token
    this.setRefreshCookie(res, data.refreshToken);

    return {
      id: data.id,
      token: data.accessToken,
      role: data.role,
      email: data.email,
      name: data.name,
    };
  }

  // ─── WebAuthn (Passkeys) ────────────────────────────────────────────────
  @Get('passkey/register-options')
  @UseGuards(AuthGuard('jwt')) // Ensure user is logged in to register a passkey
  async getRegistrationOptions(@Req() req: any) {
    return this.authService.getRegistrationOptions(req.user.userId || req.user.sub);
  }

  @Post('passkey/register-verify')
  @UseGuards(AuthGuard('jwt'))
  async verifyRegistration(@Req() req: any, @Body() body: any) {
    return this.authService.verifyRegistration(req.user.userId || req.user.sub, body);
  }

  @Post('passkey/login-options')
  async getAuthenticationOptions(@Body() body: { email?: string }) {
    return this.authService.getAuthenticationOptions(body.email);
  }

  @Post('passkey/login-verify')
  @HttpCode(HttpStatus.OK)
  async verifyAuthentication(
    @Body() body: { response: any; email?: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.verifyAuthentication(body.response, body.email);
    this.setRefreshCookie(res, data.refreshToken);

    return {
      id: data.id,
      token: data.accessToken,
      role: data.role,
      email: data.email,
      name: data.name,
    };
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // For cross-origin
      path: '/',
    });
    return { success: true };
  }

  // ─── Helper ───────────────────────────────────────────────────────────────
  private setRefreshCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Must be true when SameSite=None
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' required for cross-domain
      path: '/', // Changed to / so Next.js server actions / layouts can read it
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matching JWT expiration)
    });
  }
}
