import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getAllComments = async (req: Request, res: Response) => { 
    try {
        const comments = await prisma.comment.findMany(
            {
                include: {
                    user: true,
                    ressource: true
                }
            }
        );
        res.status(200).json(comments);
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des commentaires.'});
    }
}

export const deleteComment = async (req: Request, res: Response) => { 
    try {
        const commentId = req.params.commentId;
        await prisma.comment.delete({
            where: {
                id_comment: parseInt(commentId)
            }
        });
        res.status(200).json({message: 'Commentaire supprimé avec succès !'});
    } catch (error) {
        console.error("Erreur lors de la suppression du commentaire", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du commentaire.'});
    }
}

export const getAllRessources = async (req: Request, res: Response) => { 
    try {
        const ressources = await prisma.ressource.findMany();
        res.status(200).json(ressources);
    } catch (error) {
        console.error("Erreur lors de la récupération des ressources", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des ressources.'});
    }
}

export const deleteRessource = async (req: Request, res: Response) => { 
    try {
        const ressourceId = req.params.ressourceId;
        await prisma.ressource.delete({
            where: {
                id_ressource: parseInt(ressourceId)
            }
        });
        res.status(200).json({message: 'Ressource supprimée avec succès !'});
    } catch (error) {
        console.error("Erreur lors de la suppression de la ressource", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de la ressource.'});
    }
}