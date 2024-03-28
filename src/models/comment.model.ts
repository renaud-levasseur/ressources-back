import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Comment extends Model {
    public commentId!: number;
    public content!: string;
    public publishedAt!: Date;
}

Comment.init(
    {
        commentId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        publishedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, 
    {
        sequelize,
        modelName: 'Comment',
        tableName: 'Comment',
        timestamps: false,
    }
);

// Association avec la ressource
Comment.belongsTo(Ressource, { foreignKey: 'ressourceId' });
// Association avec l'utilisateur
Comment.belongsTo(User, { foreignKey: 'userId' });

export default Comment;
