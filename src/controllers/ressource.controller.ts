import { Request, Response } from 'express';
import Ressource from '../models/ressource.model';
import File from '../models/file.model';

// Create
export const createRessource = async (req: Request, res: Response) => {
    try {
        const newRessource = await Ressource.create(req.body);
        res.status(201).json({message: 'Ressource créé avec succès !', data: newRessource});
    } catch (error) {
        res.status(400).json({error: 'La création de la ressource a échouée.'});
    }
};

// GetAll
export const getRessources = async (req: Request, res: Response) => {
    try {
        const ressources = await Ressource.findAll();
        res.json(ressources);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des ressources.'});
    }
};

// GetFilesByRessourceId
export const GetFilesByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const files = await File.findAll({where : {ressourceId : id}});
        res.json(files);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des fichiers de la ressource fournie.'});
    }
};

// GetOneById
export const getRessourceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressource = await Ressource.findByPk(id);
    
    if (!ressource) {
        res.status(404).json({error: 'Ressource introuvable.'});
    } else {
        res.json(ressource);
    }
};

// Update
export const updateRessource = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressource = await Ressource.findByPk(id);

    if (!ressource) {
        res.status(404).json({error: 'Ressource introuvable.'});
        return;
    }

    try{
        await ressource.update(req.body);
        res.json({message: 'Ressource modifiée avec succès !', data: ressource});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification de la ressource.'});
    }
};

// Delete
export const deleteRessource = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const ressource = await Ressource.findByPk(id);

    if (!ressource) {
        res.status(404).json({message: 'Ressource introuvable.'});
        return;
    }

    try {
        await ressource.destroy();
        res.status(200).json({message: 'Ressource supprimée avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de la ressource.'});
    }
};