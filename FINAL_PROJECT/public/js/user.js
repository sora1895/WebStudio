$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var UserForm =$('#UserForm');
    var addForm =$('#addForm')
    var showAdd = $('#showAdd');
    var UserNum = $('#UserNum');
    var adddiv = $('#adddiv');
    var editForm = $('#editForm');
    var showData = function(){
        $.ajax({
            url: '/GetUser',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    showData();
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
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/DelUser`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            delid: oldId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
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
                    <td>${UserRole}</td>
                </tr>`);
                var editButton = $(`<td><button>Edit</button></td>`);
                var delButton = $(`<td><button>Delete</button></td>`);
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
            UserNum.append("Number of Packages found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }


    showAdd[0].onclick = function(){
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

    addForm.submit(function (e) {
        e.preventDefault();
        var newNames = addForm.find("input[name='newPName']").val();
        var newPass = addForm.find("input[name='newPPass']").val();
        var newRole = addForm.find("input[name='newPRole']").val();
        var idstudio = $('#studio :selected').val();
        console.log(newNames,newPass,newRole,idstudio);
        e.preventDefault();
        $.ajax({
            url: '/AddUser',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newNames: newNames,
                newPass:newPass,
                newRole: newRole,
                idstudio: idstudio,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/user.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })

    editForm.submit(function (e) {
        e.preventDefault();
        //var newNames = editForm.find("input[name='oldName']").val();
        var newPass = editForm.find("input[name='newPass']").val();
        var newRole = editForm.find("input[name='newRole']").val();
        var idstudio = $('#SelStudio :selected').val();
        console.log(oldName,newPass,newRole,idstudio);
        e.preventDefault();
        $.ajax({
            url: '/EditUser',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newNamess: oldName,
                newPasss:newPass,
                newRoles: newRole,
                idstudios: idstudio,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/user.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })

})