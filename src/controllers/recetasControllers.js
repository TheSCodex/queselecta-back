import connection from "../db.js";
import dotenv from "dotenv";

dotenv.config();

// Recibir todas las recetas


export const getAllRecipes = (req, res) => {
  connection.query(
    "SELECT * FROM recetas", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno" })
      }

      return res.status(200).json(results)
    }
  )
}

// recibir una receta

export const getOneRecipe = (req, res) => {
  const idReceta = req.params.id;

  connection.query("SELECT * FROM recetas WHERE ID_Receta = ?", [idReceta], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno del servidor" })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Receta no encontrada." })
    }
    res.status(200).json(results);
  })
}


// Crear una receta

export const createRecipe = (req, res) => {
  const { Nombre_Receta, ID_Ingrediente, Cantidad, Instruccion_Preparacion, Tiempo_Coccion, descripcion } = req.body;

  connection.query("INSERT INTO recetas (Nombre_Receta, ID_Ingrediente, Cantidad, Instruccion_Preparacion, Tiempo_Coccion, descripcion) VALUES (?, ?, ?, ?, ?, ?)",
    [Nombre_Receta, ID_Ingrediente, Cantidad, Instruccion_Preparacion, Tiempo_Coccion, descripcion],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error al crear la receta" });
        } else {
          return res.status(201).json({ message: "Receta creada con éxito" })
        }
      })
}

// Actualizar una receta

export const updateRecipe = (req, res) => {
  const idReceta = req.params.id;
  const { Nombre_Receta, ID_Ingrediente, Cantidad, Instruccion_Preparacion, Tiempo_Coccion, descripcion } = req.body;

  connection.query("UPDATE recetas SET Nombre_Receta = ?, ID_Ingrediente = ?, Cantidad = ?, Instruccion_Preparacion = ?, Tiempo_Coccion = ?, descripcion = ?", 
  [Nombre_Receta, ID_Ingrediente, Cantidad, Instruccion_Preparacion, Tiempo_Coccion, descripcion],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({message: "Hubo un error en tu petición."})
      }
      return res.status(200).json({message:"Receta actualizada correctamente."})
    }
  )
}

// Eliminar receta

export const deleteRecipe = (req, res) => {
  const idReceta = req.params.id;

  connection.query("DELETE FROM recetas WHERE ID_Receta = ?", [idReceta], (err, results) =>{
    if (err) {
      console.error(err)
      return res.status(500).json({message: "Hubo un error en tu petición"})
    }
    return res.status(200).json({ message: "Receta eliminada correctamente" })
  })
}
