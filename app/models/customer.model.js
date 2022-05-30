const sql = require("../config/db.connect")

/*Se crea una funcion las variables de la tabla */
const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
};

/*Crea el método para el insert */
Customer.createClient = (newClient,result) =>{
    sql.query("INSERT INTO customers SET ?", newClient, (err,res) =>{
        if (err) {
            console.log("error:", err);
            result(err,null);
            return;
        }
        console.log("CLIENTE CREADO:", { id:res.insertId,...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

/*Crea el método para el select*/
Customer.findById = (clientId,result)=>{
    sql.query(`SELECT * FROM customers WHERE id= ${clientId}`, (err,res)=>{
        if (err) {
            console.log("error:",err);
            result(err,null);
            return;
        }
        /*Busca el cliente y lo visualiza */
        if (res.length) {
            console.log("Cliente encontrado:",res[0]);
            result(null,res[0]);
            return;
        }
        /*Sino lo encuentra manda un mensaje de error*/
        result({ kind: "No encontrado" }, null);
    });
};

/*Metodo paraa hacer un select y visualizar todos los registros */
Customer.getAllClient = result=>{
    sql.query("SELECT * FROM customers", (err,res)=>{
        if (err) {
            console.log("error:", err);
            result(null,err);
            return;
        }

        /*Muestra el resultado */
        console.log("Clientes:", res);
        result(null,res);
    });    
};

/*Crea el metodo para actualizar los datos */
Customer.updateById = (id,client,result)=>{
    sql.query("UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [client.email,client.name,client.active, id],
    (err,res) =>{
        if (err) {
            console.log("error:",err);
            result(null,err);
            return;
        }
        /*Verifica si el registro existe */
        if (res.affectedRows == 0) {
            result({ kind: "No encontrado" }, null);
        }

        /*Visualiza los resultados */
        console.log("Cliente actualizado:", { id: id, ...client });
        result(null, { id: id, ...client });
    });
};

/*Metodo para eliminar los registros*/
Customer.deleteClient = (id,result)=>{
    sql.query("DELETE FROM customers WHERE id = ?", id, (err,res)=>{
        if (err) {
            console.log("error:", err);
            result(null, err);
            return;
        }
        /*Verifica si el registro existe*/
        if (res.affectedRows == 0) {
            result({ kind: "No encontrado" }, null);
            return;
        }

        /*Visualiza el resultado */
        console.log("El cliente eliminado con id:", id)
        result(null, res);
    });
};

/*Metodo para eliminar todos los registros */
Customer.deleteAllClient = result =>{
    sql.query("DELETE FROM customers", (err,res) =>{
        if (err) {
            console.log("error:", err);
            result(null,err);
            return;
        }
        /*Visualiza el resultado */
        console.log(`deleted ${res.affectedRows} customers`);
        result(null, res);
    });
};

module.exports = Customer;