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
