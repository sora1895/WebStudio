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

  exports.GetConbyStudio = function (req, res) {
    var id = req.query.id;
    connection.query('select * from contract con,customer cus,studio stu where stu.studio_id=con.studio_id and con.customer_id=cus.customer_id and con.studio_id='+id+' ORDER BY con.Contract_cDate DESC;', function (error, results, fields) {
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
    var sql = "and contract_id='"+conid+"'";
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
    var conid = req.body.conid;
    var state = req.body.state;
    console.log(cusid,stuid,newCDes,newCdate,newSdate,newEdate,state);
    var a =[
      [conid,cusid,stuid,newCDes,newCdate,newSdate,newEdate,state]
    ]
    connection.query("insert into contract (Contract_ID,Customer_ID,Studio_ID,Contract_Description,Contract_cDate,Contract_sDate,Contract_eDate,Contract_State) values ?",[a], function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log("Number of records inserted: " + results.affectedRows);
        res.send({
          "code": 200,
          "failed": "yay?",
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
    var state = req.body.state;
    connection.query('UPDATE contract SET Customer_ID=?,Studio_ID=?,Contract_Description=?,Contract_cDate=?,Contract_sDate=?,Contract_eDate=?,Contract_State=? where Contract_ID=?', [cusid,stuid,newCDes,newCdate,newSdate,newEdate,state,conid], function (error, results, fields) {
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

  exports.EditState = function (req, res) {
    var id = req.body.id;
    var state = req.body.state;
    connection.query('UPDATE contract SET Contract_State=? where Contract_ID=?', [state,id], function (error, results, fields) {
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

  exports.AddCon = function (req, res) {
    var cusid = req.body.cusid;
    var stuid = req.body.stuid;
    var newCDes = req.body.newCDes;
    var today = req.body.today;
    var conid = req.body.conid;
    
    console.log(conid,cusid,stuid,newCDes,today);
    var a =[
      [conid,cusid,stuid,today,newCDes,'Chưa thanh toán']
    ]
    connection.query("insert into contract (Contract_ID,Customer_ID,Studio_ID,Contract_cDate,Contract_Description,Contract_State) values ?",[a], function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log("Number of records inserted: " + results.affectedRows);
        res.send({
          "code": 200,
          "failed": "yay?",
        })

      }
    });
  }
  

  exports.checkId = function(req,res){
    var id = req.query.id;
    connection.query("select * from contract where contract_id=?",id, function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        res.send({
          "code": 200,
          "failed": "yay?",
        })

      }
    })
  }