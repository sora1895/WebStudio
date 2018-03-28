$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');
    var form = $('#searchForm');
    var addform = $('#addForm');
    var ConNum = $('#ConNum');
    var showAdd = $('#showAdd');
    var editForm =$('#editForm');
    var conname = $('#conname');
    var Addnew = $('#Addnew');
    var newCDDetail = $('#newCDDetail');
    var PakPrice = $('#PakPrice');
    var SelNPak = $('#SelNPak');
    var VatPrice = $('#VatPrice');
    var total = $('#total');
    var SelNStu = $('#SelNStu'); 
    var ConDeItem =$('#ConDeItem');


    var ConID;

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
        
        //addform.show();
        //ConDeItem.show();
        Addnew.show();
        document.getElementById("editForm").style.display='none';
    }

    form.submit(function (e) {
        e.preventDefault();
        var type = form.find("select[id='type']").val();
        var key = form.find("input[name='key']").val();
        console.log(type,key);
        $.ajax({
            url: `/GetNumCon`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                key: key,
                type: type,
            })
        }).always(function (res) {
            show(res);
        })
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

    var renderPackage = function (options) {
        console.log("aaa");
        var selectTag = $("#SelNPak");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].Package_ID;
            var name = options[i].Package_Name;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option>${name}</option>`);
            selectTag.append(optionTag);
        }
    }

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

    

    SelNStu.change(function(){
        SelNPak.empty();
        var tr="<option>Please select a Package ..... </option>";
        SelNPak.append(tr);
        console.log(SelNStu.val());
        $.ajax({
            url: `/GetPackByStuId?id=${SelNStu.val()}`,//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            console.log(res);
            var options = res.data;//TODO
            renderPackage(options);
        })
    })

    SelNPak.change(function(){
        
        console.log(SelNPak.val());
        $.ajax({
            url: `/GetPackByName`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                PackName:SelNPak.val(),
            })
        }).always(function (res) {
            newCDDetail.empty();
            newCDDetail.append( res.data[0].Package_Detail);
            PakPrice.empty();
            var price= res.data[0].Package_Price;
            PakPrice.append("Giá trước VAT: "+ price.toLocaleString( 'en-US')+" vnd");
            VatPrice.empty();
            var vat = price*0.1;
            VatPrice.append("Giá VAT: "+ vat.toLocaleString( 'en-US')+" vnd");
            total.empty();
            var Total = price + vat;
            total.append("Tổng giá tiền: "+Total.toLocaleString( 'en-US')+" vnd");
        })
    })

    var show = function (res) {
        console.log(res);
        ConNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            function bindToEditForm(data = {}) {
                ConID = data.Contract_ID;
                conname.empty();
                editForm.show();
                document.getElementById("addForm").style.display='none';
                conname.append("Edit Contract #"+ConID);
                editForm.find('#newEDes').val(data.Contract_Description);
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
                var ContractDescription = d.Contract_Description;
                var cDate = new Date(d.Contract_cDate);
                var sDate = new Date(d.Contract_sDate);
                var eDate = new Date(d.Contract_eDate);
                var CreateDate =days[cDate.getDay()]+' '+cDate.getDate()+'/'+(cDate.getMonth()+1)+'/'+cDate.getFullYear();
                var StartDate =days[sDate.getDay()]+' '+sDate.getDate()+'/'+(sDate.getMonth()+1)+'/'+sDate.getFullYear();
                var EndDate = days[eDate.getDay()]+' '+eDate.getDate()+'/'+(eDate.getMonth()+1)+'/'+eDate.getFullYear();

                var tr = $(`<tr>
                    <td><a href="contractdetail.html?id=${ContractID}?Customer=${Customername}">${ContractID}</a></td>
                    <td>${Customername}</td>
                    <td>${StudioName}</td>
                    <td>${ContractDescription}</td>
                    <td>${CreateDate}</td>
                    <td>${StartDate}</td>
                    <td>${EndDate}</td>
                </tr>`);

                var editButton = $(`<td><button>Edit</button></td>`);
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
            ConNum.append("Number of Contract found: " + count);

        }
        else {
            alert("????")
        }
    }
    
    

    addform.submit(function (e) {
        e.preventDefault();
        //ADD Customer
        var cusid
        if(document.getElementById("exist").checked == true){
            var cusname = addform.find("input[name='newCusName']").val();
            $.ajax({
                url: `/GetCustomerByName?name=${cusname}`,
                method: 'get',
                contentType: 'application/json', 
            }).always(function (res) {

                if (code == 200) {
                    console.log(res);
                    cusid = res.data[0].Customer_ID; 
                } else {
                    alert(success);
                }
            })
        }

        

        //ADD Contract
        //var cusid = addform.find("select[id='SelNCus']").val();
        var stuid = addform.find("select[id='SelNStu']").val();
        var newCDes = addform.find("input[name='newCDes']").val();
        var newCdate = addform.find("input[name='newCdate']").val();
        var newSdate = addform.find("input[name='newSdate']").val();
        var newEdate = addform.find("input[name='newEdate']").val();
        console.log(cusid,stuid,newCDes, newCdate,newSdate, newEdate);
        
            $.ajax({
                url: '/AddContract',
                method: 'post',
                contentType: 'application/json', 
                data: JSON.stringify({
                    cusid:cusid,
                    stuid:stuid,
                    newCDes: newCDes,
                    sdate: newSdate,
                    edate: newEdate,
                    cdate: newCdate,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';

                if (code == 200) {
                    alert("Insert Contract Successful");
                    //window.location.href = "http://localhost:5000/contract.html";
                } else {
                    alert(success);
                }
            })
        

        //ADD Contract Detail
    })

    editForm.submit(function (e) {

        var cusid = editForm.find("select[id='SelECon']").val();
        var stuid = editForm.find("select[id='SelEStu']").val();
        var newCDes = editForm.find("input[name='newEDes']").val();
        var newCdate = editForm.find("input[name='newEcDate']").val();
        var newSdate = editForm.find("input[name='newEsDate']").val();
        var newEdate = editForm.find("input[name='newEeDate']").val();
        console.log(cusid,stuid,newCDes, newCdate,newSdate, newEdate);
        
        $.ajax({
            url: `/EditContract`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid:ConID,
                cusid:cusid,
                stuid:stuid,
                newCDes: newCDes,
                sdate: newSdate,
                edate: newEdate,
                cdate: newCdate,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");window.location.href = "http://localhost:5000/contract.html";
            } else {
                alert(success);
            }
        })


    })


})