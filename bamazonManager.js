//import npm packages
var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'bamazon_DB'
});

function promptUserInput() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'filter',
            message: 'Please select from Menu:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function (input){
        console.log(' ');
        console.log('User selected ' + input.filter + '\n' );
        console.log('============ \n');

        //perform the appropriate query
        if (input.filter === 'View Products for Sale'){
            queryByProducts();
        } else if ( input.filter === 'View Low Inventory'){
            queryByLowInventory();
        } else if ( input.filter === 'Add to Inventory'){
            queryByAddToInventory();
        } else if ( input.filter === 'Add New Product'){
            queryAddProduct();
        }
    });
}

function queryByProducts(){
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err,data){
        if (err) throw err;
        //console.log(data);

        for (var i = 0; i < data.length; i++){
            console.log([
					data[i].item_id,
					data[i].product_name,
					data[i].department_name,
					data[i].price,
                    data[i].stock_quantity
				].join(" | "));
        }
    });

}
function queryByLowInventory(){
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err,data){
    if (err) throw err;
        
        for (var i = 0; i < data.length; i++){
            if (data[i].stock_quantity < 5){
                 console.log([
					data[i].item_id,
					data[i].product_name,
					data[i].department_name,
					data[i].price,
                    data[i].stock_quantity
				].join(" | "));
            }
        }

    });

}
function queryByAddToInventory(){
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err,data){
        var productArray = [];
        if (err) throw err;
        for (var i = 0; i < data.length; i++){
            var product = data[i].product_name;
            productArray.push(product);
        }
    //console.log(productArray);

 inquirer.prompt([
        {
            type: 'list',
            name: 'inventory',
            message: 'Select which product to Add More',
            choices: productArray
        },
        {
            type: 'input',
            name: 'qtyAmount',
            message: 'How much more would you like to add?',
        }
        ]).then(function (input){
            //console.log(input.inventory);
            //console.log(input.qtyAmount);
            console.log("\n");
            console.log("================\n");
            //run show all table
            showAllWhereQuery( input.inventory );

            queryStr = 'SELECT * FROM products WHERE ?';
            connection.query(queryStr, {product_name: input.inventory}, function(err,data){
                if (err) throw err; 
                //console.log(data);
                for (var i = 0; i < data.length; i++){
                    var stock_quantity = data[i].stock_quantity;
                }
               var addQty = parseInt(stock_quantity) + parseInt(input.qtyAmount);

                queryStr = 'UPDATE products SET stock_quantity = ? WHERE product_name = ?';
                connection.query(queryStr, [addQty, input.inventory], function(err, data){
                    if (err) throw err;
                    console.log("QTY updated succesfully. \n");
                    console.log("================\n");

                });

                console.log("================\n");
                showAllWhereQuery( input.inventory );

            });

        })
});

}

function queryAddProduct(){}

function showTable() {
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err,data){
     for (var i = 0; i < data.length; i++){
            console.log([
					data[i].item_id,
					data[i].product_name,
					data[i].department_name,
					data[i].price,
                    data[i].stock_quantity
				].join(" | "));
        }
    });
}

function showAllWhereQuery ( value )  {
    queryStr = 'SELECT * FROM products WHERE ?';
            connection.query(queryStr, {product_name: value}, function(err,data){
                if (err) throw err; 
                //console.log(data);
                for (var i = 0; i < data.length; i++){
                    var stock_quantity = data[i].stock_quantity;

                     console.log([
                        data[i].item_id,
                        data[i].product_name,
                        data[i].department_name,
                        data[i].price,
                        data[i].stock_quantity + "\n"
                    ].join(" | "));
                    }
            });
}

promptUserInput();