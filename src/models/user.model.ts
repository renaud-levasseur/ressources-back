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
    public role!: UserRole;
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
            type: new DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: new DataTypes.STRING(30),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.CITIZEN,
        },
        isActive: {
            type: new DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        tokenActivation: {
            type: new DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        codeForgotPassword: {
            type: new DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        expirationCodeForgotPassword: {
            type: new DataTypes.DATE,
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