import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';

enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    CITIZEN = 'citizen',
}

class User extends Model {
    public userId!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public role!: UserRole;
    public joinedAt!: Date;
    public lastLoginDate!: Date;
    public isActive!: boolean;
    public tokenActivation!: string;
    public codeForgotPassword!: string;
    public expirationCodeForgotPassword!: Date; 
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: new DataTypes.STRING(255), //Ne surtout pas changer la taille du champ!
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.CITIZEN,
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lastLoginDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        tokenActivation: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        codeForgotPassword: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        expirationCodeForgotPassword: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        timestamps: false
    }
);

export default User;