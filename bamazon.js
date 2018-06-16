// var mysql = require("mysql");
// var inquirer = require("inquirer");

// var connection = mysql.createConnection({
//   host: "localhost",

//   // Your port; if not 3306
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "NUCodingBootcamp",
//   database: "bamazonDB"
// });


// // creating connection with response
// var sqlCommand = 'SELECT * FROM products';
// connection.connect(function(err) {
//     if (err) {
//         console.error('connection.js:  ', err);
//     }

//     console.log('connected to bamazon! ', connection.threadId);

//     connection.query(sqlCommand, function(err,response){

//         if (err) {
//             console.error('connection.js:  ', err);}

//             console.log('response:  ', response);
//             connection.end();
//     });
// })

// // displaying items for sale 
// function queryAllProducts() {
//     connection.query("SELECT * FROM products", function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
//       }
//       console.log("-----------------------------------");
//     });
//   }

//   queryAllProducts();


//   function productSearch() {
//     inquirer
//       .prompt({
//         name: "product_name",
//         type: "input",
//         message: "What product would you like to buy?",
//         choices: ["diapers", "granola bars", "shaving cream", "coffee", "formula", "cat food", "Javascript for Kids", "toothpaste", "pens", "scissors"]
//       },
//     {
//         name: "quantity",
//         type: "input",
//         message: "How many of that item would you like to buy?"
//     })
//     .then(function(answer) {
//         var query = "SELECT id, product_name, department_name, price, stock_quantity FROM products WHERE product_name = ?";
//         connection.query(query, {product_name: answer.product_name}, function(err, res) {
//             console.log(answer.product);
    
//             // if (err) throw err;
//                 console.log(res);
//                 // connection.end();
//                 // console.log(res);
//         //   for (var j = 0; j < res.length; j++) {
//             // if (res[0].stock_quantity < answer.quantity) {
//             //     console.log("Insufficient quantity!");
//             //     // console.log("there are", ${res[0].stock_quantity}, "available in stock");
//             //     // whichProductWouldYouLike();
//             //     // return;
//             // } else {
//             //     var totalCost = answer.quantity * res[0].price;
//             //     console.log("order fulfilled!");
//             //     // var newStockQuant = res[0].stock_quantity - answer.howMany;
//             //     // connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStockQuant, answer.whichId], function(err, res) {
//             //     //     if (err) throw err;

//                 // connection.end();
//             // }
//         });
//     });
// };
  

//   productSearch();


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
        name: "product_name",
        type: "input",
        message: "What product would you like to buy?",
        choices: ["diapers", "granola bars", "shaving cream", "coffee", "formula", "cat food", "Javascript for Kids", "toothpaste", "pens", "scissors"]
      },
    {
        name: "stock_quantity",
        type: "input",
        message: "How many of that item would you like to buy?"
    })
    .then(function(answer) {
        
     
        var query = "SELECT product_name, department_name, price, stock_quantity FROM products WHERE product_name = ?;";
        connection.query(query, [answer.product_name], function(err, res) {
            console.log(answer.product_name);
            if (err) throw err;
            console.log(res);
            
            // if (err) throw err;
                
            // connection.end();
            console.log("did this work?", res);
    //   for (var j = 0; j < res.length; j++) {
        if (res[0].stock_quantity < answer.stock_quantity) {
            console.log("Insufficient quantity!");
            // console.log("there are", ${res[0].stock_quantity}, "available in stock");
            // whichProductWouldYouLike();
            // return;
        } else {
            var totalCost = answer.stock_quantity * res[0].price;
            console.log("order fulfilled!");
            var newStockQuant = res[0].stock_quantity - answer.howMany;
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStockQuant, answer.whichId], function(err, res) {
                // if (err) throw err;
                });
            
                console.log("still working?");
                console.log(`---------------------------------------------`);
                    console.log(`Your Order: ${answer.stock_quantity} ${res[0].product_name} at $${res[0].price}`);
                    console.log(`                                       `);
                    console.log(`Total Cost: $${totalCost.toFixed(2)}`);
                    console.log(`                                       `);
                    console.log(`only ${newStockQuant} ${res[0].product_name} remaining `);
                    console.log(`------------------------------------------`);
                    console.log(`                                       `);
                    productSearch();
            }
        });
    });
};
  

  productSearch();