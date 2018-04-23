var express = require("express");
var login = require('./routes/loginroutes');
var dis = require('./routes/districtroutes');
var pack = require('./routes/packageroutes');
var picture = require('./routes/pictureroutes');
var condetail = require('./routes/contractdetailroutes');
var contract = require('./routes/contractroutes');
var customer = require('./routes/CustomerRoutes');
var users = require('./routes/userRoutes');
var studio = require('./routes/StudioRoutes');
var advance = require('./routes/AdvanceSearchRoutes');
var icustomer = require('./routes/IcustomerRoutes');
var path = require('path');

var connection = require('./routes/connectDB');


var formidable = require('formidable');
var fs = require('fs');



var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.get('/login', function(req, res){ 
//     var email = req.query.email; //mytext is the name of your input box
//     var password = req.query.password;
//     res.send('Your Mail:' +email); 
//     res.send('Your Pass:' +email); 
//     Input(email,password);
// }); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', function (req, res) {
    var id = req.query.id;

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        var elements = {
            id:id,
            detail:file.name,
            url:'/uploads/'+file.name
        }
        var a = [[elements.id,elements.detail,elements.url]]
        connection.query("INSERT INTO Picture (ConDetail_ID,Picture_Detail,Picture_Url) VALUES ?", [a], function (error, results) {
            
        })
    });
    

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});



app.use('/', express.static('./public'));

var router = express.Router();
// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
/*router.post('/register',login.register);
router.post('/login',login.login);
router.post('/dismanage',login.dismanage);*/

//Login ROUTES
app.use('/api', router);
app.use('/register', login.register);
app.use('/login', login.login);

//PROVINCE & DISTRICT ROUTES
app.use('/dismanage', dis.GetDisByProId);
app.use('/getProvince', dis.getProvince);
app.use('/showAll', dis.showAll);
app.use('/addDis', dis.addDis);
app.use('/delDis', dis.delDis);
app.use('/getDis', dis.getDisById);
app.use('/getDisName', dis.getDisNameById);
app.use('/getDisIdByName', dis.getDisIdByName);
app.use('/EditDis', dis.EditDis);

//PACKAGE ROUTES
app.use('/getPackage', pack.GetPackage);
app.use('/GetPackByName', pack.GetPackByName);
app.use('/AddPack', pack.AddPack);
app.use('/delPack', pack.delPack)
app.use('/EditPack', pack.EditPack);
app.use('/GetPackByStuId', pack.GetPackByStuId);
app.use('/BuyPackages', pack.BuyPackages);
app.use('/GetPackByPakId', pack.GetPackByPakId);
app.use('/GetTop3',pack.GetTop3);


//PICTURE ROUTES
app.use('/GetPicture', picture.GetPicture);
app.use('/AddPicture', picture.AddPicture);
app.use('/GetPictureByName', picture.GetPictureByName);
app.use('/EditPicture', picture.EditPicture);
app.use('/delPicture', picture.delPicture);
app.use('/GetPictureById', picture.GetPictureById);



//CONTRACT DETAIL ROUTES
app.use('/GetConDetail', condetail.GetConDetail);
app.use('/delConDetail', condetail.delConDetail);
app.use('/EditConDetail', condetail.EditConDetail);
app.use('/AddConDetail', condetail.AddConDetail);
app.use('/AddMultiConDe', condetail.AddMultiConDe);
app.use('/EditMultiConDe', condetail.EditMultiConDe);
app.use('/AddCon',contract.AddCon);

//CONTRACT ROUTES
app.use('/GetContract', contract.GetContract);
app.use('/GetContractBySearch', contract.GetContractBySearch);
app.use('/AddContract', contract.AddContract);
app.use('/EditContract', contract.EditContract);
app.use('/delContract', contract.delContract);
app.use('/GetConbyStudio',contract.GetConbyStudio);
app.use('/checkId',contract.checkId);

//CUSTOMER ROUTES
app.use('/GetCustomer', customer.GetCustomer);
app.use('/GetCustomerByName', customer.GetCustomerByName);

//STUDIO ROUTES
app.use('/GetStudio', studio.GetStudio);
app.use('/GetStudioByName', studio.GetStudioByName);
app.use('/GETProvinces', studio.GETProvinces);
app.use('/GetDitsrictByIdProvince', studio.GetDitsrictByIdProvince);
app.use('/AddStudio', studio.AddStudio);
app.use('/GetStudioByID', studio.GetStudioByID);
app.use('/EditStudio', studio.EditStudio);
app.use('/DelStudio', studio.DelStudio);
app.use('/EditStudioProfile',studio.EditStudioProfile);

//USER ROUTES
app.use('/GetUser', users.GetUser);
app.use('/GetUserByName', users.GetUserByName);
app.use('/GetUserByID', users.GetUserByID);
app.use('/DelUser', users.DelUser);
app.use('/AddUser', users.AddUser);
app.use('/SendEmailPass',users.SendEmailPass);
app.use('/EditUser',users.EditUser);

//ADVANCE ROUTES
app.use('/GetNumPic', advance.GetNumPic);
app.use('/GetNumPO', advance.GetNumPO);
app.use('/GetNumCon', advance.GetNumCon);
app.use('/GetPakInfo', advance.GetPakInfo);

//ICUSTOMER ROUTES
app.use('/GetIcustomer', icustomer.GetIcustomer);
app.use('/GetIcustomerByName', icustomer.GetIcustomerByName);
app.use('/AddIcustomer', icustomer.AddIcustomer);
app.use('/GetIcustomerbyID', icustomer.GetIcustomerbyID);
app.use('/EditIcustomer', icustomer.EditIcustomer);
app.use('/DelIcustomer', icustomer.DelIcustomer);

/*function add(data) {
    return('add data ' + data.name);
}

app.post('/test1', function(req, res) {
    var data = req.body;
    var mess = add(data);
    res.end(mess);
})

app.post('/test2', function(req, res) {
    var datas = req.body;
    var mess = "";
    datas.forEach(function(data) {
        mess += "\r\n" + add(data);
    })
    res.end(mess);
})*/



app.set('port', 5000);

app.listen(app.get('port'), function (err) {
    console.log(err || `Server opening at port ${app.get('port')}`);
});