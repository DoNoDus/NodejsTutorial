const mysql = require('mysql2'); 
const connection2 = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'banking'
});

// ทำการเชื่อมต่อกับฐานข้อมูล 
connection2.connect(function(err){
  if (err) throw err
  console.log('You are now connected with mysql database...');
});

module.exports = connection2;

