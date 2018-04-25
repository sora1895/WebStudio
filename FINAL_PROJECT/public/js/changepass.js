$(document).ready(function () {

  var old = sessionStorage.getItem('pass');
  var id = localStorage.getItem('id');
  //console.log(old);

  //check userid
  function validate() {
    var resultoldpass = $("#resultoldpass");
    var passold = $("#passwordold").val();
    resultoldpass.text("");
    var resultnewpass = $("#resultnewpass");
    var passnew = $("#passwordnew").val();
    resultnewpass.text("");
    var resultrepass = $("#resultrepass");
    var passrenew = $("#passwordrenew").val();
    resultrepass.text("");

    console.log(passold, passnew, passrenew, old, id);
    if(passold == ''){
      resultoldpass.text("Chưa nhập mật khẩu");
      resultoldpass.css("color", "red");
    }
    if(passold != old){
      alert("Mật khẩu không đúng");
      resultoldpass.text("Mật khẩu không đúng");
      resultoldpass.css("color", "red");
    }
    if (passnew == ''){
      resultnewpass.text("Chưa nhập mật khẩu");
      resultnewpass.css("color", "red");
    }
    if (passrenew == ''){
      resultrepass.text("Chưa nhập mật khẩu");
      resultrepass.css("color", "red");
    }
    if(passnew != passrenew){
      //alert("Nhập Lại mật khẩu không khớp");
      resultrepass.text("Nhập Lại mật khẩu không khớp");
      resultrepass.css("color", "red");
    }
    if(passnew.length < 6 || passnew.length > 32){
      resultnewpass.text("Mật khẩu mới phải từ 6 - 32 ký tự");
      resultnewpass.css("color", "red");
    } else if(passold == old && passnew == passrenew){

      $.ajax({
        url: '/Changepass',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          newNames: id,
          newPass: passnew,
        })
      }).always(function (res) {
        var code = res.code;
        var success = res.success || 'Đổi mật khẩu bị lỗi!';

        if (code == 200) {
          alert('Mật khẩu của bạn đã đổi thành công');
          //window.location.href = "http://localhost:5000/user-page.html"
        } else {
          alert(success);
        }
      })
    }
    //console.log(param);

    return false;
  }

  //$("#changepass").bind("click", validate(old));
  $("#changepass").bind("click", validate);

})
