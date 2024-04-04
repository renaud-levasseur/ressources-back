import express from "express";
import { GetBookmarksByRessourceId, GetBookmarksByUserId, createBookmark, deleteBookmark, getBookmarkById, getBookmarks } from "../controllers/bookmark.controller";

const router = express.Router();

router.post('/createBookmark', createBookmark);
router.get('/bookmarks', getBookmarks);
router.get('/ressourceBookmarks/:id', GetBookmarksByRessourceId);
router.get('/userBookmarks/:id', GetBookmarksByUserId);
router.get('/bookmark/:id', getBookmarkById);
router.delete('/deleteBookmark/:id', deleteBookmark);

export default router;