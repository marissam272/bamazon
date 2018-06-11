var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "NUCodingBootcamp",
  database: "bamazonDB"
});


// creating connection with response
var sqlCommand = 'SELECT * FROM products';
connection.connect(function(err) {
    if (err) {
        console.error('connection.js:  ', err);
    }

    console.log('connected to bamazon! ', connection.threadId);

    connection.query(sqlCommand, function(err,response){

        if (err) {
            console.error('connection.js:  ', err);}

            console.log('response:  ', response);
            connection.end();
    });
})

// displaying items for sale 
function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

  queryAllProducts();


  function productSearch() {
    inquirer
      .prompt({
        name: "product",
        type: "input",
        message: "What product would you like to buy?",
        choices: ["diapers", "granola bars", "shaving cream", "coffee", "formula", "cat food", "Javascript for Kids", "toothpaste", "pens", "scissors"]
      },
    {
        name: "quantity",
        type: "input",
        message: "How many of that item would you like to buy?"
    }
    )
      .then(function(answer) {
        var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { product: answer.product }, 
            function(err, res) {
                if (err) throw err;
        //   for (var j = 0; j < res.length; j++) {
            if (res[0].stock_quantity < answer.quantity) {
                console.log("Insufficient quantity!");
                // console.log("there are", ${res[0].stock_quantity}, "available in stock");
                // whichProductWouldYouLike();
                // return;

            } else {
                var totalCost = answer.quantity * res[0].price;
                console.log("order fulfilled!");
                // var newStockQuant = res[0].stock_quantity - answer.howMany;
                // connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStockQuant, answer.whichId], function(err, res) {
                //     if (err) throw err;
            }
                });
            
      });
  

  productSearch();


//   connection.connect(function(err) {
//     if (err) throw err;
//   //   runSearch();
//   console.log("did this work?");
//   });

// function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "list",
//       message: "What would you like to buy?",
//       choices: [
//         "Find songs by artist",
//         "Find all artists who appear more than once",
//         "Find data within a specific range",
//         "Search for a specific song"
//       ]
//     })
//     .then(function(answer) {
//       switch (answer.action) {
//       case "Find songs by artist":
//         artistSearch();
//         break;

//       case "Find all artists who appear more than once":
//         multiSearch();
//         break;

//       case "Find data within a specific range":
//         rangeSearch();
//         break;

//       case "Search for a specific song":
//         songSearch();
//         break;
//       }
//     });
// }