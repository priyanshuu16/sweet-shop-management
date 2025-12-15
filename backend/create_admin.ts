import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@sweet.shop';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN', // Ensure they are admin
            passwordHash: hashedPassword
        },
        create: {
            email,
            passwordHash: hashedPassword,
            role: 'ADMIN'
        },
    });

    console.log(`\n✅ Admin User Ready via Upsert!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
