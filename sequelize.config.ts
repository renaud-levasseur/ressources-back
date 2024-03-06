import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "",
//   database: "ressources_db_dev",
// });

const db = new Sequelize({
  dialect: "mysql",
  host: "mysql-wrenoulleau.alwaysdata.net",
  username: "280590_admin",
  password: "Ress@2024!",
  database: "wrenoulleau_ressources",
});

export default db;