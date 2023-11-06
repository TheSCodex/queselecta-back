import express from 'express';
import * as sensoresController from "../controllers/sensoresControllers.js"

const sensoresRoutes = express.Router();

// Rutas para lecturas de sensores
sensoresRoutes.get("/sensores", sensoresController.getSensores)
// Rutas para acceso
sensoresRoutes.post('/acceso', sensoresController.createAccessPassword);
sensoresRoutes.get("/acceso/:contrasena", sensoresController.acceder)
sensoresRoutes.patch('/acceso', sensoresController.resetAccessPassword);

export default sensoresRoutes;