import { Request, Response } from 'express';
import Like from '../models/like.model';

// Create
export const createLike = async (req: Request, res: Response) => {
    try {
        const newLike = await Like.create(req.body);
        res.status(201).json({message: 'Like ajouté avec succès !', data: newLike});
    } catch (error) {
        res.status(400).json({error: 'La création du like à échouée.'});
    }
};

// GetAll
export const getLikes = async (req: Request, res: Response) => {
    try {
        const likes = await Like.findAll();
        res.json(likes);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des likes.'});
    }
};

// GetLikesByRessourceId
export const GetLikesByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const likes = await Like.findAll({where : {ressourceId : id}});
        res.json(likes);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des likes de la ressource fournie.'});
    }
};

// GetLikesByUserId
export const GetLikesByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const likes = await Like.findAll({where : {userId : id}});
        res.json(likes);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des likes de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getLikeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const like = await Like.findByPk(id);
    
    if (!like) {
        res.status(404).json({error: 'Like introuvable.'});
    } else {
        res.json(like);
    }
};

// Delete
export const deleteLike = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const like = await Like.findByPk(id);

    if (!like) {
        res.status(404).json({message: 'Like introuvable.'});
        return;
    }

    try {
        await like.destroy();
        res.status(200).json({message: 'Like supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du like.'});
    }
};
