import connection from "../db.js";
import dotenv from "dotenv"

dotenv.config()

// GET all inventory
export const getAllInventory = (req, res) => {
    const query = `SELECT * FROM Almacen`

    connection.query(query, (err, results) => {
        if(err) {
            console.error(err)
            return res.status(500).json({"Error": `Ha ocurrido un error inesperado, ${err}`})
        }

        res.status(200).json({"Message": "Peticion exitosa", "Data": results})
    })
}

// GET specific element
export const getInventoryElement = (req,res) => {
    const idElement = req.params.id
    const query = `SELECT * FROM Almacen WHERE ID = ${idElement}`

    connection.query(query, (err, results) => {
        if(err) {
            console.error(err)
            return res.status(401).json({"Error": `Ha ocurrido un error inesperado ${err}`})
        }
        if (results.length === 0) {
            return res.status(404).json({ "Message": "Elemento no encontrada" })
        }

        res.status(200).json({"Message": "Elemento encontrado", "Data": results})
    })
}

// POST add to inventory
export const addElement = (req,res) => {
    const { nombreProducto, cantidadProducto, categoria } = req.body

    /*
        Poner en el body de la peticion la siguiente estructura:
        {
            "nombreProducto": "nombre",
            "cantidadProducto": numero,
            "categoria": "categoria"
        }
    */

    // Validar los parámetros del body
    if (
        !nombreProducto || typeof nombreProducto !== 'string' || nombreProducto === "" ||
        (typeof cantidadProducto !== 'number' || isNaN(cantidadProducto) || cantidadProducto < 0) ||
        !categoria || typeof categoria !== 'string' || categoria === ""
    ) {
        return res.status(400).json({ "Error": "Parámetros inválidos" });
    }
    
    const query = `INSERT INTO Almacen (nombre_producto, cantidad_producto, Categoria) VALUES (?, ?, ?)`

    connection.query(query, [nombreProducto, cantidadProducto, categoria], (err, results) => {
        if(err) {
            console.log(err)
            return res.status(401).json({"Error": `Ha ocurrido un error inesperado ${err}`})
        }

        res.status(200).json({"Message": "Elemento añadido con exito"})
    })
}

// PATCH edit element
export const updateElement = (req, res) => {
    const { nombreProducto, cantidadProducto, categoria } = req.body
    const idElement = req.params.id

    // Validar los parámetros del body
    if (
        !nombreProducto || typeof nombreProducto !== 'string' || nombreProducto === "" ||
        (typeof cantidadProducto !== 'number' || isNaN(cantidadProducto) || cantidadProducto < 0) ||
        !categoria || typeof categoria !== 'string' || categoria === ""
    ) {
        return res.status(400).json({ "Error": "Parámetros inválidos" });
    }

    const query = `UPDATE Almacen SET nombre_producto = ?, cantidad_producto = ?, Categoria = ? WHERE ID = ?`

    connection.query(query, [nombreProducto, cantidadProducto, categoria, idElement], (err, results) => {
        if(err) {
            console.log(err)
            return res.status(401).json({"Error": `Ha ocurrido un error inesperado ${err}`})
        }

        res.status(200).json({"Message": "Elemento editado con exito"})
    })
}

// DELETE delete element
export const deleteElement = (req, res) => {
    const idElement = req.params.id
    const query = `DELETE FROM Almacen WHERE ID = ?`

    if(!query) {
        return res.status(401).json({"Error": "Id invalido"})
    }

    connection.query(query, [idElement], (err, results) => {
        if(err) {
            console.log(err)
            return res.status(401).json({"Error": `Ha ocurrido un error inesperado ${err}`})
        }

        res.status(200).json({"Message": "Elemento eliminado con exito"})
    })
}