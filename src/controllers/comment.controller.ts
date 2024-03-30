import { Request, Response } from 'express';
import Comment from '../models/comment.model';

// Create
export const createComment = async (req: Request, res: Response) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json({message: 'Commentaire créé avec succès !', data: newComment});
    } catch (error) {
        res.status(400).json({error: 'La création du commentaire à échouée.'});
    }
};

// GetAll
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des commentaires.'});
    }
};

// GetCommentsByRessourceId
export const GetCommentsByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const comments = await Comment.findAll({where : {ressourceId : id}});
        res.json(comments);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des commentaires de la ressource fournie.'});
    }
};

// GetCommentsByUserId
export const GetCommentsByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const comments = await Comment.findAll({where : {userId : id}});
        res.json(comments);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des commentaires de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
        res.status(404).json({error: 'Commentaire introuvable.'});
    } else {
        res.json(comment);
    }
};

// Update
export const updateComment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = await Comment.findByPk(id);

    if (!comment) {
        res.status(404).json({error: 'Commentaire introuvable.'});
        return;
    }

    try{
        await comment.update(req.body);
        res.json({message: 'Commentaire modifié avec succès !', data: comment});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du commentaire.'});
    }
};

// Delete
export const deleteComment = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = await Comment.findByPk(id);

    if (!comment) {
        res.status(404).json({message: 'Commentaire introuvable.'});
        return;
    }

    try {
        await comment.destroy();
        res.status(200).json({message: 'Commentaire supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du commentaire.'});
    }
};
