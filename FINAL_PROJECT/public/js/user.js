$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');
    var UserForm = $('#UserForm');
    var addForm = $('#addForm')
    var showAdd = $('#showAdd');
    var UserNum = $('#UserNum');
    var adddiv = $('#adddiv');
    var editForm = $('#editForm');
    var showall = $('#showall');
    var showData = function () {
        $.ajax({
            url: '/GetUser',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }

    showall[0].onclick = function(){
        showData();
    }
    var oldName;
    var oldPass;
    var oldRole;
    var oldStudio;

    var show = function (res) {
        console.log(res);
        UserNum.empty();
        showDat.empty();

        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            //edit
            function bindToEditForm(data = {}) {
                editForm.show();
                addForm.hide();

                editForm.find('#newName').text(data.User_ID);
                oldName = data.User_ID;
                editForm.find('#newPass').val(data.User_Password);
                oldPass = data.User_Password;
                editForm.find('#newRole').val(data.User_Role);
                oldRole = data.User_Role;
                editForm.find('#SelStudio').val(data.Studio_ID);
                oldStudio = data.Studio_ID;
                console.log(oldName, oldPass, oldRole, oldStudio);
            }
            //del
            function delRow(data = {}) {
                oldId = data.User_ID;
                console.log(oldId);
                if (confirm('Bạn có muốn xóa?')) {
                    $.ajax({
                        url: `/DelUser`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            delid: oldId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Xóa bị lỗi do đẫ có bảng khác nối!';
                        if (code == 200) {
                            alert("Xóa thành công");
                            window.location.href = "http://localhost:5000/user.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }

            res.data.forEach(function (d, i) {

                var UserID = d.User_ID;
                var Password = d.User_Password;
                var UserRole = d.User_Role;
                var StudioName = d.Studio_Name;
                var tr = $(`<tr>
                    <td>${UserID}</a></td>
                    <td>${Password}</td>
                    <td>${StudioName}</td>
                </tr>`);
                var editButton = $(`<td><button style="color:white">Chỉnh Sửa</button></td>`);
                var delButton = $(`<td><button style="color:white">Xóa</button></td>`);
                editButton.click(function (e) {
                    bindToEditForm(d);
                });
                delButton.click(function (e) {
                    delRow(d);
                })
                tr.append(editButton);
                tr.append(delButton);
                showDat.append(tr);
                count++;
            })
            UserNum.append("Số tài khoản được tìm thấy: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("Tài khoản này không tồn tại!")
        }
    }


    showAdd[0].onclick = function () {
        editForm.hide();
        document.getElementById("addForm").style.display = 'block';
    }
    UserForm.submit(function (e) {
        e.preventDefault();
        var UserName = UserForm.find("input[name='userns']").val();
        console.log(UserName);
        $.ajax({
            url: `/GetUserByName?name=${UserName}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    });

    $.ajax({
        url: '/GetStudio',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    })


    var renderOptions = function (options) {
        console.log("ok");
        var selectTag = $("#studio");
        var selectag2 = $("#SelStudio");
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Studio_Name;
            var id = options[i].Studio_ID;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
            selectag2.append(optionTag2);
        }
    }

    /*addForm.submit(function (e) {
        e.preventDefault();
        

    })*/

    /*editForm.submit(function (e) {
        e.preventDefault();
        //var newNames = editForm.find("input[name='oldName']").val();


    })*/



    //check add
    function validadd() {
        var patternss = /^[a-zA-Z0-9]+$/;
        var resultname = $("#resultname");
        var name = $("#newPName").val();
        resultname.text("");
        var resultpass = $("#resultpass");
        var pass = $("#newPPass").val();
        resultpass.text("");
        var resultstudio = $("#resultstudio");
        var studio = $('#studio :selected').val();
        if(name == ''){
            resultname.text("Chưa nhập Tài khoản");
            resultname.css("color", "red");
        }
        if(pass == ''){
            resultpass.text("Chưa nhập mật khẩu");
            resultpass.css("color", "red");
        }
        if (patternss.test(name) == false && name != ''){
            resultname.text("Tài khoản không được có ký tự dặc biệt");
            resultname.css("color", "red");
        }
        if(name.length <6 || name.length > 32){
            resultname.text("Tài khoản phải từ 6 đến 32 ký tự");
            resultname.css("color", "red");
        }
        if (pass.length < 6){
            resultpass.text("Mật khẩu phải từ 6 ký tự trở lên");
            resultpass.css("color", "red");
        }
        if(studio == 'Please Select'){
            alert("Chưa chọn Studio");
        } else if(patternss.test(name) == true && name.length<=32 && pass.length >= 6 && name.length >= 6){
            var newNames = addForm.find("input[name='newPName']").val();
            var newPass = addForm.find("input[name='newPPass']").val();
            var newRole = 'user';
            var idstudio = $('#studio :selected').val();
            console.log(newNames, newPass, newRole, idstudio);
            $.ajax({
                url: '/AddUser',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    newNames: newNames,
                    newPass: newPass,
                    newRole: newRole,
                    idstudio: idstudio,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Thêm bị lỗi!';
                if (code == 200) {
                    alert("Thêm thành công");
                    window.location.href = "http://localhost:5000/user.html"
                } else {
                    alert(success);
                }
            })

        }
        //console.log(param);

        return false;
    }

    //$("#changepass").bind("click", validate(old));
    //$("#Add").bind("click", validadd());
    var register = document.getElementById('Add');
    console.log(register);
    register.onclick = function () {

        return validadd();

    }

    //check edit
    function validedit() {
        var resultpass = $("#resultpassedit");
        var pass = $("#newPass").val();
        resultpass.text("");
        var studio = $('#SelStudio :selected').val();
        if(pass == ''){
            resultpass.text("Chưa nhập mật khẩu");
            resultpass.css("color", "red");
        }
        if (pass.length < 6){
            resultpass.text("Mật khẩu phải từ 6 ký tự trở lên");
            resultpass.css("color", "red");
        }
        if(studio == 'Please Select'){
            alert("Chưa chọn Studio");
        } else if(pass.length >= 6){
            var newPass = editForm.find("input[name='newPass']").val();
            var newRole = 'user';
            var idstudio = $('#SelStudio :selected').val();
            console.log(oldName, newPass, newRole, idstudio);
            $.ajax({
                url: '/EditUser',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    newNamess: oldName,
                    newPasss: newPass,
                    newRoles: newRole,
                    idstudios: idstudio,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Chỉnh sửa bị lỗi!';
                if (code == 200) {
                    alert("Chỉnh sửa thành công");
                    window.location.href = "http://localhost:5000/user.html"
                } else {
                    alert(success);
                }
            })

        }
        //console.log(param);

        return false;
    }
    var register2 = document.getElementById('Edit');
    console.log(register2);
    register2.onclick = function () {

        return validedit();

    }

})