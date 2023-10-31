import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import express from 'express';
import recetasRoutes from './src/routes/recetasRoutes.js';
import almacenRoutes from './src/routes/almacenRoutes.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PATCH, DELETE',
    allowedHeaders: 'Content-Type'
}));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo se rompió!')
  })

 app.use('/que-selecta', recetasRoutes); 
 app.use("/que-selecta", almacenRoutes)
 //Comentado hasta que se agreguen rutas para no causar errores

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(process.env.PORT);
});
