$(document).ready(function () {
    //var userid = $('#userid');
    var checkUserName;

    function validateEmail(email) {
        var re = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        return re.test(email);
    }



    //check userid
    function validate() {
        var $result = $("#resultemail");
        var email = $("#emailstudio").val();
        $result.text("");
        var $result1 = $("#resultuser");
        var email1 = $("#userid").val();
        $result1.text("");

        if(validateEmail(email) && email1 != ''){
            checkUserName = email1;
            $.ajax({
                url: '/GetUser',
                method: 'get',
                contentType: 'application/json',
            }).always(function (res) {
                show(res);
            })
        }

        if(email1 == ''){
            $result1.text("UserID chưa nhập");
            $result1.css("color", "red");
        }
        if(validateEmail(email) == false){
            $result.text(email + " không đúng form Email  :((VD: abc@gmail.com)");
            $result.css("color", "red");
        }
        return false;
    }

    $("#resets").bind("click", validate);



    var check1 = true;
    var checkStudioID;
    var show = function (res) {
        if (res && res.data && res.data instanceof Array) {

            res.data.forEach(function (d, i) {
                var $result = $("#resultuser");

                var UserID = d.User_ID;
                var StudioID = d.Studio_ID;
                var Passuser = d.User_Password;
                console.log(UserID,StudioID, Passuser);
                if(checkUserName == UserID){

                    check1 = false;
                    checkStudioID = StudioID;
                    $.ajax({
                        url: `/GetStudioByID?id=${checkStudioID}`,
                        method: 'get',
                        contentType: 'application/json',
                    }).always(function (res) {
                        //alert(Passuser);
                        show2(res, Passuser, UserID);
                    })

                }
            })
            //alert(check1);
            if(check1 == true){
                alert("UserID không tồn tại");
            }
        }
        else {
            alert("????");
        }
    }

    var check2 = true;
    var passwords;
    var show2 = function (res, pass, UserID) {
        //alert(pass);
        if (res && res.data && res.data instanceof Array) {
            //console.pass
            //show
            res.data.forEach(function (d, i) {
                var email = $("#emailstudio").val();
                var StudioEmail = d.Studio_Email;
                console.log(StudioEmail);
                if(email == StudioEmail){
                    check2 = false;
                    $.ajax({
                        url: '/SendEmailPass',
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            returnpass: pass,
                            stuemail: StudioEmail,
                            returnid: UserID,
                        })
                    }).always(function (res) {
                        console.log(res);

                    })
                    alert("Bạn đã lấy lại mật khâu thành công. Vui lòng kiểm tra lại email.");
                }

            })
            if(check2 == true){
                alert("Email không hợp lệ");
            }

        }
        else {
            alert("????")
        }
    }



})