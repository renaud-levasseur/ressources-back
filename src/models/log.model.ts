import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import User from './user.model';

class Log extends Model {
    public logId!: number;
    public type!: string;
    public text!: string;
    public date!: Date;
}

Log.init(
    {
        logId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Log',
        tableName: 'Log',
        timestamps: false
    }
);

Log.belongsTo(User, {foreignKey: 'userId' });

export default Log;