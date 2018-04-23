$(document).ready(function () {

    var modal = document.getElementById('myModal');
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var span = document.getElementsByClassName("close")[0];

    var ConSearch = $('#ConSearch');
    var showDat = $('#showDat');
    var showDatBody = $('#showDat').find('tbody');
    var portfolio_container = $('.portfolio-row-half');
    var contractPic = $('.contractPic');

    $.ajax({
        url: '/GetStudio',//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        var options = res.data;//TODO
        renderStudio(options);
    })


    ConSearch.submit(function (e) {
        e.preventDefault();
        var id = ConSearch.find('#id').val();
        console.log(id);
        $.ajax({
            url: `/GetContractBySearch?conid=${id}`,//
            method: 'get',
            contentType: 'application/json'
        }).always(function (res) {
            show(res);

            contractPic.empty();
            $.ajax({
                url: `/GetConDetail`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: res.data[0].Contract_ID,
                    code: 1,
                })
            }).always(function (res) {
                showConDe(res);
            })
        })
    })

    span.onclick = function () {
        modal.style.display = "none";
    }

    var show = function (res) {
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;

                var CustomerID = d.Customer_ID;
                var Customername = d.Customer_Name;
                var CustomerAddress = d.Customer_Address;
                var CustomerGender = d.Customer_Gender;
                var CustomerPhone = d.Customer_Number;
                var CustomerEmail = d.Customer_Email;
                var CustomerNote = d.Customer_Note;

                var StudioName = d.Studio_Name;
                var StudioID = d.Studio_ID;
                var ContractDescription = d.Contract_Description;
                var cDate = new Date(d.Contract_cDate);
                var sDate = new Date(d.Contract_sDate);
                var eDate = new Date(d.Contract_eDate);
                var State = d.Contract_State;
                if (eDate.getMonth() + 1 < 10) {
                    var EndMonth = "0" + (eDate.getMonth() + 1)
                    if (eDate.getDate() < 10) {
                        var EnDate = "0" + eDate.getDate();
                    } else {
                        var EnDate = eDate.getDate();
                    }
                }
                if (sDate.getDate()) {
                    var StartMonth = "0" + (sDate.getMonth() + 1)
                    if (sDate.getDate() < 10) {
                        var StaDate = "0" + sDate.getDate();
                    } else {
                        var StaDate = sDate.getDate();
                    }
                }
                if (cDate.getDate()) {
                    var CreateMonth = "0" + (cDate.getMonth() + 1)
                    if (cDate.getDate() < 10) {
                        var CreDate = "0" + cDate.getDate();
                    } else {
                        var CreDate = cDate.getDate();
                    }
                }
                var CreateDate = "" + cDate.getFullYear() + "-" + CreateMonth + "-" + CreDate + "";
                var StartDate = "" + sDate.getFullYear() + "-" + StartMonth + "-" + StaDate + "";
                var EndDate = "" + eDate.getFullYear() + "-" + EndMonth + "-" + EnDate + "";
                console.log(State);
                $('#conid').empty();
                $('#conid').append('CONTRACT '+ContractID+' || ');
                $('#status').empty();
                $('#status').append(State);
                showDat.find("input[name='newCusName']").val(Customername);
                showDat.find("textarea[name='newCusAdd']").val(CustomerAddress);
                showDat.find("input[name='newCusPhone']").val(CustomerPhone);
                showDat.find("input[name='newCusEmail']").val(CustomerEmail);
                showDat.find("input[name='newCusNote']").val(CustomerNote);
                showDat.find("input[name='gender']").val(CustomerGender);
                showDat.find("input[id='SelNStu']").val(StudioName);
                showDat.find("textarea[name='newCDes']").val(ContractDescription);
                showDat.find("input[name='newCdate']").val(CreateDate);
                showDat.find("input[name='newSdate']").val(StartDate);
                showDat.find("input[name='newEdate']").val(EndDate);
            })

        }
        else {
            alert("????")
        }
    }


    var showPic = function (res) {
        console.log(res);

        if (res && res.data && res.data instanceof Array) {
            var portfolio_container = $(`<div class="portfolio-row-half"></div>
            </div>`);
            var thead = $(`<div id="fh5co-portfolio-section" class="fh5co-portfolio-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
                            <i class="sl-icon-briefcase"></i>
                            <h2>${res.data[0].Package_Name}</h2>
                            <p>${res.data[0].Package_Detail}.</p>
                        </div>
                    </div>
                </div>
            `);
            thead.append(portfolio_container);

            contractPic.append(thead);
            res.data.forEach(function (d, i) {
                var d = res.data[i];
                var PictureID = d.Picture_ID;
                var ConDetailID = d.ConDetail_ID;
                var PictureURL = d.Picture_Url;
                var PictureDetail = d.Picture_Detail;
                var PackageName = d.Package_Name;

                var tr = $(`<a class="portfolio-grid-item" style="background-image: url(${PictureURL});">
                    <div class="desc2">
                        <h3>${PictureDetail}</h3>
                        <span>${PackageName}</span>
                        <i class="sl-icon-heart"></i>
                    </div>
                </a>`)
                tr.click(function (e) {
                    modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PictureDetail;
                })
                portfolio_container.append(tr);
            })

        }

    }

    var showConDe = function (res) {
        showDatBody.empty();
        console.log(res);
        if (res && res.data && res.data instanceof Array) {
            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var ConDetailID = d.ConDetail_ID;
                var PackageID = d.Package_ID;
                var PackageName = d.Package_Name;
                var PackageDetail = d.Package_Detail;
                var PackagePrice = d.Package_Price;
                var PackageNote = d.Package_Note;
                var vat = PackagePrice * 0.1;
                var total = PackagePrice + vat;
                var count=1;

                var tr = $(`<tr><th colspan='3'>Gói ${count}</th></tr>
                <tr>
                    <td>Tên sản phẩm:</td>
                    <td colspan="3">
                        <select id="SelNPak" name="SelNPak" readonly>
                           <option>${PackageName}</option>
                        </select>
                    </td>
            </tr>
                <tr>
                    <td colspan="4">
                        <label>Chi tiết sản phẩm</label>
                        <textarea rows="5" placeholder="Enter Package detail ....." style="width: 100%" id="newCDDetail" name="newCDDetail" readonly>${PackageDetail}</textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right">
                       <p id="PakPrice">Giá tiền: ${PackagePrice.toLocaleString('en-US')} vnd</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <label>Ghi chú:</label>
                        <input placeholder="Enter note ....." type="text" name="newCNote" value="${PackageNote}" width="100%" readonly>
                   </td>
                </tr>`);

                showDatBody.append(tr);
                count++;

                $.ajax({
                    url: '/getPicture?condeid=' + ConDetailID,
                    method: 'get',
                    contentType: 'application/json',
                }).always(function (res) {
                    console.log(ConDetailID);
                    showPic(res);
                })

            })
        }
    }



    var renderStudio = function (options) {
        console.log("aaa");
        var selectTag = $("#SelNStu");
        for (var i = 0; i < options.length; i++) {
            var id = options[i].Studio_ID;
            var name = options[i].Studio_Name;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);
            selectTag.append(optionTag);
        }
    }


})