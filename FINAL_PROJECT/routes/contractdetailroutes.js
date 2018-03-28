var connection = require('./connectDB');

exports.GetConDetail = function (req, res) {
  var id = req.body.id;
  var pakname = req.body.pakname;
  var code = req.body.code;
  console.log(id, pakname,code);
  var sql;
  if (code == 1) {
    if (id != "") {
      sql = "where Contract_ID = " + id + " ";
      if (pakname != null) {
        sql + "and Package_Name LIKE '%" + pakname + "%'";
      }
    } else {
      if (pakname != null || pakname != "") {
        sql = "where Package_Name LIKE '%" + pakname + "%'";
      } else sql = "";
    }
  }else sql="";


  connection.query("select * from contractdetail " + sql, function (error, results, fields) {
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

exports.delConDetail = function (req, res) {
  var id = req.body.id;
  console.log(id);
  connection.query('DELETE FROM contractdetail WHERE ConDetail_ID=?', [id], function (error, results) {
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

exports.EditConDetail = function (req, res) {
  var conid = req.body.conid;
  var cusid = req.body.cusid;
  var stuid = req.body.stuid;
  var newCDes = req.body.newCDes;
  var newCdate = req.body.cdate;
  var newSdate = req.body.sdate;
  var newEdate = req.body.edate;
  connection.query('UPDATE contractdetail SET Contract_ID=?,Package_ID=?,Package_Name=?,Package_Detail=?,Package_Price=?,Package_Note=? where ConDetail_ID=?', [cusid, stuid, newCDes, newCdate, newSdate, newEdate, conid], function (error, results, fields) {
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

exports.AddConDetail = function (req, res) {
  var cusid = req.body.cusid;
  var stuid = req.body.stuid;
  var newCDes = req.body.newCDes;
  var newCdate = req.body.cdate;
  var newSdate = req.body.sdate;
  var newEdate = req.body.edate;
  console.log(cusid, stuid, newCDes, newCdate, newSdate, newEdate);
  var a = [
    [cusid, stuid, newCDes, newCdate, newSdate, newEdate]
  ]
  connection.query("insert into contractdetail (Contract_ID,Package_ID,Package_Name,Package_Detail,Package_Price,Package_Note) values ?", [a], function (error, results, fields) {
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