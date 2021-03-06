const mysql = require('mysql');

// --------------------------------------------

//const mHost = "localhost";
global.mHost = "13.76.134.183";
global.mUsername = "root";
global.mPassword = "password";
global.mDatabase = "rn_codemobiles";


const orgconn = mysql.createConnection({
    host: mHost,
    user: mUsername,
    password: mPassword,
    database: mDatabase,
    connectTimeout: 300000
});

/*
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
*/

//Fix this error
//Error: Cannot enqueue Query after fatal error.
//The issue is that you are only using a single connection for the entire life of your application, and once the connection has a fatal error (like the connection was closed by your MySQL server due to idling), the connection will be destroyed.
//Calling connection.connect(); does not re-establish a killed connection, only connect a never-connected connection.
connectDB(); 

function connectDB() {
    const orgconn = mysql.createConnection({
        host: mHost,
        user: mUsername,
        password: mPassword,
        connectTimeout: 300000
    });
    orgconn.connect((error) => {
        console.log(error);
        orgconn.query("CREATE DATABASE IF NOT EXISTS " + mDatabase + " CHARACTER SET utf8 COLLATE utf8_general_ci", function (error, result) {
            console.log("Database Available");
            connectTableUsers();
            connectTableUpload();
        });
    });


}

function connectTableUsers() {
    var sql = "CREATE TABLE IF NOT EXISTS users ( id INT PRIMARY KEY AUTO_INCREMENT, username varchar(250) NOT NULL UNIQUE, password varchar(250) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8";
    orgconn.query(sql, function (error, result) {
        console.log("Table User Available");
    });       
}

function connectTableUpload() {
    var sql = "CREATE TABLE IF NOT EXISTS upload ( id INT PRIMARY KEY AUTO_INCREMENT, username varchar(250) NOT NULL, servername varchar(250) NULL, orgname varchar(250) NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8";
    orgconn.query(sql, function (error, result) {
        console.log("Table upload Available");
    });
}

// testing a select every 3 seconds :
// to try the code you can stop mysql service => select will fail
// if you start mysql service => connection will restart correctly => select will succeed
/*setInterval(function() {
    conn.query('select 1', function(err, results) {
        if (err) {
            console.log('SELECT', err.code);
            startConnection();
        }
        else console.log('SELECT', results);
    });
}, 300000);
*/

const conn = mysql.createPool({
    host: mHost,
    user: mUsername,
    password: mPassword,
    database: mDatabase,
    connectionLimit: 100,
    waitForConnections: true,
    queueLimit: 0,
    debug: false,
    connectTimeout: 300000
});

module.exports.conn = conn;