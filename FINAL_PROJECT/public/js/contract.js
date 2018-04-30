$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');
    var form = $('#searchForm');
    var addform = $('#addForm');
    var ConNum = $('#ConNum');
    var showAdd = $('#showAdd');
    var editForm = $('#editForm');
    var conname = $('#conname');
    var Addnew = $('#Addnew');
    var Addnewbody = $('#Addnew').find('tbody');
    var newCDDetail = $('#newCDDetail');
    var PakPrice = $('#PakPrice');
    var SelNPak = $('#SelNPak');
    var VatPrice = $('#VatPrice');
    var total = $('#total');
    var SelNStu = $('#SelNStu');
    var ConDeItem = $('#ConDeItem');
    var showalls = $('#showall');
    var packageOptions = null;

    var type = null;

    var price = 0;
    var detail = null;
    var pakcount =2;

    var ConID;
    var CusID;

    var showData = function () {
        $.ajax({
            url: '/GetContract',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }

    showAdd[0].onclick = function () {

        document.getElementById("exist").style.display == 'blocked'
        //addform.show();
        //ConDeItem.show();
        if(type=='edit'){
            document.getElementById("addForm").reset();
            Addnewbody.empty();
            
            var tr =$(`
            <tr>
                <th colspan="2">Gói #1</th>
            </tr><tr>
                <td>Tên sản phẩm:</td>
                <td colspan="3">
                    <select id="SelNPak" name="SelNPak" required>
                        <option>Xin hãy chọn một gói hàng .... </option>
                    </select>
                        <button type="button" name="addPak" class="w3-button w3-green">Add more</button>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <label>Chi tiết sản phẩm</label>
                    <textarea rows="5" placeholder="Enter Package detail ....." style="width: 100%" id="newCDDetail" name="newCDDetail" required></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: right">
                    <p id="PakPrice">Giá trước VAT: Giá sản phẩm</p>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <label>Ghi chú:</label>
                    <input placeholder="Nhập ghi chú ... " type="text" name="newCNote" width="100%">
                </td>
            </tr>`);

        Addnewbody.append(tr);
        }

        type = 'add';
        Addnew.show();
        // document.getElementById("editForm").style.display = 'none';
    }

    form.submit(function (e) {
        e.preventDefault();
        var type = form.find("select[id='type']").val();
        var key = form.find("input[name='key']").val();
        if(key==null||key==''){
            $.ajax({
                url: `/GetConbyStudio?id=${localStorage.getItem('UserStudioId')}`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    key: key,
                    type: type,
                })
            }).always(function (res) {
                show(res);
            })
        }else{
            console.log(type, key);
            $.ajax({
                url: `/GetNumCon`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    key: key,
                    type: type,
                    id:localStorage.getItem('UserStudioId'),
                })
            }).always(function (res) {
                show(res);
            })
        }
        
    });

    var renderCustomer = function (options) {
        console.log("aaa");
        var selectTag = $("#SelNCus");
        var selectTag2 = $("#SelECon");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].Customer_ID;
            var name = options[i].Customer_Name;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }
    var renderStudio = function (options) {
        console.log("aaa");
        var selectTag = $("#SelNStu");
        var selectTag2 = $("#SelEStu");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].Studio_ID;
            var name = options[i].Studio_Name;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }

    var renderPackage = function (options, selectTag) {
        selectTag.empty();
        selectTag.append($(`<option>Xin hãy chọn một gói hàng .... </option>`));
        if (options instanceof Array) {
            for (var i = 0; i < options.length; i++) {
                var id = options[i].Package_ID;
                var name = options[i].Package_Name;
                //create optionTag from database
                var optionTag = null;
                optionTag = $(`<option value='${id}'>${name}</option>`);
                selectTag.append(optionTag);
            }
        }
    }

    var renderCDetail = function (res, detailTag, priceTag, vatTag, totalTag) {
        detailTag.empty();
        var detail = res.data[0].Package_Detail;
        detailTag.append(detail);
        priceTag.empty();
        var price = res.data[0].Package_Price;
        priceTag.append("Giá trước VAT: " + price.toLocaleString('en-US') + " vnd");
        vatTag.empty();
        var vat = price * 0.1;
        vatTag.append("Giá VAT: " + vat.toLocaleString('en-US') + " vnd");
        totalTag.empty();
        var Total = price + vat;
        totalTag.append("Tổng giá tiền: " + Total.toLocaleString('en-US') + " vnd");
    }

    $('body').on('click', `button[name='addPak']`, function () {
        var tr = $(`<tr><th colspan="2">Gói #${pakcount}</th></tr>`
            +'<tr><td>Tên sản phẩm:</td><td colspan="3">'
            + '<select id="SelNPak" name="SelNPak"><option>Xin hãy chọn một gói hàng .... </option> </select>'
            + '<p><button type="button" name="addPak" class="w3-button w3-green">Add more</button></p></td></tr>'
            + '<tr><td colspan="4">'
            + '<label>Chi tiết sản phẩm</label>'
            + '<textarea rows="5" placeholder="Hãy nhập chi tiết gói hàng ... " style="width: 100%" id="newCDDetail" name="newCDDetail" required></textarea>'
            + '</td></tr>'
            + '<tr><td colspan="4" style="text-align: right">'
            + '<p id="PakPrice">Giá trước VAT: Giá sản phẩm</p>'
            + '</td></tr>'
            + '<tr>'
            + '<td colspan="4">'
            + '<label>Ghi chú:</label>'
            + '<input placeholder="Nhập ghi chú ... " type="text" name="newCNote" width="100%">'
            + '</td>'
            + '</tr>');

            pakcount++;


        $("#Addnew").append(tr);
        var selectTag = tr.find(`select[id='SelNPak']`);
        var detailTag = tr.find(`textarea[id="newCDDetail"]`);
        var priceTag = tr.find(`p[id="PakPrice"]`)
        var vatTag = tr.find(`p[id="VatPrice"]`)
        var totalTag = tr.find(`p[id="total"]`)
        console.log('packageOptions', packageOptions)
        renderPackage(packageOptions, selectTag);

        selectTag.change(function () {
            console.log(selectTag.val());
            $.ajax({
                url: `/GetPackByPakId`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: selectTag.val(),
                })
            }).always(function (res) {
                renderCDetail(res, detailTag, priceTag, vatTag, totalTag);
            })
        })
    });

    /*$.ajax({
        url: '/GetCustomer',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderCustomer(options);
    })*/
    $.ajax({
        url: '/GetStudio',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderStudio(options);
    })



    SelNStu.change(function () {
        SelNPak.empty();
        var tr = "<option>Xin hãy chọn một gói hàng .... </option>";
        SelNPak.append(tr);
        console.log(SelNStu.val());
        $.ajax({
            url: `/GetPackByStuId?id=${SelNStu.val()}`,//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            console.log(res);
            packageOptions = res.data;//TODO
            console.log('fetch', res.data, packageOptions);
            var selectTag = $("select[name='SelNPak']");
            renderPackage(packageOptions, selectTag);
        })
    })

    SelNPak.change(function () {

        console.log(SelNPak.val());
        $.ajax({
            url: `/GetPackByPakId`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: SelNPak.val(),
            })
        }).always(function (res) {
            renderCDetail(res, newCDDetail, PakPrice, VatPrice, total);
        })
    })

    var showConDe = function (res) {
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var ConDetailID = d.ConDetail_ID;
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var PackageNote = d.Package_Note;
                var vat = PackagePrice * 0.1;
                var total = PackagePrice + vat;


                var tr = $(`
                <tr>
                    <th colspan="3"><p id="condeid" style="color:white">Contract Detail #${ConDetailID}</p></th>
                    <td><a href="contractdetail.html?id=${ContractID}">View Detail</a></td>
                </tr>
                <tr>
                    <td>Tên sản phẩm:</td>
                    <td colspan="3">
                        <select id="SelNPak" name="SelNPak">
                           <option>${PackageName}</option>
                        </select>
                        <p><button type="button" name="addPak" class="w3-button w3-green">Add more</button></p>
                    </td>
            </tr>
                <tr>
                    <td colspan="4">
                        <label>Chi tiết sản phẩm</label>
                        <textarea rows="5" placeholder="Hãy nhập chi tiết gói hàng ... " style="width: 100%" id="newCDDetail" name="newCDDetail" required>${PackageDetail}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right">
                       <p id="PakPrice">Giá trước VAT: ${PackagePrice.toLocaleString('en-US')} vnd</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <label>Ghi chú:</label>
                        <input placeholder="Nhập ghi chú ... " type="text" name="newCNote" value="${PackageNote}" width="100%">
                   </td>
                </tr>`);

                Addnewbody.append(tr);

            })
        }
    }

    var show = function (res) {
        console.log(res);
        ConNum.empty();
        //showalls.show();
        showDat.empty();

        if (res && res.data && res.data instanceof Array) {

            var count = 0;
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            function bindToEditForm(data = {}) {
                type = 'edit';
                console.log(type);
                Addnewbody.empty();
                Addnew.show();
                ConID = data.Contract_ID;
                $.ajax({
                    url: `/GetConDetail`,
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: ConID,
                        code: 1,
                    })
                }).always(function (res) {
                    showConDe(res);
                })

                var CustomerID = data.Customer_ID;
                CusID = CustomerID;
                var Customername = data.Customer_Name;
                var CustomerAddress = data.Customer_Address;
                var CustomerGender = data.Customer_Gender;
                var CustomerPhone = data.Customer_Number;
                var CustomerEmail = data.Customer_Email;
                var CustomerNote = data.Customer_Note;

                var StudioName = data.Studio_Name;
                var StudioID = data.Studio_ID;
                var ContractDescription = data.Contract_Description;
                var cDate = new Date(data.Contract_cDate);
                var sDate = new Date(data.Contract_sDate);
                var eDate = new Date(data.Contract_eDate);

                if (eDate.getMonth() + 1 < 10) {
                    var EndMonth = "0" + (eDate.getMonth() + 1)
                    if (eDate.getDate() < 10) {
                        var EnDate = "0" + eDate.getDate();
                    } else {
                        var EnDate = eDate.getDate();
                    }
                }
                if (sDate.getDate()) {
                    var StartMonth = "0" + (sDate.getMonth() + 1)
                    if (sDate.getDate() < 10) {
                        var StaDate = "0" + sDate.getDate();
                    } else {
                        var StaDate = sDate.getDate();
                    }
                }
                if (cDate.getDate()) {
                    var CreateMonth = "0" + (cDate.getMonth() + 1)
                    if (cDate.getDate() < 10) {
                        var CreDate = "0" + cDate.getDate();
                    } else {
                        var CreDate = cDate.getDate();
                    }
                }
                var CreateDate = "" + cDate.getFullYear() + "-" + CreateMonth + "-" + CreDate + "";
                var StartDate = "" + sDate.getFullYear() + "-" + StartMonth + "-" + StaDate + "";
                var EndDate = "" + eDate.getFullYear() + "-" + EndMonth + "-" + EnDate + "";

                Addnew.find("input[name='newCusName']").val(Customername);
                Addnew.find("textarea[name='newCusAdd']").val(CustomerAddress);
                Addnew.find("input[name='newCusPhone']").val(CustomerPhone);
                Addnew.find("input[name='newCusEmail']").val(CustomerEmail);
                Addnew.find("input[name='newCusNote']").val(CustomerNote);
                Addnew.find("input[name='gender']").val(CustomerGender);
                Addnew.find("select[id='SelNStu']").val(StudioID);
                Addnew.find("textarea[name='newCDes']").val(ContractDescription);
                Addnew.find("input[name='newCdate']").val(CreateDate);
                Addnew.find("input[name='newSdate']").val(StartDate);
                Addnew.find("input[name='newEdate']").val(EndDate);

                /*conname.empty();
                editForm.show();
                document.getElementById("addForm").style.display = 'none';
                conname.append("Edit Contract #" + ConID);
                editForm.find('#newEDes').val(data.Contract_Description);*/
            }
            /*function delRow(data = {}) {
                ConID = data.Contract_ID;
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/delContract`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            id: ConID,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            window.location.href = "http://localhost:5000/contract.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }*/

            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var CustomerID = d.Customer_ID;
                var Customername = d.Customer_Name;
                var StudioName = d.Studio_Name;
                var StudioID = d.Studio_ID;
                var state = d.Contract_State;
                var ContractDescription = d.Contract_Description;
                var cDate = new Date(d.Contract_cDate);
                var sDate = new Date(d.Contract_sDate);
                var eDate = new Date(d.Contract_eDate);
                var CreateDate = days[cDate.getDay()] + ' ' + cDate.getDate() + '/' + (cDate.getMonth() + 1) + '/' + cDate.getFullYear();
                var StartDate = days[sDate.getDay()] + ' ' + sDate.getDate() + '/' + (sDate.getMonth() + 1) + '/' + sDate.getFullYear();
                var EndDate = days[eDate.getDay()] + ' ' + eDate.getDate() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getFullYear();
                if(state=='Chưa thanh toán'){
                    var sql = `<td style="color:red">${state}</td>`
                }else if(state=='Đã thanh toán'){
                    var sql = `<td style="color:green">${state}</td>`
                }else if(state=='Đợi ảnh'){
                    var sql = `<td style="color:#5bc0de">${state}</td>`
                }else if(state=='Hoàn thành'){
                    var sql = `<td style="color:green">${state}</td>`
                }
                var tr = $(`<tr>
                    <td><a href="contractdetail.html?id=${ContractID}">${ContractID}</a></td>
                    <td><a href="icustomerdetail.html?id=${CustomerID}?name=${Customername}">${Customername}</a></td>
                    <td>${StudioName}</td>
                    <td>${ContractDescription}</td>
                    <td>${CreateDate}</td>
                    <td>${StartDate}</td>
                    <td>${EndDate}</td>
                    `+sql+`
                </tr>`);

                var editButton = $(`<td><button>Chỉnh Sửa</button></td>`);
                //var delButton = $(`<td><button>Delete</button></td>`);
                editButton.click(function (e) {
                    bindToEditForm(d);
                });
                /*delButton.click(function (e) {
                delRow(d);
                })*/

                tr.append(editButton);
                //tr.append(delButton);
                showDat.append(tr);
                count++;
            })
            ConNum.append("Số Hợp đồng tìm được: " + count);

        }
        else {
            alert("Not found!");
            ConNum.append("Số Hợp đồng tìm được: 0");
        }
    }

    //ADD Contract
    var AddCon = function (cusid, addform) {

        var stuid = addform.find("select[id='SelNStu']").val();
        var newCDes = addform.find("textarea[name='newCDes']").val();
        var newCdate = addform.find("input[name='newCdate']").val();
        var newSdate = addform.find("input[name='newSdate']").val();
        var newEdate = addform.find("input[name='newEdate']").val();
        var state = addform.find("select[id='constate']").val();
        console.log(cusid, stuid, newCDes, newCdate, newSdate, newEdate);
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
            $.ajax({
                url: '/checkId?id='+text,
                method: 'post',
                contentType: 'application/json',
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'ID exist!';
                if(code==200){
                    alert(success);
                }else{
                    
                }
            })
        
        
          
        $.ajax({
            url: '/AddContract',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: text,
                cusid: cusid,
                stuid: stuid,
                newCDes: newCDes,
                sdate: newSdate,
                edate: newEdate,
                cdate: newCdate,
                state: state,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';

            if (code == 200) {
                alert("Insert Contract Successful");
                //window.location.href = "http://localhost:5000/contract.html";
                //console.log(res);
                AddConDe(text);
            } else {
                alert(success);
            }
        })
    }


    //ADD Contract Detail
    var AddConDe = function (conid) {
        var cart = [];
        var selectDoms = $("select[id='SelNPak']");
        var textAreaDoms = $("textarea[name='newCDDetail']");
        var pDoms = $("p[id='PakPrice']");
        var inputs = $("input[name='newCNote']");
        //console.log(textAreaDoms, pDoms, inputs)
        //coung == cart.length
        selectDoms.each(function (i, dom) {
            var pakid = $(dom).val();
            var newName = $(`#SelNPak option:selected`).text();
            var newDetail = $(textAreaDoms[i]).val();
            var newPrice = $(pDoms[i]).text();
            var newNote = $(inputs[i]).val();

            var numb = newPrice.match(/\d/g);
            numb = numb.join("");


            var element = [
                conid,
                Number(pakid),
                newName,
                newDetail,
                Number(numb),
                newNote,
            ];
            cart.push(element);
            console.log(element)
        })
        console.log(cart);

        //console.log(pakid, newName, newDetail, newPrice, newNote);

        $.ajax({
            url: '/AddMultiConDe',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(cart)
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
    }

  

    var EditCon = function (cusid) {

        //var cusid = editForm.find("select[id='SelECon']").val();
        var stuid = addform.find("select[id='SelNStu']").val();
        var newCDes = addform.find("textarea[name='newCDes']").val();
        var newCdate = addform.find("input[name='newCdate']").val();
        var newSdate = addform.find("input[name='newSdate']").val();
        var newEdate = addform.find("input[name='newEdate']").val();
        
        var state = addform.find("select[id='constate']").val();
        console.log(cusid, stuid, newCDes, newCdate, newSdate, newEdate,state);

        $.ajax({
            url: `/EditContract`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: ConID,
                cusid: cusid,
                stuid: stuid,
                newCDes: newCDes,
                sdate: newSdate,
                edate: newEdate,
                cdate: newCdate,
                state: state,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Edit Contract Successful!");// window.location.href = "http://localhost:5000/contract.html";
                EditConDe();
            } else {
                alert(success);
            }
        })

    }

    var EditConDe = function(){
        var cart = [];
        var idDoms = $("p[id='condeid']");
        var selectDoms = $("select[id='SelNPak']");
        var textAreaDoms = $("textarea[name='newCDDetail']");
        var pDoms = $("p[id='PakPrice']");
        var inputs = $("input[name='newCNote']");
        //console.log(textAreaDoms, pDoms, inputs)
        //coung == cart.length
        idDoms.each(function (i, dom) {
            var condeid = $(dom).text();
            var pakid = $(selectDoms).val();
            var newName = $(`#SelNPak option:selected`).text();
            var newDetail = $(textAreaDoms[i]).val();
            var newPrice = $(pDoms[i]).text();
            var newNote = $(inputs[i]).val();

            var numb = newPrice.match(/\d/g);
            numb = numb.join("");
            var id = condeid.match(/\d/g);
            id = id.join("");


            var element = {
                ConID:ConID,
                pakid:Number(pakid),
                newName:newName,
                newDetail:newDetail,
                numb:Number(numb),
                newNote:newNote,
                id:Number(id),
            };
            cart.push(element);
            console.log(element)
        })
        console.log(cart);

        //console.log(pakid, newName, newDetail, newPrice, newNote);

        $.ajax({
            url: '/EditMultiConDe',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(cart)
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';

            if (code == 200) {
                alert("Edit ConDE Successful!");
                //window.location.reload();
            } else {
                alert(success);
            }
        })
    }

    addform.submit(function(e){
        e.preventDefault();
        //ADD Customer
        
    })



    // Chạy hàm kiểm tra valid()

    //var register = $('#Add');




    function validate() {
        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        var checkname = /^[a-zA-Z0-9 ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ]+$/;
        var resultname = $("#resultname");
        var name = $("#newCusName").val();
        resultname.text("");
        var resultphone = $("#resultphone");
        var phone = $("#newCusPhone").val();
        resultphone.text("");
        var resultemail = $("#resultemail");
        var email = $("#newCusEmail").val();
        resultemail.text("");
        var $resultcre = $("#resultcreDate");
        var credate = $("#newCdate").val();
        $resultcre.text("");
        var $resultsdate = $("#resultSDate");
        var sdate = $("#newSdate").val();
        $resultsdate.text("");
        var $resultedate = $("#resultEDate");
        var edate = $("#newEdate").val();
        $resultedate.text("");
        var datecre = Date.parse(credate);
        var datesdat = Date.parse(sdate);
        var dateedate = Date.parse(edate);
        var check1,check2,check3,check4,check5,check6,check7,check8,check9,check10,check11,check12,check13,check14,check15,check16,check17,check18,check19,check20;
        var total = 20;
        var selStudio = $('#SelNStu :selected').val();
        console.log(datecre,dateedate,datesdat);
        if(selStudio == 'Xin hãy chọn một studio .....'){
            alert("Hãy chọn Studio");
        }else {check20 =1;}
        if(name == ''){
            resultname.text("Không được để trống");
            resultname.css("color", "red");
        }else {check1=1;}
        if(phone == ''){
            resultphone.text("Không được để trống");
            resultphone.css("color", "red");
        }else {check2=1;}
        if(email == ''){
            resultemail.text("Không được để trống");
            resultemail.css("color", "red");
        }else {check3=1}
        if(credate==''){
            $resultcre.text("Không được để trống");
            $resultcre.css("color", "red");
        }else {check4=1}
        if(sdate==''){
            $resultsdate.text("Không được để trống");
            $resultsdate.css("color", "red");
        }else {check5=1;}
        if(edate==''){
            $resultedate.text("Không được để trống");
            $resultedate.css("color", "red");
        }else {check6=1;}
        if(checkname.test(name) == false){
            resultname.text("Tên không được có ký tự đặc biệt");
            resultname.css("color", "red");
        }else {check7=1;}
        if(reg_mail.test(email) == false){
            resultemail.text("Email không hợp lệ (ví dụ: abc@gmail.com)");
            resultemail.css("color", "red");
        }else {check8=1;}
        if(isNaN(phone) == true && phone != ''){
            resultphone.text("Số Điện Thoại phải là số");
            resultphone.css("color", "red");
        }else {check9=1;}
        if(isNaN(phone) == false && (phone.length < 8 || phone.length > 12)){
            resultphone.text("Số Điện Thoại phải từ 8 đến 12 số");
            resultphone.css("color", "red");
        }else {check10=1;}
        if(datecre > datesdat && datecre < dateedate){
            $resultcre.text("Ngày lập nên phải nhỏ hơn hoặc bằng ngày bắt đầu");
            $resultcre.css("color", "red");
            }else {check11=1;}
        if(datecre > dateedate && datecre < datecre){
            $resultcre.text("Ngày lập nên phải nhỏ hơn ngày kết thúc");
            $resultcre.css("color", "red");
        }else {check12=1;}
        if(datecre > dateedate && datecre > datecre){
            $resultcre.text("Ngày lập nên phải nhỏ hơn ngày bắt đầu và kết thúc ");
            $resultcre.css("color", "red");
        }else {check13=1;}
        if(datesdat < datecre && datesdat < dateedate){
            $resultsdate.text("Ngày bắt đầu phải lớn hơn hoặc bằng ngày lập nên");
            $resultsdate.css("color", "red");
        }else {check14=1;}
        if(datesdat > dateedate && datesdat > datecre){
            $resultsdate.text("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
            $resultsdate.css("color", "red");
        }else {check15=1;}
        if(datesdat > dateedate && datesdat < datecre){
            $resultsdate.text("Ngày bắt đầu phải lớn hơn ngày tạo và nhỏ hơn ngày kết thúc");
            $resultsdate.css("color", "red");
        }else {check16=1;}
        if(dateedate < datecre && dateedate > datesdat){
            $resultedate.text("Ngày kết thúc phải lớn hơn ngày lập nên");
            $resultedate.css("color", "red");
        }else {check17=1;}
        if(dateedate < datesdat && dateedate > datecre){
            $resultedate.text("Ngày kết thúc phải lớn hơn ngày bắt đầu");
            $resultedate.css("color", "red");
        }else {check18=1;}
        if(dateedate < datesdat && dateedate < datecre){
            $resultedate.text("Ngày kết thúc phải lớn hơn ngày bắt đầu và lập nên");
            $resultedate.css("color", "red");
        }else {check19=1;}
        if(total==(check1+check2+check3+check4+check5+check6+check7+check8+check9+check10+check11+check12+check13+check14+check15+check16+check17+check18+check19+check20)){
            //valid1();
            if (type == 'add') {
                if (document.getElementById("exist").checked == true) {
                    var cusname = addform.find("input[name='newCusName']").val();
                    var phone = addform.find("input[name='newCusPhone']").val();
                    $.ajax({
                        url: `/GetCustomerByName?name=${cusname}&number=${phone}`,
                        method: 'get',
                        contentType: 'application/json',
                    }).always(function (res) {
                        console.log(res);
                        var cusid = res.data[0].Customer_ID;
                        AddCon(res.data, addform);
                        //ADD Contract
                    })
                } else {
                    var newNames = addform.find("input[name='newCusName']").val();
                    var newGender = addform.find("input[name='gender']").val();
                    var newAddress = addform.find("textarea[name='newCusAdd']").val();
                    var newEmail = addform.find("input[name='newCusEmail']").val();
                    var newNumber = addform.find("input[name='newCusPhone']").val();
                    var newNote = addform.find("input[name='newCusNote']").val();

                    console.log(newNames,newGender,newAddress,newEmail,newNumber,newNote);
                    //e.preventDefault();
                    $.ajax({
                        url: '/AddIcustomer',
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            newNames: newNames,
                            newGender: newGender,
                            newAddress:newAddress,
                            newEmail: newEmail,
                            newNumber: newNumber,
                            newNote: newNote,

                        })
                    }).always(function (res) {

                        var code = res.code;
                        var success = res.success || 'Thêm khách hàng lỗi!';
                        //window.location.href="http://localhost:5000/icustomer.html"
                        if (code == 200) {
                            alert("Thêm khách hàng thành công");
                            AddCon(res.data, addform);
                        } else {
                            alert(success);
                        }
                    })
                    //ADD new customer --> ADD new Contract --> ADD new ConDetail
                }
            } else if (type == 'edit') {
                document.getElementById("exist").style.display == 'none'
                var newName = addform.find("input[name='newCusName']").val();
                var newGende = addform.find("input[name='gender']").val();
                var newAdre = addform.find("textarea[name='newCusAdd']").val();
                //  var idDistrict = $('#districts :selected').val();
                var newEmails = addform.find("input[name='newCusEmail']").val();
                var newNum = addform.find("input[name='newCusPhone']").val();
                var newNot = addform.find("input[name='newCusNote']").val();
                // var newCoor = editForm.find("input[name='newPCoordinates']").val();
                console.log(CusID,newName,newGende,newAdre,newEmails,newNum,newNot);
                //e.preventDefault();
                $.ajax({
                    url: '/EditIcustomer',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        ids : CusID,
                        cusname: newName,
                        gender: newGende,
                        address:newAdre,
                        email: newEmails,
                        number: newNum,
                        note: newNot,
                    })
                }).always(function (res) {
                    var code = res.code;
                    var success = res.success || 'Chỉnh Sửa khách hàng lỗi!';
                    //window.location.href="http://localhost:5000/icustomer.html"
                    if (code == 200) {
                        alert("Chỉnh Sửa khách hàng thành công");
                        EditCon(CusID);
                    } else {
                        alert(success);
                    }
                })
                //EDIT Customer --> EDIT Contract --> EDIT ConDetail
            }
        }

        return false;
    }

    var register = document.getElementById('btn-Add');
    console.log(register);
    register.onclick = function(){

        return validate();

    }

})