$(document).ready(function () {
    var showDatHead = $('#showDat').find('thead');
    var showDat = $('#showDat').find('tbody');
    var main = $('#main');
    var form = $('#searchForm');
    var addform = $('#addForm');
    var PONum = $('#PONum');
    var showAdd = $('#showAdd');
    var editForm = $('#editForm');
    var poname = $('#poname');


    var POID;

    var showData = function () {
        $.ajax({
            url: '/getPOrder',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }

    showAdd[0].onclick = function () {
        addform.show();
        editForm.hide();
    }


    form.submit(function (e) {
        e.preventDefault();
        var type = form.find("select[id='SelCon']").val();
        var key = form.find("input[name='key']").val();
        console.log(key, type);

        $.ajax({
            url: `/GetNumPO`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                key: key,
                type: type,
            })
        }).always(function (res) {
            show(res, type);
        })
    });



    var show = function (res, type) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        console.log(res);
        main.show();
        PONum.empty();
        showDat.empty();
        showDatHead.empty();
        var count = 0;
        var theadbonus;
        var bonuscol;
        if(type=='Customer Name'){
            theadbonus ="<td>Customer Name</td>"
        }else if (type=='Studio Name'){
            theadbonus ="<td>Studio Name</td>"
        }
        var thead = $(`<tr>
            <td>No</td>
            `+theadbonus+`
            <td>Print Order ID</td>
            <td>Contract ID</td>
            <td>Create Date</td>
            <td>Start Date</td>
            <td>End Date</td>
                    </tr>`);
        showDatHead.append(thead);
        if (res && res.data && res.data instanceof Array) {
            var count = 0;

            function bindToEditForm(data = {}) {
                editForm.find("input[name='SelNCon']").val(data.Contract_ID);
                POID = data.PrintOrder_ID;
                editForm.show();
                addform.hide();
                poname.empty();
                poname.append("Edit Print Order #" + POID);
            }
            function delRow(data = {}) {
                POID = data.PrintOrder_ID;
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/delPOrder`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            POID: POID,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            window.location.href = "order.html";
                        } else {
                            alert(success);
                        }
                    })
                }
            }

            res.data.forEach(function (d, i) {
                var Customername = d.Customer_Name;
                var PrintOrderID = d.PrintOrder_ID;
                var StudioName = d.Studio_Name;
                var ContractID = d.Contract_ID;
                var cDate = new Date(d.PrintOrder_cDate);
                var sDate = new Date(d.PrintOrder_sDate);
                var eDate = new Date(d.PrintOrder_eDate);
                var CreateDate = days[cDate.getDay()] + ' ' + cDate.getDate() + '/' + (cDate.getMonth() + 1) + '/' + cDate.getFullYear();
                var StartDate = days[sDate.getDay()] + ' ' + sDate.getDate() + '/' + (sDate.getMonth() + 1) + '/' + sDate.getFullYear();
                var EndDate = days[eDate.getDay()] + ' ' + eDate.getDate() + '/' + (eDate.getMonth() + 1) + '/' + eDate.getFullYear();

                if(type=='Customer Name'){
                    bonuscol =`<td>${Customername}</td>`
                }else if (type=='Studio Name'){
                    bonuscol =`<td>${StudioName}</td>`
                }
                var tr = $(`<tr>
                        <td>${count + 1}</td>
                        `+bonuscol+`
                        <td><a href="orderdetail.html?id=${PrintOrderID}?conid=${ContractID}">${PrintOrderID}</a></td>
                        <td><a href="contractdetail.html?id=${ContractID}?Customer=${Customername}">${ContractID}</td>
                        <td>${CreateDate}</td>
                        <td>${StartDate}</td>
                        <td>${EndDate}</td>
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
            PONum.append("Number of Order found: " + count);

        }
        else {
            PONum.append("Number of Order found: " + count);
            alert("????")
        }


    }

    addform.submit(function (e) {
        var newConId = addform.find("input[name='newConId']").val();
        var newCdate = addform.find("input[name='newCdate']").val();
        var newSdate = addform.find("input[name='newSdate']").val();
        var newEdate = addform.find("input[name='newEdate']").val();
        console.log(newConId, newCdate, newSdate, newEdate);
        e.preventDefault();
        $.ajax({
            url: '/AddPOrder',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: newConId,
                sdate: newSdate,
                edate: newEdate,
                cdate: newCdate,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';

            if (code == 200) {
                alert("Insert Successful");
                window.location.href = "order.html";
            } else {
                alert(success);
            }
        })

    })

    editForm.submit(function (e) {

        var conid = editForm.find("input[name='SelNCon']").val();
        var cDate = editForm.find("input[name='newcDate']").val();
        var sDate = editForm.find("input[name='newsDate']").val();
        var eDate = editForm.find("input[name='neweDate']").val();
        console.log(POID, conid, cDate, sDate, eDate);

        $.ajax({
            url: `/EditPOrder`,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: conid,
                id: POID,
                newSdate: sDate,
                newCdate: cDate,
                newEdate: eDate,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful"); window.location.href = "order.html";
            } else {
                alert(success);
            }
        })


    })


})