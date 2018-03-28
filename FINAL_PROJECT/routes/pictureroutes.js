var connection = require('./connectDB');

/*exports.GetPicture = function (req, res) {
    connection.query('select * from picture', function (error, results, fields) {
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

  exports.GetPicture = function (req, res) {
    var condeid = req.query.condeid;
    connection.query('select * from picture where condetail_ID=?',[condeid], function (error, results, fields) {
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

  exports.AddPicture = function (req, res) {
    var detail = req.body.detail;
    var url = req.body.url;
    var ConID = req.body.id;
    var a =[
     [ConID,detail,url]
    ]
    console.log(detail, url);
    connection.query("INSERT INTO Picture (ConDetail_ID,Picture_Detail,Picture_Url) VALUES ?",[a], function (error, results) {
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

  exports.GetPictureByName = function (req, res) {
    var name = req.query.name;
    console.log(name);
    connection.query("SELECT * FROM Picture WHERE Picture_Detail LIKE '%"+name+"%'", function (error, results, fields) {
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

  exports.delPicture = function (req, res) {
    var id = req.body.id; 
    console.log(id);
    connection.query('DELETE FROM Picture WHERE Picture_ID=?', [id], function (error, results) {
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
  
  exports.EditPicture = function (req, res) {
    var detail = req.body.detail;
    var id = req.body.id;
    var url = req.body.url;
    console.log(detail,url);
    connection.query('UPDATE picture SET picture_detail=?,picture_url=? where Picture_ID=?', [detail,url,id], function (error, results, fields) {
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