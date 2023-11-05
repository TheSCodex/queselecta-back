import connection from "../db.js";

export const getIngredients = (req, res) => {
  connection.query("SELECT * FROM ingredientes", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error Interno del servidor" });
    }
    return res.status(200).json(results);
  });
};

export const getIngredientsById = (req, res) => {
  const idIngrediente = req.params.id;
  connection.query(
    "SELECT * FROM ingredientes WHERE ID_Ingrediente = ?",
    [idIngrediente],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Ingrediente no encontrado." });
      }
      res.status(200).json(results[0]);
    }
  );
};

export const createIngredient = (req, res) => {
  const { Ingrediente } = req.body;
  const Receta_ID = req.params.Receta_ID;
  connection.query(
    "INSERT INTO ingredientes (Ingrediente, Receta_ID) VALUES (?, ?)",
    [Ingrediente, Receta_ID],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Interno del Servidor" });
      }
      res.status(201).json({ message: "Ingrediente creado exitosamente" });
    }
  );
};


export const deleteIngredient = (req, res) => {
  const idIngrediente = req.params.id;
  connection.query(
    "DELETE FROM ingredientes WHERE ID_Ingrediente = ?",
    [idIngrediente],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error Interno en el servidor" });
      }
      return res
        .status(200)
        .json({ message: "Ingrediente eliminado exitosamente" });
    }
  );
};

export const updateIngredient = (req, res) => {
  const idIngrediente = req.params.id;
  const { Ingrediente } = req.body;
  connection.query(
    "UPDATE ingredientes SET Ingrediente = ? WHERE ID_Ingrediente = ?",
    [Ingrediente, idIngrediente],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error Interno del servidor" });
      }
      return res
        .status(201)
        .json({ message: "Ingrediente Actualizado exitosamente" });
    }
  );
};
