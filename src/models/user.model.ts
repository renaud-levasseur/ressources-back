import { Model, DataTypes } from 'sequelize';
import db from '../../sequelize.config';


enum UserRole {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    CITIZEN = 'citizen',
}

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public role!: UserRole;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(UserRole)),
            allowNull: false,
            defaultValue: UserRole.CITIZEN,
        },
    },
    {
        db,
        modelName: 'User',
    }
);

export default User;
