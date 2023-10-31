import connection from "../db.js";
import dotenv from 'dotenv'

dotenv.config()

// Recibir todas las recetas

export const getAllRecipes = (req, res) => {
    connection.query("SELECT recetas.*, recetasdetalle.* FROM recetas LEFT JOIN recetasdetalle ON recetas.ID_Receta = recetasdetalle.ID_Receta", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error interno" })
        }
        res.status(200).json(results);
    });
};

// recibir una receta

export const getOneRecipe = (req, res) => {
    const idReceta = req.params.id;

    connection.query("SELECT recetas.*, recetasdetalle.* FROM recetas LEFT JOIN recetasdetalle ON recetas.ID_Receta = recetasdetalle.ID_Receta WHERE recetas.ID_Receta = ?",
        [idReceta], (err, results) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ message: "Error interno del servidor" })
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "Receta no encontrada." })
            }
            res.status(200).json(results)
        });
};

// Crear una receta

export const createRecipe = (req, res) => {
    const { Nombre_Receta, detalles } = req.body;

    connection.query(
        "INSERT INTO recetas (Nombre_Receta) VALUES (?)",
        [Nombre_Receta],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error al crear la receta" });
            }

            const recetaID = result.insertId;

            if (detalles && detalles.length > 0) {
                const detalleValues = detalles.map((detalle) => [
                    recetaID,
                    detalle.Cantidad,
                    detalle.ID_Medida,
                    detalle.Instruccion_Preparacion,
                    detalle.Tiempo_Coccion,
                    detalle.ID_Dificultad,
                    detalle.ID_Categoria,
                    detalle.ID_OrigenReceta,
                    detalle.descripcion
                ]);

                connection.query(
                    "INSERT INTO recetasdetalle (ID_Receta, ID_Ingrediente, Cantidad, ID_Medida, Instruccion_Preparacion, Tiempo_Coccion, ID_Dificultad, ID_Categoria, ID_OrigenReceta, descripcion) VALUES ?",
                    [detalleValues],
                    (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ message: "Error al crear los detalles de la receta" });
                        }

                        res.status(201).json({ message: "Receta creada con éxito" });
                    }
                );
            } else {
                res.status(400).json({ message: "Ingresa los detalles de la receta" });
            }
        }
    );
}

// Actualizar una receta

export const updateRecipe = (req, res) => {
    const recetaID  = req.params.id;
    const {Nombre_Receta, detalles} = req.body;

    connection.query(
        "UPDATE recetas SET Nombre_Receta = ? WHERE ID_Receta = ?",
        [Nombre_Receta, recetaID],
            (err, results) => {
                if (err) {
                    console.error(err)
                    return res.status(500).json({message: "Error interno del servidor"})
                }


                if (detalles && detalles.length > 0) {
                    const detalleValues = detalles.map((detalle) => [
                        detalle.ID_Ingrediente,
                        detalle.Cantidad,
                        detalle.ID_Medida,
                        detalle.Instruccion_Preparacion,
                        detalle.Tiempo_Coccion,
                        detalle.ID_Dificultad,
                        detalle.ID_Categoria,
                        detalle.ID_OrigenReceta,
                        detalle.descripcion,
                        recetaID,
                    ]);

                    console.log(detalleValues)

                    const detalleFlat = detalleValues.flat()
                    console.log(detalleFlat)

                    connection.query(
                        "UPDATE recetasdetalle SET " +
                        "ID_Ingrediente = ?, " +
                        "Cantidad = ?, " +
                        "ID_Medida = ?, " +
                        "Instruccion_Preparacion = ?, " +
                        "Tiempo_Coccion = ?, " +
                        "ID_Dificultad = ?, " +
                        "ID_Categoria = ?, " +
                        "ID_OrigenReceta = ?, " +
                        "descripcion = ? " +
                        "WHERE ID_Receta = ?",
                        detalleFlat , (err) => {
                            if (err) {
                                console.error('Hubo un error', err)
                                return res.status(500).json({message: "Error interno del servidor"})
                            }
                            res.status(200).json({message: "Receta y detalles actualizados con éxito"})
                        }
                    )
                } else {
                    console.log(recetaID)
                    res.status(200).json({message: "Se actualizó el nombre de la receta con éxito."})
                }
            }
    )
}

export const deleteRecipe = (req, res) => {
    const idReceta = req.params.id;

    connection.query("DELETE FROM recetas WHERE ID_Receta = ?", [idReceta], (err, results) => {
        if (err) {
            console.error('Hubo un error en tu petición de eliminar la receta', err)
            return res.status(500).json({ message: "Error interno del servidor" });
        }

        connection.query("DELETE FROM recetasdetalle WHERE ID_Receta = ?", [idReceta], (err, results) => {
            if (err) {
                console.error('Hubo un error en tu petición de eliminar los detalles de la receta', err);
                return res.status(500).json({ message: "Error interno del servidor" });
            }

            res.status(200).json({ message: "Receta y detalles de receta eliminados correctamente" });
        });
    });
}
