$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');

    //form 1
    var packForm = $('#packForm');
    var PackNum = $('#PackNum');
    var showAdd = $('#showAdd');
    var checkAvai = $('#checkAvai');
    var editForm = $('#editForm');
    var showall = $('#showall');
    //var showDel = $('#showDel');

    //form 2
    var addForm = $('#addForm');
    var Add = $('#Add');
    var Del = $('#Del');

    showAdd[0].onclick = function () {
        editForm.hide();
        document.getElementById("addForm").style.display = 'block';
    }
    showall[0].onclick = function(){
        showData();
    }

    packForm.submit(function (e) {
        e.preventDefault();
        var PackName = packForm.find("input[name='package']").val();
        console.log(PackName);
        $.ajax({
            url: '/GetPackByName',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: localStorage.getItem('UserStudioId'),
                PackName: PackName,
            })
        }).always(function (res) {
            show(res);
        })
    });
    var oldID;
    var oldName;
    var oldDetail;
    var oldPrice;
    var oldAvalable;

    var show = function (res) {
        console.log(res);
        PackNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            function bindToEditForm(data = {}) {
                editForm.show();
                addForm.hide();

                editForm.find('#newid').text(data.Package_ID);
                oldID = data.Package_ID;
                editForm.find('#newName').val(data.Package_Name);
                oldName = data.Package_Name;
                editForm.find('#newDetail').val(data.Package_Detail);
                oldDetail = data.Package_Detail;
                editForm.find('#newPrice').val(data.Package_Price);
                oldPrice = data.Package_Price;
                editForm.find('#checkAvail').val(data.Package_available);
                oldAvalable = data.Package_available;
                console.log(oldID, oldName, oldDetail, oldPrice, oldAvalable);
            }

            //del
            function delRow(data = {}) {
                oldId = data.Package_ID;
                console.log(oldId);
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/delPack`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            PakId: oldId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            window.location.href = "http://localhost:5000/package.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }
            res.data.forEach(function(d,i){
                var d = res.data[i];
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var packageAvailable = d.Package_available;
                var StudioID = d.Studio_ID;
                var PackPic = d.Package_pic;
                var yesno;
                if(packageAvailable == 1){
                    yesno = 'yes';
                } else {
                    yesno = 'no';
                }


                var tr = $(`<tr>
                    <td>${PackageID}</td>
                    <td><a href="view-pack.html?id=${StudioID}&name=${PackageName}">${PackageName}</a></td>
                    <td>${PackageDetail.substr(0,200) + " ....."}</td>
                    <td>${PackagePrice.toLocaleString( 'en-US')} vnd</td>
                    <td>${yesno}</td>
                    <td><img width=400px src=${PackPic}></td>
                </tr>`);
                var editButton = $(`<td><button style="color:white">Edit</button></td>`);
                var delButton = $(`<td><button style="color:white">Delete</button></td>`);
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
            PackNum.append("Number of Packages found: " + count);
        }
        else {
            alert("You don't have any Package yet")
        }
    }

    /*addForm.submit(function (e) {
        var newName = addForm.find("input[name='newPName']").val();
        var newDetail = addForm.find("textarea[name='newPDetail']").val();
        var newPrice = addForm.find("input[name='newPPrice']").val();
        console.log(newName, newDetail, newPrice);
        e.preventDefault();
            $.ajax({
                url: '/AddPack',
                method: 'post',
                contentType: 'application/json', 
                data: JSON.stringify({
                    id: localStorage.getItem("UserStudioId"),
                    name: newName,
                    detail: newDetail,
                    price: newPrice,
                    avai:checkAvai.val(),
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';

                if (code == 200) {
                    alert("Insert Successful");
                } else {
                    alert(success);
                }
            })
        
        

    })*/
    
    var showData = function(){
        $.ajax({
            url: '/getPackage?key='+localStorage.getItem('UserStudioId'),
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
     showData();

     var inputs = document.forms['addForm'].getElementsByTagName('input');
    var run_onchange = false;
    function valid1(){
        var errors = false;

        var patternss = /^[a-zA-Z0-9ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ ]+$/;
        for(var i=0; i<inputs.length; i++){
            var value = inputs[i].value;
            var id = inputs[i].getAttribute('id');
            // Tạo phần tử span lưu thông tin lỗi
            var span = document.createElement('span');
            // Nếu span đã tồn tại thì remove
            var p = inputs[i].parentNode;
            if(p.lastChild.nodeName == 'SPAN') {p.removeChild(p.lastChild);}
            // Kiểm tra rỗng

            if(value == ''){
                span.innerHTML ='Thông tin được yêu cầu';

            }else{
                //check name
               
                //check Price
                if(id == 'newPPrice'){
                    var a = parseFloat(value);
                    console.log(a);
                    if(isNaN(value) == true ||  a <= 0){span.innerHTML ='Price must be digit and must be > 0';}
                    var pass =value;
                }

                // Kiểm tra số điện thoại
                // if(id == 'newPNumber' && isNaN(value) == true ){span.innerHTML ='Số điện thoại phải là kiểu số';}

            }
            // Nếu có lỗi thì chèn span vào hồ sơ, chạy onchange, submit return false, highlight border

            if(span.innerHTML != ''){

                inputs[i].parentNode.appendChild(span);

                errors = true;

                //run_onchange = true;

                inputs[i].style.border = '1px solid #c6807b';
                inputs[i].style.background = '#fffcf9';

            }
        }// end for
        if(errors == false){
            var newName = addForm.find("input[name='newPName']").val();
            var newDetail = addForm.find("textarea[name='newPDetail']").val();
            var newPrice = addForm.find("input[name='newPPrice']").val();
            var newPic = addForm.find("input[id='newUrl']").val();
            console.log(newName, newDetail, newPrice);
          //  e.preventDefault();
            $.ajax({
                url: '/AddPack',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: localStorage.getItem("UserStudioId"),
                    name: newName,
                    detail: newDetail,
                    price: newPrice,
                    avai:checkAvai.val(),
                    pic:newPic,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert Successful!';

                if (code == 200) {
                    alert("Insert Successful");
                    window.location.href = "http://localhost:5000/package.html";
                } else {
                    alert(success);
                }
            })



            //  alert('Đăng ký thành công');
        } else {
            return !errors;

        }



    }// end valid()

    // Chạy hàm kiểm tra valid()

    //var register = $('#Add');

    var register = document.getElementById('Add');
    console.log(register);
    register.onclick = function(){

        return valid1();

    }


    //check edit

    var inputs1 = document.forms['editForm'].getElementsByTagName('input');
    var run_onchange1 = false;
    function valid2(){
        var errors = false;

        var patternss = /^[a-zA-Z0-9 ]+$/;
        for(var i=0; i<inputs1.length; i++){
            var value = inputs1[i].value;
            var id = inputs1[i].getAttribute('id');
            // Tạo phần tử span lưu thông tin lỗi
            var span = document.createElement('span');
            // Nếu span đã tồn tại thì remove
            var p = inputs1[i].parentNode;
            if(p.lastChild.nodeName == 'SPAN') {p.removeChild(p.lastChild);}
            // Kiểm tra rỗng

            if(value == ''){
                span.innerHTML ='Thông tin được yêu cầu';

            }else{
                //check name
                
                //check Price
                if(id == 'newPrice'){
                    var a = parseFloat(value);
                    console.log(a);
                    if(isNaN(value) == true ||  a <= 0){span.innerHTML ='Price must be digit and must be > 0';}
                    var pass =value;
                }

                // Kiểm tra số điện thoại
                //  if(id == 'newPNumber' && isNaN(value) == true ){span.innerHTML ='Số điện thoại phải là kiểu số';}

            }
            // Nếu có lỗi thì chèn span vào hồ sơ, chạy onchange, submit return false, highlight border

            if(span.innerHTML != ''){

                inputs1[i].parentNode.appendChild(span);

                errors = true;

                //run_onchange = true;

                inputs1[i].style.border = '1px solid #c6807b';

                inputs1[i].style.background = '#fffcf9';

            }
        }// end for

        if(errors == false){

            //e.preventDefault();
            var package = editForm.find("input[name='newName']").val();
            var detail = editForm.find("textarea[name='newDetail']").val();
            var price = editForm.find("input[name='newPrice']").val();
            var avalable = $('#checkAvail').val();
            var pic = editForm.find("input[id='newUrl']").val();
            console.log(oldID,package, detail, price, avalable);

            $.ajax({
                url: '/EditPack',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    newName: package,
                    id: oldID,
                    newPrice: price,
                    newDetail: detail,
                    newAvalable: avalable,
                    pic:pic,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Edit failed!!';
                window.location.href = "http://localhost:5000/package.html";
                if (code == 200) {
                    alert("Edit Successful!");

                } else {
                    alert(success);
                }
            })



            //  alert('Đăng ký thành công');
        } else {
            return !errors;

        }



    }// end valid()

    // Chạy hàm kiểm tra valid()

    //var register = $('#Add');

    var register2 = document.getElementById('Edit');
    console.log(register2);
    register2.onclick = function(){

        return valid2();

    }


})