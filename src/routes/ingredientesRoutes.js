import express from 'express';
const ingredientsRoutes = express.Router();
import * as ingredientsControllers from '../controllers/ingredientesControllers.js'

ingredientsRoutes.post('/recetas/:id/ingredientes', ingredientsControllers.createIngredient);
ingredientsRoutes.get('/recetas/:id/ingredientes', ingredientsControllers.getIngredients);
ingredientsRoutes.get('/recetas/:id/ingredientes/:id', ingredientsControllers.getIngredientsById);
ingredientsRoutes.put('/recetas/:id/ingredientes/:id', ingredientsControllers.updateIngredient);
ingredientsRoutes.delete('/recetas/:id/ingredientes/:id', ingredientsControllers.deleteIngredient);

export default ingredientsRoutes;