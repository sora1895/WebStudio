$(document).ready(function () {
    var MatName = $('#MatName');
    var MatDetail = $('#MatDetail');
    var MatPrice = $('#MatPrice');
    var MainName =$('#MainName');
    MatName.empty();
    MainName.empty();
    var form = $('#materialdetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc+3,nameloc-idloc-4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    MatName.append(name);
    MainName.append('Material '+name);

    $.ajax({
        url: `/GetMaterialByName?name=${name}`,
        method: 'get',
        contentType: 'application/json',
    }).always(function(res){
        MatDetail.empty();
        MatPrice.empty();
        MatDetail.append(res.data[0].Material_Detail);
        MatPrice.append(res.data[0].Material_Price);
    })

    form.submit(function (e) {
        e.preventDefault();
        var package = form.find("input[name='material']").val();
        var detail = form.find("input[name='detail']").val();
        var price = form.find("input[name='price']").val();
        console.log(package, id1,detail,price);

        $.ajax({
            url: '/EditMaterial',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newName: package,
                id:id1,
                newPrice:price,
                newDetail:detail,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href="http://localhost:5000/materialdetail.html?id="+id1+"?name="+package+"";
            } else {
                alert(success);
            }
        })
    })
})