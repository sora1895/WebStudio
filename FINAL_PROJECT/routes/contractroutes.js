var connection = require('./connectDB');

exports.GetContract = function (req, res) {
    connection.query('select * from contract con,customer cus,studio stu where stu.studio_id=con.studio_id and con.customer_id=cus.customer_id', function (error, results, fields) {
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

  exports.GetContractBySearch = function (req, res) {
    var conid = req.query.conid;
    var sql = "and contract_id="+conid+"";
    console.log(conid);
    connection.query("select * from contract con,customer cus,studio stu where stu.studio_id=con.studio_id and con.customer_id=cus.customer_id " +sql, function (error, results, fields) {
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

  exports.AddContract = function (req, res) {
    var cusid = req.body.cusid;
    var stuid = req.body.stuid;
    var newCDes = req.body.newCDes;
    var newCdate = req.body.cdate;
    var newSdate = req.body.sdate;
    var newEdate = req.body.edate;
    console.log(cusid,stuid,newCDes,newCdate,newSdate,newEdate);
    var a =[
      [cusid,stuid,newCDes,newCdate,newSdate,newEdate]
    ]
    connection.query("insert into contract (Customer_ID,Studio_ID,Contract_Description,Contract_cDate,Contract_sDate,Contract_eDate) values ?",[a], function (error, results, fields) {
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

  exports.EditContract = function (req, res) {
    var conid = req.body.conid;
    var cusid = req.body.cusid;
    var stuid = req.body.stuid;
    var newCDes = req.body.newCDes;
    var newCdate = req.body.cdate;
    var newSdate = req.body.sdate;
    var newEdate = req.body.edate;
    connection.query('UPDATE contract SET Customer_ID=?,Studio_ID=?,Contract_Description=?,Contract_cDate=?,Contract_sDate=?,Contract_eDate=? where Contract_ID=?', [cusid,stuid,newCDes,newCdate,newSdate,newEdate,conid], function (error, results, fields) {
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

  exports.delContract = function (req, res) {
    var id = req.body.id;
    console.log(id);
    connection.query('DELETE FROM contract WHERE Contract_ID=?', [id], function (error, results) {
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
  