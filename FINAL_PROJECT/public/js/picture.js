$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');
    var showDatHead = $('#showDat').find('thead');
    var table = $('#showDat');
    var main = $('#main');
    //form 1
    var picForm = $('#picForm');
    var PicNum = $('#PicNum');
    var showAdd = $('#showAdd');
    //var showAll = $('#showAll');

    //form 2
    var AddForm = $('#addForm');
    var Add = $('#Add');

    picForm.submit(function (e) {
        e.preventDefault();
        var type = picForm.find("select[id='SelType']").val();
        var key = picForm.find("input[name='key']").val();
        console.log(type, key);

        $.ajax({
            url: `/GetNumPic`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                stuid: localStorage.getItem("UserStudioId"),
                key: key,
                type: type,
            })
        }).always(function (res) {
            var code = res.code;
            if(code!=200){
                alert('Không tìm thấy');
            }
            if (res.data[0].Contract_ID != null || res.data[0].PrintOrder_ID != null || res.data[0].Customer_Name != null || res.data[0].Studio_Name != null) {
                show(res, type);
            } else alert('???');
        })

    });

    var show = function (res, type) {
        console.log(res);
        PicNum.empty();
        showDat.empty();
        showDatHead.empty();
        main.show();
        var count = 0;
        var theadbonus;
        var bonuscol;
        if (type == 'Customer Name') {
            theadbonus = "<th>Tên khách hàng</th>"
        } else if (type == 'Studio Name') {
            theadbonus = "<th>Tên Studio</th>"
        } else if (type == 'Print Order ID') {
            theadbonus = "<th></th>"
        }

        var thead = $(`<tr>
                        <th>STT</th>
                        `+ theadbonus + `
                        <th>ID hợp đồng</th>
                        <th>ID chi tiết hợp đồng</th>
                        <th>#</th>
                    </tr>`);
        showDatHead.append(thead);
        if (res && res.data && res.data instanceof Array) {

            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var ConDetailID = d.ConDetail_ID;
                var CustomerID = d.Customer_ID;
                var Customername = d.Customer_Name;
                if (type == 'Customer Name') {
                    bonuscol = `<td>${Customername}</td>`;
                } else if (type == 'Studio Name') {
                    var StudioName = d.Studio_Name;
                    var StudioID = d.Studio_ID;
                    bonuscol = `<td><a href="StudioDetail.html?id=${StudioID}?name=${StudioName}">${StudioName}</a></td>`;
                } else if (type == 'Print Order ID') {
                    var PrintOrderID = d.PrintOrder_ID;
                    bonuscol = `<td><a href="orderdetail.html?id=${PrintOrderID}?conid=${ContractID}">${PrintOrderID}</a></td>`;
                }

                var tr = $(`<tr>
                        <td>${count + 1}</td>
                        `+ bonuscol + `
                        <td>${ContractID}</td>
                        <td>${ConDetailID}</td>
                    </tr>`);
                var viewButton = $(`<td><button style="color:white">Xem ảnh</button></td>`);
                viewButton.click(function (e) {
                    localStorage.setItem('condeid',ConDetailID);
                    window.location.href = `viewpicture.html?condeid=${ConDetailID}`;
                });
                tr.append(viewButton);
                showDat.append(tr);
                count++;

            })
            PicNum.append("Số hợp đồng tìm đươc ảnh: " + count);
            $('#showDat').DataTable();
        } else {
            PicNum.append("Số hợp đồng tìm đươc ảnh: " + count);
            alert("Không tìm thấy");
        }

    }

    showAdd[0].onclick = function () {
        document.getElementById("addForm").style.display = 'block';
    }

    $.ajax({
        url: '/GetConDetail',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            code: 0,
        })
    }).always(function (res) {
        console.log(res);
        var options = res.data;
        renderConDeOptions(options);
    })

    var renderConDeOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelCD");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].ConDetail_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${id}</option>`);
            selectTag.append(optionTag);
        }
    }



    AddForm.submit(function (e) {
        e.preventDefault();
        var ConId = AddForm.find("select[id='SelCD']").val();
        var newDetial = AddForm.find("input[name='newPDetail']").val();
        var newURL = AddForm.find("input[name='newPURL']").val();
        console.log(newDetial, newURL);
        e.preventDefault();
        $.ajax({
            url: '/AddPicture',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                url: newURL,
                id: ConId,
                detail: newDetial,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href = "picture.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })



    })
})