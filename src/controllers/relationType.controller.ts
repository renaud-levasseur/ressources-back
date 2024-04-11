import { Request, Response } from 'express';
import RelationType from '../models/relationType.model';
import Ressource from '../models/ressource.model';

// Create
export const createRelationType = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        const existingRelationType = await RelationType.findOne({ where: { name } });
        if (existingRelationType) {
            return res.status(409).json({ message: 'Un type de relation avec le même nom existe déjà.' });
        }
        
        const newRelationType = await RelationType.create(req.body);
        res.status(201).json({message: 'Type de relation créé avec succès !', data: newRelationType});
    } catch (error) {
        res.status(400).json({error: 'La création du type de relation a échoué.'});
    }
};

// GetAll
export const getRelationTypes = async (req: Request, res: Response) => {
    try {
        const relationTypes = await RelationType.findAll();
        res.json(relationTypes);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des types de relation.'});
    }
};

// GetRessourcesByRelationTypeId
export const getRessourcesByRelationTypeId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const ressources = await Ressource.findAll({where : {relationTypeId : id}});
        res.json(ressources);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des ressources de ce type de relation.'});
    }
};

// GetOneById
export const getRelationTypeById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const relationType = await RelationType.findByPk(id);
    
    if (!relationType) {
        res.status(404).json({error: 'Type de relation introuvable.'});
    } else {
        res.json(relationType);
    }
};

// Update
export const updateRelationType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const relationType = await RelationType.findByPk(id);

    if (!relationType) {
        res.status(404).json({error: 'Type de relation introuvable.'});
        return;
    }

    try{
        await relationType.update(req.body);
        res.json({message: 'Type de relation modifié avec succès !', data: relationType});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du type de relation.'});
    }
};

// Delete
export const deleteRelationType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const relationType = await RelationType.findByPk(id);

    if (!relationType) {
        res.status(404).json({message: 'Type de relation introuvable.'});
        return;
    }

    try {
        await relationType.destroy();
        res.status(200).json({message: 'Type de relation supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du type de relation.'});
    }
};