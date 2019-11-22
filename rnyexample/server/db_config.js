const mysql = require('mysql');

// --------------------------------------------

//const mHost = "localhost";
global.mHost = "13.76.133.129";
global.mUsername = "root";
global.mPassword = "";
global.mDatabase = "rn_codemobiles";


const conn = mysql.createConnection({
    host: mHost,
    user: mUsername,
    password: mPassword,
    database: mDatabase
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
function startConnection() {
    console.error('CONNECTING...');
    const conn = mysql.createConnection({
        host: mHost,
        user: mUsername,
        password: mPassword,
        database: mDatabase,
        connectTimeout: 300000
    });
    conn.connect(function(err) {
        if (err) {
            console.error('CONNECT FAILED', err.code);
            startConnection();
        }
        else{
            console.error('CONNECTED');
            conn.query("CREATE DATABASE IF NOT EXISTS " + mDatabase + " CHARACTER SET utf8 COLLATE utf8_general_ci", function (error, result) {
                console.log("Database Available");
                connectTableUsers();
                connectTableUpload();
            });
    
        }
    });
    conn.on('error', function(err) {
        if (err.fatal)
            startConnection();
    });
}

startConnection();


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

// testing a select every 3 seconds :
// to try the code you can stop mysql service => select will fail
// if you start mysql service => connection will restart correctly => select will succeed
setInterval(function() {
    conn.query('select 1', function(err, results) {
        if (err) console.log('SELECT', err.code);
        else console.log('SELECT', results);
    });
}, 300000);

module.exports.conn = conn;