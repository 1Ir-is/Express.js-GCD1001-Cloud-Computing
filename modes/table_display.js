const pg_con = require("./pg_config");

async function display_products(shop_id){
    //query db to get the data table
    let product_query = {
        text: 'SELECT * FROM products WHERE shop_id=$1',
        values: [shop_id]
    }

    const data = await pg_con.query(product_query);
    pg_con.end();

    //init the table string, with the tale tag
    let table_string = 
    `<table border='1'>
        <tr>`
    //display header of table
    let num_fields = data.fields.length;
    for(let i =0;i<num_fields;i++)
    {
        table_string += `<th> ${data.fields[i].name}</th>`;
    };
    table_string += `</tr>`;
    //display all row of table
    let num_rows = data.rowCount;
    for(let i = 0; i < num_rows; i++)
    {
        table_string += `</tr>`;
        for(let j=0;j<num_fields;j++){
            let fields_name = data.fields[j].name
            let cell = data.rows[i][fields_name];
            table_string += `<td> ${cell}</td>`;
        }
        table_string += `</tr>`;
    };
    table_string += `</table>`;
            
  return table_string;
}

module.exports = display_products;