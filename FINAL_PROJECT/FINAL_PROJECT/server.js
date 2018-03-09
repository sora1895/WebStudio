var express    = require("express");
var login = require('./routes/loginroutes');
var dis = require('./routes/districtroutes');
var pack = require('./routes/packageroutes');
var material = require('./routes/printmaterialroutes');
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
app.use('/GetPackIdByName',pack.GetPackIdByName);
app.use('/AddPack',pack.AddPack);
app.use('/delPack',pack.delPack)
app.use('/EditPack',pack.EditPack);

//MATERIAL ROUTES
app.use('/GetPMaterial',material.GetPMaterial);
app.use('/GetMaterialByName',material.GetMaterialByName);
app.use('/GetMaterialIdByName',material.GetMaterialIdByName);
app.use('/AddMaterial',material.AddMaterial);
app.use('/delMaterial',material.delMaterial);
app.use('/EditMaterial',material.EditMaterial);

app.set('port', 5000);

app.listen(app.get('port'), function(err) {
    console.log(err || `Server opening at port ${app.get('port')}`);
});