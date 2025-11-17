import mysql from "mysql2/promise";

const config = {
    host: "localhost",
    user: "root",
    database: "intro_api",
    connectionLimit: 10,
};

export const pool = mysql.createPool(config);