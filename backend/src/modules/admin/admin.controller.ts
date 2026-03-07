import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('stats')
    async getStats() {
        return this.adminService.getStats();
    }

    @Get('analytics/monthly')
    async getMonthlyAnalytics() {
        return this.adminService.getMonthlyAnalytics();
    }

    @Get('analytics/order-status')
    async getOrderStatusAnalytics() {
        return this.adminService.getOrderStatusAnalytics();
    }

    @Get('analytics/top-products')
    async getTopProducts() {
        return this.adminService.getTopProducts();
    }

    @Get('orders/recent')
    async getRecentOrders() {
        return this.adminService.getRecentOrders();
    }

    @Get('orders')
    async getAllOrders() {
        return this.adminService.getAllOrders();
    }

    @Get('orders/:id')
    async getOrder(@Param('id') id: string) {
        return this.adminService.getOrderById(id);
    }

    @Patch('orders/:id/status')
    async updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ) {
        return this.adminService.updateOrderStatus(id, status);
    }

    @Get('users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Get('users/:id')
    async getUserDetail(@Param('id') id: string) {
        return this.adminService.getUserDetail(id);
    }
}
