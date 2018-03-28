$(document).ready(function () {
    var MPMat = $('#MPMat');
    var MPSize = $('#MPSize');
    var MPPrice = $('#MPPrice');
    var MainName = $('#MainName');
    var delForm = $('#matpriceDel');
    MPMat.empty();
    MainName.empty();
    var form = $('#matpricedetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    //MPMat.append(name);
    MainName.append('Material: ' + name);

    $.ajax({
        url: `/GetPMPriceById?name=${id1}`,
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        MPPrice.empty();
        MPSize.empty();
        MPMat.append(res.data[0].Material_Name);
        MPPrice.append(res.data[0].MaterialPrice_Price);
        MPSize.append(res.data[0].MaterialPrice_Size);
        form.find('#SelMat').val(id1);

        form.find('#size').val(res.data[0].MaterialPrice_Size);
        form.find('#price').val(res.data[0].MaterialPrice_Price);
    })

    delForm.submit(function (e) {
        e.preventDefault();
        if (confirm('You want to delete this data?')) {
            $.ajax({
                url: '/delPMPrice',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    MatPId: id1,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Delete when wrong!';
                window.location.href = "http://localhost:5000/materialprice.html";
                if (code == 200) {
                    alert("Delete Successful");
                } else {
                    alert(success);
                }
            })
        }
        
    })

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

    form.submit(function (e) {
        e.preventDefault();

        var matId = form.find("select[id='SelMat']").val();
        var size = form.find("input[name='size']").val();
        var price = form.find("input[name='price']").val();
        var newName = '';
        console.log(matId, id1, size, price);
        $.ajax({
            url: `/GetPMPriceByMatId?name=${matId}`,//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            newName = res.data[0].Material_Name;
            console.log(newName);
            $.ajax({
                url: '/EditMPrice',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    MatId: matId,
                    id: id1,
                    newSize: size,
                    newPrice: price,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Edit when wrong!';
                if (code == 200) {
                    alert("Successful");
                    window.location.href = "http://localhost:5000/matpricedetail.html?id=" + id1 + "?name=" + newName + "";
                } else {
                    alert(success);
                }
            })
        })


    })
})