const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { markAsUntransferable } = require('worker_threads');




const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"19682121",
    database:"VERKAUFDataBase"
});
connection.connect((err) => {
  if (err) {
      console.log('Connection error message: ' + err.message);
      return;
  }
  console.log('Connected!')
});
