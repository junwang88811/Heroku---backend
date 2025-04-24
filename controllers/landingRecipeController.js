import Recipe from '../models/Recipe.js';

export const getRecipes = async (req, res) => {
   try {
      // Use query parameters for filters
      const { category, cuisineType } = req.query;
      const filters = {};

      // Dynamically add filters if they are present
      if (category) filters.category = category.toLowerCase();
      if (cuisineType) filters.cuisineType = cuisineType.toLowerCase();
      // Fetch recipes based on filters
      const recipes = await Recipe.find(filters);

      // Handle no results found
      if (!recipes.length) {
         return res.status(404).json({ message: 'No recipes found' });
      }

      // Respond with filtered recipes
      res.json(recipes);
   } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
   }
};
