import { Options } from "sequelize";

const sequelizeConfig: Options = {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "ressources_db_dev",
};

export default sequelizeConfig;
