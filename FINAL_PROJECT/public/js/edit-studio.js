$(document).ready(function () {
    var editForm = $('#editForm');

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
        var tr = $(`<option>Xin hãy chọn một quận .... </option>`)
        selectTag.append(tr);  
        for (var i = 0; i < options.length; i++) {
            var name = options[i].Province_Name;
            var id = options[i].Province_ID;
            //create optionTag from database
            var optionTag = null;
            optionTag = $(`<option value='${id}'>${name}</option>`);

            selectTag.append(optionTag);
        }
    }

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
            //var selectag2 = $("#districts");
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

    
    $.ajax({
        url: '/GetStudioByID?id='+localStorage.getItem('UserStudioId'),//
        method: 'get',
        contentType: 'application/json'
    }).always(function (res) {
        console.log(res);
        res.data.forEach(function(d){
            var selectTag = $("#district");
            var option = $(`<option value=${d.District_ID}>${d.District_Name}</option>`)
            selectTag.append(option);

            $('#stuname').val(d.Studio_Name);
            $('#address').val(d.Studio_Address);
            $('#email').val(d.Studio_Email);
            $('#phone').val(d.Studio_Number);
            $('#coor').val(d.Studio_Coordinate);

            //ICON & MAIN & OTHER
            $('#Icon').val(d.Studio_Icon);
            $('#icon').attr("src",d.Studio_Icon);
            
            $('#main').val(d.Studio_main_pic);
            $('#mainpic').attr("src",d.Studio_main_pic);

            $('#about').val(d.Studio_About);
            $('#aboutpic').val(d.Studio_about_pic);
            $('#abpic').attr("src",d.Studio_about_pic)
            $('#quote').val(d.Studio_quote);
            $('#quotepic').val(d.Studio_quote_pic);
            $('#quopic').attr("src",d.Studio_quote_pic)

            //PROJECT PICTURE
            $('#pro1').attr("src",d.Studio_project_1)
            $('#project1').val(d.Studio_project_1);
            $('#pro2').attr("src",d.Studio_project_2)
            $('#project2').val(d.Studio_project_2);
            $('#pro3').attr("src",d.Studio_project_3)
            $('#project3').val(d.Studio_project_3);
            $('#pro4').attr("src",d.Studio_project_4)
            $('#project4').val(d.Studio_project_4);
            $('#pro5').attr("src",d.Studio_project_5)
            $('#project5').val(d.Studio_project_5);
            $('#pro6').attr("src",d.Studio_project_6)
            $('#project6').val(d.Studio_project_6);
            $('#pro7').attr("src",d.Studio_project_7)
            $('#project7').val(d.Studio_project_7);
        })
    })

    var inputs2 = document.forms['editForm'].getElementsByTagName('input');
    var run_onchange2 = false;
    function valid2(){
        var errors = false;

        var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
        var patternss = /^[a-zA-Z0-9 ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ]+$/;
        var coordinatesss = /[0-9.],[0-9.]+$/
        for(var i=0; i<inputs2.length; i++){

            var value = inputs2[i].value;

            var id = inputs2[i].getAttribute('id');

            // Tạo phần tử span lưu thông tin lỗi

            var span = document.createElement('span');

            // Nếu span đã tồn tại thì remove

            var p = inputs2[i].parentNode;

            if(p.lastChild.nodeName == 'SPAN') {p.removeChild(p.lastChild);}

            // Kiểm tra rỗng

            if(value == ''){

                span.innerHTML ='Thông tin được yêu cầu';

            }else{

                // Kiểm tra các trường hợp khác

                if(id == 'newPEmails'){

                    if(reg_mail.test(value) == false){ span.innerHTML ='Email không hợp lệ (ví dụ: abc@gmail.com)';}

                    var email =value;

                }
                if(id == 'confirm_email' && value != email){span.innerHTML ='Email nhập lại chưa đúng';}

                //check coordinate
                if(id == 'newPCoordinates'){
                    //console.log(value);
                    if(coordinatesss.test(value) == false){ span.innerHTML ='Cooridnate không hợp lệ (theo form: XX,XX)';}

                }
                if(id == 'newPNames'){
                    console.log(value);
                    if(patternss.test(value) == false){ span.innerHTML ='StudioName không hợp lệ';}
                    var emailss =value;
                }
                // Kiểm tra số điện thoại

                if(id == 'newPNumbers' && isNaN(value) == true ){span.innerHTML ='Số điện thoại phải là kiểu số';}

            }
            // Nếu có lỗi thì chèn span vào hồ sơ, chạy onchange, submit return false, highlight border

            if(span.innerHTML != ''){

                inputs2[i].parentNode.appendChild(span);

                errors = true;

                //run_onchange = true;

                inputs2[i].style.border = '1px solid #c6807b';

                inputs2[i].style.background = '#fffcf9';

            }
        }// end for

        if(errors == false){
            var profile =[]
            // e.preventDefault();
            //var newNames = editForm.find("input[name='oldName']").val();
            
           var idDistrict = editForm.find("select[id='district'] option:selected").val();
            if(idDistrict!=null){
                var oldIDs = localStorage.getItem('UserStudioId');
                var newName = editForm.find("input[id='stuname']").val();
                var newAdre = editForm.find("input[id='address']").val();
                var newEmails = editForm.find("input[id='email']").val();
                var newNum = editForm.find("input[id='phone']").val();
                var newCoor = editForm.find("input[id='coor']").val();
                var icon = $('#Icon').val();
                var main = $('#main').val();
                var pro1 = $('#project1').val();
                var pro2 = $('#project2').val();
                var pro3 = $('#project3').val();
                var pro4 = $('#project4').val();
                var pro5 = $('#project5').val();
                var pro6 = $('#project6').val();
                var pro7 = $('#project7').val();
                var about = $('#about').val();
                var aboutpic = $('#aboutpic').val();
                var quote = $('#quote').val();
                var quotepic = $('#quotepic').val();
                var list ={
                    disid:idDistrict,
                    name:newName,
                    address:newAdre,
                    email:newEmails,
                    phone:newNum,
                    coor:newCoor,
                    icon:icon,
                    main:main,
                    pro1:pro1,
                    pro2:pro2,
                    pro3:pro3,
                    pro4:pro4,
                    pro5:pro5,
                    pro6:pro6,
                    pro7:pro7,
                    quote:quote,
                    quotepic:quotepic,
                    about:about,
                    aboutpic:aboutpic,
                    id:oldIDs,
                }
                
                
                profile.push(list);
                console.log(profile);
                //e.preventDefault();
                $.ajax({
                    url: '/EditStudioProfile',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(profile)
                }).always(function (res) {
                    var code = res.code;
                    var success = res.success || 'Edit when wrong!';
                    //window.location.href="http://localhost:5000/studio.html"
                    if (code == 200) {
                        alert("Edit Successful");
                    } else {
                        alert(success);
                    }
                })
            }else{
                
                var idDistrict = editForm.find("select[id='district'] option:selected").val();
                console.log(idDistrict)
                alert('Bạn chưa chọn Huyện của bạn !!!')
            }
            

            // })


            //  alert('Đăng ký thành công');
        } else {
            return !errors;

        }

    }// end valid()

    var register2 = document.getElementById('Edit');
    console.log(register2);
    register2.onclick = function(){

        return valid2();

    }

    $('#project1').blur(function(){
        var a = $('#project1').val();
        $('#pro1').attr("src",a)
    })
    $('#project2').blur(function(){
        var a = $(this).val();
        $('#pro2').attr("src",a)
    })
    $('#project3').blur(function(){
        var a = $(this).val();
        $('#pro3').attr("src",a)
    })
    $('#project4').blur(function(){
        var a = $(this).val();
        $('#pro4').attr("src",a)
    })
    $('#project5').blur(function(){
        var a = $(this).val();
        $('#pro5').attr("src",a)
    })
    $('#project6').blur(function(){
        var a = $(this).val();
        $('#pro6').attr("src",a)
    })
    $('#project7').blur(function(){
        var a = $(this).val();
        $('#pro7').attr("src",a)
    })
    $('#Icon').blur(function(){
        var a = $(this).val();
        $('#icon').attr("src",a)
    })
    $('#main').blur(function(){
        var a = $(this).val();
        $('#mainpic').attr("src",a)
    })
    $('#aboutpic').blur(function(){
        var a = $(this).val();
        $('#abpic').attr("src",a)
    })
    $('#quotepic').blur(function(){
        var a = $(this).val();
        $('#quopic').attr("src",a)
    })
})