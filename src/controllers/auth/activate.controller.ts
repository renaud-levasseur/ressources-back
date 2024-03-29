import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user.model';


export const activateAccount = async (req: Request, res: Response) => {
    
    try {
    
        const user = await User.findOne({
            where: {
                token_activation: req.body.activationToken
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Token not found or expired' });
        }

        //Le nouveau mot de passe utilisateur est hashé salé
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        //Update de l'activation et du nouveau mot de passe utilisateur
        await User.update({
            password: hashedPassword,
            isActive: true,
            tokenActivation: null

        },
        { where: { id: user.id} }
        );

        res.status(200).json({ message: 'Account activated successfully' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error has occurred' });
    }
}

export const checkActivationToken = async (req: Request, res: Response) => {

    const user = await User.findOne({
        where: {
            tokenActivation: req.body.token
        }
    });
    if (user) {
        console.log("The token is correct, the user can authenticate.");
        res.json({success: true});
    } else {
        console.log('The token is not or no longer correct, so the user cannot authenticate.');
        res.status(400).json({ success: false, error: 'Invalid activation token'});
    }
}