import { Request, Response } from 'express';
import Commentaire from '../models/commentaire.model';
import Ressource from '../models/ressource.model';
import User from '../models/user.model'; 

export const addCommentaire = async (req: Request, res: Response) => {
    try {
        const { contenu, userId, ressourceId } = req.body;
        const newCommentaire = await Commentaire.create({ contenu, userId, ressourceId });
        return res.status(201).json({ message: 'Commentaire ajouté avec succès', data: newCommentaire });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Erreur lors de l\'ajout du commentaire' });
    }
};


export const getComments = async (_req: Request, res: Response) => {
    try {
        const comments = await Commentaire.findAll();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commentaires.' });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await Commentaire.update(req.body, { where: { idComment: id } });
        if (updated[0] > 0) {
            res.json({ message: 'Commentaire mis à jour avec succès !' });
        } else {
            res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire.' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Commentaire.destroy({ where: { idComment: id } });
        if (deleted) {
            res.status(200).json({ message: 'Commentaire supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Commentaire non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du commentaire.' });
    }
};
