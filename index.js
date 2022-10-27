const mysql = require('mysql');      
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'H_.s5392112',
  database : 'VERKAUFDataBase'
});


connection.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});
