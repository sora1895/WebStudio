$(document).ready(function () {
    var title = $('#title');
    var showDat = $('#showDat').find('tbody');
    var form = $('#searchForm');
    var addform = $('#addForm');
    var ConDeNum = $('#ConNum');
    var showAdd = $('#showAdd');
    var editForm =$('#editForm');
    var conname =$('#conname');
    var addname = $('#addname');
    var ConDe = $('#ConDe');
    var total = $('#total');
    
    var ConDeId;

    var x = document.URL;
    var idloc = x.search("id=");
    //var nameloc = x.search("Customer=");
    var id1 = x.substr(idloc+3);
    
    console.log(idloc,id1);
    
    var id = x.substr(idloc + 3);
    title.append(id1);

    var showData = function () {
        
        $.ajax({
            url: `/GetConDetail`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id:id1, 
                code:1,
            })
        }).always(function (res) {
            show(res);
        })
    }
    showData();

    form.submit(function (e) {
        e.preventDefault();
        var stuid = form.find("input[name='stuid']").val();
        var pakname = form.find("input[name='pakname']").val();
        console.log(stuid,pakname);
        $.ajax({
            url: `/GetConDetail`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id:stuid,
                pakname:pakname,
                code:1,
            })
        }).always(function (res) {
            show(res);
        })
    });
    showAdd[0].onclick = function () {
        addform.show();
        document.getElementById("editForm").style.display='none';
        addname.empty();
        addname.append("Add Contract Detail at #"+id1);
    }

    var renderPackage = function (options) {
        console.log("aaa");
        var selectTag = $("#SelPak");
        var selectTag2 = $("#SelEPack");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].Package_ID;
            var name = options[i].Package_Name;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }

    $.ajax({
        url: '/GetPakInfo?id='+localStorage.getItem('UserStudioId'),//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderPackage(options);
    })

    $.ajax({
        url: `/GetContractBySearch?conid=${id1}`,
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var cDate = new Date(res.data[0].Contract_cDate);
        var date = days[cDate.getDay()]+' '+cDate.getDate()+'/'+(cDate.getMonth()+1)+'/'+cDate.getFullYear();
        var tr=$(`<tr>
                <th>Customer:</th>
                <td>${res.data[0].Customer_Name}</td>
            </tr>
            <tr>
                <th>Studio:</th>
                <td>${res.data[0].Studio_Name}</td>
            </tr>
            <tr>
                <th>Create Date:</th>
                <td>${date}</td>
            </tr>`);
        ConDe.append(tr);
    })

    var show = function (res) {
        console.log(res);
        ConDeNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            var Sum =0;
            function bindToEditForm(data = {}) {
                ConDeId = data.ConDetail_ID;
                console.log(ConDeId);
                editForm.show();
                conname.empty();
                conname.append("Edit Contract Detail #"+ConDeId);
                document.getElementById("addForm").style.display='none';

                editForm.find('#SelECon').val(data.Contract_ID);
                editForm.find('#SelEPack').val(data.Package_ID);
                editForm.find('#newEName').val(data.Package_Name);
                editForm.find('#newEDetail').val(data.Package_Detail);
                editForm.find('#newEPrice').val(data.Package_Price);
                editForm.find('#newENote').val(data.Package_Note);
            }
            function delRow(data = {}) {
                ConDeId = data.ConDetail_ID;
                console.log(ConDeId);
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/delConDetail`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: ConDeId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            window.location.reload();
                        } else {
                            alert(success);
                        }
                    })
                }

            }

            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var ConDetailID = d.ConDetail_ID;
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var PackageNote = d.Package_Note;

                var tr = $(`<tr>
                    <td>${ConDetailID}</td>
                    <td>${ContractID}</td>
                    <td><a href="view-pack.html?id=${localStorage.getItem('UserStudioId')}&name=${PackageName}">${PackageID}</a></td>
                    <td>${PackageName}</td>
                    <td>${PackageDetail.substr(0,100)} ....</td>
                    <td>${PackagePrice.toLocaleString( 'en-US')}</td>
                    <td>${PackageNote}</td>
                </tr>`);

                var editButton = $(`<td><button style="color:white">Edit</button></td>`);
                var delButton = $(`<td><button style="color:white">Delete</button></td>`);
                var viewButton = $(`<td><button style="color:white">View Picture</button></td>`);
                editButton.click(function (e) {
                    bindToEditForm(d);
                });
                delButton.click(function (e) {
                delRow(d);
                })
                viewButton.click(function(e){
                    window.location.href=`viewpicture.html?condeid=${ConDetailID}`;
                })
                Sum += PackagePrice;
                tr.append(editButton);
                tr.append(delButton);
                tr.append(viewButton);
                showDat.append(tr);
                count++;
            })
            ConDeNum.append("Number of Contract found: " + count);
            total.append(Sum.toLocaleString('en-US')+" vnd");

        }
        else {
            alert("????")
        }
    }

    /*addform.submit(function (e) {
        var pakid = addform.find("select[id='SelPak']").val();
        var newName = addform.find("input[name='newPName']").val();
        var newDetail = addform.find("input[name='newPDetail']").val();
        var newPrice = addform.find("input[name='newPPrice']").val();
        var newNote = addform.find("input[name='newNote']").val();
        console.log(id1,pakid,newName, newDetail,newPrice, newNote);

        var element = {
            cusid: id1,
            stuid: pakid,
            newCDes: newName,
            sdate: newDetail,
            edate: newPrice,
            cdate: newNote,
        };
        e.preventDefault();
            $.ajax({
                url: '/AddConDetail',
                method: 'post',
                contentType: 'application/json', 
                data: JSON.stringify({
                    cusid:id1,
                    stuid:pakid,
                    newCDes: newName,
                    sdate: newPrice,
                    edate: newNote,
                    cdate: newDetail,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';

                if (code == 200) {
                    alert("Insert Successful");
                    window.location.reload();
                } else {
                    alert(success);
                }
            })
        
    })*/

    /*editForm.submit(function (e) {

        var conid = editForm.find("input[name='SelECon']").val();
        var pakid = editForm.find("select[id='SelEPack']").val();
        var newName = editForm.find("input[name='newEName']").val();
        var newDetail = editForm.find("textarea[name='newEDetail']").val();
        var newPrice = editForm.find("input[name='newEPrice']").val();
        var newNote = editForm.find("input[name='newENote']").val();
        console.log(conid,pakid,newName, newDetail,newPrice, newNote);
        
        $.ajax({
            url: `/EditConDetail`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid:ConDeId,
                cusid:conid,
                stuid:pakid,
                newCDes: newName,
                sdate: newPrice,
                edate: newNote,
                cdate: newDetail,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.reload();
            } else {
                alert(success);
            }
        })


    })*/
    var inputs = document.forms['editForm'].getElementsByTagName('input');
    var run_onchange = false;
    function valid1(){
        var errors = false;

        var patternss = /^[a-zA-Z0-9]+$/;
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


                // Kiểm tra số điện thoại
                 if(id == 'newEPrice' ){

                     if(isNaN(value) == true || parseFloat(value) < 1) {
                         span.innerHTML ='price must be number!!';
                     }
                    // var val;
                     //if( val.parseFloat(value) <= 0){
                    //     span.innerHTML ='price must be > 0';
                   //  }

                     }

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

            //  e.preventDefault();
            var pakid = addform.find("select[id='SelPak']").val();
        var newName = addform.find("input[name='newPName']").val();
        var newDetail = addform.find("textarea[name='newPDetail']").val();
        var newPrice = addform.find("input[name='newPPrice']").val();
        var newNote = addform.find("input[name='newNote']").val();
        console.log(id1,pakid,newName, newDetail,newPrice, newNote);

        var element = {
            cusid: id1,
            stuid: pakid,
            newCDes: newName,
            sdate: newDetail,
            edate: newPrice,
            cdate: newNote,
        };
        e.preventDefault();
            $.ajax({
                url: '/AddConDetail',
                method: 'post',
                contentType: 'application/json', 
                data: JSON.stringify({
                    cusid:id1,
                    stuid:pakid,
                    newCDes: newName,
                    sdate: newPrice,
                    edate: newNote,
                    cdate: newDetail,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';

                if (code == 200) {
                    alert("Insert Successful");
                    window.location.reload();
                } else {
                    alert(success);
                }
            })
        
            // })


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

    var inputs2 = document.forms['editForm'].getElementsByTagName('input');
    var run_onchange2 = false;
    function valid2(){
        var errors = false;

        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        var patternss = /^[a-zA-Z0-9 ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ]+$/;
        var coordinatesss = /[0-9.],[0-9.]+$/
        for(var i=0; i<inputs2.length; i++){

            var value = inputs2[i].value;

            var id = inputs2[i].getAttribute('id');

            // Tạo phần tử span lưu thông tin lỗi

            var span = document.createElement('span');

            // Nếu span đã tồn tại thì remove

            var p = inputs2[i].parentNode;

            if(p.lastChild.nodeName == 'SPAN') {p.removeChild(p.lastChild);}

            // Kiểm tra rỗng

            if(value == ''){

                span.innerHTML ='Thông tin được yêu cầu';

            }else{

                // Kiểm tra các trường hợp khác

                if(id == 'newPEmails'){

                    if(reg_mail.test(value) == false){ span.innerHTML ='Email không hợp lệ (ví dụ: abc@gmail.com)';}

                    var email =value;

                }
                if(id == 'confirm_email' && value != email){span.innerHTML ='Email nhập lại chưa đúng';}

                //check coordinate
                if(id == 'newPCoordinates'){
                    //console.log(value);
                    if(coordinatesss.test(value) == false){ span.innerHTML ='Cooridnate không hợp lệ (theo form: XX,XX)';}

                }
                if(id == 'newPNames'){
                    console.log(value);
                    if(patternss.test(value) == false){ span.innerHTML ='StudioName không hợp lệ';}
                    var emailss =value;
                }
                // Kiểm tra số điện thoại

                if(id == 'newPNumbers' && isNaN(value) == true ){span.innerHTML ='Số điện thoại phải là kiểu số';}

            }
            // Nếu có lỗi thì chèn span vào hồ sơ, chạy onchange, submit return false, highlight border

            if(span.innerHTML != ''){

                inputs2[i].parentNode.appendChild(span);

                errors = true;

                //run_onchange = true;

                inputs2[i].style.border = '1px solid #c6807b';

                inputs2[i].style.background = '#fffcf9';

            }
        }// end for

        if(errors == false){

        var pakid = editForm.find("select[id='SelEPack']").val();
        var newName = editForm.find("input[name='newEName']").val();
        var newDetail = editForm.find("textarea[name='newEDetail']").val();
        var newPrice = editForm.find("input[name='newEPrice']").val();
        var newNote = editForm.find("input[name='newENote']").val();
        console.log(conid,pakid,newName, newDetail,newPrice, newNote);
        
        $.ajax({
            url: `/EditConDetail`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: ConDeId,
                cusid: id1,
                stuid: pakid,
                newCDes: newName,
                sdate: newPrice,
                edate: newNote,
                cdate: newDetail,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.reload();
            } else {
                alert(success);
            }
        })
            // })


            //  alert('Đăng ký thành công');
        } else {
            return !errors;

        }

    }// end valid()

    var register2 = document.getElementById('Edit');
    console.log(register2);
    register2.onclick = function(){

        return valid2();

    }
})