var connection = require('./connectDB');

exports.GetStudio = function (req, res) {
    connection.query('SELECT * FROM studio st join district dis on st.District_ID = dis.District_ID join province pro on dis.Province_ID = pro.Province_ID', function (error, results, fields) {
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

exports.GetStudioByName = function (req, res) {
    var name = req.query.name;
    //console.log(name);
    connection.query("SELECT * FROM studio st join district dis on st.District_ID = dis.District_ID join province pro on dis.Province_ID = pro.Province_ID where Studio_Name like '%"+name+"%'", function (error, results, fields) {
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
//getprovince
exports.GETProvinces = function (req, res) {
    connection.query('select * from province', function (error, results, fields) {
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

//getDistrictBuID province
exports.GetDitsrictByIdProvince = function (req, res) {
    var name = req.body.idProvince;
    //console.log(name);
    connection.query("select * from district where Province_ID = '"+name+"'", function (error, results, fields) {
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

//addNewStudio
exports.AddStudio = function (req, res) {
    var name = req.body.newNames;
    var address = req.body.newAddress;
    var email = req.body.newEmail;
    var number = req.body.newNumber;
    var coordinate = req.body.newCoordinate;
    var idDistrict = req.body.idistrict;
    console.log(name,address,email,number,coordinate,idDistrict);
    connection.query("INSERT INTO studio (District_ID, Studio_Name, Studio_Address,Studio_Email,Studio_Number,Studio_Coordinate)VALUES ('"+idDistrict+"', '"+name+"', '"+address+"','"+email+"','"+number+"','"+coordinate+"')", function (error, results) {
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

//getStudio ByID
exports.GetStudioByID = function (req, res) {
    var name = req.query.id;
    //console.log(name);
    connection.query("SELECT * FROM studio st join district dis on st.District_ID = dis.District_ID join province pro on dis.Province_ID = pro.Province_ID where Studio_ID = '"+name+"'", function (error, results, fields) {
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

//editStudio
exports.EditStudio = function (req, res) {
    var id = req.body.ids;
    var name = req.body.stuname;
    var address = req.body.address;
    var email = req.body.email;
    var number = req.body.number;
    var coordinate = req.body.coordinate;
    var idDistrict = req.body.idistrictssss;
    console.log(id, name,address,email,number,coordinate,idDistrict);
    var a = [
        [idDistrict, name,address,email,number,id]
    ]
    sql = `update studio set District_ID = ${idDistrict},Studio_Name =  '${name}', Studio_Address =  '${address}', Studio_Email =  '${email}', Studio_Number =  '${number}', Studio_Coordinate = "${coordinate}" where Studio_ID =  ${id}`

    connection.query(sql, function (error, results) {
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

exports.EditStudioProfile = function (req, res) {
    var body = req.body;
    var a =[]
    body.forEach(function(d) {
        a = [
            d.disid,d.name,d.address,d.email,d.phone,d.coor,d.icon,d.main,d.pro1,d.pro2,d.pro3,d.pro4,d.pro5,d.pro6,d.pro7,d.quote,d.quotepic,d.about,d.aboutpic,d.id
        ]
        
    console.log(a);
    });
    
    var sql = `update studio set 
    District_ID = ?,
    Studio_Name =  ?, 
    Studio_Address =  ?, 
    Studio_Email =  ?, 
    Studio_Number =  ?, 
    Studio_Coordinate = ? ,
    Studio_Icon = ?,
    Studio_main_pic = ?,
    Studio_project_1 = ?,
    Studio_project_2 = ?,
    Studio_project_3 = ?,
    Studio_project_4 = ?,
    Studio_project_5 = ?,
    Studio_project_6 = ?,
    Studio_project_7 = ?,
    Studio_quote = ?,
    Studio_quote_pic = ?,
    Studio_About = ?,
    Studio_about_pic = ?
    where Studio_ID = ?`

    connection.query(sql,a, function (error, results) {
        //console.log(values);
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Number of records edited: " + results.affectedRows);
            res.send({
                "code": 200,
                "failed": "yay?"
            })
        }
    });
}

//delStudio
exports.DelStudio = function (req, res) {
    var key = req.body.delid;
    console.log(key);

    connection.query("delete from studio where Studio_ID = '"+key+"'", function (error, results) {
        //console.log(values);
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Delete cussess: " + results.affectedRows);
            res.send({
                "code": 200,
                "failed": "yay?"
            })
        }
    });
}


