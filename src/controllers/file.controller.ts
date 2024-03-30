import { Request, Response } from 'express';
import File from '../models/file.model';

// Create
export const createFile = async (req: Request, res: Response) => {
    try {
        const newFile = await File.create(req.body);
        res.status(201).json({message: 'Fichier créé avec succès !', data: newFile});
    } catch (error) {
        res.status(400).json({error: 'La création du fichier a échouée.'});
    }
};

// GetAll
export const getFiles = async (req: Request, res: Response) => {
    try {
        const files = await File.findAll();
        res.json(files);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des fichiers.'});
    }
};

// GetOneById
export const getFileById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const file = await File.findByPk(id);
    
    if (!file) {
        res.status(404).json({error: 'Fichier introuvable.'});
    } else {
        res.json(file);
    }
};

// Update
export const updateFile = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const file = await File.findByPk(id);

    if (!file) {
        res.status(404).json({error: 'Fichier introuvable.'});
        return;
    }

    try{
        await file.update(req.body);
        res.json({message: 'Fichier modifié avec succès !', data: file});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du fichier.'});
    }
};

// Delete
export const deleteFile = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const file = await File.findByPk(id);

    if (!file) {
        res.status(404).json({message: 'Fichier introuvable.'});
        return;
    }

    try {
        await file.destroy();
        res.status(200).json({message: 'Fichier supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du fichier.'});
    }
};