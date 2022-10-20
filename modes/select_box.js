function gen_box(){
    let box_string =  
    `<label for="cars">Choose a shop:</label>
        <select name="cars" id="cars">
          <option value="1">Shop A</option>
          <option value="2">Shop B</option>
          <option value="0">All Shop</option>
        </select>`;
    return box_string;
}

module.exports = gen_box;