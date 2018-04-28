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
        var resultname = $("#name");
        resultname.text("");
        var name = $("#id").val();
        var resultpass = $("#pass");
        resultpass.text("");
        var pass = $("#password").val();
        if(name == ''){
            resultname.text("Chưa nhập Tài khoản");
            resultname.css("color", "red");
        }
        if(pass == '') {
            resultpass.text("Chưa nhập Mật Khẩu");
            resultpass.css("color", "red");
        }
        if(name != '' && pass != ''){
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
                localStorage.setItem('id',id);
                sessionStorage.setItem('pass',password);
                if(code == 200) {

                    if(role=='admin'){
                        location.assign('/user-page.html');
                        localStorage.setItem('Admin',1);
                    }else{
                        $.ajax({
                            url: '/GetUserByID?id='+id,
                            method: 'post',
                            contentType: 'application/json',
                        }).always(function(res) {
                            localStorage.setItem('UserStudioId',res.data[0].Studio_ID);
                            localStorage.setItem('USER',JSON.stringify(res.data));
                            location.assign('/user-page.html');
                        })
                    }

                } else {
                    //login fail!
                    alert(success);
                }
            })
        }

    })
})