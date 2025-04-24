import multer from 'multer'
import { CreateNewRecipe, deleteRecipe, getRecipes, updateRecipe } from '../controllers/recipeController.js';
// import { adminAuth } from '../middlewares/authMiddleware.js';
import express from 'express'
import { adminAuth } from '../middlewares/authMiddleware.js';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create new recipe (admin only)
router.post('/',
   adminAuth,
   upload.single('image'),
   CreateNewRecipe);

// Get all recipes
router.get('/', getRecipes);

// Update recipe (admin only)
router.put('/:id',
   // adminAuth, 
   updateRecipe);

// Delete recipe (admin only)
router.delete('/:id',
   // adminAuth, 
   deleteRecipe);



export default router