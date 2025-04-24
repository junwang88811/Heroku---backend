import multer from 'multer'
// import { adminAuth } from '../middlewares/authMiddleware.js';
import express from 'express'
import { getRecipes } from '../controllers/landingRecipeController.js';

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// Get all recipes
router.get('/', getRecipes);


export default router