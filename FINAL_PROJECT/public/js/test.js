editForm.submit(function (e) {


    var poid = editForm.find('#SelPOE').val();
    var picid = editForm.find('#SelNPic').val();
    var matid = editForm.find('#SelNMatOr').val();
    var quan = editForm.find('#newNOQuan').val();
    var size = editForm.find('#newNOSize').val();
    var detail = editForm.find('#newNODetail').val();
    var price = editForm.find('#newNOPrice').val();
    var note = editForm.find('#newNONote').val();
    $.ajax({
        url: `/EditPODetail`,
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            oldPO: oldPOE,
            oldMat: oldMAT,
            oldPic: oldPIC,
            oldQuan: oldQUAN,
            oldSize: oldSIZE,
            oldPrice: oldPRICE,
            oldNote: oldNOTE,

            newPO: poid,
            newMat: matid,
            newPic: picid,
            newQuan: quan,
            newSize: size,
            newDetail: detail,
            newPrice: price,
            newNote: note
        })
    }).always(function (res) {
        var code = res.code;
        var success = res.success || 'Edit when wrong!';
        if (code == 200) {
            alert("Successful");
            //window.location.href = "http://localhost:5000/materialdetail.html?id=" + id1 + "?name=" + package + "";
        } else {
            alert(success);
        }
    })
})

var oldPOE;
var oldPIC;
var oldMAT;
var oldQUAN;
var oldSIZE;
var oldDETAIL;
var oldPRICE;
var oldNOTE;


function bindToEditForm(data = {}) {
    editForm.show();

    editForm.find('#SelPOE').val(data.PrintOrder_ID);
    oldPOE = data.PrintOrder_ID;
    editForm.find('#SelNPic').val(data.Picture_ID);
    oldPIC = data.Picture_ID;
    editForm.find('#SelNMatOr').val(data.Material_ID);
    oldMAT = data.Material_ID;
    editForm.find('#newNOQuan').val(data.OrderDetail_Quantity);
    oldQUAN = data.OrderDetail_Quantity;
    editForm.find('#newNOSize').val(data.OrderDetail_Size);
    oldSIZE = data.OrderDetail_Size;
    editForm.find('#newNODetail').val(data.OrderDetail_Des);
    oldDETAIL = data.OrderDetail_Des;
    editForm.find('#newNOPrice').val(data.OrderDetail_Price);
    oldPRICE = data.OrderDetail_Price;
    editForm.find('#newNONote').val(data.OrderDetail_Note);
    oldNOTE = data.OrderDetail_Note;
}
res.data.forEach(function (d, i) {
    var PrintOrderID = d.PrintOrder_ID;
    var PictureID = d.Picture_ID;
    var PictureURL = d.Picture_Url;
    var PictureDetail = d.Picture_Detail;
    var MaterialName = d.Material_Name;
    var MaterialID = d.Material_ID;
    var MaterialPriceID = d.MaterialPrice_ID;
    var OrderDeQuantity = d.OrderDetail_Quantity;
    var OrderDeSize = d.OrderDetail_Size;
    var OrderDeDes = d.OrderDetail_Des;
    var OrderDePrice = d.OrderDetail_Price;
    var OrderDeNote = d.OrderDetail_Note;

    var tr = $(`<tr>
        <td>${PrintOrderID}</td>
        <td><a href="picdetail.html?id=${PictureID}?name=${PictureDetail}"><img src="${PictureURL}" width="300" height="300"></a></td>
        <td><a href="materialdetail.html?id=${MaterialID}?name=${MaterialName}">${MaterialName}</a></td>
        <td>${OrderDeQuantity}</td>
        <td>${OrderDeSize}</td>
        <td>${OrderDeDes}</td>
        <td>${OrderDePrice}</td>
        <td>${OrderDeNote}</td>
    </tr>`);

    var editButton = $(`<td><button>Edit</button></td>`);
    editButton.click(function (e) {
        bindToEditForm(d);
    });
    tr.append(editButton);
    showDat.append(tr);
    count++;
});