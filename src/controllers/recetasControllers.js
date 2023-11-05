import connection from "../db.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllRecipes = (req, res) => {
  connection.query(
    "SELECT r.ID_Receta, r.Nombre_Receta, r.descripcion, GROUP_CONCAT(i.Ingrediente) AS Ingredients FROM recetas r LEFT JOIN ingredientes i ON r.ID_Receta = i.Receta_ID GROUP BY r.ID_Receta",
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      results = results.map((row) => {
        return {
          ID_Receta: row.ID_Receta,
          Nombre_Receta: row.Nombre_Receta,
          descripcion: row.descripcion,
          Ingredients: row.Ingredients ? row.Ingredients.split(",") : [],
        };
      });

      res.status(200).json(results);
    }
  );
};

export const getOneRecipe = (req, res) => {
  const idReceta = req.params.id;
  connection.query(
    "SELECT * FROM recetas WHERE ID_Receta = ?",
    [idReceta],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Receta no encontrada." });
      }
      res.status(200).json(results[0]);
    }
  );
};

export const createRecipe = (req, res) => {
  const { Nombre_Receta, descripcion, ingredientes } = req.body;

  console.log("Received request data:", req.body);

  connection.query(
    "INSERT INTO recetas (Nombre_Receta, descripcion) VALUES (?, ?)",
    [Nombre_Receta, descripcion],
    (err, result) => {
      if (err) {
        console.error(err);
        console.log("Error while inserting into recetas table");
        return res.status(500).json({ message: "Error al crear la receta" });
      } else {
        const recetaID = result.insertId;
        console.log(ingredientes);

        if (ingredientes && ingredientes.length > 0) {
          const ingredientValues = ingredientes.map((ingrediente) => [
            ingrediente, // Use the ingredient name directly
            recetaID,
          ]);

          console.log("Ingredient values to insert:", ingredientValues);

          connection.query(
            "INSERT INTO ingredientes (Ingrediente, Receta_ID) VALUES ?",
            [ingredientValues],
            (err) => {
              if (err) {
                console.error(err);
                console.log("Error while inserting into ingredientes table");
                return res.status(500).json({
                  message: "Error al crear los ingredientes de la receta",
                });
              }

              res.status(201).json({ message: "Receta creada con éxito" });
            }
          );
        } else {
          console.log("No ingredient data provided.");
          res
            .status(400)
            .json({ message: "Ingresa los ingredientes de la receta" });
        }
      }
    }
  );
};

export const updateRecipe = (req, res) => {
  const recetaID = req.params.id;
  const { Nombre_Receta, descripcion, ingredientes } = req.body;

  connection.query(
    "UPDATE recetas SET Nombre_Receta = ?, descripcion = ? WHERE ID_Receta = ?",
    [Nombre_Receta, descripcion, recetaID],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
      }

      if (ingredientes && ingredientes.length > 0) {
        const ingredientValues = ingredientes.map((ingrediente) => [
          ingrediente.ID_Ingrediente,
          ingrediente.Ingrediente,
          recetaID,
        ]);

        connection.query(
          "UPDATE ingredientes SET Ingrediente = ? WHERE ID_Ingrediente = ? AND Receta_ID = ?",
          ingredientValues,
          (err) => {
            if (err) {
              console.error("Hubo un error", err);
              return res.status(500).json({
                message: "Error al actualizar los ingredientes de la receta",
              });
            }
            res.status(200).json({
              message: "Receta y ingredientes actualizados con éxito",
            });
          }
        );
      } else {
        res.status(200).json({ message: "Se actualizó la receta con éxito." });
      }
    }
  );
};

export const deleteRecipe = (req, res) => {
  const idReceta = req.params.id;
  connection.query(
    "DELETE FROM ingredientes WHERE Receta_ID = ?",
    [idReceta],
    (err, results) => {
      if (err) {
        console.error(
          "Hubo un error en tu petición de eliminar los ingredientes de la receta",
          err
        );
        return res.status(500).json({ message: "Error interno del servidor" });
      }
      connection.query(
        "DELETE FROM recetas WHERE ID_Receta = ?",
        [idReceta],
        (err, results) => {
          if (err) {
            console.error(
              "Hubo un error en tu petición de eliminar la receta",
              err
            );
            return res.status(500).json({ message: "Error interno del servidor" });
          }

          res.status(200).json({
            message: "Receta y ingredientes de receta eliminados correctamente",
          });
        }
      );
    }
  );
};

