import { Sequelize, DataTypes, Model } from "sequelize";
import sequelizeConfig from "../../sequelize.config";

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    CITIZEN = 'citizen'
}

const sequelize = new Sequelize(sequelizeConfig);

const User = sequelize.define<UserModel>('User', {
    id: { 
        type: DataTypes.INTEGER,  
        primaryKey: true,  
        autoIncrement: true 
    },
    username: { 
        type: DataTypes.STRING(30),  
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.MODERATOR, UserRole.CITIZEN),
        defaultValue: UserRole.CITIZEN
    }
});

export default User;
