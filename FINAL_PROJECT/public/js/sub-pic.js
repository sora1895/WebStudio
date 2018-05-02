$(document).ready(function () {
    var PicDet = $('#PicDet');
    var PicConDe = $('#PicConDe');
    var PicUrl = $('#PicUrl');
    var MainName = $('#MainName');
    var delForm = $('#pictureDel');
    PicDet.empty();
    MainName.empty();
    var form = $('#picturedetail');
    var href = $('#href');
    PicConDe.empty();
    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3);
    var id2 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    var name=localStorage.getItem('picname');
    

    $.ajax({
        url: '/GetConDetail',
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        console.log(res);
        var options = res.data;
        renderConDeOptions(options);
    })

    var renderConDeOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelCD");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].ConDetail_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${id}</option>`);
            selectTag.append(optionTag);
        }
    }

    $.ajax({
        url: '/GetPictureByName',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            key: name,
            id: id1,
        })
    }).always(function (res) {
        console.log(res)
        PicDet.append(name);
        MainName.append(name);
        PicConDe.append(id1);
        document.getElementById("PicUrl").src = res.data[0].Picture_Url;
        document.getElementById("href").href = res.data[0].Picture_Url;
        form.find('#url').val(res.data[0].Picture_Url);
        form.find('#detail').val(res.data[0].Picture_Detail);
    })

    delForm.submit(function (e) {

        if (confirm('Bạn có muốn xóa?')) {
            $.ajax({
                url: '/delPicture',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: localStorage.getItem('picid'),
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Xóa bị lỗi!';
                if (code == 200) {
                    alert("Xóa thành công");
                    window.location.href = "viewpicture.html?condeid="+id+"";
                } else {
                    alert(success);
                }
            })
        }
    })

    form.submit(function (e) {
        e.preventDefault();
        var conid = form.find("select[id='SelCD']").val();
        var detail = form.find("input[name='detail']").val();
        var url = form.find("input[name='url']").val();
        console.log(detail, url);

        $.ajax({
            url: '/EditPicture',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                id: localStorage.getItem('picid'),
                detail: detail,
                url: url,
                conid:conid,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Cập nhật bị lỗi!';
            if (code == 200) {
                alert("Cập nhật thành công");
                window.location.href = "viewpicture.html?condeid="+id+"";
            } else {
                alert(success);
            }
        })
    })


})