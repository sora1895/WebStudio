var connection = require('./connectDB');

exports.GetPMPrice = function (req, res) {
    connection.query('select * from printmaterialprice pm,printingmaterial p where p.Material_ID = pm.Material_id', function (error, results, fields) {
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

  exports.GetPMPriceById = function (req, res) {
    var name = req.query.name;
    console.log(name);
    connection.query("select * from printmaterialprice pm,printingmaterial p where p.Material_ID = pm.Material_id and pm.MaterialPrice_ID = "+name+"", function (error, results, fields) {
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
  exports.GetPMPriceByMatId = function (req, res) {
    var name = req.query.name;
    console.log(name);
    connection.query("select * from printmaterialprice pm,printingmaterial p where p.Material_ID = pm.Material_id and p.Material_ID = "+name+"", function (error, results, fields) {
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

  exports.AddPMPrice = function (req, res) {
    var size = req.body.size;
    var matId = req.body.matId;
    var price = req.body.price;
    var a =[
     [matId,size,price]
    ]
    console.log(matId,size,price);
    connection.query("insert into printmaterialprice (Material_ID,MaterialPrice_Size,MaterialPrice_Price) values ?",[a], function (error, results) {
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
  
  exports.delPMPrice = function (req, res) {
    var MatPId = req.body.MatPId;
    console.log(MatPId);
    connection.query('DELETE FROM printmaterialprice WHERE MaterialPrice_ID=?', [MatPId], function (error, results) {
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
  
  exports.EditMPrice = function (req, res) {
    var MatId = req.body.MatId;
    var id = req.body.id;
    var newSize = req.body.newSize;
    var newPrice = req.body.newPrice;
    console.log(MatId,newSize,newPrice,id);
    connection.query('UPDATE printmaterialprice SET Material_ID=?,MaterialPrice_Size=?,MaterialPrice_Price=? where MaterialPrice_ID=?', [MatId,newSize,newPrice,id], function (error, results, fields) {
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