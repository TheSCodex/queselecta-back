import express from 'express';
const ingredientsRoutes = express.Router();
import * as ingredientsControllers from '../controllers/ingredientesControllers.js'

ingredientsRoutes.post('/ingredientes', ingredientsControllers.createIngredient);
ingredientsRoutes.get('/ingredientes', ingredientsControllers.getIngredients);
ingredientsRoutes.get('/ingredientes/:id', ingredientsControllers.getIngredientsById);
ingredientsRoutes.get('/recetas/:id/ingredientes', ingredientsControllers.getIngredientsByRecipe);
ingredientsRoutes.put('/recetas/:id/ingredientes/:id', ingredientsControllers.updateIngredient);
ingredientsRoutes.delete('/ingredientes/:id', ingredientsControllers.deleteIngredient);

export default ingredientsRoutes;