import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import Ressource from './ressource.model';
import User from './user.model';

export class Participation extends Model {
    public participationId!: number;
}

Participation.init(
    {
        participationId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        }
    }, 
    {
        sequelize,
        modelName: 'Participation',
        tableName: 'Participation',
        timestamps: false,
    }
);

// Association avec la ressource
Participation.belongsTo(Ressource, { foreignKey: 'ressourceId' });
// Association avec l'utilisateur
Participation.belongsTo(User, { foreignKey: 'userId' });

export default Participation;
