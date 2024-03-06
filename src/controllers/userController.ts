import { Request, Response } from "express"
import { Sequelize } from "sequelize";
import sequelizeConfig from "../../sequelize.config";

const sequelize = new Sequelize(sequelizeConfig);

export const createUser = async (req: Request, res: Response) => {
    try {

        // const existingUser = await sequelize.models.User.findOne({ where: { name: req.body.name, email:  req.body.email } });

        // if (existingUser) {
            
        // }

        const newUser = await  sequelize.models.User.create(req.body);
        res.status(201).json({ message: 'Utilisateur crée avec succès !', data: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "La création de l'utilisateur a échoué"});
    }
}

export const getUsers = async  (_req: Request, res: Response) => {
    try {
        const users = await sequelize.models.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Une erreur est survenue lors de la récupération des utilisateurs"});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await  sequelize.models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé"});
        }
        await user.destroy();
        res.status(200).json({ message: "L'utilisateur a été supprimé avec succès"});    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur"});
    }
}