$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var Mainform =$('#materialForm');
    var AddForm =$('#addForm')
    var showAdd = $('#showAdd');
    var showDel = $('#showDel');
    $.ajax({
        url: '/getPMaterial',
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        show(res);
    })

    var show = function (res) {
        console.log(res);
        //PackNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var MaterialID = d.Material_ID;
                var MaterialName = d.Material_Name;
                var MaterialDetail = d.Material_Detail;
                var MaterialPrice = d.Material_Price;

                var tr = $(`<tr>
                    <td>${MaterialID}</td>
                    <td><a href="materialdetail.html?id=${MaterialID}?name=${MaterialName}">${MaterialName}</a></td>
                    <td>${MaterialDetail}</td>
                    <td>${MaterialPrice}</td>
                </tr>`);
                showDat.append(tr);
                count++;
            }
            //PackNum.append("Number of Packages found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    Mainform.submit(function(e){
        e.preventDefault();
        var MaterialName = Mainform.find("input[name='material']").val();
        console.log(MaterialName);
        $.ajax({
            url: `/GetMaterialByName?name=${MaterialName}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    })

    showAdd[0].onclick = function(){
        document.getElementById("Add").style.display = 'block';
        document.getElementById("Add").disabled = false;
        //Add.disabled=false;
        document.getElementById("Del").style.display = 'none';
        document.getElementById("Del").disabled = true;
        //Del.disabled=true;
        document.getElementById("newPMName").disabled = false;
        document.getElementById("newPMDetail").disabled = false;
        document.getElementById("newPMPrice").disabled = false;
        //Add.style.display = 'block';
    }

    showDel[0].onclick = function () {
        document.getElementById("Add").style.display = 'none';
        document.getElementById("Add").disabled = true;
        //Add.disabled=true;
        document.getElementById("Del").style.display = 'block';
        document.getElementById("Del").disabled = false;
        //Del.disabled=false;
        document.getElementById("newPMName").disabled = false;
        document.getElementById("newPMDetail").disabled = true;
        document.getElementById("newPMPrice").disabled = true;
    }


    AddForm.submit(function (e) {
        var newName = AddForm.find("input[name='newPMName']").val();
        var newDetail = AddForm.find("input[name='newPMDetail']").val();
        var newPrice = AddForm.find("input[name='newPMPrice']").val();
        console.log(newName, newDetail, newPrice);
        e.preventDefault();
        if (document.getElementById("Add").disabled == false) {
            $.ajax({
                url: '/AddMaterial',
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
                url: `/GetMaterialIdByName?newName=${newName}`,
                method: 'get',
                contentType: 'application/json',
            }).always(function (res) {
                $.ajax({
                    url: '/delMaterial',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        MatId: res.data[0].Material_ID,
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
})