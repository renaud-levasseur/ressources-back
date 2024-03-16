import { Request, Response } from 'express';
import RessourceCategory from '../models/ressourceCategory.model';

// Create
export const createRessourceCategory = async (req: Request, res: Response) => {
    try {
        const newRessourceCategory = await RessourceCategory.create(req.body);
        res.status(201).json({message: 'Association Ressource/Catégorie créé avec succès !', data: newRessourceCategory});
    } catch (error) {
        res.status(400).json({error: 'La création de l\'association Ressource/Catégorie a échoué.'});
    }
};

// GetCategoriesByRessourceId
export const GetCategoriesByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const categories = await RessourceCategory.findAll({where : {ressourceId : id}});
        res.json(categories);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des catégories de la ressource fournie.'});
    }
}

// GetRessourcesByCategoryId
export const GetRessourcesByCategoryId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const ressources = await RessourceCategory.findAll({where : {categoryId : id}});
        res.json(ressources);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des ressources de cette catégorie.'});
    }
}

// Update
export const updateRessourceCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressourceCategory = await RessourceCategory.findByPk(id);

    if (!ressourceCategory) {
        res.status(404).json({error: 'Association Ressource/Catégorie introuvable.'});
        return;
    }

    try{
        await ressourceCategory.update(req.body);
        res.json({message: 'Association Ressource/Catégorie modifiée avec succès !', data: ressourceCategory});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification de l\'association Ressource/Catégorie.'});
    }
};

// Delete
export const deleteRessourceCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressourceCategory = await RessourceCategory.findByPk(id);

    if (!ressourceCategory) {
        res.status(404).json({message: 'Association Ressource/Catégorie introuvable.'});
        return;
    }

    try {
        await ressourceCategory.destroy();
        res.status(200).json({message: 'Association Ressource/Catégorie supprimée avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de l\'association Ressource/Catégorie.'});
    }
};