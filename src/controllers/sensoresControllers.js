import connection from "../db.js";
import dotenv from "dotenv";

dotenv.config();
// Obtener información de todos los sensores /lecturas
export const getAllReadings = (req, res) => {
    connection.query("SELECT * FROM lecturas", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error interno del servidor" });
      }
      return res.status(200).json(results);
    });
  };
  
  // Obtener lecturas específicas por ID /lecturas/:id
  export const getReadingById = (req, res) => {
    const idLectura = req.params.id;
    connection.query(
      "SELECT * FROM lecturas WHERE ID_Lectura = ?",
      [idLectura],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error interno del servidor" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "Lectura no encontrada." });
        }
        res.status(200).json(results);
      }
    );
  };
  // Crear contraseña de acceso /acceso (POST)
export const createAccessPassword = (req, res) => {
    const { contraseña } = req.body;
    // "INSERT INTO contraseñas (contraseña) VALUES (?)"
  
    return res.status(201).json({ message: "Contraseña de acceso creada exitosamente" });
  };
  
  // Restablecer la contraseña de acceso /acceso (PATCH)
export const resetAccessPassword = (req, res) => {
    const { nuevaContraseña } = req.body;
    // "UPDATE contraseñas SET contraseña = ?"
  
    return res.status(200).json({ message: "Contraseña de acceso restablecida exitosamente" });
  };
  