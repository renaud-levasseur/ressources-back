import express from "express";
import { login, logout } from "../controllers/auth/auth.controller";
import { activateAccount, checkActivationToken } from "../controllers/auth/activate.controller";
import { sendVerificationCode, updatePassword } from "../controllers/auth/forgot-password.controller";
import { inscription } from "../controllers/auth/inscription.controller";

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

router.post('/inscription', inscription);

router.post('activate-usertype', activateAccount);
router.post('/check-activation-token', checkActivationToken);

router.post('/send-verification-code', sendVerificationCode);
router.post('/update-password', updatePassword);


export default router;