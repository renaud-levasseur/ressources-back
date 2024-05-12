import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create new Ressource
export const createRessource = async (req: Request, res: Response) => {
    try {

        const userId = req.params.userId;
        console.log('userId:', userId);
        const title = req.body.title;
        const description = req.body.description;
        const visibility = req.body.visibility;
        const category = req.body.category;
        const type = req.body.type;
        const relations = req.body.relations;
        
        const existingRessource = await prisma.ressource.findFirst({ where: { title: title } });
        if (existingRessource) {
            res.status(409).json({message: 'Une ressource avec ce titre existe déjà.'});
            return;
        }

        const newRessource = await prisma.ressource.create({
            data: {
                title,
                description,
                visibility,
                category,
                type,
                relations,
                user_id: parseInt(userId),
                createdAt: new Date(),
            }
        });

        //Upload des fichiers avec le middleware multer dans le dossier uploads
        const files = req.files as Express.Multer.File[];

        if (files) {
            for (let file of files) {
                await prisma.file.create({
                    data: {
                        name: file.originalname,
                        path: file.path,
                        type: file.mimetype,
                        size: file.size,
                        ressource_id: newRessource.id_ressource
                    }
                });
            }
        }

        res.status(201).json({message: 'Ressource créé avec succès !', data: newRessource});
    
    } catch (error) {
        console.error("Erreur lors de la création de la ressource", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la création de la ressource.'});
    }
};

//Get All Ressources
export const getAllRessources = async (_req: Request, res: Response) => {
    try {
        const ressources = await prisma.ressource.findMany({
            include: {
                user: true,
                files: true
            }
        });

        res.status(200).json(ressources);
    } catch (error) {
        console.error("Erreur lors de la récupération des ressources", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des ressources.'});
    }
}

//Get Ressource by id
export const getRessourceById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const ressource = await prisma.ressource.findUnique({
            where: { id_ressource: Number(id) },
            include: {
                user: true,
                files: true
            }
        });

        if (!ressource) {
            res.status(404).json({message: 'Ressource non trouvée.'});
            return;
        }

        res.status(200).json(ressource);
    } catch (error) {
        console.error("Erreur lors de la récupération de la ressource", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération de la ressource.'});
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const sendCommentRessource = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const ressourceId = req.params.ressourceId;
        const content = req.body.comment;

        const newComment = await prisma.comment.create({
            data: {
                content: content,
                user_id: parseInt(userId),
                ressource_id: parseInt(ressourceId),
                createdAt: new Date()
            },
            include: {
                user: true
            }
        });

        res.status(201).json({message: 'Commentaire ajouté avec succès !', data: newComment});
    } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire", error);
        res.status(500).json({message: 'Une erreur est survenue lors de l\'ajout du commentaire.'});
    }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const getCommentsByRessourceId = async (req: Request, res: Response) => { 
    try {
        const ressourceId = req.params.ressourceId;
        const comments = await prisma.comment.findMany({
            where: { 
                ressource_id: parseInt(ressourceId) 
            },
            include: {
                user: true
            }
        });
        res.status(200).json(comments);
    } catch (error) { 
        console.error("Erreur lors de la récupération des commentaires", error);
        res.status(500).json({message: 'Une erreur est survenue lors de la récupération des commentaires.'});
    }
}

export const toggleLikeRessource = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const ressourceId = req.params.ressourceId;

        const existingLike = await prisma.like.findFirst({
            where: {
                user_id: parseInt(userId),
                ressource_id: parseInt(ressourceId)
            }
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id_like: existingLike.id_like
                }
            });

            res.status(200).json({message: 'Like retiré avec succès !'});
        } else {
            await prisma.like.create({
                data: {
                    user_id: parseInt(userId),
                    ressource_id: parseInt(ressourceId),
                }
            });

            res.status(201).json({message: 'Like ajouté avec succès !'});
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du like", error);
        res.status(500).json({message: 'Une erreur est survenue lors de l\'ajout du like.'});
    }
}

export const toggleFavoriteRessource = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const ressourceId = req.params.ressourceId;

        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                user_id: parseInt(userId),
                ressource_id: parseInt(ressourceId)
            }
        });

        if (existingFavorite) {
            await prisma.favorite.delete({
                where: {
                    id_favorite: existingFavorite.id_favorite
                }
            });

            res.status(200).json({message: 'Favoris retiré avec succès !'});
        } else {
            await prisma.favorite.create({
                data: {
                    user_id: parseInt(userId),
                    ressource_id: parseInt(ressourceId),
                }
            });

            res.status(201).json({message: 'Favoris ajouté avec succès !'});
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du favoris", error);
        res.status(500).json({message: 'Une erreur est survenue lors de l\'ajout du favoris.'});
    }
}