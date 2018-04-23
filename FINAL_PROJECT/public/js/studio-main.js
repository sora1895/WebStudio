$(document).ready(function () {

    //var nodemailer = require('nodemailer');

    var showDat = $('#showDat').find('tbody');
    var pricing_section = $(`#fh5co-pricing-section`);
    var showStu = $('#showStu').find('tbody');
    var total = $('#total');
    if(localStorage.getItem("items")!=[]||localStorage.getItem("items")!=''){
        var items = JSON.parse(localStorage.getItem("items"));
    }

    

    var totalPrice = 0
    //shopping carts
    var packagesBtn = $('.packages-btn');
    var packagesListDom = $(".packages-list");
    var packagesBtn = $('.packages-btn');
    var packagesList = [];
    if(items!=[]){
        
        items.forEach(function (d) {
            if(localStorage.getItem('stuid')==d.Studio_ID){
                totalPrice += d.Package_Price
                var element = $(`
                <div class="package-element" id="${d.Package_ID}">
                    <span>${d.Package_Name}</span>
                    <button class="btn btn-primary btn-lg">X</button>
                </div>
                `);
                element.find('button').click(function () {
                    total.empty();
                    totalPrice -= d.Package_Price;
                    packagesListDom.find(`[id='${d.Package_ID}']`).remove();
                    packagesList.splice(packagesList.indexOf(d), 1);
                    total.append(totalPrice.toLocaleString('en-US') + " vnđ");
                    localStorage.setItem("items", JSON.stringify(packagesList));
                })
                packagesListDom.append(element);
                packagesList = items;
            }else{

            }
            
        })
        total.append(totalPrice.toLocaleString('en-US') + " vnđ");
    }
    var bindPackageToCarts = function (package) {
        total.empty();
        if (package) {
            if (packagesListDom.find(`[id='${package.Package_ID}']`).length == 0) {
                totalPrice += package.Package_Price
                var element = $(`
                        <div class="package-element" id="${package.Package_ID}">
                            <span>${package.Package_Name}</span>
                            <button class="btn btn-primary btn-lg">X</button>
                        </div>
                    `);
                element.find('button').click(function () {
                    total.empty();
                    totalPrice -= package.Package_Price;
                    packagesListDom.find(`[id='${package.Package_ID}']`).remove();
                    packagesList.splice(packagesList.indexOf(package), 1);
                    total.append(totalPrice.toLocaleString('en-US') + " vnđ");
                    localStorage.setItem("items", JSON.stringify(packagesList));
                })
                packagesListDom.append(element);

                packagesList.push(package);
                localStorage.setItem("items", JSON.stringify(packagesList));

            }
        }
        total.append(totalPrice.toLocaleString('en-US') + " vnđ");
    }
    //

    var getPic = function(){
        $.ajax({
            url: '/GetStudioByID?id='+localStorage.getItem('stuid'),//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            showPic(res);
        })
    }
    getPic();
    var showPic = function(res){
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            res.data.forEach(function (d, i) {
                $('#fh5co-hero .slides li[style="background-image: url(images/hero3.jpg);"]').attr('background-image','url('+d.Studio_main_pic+')')
            })
        }
    }

    var showData = function () {
        $.ajax({
            url: '/GetTop3?id='+localStorage.getItem('stuid'),
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            showPackage(res);
        })
    }
    showData();

    var showPackage = function (res, type) {
        console.log(res);

        var StudioName = res.data[0].Studio_Name;
        var StudioNumber = res.data[0].Studio_Number;
        var StudioEmail = res.data[0].Studio_Email;
        var StudioAddress = res.data[0].Studio_Address;
        var StudioCoordinate = res.data[0].Studio_Coordinate;

        $('.heading-section').empty();
        $('.heading-section').append(StudioName);
        $('#con-address').append(StudioAddress);
        $('#con-phone').append(StudioNumber);
        $('#con-email').append(StudioEmail);
        $('#con-coor').href = StudioCoordinate;
        $('#con-coor').append('Google Map');
        //showStu table 
        showStu.empty();
        var container = $(`<div class='container'></div>`)
        var stutr = $(`<div class="row">
            <div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
                <i class="sl-icon-wallet"></i>
                <h2>Dịch vụ</h2>
                <p>Dịch vụ sản phẩm hoàn hảo với các gói chụp ảnh ấn tượng độc lạ đẹp và được lựa chọn nhiều nhất năm 2017. </p>
            </div>
        </div>
        `);
        container.append(stutr);
        var a = $(`<div class="row"></div> `);
        //showStu.append(stutr);
        /*showDat.empty();
        showDatHead.empty();
        main.show();*/
        var count = 0;

        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            res.data.forEach(function (d, i) {
                var d = res.data[i];
                var StudioID = d.Studio_ID;
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var PictureURL;
                count++;

                //showDat table

                //pic = `<img src="${PictureURL}" width="480">`;

                var tr = $(`<div class="col-md-4 col-sm-6">
                    <div class="price-box to-animate">
                        <h2 class="pricing-plan">Gói ${count}</h2>
                        <div class="price">
                            ${PackagePrice.toLocaleString( 'en-US')}
                            <small>vnđ</small>
                        </div>
                        <p>${PackageName}</p>
                        <hr>
                        <ul class="pricing-info">
                            <li>${PackageDetail.substr(0,200)+" ..."}</li>
                        </ul>
                        <p>
                            <a id="cart"><img src="/picture/38919-200.png" width='50px'></a><br>
                            <a href="view-pack.html?id=${StudioID}&name=${PackageName}" class="btn btn-primary">Read More</a>
                        </p>
                        </div>
                        </div>
                        `);

                tr.find('a#cart').click(function (e) {
                    bindPackageToCarts(d);
                    packagesListDom.show();
                    packagesBtn.show();
                    
                })
                
                /*var viewpic = $(pic);
                viewpic.click(function (e) {
                    modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PackageName;
                })*/
                //tr.append(viewpic);
                a.append(tr);

                
            })
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
            var btn = $('<div style="text-align:right"><a href="package-list.html"><button class="btn btn-primary">Hiện thêm gói hàng .... </button></a></div>');
            
            container.append(a);

            pricing_section.append(container);
            pricing_section.append(btn);
        }
        else {
            alert("????")
        }
    }

    //toggle packages list
    $('#btn-carts').click(function () {
        packagesListDom.toggle();
        packagesBtn.toggle();
    });

    //submit shopping carts
    packagesBtn.find(`button[name="buy"]`).click(function (e) {
        //call ajax to BuyPackage API packageList
        /*$.ajax({
            url: '/BuyPackages',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(packagesList),
        }).always(function (res) {
            console.log(res);
 
        })*/
        var id =localStorage.getItem('stuid');
        localStorage.setItem("selectedStudio",id)
        localStorage.setItem("items", JSON.stringify(packagesList));

        window.location.href = "checkout.html"
    })


    //You can then call the function with something like what i have below.

}) 