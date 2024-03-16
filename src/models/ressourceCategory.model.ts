import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';

class RessourceCategory extends Model {
    public ressourceCategoryId!: number;
}

RessourceCategory.init(
    {
        ressourceCategoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        sequelize,
        modelName: 'RessourceCategory',
        tableName: 'RessourceCategory',
        timestamps: false
    }
);

export default RessourceCategory;