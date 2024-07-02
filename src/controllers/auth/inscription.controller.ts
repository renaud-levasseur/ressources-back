import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const inscription = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {username, email, password} = req.body;

        const existingUser = await prisma.user.findFirst({
            where: { 
                OR: [
                    { username: username }, 
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json('Utilisateur ou email déjà existant');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //Création de l'utilisateur
        await prisma.user.create({ 
            data: { 
                username: username,
                email: email,
                password: hashedPassword
            }
        }); 

        return res.status(201).json({ message: 'Utilisateur crée avec succès' });

    } catch (error) {
        console.error('Erreur lors de l\'inscription', error);
    }

}