import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import RessourceCategory from './ressourceCategory.model';

class Category extends Model {
    public categoryId!: number;
    public name!: string;
    public description?: string;
}

Category.init(
    {
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(60),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'Category',
        timestamps: false
    }
);

Category.hasMany(RessourceCategory, { foreignKey: 'categoryId' });

export default Category;