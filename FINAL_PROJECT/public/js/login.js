//b1: bat event submit form >> lay data tu form ra (email, password)
//b2: request post data len api /login de kiem tra login fail hay ko
//b3: doc response tra ve tu request 
//b4: xu ly + in ra cho nguoi dung

$(document).ready(function() {
    var form = $('#loginForm');
    //b1
    form.submit(function(e) {
        e.preventDefault();
        //b2
        var id = form.find("input[name='id']").val();
        var password = form.find("input[name='password']").val();

        //b3
        $.ajax({
            url: '/login',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: id,
                password: password,
            })
        }).always(function(res) {
            //b4
            var code = res.code;
            var success = res.success || 'Login when wrong!';
            var role = res.role;
            console.log(role);
            if(code == 200) {
                if(role=='admin'){
                    location.assign('/index.html?role=admin');
                }else{
                    location.assign('/index.html');
                }
                
            } else {
                //login fail!
                alert(success);
            }
        })
    })
})