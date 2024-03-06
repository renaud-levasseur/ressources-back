import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';

const RessourceType = require('./ressourceType.model');

enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    UNLISTED = 'unlisted'
}

class Ressource extends Model {
    public id!: number;
    public title!: string;
    // public content!: string;
    // public createdAt!: Date;
    // public visibility!: Visibility;
    // public isValid!: boolean;
    // public isDraft!: boolean;
}

Ressource.init(
    {
        id: {
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
    }
);

Ressource.hasOne(RessourceType, { as: 'ressourceType', foreignKey: 'ressourceTypeId' });

sequelize.sync({ force: false }).then(() => {
    console.log('Ressource table crée!');
 }).catch((error) => {
    console.error('Unable to create table : Ressource ', error);
 });

module.exports = Ressource;
