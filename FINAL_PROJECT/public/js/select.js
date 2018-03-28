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

    //b1
    form.submit(function (e) {
        e.preventDefault();
        ProNum.empty();

        //b2
        var province = form.find("select[name='province']").val();
        //var password = form.find("input[name='password']").val();
        //b3

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
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Province_Name;
            var id = options[i].Province_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);

            selectTag.append(optionTag);
        }
    }

    var show = function (res) {
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

    listA[0].onclick = function () {
        ProNum.empty();
        $.ajax({
            url: '/showAll',//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            show(res);
        })
    }

    

    del[0].onclick = function () {
        var district = form.find("input[name='district']").val();
        //console.log(district);
        $.ajax({
            url: `/getDisIdByName?disName=${district}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'District by name when wrong!';
            if (code == 200) {
                //alert("Successful");
                console.log(res.data);
                console.log(res.data[0]);
                $.ajax({
                    url: '/delDis',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        district: res.data[0].District_ID,
                    })
                }).always(function (res) {
                    var code = res.code;
                    var success = res.success || 'Delete when wrong!';
                    listA[0].onclick();
                    if (code == 200) {
                        alert("Successful");
                    } else {
                        alert(success);
                    }
                })
            } else {
                alert(success);
            }
        })


    }

    insert[0].onclick = function () {

        var province = form.find("select[name='province']").val();

        var district = form.find("input[name='district']").val();
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
            listA[0].onclick();
            if (code == 200) {
                alert("Successful");
            } else {
                alert(success);
            }
        })
    }


})

