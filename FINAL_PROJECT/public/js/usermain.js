$(document).ready(function () {
    var user = $('#user');
    var admin = $('#admin');

    
    var x = document.URL;
    var roleloc = x.search("role=");
    var role = x.substr(roleloc+5);
    console.log(role);
    if(role =='admin'){
        admin.show();
    }else{
        user.show();
    }
})