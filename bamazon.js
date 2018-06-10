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


function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

  queryAllProducts();



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
//       message: "What would you like to do?",
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