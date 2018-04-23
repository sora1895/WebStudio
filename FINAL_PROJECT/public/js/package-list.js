$(document).ready(function () {
    var PakName = $('#PakName');
    PakName.empty();
    if (localStorage.getItem("items") != [] || localStorage.getItem("items") != '') {
        var items = JSON.parse(localStorage.getItem("items"));
    }
    var PackageLists = [];
    var totalPrice = 0
    var packagesBtn = $('.packages-btn');
    var packagesListDom = $(".packages-list");
    var packagesBtn = $('.packages-btn');
    var total = $('#total');

    if (items != []) {

        items.forEach(function (d) {
            if (localStorage.getItem('stuid') == d.Studio_ID) {
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
            } else {

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



    $.ajax({
        url: '/GetStudioByID?id=' + localStorage.getItem('stuid'),
        method: 'get',
        contentType: 'application/json',
    }).always(function (res) {
        PakName.append(res.data[0].Studio_Name);
    })

    $.ajax({
        url: '/GetPakInfo?id=' + localStorage.getItem('stuid'),
        method: 'post',
        contentType: 'application/json',
    }).always(function (res) {
        show(res);

        /*PakDetail.empty();
        PakPrice.empty();
        PakDetail.append(res.data[0].Package_Detail);
        PakPrice.append(res.data[0].Package_Price.toLocaleString( 'en-US')+" vnđ");*/
    })

    var show = function (res) {
        console.log(res)
        if (res && res.data && res.data instanceof Array) {
            var a = $('<div class="row"></div>')
            res.data.forEach(function (d, i) {

                var d = res.data[i];
                var StudioID = d.Studio_ID;
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var PictureUrl = d.Package_pic;

                var tr = $(`<div class="feature-full-1col">
                <div class="image" style="background-image: url(${PictureUrl});">
                </div>
                <div class="desc">
                    <h3>${PackageName}</h3>
                    <p>${PackageDetail}</p>
                    <p><a id="cart"><img src="/picture/38919-200.png" width="50px" title="" style=""></a></p>
                    <p><a class="btn btn-primary btn-luxe-primary" id="buy">${PackagePrice.toLocaleString('en-US')} vnd</a></p>
                </div>
            </div>
                        `);

                tr.find('a#cart').click(function (e) {
                    bindPackageToCarts(d);
                    packagesListDom.show();
                    packagesBtn.show();
                })

                tr.find('a#buy')[0].onclick = function (e) {
                    PackageLists.push(d);
                    var id = localStorage.getItem('stuid');
                    localStorage.setItem("selectedStudio", id)
                    localStorage.setItem('items', JSON.stringify(PackageLists))

                    window.location.href = "checkout.html"

                }


                a.append(tr);

            })
            $('#fh5co-blog-section .container').append(a);
            // $('#fh5co-blog-section').append(a);
        }
    }
    /*PakPrice[0].onclick= function(){
        
    }
*/

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
        var id = localStorage.getItem('stuid');
        localStorage.setItem("selectedStudio", id)
        localStorage.setItem("items", JSON.stringify(packagesList));

        window.location.href = "checkout.html"
    })

})