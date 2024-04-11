import { Model, DataTypes } from 'sequelize';
import sequelize from '../../sequelize.config';

class File extends Model {
    public fileId!: number;
    public title!: string;
    public url!: string;
    public weight!: number;
}

File.init(
    {
        fileId: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'File',
        tableName: 'File',
        timestamps: false
    }
);

export default File;