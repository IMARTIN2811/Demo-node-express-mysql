const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const cors = require("cors");

/* 
var corsOptions = {
    origin: "http://localhost:8081"
};
*/

//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*Crea la ruta de ejecucion */
app.get("/",(req,res)=>{
    res.json({ message: "Bienvenido!!" })
});

/* Se especifica el puerto */
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`El servidor se está ejecutando en el puerto: ${PORT}.`);
});