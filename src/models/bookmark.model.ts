import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Bookmark extends Model {
    public bookmarkId!: number;
}

Bookmark.init(
    {
        bookmarkId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        }
    }, 
    {
        sequelize,
        modelName: 'Bookmark',
        tableName: 'Bookmark',
        timestamps: false,
    }
);

// Association avec la ressource
Bookmark.belongsTo(Ressource, { foreignKey: 'ressourceId' });
// Association avec l'utilisateur
Bookmark.belongsTo(User, { foreignKey: 'userId' });

export default Bookmark;
