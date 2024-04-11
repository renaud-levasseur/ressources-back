// Importations des dépendences
import express from 'express';
import sequelize from '../sequelize.config';
import cors from 'cors';
import passport from './middleware/passport-config.middleware';
import session from 'express-session';
import * as crypto from 'crypto';

// Importation des routes
import userRouter from './routes/user.router';
import ressourceRouter from './routes/ressource.router';
import ressourceTypeRouter from './routes/ressourceType.router';
import relationTypeRouter from './routes/relationType.router';
import fileRouter from './routes/file.router';
import categoryRouter from './routes/category.router';
import ressourceCategoryRouter from './routes/ressourceCategory.router';
import commentRouter from './routes/comment.router';
import chatRouter from './routes/chat.router';
import likeRouter from './routes/like.router';
import bookmarkRouter from './routes/bookmark.router';
import participationRouter from './routes/participation.router';
import exploitationRouter from './routes/exploitation.router';
import logRouter from './routes/log.router';
import authRouter from './routes/auth.router';

// Importation des modeles
require('./models/ressourceType.model');
require('./models/relationType.model');
require('./models/user.model');
require('./models/ressource.model');
require('./models/category.model');
require('./models/ressourceCategory.model');
require('./models/file.model');
require('./models/comment.model');
require('./models/chat.model');
require('./models/like.model');
require('./models/bookmark.model');
require('./models/participation.model');
require('./models/exploitation.model');
require('./models/log.model');

const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const jwtSecret = crypto.randomBytes(64).toString('hex'); 

app.use(session({
  secret: jwtSecret, 
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routeurs
app.use(userRouter);
app.use(ressourceRouter)
app.use(ressourceTypeRouter)
app.use(relationTypeRouter)
app.use(fileRouter)
app.use(categoryRouter)
app.use(ressourceCategoryRouter)
app.use(commentRouter)
app.use(chatRouter);
app.use(likeRouter)
app.use(bookmarkRouter)
app.use(participationRouter)
app.use(exploitationRouter)
app.use(logRouter)
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Configuration de Sequelize
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error));

// Synchronisation des modèles avec la BDD
// !**force à false pour ne pas supprimer et recrer les tables à chaque fois**!
sequelize.sync({ force: false }).then(() => {
  console.log('Tables synchronisées avec succès.');
}).catch((error) => {
  console.error('Erreur lors de la synchronisation des tables:', error);
});

// Exportations
export { jwtSecret };
export default app;