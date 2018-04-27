$(document).ready(function () {
    var PakName = $('#PakName');
    var PakName2 = $('#PakName2');
    var pakname = $('#pakname');
    var PakDetail = $('#PakDetail');
    var PakPrice = $('#PakPrice');
    var MainName = $('#MainName');
    PakName.empty();
    MainName.empty();
    var form = $('#packdetail');

    var x = document.URL;
    var idloc = x.search("id=");
    var nameloc = x.search("name=");
    var PackageLists =[];

    var id = x.substr(idloc + 3);
    var id1 = x.substr(idloc + 3, nameloc - idloc - 4);
    var name = decodeURIComponent(x.substr(nameloc + 5));
    console.log(id1);
    console.log(id);
    console.log(name);
    
    MainName.append(name);
    pakname.append(name);
    PakName2.append(name);


    $.ajax({
        url: '/GetStudioByID?id='+localStorage.getItem('stuid'),
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        PakName.append(res.data[0].Studio_Name);
        
    })

    $.ajax({
        url: '/GetPackByName',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            PackName: name,
            id:id1,
        })
    }).always(function (res) {
        PackageLists.push(res.data[0]);
        PakDetail.empty();
        PakPrice.empty();
        PakDetail.append(res.data[0].Package_Detail);
        PakPrice.append(res.data[0].Package_Price.toLocaleString( 'en-US')+" vnđ");
        $('.image').css("background-image",'url('+res.data[0].Package_pic+')' )
    })

    PakPrice[0].onclick= function(){
        var id =localStorage.getItem('stuid');
        localStorage.setItem("selectedStudio",id)
        localStorage.setItem('items',JSON.stringify(PackageLists))
        
        window.location.href = "checkout.html"
    }

})