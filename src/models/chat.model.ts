import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Chat extends Model {
    public chatId!: number;
    public content!: string;
    public sentAt!: Date;
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
        }
    }, 
    {
        sequelize,
        modelName: 'Chat',
        tableName: 'Chat',
        timestamps: false,
    }
);

// Association avec la ressource
Chat.belongsTo(Ressource, { foreignKey: 'ressourceId' }); 
// Association avec l'utilisateur
Chat.belongsTo(User, { foreignKey: 'userId' }); 

export default Chat;
