import { Request, Response } from 'express';
import Chat from '../models/chat.model';

// Create
export const createChat = async (req: Request, res: Response) => {
    try {
        const newChat = await Chat.create(req.body);
        res.status(201).json({message: 'Message créé avec succès !', data: newChat});
    } catch (error) {
        res.status(400).json({error: 'La création du message à échouée.'});
    }
};

// GetAll
export const getChats = async (req: Request, res: Response) => {
    try {
        const chats = await Chat.findAll();
        res.json(chats);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des messages.'});
    }
};

// GetChatsByRessourceId
export const getChatsByRessourceId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const chats = await Chat.findAll({where : {ressourceId : id}});
        res.json(chats);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des messages de la ressource fournie.'});
    }
};

// GetChatsByUserId
export const getChatsByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const chats = await Chat.findAll({where : {userId : id}});
        res.json(chats);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des messages de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getChatById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const chat = await Chat.findByPk(id);
    
    if (!chat) {
        res.status(404).json({error: 'Message introuvable.'});
    } else {
        res.json(chat);
    }
};

// Update
export const updateChat = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const chat = await Chat.findByPk(id);

    if (!chat) {
        res.status(404).json({error: 'Message introuvable.'});
        return;
    }

    try{
        await chat.update(req.body);
        res.json({message: 'Message modifié avec succès !', data: chat});
    } catch(error) {
        console.log(error);
        res.status(400).json({error: 'Erreur lors de la modification du message.'});
    }
};

// Delete
export const deleteChat = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const chat = await Chat.findByPk(id);

    if (!chat) {
        res.status(404).json({message: 'Message introuvable.'});
        return;
    }

    try {
        await chat.destroy();
        res.status(200).json({message: 'Message supprimé avec succès.'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la suppression du message.'});
    }
};
