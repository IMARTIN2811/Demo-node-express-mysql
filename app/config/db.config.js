/*Se realizan las configuracion para la conexion a la BD */
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}