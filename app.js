const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

//FUNCTIONS

//reads current items in invenory and outputs a table in the console.
let readTable = function(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("Here is the list of items we have currently in inventory: ");
        console.table(res);
        console.log("------------------------------------------------- ");
        inventorySearch();
    });
};
let readTable2 = function(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        console.log("Here is the updated list of items: ");
        console.table(res);
        console.log("------------------------------------------------- ");
        return
    });
};

let inventorySearch = function() {
    inquirer.prompt({
        name: "itemId",
        type: "input",
        message: "Please select an item_id assigned to the corresponding item you'd like to purchase."
      })
      .then(function(answer) {
        inquirer.prompt({
            name: "qty",
            type: "input",
            message: "How many would you like to purchase?"
          }).then(function(answer2){
            console.log(answer.itemId + answer2.qty);
            //function query
            fulfillment(answer.itemId,answer2.qty);
          });
      });
  };

  let fulfillment = function(itemId,qty){
      var selectQuery = "SELECT * from products WHERE ?";
      var totalQuery = "SELECT stock_quantity from products where ?";
      var updateQuery = "UPDATE products SET stock_quantity = ? where item_id = ?";
      var costQuery = "SELECT price from products where ?";
      

      //QUERY SELECTION
      connection.query(selectQuery, {item_id: itemId}, function(err, res) {
          if(err) throw err;
    //   console.log(`${itemId} and ${qty}`);
        console.log("You have selected the following item.")
        console.table(res);
        console.log("------------------------------------------------- ");
        console.log()
      });

      //QUERY TOTAL
      connection.query(totalQuery, {item_id: itemId}, function(err, res) {
        var stockQty = res[0]["stock_quantity"];
        if(err) throw err;
        console.log(`We have ${stockQty - qty} left of this item.`);
      console.log("------------------------------------------------- ");

      if(stockQty - qty >= 0){
        var newQty = stockQty - qty;
      //UPDATE STOCK
        connection.query(updateQuery, [newQty, itemId], function(err,res){
            console.log(`Your order was successfully placed!`);
            readTable2();

            // TOTAL COST CALCULATION
            connection.query(costQuery, {item_id: itemId }, function(err,res){
                console.log(`The total cost for your order is: `);
                console.log(`$${Math.round(100*(res[0]["price"] * qty))/100}`);
                console.log("THANK YOU FOR YOUR ORDER!");
                connection.end();
            });
        });
      }else{
        console.log("We do not have enough stock, please select a new item or new quantity.");
        readTable();
        console.log("------------------------------------------------- ");
        console.log("------------------------------------------------- ");
      }
    });
  };

connection.connect(function(err,res){
    if(err) throw err;
    //connection was successful.
    console.log("Successfully logged into thread id " + connection.threadId);
    readTable();
});

