$(document).ready(function () {
    var PicDet = $('#PicDet');
    var PicConDe = $('#PicConDe');
    var PicUrl = $('#PicUrl');
    var MainName = $('#MainName');
    var delForm = $('#pictureDel');
    PicDet.empty();
    MainName.empty();
    var form = $('#picturedetail');
    PicConDe.empty();
    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    PicDet.append(name);
    MainName.append(name);

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
        url: `/GetPictureByName?name=${name}`,
        method: 'post',
        contentType: 'application/json',
    }).always(function (res) {

        PicConDe.append(res.data[0].ConDetail_ID);
        document.getElementById("PicUrl").src = res.data[0].Picture_Url;
        form.find('#url').val(res.data[0].Picture_Url);
        form.find('#detail').val(res.data[0].Picture_Detail);
    })

    delForm.submit(function (e) {
        if (confirm('You want to delete this data?')) {
            $.ajax({
                url: '/delPicture',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id1,
                })
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'Delete when wrong!';
                window.location.href = "http://localhost:5000/picture.html";
                if (code == 200) {
                    alert("Delete Successful");
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
                id: conid,
                detail: detail,
                url: url,
                id: id1
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/picdetail.html?id=" + id1 + "?name=" + detail + "";
            } else {
                alert(success);
            }
        })
    })


})