$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');

    //form 1
    var packForm = $('#packForm');
    var PackNum = $('#PackNum');
    var showAdd = $('#showAdd');
    //var showDel = $('#showDel');

    //form 2
    var addForm = $('#addForm');
    var Add = $('#Add');
    var Del = $('#Del');

    showAdd[0].onclick = function () {
        document.getElementById("addForm").style.display = 'block';
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
        
        

    })
    
    var showData = function(){
        $.ajax({
            url: '/getPackage',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
     showData();

})