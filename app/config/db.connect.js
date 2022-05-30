const mysql = require("mysql");
const dbConfig = require("../config/db.config");

/*Se crea la conexión */
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

/*Se abre la conexión y manda un mensaje*/
connection.connect(error =>{
    if (error) throw error;
    console.log("Se ha conectado a la base de datos correctamente.");
});

module.exports = connection;