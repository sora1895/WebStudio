
$(document).ready(function () {
    
//var nodemailer = require('nodemailer');

    var showDat = $('#showDat').find('tbody');
    var showStu = $('#showStu').find('tbody');
    var total = $('#total');

    var totalPrice =0
    //shopping carts
    var packagesListDom = $(".packages-list");
    var packagesList = [];
    var bindPackageToCarts = function(package) {
        total.empty();
        if(package) {
            if(packagesListDom.find(`[id='${package.Package_ID}']`).length == 0) {
                totalPrice += package.Package_Price
                var element = $(`
                    <div class="package-element" id="${package.Package_ID}">
                        <span>${package.Package_Name}</span>
                        <button class="btn btn-primary btn-lg">X</button>
                    </div>
                `);
                element.find('button').click(function() {
                    total.empty();
                    totalPrice -= package.Package_Price;
                    packagesListDom.find(`[id='${package.Package_ID}']`).remove();
                    packagesList.splice(packagesList.indexOf(package), 1);
                    total.append(totalPrice.toLocaleString( 'en-US')+" vnđ");
                })
                packagesListDom.append(element);
                
                packagesList.push(package);

            }
        }
        total.append(totalPrice.toLocaleString( 'en-US')+" vnđ");
    }
    //

    var showData = function () {
        $.ajax({
            url: '/GetPakInfo?id=3',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    showData();

    var show = function (res, type) {
        console.log(res);
        
        var StudioName = res.data[0].Studio_Name;
        var StudioNumber = res.data[0].Studio_Number;
        var StudioEmail = res.data[0].Studio_Email;
        var StudioAddress = res.data[0].Studio_Address;
        var StudioCoordinate = res.data[0].Studio_Coordinate;
        //showStu table
        showStu.empty();
        var stutr =$(`<tr>
            <td colspan="2">${StudioName}</td>
            </tr>
            <tr>
            <td>Studio phone number:</td>
            <td>${StudioNumber}</td>
            </tr>
            <tr>
            <td>Studio Email:</td>
            <td>${StudioEmail}</td>
            <tr>
            <td>Studio address:</td>
            <td>${StudioAddress}</td>
            </tr>
            <tr>
            <td>Studio Map location:</td>
            <td><a href="${StudioCoordinate}">link</a></td>
        </tr>`);
        showStu.append(stutr);
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


                //showDat table
                if (count == 0) {
                    PictureURL = "/picture/130621_morgan-raun_1785-5-Edit.jpg";
                } else if (count == 1) {
                    PictureURL = "/picture/1.jpg";
                }else if(count==2){
                    PictureURL ="/picture/2.jpg";
                }else if(count ==3){
                    PictureURL ="/picture/3.jpg"
                }

                //pic = `<img src="${PictureURL}" width="480">`;

                var tr = $(`<tr><th style="position:relative;">
                    <img src="${PictureURL}" width="480">
                    <p>${PackageName}</p>
                    <a style="position: absolute;bottom: 0px;right: 0px;"><img src="/picture/38919-200.png" width="50px">   </a>
                </th>
                <td style="position:relative;">
                    <p class="text">${PackageDetail.substr(0,200)+" ..."}</p>
                    <p>${PackagePrice.toLocaleString( 'en-US')} vnd</p>
                    <a href="view-pack.html?id=${StudioID}&name=${PackageName}" style="position:absolute;bottom:0px;right:0px;padding:10px"> Read more... </a>
                </td>
                
            </tr>`);

                tr.find('a').click(function(e) {
                    bindPackageToCarts(d);
                })

                /*var viewpic = $(pic);
                viewpic.click(function (e) {
                    modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PackageName;
                })*/
                //tr.append(viewpic);
                showDat.append(tr);
                count++;
            })
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }

    //toggle packages list
    $('#btn-carts').click(function() {
        packagesListDom.toggle();
    });

    //submit shopping carts
    packagesListDom.find(`button[name="buy"]`).click(function(e) {
        //call ajax to BuyPackage API packageList
        /*$.ajax({
            url: '/BuyPackages',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(packagesList),
        }).always(function (res) {
            console.log(res);

        })*/
        
        
        localStorage.setItem("items",JSON.stringify(packagesList));
        window.location.href = "checkout.html"
    })

    
//You can then call the function with something like what i have below.
    
}) 