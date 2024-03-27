import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../sequelize.config';
import User from './user.model';
import Ressource from './ressource.model';

export class Commentaire extends Model {
    public idComment!: number;
    public contenu!: string;
    public dateHeureCommentaire!: Date;
    public estSupprime!: boolean;
    public userId!: number; 
    public ressourceId!: number;

    
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
    timestamps: true,
    modelName: 'Commentaire',
});


Commentaire.belongsTo(User, { foreignKey: 'userId', as: 'utilisateur' });
User.hasMany(Commentaire, { foreignKey: 'userId' });

Commentaire.belongsTo(Ressource, { foreignKey: 'ressourceId', as: 'ressource' });
Ressource.hasMany(Commentaire, { foreignKey: 'ressourceId' });

sequelize.sync({ force: false }).then(() => {
    console.log('Tables synchronisées avec succès.');
  }).catch((error) => {
    console.error('Erreur lors de la synchronisation des tables:', error);
  });

export default Commentaire;
