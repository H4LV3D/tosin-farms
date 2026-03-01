import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateOAuthLogin(user: any): Promise<{ token: string }> {
    try {
      // Here, you would normally check if the user exists in the Users DB,
      // and if not, create a new User record via UsersService.
      // For brevity, we assume the user object is valid.
      console.log('Validating Google User:', user);

      const payload = {
        sub: user.googleId || user.email,
        email: user.email,
        role: 'USER',
      };

      const jwt = this.jwtService.sign(payload);
      return { token: jwt };
    } catch (err) {
      throw new InternalServerErrorException('Failed to validate OAuth login');
    }
  }
}
