var express    = require("express");
var login = require('./routes/loginroutes');
var dis = require('./routes/districtroutes');
var pack = require('./routes/packageroutes');
var pmprice = require('./routes/materialpriceroutes')
var material = require('./routes/printmaterialroutes');
var picture = require('./routes/pictureroutes');
var orderdetail = require('./routes/orderdetailroutes');
var printorder = require('./routes/PrintOrderRoutes');
var condetail = require('./routes/contractdetailroutes');
var contract = require('./routes/contractroutes');
var customer = require('./routes/CustomerRoutes');
var users = require('./routes/userRoutes');
var studio = require('./routes/StudioRoutes');
var advance = require('./routes/AdvanceSearchRoutes');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
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

app.use('/',express.static('./public'));

var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
/*router.post('/register',login.register);
router.post('/login',login.login);
router.post('/dismanage',login.dismanage);*/

//Login ROUTES
app.use('/api', router);
app.use('/register',login.register);
app.use('/login',login.login);

//PROVINCE & DISTRICT ROUTES
app.use('/dismanage',dis.GetDisByProId);
app.use('/getProvince',dis.getProvince);
app.use('/showAll',dis.showAll);
app.use('/addDis',dis.addDis);
app.use('/delDis',dis.delDis);
app.use('/getDis',dis.getDisById);
app.use('/getDisName',dis.getDisNameById);
app.use('/getDisIdByName',dis.getDisIdByName);
app.use('/EditDis',dis.EditDis);

//PACKAGE ROUTES
app.use('/getPackage',pack.GetPackage);
app.use('/GetPackByName',pack.GetPackByName);
app.use('/AddPack',pack.AddPack);
app.use('/delPack',pack.delPack)
app.use('/EditPack',pack.EditPack);
app.use('/GetPackByStuId',pack.GetPackByStuId);

//MATERIAL ROUTES
app.use('/GetPMaterial',material.GetPMaterial);
app.use('/GetMaterialByName',material.GetMaterialByName);
app.use('/GetMaterialIdByName',material.GetMaterialIdByName);
app.use('/AddMaterial',material.AddMaterial);
app.use('/delMaterial',material.delMaterial);
app.use('/EditMaterial',material.EditMaterial);

//MATERIAL PRICE ROUTES
app.use('/GetPMPRice',pmprice.GetPMPrice);
app.use('/GetPMPriceById',pmprice.GetPMPriceById);
app.use('/GetPMPriceByMatId',pmprice.GetPMPriceByMatId);
app.use('/AddPMPrice',pmprice.AddPMPrice);
app.use('/delPMPrice',pmprice.delPMPrice);
app.use('/EditMPrice',pmprice.EditMPrice);

//PICTURE ROUTES
app.use('/GetPicture',picture.GetPicture);
app.use('/AddPicture',picture.AddPicture);
app.use('/GetPictureByName',picture.GetPictureByName);
app.use('/EditPicture',picture.EditPicture);
app.use('/delPicture',picture.delPicture);

//ORDER DETAIL ROUTES
app.use('/GetOrderDetail',orderdetail.GetOrderDetail);
app.use('/AddOrderDetail',orderdetail.AddOrderDetail);
app.use('/EditPODetail',orderdetail.EditPODetail);
app.use('/delPODetail',orderdetail.delPODetail);
app.use('/GetOrderDetailByName',orderdetail.GetOrderDetailByName);

//PRINT ORDER ROUTES
app.use('/GetPOrder',printorder.GetPOrder);
app.use('/GetPOrderById',printorder.GetPOrderById);
app.use('/AddPOrder',printorder.AddPOrder);
app.use('/EditPOrder',printorder.EditPOrder);
app.use('/delPOrder',printorder.delPOrder);

//CONTRACT DETAIL ROUTES
app.use('/GetConDetail',condetail.GetConDetail);
app.use('/delConDetail',condetail.delConDetail);
app.use('/EditConDetail',condetail.EditConDetail);
app.use('/AddConDetail',condetail.AddConDetail);

//CONTRACT ROUTES
app.use('/GetContract',contract.GetContract);
app.use('/GetContractBySearch',contract.GetContractBySearch);
app.use('/AddContract',contract.AddContract);
app.use('/EditContract',contract.EditContract);
app.use('/delContract',contract.delContract);

//CUSTOMER ROUTES
app.use('/GetCustomer',customer.GetCustomer);
app.use('/GetCustomerByName',customer.GetCustomerByName);

//STUDIO ROUTES
app.use('/GetStudio',studio.GetStudio);
app.use('/GetStudioByName', studio.GetStudioByName);
app.use('/GETProvinces', studio.GETProvinces);
app.use('/GetDitsrictByIdProvince', studio.GetDitsrictByIdProvince);
app.use('/AddStudio', studio.AddStudio);
app.use('/GetStudioByID', studio.GetStudioByID);
app.use('/EditStudio', studio.EditStudio);
app.use('/DelStudio', studio.DelStudio);

//USER ROUTES
app.use('/GetUser', users.GetUser);
app.use('/GetUserByName', users.GetUserByName);
app.use('/GetUserByID', users.GetUserByID);
app.use('/DelUser', users.DelUser);
app.use('/AddUser', users.AddUser);

//ADVANCE ROUTES
app.use('/GetNumPic',advance.GetNumPic);
app.use('/GetNumPO',advance.GetNumPO);
app.use('/GetNumCon',advance.GetNumCon);

app.set('port', 5000);

app.listen(app.get('port'), function(err) {
    console.log(err || `Server opening at port ${app.get('port')}`);
});