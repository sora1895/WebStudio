
var connection = require('./connectDB');

exports.getDisById = function (req, res) {
  var Id = req.query.districtId;
  console.log(Id);
  connection.query('select * from studio where district_id = ?', [Id], function (error, results, fields) {
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
exports.getDisNameById = function (req, res) {
  var Id = req.query.districtId;
  connection.query('select district_name from district where district_id = ?', [Id], function (error, results, fields) {
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

exports.getDisIdByName = function (req, res) {
  var name = req.query.disName;
  console.log(name); 
  connection.query("select District_ID from district where District_Name LIKE '%"+name+"%'", function (error, results, fields) {
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
  })
}

exports.GetDisByProId = function (req, res) {
  var provinceId = req.query.provinceId;
  console.log(provinceId);
  connection.query('SELECT * FROM district WHERE Province_ID = ?', [provinceId], function (error, results, fields) {
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

exports.getProvince = function (req, res) {
  connection.query('select * from province', function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    }
    else {
      if (results.length > 0) {
        /*for(var i=0;i<results.length;i++){
        console.log(results[i]);
      }*/
        res.send({
          "code": 204,
          "success": "Province found!",
          "data": results
        });
      }
      else {
        res.send({
          "code": 204,
          "success": "Province does not exits"
        });
      }
    }
  })
}



exports.showAll = function (req, res) {
  connection.query('select * from district', function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    }
    else {
      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
        res.send({
          "code": 204,
          "success": "Districts found!",
          "data": results
        });
      }
      else {
        res.send({
          "code": 204,
          "success": "Districts does not exits"
        });
      }
    }
  })
}


exports.addDis = function (req, res) {
  var district = req.body.district;
  var province_id = req.body.province_id;
  console.log(district, province_id);
  connection.query("INSERT INTO District (Province_ID,District_Name) VALUES (" + province_id + ",'" + district + "')", function (error, results) {
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

exports.delDis = function (req, res) {
  var DisId = req.body.district;
  console.log(DisId);
  connection.query('DELETE FROM District WHERE District_ID=?', [DisId], function (error, results) {
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

exports.EditDis = function (req, res) {
  var newName = req.body.newName;
  var DisId = req.body.id;
  console.log(newName,DisId);
  connection.query('UPDATE DISTRICT SET District_Name=? where District_ID=?', [newName,DisId], function (error, results, fields) {
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
