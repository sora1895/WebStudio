var connection = require('./connectDB');

exports.GetOrderDetail = function (req, res) {
    connection.query('select * from printorderdetail pod, picture p, printmaterialprice pmp,printingmaterial pm where pod.MaterialPrice_ID=pmp.MaterialPrice_ID and p.Picture_ID=pod.Picture_ID and pm.Material_ID = pmp.Material_ID', function (error, results, fields) {
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

  exports.GetOrderDetailByName = function (req, res) {
    var poId = req.body.poId;
    var name = req.body.name;
    console.log(poId,name);
    if(name==null){
        var sql="po.PrintOrder_ID = "+poId+" ";
    }else{
        var sql="po.PrintOrder_ID = "+poId+" and pm.Material_Name LIKE '%"+name+"%'"
    }
    
    
    connection.query("SELECT * FROM printorderdetail pod, picture p, printmaterialprice pmp,printingmaterial pm,printorder po  WHERE "+sql+" and pod.MaterialPrice_ID=pmp.MaterialPrice_ID and p.Picture_ID=pod.Picture_ID and pm.Material_ID = pmp.Material_ID and po.PrintOrder_ID=pod.PrintOrder_ID", function (error, results, fields) {
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

  exports.AddOrderDetail = function (req, res) {
    var poId = req.body.poId;
    var des = req.body.des;
    var picId = req.body.picId;
    var size = req.body.size;
    var quan = req.body.quan;
    var mpId = req.body.mpId;
    var price = req.body.price;
    var note = req.body.note;
    var a =[
     [poId,picId,mpId,quan,size,price,note]
    ]
    console.log(poId,picId,mpId,quan,size,des,price,note);
    connection.query("insert into printorderdetail (PrintOrder_ID,Picture_ID,MaterialPrice_ID,OrderDetail_Quantity,OrderDetail_Size,OrderDetail_Price,OrderDetail_Note) values ?",[a], function (error, results) {
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
  
  exports.delPODetail = function (req, res) {
    var oldPoId = req.body.oldPO;
    var oldMatId = req.body.oldMat;
    var oldPicId = req.body.oldPic;
    var oldQuan = req.body.oldQuan;
    
    var oldSize = req.body.oldSize;
    var oldPrice = req.body.oldPrice;
    var oldNote = req.body.oldNote;
    var Val=[
      [oldPoId,oldPicId,oldMatId,oldQuan,oldSize,oldPrice,oldNote]
    ]
    console.log(Val);
    connection.query('DELETE FROM printorderdetail WHERE PrintOrder_ID=? and Picture_ID=?  and MaterialPrice_ID=? and OrderDetail_Quantity=? and OrderDetail_Size=? and OrderDetail_Price=? and OrderDetail_Note=?',[oldPoId,oldPicId,oldMatId,oldQuan,oldSize,oldPrice,oldNote], function (error, results) {
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
  
  exports.EditPODetail = function (req, res) {
    var oldPoId = req.body.oldPO;
    var oldMatId = req.body.oldMat;
    var oldPicId = req.body.oldPic;
    var oldQuan = req.body.oldQuan;
    var oldDetail = req.body.oldDetail;
    var oldSize = req.body.oldSize;
    var oldPrice = req.body.oldPrice;
    var oldNote = req.body.oldNote;

    var newPoId = req.body.newPO;
    var newMatId = req.body.newMat;
    var newPicId = req.body.newPic;
    var newQuan = req.body.newQuan;
    var newSize = req.body.newSize;
    var newDetail = req.body.newDetail;
    var newPrice = req.body.newPrice;
    var newNote = req.body.newNote;
    var Val = [
      [newPoId,newPicId,newMatId,newQuan,newSize,newPrice,newNote
        ,oldPoId,oldPicId,oldMatId,oldQuan,oldSize,oldPrice,oldNote]
    ];
    console.log(Val);

    connection.query('UPDATE printorderdetail p SET p.PrintOrder_ID=?,p.Picture_ID=?,p.MaterialPrice_ID=?,p.OrderDetail_Quantity=?,p.OrderDetail_Size=?,p.OrderDetail_Price=?,p.OrderDetail_Note=? '
    +'where p.PrintOrder_ID=? and p.Picture_ID=?  and p.MaterialPrice_ID=? and p.OrderDetail_Quantity=? and p.OrderDetail_Size=? and p.OrderDetail_Price=? and p.OrderDetail_Note=?', [newPoId,newPicId,newMatId,newQuan,newSize,newPrice,newNote,oldPoId,oldPicId,oldMatId,oldQuan,oldSize,oldPrice,oldNote], function (error, results, fields) {
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
  