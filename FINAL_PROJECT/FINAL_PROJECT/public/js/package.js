$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');

    //form 1
    var packForm = $('#packForm');
    var PackNum = $('#PackNum');
    var showAdd = $('#showAdd');
    var showDel = $('#showDel');

    //form 2
    var addForm = $('#addForm');
    var Add = $('#Add');
    var Del = $('#Del');

    showAdd[0].onclick = function () {
        document.getElementById("Add").style.display = 'block';
        document.getElementById("Add").disabled = false;
        //Add.disabled=false;
        document.getElementById("Del").style.display = 'none';
        document.getElementById("Del").disabled = null;
        //Del.disabled=true;
        document.getElementById("newPName").disabled = false;
        document.getElementById("newPDetail").disabled = false;
        document.getElementById("newPPrice").disabled = false;
        //Add.style.display = 'block';
    }

    showDel[0].onclick = function () {
        document.getElementById("Add").style.display = 'none';
        document.getElementById("Add").disabled = true;
        //Add.disabled=true;
        document.getElementById("Del").style.display = 'block';
        document.getElementById("Del").disabled = false;
        //Del.disabled=false;
        document.getElementById("newPName").disabled = false;
        document.getElementById("newPDetail").disabled = true;
        document.getElementById("newPPrice").disabled = true;
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
                PackName: PackName,
            })
        }).always(function (res) {
            show(res);
        })
    });

    var show = function (res) {
        console.log(res);
        PackNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;

                var tr = $(`<tr>
                    <td>${PackageID}</td>
                    <td><a href="packdetail.html?id=${PackageID}?name=${PackageName}">${PackageName}</a></td>
                    <td>${PackageDetail}</td>
                    <td>${PackagePrice}</td>
                </tr>`);
                showDat.append(tr);
                count++;
            }
            PackNum.append("Number of Packages found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    addForm.submit(function (e) {
        var newName = addForm.find("input[name='newPName']").val();
        var newDetail = addForm.find("input[name='newPDetail']").val();
        var newPrice = addForm.find("input[name='newPPrice']").val();
        console.log(newName, newDetail, newPrice);
        e.preventDefault();
        if (document.getElementById("Add").disabled == false) {
            $.ajax({
                url: '/AddPack',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: newName,
                    detail: newDetail,
                    price: newPrice,
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
        }
        if (document.getElementById("Del").disabled == false) {

            $.ajax({
                url: `/GetPackIdByName?newName=${newName}`,
                method: 'get',
                contentType: 'application/json',
            }).always(function (res) {
                $.ajax({
                    url: '/delPack',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        PakId: res.data[0].Package_ID,
                    })
                }).always(function (res) {
                    var code = res.code;
                    var success = res.success || 'Delete when wrong!';

                    if (code == 200) {
                        alert("Delete Successful");
                    } else {
                        alert(success);
                    }
                })
            })



        }

    })

    $.ajax({
        url: '/getPackage',
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        show(res);
    })

})