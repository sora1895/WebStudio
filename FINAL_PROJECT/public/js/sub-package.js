$(document).ready(function () {
    var PakName = $('#PakName');
    var pakname = $('#pakname');
    var PakDetail = $('#PakDetail');
    var PakPrice = $('#PakPrice');
    var MainName = $('#MainName');
    var delForm = $('#packDel');
    PakName.empty();
    MainName.empty();
    var form = $('#packdetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    PakName.append(name);
    MainName.append(name);
    pakname.append(name);

    delForm.submit(function (e) {
        if (confirm('You want to delete this data?')) {
            $.ajax({
                url: '/delPack',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    PakId: id1,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Delete when wrong!';
                window.location.href = "http://localhost:5000/package.html";
                if (code == 200) {
                    alert("Delete Successful");
                } else {
                    alert(success);
                }
            })
        }
    })

    $.ajax({
        url: '/GetPackByName',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            PackName: name,
        })
    }).always(function (res) {
        PakDetail.empty();
        PakPrice.empty();
        PakDetail.append(res.data[0].Package_Detail);
        PakPrice.append(res.data[0].Package_Price);
        form.find('#package').val(res.data[0].Package_Name);
        form.find('#detail').val(res.data[0].Package_Detail);
        form.find('#price').val(res.data[0].Package_Price);
    })

    form.submit(function (e) {
        e.preventDefault();
        var package = form.find("input[name='package']").val();
        var detail = form.find("input[name='detail']").val();
        var price = form.find("input[name='price']").val();
        console.log(package, id1, detail, price);

        $.ajax({
            url: '/EditPack',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newName: package,
                id: id1,
                newPrice: price,
                newDetail: detail,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/packdetail.html?id=" + id1 + "?name=" + package + "";
            } else {
                alert(success);
            }
        })
    })
})