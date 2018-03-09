//require package
var express = require('express');

var app = express();
var router = require('./router/index');

//handle request to server
app.use('/', router);
app.use('/public', express.static('./public'));

//opening server and log result
var afterOpeningServerDo = function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Server opened at port 8888');
    }
};

app.listen(8888, afterOpeningServerDo);