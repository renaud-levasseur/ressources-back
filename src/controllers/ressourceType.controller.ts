import { Request, Response } from 'express';
import RessourceType from '../models/ressourceType.model';
import Ressource from '../models/ressource.model';

// Create
export const createRessourceType = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        const existingRessourceType = await RessourceType.findOne({ where: { name } });
        if (existingRessourceType) {
            return res.status(409).json({ message: 'Un type de ressource avec le même nom existe déjà.' });
        }
        
        const newRessourceType = await RessourceType.create(req.body);
        res.status(201).json({message: 'Type de ressource créé avec succès !', data: newRessourceType});
    } catch (error) {
        res.status(400).json({error: 'La création du type de ressource a échoué.'});
    }
};

// GetAll
export const getRessourceTypes = async (req: Request, res: Response) => {
    try {
        const ressourceType = await RessourceType.findAll();
        res.json(ressourceType);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des types de ressource.'});
    }
};

// GetRessourcesByRessourceTypeId
export const GetRessourcesByRessourceTypeId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const ressources = await Ressource.findAll({where : {ressourceTypeId : id}});
        res.json(ressources);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des ressources de ce type.'});
    }
};

// GetOneById
export const getRessourceTypeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressourceType = await RessourceType.findByPk(id);
    
    if (!ressourceType) {
        res.status(404).json({error: 'Type de ressource introuvable.'});
    } else {
        res.json(ressourceType);
    }
};

// Update
export const updateRessourceType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressourceType = await RessourceType.findByPk(id);

    if (!ressourceType) {
        res.status(404).json({error: 'Type de ressource introuvable.'});
        return;
    }

    try{
        await ressourceType.update(req.body);
        res.json({message: 'Type de ressource modifié avec succès !', data: ressourceType});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du type de ressource.'});
    }
};

// Delete
export const deleteRessourceType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressourceType = await RessourceType.findByPk(id);

    if (!ressourceType) {
        res.status(404).json({message: 'Type de ressource introuvable.'});
        return;
    }

    try {
        await ressourceType.destroy();
        res.status(200).json({message: 'Type de ressource supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du type de ressource.'});
    }
};