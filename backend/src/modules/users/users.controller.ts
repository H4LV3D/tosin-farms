import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('addresses')
  async getAddresses(@Req() req: any) {
    return this.usersService.getAddresses(req.user.userId || req.user.sub);
  }

  @Post('addresses')
  async addAddress(@Req() req: any, @Body() body: any) {
    return this.usersService.addAddress(req.user.userId || req.user.sub, body);
  }

  @Put('addresses/:id')
  async updateAddress(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.usersService.updateAddress(
      req.user.userId || req.user.sub,
      id,
      body,
    );
  }

  @Delete('addresses/:id')
  async deleteAddress(@Req() req: any, @Param('id') id: string) {
    return this.usersService.deleteAddress(req.user.userId || req.user.sub, id);
  }

  @Put('profile')
  async updateProfile(@Req() req: any, @Body() body: any) {
    return this.usersService.updateProfile(
      req.user.userId || req.user.sub,
      body,
    );
  }

  @Get('wishlist')
  async getWishlist(@Req() req: any) {
    return this.usersService.getWishlist(req.user.userId || req.user.sub);
  }

  @Post('wishlist/:productId')
  async addToWishlist(@Req() req: any, @Param('productId') productId: string) {
    return this.usersService.addToWishlist(
      req.user.userId || req.user.sub,
      productId,
    );
  }

  @Delete('wishlist/:productId')
  async removeFromWishlist(
    @Req() req: any,
    @Param('productId') productId: string,
  ) {
    return this.usersService.removeFromWishlist(
      req.user.userId || req.user.sub,
      productId,
    );
  }

  @Get('passkey-status')
  async getPasskeyStatus(@Req() req: any) {
    return this.usersService.getPasskeyStatus(req.user.userId || req.user.sub);
  }
}
