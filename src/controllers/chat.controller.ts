import { Request, Response } from 'express';
import Chat from '../models/chat.model';

// Create
export const createChat = async (req: Request, res: Response) => {
    try {
        const newChat = await Chat.create(req.body);
        res.status(201).json({ message: 'Message ajouté avec succès !', data: newChat });
    } catch (error) {
        res.status(400).json({ message: 'La création du message a échoué.' });
    }
};

// GetAll
export const getChats = async (_req: Request, res: Response) => {
    try {
        const chats = await Chat.findAll();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages.' });
    }
};

// GetCommentsByRessourceId
export const getChatsByResourceId = async (req: Request, res: Response) => {
    const resourceId = parseInt(req.params.resourceId);
    try {
        const chats = await Chat.findAll({ where: { resourceId } });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages de la ressource.' });
    }
};

// GetCommentsByUserId
export const getChatsByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    try {
        const chats = await Chat.findAll({ where: { userId } });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages de l\'utilisateur.' });
    }
};

// GetOneById
export const getChatById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const chat = await Chat.findByPk(id);
        if (!chat) {
            res.status(404).json({ message: 'Message introuvable.' });
        } else {
            res.json(chat);
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du message.' });
    }
};

// Update
export const updateChat = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const [updated] = await Chat.update(req.body, { where: { chatId: id } });
        if (updated) {
            res.json({ message: 'Message mis à jour avec succès !' });
        } else {
            res.status(404).json({ message: 'Message introuvable.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du message.' });
    }
};

// Delete
export const deleteChat = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const deleted = await Chat.destroy({ where: { chatId: id } });
        if (deleted) {
            res.status(200).json({ message: 'Message supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Message introuvable.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du message.' });
    }
};
