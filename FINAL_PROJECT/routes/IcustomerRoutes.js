var connection = require('./connectDB');

exports.GetIcustomer = function (req, res) {
    connection.query('select * from customer', function (error, results, fields) {
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
                    "success": "customer does not exits"
                });
            }

        }
    });
}

exports.GetIcustomerByName = function (req, res) {
    var name = req.query.name;
    //console.log(name);
    connection.query("SELECT * FROM customer like '%"+name+"%'", function (error, results, fields) {
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
exports.AddIcustomer = function (req, res) {
    var name = req.body.newNames;
    var gender = req.body.newGender;
    var address = req.body.newAddress;
    var email = req.body.newEmail;
    var number = req.body.newNumber;
    var other = req.body.newOther;
    if(other==undefined){
        other = '';
    }
    if(email==undefined){
        email='';
    }
    if(address==undefined){
        address=''
    }
    if(number==undefined){
        number=''
    }
    var note = req.body.newNote;

    console.log(name,gender,address,email,number,note);
    connection.query("INSERT INTO customer ( Customer_Name, Customer_Gender, Customer_Address, Customer_Email, Customer_Number,Customer_Other,Customer_Note )VALUES ('"+name+"', '"+gender+"', '"+address+"','"+email+"','"+number+"','"+other+"','"+note+"')", function (error, results) {
        //console.log(values);
        if (error) {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log("Number of records inserted: " + results.affectedRows);
            console.log(results.insertId);
            res.send({
                "code": 200,
                "failed": "yay?",
                "data": results.insertId,
            })
        }
    });
}

//getStudio ByID
exports.GetIcustomerbyID = function (req, res) {
    var cusid = req.body.cusid;
    var stuid = req.body.stuid;
    console.log(cusid,stuid);
    connection.query("SELECT * FROM customer cus,contract con where cus.Customer_ID=con.Customer_ID and  cus.Customer_ID = '"+cusid+"' and con.Studio_ID="+stuid, function (error, results, fields) {
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
exports.EditIcustomer = function (req, res) {
    var id = req.body.ids;

    var name = req.body.cusname;
    var address = req.body.address;
    var gender = req.body.gender;
    var email = req.body.email;
    var number = req.body.number;
    var note = req.body.note;
    var other = req.body.other;

    console.log(id,name, gender,address,email,number,note);
    connection.query("update studioweb.customer set Customer_Name = '"+name+"',Customer_Gender = '"+gender+"', Customer_Address = '"+address+"', Customer_Email = '"+email+"', Customer_Number = '"+number+"',Customer_Other= '"+other+"', Customer_Note = '"+note+"' where Customer_ID = '"+id+"'", function (error, results) {
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


//delStudio
exports.DelIcustomer = function (req, res) {
    var key = req.body.delid;
    console.log(key);

    connection.query("delete from customer where customer_ID = '"+key+"'", function (error, results) {
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


