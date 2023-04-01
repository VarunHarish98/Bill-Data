const fs = require("fs");
let values = {
    initialValue: 011
}

fs.writeFile('users.json', JSON.stringify(values), (err) => {  
    // Catch this!
    if (err) throw err;
    console.log('Users saved!');
});