import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model';
import { Op } from 'sequelize';


export const inscription = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({
            where: { 
                //Utilisation opérateur OU de sequelize pour vérifier que l'username OU l'email n'existe pas déjà
                [Op.or]: [
                    { username }, 
                    { email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json('Username or Email already in use');
        }

        await User.create({ username, email, password });

        return res.status(201).json({ message: 'User successfully created' });

    } catch (error) {
        console.error('Error on inscription', error);
    }


}