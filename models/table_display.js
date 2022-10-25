var pg_conn = require('./pg_config');
// Define a function to display products table for a shop
async function display_products(shop_id){
    // Query DB to get the table data 
    var products_query;
    if (shop_id==0){
        products_query ='SELECT * FROM products';
        }
    else{
        products_query = {
            text: 'SELECT * FROM products WHERE shop_id=$1',
            values: [shop_id]
        }
    }
    const data = await pg_conn.query(products_query);
    // pg_conn.end();
    // init the table_string, with the table tag
    let table_string = 
        `<table border='1'>
            <tr>`;
    //display all headers of table
    let num_fields = data.fields.length;
    for (let i=0; i<num_fields; i++) {
        table_string += `<th>${data.fields[i].name}</th>`;
    };

    table_string += `<th>actions</th>`
    
    table_string += `</tr>`;
    //display all rows of table
    let  num_rows = data.rowCount;
    console.log("Num rows: " + num_rows)
    for (let i=0; i<num_rows; i++) {
        table_string += `<form action="/users/crud" method="post">
                        <tr>`;
        for (let j=0; j<num_fields; j++) {
            let field_name = data.fields[j].name
            let cell = data.rows[i][field_name];  
            table_string += `<td><input type="text" name= ${field_name} value=${cell}></td>`;
        }

       table_string += 
       `<td> 
            <button type='submit' name='crud' value='delete'>Delete</button>
            <button type='submit' name='crud' value='update'>Update</button>
        </td>
        </tr></form>` 
    } 
    // Add an empty row and insert button at the end of row
    table_string += `<tr><form action="/users/crud" method="post">`
    for (let j=0; j<num_fields; j++) {
        let field_name = data.fields[j].name
        table_string += `<td><input type="text" name= ${field_name} ></td>`;
    }
    table_string += 
    `<td> 
        <button type='submit' name='crud' value='insert'>Insert</button>
    </td>`
    table_string += `</tr></form></table>`;
    // console.log("DATA: -->")
    // console.log(data)
    // console.log(table_string)
    return table_string;
}

module.exports = display_products;
