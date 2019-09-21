const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ry051987kn061485",
    database: "bamazon"
});

//FUNCTIONS

//reads current items in invenory and outputs a table in the console.
let readTable = function(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("Here is the list of items we have currently in inventory: ");
        console.table(res);
    });
    connection.end();
};


connection.connect(function(err,res){
    if(err) throw err;

    //connection was successful.
    console.log("Successfully logged into thread id " + connection.threadId);
    readTable();

});

