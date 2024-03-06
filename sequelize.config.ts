import { Options, Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "mysql",
  host: "mysql-wrenoulleau.alwaysdata.net",
  username: "280590_admin",
  password: "Ress@2024!",
  database: "wrenoulleau_ressources",
});

export default db;
