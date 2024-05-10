import { NextFunction, Request, Response } from 'express';
import passport from '../../middleware/passport-config.middleware';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../server';

export const login = async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('local', (error: any, user: any, info: { message: any; }) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.logIn(user, (error) => {
        if (error) {
            return next(error);
        }

        const rememberMe = req.body.rememberMe;

        //Si rememberMe durée du token à 10 jours sinon 24h
        const tokenDuration = rememberMe ? '10d' : '24h'; 

        //Génération du token utilisateur lors de la connexion
        const token = jwt.sign({ userId: user.id_user, role: user.role, username: user.username }, jwtSecret, {expiresIn: tokenDuration});

        return res.status(200).json({ message: 'Successfully connected', token });
        });
    })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
    req.logout(() => {}); 
    res.redirect('/home'); // Redirection de l'utilisateur vers la page d'accueil après déconnexion
};

