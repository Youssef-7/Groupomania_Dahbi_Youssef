// import mysql from "mysql2";
const mysql = require("mysql2");
  
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usr_main_p7',
  password: 'pwd_main_p7',
  database: 'db_p7_projet',
  multipleStatements: true
});
 
// export default connection;
module.exports = connection;