import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsString, IsInt, Min } from 'class-validator';

class UpsertCartItemDto {
    @IsString()
    productId: string;

    @IsInt()
    @Min(0)
    quantity: number;
}

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getCart(@Req() req: any) {
        return this.cartService.getCart(req.user.userId);
    }

    @Post('items')
    upsertItem(@Req() req: any, @Body() dto: UpsertCartItemDto) {
        return this.cartService.updateCartItem(req.user.userId, {
            productId: dto.productId,
            quantity: dto.quantity,
        });
    }

    @Delete('items/:productId')
    @HttpCode(HttpStatus.OK)
    removeItem(@Req() req: any, @Param('productId') productId: string) {
        return this.cartService.updateCartItem(req.user.userId, {
            productId,
            quantity: 0,
        });
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    clearCart(@Req() req: any) {
        return this.cartService.clearCart(req.user.userId);
    }
}
