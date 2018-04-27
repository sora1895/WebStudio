$(document).ready(function () {
    var user = $('#studioman');
    var admin = $('#admin');
    var showDat = $('#showDat');

    
    role = localStorage.getItem('Admin');
    console.log(role);
    if(role ==1){
        admin.show();
    }else{
        user.show();
    }
    if(localStorage.getItem('Admin')==0){
        $.ajax({
            url: '/GetConbyStudio?id='+localStorage.getItem('UserStudioId'),
            method: 'post',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    
    }else{
        showDat.hide();
    }
    
    var show = function(res){
        if (res && res.data && res.data instanceof Array) {

            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            res.data.forEach(function (d, i) {
                var ContractID = d.Contract_ID;
                var Customername = d.Customer_Name;
                var state = d.Contract_State;
                var cDate = new Date(d.Contract_cDate);
                var date = days[cDate.getDay()]+' '+cDate.getDate()+'/'+(cDate.getMonth()+1)+'/'+cDate.getFullYear();
                if(state=='Chưa thanh toán'){
                    var sql = `<td style="color:red">${state}</td>`
                }else if(state=='Đã thanh toán'){
                    var sql = `<td style="color:green">${state}</td>`
                }else if(state=='Đợi ảnh'){
                    var sql = `<td style="color:#5bc0de">${state}</td>`
                }else if(state=='Hoàn thành'){
                    var sql = `<td style="color:green">${state}</td>`
                }
                var tr = $(`<tr>
                        <td>${ContractID}</td>
                        <td>${Customername}</td>
                        <td>${date}</td>
                        `+sql+`
                    </tr>`);
                // viewButton.click(function (e) {
                //     localStorage.setItem('condeid',ConDetailID);
                //     window.location.href = `viewpicture.html?condeid=${ConDetailID}`;
                // });
                showDat.append(tr);

            })
        } else {
            alert("????")
        }
    }

})