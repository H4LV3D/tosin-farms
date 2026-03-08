import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [totalRevenue, totalOrders, totalProducts, totalCustomers] =
      await Promise.all([
        this.prisma.order.aggregate({
          _sum: { totalAmount: true },
          where: {
            status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
          },
        }),
        this.prisma.order.count(),
        this.prisma.product.count(),
        this.prisma.user.count({
          where: { role: 'USER' },
        }),
      ]);

    return {
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
    };
  }

  async getMonthlyAnalytics() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await this.prisma.order.findMany({
      where: {
        createdAt: { gte: sixMonthsAgo },
        status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const monthlyData: Record<
      string,
      { month: string; revenue: number; orders: number }
    > = {};

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString('default', { month: 'short' });
      monthlyData[monthName] = { month: monthName, revenue: 0, orders: 0 };
    }

    orders.forEach((order) => {
      const monthName = order.createdAt.toLocaleString('default', {
        month: 'short',
      });
      if (monthlyData[monthName]) {
        monthlyData[monthName].revenue += order.totalAmount;
        monthlyData[monthName].orders += 1;
      }
    });

    return Object.values(monthlyData);
  }

  async getOrderStatusAnalytics() {
    const stats = await this.prisma.order.groupBy({
      by: ['status'],
      _count: true,
    });

    const colors = {
      PENDING: '#f59e0b', // amber-500
      PAID: '#10b981', // emerald-500
      SHIPPED: '#3b82f6', // blue-500
      DELIVERED: '#8b5cf6', // violet-500
      CANCELLED: '#ef4444', // red-500
    };

    return stats.map((s) => ({
      name: s.status,
      value: s._count,
      fill: colors[s.status] || '#94a3b8',
    }));
  }

  async getTopProducts() {
    const topItems = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const products = await Promise.all(
      topItems.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });
        const revenue = await this.prisma.orderItem.aggregate({
          _sum: { price: true }, // This is per item, we actually need price * quantity
          where: { productId: item.productId },
        });

        // Let's do a more accurate revenue calculation
        const items = await this.prisma.orderItem.findMany({
          where: { productId: item.productId },
        });
        const totalRevenue = items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0,
        );

        return {
          name: product?.name || 'Unknown',
          sold: item._sum.quantity || 0,
          revenue: totalRevenue,
        };
      }),
    );

    return products;
  }

  async getRecentOrders() {
    return this.prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { id: true, name: true, images: true },
            },
          },
        },
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { id: true, name: true, images: true },
            },
          },
        },
      },
    });
  }

  async getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { id: true, name: true, images: true },
            },
          },
        },
      },
    });
  }

  async updateOrderStatus(id: string, status: any) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });
  }

  async getUserDetail(id: string) {
    // Note: This matches AdminUserDetail in frontend
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return user;
  }
}
