$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var Studioform =$('#StudioForm');
    var addForm =$('#addForm')
    var showAdd = $('#showAdd');
    var StudioNum = $('#StudioNum');
    var adddiv = $('#adddiv');
    var editForm = $('#editForm');
    var showall = $('#showall');

    showall[0].onclick = function(){
        showData();
    }
    var showData = function(){
        $.ajax({
            url: '/GetStudio',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    var oldName;
    var oldAdress;
    var oldprovince;
    var oldDistrict;
    var oldEmail;
    var oldNumber;
    var oldCoordinate;
    var oldIDs;
    var show = function (res) {
        console.log(res);
        StudioNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            //edit
            function bindToEditForm(data = {}) {
                editForm.show();
                addForm.hide();
                var selectag2 = $("#districts");
                var s;

                editForm.find('#newIDSTu').text(data.Studio_ID);
                oldIDs = data.Studio_ID;
                editForm.find('#newPNames').val(data.Studio_Name);
                oldName = data.Studio_Name;
                editForm.find('#newPAddresss').val(data.Studio_Address);
                oldAdress = data.Studio_Address;
                editForm.find('#provinces').val(data.Province_ID);
                oldprovince = data.Province_ID;
                editForm.find('#districts').val(data.District_ID);
                oldDistrict = data.District_ID;
                s = data.District_Name;
                var optionTag2 = null;
                optionTag2 = $(`<option selected="selected" value='${oldDistrict}'>${s}</option>`);
                selectag2.empty();
                selectag2.append(optionTag2);
                editForm.find('#newPEmails').val(data.Studio_Email);
                oldEmail = data.Studio_Email;
                editForm.find('#newPNumbers').val(data.Studio_Number);
                oldNumber = data.Studio_Number;
                editForm.find('#newPCoordinates').val(data.Studio_Coordinate);
                oldCoordinate = data.Studio_Coordinate;
                //console.log(oldName, oldAdress, oldprovince, oldDistrict,oldEmail,oldNumber,oldCoordinate, s, oldIDs);
            }
            //del
            function delRow(data = {}) {
                var oldId = data.Studio_ID;
                console.log(oldId);
                if (confirm('Bạn có muốn xóa?')) {
                    $.ajax({
                        url: `/DelStudio`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            delid: oldId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Xóa bị lỗi do được liên kết!';
                        if (code == 200) {
                            alert("Xóa thành công");
                            window.location.href = "http://localhost:5000/studio.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }
            //show
            res.data.forEach(function (d, i) {

                var StudioID = d.Studio_ID;
                var StudioName = d.Studio_Name;
                var StudioAddress = d.Studio_Address;
                var StudioEmail = d.Studio_Email;
                var StudioNumber = d.Studio_Number;
                var StudioCoordinate = d.Studio_Coordinate;
                var ProvinceName = d.Province_Name;
                var DistrictName = d.District_Name;

                var tr = $(`<tr>
                    <td>${StudioID}</td>
                    <td>${StudioName}</td>
                    <td>${StudioAddress}</td>
                    <td>${StudioEmail}</td>
                    <td>${StudioNumber}</td>
                    <td>${StudioCoordinate}</td>
                    <td>${ProvinceName}</td>
                    <td>${DistrictName}</td>
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
            StudioNum.append("Số Studo tìm được: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("Không có Studio nào!!")
        }
    }


    showAdd[0].onclick = function(){
        editForm.hide();
        document.getElementById("addForm").style.display = 'block';
    }
    Studioform.submit(function (e) {
        e.preventDefault();
        var StudioName = Studioform.find("input[name='studios']").val();
        console.log(StudioName);
        $.ajax({
            url: `/GetStudioByName?name=${StudioName}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    });

    /*addForm.submit(function (e) {
        e.preventDefault();
        var newNames = addForm.find("input[name='newPName']").val();
        var newAddress = addForm.find("input[name='newPAddress']").val();
        var newEmail = addForm.find("input[name='newPEmail']").val();
        var newNumber = addForm.find("input[name='newPNumber']").val();
        var newCoordinate = addForm.find("input[name='newPCoordinate']").val();
        var idistrict = $('#district :selected').val();
        console.log(newNames,newAddress,newEmail,newNumber,newCoordinate,idistrict);
        e.preventDefault();
        $.ajax({
            url: '/AddStudio',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newNames: newNames,
                newAddress:newAddress,
                newEmail: newEmail,
                newNumber: newNumber,
                newCoordinate: newCoordinate,
                idistrict: idistrict,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/studio.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })*/

    $.ajax({
        url: '/GETProvinces',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    })


    var renderOptions = function (options) {
        console.log("ok");
        var selectTag = $("#province");
        var selectag2 = $("#provinces");
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Province_Name;
            var id = options[i].Province_ID;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);

            selectTag.append(optionTag);
            selectag2.append(optionTag2);
        }
    }

    //change district when privince change
    $("#province").change(function(){
        var id = $(this).val();
        console.log(id);
        $.ajax({
            url: '/GetDitsrictByIdProvince',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                idProvince: id,
            })
        }).always(function (res) {
            console.log(res);
            var options = res.data;//TODO
            console.log("ngon");
            var selectTag = $("#district");
            //var selectag2 = $("#districts");
            selectTag.empty();
            for (var i = 0; i < options.length; i++) {
                var name = options[i].District_Name;
                var id = options[i].District_ID;
                //create optionTag from database
                var optionTag = null;
                //var optionTag2 = null;
                optionTag = $(`<option value='${id}'>${name}</option>`);
                //optionTag2 = $(`<option value='${id}'>${name}</option>`);
                selectTag.append(optionTag);
                //selectag2.append(optionTag2);
            }
        })
    })

    //change district edit
    $("#provinces").change(function(){
        var id = $(this).val();
        console.log(id);
        $.ajax({
            url: '/GetDitsrictByIdProvince',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                idProvince: id,
            })
        }).always(function (res) {
            console.log(res);
            var options = res.data;//TODO
            console.log("ngon");
            //var selectTag = $("#district");
            var selectag2 = $("#districts");
            selectag2.empty();
            for (var i = 0; i < options.length; i++) {
                var name = options[i].District_Name;
                var id = options[i].District_ID;
                //create optionTag from database
               // var optionTag = null;
                var optionTag2 = null;
                //optionTag = $(`<option value='${id}'>${name}</option>`);
                optionTag2 = $(`<option value='${id}'>${name}</option>`);
                //selectTag.append(optionTag);
                selectag2.append(optionTag2);
            }
        })
    })



    //edit
    /*editForm.submit(function (e) {
        e.preventDefault();
        //var newNames = editForm.find("input[name='oldName']").val();
        var newName = editForm.find("input[name='newPNames']").val();
        var newAdre = editForm.find("input[name='newPAddresss']").val();
        var idDistrict = $('#districts :selected').val();
        var newEmails = editForm.find("input[name='newPEmails']").val();
        var newNum = editForm.find("input[name='newPNumbers']").val();
        var newCoor = editForm.find("input[name='newPCoordinates']").val();
        console.log(oldIDs,newAdre,idDistrict,newEmails,newNum,newCoor);
        e.preventDefault();
        $.ajax({
            url: '/EditStudio',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                ids : oldIDs,
                stuname: newName,
                address:newAdre,
                idistrictssss: idDistrict,
                email: newEmails,
                number: newNum,
                coordinate: newCoor,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/studio.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })*/

    // Chạy hàm kiểm tra valid()

    //var register = $('#Add');



    // Kiểm tra lỗi với sự kiện onchange -> gọi lại hàm valid()



    //


    //check add

    function validadd() {
        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        var patternss = /^[a-zA-Z0-9ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ ]+$/;
        var coordinatesss = /[0-9.],[0-9.]+$/;
        var check1,check2,check3,check4,check5,check6,check7,check8,check9,check10;
        var total = 10;
        var province = $('#province :selected').val();
        var resultname = $("#resultname");
        var name = $("#newPName").val();
        resultname.text("");
        var resultaddress = $("#resultaddress");
        var address = $("#newPAddress").val();
        resultaddress.text("");
        var resultemail = $("#resultemail");
        var email = $("#newPEmail").val();
        resultemail.text("");
        var resultphone = $("#resultphone");
        var phone = $("#newPNumber").val();
        resultphone.text("");
        var resultcoor = $("#resultcoor");
        var coor = $("#newPCoordinate").val();
        resultcoor.text("");
        if(name == ''){
            resultname.text("Chưa nhập Tên Studio");
            resultname.css("color", "red");
        }else {check10 =1;}
        if(address == ''){
            resultaddress.text("Chưa nhập địa chỉ Studio");
            resultaddress.css("color", "red");
        } else {check9=1;}
        if(email == ''){
            resultemail.text("Chưa nhập Email");
            resultemail.css("color", "red");
        } else {check8=1;}
        if(phone == ''){
            resultphone.text("Chưa nhập Số Điện Thoại");
            resultphone.css("color", "red");
        } else {check7=1;}
        if(coor == ''){
            resultcoor.text("Chưa nhập tọa dộ Studio");
            resultcoor.css("color", "red");
        } else {check6 =1;}
        if(reg_mail.test(email) == false && email != ''){
            resultemail.text("Email không hợp lệ (ví dụ: abc@gmail.com)");
            resultemail.css("color", "red");
        } else { check1=1; }
        if(coordinatesss.test(coor) == false && coor != ''){
            resultcoor.text("Cooridnate không hợp lệ (theo form: XX,XX)");
            resultcoor.css("color", "red");
        } else { check2=1;}
        if(patternss.test(name) == false && name != ''){
            resultname.text("StudioName không hợp lệ");
            resultname.css("color", "red");
        } else {check3=1;}
        if(isNaN(phone) == true && phone != ''){
                resultphone.text("Số điện thoại phải là kiểu số");
                resultphone.css("color", "red");
        } else {check4=1;}
        if(isNaN(phone) == false &&(phone.length < 8 || phone.length > 12)){
            resultphone.text("Số điện thoại phải từ 8 đến 12 số");
            resultphone.css("color", "red");
        }else {check5=1;}
        if(province == 'Please Select'){
            alert("Chưa chọn Tỉnh/Thành phố");
        } else if(total==(check1+check2+check3+check4+check5+check6+check7+check8+check9+check10)){
            var newNames = addForm.find("input[name='newPName']").val();
            var newAddress = addForm.find("input[name='newPAddress']").val();
            var newEmail = addForm.find("input[name='newPEmail']").val();
            var newNumber = addForm.find("input[name='newPNumber']").val();
            var newCoordinate = addForm.find("input[name='newPCoordinate']").val();
            var idistrict = $('#district :selected').val();
            var idprovince = $('#province :selected').val();
            console.log(newNames,newAddress,newEmail,newNumber,newCoordinate,idistrict);
            // e.preventDefault();
            $.ajax({
                url: '/AddStudio',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    newNames: newNames,
                    newAddress:newAddress,
                    newEmail: newEmail,
                    newNumber: newNumber,
                    newCoordinate: newCoordinate,
                    idistrict: idistrict,
                })
            }).always(function (res) {

                    var code = res.code;
                    var success = res.success || 'Thêm bị lỗi!';

                    if (code == 200) {
                        alert("Thêm thành công!");
                        window.location.href="http://localhost:5000/studio.html";
                    } else {
                        alert(success);
                    }


            })

            // })
        }
        //console.log(param);

        return false;
    }

    var register = document.getElementById('Add');
    console.log(register);
    register.onclick = function(){

        return validadd();

    }



    //check edit
    function validedit() {
        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        var patternss = /^[a-zA-Z0-9ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ ]+$/;
        var coordinatesss = /[0-9.],[0-9.]+$/;
        var check1,check2,check3,check4,check5,check6,check7,check8,check9,check10;
        var total = 10;
        var province = $('#provinces :selected').val();
        var resultname = $("#resultoldname");
        var name = $("#newPNames").val();
        resultname.text("");
        var resultaddress = $("#resultoldadress");
        var address = $("#newPAddresss").val();
        resultaddress.text("");
        var resultemail = $("#resultoldemail");
        var email = $("#newPEmails").val();
        resultemail.text("");
        var resultphone = $("#resultoldphone");
        var phone = $("#newPNumbers").val();
        resultphone.text("");
        var resultcoor = $("#resultoldcorr");
        var coor = $("#newPCoordinates").val();
        resultcoor.text("");
        if(name == ''){
            resultname.text("Chưa nhập Tên Studio");
            resultname.css("color", "red");
        }else {check10 =1;}
        if(address == ''){
            resultaddress.text("Chưa nhập địa chỉ Studio");
            resultaddress.css("color", "red");
        }else {check6 = 1;}
        if(email == ''){
            resultemail.text("Chưa nhập Email");
            resultemail.css("color", "red");
        }else {check7 =1;}
        if(phone == ''){
            resultphone.text("Chưa nhập Số Điện Thoại");
            resultphone.css("color", "red");
        }else {check8 =1;}
        if(coor == ''){
            resultcoor.text("Chưa nhập tọa dộ Studio");
            resultcoor.css("color", "red");
        }else {check9 =1;}
        if(reg_mail.test(email) == false && email != ''){
            resultemail.text("Email không hợp lệ (ví dụ: abc@gmail.com)");
            resultemail.css("color", "red");
        } else { check1=1; }
        if(coordinatesss.test(coor) == false && coor != ''){
            resultcoor.text("Cooridnate không hợp lệ (theo form: XX,XX)");
            resultcoor.css("color", "red");
        } else { check2=1;}
        if(patternss.test(name) == false && name != ''){
            resultname.text("StudioName không hợp lệ");
            resultname.css("color", "red");
        } else {check3=1;}
        if(isNaN(phone) == true && phone != ''){
            resultphone.text("Số điện thoại phải là kiểu số");
            resultphone.css("color", "red");
        } else {check4=1;}
        if(isNaN(phone) == false &&(phone.length < 8 || phone.length > 12) && phone != ''){
            resultphone.text("Số điện thoại phải từ 8 đến 12 số");
            resultphone.css("color", "red");
        }else {check5=1;}
        if(province == 'Please Select'){
            alert("Chưa chọn Tỉnh/Thành phố");
        } else if(total==(check1+check2+check3+check4+check5+check6+check7+check8+check9+check10)){

            var newName = editForm.find("input[name='newPNames']").val();
            var newAdre = editForm.find("input[name='newPAddresss']").val();
            var idDistrict = $('#districts :selected').val();
            var newEmails = editForm.find("input[name='newPEmails']").val();
            var newNum = editForm.find("input[name='newPNumbers']").val();
            var newCoor = editForm.find("input[name='newPCoordinates']").val();
            console.log(oldIDs,newAdre,idDistrict,newEmails,newNum,newCoor);
            //e.preventDefault();
            $.ajax({
                url: '/EditStudio',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    ids : oldIDs,
                    stuname: newName,
                    address:newAdre,
                    idistrictssss: idDistrict,
                    email: newEmails,
                    number: newNum,
                    coordinate: newCoor,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Chỉnh Sửa bị lỗi!';
                window.location.href="http://localhost:5000/studio.html"
                if (code == 200) {
                    alert("Chỉnh Sửa thành công");
                } else {
                    alert(success);
                }
            })
            // })
        }
        //console.log(param);

        return false;
    }



    var register2 = document.getElementById('Edit');
    console.log(register2);
    register2.onclick = function(){

        return validedit();

    }

})