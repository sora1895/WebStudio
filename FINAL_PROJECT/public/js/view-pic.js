$(document).ready(function () {
    var modal = document.getElementById('myModal');
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var span = document.getElementsByClassName("close")[0];
    
    var main = $('#main');
    var picForm = $('#picForm');
    var PicNum = $('#PicNum');
    var showAdd = $('#showAdd');
    //var showAll = $('#showAll');

    //form 2
    var AddForm = $('#addForm');
    var showDat = $('#showDat').find('tbody');

    var x = document.URL;
    var idloc = x.search("id=");
    var id1 = x.substr(idloc+3);
    console.log(id1);

    var showData = function () {
        $.ajax({
            url: '/getPicture?condeid='+id1,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    showData();
    var show = function (res, type) {
        console.log(res);
        PicNum.empty();
        /*showDat.empty();
        showDatHead.empty();
        main.show();*/
        var count = 0;
        
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            res.data.forEach(function (d, i) {
                var d = res.data[i];
                var PictureID = d.Picture_ID;
                var ConDetailID = d.ConDetail_ID;
                var PictureURL = d.Picture_Url;
                var PictureDetail = d.Picture_Detail;


                var tr = $(`<tr>
                    <td>${PictureID}</td>
                    <td>${ConDetailID}</td>
                    <td><a href="picdetail.html?id=${PictureID}?name=${PictureDetail}">${PictureDetail}</a></td>
                    
                </tr>`);
                var viewpic = $(`<td><img src="${PictureURL}" width="300" height="300"></td>`);
                viewpic.click ( function(e){
                    modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PictureDetail;
                })
                tr.append(viewpic);
                showDat.append(tr);
                count++;
            })
            PicNum.append("Number of Packages found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    AddForm.submit(function (e) {
        e.preventDefault();
        var ConId = AddForm.find("select[id='SelCD']").val();
        var newDetial = AddForm.find("input[name='newPDetail']").val();
        var newURL = AddForm.find("input[name='newPURL']").val();
        console.log(newDetial, newURL);
        e.preventDefault();
        $.ajax({
            url: '/AddPicture',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                url: newURL,
                id: ConId,
                detail: newDetial,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href = "picture.html?condeid="+id1;
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })
    showAdd[0].onclick = function () {
        document.getElementById("addForm").style.display = 'block';
    }
    $.ajax({
        url: '/GetConDetail',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            code: 0,
        })
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

    
    /*img.onclick = function () {
        
    }*/

    span.onclick = function () {
        modal.style.display = "none";
    }
})