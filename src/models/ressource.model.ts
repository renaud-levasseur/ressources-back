import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';
import File from './file.model';
import RessourceCategory from './ressourceCategory.model';

enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    UNLISTED = 'unlisted'
}

class Ressource extends Model {
    public ressourceId!: number;
    public title!: string;
    public content!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public visibility!: Visibility;
    public isActive!: boolean;
    public isValid!: boolean;
    public isDraft!: boolean;
}

Ressource.init(
    {
        ressourceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        visibility: {
            type: DataTypes.ENUM(...Object.values(Visibility)),
            allowNull: false,
            defaultValue: Visibility.PRIVATE,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isDraft: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName: 'Ressource',
        tableName: 'Ressource',
        timestamps: false
    }
);


Ressource.hasMany(RessourceCategory, { foreignKey: 'ressourceId' });

Ressource.hasMany(File, { foreignKey: 'ressourceId' });

Ressource.hasMany(Ressource, { foreignKey: 'masterRessourceId'});

export default Ressource;