import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Like extends Model {
    public likeId!: number;
}

Like.init(
    {
        likeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        }
    }, 
    {
        sequelize,
        modelName: 'Like',
        tableName: 'Like',
        timestamps: false,
    }
);

// Association avec la ressource
Like.belongsTo(Ressource, { foreignKey: 'ressourceId' });
// Association avec l'utilisateur
Like.belongsTo(User, { foreignKey: 'userId' });

export default Like;
