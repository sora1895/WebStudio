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
    var SelCD = $('#SelCD');

    var contractPic = $(`.contractPic`);
    //var showAll = $('#showAll');

    //form 2
    var AddForm = $('#addForm');
    var showDat = $('#showDat').find('tbody');

    var x = document.URL;
    var idloc = x.search("id=");
    var id1 = x.substr(idloc + 3);

    console.log(id1);

    var showData = function () {
        $.ajax({
            url: '/getPicture?condeid=' + id1,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    showData();
    var show = function (res, type) {
        console.log(res);
        contractPic.empty();
        //PicNum.empty();
        /*showDat.empty();
        showDatHead.empty();
        main.show();*/
        var portfolio_container = $(`<div class="portfolio-row-half"></div></div>`)
        var count = 0;



        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            res.data.forEach(function (d, i) {
                var d = res.data[i];
                var PictureID = d.Picture_ID;
                var ConDetailID = d.ConDetail_ID;
                var PictureURL = d.Picture_Url;
                var PictureDetail = d.Picture_Detail;
                var PackageName = d.Package_Name;


                /*var tr = $(`<tr>
                    <td style="width:30%"><a href="picdetail.html?id=${PictureID}?name=${PictureDetail}">${PictureDetail}</a></td>
                    
                </tr>`);
                var viewpic = $(`<td><img src="${PictureURL}" width="500"></td>`);
                viewpic.click ( function(e){
                    modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PictureDetail;
                })
                tr.append(viewpic);
                showDat.append(tr);*/
                var tr = $(`
                <a href="picdetail.html?id=${ConDetailID}" class="portfolio-grid-item" style="background-image: url(${PictureURL});">
                    <div class="desc2">
                        <h3>${PictureDetail}</h3>
                        <span>${PackageName}</span>
                        <i class="sl-icon-heart"></i>
                    </div>
                </a>
                `)
                tr.click(function (e) {
                    /*modal.style.display = "block";
                    modalImg.src = PictureURL;
                    captionText.innerHTML = PictureDetail;*/
                    localStorage.setItem('picid',PictureID);
                    localStorage.setItem('picname',PictureDetail);
                })
                portfolio_container.append(tr);
                count++;
            })
            //PicNum.append("Number of Pictures found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
            var thead = $(`<div id="fh5co-portfolio-section" class="fh5co-portfolio-section" style="padding-top:0em">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3 text-center fh5co-heading">
                        <i class="sl-icon-briefcase"></i>
                        <h2>${res.data[0].Package_Name}</h2>
                        <p>${res.data[0].Package_Detail}.</p>
                        <p>Number of Pictures found: ${count}</p>
                    </div>
                </div>
            </div>`);
            thead.append(portfolio_container);
            contractPic.append(thead);
        }
        else {
            alert("????")
        }
    }

    picForm.submit(function (e) {
        e.preventDefault();
        var key = picForm.find("input[name='key']").val();
        $.ajax({
            url: '/GetPictureByName',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                key: key,
                id: id1,
            })
        }).always(function (res) {

            show(res)


        })
    })

    /*AddForm.submit(function (e) {
        e.preventDefault();
        var ConId = AddForm.find("input[id='SelCD']").val();
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
            window.location.href = "picture.html?condeid=" + id1;
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })*/
    showAdd[0].onclick = function () {
        document.getElementById("addForm").style.display = 'block';
        SelCD.val(localStorage.getItem('condeid'));
    }



    /*img.onclick = function () {
        
    }*/

    span.onclick = function () {
        modal.style.display = "none";
    }

    $('.upload-btn').on('click', function () {
        $('#upload-input').click();
        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    });

    $('#upload-input').on('change', function () {

        var files = $(this).get(0).files;

        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request
            var formData = new FormData();

            // loop through all the selected files and add them to the formData object
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }

            $.ajax({
                url: '/upload?id=' + id1,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    console.log('upload successful!\n' + data);
                },
                xhr: function () {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();

                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function (evt) {

                        if (evt.lengthComputable) {
                            // calculate the percentage of upload completed
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);

                            // update the Bootstrap progress bar with the new percentage
                            $('.progress-bar').text(percentComplete + '%');
                            $('.progress-bar').width(percentComplete + '%');

                            // once the upload reaches 100%, set the progress bar text to done
                            if (percentComplete === 100) {
                                $('.progress-bar').html('Done');
                            }

                        }

                    }, false);

                    return xhr;
                }
            });

        }
    });
})