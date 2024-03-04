import { Sequelize, DataTypes, Model } from "sequelize";

export enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    CITIZEN_USER = 'citizen user'
}

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export const User = (sequelize: Sequelize) => {
    const UserModel = sequelize.define<UserModel>('User', {
        id: { 
            type: DataTypes.INTEGER,  
            primaryKey: true,  
            allowNull: false,   
            autoIncrement: true 
        },
        username: { 
            type: DataTypes.STRING(30),  
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.MODERATOR, UserRole.CITIZEN_USER),
            defaultValue: UserRole.CITIZEN_USER
        }, 
        
    })
};
