import bcrypt from 'bcrypt';
import User from '../src/models/user.model';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://280590_admin:Ress@2024!@mysql-wrenoulleau.alwaysdata.net/wrenoulleau_ressources');

async function superAdmin() {
    const superAdminUsername = 'RenaudSuperAdmin';
    const superAmdinEmail = 'renaud.levasseur@viacesi.fr';
    const superAdminPassword = 'Renaud.3';

    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    try {
        const superAdminUser = await User.create({
            username: superAdminUsername,
            email: superAmdinEmail,
            password: hashedPassword,
            role: 'SUPERADMIN',
            isActive: true,
            tokenActivation: null,
            codeForgotPassword: null,
            expirationCodeForgotPassword: null
        });
        console.log(`Utilisateur admin créé : ${superAdminUser.username} (${superAdminUser.email})`);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur superadmin : ', error);
    } finally {
        await sequelize.close();
    }
}

superAdmin().catch((error) => {
    throw error;
});