const express = require('express');
const app = express.Router();
var mysql = require('mysql');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const database = require("./db_config");
var bcrypt = require('bcryptjs');
const { getToken, verifyToken } = require('./jwtHandler');

// --------------------------------------------

const result_failed = {
  result: "failed",
  data: ""
};

app.post('/uploads', function (req, res) {
  console.log("Upload File");
  //console.log(req.body);
  
  //res.json( {result: "blank"})

  try {
    var form = new formidable.IncomingForm();
    var newname = Date.now();
    
    form.parse(req, function (err, fields, files) {

        console.log(JSON.stringify(files));
        var oldpath = files.userfile.path;
        var newpath = path.join(__dirname, "./upload/" + newname.toString() + "." + files.userfile.name.split('.').pop());
        
        console.log("old: "+oldpath);
        console.log("new: "+newpath);


        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;

          var username = fields.username;
          var password =fields.password;
          console.log("username: " + username);
          console.log("password: " + password);

          var values = [
            [username, newname.toString() + "." + files.userfile.name.split('.').pop(), files.userfile.name]
          ];
          var sql = `INSERT INTO upload (username, servername, orgname) VALUES ?`;

          database.conn.getConnection(function(err, connection) {
            if (err) { console.log("getConnection: "+err); throw err;} // not connected!
          
            // Use the connection
            connection.query(sql, [values], function (error, results, fields) {
              if (error) {
                console.log("query: "+error);
                res.json(result_failed);
              } else {
                console.log("1 record upload inserted");
              }
              });
          });
        

          res.json({result: "Upload Successfully"});

        });            
    });
  } catch (err) {
      console.log("err : " + err);
  }

});

app.post('/register', (req, res) => {
  console.log(req.body);
  const obj = req.body;
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPassword;
  console.log(req.body);

  var values = [
    [req.body.username, req.body.password]
  ];
  var sql = `INSERT INTO users (username, password) VALUES ?`;
  database.conn.getConnection(function(err, connection) {
    if (err) { console.log("getConnection: "+err); throw err;} // not connected!
  
    // Use the connection
    connection.query(sql, [values], function (error, results, fields) {
      if (error) {
        console.log("query: "+error);
        res.json(result_failed);
      } else {
        const finalResult = {
          result: "success",
          data: ""
        };
        res.json(finalResult);
        console.log("1 record inserted");
      }
      });
  });

});

app.post('/login', (req, res) => {
  console.log(req.body);
  const obj = req.body;

  var sql = `SELECT 
             id,             
             username, 
             password 
             FROM users 
             where username = '${req.body.username}'`;

  database.conn.getConnection(function(err, connection) {
    if (err) { console.log("getConnection: "+err); throw err;} // not connected!
  
    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("query: "+error);
        res.json(result_failed);
      } else {
        if (results.length > 0) {
          const passwordIsValid = bcrypt.compareSync(req.body.password, results[0].password);
          if (!passwordIsValid) return res.json(result_failed);
  
          var _username = results[0].username;
          var _id = results[0].id;
  
          var token = getToken({ id: _id, username: _username })
  
          const finalResult = {
            result: "success",
            data: token
          };
  
          console.log(JSON.stringify(finalResult));
          res.json(finalResult);
        } else {
          const finalResult = {
            result: "failed",
            data: ""
          };
          console.log(JSON.stringify(finalResult));
          res.json(finalResult);
        }
      }
  
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (error) { console.log("release: "+error); throw error;} // not connected!
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });

  
});

app.get('/feed', verifyToken, (req, res) => {
  res.json({ result: "success" })
});

app.get('/feedupload', verifyToken, (req, res) => {
  var sql = `SELECT 
  id,             
  username, 
  servername,
  orgname 
  FROM upload
  order by id desc`; 


  database.conn.getConnection(function(err, connection) {
    if (err) { console.log("getConnection: "+err); throw err;} // not connected!
  
    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("query: "+error);
        res.json(result_failed);
      } else {
        console.log({upload: results});
        res.json({upload: results});
      }
  });
  });


});

app.get('/feedpage', verifyToken, (req, res) => {
  console.log(req.query);
  var sql = `SELECT 
  id,             
  username, 
  servername,
  orgname 
  FROM upload
  order by id asc
  LIMIT ${(req.query.page - 1)*(req.query.rowno)}, ${req.query.rowno}`; 

  database.conn.getConnection(function(err, connection) {
    if (err) { console.log("getConnection: "+err); throw err;} // not connected!
  
    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("query: "+error);
        res.json(result_failed);
      } else {
        console.log({page: results});
        res.json({page: results});
      }
  });
  });

});

app.get('/feedcount', verifyToken, (req, res) => {
  console.log(req.query);
  var sql = `SELECT count(*) as cnt
  FROM upload`; 

  database.conn.getConnection(function(err, connection) {
    if (err) { console.log("getConnection: "+err); throw err;} // not connected!
  
    // Use the connection
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("query: "+error);
        res.json(result_failed);
      } else {
        console.log({cnt: results});
        res.json({cnt: results});
      }
  });
  });

});

app.get('/check', (req, res) => {
  res.set('Content-Type', 'text/html');
  var str = "<h2>Connection State: "+database.conn.state+"</h2>";
  res.send(new Buffer(str));
});

module.exports = app;