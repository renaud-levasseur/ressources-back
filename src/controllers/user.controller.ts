import { Request, Response } from 'express';
import User from '../models/user.model';

// TODO: Revoir la méthode pour permettre l'ajout d'utilisateur superadmin, admin et modérateur
export const createUser = async (req: Request, res: Response) => {
    try {
        const {username, email} = req.body;
        const existingUser = await User.findOne({ where: { username, email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Un utilisateur avec le même nom d\'utilisateur ou la même adresse e-mail existe déjà.' });
        }

        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'Utilisateur créé avec succès !', data: newUser });
    } catch (error) { 
        res.status(400).json({ message: 'La création de l\'utilisateur a échoué.' });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    
    if (!user) {
        return res.status(404).json({message:'Cet utilisateur est introuvable.'});
    } else {
        res.send(user);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: "L'utilisateur demandé n'a pas été trouvé."});
    }
    try{
        await user.update(req.body);
        res.json(user);
    }catch(error) {
        console.log(error);
        res.status(400).json({message:"Erreur lors de la modification de l'utilisateur"});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'L\'utilisateur n\'a pas été trouvé.' });
        }

        await user.destroy();
        res.status(200).json({ message: 'L\'utilisateur a été supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
    }
};
