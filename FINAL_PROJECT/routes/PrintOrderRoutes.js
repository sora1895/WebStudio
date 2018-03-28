var connection = require('./connectDB');

exports.GetPOrder = function (req, res) {
  connection.query('select * from printorder', function (error, results, fields) {
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

exports.GetPOrderById = function (req, res) {
  var poid = req.body.poid;
  var conid = req.body.conid;
  var sql;
  if (conid != null) {
    sql = "Contract_ID="+conid;
    if(poid!=""){
      sql += ' and printorder_id=' + poid;
    }else sql += "";
    
  } else {
    sql = 'printorder_id=' + poid;
  }
  console.log(poid, conid,sql);
  connection.query('select * from printorder where ' + sql, function (error, results, fields) {
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

exports.AddPOrder = function (req, res) {
  var conid = req.body.conid;
  var cdate = req.body.cdate;

  var edate = req.body.edate;
  var sdate = req.body.sdate;
  //var price = req.body.price;
  var a = [
    [conid, cdate, sdate, edate]
  ]
  console.log(conid, cdate, sdate, edate);
  connection.query("INSERT INTO printorder (Contract_ID,PrintOrder_cDate,PrintOrder_sDate,PrintOrder_eDate) VALUES ?", [a], function (error, results) {
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

exports.EditPOrder = function (req, res) {
  var newSdate = req.body.newSdate;
  var id = req.body.id;
  var conid = req.body.conid;
  var newCdate = req.body.newCdate;
  var newEdate = req.body.newEdate;
  console.log(newCdate, newSdate, newEdate, conid, id);
  connection.query('UPDATE printorder SET printorder_cdate=?,printorder_sdate=?,printorder_edate=?,contract_id=? where printorder_id=?', [newCdate, newSdate, newEdate, conid, id], function (error, results, fields) {
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

exports.delPOrder = function (req, res) {
  var POID = req.body.POID;
  console.log(POID);
  connection.query('DELETE FROM printorder WHERE printorder_ID=?', [POID], function (error, results) {
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
