import express, { Request, Response } from 'express';
import sequelize from '../sequelize.config';
import userRouter from './routes/user.router';
import ressourceRouter from './routes/ressource.router';
import ressourceTypeRouter from './routes/ressourceType.router';
import relationTypeRouter from './routes/relationType.router';
import fileRouter from './routes/file.router';
import categoryRouter from './routes/category.router';
import ressourceCategoryRouter from './routes/ressourceCategory.router';

// Importation des modeles
require('./models/ressourceType.model');
require('./models/relationType.model');
require('./models/user.model');
require('./models/ressource.model');
require('./models/category.model');
require('./models/ressourceCategory.model');
require('./models/file.model');

const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

// Routeurs
app.use(userRouter);
app.use(ressourceRouter)
app.use(ressourceTypeRouter)
app.use(relationTypeRouter)
app.use(fileRouter)
app.use(categoryRouter)
app.use(ressourceCategoryRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error));

//Synchronisation des modèles avec la base de données
// !**force à false pour ne pas supprimer et recrée les tables à chaque fois**!
sequelize.sync({ force: false }).then(() => {
  console.log('Tables synchronisées avec succès.');
}).catch((error) => {
  console.error('Erreur lors de la synchronisation des tables:', error);
});