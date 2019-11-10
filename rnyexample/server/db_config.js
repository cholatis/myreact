const mysql = require('mysql');

// --------------------------------------------

//const mHost = "localhost";
const mHost = "13.76.133.129";
const mUsername = "root";
const mPassword = "";
const mDatabase = "rn_codemobiles";


const conn = mysql.createConnection({
    host: mHost,
    user: mUsername,
    password: mPassword,
    database: mDatabase
});

connectDB(); 

function connectDB() {
    const conn = mysql.createConnection({
        host: mHost,
        user: mUsername,
        password: mPassword,
        connectTimeout: 300000
    });
    conn.connect((error) => {
        console.log(error);
        conn.query("CREATE DATABASE IF NOT EXISTS " + mDatabase + " CHARACTER SET utf8 COLLATE utf8_general_ci", function (error, result) {
            console.log("Database Available");
            connectTableUsers();
            connectTableUpload();
        });
    });
}

function connectTableUsers() {
    var sql = "CREATE TABLE IF NOT EXISTS users ( id INT PRIMARY KEY AUTO_INCREMENT, username varchar(250) NOT NULL UNIQUE, password varchar(250) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8";
    conn.query(sql, function (error, result) {
        if (error) throw error;
        console.log("Table User Available");
    });
}

function connectTableUpload() {
    var sql = "CREATE TABLE IF NOT EXISTS upload ( id INT PRIMARY KEY AUTO_INCREMENT, username varchar(250) NOT NULL, servername varchar(250) NULL, orgname varchar(250) NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8";
    conn.query(sql, function (error, result) {
        if (error) throw error;
        console.log("Table upload Available");
    });
}


module.exports.conn = conn;