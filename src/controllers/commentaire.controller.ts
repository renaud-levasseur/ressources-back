import { Request, Response } from 'express';
import Commentaire from '../models/commentaire.model';
import User from '../models/user.model';
import Ressource from '../models/ressource.model';

export const createCommentaire = async (req: Request, res: Response) => {
    try {
        // Ici, vous pourriez vouloir vérifier si la ressource existe
        const { contenu, userId, ressourceId } = req.body;

        // Vous pourriez également vérifier si l'utilisateur existe
        const existingUser = await User.findByPk(userId);
        if (!existingUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Et si la ressource existe
        const existingRessource = await Ressource.findByPk(ressourceId);
        if (!existingRessource) {
            return res.status(404).json({ message: 'Ressource non trouvée.' });
        }

        // Si tout est en ordre, créez le commentaire
        const newCommentaire = await Commentaire.create({
            contenu,
            userId,
            ressourceId,
            dateHeureCommentaire: new Date(), // ou laisser Sequelize mettre la valeur par défaut
        });
        res.status(201).json({ message: 'Commentaire créé avec succès !', data: newCommentaire });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'La création du commentaire a échoué.' });
    }
};

// Ici vous pouvez ajouter les autres contrôleurs pour les opérations CRUD sur Commentaire
// comme getCommentaires, getCommentaireById, updateCommentaire, deleteCommentaire, etc.
