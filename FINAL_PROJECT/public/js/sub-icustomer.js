$(document).ready(function () {
    // var Cusids = $('#Cusids');
    var cusnames = $('#names');
    var cusgenders = $('#genders');
    var cusaddresss = $('#addresss');

    var cusemails = $('#emails');
    var cusnumbers = $('#phone');
    var cusnotes = $('#notes');

    var CusDetail = $('#CusDetail');
    //var MatPrice = $('#MatPrice');
    var MainName = $('#MainName');
    var delform = $('#delform');
    CusDetail.empty();
    var form = $('#customerdetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    MainName.append("Customer " + name);


    $.ajax({
        url: `/GetIcustomerByID`,
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            cusid : id1,
            stuid : localStorage.getItem('UserStudioId')
        })
    }).always(function (res) {
        show(res);
    })

    var show = function (res) {
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            cusnames.append(res.data[0].Customer_Name);
            cusgenders.append(res.data[0].Customer_Gender);
            cusaddresss.append(res.data[0].Customer_Address);
            cusemails.append(res.data[0].Customer_Email);
            cusnumbers.append(res.data[0].Customer_Number);
            cusnotes.append(res.data[0].Customer_Note);
            $('#other').append(res.data[0].Customer_Other);

            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var CustomerID = d.Customer_ID;
                var CustomerName = d.Customer_Name;
                var CustomerGender = d.Customer_Gender;
                var CustomerAddress = d.Customer_Address;
                var CustomerEmail = d.Customer_Email;
                var CustomerNumber = d.Customer_Number;
                var other = d.Customer_Other
                var CustomerNote = d.Customer_Note;

                var state =d.Contract_State;
                //Cusids.append(CustomerID);
                if(state=='Chưa thanh toán'){
                    var sql = `<td style="color:red">${state}</td>`
                }else if(state=='Đã thanh toán'){
                    var sql = `<td style="color:green">${state}</td>`
                }else if(state=='Đợi ảnh'){
                    var sql = `<td style="color:#5bc0de">${state}</td>`
                }else if(state=='Hoàn thành'){
                    var sql = `<td style="color:green">${state}</td>`
                }

                var tr = $(`<tr><td>${d.Contract_ID}</td>
                <td>${d.Contract_Description}</td>
                <td>${d.Contract_cDate}</td>
                <td>${d.Contract_sDate}</td>
                <td>${d.Contract_eDate}</td>
                `+sql+`
                </tr>`)

                $('#showDat').append(tr);

                count++;
            }



            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    /*$.ajax({
        url: '/GETProvinces',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    })*/

    /*
        var renderOptions = function (options) {
            console.log("ok");
            var selectTag = $("#province");
            for (var i = 0; i < options.length; i++) {
                var name = options[i].Province_Name;
                var id = options[i].Province_ID;
                //create optionTag from database
                var optionTag = null;
                optionTag = $(`<option value='${id}'>${name}</option>`);
    
                selectTag.append(optionTag);
            }
        }*/

    //change district when privince change
    /*
    $("#province").change(function(){
        var id = $(this).val();
        console.log(id);
        $.ajax({
            url: '/GetDitsrictByIdProvince',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                idProvince: id,
            })
        }).always(function (res) {
            console.log(res);
            var options = res.data;//TODO
            console.log("ngon");
            var selectTag = $("#district");
            selectTag.empty();
            for (var i = 0; i < options.length; i++) {
                var name = options[i].District_Name;
                var id = options[i].District_ID;
                //create optionTag from database
                var optionTag = null;
                optionTag = $(`<option value='${id}'>${name}</option>`);

                selectTag.append(optionTag);
            }
        })
    })
*/

    form.submit(function (e) {
        e.preventDefault();
        var cusname = form.find("input[name='cusname']").val();
        var address = form.find("input[name='address']").val();
        var gender = form.find("input[name='gender']").val();

        var email = form.find("input[name='email']").val();
        var number = form.find("input[name='number']").val();
        var note = form.find("input[name='note']").val();
        /*var price = form.find("input[name='price']").val();*/
        console.log(id1, cusname, address, gender, email, number, note);

        $.ajax({
            url: '/EditIcustomer',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                ids: id1,
                cusname: cusname,
                address: address,
                gender: gender,
                email: email,
                number: number,
                note: note,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/icustomerdetail.html?id=" + id1 + "?name=" + cusname + "";
            } else {
                alert(success);
            }
        })
    })

    delform.submit(function (e) {

        $.ajax({
            url: '/DelIcustomer',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                delid: id1,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Delete when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href = "http://localhost:5000/customer.html";
            } else {
                alert(success);
            }
        })
    })
})