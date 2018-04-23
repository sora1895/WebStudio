$(document).ready(function(){
    var showDat =$('#showDat').find('tbody');
    var Icustomerform =$('#IcustomerForm');
    var addForm =$('#addForm')
    var showAdd = $('#showAdd');
    var IcustomerNum = $('#IcustomerNum');
    var adddiv = $('#adddiv');
    var editForm = $('#editForm');

    var showData = function(){
        $.ajax({
            url: '/GetIcustomer',
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    }
    showData();
    var oldName;
    var oldGender;
    var oldAdress;
    var oldEmail;
    var oldNumber;
    var oldNote;
    var oldOther;
    var oldIDs;

    var show = function (res) {
        console.log(res);
        IcustomerNum.empty();
        showDat.empty();
        if (res && res.data && res.data instanceof Array) {
            var count = 0;
            //edit
            function bindToEditForm(data = {}) {
                editForm.show();
                addForm.hide();
               // var selectag2 = $("#districts");
                //var s;
                editForm.find('#newIDSTu').text(data.Customer_ID);
                oldIDs = data.Customer_ID;


                editForm.find('#newCNames').val(data.Customer_Name);
                oldName = data.Customer_Name;

                editForm.find('#newCGenders').val(data.Customer_Gender);
                oldGender = data.Gender_Name;

                editForm.find('#newCAddresss').val(data.Customer_Address);
                oldAdress = data.Customer_Address;

                editForm.find('#newCEmails').val(data.Customer_Email);
                oldEmail = data.Customer_Email;

                editForm.find('#newCNumbers').val(data.Customer_Number);
                oldNumber= data.Customer_Number;

                editForm.find('#newCOther').val(data.Customer_Other);
                oldOther = data.Customer_Other;

                editForm.find('#newCNotes').val(data.Customer_Note);
                oldNote = data.Customer_Note;
               // oldDistrict = data.District_ID;
                //s = data.District_Name;
                //var optionTag2 = null;
                //optionTag2 = $(`<option selected="selected" value='${oldDistrict}'>${s}</option>`);
                //selectag2.empty();
                //selectag2.append(optionTag2);
               // editForm.find('#newPEmails').val(data.Studio_Email);
                //oldEmail = data.Studio_Email;
                //editForm.find('#newPNumbers').val(data.Studio_Number);
                //oldNumber = data.Studio_Number;
                //editForm.find('#newPCoordinates').val(data.Studio_Coordinate);
                //oldCoordinate = data.Studio_Coordinate;
                //console.log(oldName, oldAdress, oldprovince, oldDistrict,oldEmail,oldNumber,oldCoordinate, s, oldIDs);
            }
            //del
            function delRow(data = {}) {
                oldId = data.Customer_ID;
                console.log(oldId);
                if (confirm('You want to delete this data?')) {
                    $.ajax({
                        url: `/DelIcustomer`,
                        method: 'post',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            delid: oldId,
                        })
                    }).always(function (res) {
                        var code = res.code;
                        var success = res.success || 'Delete when wrong!';
                        if (code == 200) {
                            alert("Successful");
                            //window.location.href = "http://localhost:5000/icustomer.html";
                        } else {
                            alert(success);
                        }
                    })
                }

            }
            //show
            res.data.forEach(function (d, i) {

                var IcustomerID = d.Customer_ID;
                var IcustomerName = d.Customer_Name;
                var IcustomerGender = d.Customer_Gender;
                var IcustomerAddress = d.Customer_Address;
                var IcustomerEmail = d.Customer_Email;
                var IcustomerNumber = d.Customer_Number;
                var IcustomerNote = d.Customer_Note;


                var tr = $(`<tr>
                    <td>${IcustomerID}</td>
                    <td><a href="icustomerdetail.html?id=${IcustomerID}?name=${IcustomerName}">${IcustomerName}</a></td>
                    <td>${IcustomerGender}</td>
                    <td>${IcustomerAddress}</td>
                    <td>${IcustomerEmail}</td>
                    <td>${IcustomerNumber}</td>
                    <td>${IcustomerNote}</td>
                   
                </tr>`);
                var editButton = $(`<td><button>Edit</button></td>`);
                var delButton = $(`<td><button>Delete</button></td>`);
                editButton.click(function (e) {
                    bindToEditForm(d);
                });
                delButton.click(function (e) {
                    delRow(d);
                })
                tr.append(editButton);
                tr.append(delButton);
                showDat.append(tr);
                count++;
            })
            IcustomerNum.append("Number of customer found: " + count);
            //var ProCount = count;
            //ProNum.append("Districts found: " + ProCount);
        }
        else {
            alert("????")
        }
    }


    showAdd[0].onclick = function(){
        editForm.hide();
        document.getElementById("addForm").style.display = 'block';
    }
    Icustomerform.submit(function (e) {
        e.preventDefault();
        var IcustomerName = Icustomerform.find("input[name='customers']").val();
        console.log(ICustomerName);
        $.ajax({
            url: `/GetIcustomerByName?name=${IcustomerName}`,
            method: 'get',
            contentType: 'application/json',
        }).always(function (res) {
            show(res);
        })
    });

    addForm.submit(function (e) {
        e.preventDefault();
        var newNames = addForm.find("input[name='newCName']").val();
        var newGender = addForm.find("input[name='newCGender']").val();
        var newAddress = addForm.find("input[name='newCAddress']").val();
        var newEmail = addForm.find("input[name='newCEmail']").val();
        var newNumber = addForm.find("input[name='newCNumber']").val();
        var newOther = addForm.find("textarea[name='newCOther']").val();
        var newNote = addForm.find("input[name='newCNote']").val();

        console.log(newNames,newGender,newAddress,newEmail,newNumber,newOther,newNote);
        e.preventDefault();
        $.ajax({
            url: '/AddIcustomer',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                newNames: newNames,
                newGender: newGender,
                newAddress:newAddress,
                newEmail: newEmail,
                newNumber: newNumber,
                newOther :newOther,
                newNote: newNote,

            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/icustomer.html"
            if (code == 200) {
                alert("Insert Successful");
            } else {
                alert(success);
            }
        })

    })



    //edit
    editForm.submit(function (e) {
        e.preventDefault();
        //var newNames = editForm.find("input[name='oldName']").val();
        var newName = editForm.find("input[name='newPNames']").val();
        var newGende = editForm.find("input[name='newPGender']").val();
        var newAdre = editForm.find("input[name='newPAddresss']").val();
      //  var idDistrict = $('#districts :selected').val();
        var newEmails = editForm.find("input[name='newPEmails']").val();
        var newNum = editForm.find("input[name='newPNumbers']").val();
        var newOther = editForm.find("textarea[name='newCOther']").val();
        var newNot = editForm.find("input[name='newPNotes']").val();
       // var newCoor = editForm.find("input[name='newPCoordinates']").val();
        console.log(oldIDs,newName,newGende,newAdre,newEmails,newNum,newNot);
        e.preventDefault();
        $.ajax({
            url: '/EditIcustomer',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                ids : oldIDs,
                cusname: newName,
                gender: newGende,
                address:newAdre,
                email: newEmails,
                number: newNum,
                other: newOther,
                note: newNot,
            })
        }).always(function (res) {
            var code = res.code;
            var success = res.success || 'Insert when wrong!';
            window.location.href="http://localhost:5000/icustomer.html"
            if (code == 200) {
                alert("Edit Successful");
            } else {
                alert(success);
            }
        })

    })



})