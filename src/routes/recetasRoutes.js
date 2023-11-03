import express from 'express';
import * as recetasController from '../controllers/recetasControllers.js'

const recetasRoutes = express.Router();

//AQUÍ LOS ENDPOINTS
recetasRoutes.get('/recetas', recetasController.getAllRecipes);
recetasRoutes.get('/recetas/:id', recetasController.getOneRecipe);
recetasRoutes.post('/recetas', recetasController.createRecipe);
recetasRoutes.put('/recetas/:id', recetasController.updateRecipe);
recetasRoutes.delete('/recetas/:id', recetasController.deleteRecipe);

export default recetasRoutes;