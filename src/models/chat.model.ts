import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Chat extends Model {
    public chatId!: number;
    public content!: string;
    public sentAt!: Date;
    public userId!: number;
    public resourceId!: number;
}

Chat.init(
    {
        chatId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sentAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: User, key: 'id' }, 
        },
        resourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: { model: Ressource, key: 'resourceId' }, 
        },
    }, 
    {
        sequelize,
        modelName: 'Chat',
        tableName: 'Chat',
        timestamps: false,
    }
);

// Association avec la ressource
Chat.belongsTo(Ressource, { foreignKey: 'resourceId', as: 'resource' }); 
// Association avec l'utilisateur
Chat.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 

export default Chat;
