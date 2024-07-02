import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllerUserAdmin = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where : {
                role : 'ADMIN'
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des utilisateurs.'});
    }
}

export const getAllUsersCitizen = async (req: Request, res: Response) => { 
    try {
        const users = await prisma.user.findMany({
            where : {
                role : 'CITIZEN'
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des utilisateurs.'});
    }
}

export const getAllUsersModerator = async (req: Request, res: Response) => { 
    try {
        const users = await prisma.user.findMany({
            where : {
                role : 'MODERATOR'
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des utilisateurs.'});
    }
}

export const deleteUser = async (req: Request, res: Response) => { 
    try {
        const userId = req.params.userId;
        await prisma.user.delete({
            where: {
                id_user: parseInt(userId)
            }
        });
        res.status(200).json({message: 'Utilisateur supprimé avec succès !'});
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.'});
    }
}