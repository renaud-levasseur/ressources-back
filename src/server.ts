// Importations des dépendences
import express from 'express';
import cors from 'cors';
import passport from './middleware/passport-config.middleware';
import session from 'express-session';
import * as crypto from 'crypto';
import dotenv from 'dotenv';

// Importation des routes
import userRouter from './routes/user.router';
import ressourceRouter from './routes/ressource.router';
import authRouter from './routes/auth.router';

const app = express();
const bodyParser = require('body-parser');
const port = 3000;

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex'); 

app.use(session({
  secret: jwtSecret, 
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
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
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


export { jwtSecret };
export default app;