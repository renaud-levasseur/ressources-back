import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function superAdmin() {
    const superAdminUsername = 'RenaudSuperAdmin';
    const superAdminEmail = 'renaud.levasseur@viacesi.fr';
    const superAdminPassword = 'RenaudLevasseur64!';

    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    try {
        const superAdminUser = await prisma.user.create({
            data: {
                username: superAdminUsername,
                email: superAdminEmail,
                password: hashedPassword,
                role: 'SUPERADMIN',
                isActive: true,
                tokenActivation: null,
                codeForgotPassword: null,
                expirationCodeForgotPassword: null    
            }
        });
        console.log(`Utilisateur admin créé : ${superAdminUser.username} (${superAdminUser.email}) avec le mot de passe : ${superAdminPassword}`);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur superadmin : ', error);
    } finally {
        await prisma.$disconnect();
    }
}

superAdmin().catch((error) => {
    throw error;
});