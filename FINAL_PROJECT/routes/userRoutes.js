var connection = require('./connectDB');
var nodemailer = require('nodemailer');

exports.GetUser = function (req, res) {
    connection.query('SELECT * FROM studio join user on studio.Studio_ID = user.Studio_ID where studio.Studio_Role="user"', function (error, results, fields) {
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
    connection.query("SELECT * FROM studio join user on studio.Studio_ID = user.Studio_ID WHERE User_ID like '%"+name+"%' and ", function (error, results, fields) {
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
    var key = req.query.id;
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

exports.SendEmailPass = function (req, res) {

    var passs = req.body.returnpass;
    var emailstud = req.body.stuemail;
    var returnid= req.body.returnid;
    console.log(passs, emailstud);
    const option = {
        service: 'gmail',
        auth: {
            user: 'trungnhse03608@fpt.edu.vn', // email hoặc username
            pass: 'master@95' // password
        }
    };
    var transporter = nodemailer.createTransport(option);

    transporter.verify(function(error, success) {
        // Nếu có lỗi.
        if (error) {
            console.log(error);
        } else { //Nếu thành công.
            console.log('Kết nối thành công!');
            var mail = {
                from: 'trungnhse03608@fpt.edu.vn', // Địa chỉ email của người gửi
                to: 'trungnhse03608@gmail.com', // Địa chỉ email của người gửi
                subject: 'Quên mật khẩu Studio', // Tiêu đề mail
                text: 'Bạn '+returnid+' thân mến \n' +
                'Bạn vừa thực hiện yêu cầu lấy lại mật khẩu trên Studio.\n' +
                '\n' +
                '\n' +
                'Mật khẩu của bạn là:  ' +passs+
                '\n' +
                '\n' +
                '\n' +
                'Cám ơn và chúc bạn vui vẻ.\n' +
                'Nhóm phát triển Studio.', // Nội dung mail dạng text
            };
            //Tiến hành gửi email
            transporter.sendMail(mail, function(error, info) {
                if (error) { // nếu có lỗi
                    console.log(error);
                } else { //nếu thành công
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}