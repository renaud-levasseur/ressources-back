import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import RessourceType from './ressourceType.model';
// const RessourceType = require('./ressourceType.model');
// const type = RessourceType;

enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    UNLISTED = 'unlisted'
}

class Ressource extends Model {
    public ressourceId!: number;
    public title!: string;
    // public content!: string;
    // public createdAt!: Date;
    // public visibility!: Visibility;
    // public isValid!: boolean;
    // public isDraft!: boolean;
}

Ressource.init(
    {
        ressourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Ressource',
        tableName: 'Ressource',
        timestamps: false
    }
);

Ressource.hasOne(RessourceType, { as: 'ressourceType', foreignKey: 'ressourceTypeId' });

export default Ressource;