$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var Mainform =$('#materialForm');
    var AddForm =$('#addForm')
    var showAdd = $('#showAdd');
    var showAll =$('#showAll');
    var MatNum = $('#MatNum');
    //var showDel = $('#showDel');
    var showData = function(){
        $.ajax({
            url: '/getPMaterial',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    
    showData();

    var show = function (res) {
        console.log(res);
        MatNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var MaterialID = d.Material_ID;
                var MaterialName = d.Material_Name;
                var MaterialDes = d.Material_Des;

                var tr = $(`<tr>
                    <td>${MaterialID}</td>
                    <td><a href="materialdetail.html?id=${MaterialID}?name=${MaterialName}">${MaterialName}</a></td>
                    <td>${MaterialDes}</td>
                </tr>`);
                showDat.append(tr);
                count++;
            }
            MatNum.append("Number of Packages found: " + count);
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
        document.getElementById("addForm").style.display = 'block';
    }



    AddForm.submit(function (e) {
        var newName = AddForm.find("input[name='newPMName']").val();
        var newDetail = AddForm.find("input[name='newPMDes']").val();
        /*var newPrice = AddForm.find("input[name='newPMPrice']").val();*/
        console.log(newName,newDetail);
        e.preventDefault();
            $.ajax({
                url: '/AddMaterial',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    name: newName,
                    detail: newDetail,
                    /*price: newPrice,*/
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';
                window.location.href="http://localhost:5000/printmaterial.html"
                if (code == 200) {
                    alert("Insert Successful");
                } else {
                    alert(success);
                }
            })
        
        

    })
})