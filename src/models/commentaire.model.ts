import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../sequelize.config';
import User from './user.model';
import Ressource from './ressource.model';

export class Commentaire extends Model {
    public idComment!: number;
    public contenu!: string;
    public dateHeureCommentaire!: Date;
    public estSupprime!: boolean;
    public userId!: number; // Clé étrangère pour le modèle User
    public ressourceId!: number; // Clé étrangère pour le modèle Ressource

    // Associations
    public getUtilisateur?: Association<Commentaire, User>;
    public getRessource?: Association<Commentaire, Ressource>;
}

Commentaire.init({
    idComment: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dateHeureCommentaire: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    estSupprime: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    ressourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Ressource,
            key: 'ressourceId',
        },
    },
}, {
    sequelize,
    tableName: 'commentaires',
    timestamps: true, // gestion automatique des champs createdAt et updatedAt
    modelName: 'Commentaire',
});

// Associations
Commentaire.belongsTo(User, { foreignKey: 'userId', as: 'utilisateur' });
User.hasMany(Commentaire, { foreignKey: 'userId' });

Commentaire.belongsTo(Ressource, { foreignKey: 'ressourceId', as: 'ressource' });
Ressource.hasMany(Commentaire, { foreignKey: 'ressourceId' });

export default Commentaire;
