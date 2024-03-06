import express, { Request, Response } from 'express';
import sequelize from '../sequelize.config';

const RessourceType = require('./models/ressourceType.model');
const Ressource = require('./models/ressource.model');

const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

//Synchronisation des modèles avec la base de données
// !**force à false pour ne pas supprimer et recrée les tables à chaque fois**!
sequelize.sync({ force: false }).then(() => {
  console.log('Tables synchronisées avec succès.');
}).catch((error) => {
  console.error('Erreur lors de la synchronisation des tables:', error);
});

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error));
