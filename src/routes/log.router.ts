import express from "express";
import { GetLogsByUserId, createLog, deleteLog, getLogById, getLogs, updateLog } from "../controllers/log.controller";

const router = express.Router();

router.post('/createLog', createLog);
router.get('/logs', getLogs);
router.get('/userLogs/:id', GetLogsByUserId);
router.get('/log/:id', getLogById);
router.patch('/updateLog/:id', updateLog);
router.delete('/deleteLog/:id', deleteLog);

export default router;