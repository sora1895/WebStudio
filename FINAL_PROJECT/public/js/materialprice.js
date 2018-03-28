$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var Mainform =$('#matpriceForm');
    var AddForm =$('#addForm')
    var showAdd = $('#showAdd');
    var MatPriceNum = $('#MatPriceNum');

    var showData = function(){
        $.ajax({
            url: '/GetPMPrice',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    var show = function (res) {
        console.log(res);
        MatPriceNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var MaterialPriceID =d.MaterialPrice_ID
                var MaterialID = d.Material_ID;
                var MaterialName = d.Material_Name;
                var MaterialPriceDetail = d.MaterialPrice_Size;
                var MaterialPricePrice = d.MaterialPrice_Price;

                var tr = $(`<tr>
                    <td>${MaterialPriceID}</td>
                    <td><a href="matpricedetail.html?id=${MaterialPriceID}?name=${MaterialName}">${MaterialName}</a></td>
                    <td>${MaterialPriceDetail}</td>
                    <td>${MaterialPricePrice}</td>
                </tr>`);
                showDat.append(tr);
                count++;
            }
            MatPriceNum.append("Number of Packages found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    AddForm.submit(function (e) {
        e.preventDefault();
        var matId = AddForm.find("select[id='SelMat']").val();
        var newPrice = AddForm.find("input[name='newMPrice']").val();
        var newSize = AddForm.find("input[name='newMSize']").val();
        console.log(matId,newPrice,newSize);
        e.preventDefault();
            $.ajax({
                url: '/AddPMPrice',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    matId: matId,
                    size:newSize,
                    price: newPrice,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Insert when wrong!';
                window.location.href="http://localhost:5000/materialprice.html"
                if (code == 200) {
                    alert("Insert Successful");
                } else {
                    alert(success);
                }
            })
        
        

    })

    Mainform.submit(function (e) {
        e.preventDefault();
        var MatName = Mainform.find("input[name='materialprice']").val();
        console.log(MatName);
        $.ajax({
            url: `/GetPMPriceByName?name=${MatName}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    });

    $.ajax({
        url: '/GetPMaterial',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    }) 

    
    var renderOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelMat");
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Material_Name;
            var id = options[i].Material_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);

            selectTag.append(optionTag);
        }
    }

    showData();
    
    showAdd[0].onclick = function(){
        document.getElementById("addForm").style.display = 'block';
    }
})