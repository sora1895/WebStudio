var connection = require('./connectDB');

exports.GetPackage = function (req, res) {
  connection.query('select * from package', function (error, results, fields) {
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

exports.GetPackByName = function (req, res) {
  var name = req.body.PackName;
  console.log(name);
  connection.query("SELECT * FROM Package WHERE Package_Name LIKE '%"+name+"%'", function (error, results, fields) {
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

exports.GetPackByStuId = function (req, res) {
  var id = req.query.id;
  console.log(id);
  connection.query("SELECT * FROM Package WHERE Package_Available =1 and  Studio_ID= "+id, function (error, results, fields) {
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

/*exports.GetPackIdByName = function (req, res) {
  var name = req.query.newName;
  console.log(name);;
  connection.query("SELECT Package_ID FROM Package WHERE Package_Name LIKE '%"+name+"%'",  function (error, results, fields) {
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
}*/

exports.AddPack = function (req, res) {
  var detail = req.body.detail;
  var name = req.body.name;
  var price = req.body.price;
  var a =[
   [name,detail,price]
  ]
  console.log(detail, name,price);
  connection.query("INSERT INTO Package (Package_Name,Package_Detail,Package_Price) VALUES ?",[a], function (error, results) {
    //console.log(values);
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log("Number of records inserted: " + results.affectedRows);
      res.send({
        "code": 200,
        "failed": "yay?"
      })
    }
  });
}

exports.delPack = function (req, res) {
  var PakId = req.body.PakId;
  console.log(PakId);
  connection.query('DELETE FROM Package WHERE Package_ID=?', [PakId], function (error, results) {
    //console.log(values);
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log("Number of records Deleted: " + results.affectedRows);
      res.send({
        "code": 200,
        "failed": "yay?"
      })
    }
  });
}

exports.EditPack = function (req, res) {
  var newName = req.body.newName;
  var PakId = req.body.id;
  var newDetail = req.body.newDetail;
  var newPrice = req.body.newPrice;
  console.log(newName,newDetail,newPrice,PakId);
  connection.query('UPDATE package SET package_name=?,package_detail=?,package_price=? where package_id=?', [newName,newDetail,newPrice,PakId], function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log("Number of records Edited: " + results.affectedRows);
      res.send({
        "code": 200,
        "failed": "yay?"
      })
    }
  })
}