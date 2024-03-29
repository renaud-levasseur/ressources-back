import { Request, Response, NextFunction } from 'express';
import User from "../../models/user.model";
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import bcrypt from 'bcrypt';

export const sendVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;

        //On vérifie que l'utilisateur est bien existant
        const user = await User.findOne({
            where : {
                email: email
            }
        });

        // Si l'utilisateur est inexistant
        if (!user)  {
            return res.status(404).json({ message: "User not found"});
        }

        //On vérifie si l'utilisateur a déjà un code existant pour la réinitialisation et qu'il n'est pas expiré
        //(*!! différent de null ou undefined)
        //Si c'est le cas on renvoie le même code par mail
        if (user.codeForgotPassword && user.expirationCodeForgotPassword!! > new Date()) {
            const verificationCode = user.codeForgotPassword;
            sendCodeVerification(email, verificationCode);    
              
        } else {
            const verificationCode = generateRandomVerificationCode();
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 1); // 1heure d'expiration

            // S'il n'y a pas encore de code existant, on l'insère dans la table de l'user correspondant
            if (!user.codeForgotPassword) {
                await User.update({
                    codeForgotPassword: verificationCode,
                    expirationCodeForgotPassword: expirationDate
                },
                { where: {email} }
                );    
                // S'il y a un code existant, on met à jour les informations
            } else {
                await User.update({
                    codeForgotPassword: verificationCode,
                    expirationCodeForgotPassword: expirationDate
                },
                { where: { email: email} }
                );
            }
            
            //Envoi du nouveau code à l'utilisateur
            sendCodeVerification(email, verificationCode);
        }
    } catch (error) {
        console.error("Error sending verification code :", error);
    }

}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.body.email;
    const verificationCode = req.body.code;
    const newPassword = req.body.newPassword;

    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }

    if (user.codeForgotPassword === verificationCode && user.expirationCodeForgotPassword!! > new Date) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await User.update({
            password: hashedPassword,
            codeForgotPassword: null,
            expirationCodeForgotPassword: null
        },
        { where: { email: email} }
        );
        return res.status(200).json({ message: "Mot de passe mis à jour avec succès"});
    } else {
        return res.status(403).json({ message: "Le code de vérification est incorrect."})
    }


}

const sendCodeVerification = async (email: string, verificationCode: string) => {
    const transporter = nodemailer.createTransport(
        new SMTPTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: 'renaud.levasseur@viacesi.fr',
            pass: 'Rykew589'
          }
        })
    );

    const mailOptions = {
        from: 'renaud.levasseur@viacesi.fr',
        to: email,
        subject: 'Réinitialisation de mot de passe Ressource Relationnelles',
        html: `
          <h3>Réinitialisation du mot de passe</h3>
          <br/>
          <p>Bonjour !</p>
          <br/>
          <p>Voici votre code de vérification pour réinitialiser votre mot de passe :</p>
          <br/>
          <p><b>${verificationCode}</b></p>
        `
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email envoyé :", info.response);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
}

/**
 * Generate a code between 100000 and 999999.
 * @returns 
 */
function generateRandomVerificationCode() {
    const min = 100000;
    const max = 999999;
    const code = Math.floor(Math.random() * (max - min + 1) + min);
    return code.toString();
}
