import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Recipe from '../models/Recipe.js'
import { storage } from "../Config/FirebaseConfig.js"

export const CreateNewRecipe = async (req, res) => {
   try {
      const { file } = req
      const { title, description, category, cuisineType, sizes, extras } = req.body
      const dateTime = Date.now()

      if (!file) {
         return res.status(400).send({ error: "Image file is required" });
      }

      const storageRef = ref(storage, `recipes/${file.originalname + dateTime}`);

      await uploadBytes(storageRef, file.buffer);

      // Direct hosted URL
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(`recipes/${file.originalname + dateTime}`)}?alt=media`;


      // Parse sizes and extras
      const parsedSizes = JSON.parse(sizes)
      const parsedExtras = JSON.parse(extras)

      // Create recipe with image URL
      const recipe = new Recipe({
         title,
         description,
         category,
         cuisineType,
         imageUrl,
         sizes: parsedSizes,
         extras: parsedExtras,
      })

      await recipe.save()
      res.status(201).send(recipe)
   } catch (error) {
      console.error("Error creating recipe:", error)
      res.status(400).send({ error: error.message })
   }
}

export const getRecipes = async (req, res) => {
   try {
      const filters = {};
      if (req.query.category) filters.category = req.query.category;
      if (req.query.cuisineType) filters.cuisineType = req.query.cuisineType;

      const recipes = await Recipe.find(filters);
      res.send(recipes);
   } catch (error) {
      res.status(500).send(error);
   }
}

export const updateRecipe = async (req, res) => {
   const updates = Object.keys(req.body);

   const allowedUpdates = ['title', 'description', 'category', 'cuisineType', 'image', 'sizes', 'extras', 'isAvailable'];
   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

   if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
   }

   try {
      // Create an update object with only the fields present in the request
      const updateFields = {};
      updates.forEach(update => {
         // Handle special cases for complex fields
         if (update === 'sizes' || update === 'extras') {
            updateFields[update] = JSON.parse(req.body[update]);
         } else {
            updateFields[update] = req.body[update];
         }
      });

      const recipe = await Recipe.findByIdAndUpdate(
         req.params.id,
         updateFields,
         {
            new: true,
            runValidators: true,
            // Only update specified fields
            overwrite: false
         }
      );

      if (!recipe) {
         return res.status(404).send();
      }
      res.send(recipe);
   } catch (error) {
      res.status(400).send(error);
   }
}

export const deleteRecipe = async (req, res) => {
   console.log(req.params.id)
   try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) {
         return res.status(404).send();
      }
      res.send(recipe);
   } catch (error) {
      res.status(500).send(error);
   }
}