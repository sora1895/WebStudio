//b1: bat event submit form >> lay data tu form ra (email, password)
//b2: request post data len api /login de kiem tra login fail hay ko
//b3: doc response tra ve tu request 
//b4: xu ly + in ra cho nguoi dung

$(document).ready(function () {
    // form submit
    var form = $('#dismanage');
    var showDat = $('#showDat').find('tbody');
    var ProNum = $('#DisNum');
    var listA = document.getElementsByName("listall");
    var insert = document.getElementsByName("add");
    var del = document.getElementsByName("del");
    var addform = $('#addDis');
    var main = $('#main');

    //b1
    form.submit(function (e) {
        e.preventDefault();
        ProNum.empty();

        var province = form.find("select[name='province']").val();

        $.ajax({
            url: `/dismanage?provinceId=${province}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })

    })

    // render select options from database

    $.ajax({
        url: '/getProvince',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    })

    
    var renderOptions = function (options) {
        console.log("aaa");
        var selectTag = $("#SelDis");
        var selectTag2 = $("#SelNDis");
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Province_Name;
            var id = options[i].Province_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            optionTag2 = $(`<option value='${id}'>${name}</option>`);

            selectTag.append(optionTag);
            selectTag2.append(optionTag2);
        }
    }

    var show = function (res) {
        main.show();
        showDat.empty();
        //b4
        //b4.1: co response
        console.log(res);
        //b4.2: check response hop le hay ko
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                //b4.3: boc tach response
                var districtID = d.District_ID;
                var districtName = d.District_Name;
                //b4.4: tu response render tr
                var tr = $(`<tr>
                        <td>${districtID}</td>
                        <td><a href="disdetail.html?districtId=${districtID}?districtName=${districtName}">${districtName}</a></td>
                    </tr>`);
                //b4.5: append tr vao table
                showDat.append(tr);
                count++;
            }
            var ProCount = count;
            ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    /*listA[0].onclick = function () {
        ProNum.empty();
        $.ajax({
            url: '/showAll',//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            show(res);
        })
    }*/

    

    

    addform.submit(function (e) {

        var province = addform.find("select[name='nprovince']").val();
        var district = addform.find("input[name='district']").val();
        console.log(district, province);
        $.ajax({
            url: '/addDis',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                district: district,
                province_id: province,
            })
            
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/dismanage.html";
            if (code == 200) {
                alert("Successful");
            } else {
                alert(success);
            }
        })
    })


})

