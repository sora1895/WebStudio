$(document).ready(function () {
    var Stuids = $('#Stuids');
    var stunames = $('#names');
    var stuaddresss = $('#addresss');
    var stuprovince = $('#provinces');
    var studistrict = $('#districts');
    var stuemail = $('#emails');
    var stunumber = $('#numbers');
    var stucoordinate = $('#coordinates');
    var StuDetail = $('#StuDetail');
    //var MatPrice = $('#MatPrice');
    var MainName =$('#MainName');
    var delform =$('#delform');
    StuDetail.empty();
    var form = $('#studiodetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc+3,nameloc-idloc-4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    MainName.append("Studio " + name);


    $.ajax({
        url: `/GetStudioByID?id=${id1}`,
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        show(res);
    })

    var show = function (res) {
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var StudioID = d.Studio_ID;
                var StudioName = d.Studio_Name;
                var StudioAddress = d.Studio_Address;
                var StudioEmail = d.Studio_Email;
                var StudioNumber = d.Studio_Number;
                var StudioCoordinate = d.Studio_Coordinate;
                var ProvinceName = d.Province_Name;
                var DistrictName = d.District_Name;

                Stuids.append(StudioID);
                stunames.append(StudioName);
                stuaddresss.append(StudioAddress);
                stuemail.append(StudioEmail);
                stunumber.append(StudioNumber);
                stucoordinate.append(StudioCoordinate);
                stuprovince.append(ProvinceName);
                studistrict.append(DistrictName);
                count++;
            }

            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    $.ajax({
        url: '/GETProvinces',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderOptions(options);
    })


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
    }

    //change district when privince change
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


    form.submit(function (e) {
        e.preventDefault();
        var stuname = form.find("input[name='stuname']").val();
        var address = form.find("input[name='address']").val();
        var idistrict = $('#district :selected').val();
        var email = form.find("input[name='email']").val();
        var number = form.find("input[name='number']").val();
        var coordinate = form.find("input[name='coordinate']").val();
        /*var price = form.find("input[name='price']").val();*/
        console.log(id1, stuname, address, idistrict, email, number, coordinate);

        $.ajax({
            url: '/EditStudio',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                ids:id1,
                stuname: stuname,
                address: address,
                idistrictssss: idistrict,
                email: email,
                number: number,
                coordinate: coordinate,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Edit when wrong!';
            if (code == 200) {
                alert("Successful");
                window.location.href="http://localhost:5000/StudioDetail.html?id="+id1+"?name="+stuname+"";
            } else {
                alert(success);
            }
        })
    })

    delform.submit(function(e){

        $.ajax({
            url: '/DelStudio',
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
                window.location.href="http://localhost:5000/studio.html";
            } else {
                alert(success);
            }
        })
    })
})