import express from 'express';
import * as almacenController from "../controllers/almacenControllers.js"

const almacenRoutes = express.Router();

//AQUÍ LOS ENDPOINTS
almacenRoutes.get("/almacen", almacenController.getAllInventory)
almacenRoutes.get("/almacen/:id", almacenController.getInventoryElement)
almacenRoutes.post("/almacen", almacenController.addElement)
almacenRoutes.patch("/almacen/:id", almacenController.updateElement)
almacenRoutes.delete("/almacen/:id", almacenController.deleteElement)

export default almacenRoutes;