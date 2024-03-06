import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';

class RessourceType extends Model {
    public id!: number;
    public libelle!: string;
    public description?: string;
}

RessourceType.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        libelle: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(60),
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'RessourceType',
    }
);

sequelize.sync({ force: false }).then(() => {
    console.log('RessourceType table crée!');
 }).catch((error) => {
    console.error('Unable to create table : RessourceType ', error);
 });

module.exports = RessourceType;