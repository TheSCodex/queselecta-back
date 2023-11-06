import connection from "../db.js";
import dotenv from "dotenv";

dotenv.config();
// Obtener información de todos los sensores /lecturas
export const getSensores = (req, res) => {
  const query = `SELECT * FROM Sensores`
  connection.query(query, (err, result) => {
    if(err) {
      return res.status(500).json({"Error": `Ha ocurrido un error inesperado, ${err}`})
    }
    res.status(200).json({"Message": "ok", "Data": result})
  })
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
  export const createAccessPassword = (req, res) => {
    const { contrasena } = req.body;

    // validar datos del body
    if(!contrasena || typeof contrasena !== "string" || contrasena === "") {
      return res.status(401).json({"Error": "Parametros invalidos"})
    }

    // validar que es la primera vez que crea la contraseña
    const queryVerificar = `SELECT * FROM Acceso`
    connection.query(queryVerificar, [contrasena], (err, results) => {
      if(err) {
        return res.status(500).json({"Error": `Ha ocurrido un error inesperado, ${ex}`})
      }

      if(results.length > 0) {
        return res.status(401).json({"Error": "Ya se ha creado una contraseña"})
      }
      else {
        const queryAgregar = `INSERT INTO Acceso VALUES (1, ?)`
        connection.query(queryAgregar, [contrasena], (err, results) => {
          if(err) {
            console.error(err)
            return res.status(500).json({"Error": `Ha ocurrido un error inesperado, ${err}`})
          }
    
          return res.status(200).json({"Message": "Contraseña creada correctamente"})
        })
    
      }
    })
  };

export const acceder = (req,res) => {
  const contrasena = req.params.contrasena
  const query = `SELECT * FROM Acceso WHERE Contraseña = ?`

  // validar datos
  if(!contrasena || typeof contrasena !== "string" || contrasena === ""){
    return res.status(401).json({"Error": "Parametros invalidos"})
  }

  connection.query(query, [contrasena], (err ,results) => {
    if(err){
      res.status(500).json({"Error": `Ha ocurrido un error inesperado, ${err}`})
    }
    else {
      if(results.length === 0) {
        res.status(401).json({"Error":"Acceso denegado", "Status": false})
      }
      else {
        res.status(200).json({"Message": "Acceso autorizado", "Status": true})
      }
    }
  })
}
  
  // Restablecer la contraseña de acceso /acceso (PATCH)
export const resetAccessPassword = (req, res) => {
    const { nuevaContraseña } = req.body;
    // "UPDATE contraseñas SET contraseña = ?"
  
    return res.status(200).json({ message: "Contraseña de acceso restablecida exitosamente" });
  };