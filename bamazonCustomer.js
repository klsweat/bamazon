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

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res){
    if (err) throw err;

    for (var i = 0; i < res.length; i++){
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("\n");
    console.log('.....................\n');
    promptUserInput();
});

function promptUserInput(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'filter',
            message: 'Please enter the item id you would like to buy.',
        },
        {
            type: 'input',
            name: 'qty',
            message: 'How many units would you like to buy?'
        }
    ]).then(function (input){
        queryStr = "SELECT * FROM products WHERE ?";
        connection.query(queryStr, {item_id: input.filter}, function(err, data){
            if (err) throw err;
            //console.log(data);
                console.log(' ');
                console.log('.....................\n');


            	for (var i = 0; i < data.length; i++) {
                    var newQty = data[i].stock_quantity - input.qty;
				console.log([
				"Item Id Entered: " + data[i].item_id +
                "\nProduct Name Requested: " + data[i].product_name + 
                "\nAvailable Quantity: " + data[i].stock_quantity +
                "\nPrice: $" + data[i].price + "\n" 
				].join(" | "));
                console.log('.....................\n');
                //console.log(newQty);
                if (input.filter > data[i].stock_quantity) {
                    console.log("Insufficient quantity!");

                } else {
                    console.log("We have " + data[i].stock_quantity + " available \n");

                    queryStr = 'UPDATE products SET stock_quantity = ? where item_id = ?';
                    connection.query(queryStr, [newQty, input.filter ], function (err, value){
                        if (err) throw err;
                    });

                    queryStr = "SELECT * FROM products WHERE ?";
                    connection.query(queryStr, {item_id: input.filter}, function(err, data){
                        if (err) throw err;
                        for (var i = 0; i < data.length; i++) {
                            console.log("Payment was Succesful! We now have " + data[i].stock_quantity + " available \n");
                        }
                        console.log('.....................\n');

                    });

                }
                console.log('.....................\n');

			}

        });


        //console.log(input.filter);
        //console.log(input.qty);

    });
}

