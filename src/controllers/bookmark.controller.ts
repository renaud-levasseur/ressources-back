import { Request, Response } from 'express';
import Bookmark from '../models/bookmark.model';

// Create
export const createBookmark = async (req: Request, res: Response) => {
    try {
        const newBookmark = await Bookmark.create(req.body);
        res.status(201).json({message: 'Signet ajouté avec succès !', data: newBookmark});
    } catch (error) {
        res.status(400).json({error: 'La création du signet a échoué.'});
    }
};

// GetAll
export const getBookmarks = async (req: Request, res: Response) => {
    try {
        const bookmarks = await Bookmark.findAll();
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des signets.'});
    }
};

// GetBookmarksByRessourceId
export const GetBookmarksByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const bookmarks = await Bookmark.findAll({where : {ressourceId : id}});
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des signets pour la ressource fournie.'});
    }
};

// GetBookmarksByUserId
export const GetBookmarksByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const bookmarks = await Bookmark.findAll({where : {userId : id}});
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des signets de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getBookmarkById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const bookmark = await Bookmark.findByPk(id);
    
    if (!bookmark) {
        res.status(404).json({error: 'Signet introuvable.'});
    } else {
        res.json(bookmark);
    }
};

// Delete
export const deleteBookmark = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const bookmark = await Bookmark.findByPk(id);

    if (!bookmark) {
        res.status(404).json({message: 'Signet introuvable.'});
        return;
    }

    try {
        await bookmark.destroy();
        res.status(200).json({message: 'Signet supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression de ce signet.'});
    }
};
