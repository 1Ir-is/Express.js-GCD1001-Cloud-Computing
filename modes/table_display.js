var pg_con = require('./pg_config')
// define of function
 async function display_product(shop_id){
    // Query DB to get the table data
    let pro_query;
    if(shop_id == 0){
         pro_query = 'SELECT * FROM products'
    }else{
         pro_query ={
            text: 'SELECT * FROM products WHERE shop_id = $1',
            values: [shop_id]
        }
    }
    const data = await pg_con.query(pro_query)
    pg_con.end;
    // init the table_string, with the table tag

    table_string = 
    `<table border ='1'>
    <tr>`;
    // display all headers of table
    let num_fields = data.fields.length;
    for (let index = 0; index < num_fields; index++) {    
        table_string += `<th>${data.fields[index].name}</th>`     
    };
    table_string += `<th>action</th>`
   table_string += `</tr>`;
   // display all rows of table;
   let num_rows = data.rowCount;
   for (let index = 0; index < num_rows; index++) {
    table_string += `<form action="",method="post">
                    </tr>`;
    for(let j=0; j<num_fields; j++){
        let cell = data.rows[index][data.fields[j].name]
        table_string += `<td>${cell}</td>`;
    }   
    table_string += `<td>
    <button type="submit" value="insert">Insert</button>
    <button type="submit" value="delete">Delete</button>
    <button type="submit" value="update">Update</button>
    </td>`
    table_string += `</tr></form>`;
   };

    table_string += `</table>`;


return table_string;
}

module.exports = display_product;