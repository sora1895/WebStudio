$(document).ready(function () {
    var showDat = $('#showDat').find('tbody');
    var showDathead = $('#showDat').find('thead');
    var showDatfoot = $('#showDat').find('tfoot');
    var items = JSON.parse(localStorage.getItem("items"));
    var showinfo = $('#showInfo');
    //console.log(items);
    var count =0;
    var thead = $(`<tr>
        <th>No</th>
        <th>Selected Package</th>
        <th>Price</th>
    </tr>`)
    showDathead.append(thead);
    var AllPrice=0;
    var delcart = function(data){
        AllPrice -= data.Package_Price;
        showDat.find(`[id='${data.Package_ID}']`).remove();
        items.splice(items.indexOf(data), 1);
        $('#total').empty();
        total.append('Tổng tiền: '+AllPrice.toLocaleString('en-US') + " vnđ");
        
        localStorage.setItem('items',JSON.stringify(items))
    }

    if(items instanceof Array){
        items.forEach(function (d) {
            count++;
            var pakid = d.Package_ID;
            var name = d.Package_Name;
            var price = d.Package_Price;
            var tr = $(`<tr id='${pakid}'>
                <td>${count}</td>    
                <td>${name}</td>
                <td>${price.toLocaleString('en-US')} vnd</td>
                </tr>`)
                var removebtn = $('<td><button style="color:white">&times;</button></td>')
                removebtn.click(function(){
                    delcart(d);
                })
            tr.append(removebtn);
            showDat.append(tr);
            AllPrice += price;
        })
        console.log(AllPrice)
        $('#total').empty();
        $('#total').append('Tổng tiền: '+AllPrice.toLocaleString('en-US') + " vnđ")
    }
    
    var customer =[];
    
    console.log(items);
    var text = "";
    var packagesList = items;

    function valid(){
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var info = $('#info').val();
        var social = $('#social').val();
        var gender = $('#gender').val();
        customer = [{
            name:name,
            phone:phone,
            email:email,
            social:social,
            info:info
        }]
        
        console.log(customer)
        console.log(packagesList);

        
        var newNames = name;
        var newGender = gender;
        var newEmail = email;
        var newNumber = phone;
        var newOther = social;

        console.log(newNames,newGender,newEmail,newNumber,newOther);
        //e.preventDefault();
        $.ajax({
            url: '/AddIcustomer',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newNames: newNames,
                newGender: newGender,
                newEmail: newEmail,
                newOther: newOther,
                newNumber: newNumber,

            })
        }).always(function (res) {

            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            //window.location.href="http://localhost:5000/icustomer.html"
            if (code == 200) {
                alert("Insert Successful");
                AddCon(res.data,info);
            } else {
                alert(success);
            }
        })

        
        // AddCon(1,info);
        // AddConDe(20)
        
    }

    var AddCon = function (cusid,info) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy+'-'+mm + '-' + dd

        var stuid = localStorage.getItem('selectedStudio');
        var newCDes = info;
        

        text="";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++){text += possible.charAt(Math.floor(Math.random() * possible.length));}

        
            $.ajax({
                url: '/checkId?id='+text,
                method: 'post',
                contentType: 'application/json',
            }).always(function (res) {
                var code = res.code;
                var success = res.success || 'ID exist!';
                if(code==200){
                    alert(success);
                }else{

                }
            })
        
        
        console.log(text,cusid, stuid, newCDes);

        $.ajax({
            url: '/AddCon',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                conid: text,
                cusid: cusid,
                stuid: stuid,
                newCDes: newCDes,
                today:today,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';

            if (code == 200) {
                alert("Insert Contract Successful");
                //window.location.href = "http://localhost:5000/contract.html";
                //console.log(res);
                AddConDe(text);
            } else {
                alert(success);
            }
        })
    }


    //ADD Contract Detail
    var AddConDe = function (conid) {
        var name = $('#name').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var info = $('#info').val();
        var social = $('#social').val();
        var gender = $('#gender').val();
        var cart =[];
        //console.log(textAreaDoms, pDoms, inputs)
        //coung == cart.length
        items.forEach(function (d) {
            var pakid = d.Package_ID;
            var newName = d.Package_Name;
            var newDetail = d.Package_Detail;
            var numb = d.Package_Price;



            var element = [
                conid,
                pakid,
                newName,
                newDetail,
                numb,
                '',
            ];
            cart.push(element);
            console.log(element)
        })
        console.log(cart);

        //console.log(pakid, newName, newDetail, newPrice, newNote);

        $.ajax({
            url: '/AddMultiConDe',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(cart)
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            showinfo.empty();

            if (code == 200) {
                var tr =$(`<tr>
                <th colspan='3'>Hợp đồng số #${conid} đã được tạo</th>
                </tr>
                <tr>
                <th>Tên khách hàng</th>
                <td>${name}</td>
                </tr>
                <tr>
                <th>Giới tính:</th><td> ${gender}</td>
                <th>Số điện thoại: </th><td>${phone}</td>
                </tr>
                <tr>
                <th>Email:</th><td> ${email}</td><th>Social media: </th><td>${social}</td>
                </tr>
                <tr>
                <td><lable>Yêu cầu của khách hàng</lable>: ${info}</td>
                </tr>
                `)
                showinfo.append(tr);
                $('#guide').empty();
                $('#guide').append('Đơn hàng của bạn đã được tạo mời bạn bấm vào <a href="view-contract.html">đây</a> và điền "'+conid+'" vào ô trống');
                //window.location.reload();
                $.ajax({
                    url: '/BuyPackages',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        customer:customer,
                        items:packagesList,
                        id:conid,
                    }),
                }).always(function (res) {
                    console.log(res);
                })

                $('#buttonshow').hide();
            } else {
                alert(success);
            }
        })
    }

    function validate() {
        var $resultname = $("#resultname");
        var $resultphone = $("#resultphone");
        var name = $("#name").val();
        var phone = $("#phone").val();
        var patternss = /^[a-zA-Z0-9ăâơưêôÂƠĂUÔÊẢảẲẳẨẩẺẻỂểỈỉỎỏỔổỞởỦủỬửỶỷÀàẰằẦầÈèỀềÌ ìǸǹÒòỒồỜờÙùỪừẀẁỲỳÁáẮắẤấÉéẾếÍíÓóỐốỚớÚúỨứÝýẠạẶặẬậẸẹỆệỊịỌọỘộỢợỤụỰựỴỵÃãẴẵẪẫẼẽỄễĨĩÕõỖỗỠỡỮữŨũỸỹ ]+$/;
        $resultname.text("");
        $resultphone.text("");
        console.log(name, phone);
        if(patternss.test(name) == false && name != '') {
            $resultname.text("Tên khách hàng phải không có ký tự dặc biệt");
            $resultname.css("color", "red");
        }
        if(name == ''){
            $resultname.text("Tên khách hàng không được để trống");
            $resultname.css("color", "red");
        }
        if(name.length > 32){
            $resultname.text("Tên khách hàng không được lớn hơn 32 ký tự");
            $resultname.css("color", "red");
        }
        if(phone == ''){
            $resultphone.text("Số điện thoại không được để trống");
            $resultphone.css("color", "red");
        }
        if(isNaN(phone) == true){
            $resultphone.text("Số điện thoại phải không có chữ");
            $resultphone.css("color", "red");
        }
        if(isNaN(phone) == false && (phone.length > 12 || phone.length < 8) && phone != '' ){
            $resultphone.text("Số điện thoại phải từ 8-12 số");
            $resultphone.css("color", "red");
        }
        if(patternss.test(name) == true && isNaN(phone) == false && phone.length <= 12 && phone.length >= 8 ){
            console.log(name, phone);
            valid();
        }
        return false;
    }

    $("#buy").bind("click", validate);
  
})