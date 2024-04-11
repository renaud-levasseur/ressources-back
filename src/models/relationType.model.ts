import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';

class RelationType extends Model {
    public relationTypeId!: number;
    public name!: string;
    public description?: string;
    public isActive!: boolean;
}

RelationType.init(
    {
        relationTypeId: {
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
        modelName: 'RelationType',
        tableName: 'RelationType',
        timestamps: false
    }
);

RelationType.hasMany(Ressource, { foreignKey: 'relationTypeId' });

export default RelationType;