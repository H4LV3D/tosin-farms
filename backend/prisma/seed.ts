import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = 'admin@tosinfarms.com';
    const adminPassword = 'Admin@1234';

    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existing) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = await prisma.user.create({
            data: {
                email: adminEmail,
                name: 'Admin',
                password: hashedPassword,
                role: Role.ADMIN,
            },
        });
        console.log(`✅  Admin user created: ${admin.email}`);
    } else {
        console.log(`ℹ️  Admin user already exists: ${existing.email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
