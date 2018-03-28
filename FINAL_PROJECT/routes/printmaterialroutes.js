var connection = require('./connectDB');

exports.GetPMaterial = function (req, res) {
    connection.query('select * from printingmaterial', function (error, results, fields) {
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
 
  exports.GetMaterialByName = function (req, res) {
    var name = req.query.name;
    console.log(name);
    connection.query("SELECT * FROM printingmaterial WHERE Material_Name LIKE '%"+name+"%'", function (error, results, fields) {
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
  exports.GetMaterialIdByName = function (req, res) {
    var name = req.query.newName;
    console.log(name);;
    connection.query("SELECT Material_ID FROM printingmaterial WHERE Material_Name LIKE '%"+name+"%'", function (error, results, fields) {
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
            "success": "Material does not exits"
          });
        }
  
      }
    });
  }
  
  exports.AddMaterial = function (req, res) {
    var detail = req.body.detail;
    var name = req.body.name;
    //var price = req.body.price;
    var a =[
     [name,detail]
    ]
    console.log(name,detail);
    connection.query("INSERT INTO printingmaterial (Material_Name,Material_Des) VALUES ?",[a], function (error, results) {
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
  
  exports.delMaterial = function (req, res) {
    var MatId = req.body.MatId;
    console.log(MatId);
    connection.query('DELETE FROM printingmaterial WHERE Material_ID=?', [MatId], function (error, results) {
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
  
  exports.EditMaterial = function (req, res) {
    var newName = req.body.newName;
    var id = req.body.id;
    var newDetail = req.body.newDetail;
    var newPrice = req.body.newPrice;
    console.log(newName,newDetail,newPrice,id);
    connection.query('UPDATE printingmaterial SET Material_name=?,Material_des=? where Material_id=?', [newName,newDetail,id], function (error, results, fields) {
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