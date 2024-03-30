import { Request, Response } from 'express';
import Category from '../models/category.model';

// Create
export const createCategory = async (req: Request, res: Response) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({message: 'Catégorie créé avec succès !', data: newCategory});
    } catch (error) {
        res.status(400).json({error: 'La création de la catégorie a échouée.'});
    }
};

// GetAll
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des catégories.'});
    }
};

// GetOneById
export const getCategoryById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const category = await Category.findByPk(id);
    
    if (!category) {
        res.status(404).json({error: 'Catégorie introuvable.'});
    } else {
        res.json(category);
    }
};

// Update
export const updateCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
        res.status(404).json({error: 'Catégorie introuvable.'});
        return;
    }

    try{
        await category.update(req.body);
        res.json({message: 'Catégorie modifiée avec succès !', data: category});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification de la catégorie.'});
    }
};

// Delete
export const deleteCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
        res.status(404).json({message: 'Catégorie introuvable.'});
        return;
    }

    try {
        await category.destroy();
        res.status(200).json({message: 'Catégorie supprimée avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de la catégorie.'});
    }
};