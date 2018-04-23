var connection = require('./connectDB');
var nodemailer = require('nodemailer');


exports.GetPackage = function (req, res) {
  var key = req.query.key;
  console.log(key);
  if (key) {
    sql = " and stu.Studio_ID =" + key
  } else {
    sql = "";
  }
  connection.query('select * from package p,studio stu where p.Studio_ID = stu.Studio_ID' + sql, function (error, results, fields) {
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

exports.GetPackByName = function (req, res) {
  var id = req.body.id;
  var name = req.body.PackName;
  console.log(name);
  connection.query("SELECT * FROM Package WHERE Package_Name LIKE '%" + name + "%' and Studio_ID=" + id, function (error, results, fields) {
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

exports.GetPackByStuId = function (req, res) {
  var id = req.query.id;
  console.log(id);
  connection.query("SELECT * FROM Package WHERE Package_Available =1 and  Studio_ID= " + id, function (error, results, fields) {
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

exports.GetPackByPakId = function (req, res) {
  var id = req.body.id;
  console.log(id);
  connection.query("SELECT * FROM Package WHERE Package_ID = " + id, function (error, results, fields) {
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

exports.AddPack = function (req, res) {
  var studio = req.body.id;
  var detail = req.body.detail;
  var name = req.body.name;
  var price = req.body.price;
  var avai = req.body.avai;
  var pic = req.body.pic;
  var a = [
    [studio, name, detail, price, avai,pic]
  ]
  console.log(studio, name, detail, price,pic);
  connection.query("INSERT INTO Package (Studio_ID,Package_Name,Package_Detail,Package_Price,Package_available,Package_pic) VALUES ?", [a], function (error, results) {
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

exports.delPack = function (req, res) {
  var PakId = req.body.PakId;
  console.log(PakId);
  connection.query('DELETE FROM Package WHERE Package_ID=?', [PakId], function (error, results) {
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

exports.EditPack = function (req, res) {
  var newName = req.body.newName;
  var PakId = req.body.id;
  var newDetail = req.body.newDetail;
  var newPrice = req.body.newPrice;
  var avai = req.body.newAvalable;
  var pic = req.body.pic;
  console.log(newName, newDetail, newPrice, PakId,avai,pic);
  connection.query(`UPDATE package SET package_name=?,package_detail=?,package_price=?,Package_available=?,package_pic=? where package_id=?`, [newName, newDetail, newPrice,avai,pic,PakId], function (error, results, fields) {
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

exports.BuyPackages = function (req, res) {
  var customer = req.body.customer;
  var packages = req.body.items;
  var id = req.body.id;
  var packagesCount = 0;
  var StudioID = packages[0].Studio_ID;
  //console.log(packages);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vuclse03800@fpt.edu.vn',
      pass: 'masmarlow'
    }
  });
  var mailOptions = {
    from: 'vuclse03800@fpt.edu.vn',
    to: 'vuclse03800@gmail.com',
    subject: 'Sending Email using Node.js',
    html: ''
  };
  if (customer instanceof Array) {
    customer.forEach(function (d) {
      mailOptions.html = `<h1><u>THÔNG BÁO HỢP ĐỒNG MỚI ${id}</u></h1><br>
    <p>Kính gửi khách hàng:…</p>
    <p>Cám ơn bạn đã đăng ký lịch chụp ảnh, quay phim với chúng tôi chúng tôi gửi đến quý khách hang hoá đơn điện tử có nội dung như sau:</p>
    <table>
    <tr>
    <td><h2>Mã hóa đơn: ${id}</h2></td>
    </tr>
    <tr>
    <td><h3>Tên khách hàng: ${d.name}</h3></td>
    </tr>
    <tr>
    <td><h3>Số điện thoại: ${d.phone}</h3></td>
    </tr>
    <tr>
    <td><h3 colspan="2">Email: ${d.email}</h3></td>
    </tr>
    <tr>
    <td colspan="2"><h3>Yêu cầu của khách hàng:</h3><p>${d.info}</p></td>
    </tr>
    `;

    // mailOptions.to += ','+d.email+'';

    })
  }
  if (packages instanceof Array) {
    packagesCount = packages.length;
    var total = 0;
    mailOptions.html += "<tr><td colspan='2'>Customer have order to buy " + packagesCount + " packages</td></tr>"
    for (var i = 0; i <= packagesCount - 1; i++) {
      mailOptions.html += `<tr><td>Package Name: </td><td>${packages[i].Package_Name}</td><tr>
      <tr><td>Package Detail: </td><td><a href='http://localhost:5000/view-pack.html?id=${packages[i].Studio_ID}&name=${encodeURIComponent(packages[i].Package_Name)}'>link</a></td></tr>
      <tr><td>Package Price: </td><td>${packages[i].Package_Price.toLocaleString('en-US')} vnd</td></tr>`;
      total += packages[i].Package_Price;
    }
    mailOptions.html += "<tr><td colspan='2'><h2>All will be " + total.toLocaleString('en-US') + " vnd</h2></td></tr>";
  }

  mailOptions.html += `</table>
  <p style="color:red"><b>Đây là email tự động. Quý khách vui lòng không trả lời email này.</b></p>
  <p style="font-size:10px">Mọi thắc mắc vui lòng liện hệ:</p>
  <p>Hotline:${packages[0].Studio_Number}</p>
  <p>Email:${packages[0].Studio_Email}</p>`;
  res.json({
    count: packagesCount
  })
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}




exports.GetTop3= function (req, res) {
  var id = req.query.id;
  sql="select * from package pak,studio stu where stu.Studio_ID=pak.Studio_ID and stu.Studio_ID="+id+" LIMIT 3";
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
