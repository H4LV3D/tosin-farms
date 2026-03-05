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
    return this.usersService.getAddresses(req.user.userId);
  }

  @Post('addresses')
  async addAddress(@Req() req: any, @Body() body: any) {
    return this.usersService.addAddress(req.user.userId, body);
  }

  @Put('addresses/:id')
  async updateAddress(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.usersService.updateAddress(req.user.userId, id, body);
  }

  @Delete('addresses/:id')
  async deleteAddress(@Req() req: any, @Param('id') id: string) {
    return this.usersService.deleteAddress(req.user.userId, id);
  }
}
