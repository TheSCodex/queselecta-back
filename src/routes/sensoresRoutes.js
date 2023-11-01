import express from 'express';

const router = express.Router();

// Rutas para lecturas de sensores
router.get('/lecturas', getAllReadings);
router.get('/lecturas/:id', getReadingById);

// Rutas para acceso
router.post('/acceso', createAccessPassword);
router.patch('/acceso', resetAccessPassword);

export default router;
