import { Request, Response } from 'express';
import User from '../models/user.model';
import Ressource from '../models/ressource.model';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

/**
 * Méthode pour créer un utilisateur (superadmin, admin, modérateur)
 * @param req 
 * @param res 
 * @returns 
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé par un autre utilisateur" });
    }
    
    // Génére un mot de passe temporaire avant activation du compte utilisateur (superadmin, admin, modérateur)
    const temporaryPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Génére un jeton unique pour l'activation
    const activationToken = uuidv4();

    // Crée un nouvel utilisateur
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      isActive: false,
      tokenActivation: activationToken
    });

    // Envoi de l'email d'activation pour définir le vrai mot de passe de l'utilisateur (et ainsi activer son compte)
    await sendActivationEmail(req.body.email, req.body.role, activationToken);

    res.status(201).json({
      userId: newUser.userId,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      tokenActivation: newUser.tokenActivation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite' });
  }
};

/**
 * Génére un mot de passe aléatoire
 * @returns Mot de passe aléatoire généré
 */
const generateRandomPassword = () => {
  const length = 10;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

/**
 * Envoi un email d'activation
 * @param email Email de l'utilisateur
 * @param activationToken Jeton d'activation
 */
const sendActivationEmail = async (email: string, role: string, activationToken: string) => {
  const transporter = nodemailer.createTransport(
      new SMTPTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: 'ressources-relationnelles@outlook.fr',
            pass: 'Ressources2024!'
          }
      })   
  );

  const mailOptions = {
    from: 'ressources-relationnelles@outlook.fr',
    to: email,
    subject: 'Activation de compte',
    html: `
      <h3>Inscription à l'application  Ressources relationnelles avec un rôle !</h3>
      <br/>
      <p>Bonjour !</p>
      <br/>
      <p>Un responsable 'Ressources relationnelles' vient de créer un compte en votre nom avec le rôle: ${role}</p>
      <p>Nous vous invitons désormais à cliquer sur le bouton ci-dessous pour choisir un mot de passe de connexion</p>
      <p>et ainsi activer votre compte utilisateur</p> 
      <a href="http://localhost:4200/activate/${activationToken}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; display: inline-block;">Choisissez votre mot de passe</a>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
};

/**
 * Méthode pour l'inscription utilisateur
 * @param req 
 * @param res 
 * @returns 
 */
export const inscriptionUser = async (req: Request, res: Response) => { 

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      return res.status(409).json({ message: "Cet utilisateur existe déjà" });
    }

    // Création d'un nouvel utilisateur (citoyen) avec les données fournies dans le corps de la requête
    const newUser = await User.create(req.body); 
    const savedUser = await newUser.save();

    const sendRegistrationEmail = async (email: string) => {
      const transporter = nodemailer.createTransport(
          new SMTPTransport({
              host: 'smtp.office365.com',
              port: 587,
              secure: false,
              auth: {
                user: 'ressources-relationnelles@outlook.fr',
                pass: 'Ressources2024!'
              }
          })   
      );

      const mailOptions = {
        from: 'ressources-relationnelles@outlook.fr',
        to: email,
        subject: 'Confirmation d\'inscription',
        html: `
          <h3>Inscription à l'application Ressources relationnelles !</h3>
          <br/>
          <p>Bonjour bienvenue sur l'application 'Ressources relationnelles' !</p>
          <br/>
          <p>Votre inscription à l'application Ressources relationnelles a été confirmée avec succès.</p>
          <p>Merci de votre inscription !</p>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé :', info.response);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      }
    };
    sendRegistrationEmail(newUser.email);

    return res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription' });
  }
}

// GetAll
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

// GetRessourcesByUserId
export const GetRessourcesByUserId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const files = await Ressource.findAll({where : {userId : id}});
        res.json(files);
    } catch (error) {
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des ressources de l\'utilisateur fourni.'});
    }
};

// GetOneById
export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    
    if (!user) {
        return res.status(404).json({message:'Cet utilisateur est introuvable.'});
    } else {
        res.send(user);
    }
};

// Update
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

// Delete
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

