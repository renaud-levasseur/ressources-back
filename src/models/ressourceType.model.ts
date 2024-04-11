import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';

class RessourceType extends Model {
    public ressourceTypeId!: number;
    public name!: string;
    public description?: string;
    public isActive!: boolean;
}

RessourceType.init(
    {
        ressourceTypeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName: 'RessourceType',
        tableName: 'RessourceType',
        timestamps: false
    }
);

RessourceType.hasMany(Ressource, { foreignKey: 'ressourceTypeId' });

export default RessourceType;