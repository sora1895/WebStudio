
$(document).ready(function () {

    var DisName = $('#name');
    var StuNum = $('#StuNum');
    var form = $('#disdetail');
    //var newDisName = $('#newDisName');
    //var change = document.getElementsByName("change");

    var showDat = $('#showDat').find('tbody');
    DisName.empty();

    var x = document.URL;
    var idloc = x.search("districtId=");
    var nameloc = x.search("districtName=");

    var id = x.substr(idloc + 11);
    var id1 = x.substr(idloc + 11, nameloc - idloc - 12);
    var name = decodeURIComponent(x.substr(nameloc + 13));
    console.log(id1);
    console.log(id);
    console.log(name);
    DisName.append(name);
    form.find('#district').val(name);



    $.ajax({
        url: `/getDis?districtId=${id}`,
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        
        showDat.empty();
        StuNum.empty();
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var StudioID = d.Studio_ID;
                var districtID = d.District_ID;
                var StudioName = d.Studio_Name;
                var StudioAdd = d.Studio_Address
                var StudioMail = d.Studio_Email
                var StudioNum = d.Studio_Number
                var tr = $(`<tr>
                    <td>${StudioID}</td>
                    <td>${districtID}</td>
                    <td>${StudioName}</td>
                    <td>${StudioAdd}</td>
                    <td>${StudioMail}</td>
                    <td>${StudioNum}</td>
                </tr>`);
                showDat.append(tr);
                count++;
            }
            var StuCount = count;
            StuNum.append("Các Studio tìm thấy trong khu vực: " + StuCount);
        }
        else {
            alert("Không có Studio nào trong khu vực này")
        }
    })


    form.submit(function (e) {
        e.preventDefault();
        var district = form.find("input[name='district']").val();
        console.log(district, id1);

        $.ajax({
            url: '/EditDis',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newName: district,
                id: id1,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/disdetail.html?districtId=" + id1 + "?districtName=" + district + "";
            } else {
                alert(success);
            }
        })
    })

    $('#del').click(function () {
        if (confirm('Bạn có muốn xóa Quận/Huyện này?')) {
            $.ajax({
                url: '/delDis',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    district: id1,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Xóa bị lỗi!';
                //listA[0].onclick();
                if (code == 200) {
                    alert("Xóa thành công");
                } else {
                    alert(success);
                }
            })
        }
        
    })
})