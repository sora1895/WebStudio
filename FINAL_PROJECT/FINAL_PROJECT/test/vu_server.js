var express = require('express');

var app = express();

console.log('1');

var handlerRequest = function(request, response) {
    console.log('2');
    response.end('dm m');
};


app.get('/', handlerRequest);

console.log('3');


var afterOpeningServerDo = function(err) {
    console.log('4');
    if(err) {
        console.log(err);
    } else {
        console.log('Server opened at port 8888');
    }
};

app.listen(8888, afterOpeningServerDo);

console.log('5');