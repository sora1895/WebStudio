var connection = require('./connectDB');

exports.GetNumPic= function (req, res) {
    var type = req.body.type;
    var key = req.body.key;
    var stuid = req.body.stuid;
    var sql;
    var fullsql;
    if(type=='Customer Name'){
        sql="cus.Customer_Name LIKE '%"+key+"%' and stu.Studio_ID = "+stuid+"";
        fullsql="SELECT * FROM studio stu,contract con,customer cus,contractdetail conde where con.Customer_ID=cus.Customer_ID and stu.Studio_ID=con.Studio_ID  and conde.Contract_ID=con.Contract_ID and "+sql
    }else if (type =='Contract ID'){
        sql="con.Contract_ID = "+key+" and stu.Studio_ID = "+stuid+"";
        fullsql="SELECT con.Contract_ID,conde.ConDetail_ID FROM studio stu,contract con,contractdetail conde where  conde.Contract_ID=con.Contract_ID and stu.Studio_ID=con.Studio_ID and "+sql;
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
    var id = req.body.id;
    var sql;
    var fullsql;
    console.log(type,key);
    if(type=='Customer Name'){
        sql="cus.Customer_Name LIKE '%"+key+"%'";
    }else if (type =='Contract ID'){
        sql="con.Contract_ID = "+key;
    }else if(type =='Customer Phone number'){
      sql ="cus.Customer_Number = '"+key+"'"
    }
    console.log(sql);
    fullsql="select * from customer cus,studio stu,contract con where con.Customer_ID=cus.Customer_ID and stu.Studio_ID=con.Studio_ID and con.studio_id='"+id+"' and "+sql;

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

  exports.GetPakInfo= function (req, res) {
    var id = req.query.id;
    sql="select * from package pak,studio stu where stu.Studio_ID=pak.Studio_ID and stu.Studio_ID="+id;
    connection.query(sql, function (error, results, fields) {
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