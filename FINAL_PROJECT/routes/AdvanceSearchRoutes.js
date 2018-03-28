var connection = require('./connectDB');

exports.GetNumPic= function (req, res) {
    var type = req.body.type;
    var key = req.body.key;
    var sql;
    var fullsql;
    if(type=='Customer Name'){
        sql="cus.Customer_Name LIKE '%"+key+"%'";
        fullsql="SELECT * FROM contract con,customer cus,contractdetail conde where con.Customer_ID=cus.Customer_ID   and conde.Contract_ID=con.Contract_ID and "+sql
    }else if (type =='Contract ID'){
        sql="con.Contract_ID = "+key;
        fullsql="SELECT con.Contract_ID,conde.ConDetail_ID FROM contract con,contractdetail conde where  conde.Contract_ID=con.Contract_ID and "+sql;
    }else if (type =='Studio Name'){
        sql="stu.Studio_Name LIKE '%"+key+"%'";
        fullsql="SELECT * FROM contract con,studio stu,contractdetail conde where con.Studio_ID=stu.Studio_ID   and conde.Contract_ID=con.Contract_ID and  "+sql
    }else if (type == 'Print Order ID'){
        sql="po.PrintOrder_ID="+key;
        fullsql="SELECT po.PrintOrder_ID,con.Contract_ID,conde.ConDetail_ID FROM contract con,printorder po,contractdetail conde where con.Contract_ID=po.Contract_ID  and conde.Contract_ID=con.Contract_ID and "+sql;
    }
    console.log(type,key);
    console.log(sql);
    

    connection.query(fullsql, function (error, results, fields) {
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

  exports.GetNumPO= function (req, res) {
    var type = req.body.type;
    var key = req.body.key;
    var sql;
    var fullsql;
    if(type=='Customer Name'){
        sql="cus.Customer_Name LIKE '%"+key+"%'";
    }else if (type =='Contract ID'){
        sql="con.Contract_ID = "+key;
    }else if (type =='Studio Name'){
        sql="stu.Studio_Name LIKE '%"+key+"%'";
    }else if (type == 'Print Order ID'){
        sql="po.PrintOrder_ID="+key;
    }
    console.log(type,key);
    console.log(sql);
    fullsql="SELECT * FROM contract con,printorder po,studio stu,customer cus where con.Customer_ID=cus.Customer_ID and stu.Studio_ID=con.Studio_ID and po.Contract_ID=con.Contract_ID  and  "+sql;

    connection.query(fullsql, function (error, results, fields) {
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

  exports.GetNumCon= function (req, res) {
    var type = req.body.type;
    var key = req.body.key;
    var sql;
    var fullsql;
    if(type=='Customer Name'){
        sql="cus.Customer_Name LIKE '%"+key+"%'";
    }else if (type =='Contract ID'){
        sql="con.Contract_ID = "+key;
    }else if (type =='Studio Name'){
        sql="stu.Studio_Name LIKE '%"+key+"%'";
    }
    console.log(type,key);
    console.log(sql);
    fullsql="select * from customer cus,studio stu,contract con where con.Customer_ID=cus.Customer_ID and stu.Studio_ID=con.Studio_ID and  "+sql;

    connection.query(fullsql, function (error, results, fields) {
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