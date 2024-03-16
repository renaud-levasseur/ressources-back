import express from "express";
import { createFile, deleteFile, getFileById, getFiles, updateFile } from "../controllers/file.controller";

const router = express.Router();

router.post('/createFile', createFile);
router.get('/files', getFiles);
router.get('/file/:id', getFileById);
router.patch('/updateFile/:id', updateFile);
router.delete('/deleteFile/:id', deleteFile);

export default router;