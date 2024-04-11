import { Request, Response } from 'express';
import Log from '../models/log.model';

// Create
export const createLog = async (req: Request, res: Response) => {
    try {
        const newLog = await Log.create(req.body);
        res.status(201).json({message: 'Log créé avec succès !', data: newLog});
    } catch (error) {
        res.status(400).json({error: 'La création du log a échoué.'});
    }
};

// GetAll
export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await Log.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des logs.'});
    }
};

// GetOneById
export const getLogById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const log = await Log.findByPk(id);
    
    if (!log) {
        res.status(404).json({error: 'Log introuvable.'});
    } else {
        res.json(log);
    }
};

// GetLogsByUserId
export const GetLogsByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const logs = await Log.findAll({where : {userId : id}});
        res.json(logs);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des logs liés à l\'utilisateur fourni.'});
    }
};

// Update
export const updateLog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const log = await Log.findByPk(id);

    if (!log) {
        res.status(404).json({error: 'Log introuvable.'});
        return;
    }

    try{
        await log.update(req.body);
        res.json({message: 'Log modifié avec succès !', data: log});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du log.'});
    }
};

// Delete
export const deleteLog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const log = await Log.findByPk(id);

    if (!log) {
        res.status(404).json({message: 'Log introuvable.'});
        return;
    }

    try {
        await log.destroy();
        res.status(200).json({message: 'Log supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du log.'});
    }
};