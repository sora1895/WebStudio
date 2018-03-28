var connection = require('./connectDB');

connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

exports.register = function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password": req.body.password,
    "created": today,
    "modified": today
  }
  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
}


exports.login = function (req, res) {
  var admin_id = req.body.id;
  var password = req.body.password;
  connection.query('SELECT * FROM user WHERE user_id = ?', [admin_id], function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].User_Password == password) {
          if(results[0].User_Role=='admin'){
            res.send({
              "code": 200,
              "success": "login sucessfull",
              "role":"admin"
            });
          }else{
            res.send({
              "code": 200,
              "success": "login sucessfull",
              "role":"user"
            });
          }
          
        }
        else {
          console.log(results[0]);
          console.log('Password: ' + password);
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
        });
      }
    }
  });
}

