import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const activateAccount = async (req: Request, res: Response) => {
    
    try {
    
        const user = await prisma.user.findUnique({
            where: {
                tokenActivation: req.body.activationToken
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Token non trouvé ou expiré' });
        }

        //Le nouveau mot de passe utilisateur est hashé salé
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        //Update de l'activation et du nouveau mot de passe utilisateur
        await prisma.user.update({
            where: { 
                id_user: user.id_user 
            },
            data: {
                password: hashedPassword,
                isActive: true,
                tokenActivation: null
            }
        },
        );

        res.status(200).json({ message: 'Compte activé avec succès' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
}

export const checkActivationToken = async (req: Request, res: Response) => {

    const user = await prisma.user.findUnique({
        where: {
            tokenActivation: req.body.token
        }
    });
    if (user) {
        console.log("Le token est correct, l'utilisateur peut s'authentifier.");
        res.json({success: true});
    } else {
        console.log('Le est incorrect, l\'utilisateur ne peut pas s\'authentifier.');
        res.status(400).json({ success: false, error: 'Token d\'activation incorrect'});
    }
}