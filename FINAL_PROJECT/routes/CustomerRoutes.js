var connection = require('./connectDB');

exports.GetCustomer = function (req, res) {
    connection.query('select * from customer', function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        if (results.length > 0) {
          res.send({
            "code": 200,
            "data": results,
          });
        }
        else {
          res.send({
            "code": 204,
            "success": "district does not exits"
          });
        }
  
      }
    });
  }

  exports.GetCustomerByName = function (req, res) {
    var name = req.query.name;
    var phone = req.query.phone;
    var sql=""
    if(phone){sql=" and Customer_Number ='"+phone+"'"}
    connection.query("select * from customer where Customer_Name LIKE '%"+name+"%'"+sql, function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        if (results.length > 0) {
          res.send({
            "code": 200,
            "data": results,
          });
        }
        else {
          res.send({
            "code": 204,
            "success": "district does not exits"
          });
        }
  
      }
    });
  }