import { Request, Response } from 'express';
import Participation from '../models/participation.model';

// Create
export const createParticipation = async (req: Request, res: Response) => {
    try {
        const newParticipation = await Participation.create(req.body);
        res.status(201).json({message: 'Participation ajoutée avec succès !', data: newParticipation});
    } catch (error) {
        res.status(400).json({error: 'La création de la participation à échouée.'});
    }
};

// GetAll
export const getParticipations = async (req: Request, res: Response) => {
    try {
        const participations = await Participation.findAll();
        res.json(participations);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des participations.'});
    }
};

// GetParticipationsByRessourceId
export const GetParticipationsByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const participations = await Participation.findAll({where : {ressourceId : id}});
        res.json(participations);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des participations à la ressource fournie.'});
    }
};

// GetParticipationsByUserId
export const GetParticipationsByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const participations = await Participation.findAll({where : {userId : id}});
        res.json(participations);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des participations de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getParticipationById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const participation = await Participation.findByPk(id);
    
    if (!participation) {
        res.status(404).json({error: 'Participation introuvable.'});
    } else {
        res.json(participation);
    }
};

// Delete
export const deleteParticipation = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const participation = await Participation.findByPk(id);

    if (!participation) {
        res.status(404).json({message: 'Participation introuvable.'});
        return;
    }

    try {
        await participation.destroy();
        res.status(200).json({message: 'Participation supprimée avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de cette participation.'});
    }
};
