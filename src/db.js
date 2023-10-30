import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.SQLHOST,
    user: process.env.SQLUSER,
    password: process.env.SQLPASS,
    database: process.env.SQLDB,
    port: process.env.SQLPORT,
})

export default connection;