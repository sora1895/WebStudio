$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');

    //form 1
    var orderDeForm = $('#orderDeForm');
    var OrderDeNum = $('#OrDeNum');
    var showAdd = $('#showAdd');
    var addname = $('#addname');
    //var showDel = $('#showDel');
    //var showAll = $('#showAll');

    //form 2
    var addForm = $('#addForm');
    var adddiv = $('#adddiv');

    var editForm = $('#editForm');
    var Add = $('#Add');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("conid=");
    var id1 = x.substr(idloc+3,nameloc-idloc-4 );
    console.log(id1);

    var oldPOE;
    var oldPIC;
    var oldMAT;
    var oldQUAN;
    var oldSIZE;
    var oldPRICE;
    var oldNOTE;

    /*showAll[0].onclick = function () {
        showData();
    }*/
    var showData = function () {
        $.ajax({
            url: `/GetOrderDetailByName`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                poId: id1,
            })
        }).always(function (res) {
            show(res);
        })
    }
    showData();

    showAdd[0].onclick = function () {
        document.getElementById("addForm").style.display = 'block';
        editForm.hide();
        addname.empty();
        addname.append("Add new Print Order Detail at #"+id1);
    }

    var show = function (res) {
        //var dat;
        //var datAt = [];
        console.log(res);
        OrderDeNum.empty();
        showDat.empty();
        dat = res.data;
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            function bindToEditForm(data = {}) {
                editForm.show();
                addForm.hide();

                editForm.find('#SelPOE').val(data.PrintOrder_ID);
                oldPOE = data.PrintOrder_ID;
                editForm.find('#SelNPic').val(data.Picture_ID);
                oldPIC = data.Picture_ID;
                editForm.find('#SelNMatOr').val(data.Material_ID);
                oldMAT = data.Material_ID;
                editForm.find('#newNOQuan').val(data.OrderDetail_Quantity);
                oldQUAN = data.OrderDetail_Quantity;
                editForm.find('#newNOSize').val(data.OrderDetail_Size);
                oldSIZE = data.OrderDetail_Size;
                editForm.find('#newNOPrice').val(data.OrderDetail_Price);
                oldPRICE = data.OrderDetail_Price;
                editForm.find('#newNONote').val(data.OrderDetail_Note);
                oldNOTE = data.OrderDetail_Note;
            }

            function delRow(data = {}) {
                oldPOE = data.PrintOrder_ID;
                oldPIC = data.Picture_ID;
                oldMAT = data.Material_ID;
                oldQUAN = data.OrderDetail_Quantity;
                oldSIZE = data.OrderDetail_Size;
                oldPRICE = data.OrderDetail_Price;
                oldNOTE = data.OrderDetail_Note;
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/delPODetail`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            oldPO: oldPOE,
                            oldMat: oldMAT,
                            oldPic: oldPIC,
                            oldQuan: oldQUAN,
                            oldSize: oldSIZE,
                            oldPrice: oldPRICE,
                            oldNote: oldNOTE,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            window.location.href = "http://localhost:5000/orderdetail.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }

            res.data.forEach(function (d, i) {
                var PrintOrderID = d.PrintOrder_ID;
                var PictureID = d.Picture_ID;
                var PictureURL = d.Picture_Url;
                var PictureDetail = d.Picture_Detail;
                var MaterialName = d.Material_Name;
                var MaterialID = d.Material_ID;
                var MaterialPriceID = d.MaterialPrice_ID;
                var OrderDeQuantity = d.OrderDetail_Quantity;
                var OrderDeSize = d.OrderDetail_Size;
                var OrderDePrice = d.OrderDetail_Price;
                var OrderDeNote = d.OrderDetail_Note;

                var tr = $(`<tr>
                    <td>${PrintOrderID}</td>
                    <td><a href="picdetail.html?id=${PictureID}?name=${PictureDetail}"><img src="${PictureURL}" width="300" height="300"></a></td>
                    <td><a href="materialdetail.html?id=${MaterialID}?name=${MaterialName}">${MaterialName}</a></td>
                    <td>${OrderDeQuantity}</td>
                    <td>${OrderDeSize}</td>
                    <td>${OrderDePrice}</td>
                    <td>${OrderDeNote}</td>
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
            OrderDeNum.append("Number of OrderDetail found: " + count);
            //console.log(dat);


        }
        else {
            alert("????")
        }
    }


    var renderPicOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelPic");
        var selectTag2 = $("#SelNPic");
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Picture_Detail;
            var id = options[i].Picture_ID;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }
    var renderPMPOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelMatOr");
        var selectTag2 = $("#SelNMatOr");

        for (var i = 0; i < options.length; i++) {
            var name = options[i].Material_Name;
            var MaterialPriceID = options[i].MaterialPrice_ID;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            optionTag = $(`<option value='${MaterialPriceID}'>${name}</option>`);
            optionTag2 = $(`<option value='${MaterialPriceID}'>${name}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }
    var renderPOOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelPO");
        var selectTag2 = $("#SelPOS");
        var selectTag3 = $("#SelPOE");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].PrintOrder_ID;
            //create optionTag from database
            var optionTag = null;
            var optionTag2 = null;
            var optionTag3 = null;
            optionTag = $(`<option value='${id}'>${id}</option>`);
            optionTag2 = $(`<option value='${id}'>${id}</option>`);
            optionTag3 = $(`<option value='${id}'>${id}</option>`);
            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
            selectTag3.append(optionTag3);
        }
    }



    $.ajax({
        url: `/GetPicture?condeid=${id1}`,//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderPicOptions(options);
    })

    $.ajax({
        url: '/GetPOrder',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderPOOptions(options);
    })

    $.ajax({
        url: '/GetPMPrice',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderPMPOptions(options);
    })




    editForm.submit(function (e) {

        var poid = editForm.find('#SelPOE').val();
        var picid = editForm.find('#SelNPic').val();
        var matid = editForm.find('#SelNMatOr').val();
        var quan = editForm.find('#newNOQuan').val();
        var size = editForm.find('#newNOSize').val();
        var price = editForm.find('#newNOPrice').val();
        var note = editForm.find('#newNONote').val();
        $.ajax({
            url: `/EditPODetail`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                oldPO: oldPOE,
                oldMat: oldMAT,
                oldPic: oldPIC,
                oldQuan: oldQUAN,
                oldSize: oldSIZE,
                oldPrice: oldPRICE,
                oldNote: oldNOTE,

                newPO: poid,
                newMat: matid,
                newPic: picid,
                newQuan: quan,
                newSize: size,
                newPrice: price,
                newNote: note
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/orderdetail.html";
            } else {
                alert(success);
            }
        })


    })


    addForm.submit(function (e) {
        e.preventDefault();
        var newPoId = addForm.find("select[id='SelPO']").val();
        var newPic = addForm.find("select[id='SelPic']").val();
        var newMatOr = addForm.find("select[id='SelMatOr']").val();
        var newPrice = addForm.find("input[name='newOPrice']").val();
        var newSize = addForm.find("input[name='newOSize']").val();
        var newQuan = addForm.find("input[name='newOQuan']").val();
        var newNote = addForm.find("input[name='newONote']").val();
        console.log(newPoId, newPic, newMatOr, newQuan, newSize, newPrice, newNote);
        e.preventDefault();
        $.ajax({
            url: '/AddOrderDetail',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                poId: newPoId,
                picId: newPic,
                mpId: newMatOr,
                price: newPrice,
                note: newNote,
                size: newSize,
                quan: newQuan,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href = "http://localhost:5000/orderdetail.html";
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })
    })



    orderDeForm.submit(function (e) {
        e.preventDefault();
        var id = orderDeForm.find("select[id='SelPOS']").val();
        var Material = orderDeForm.find("input[name='Material']").val();
        console.log(Material);
        $.ajax({
            url: `/GetOrderDetailByName`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                name: Material,
                poId: id,
            })
        }).always(function (res) {
            show(res);
        })
    });





})