import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

@Injectable()
export class CartService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cacheManager.get<Cart>(`cart:${userId}`);
    return cart || { items: [] };
  }

  async updateCartItem(userId: string, item: CartItem): Promise<Cart> {
    const cart = await this.getCart(userId);
    const existingItemIndex = cart.items.findIndex(
      (i) => i.productId === item.productId,
    );

    if (existingItemIndex > -1) {
      if (item.quantity <= 0) {
        cart.items.splice(existingItemIndex, 1);
      } else {
        cart.items[existingItemIndex].quantity = item.quantity;
      }
    } else if (item.quantity > 0) {
      cart.items.push(item);
    }

    await this.cacheManager.set(`cart:${userId}`, cart);
    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    await this.cacheManager.del(`cart:${userId}`);
  }
}
