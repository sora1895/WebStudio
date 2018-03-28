var connection = require('./connectDB');

exports.GetUser = function (req, res) {
    connection.query('SELECT * FROM studio join user on studio.Studio_ID = user.Studio_ID', function (error, results, fields) {
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

exports.GetUserByName = function (req, res) {
    var name = req.query.name;
    //console.log(name);
    connection.query("SELECT * FROM studio join user on studio.Studio_ID = user.Studio_ID WHERE User_ID like '%"+name+"%'", function (error, results, fields) {
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


//getuser ByID
exports.GetUserByID = function (req, res) {
    var name = req.query.id;
    //console.log(name);
    connection.query("SELECT * FROM studio join user on studio.Studio_ID = user.Studio_ID where user.User_ID = '"+key+"'", function (error, results, fields) {
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

//delUser
exports.DelUser = function (req, res) {
    var key = req.body.delid;
    console.log(key);

    connection.query("delete from studioweb.user where User_ID='"+key+"'", function (error, results) {
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

//addUser
exports.AddUser = function (req, res) {
    var name = req.body.newNames;
    var newPass = req.body.newPass;
    var newRole = req.body.newRole;
    var idstudio = req.body.idstudio;
    console.log(name,newPass,newRole,idstudio);
    connection.query("insert into user (User_ID, Studio_ID, User_Role, User_Password) VALUES ('"+name+"', '"+idstudio+"', '"+newRole+"', '"+newPass+"')", function (error, results) {
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

//getStudioName
exports.Getstudiosss = function (req, res) {
    connection.query('select * from studio', function (error, results, fields) {
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

//editUser
exports.EditUser = function (req, res) {
    var name = req.body.newNamess;
    var newPass = req.body.newPasss;
    var newRole = req.body.newRoles;
    var idstudio = req.body.idstudios;
    console.log(name,newPass,newRole,idstudio);
    connection.query("update user set User_Password = '"+newPass+"', User_Role = '"+newRole+"', Studio_ID = '"+idstudio+"' where User_ID = '"+name+"'", function (error, results) {
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