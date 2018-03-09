    var search_item = ["user a","user b","user c"];
    var find = false;
    var find_item = "";
    var search_input = "it";

    //Người dùng không input và ấn button search
    if(search_input === "") {
        console.log("Please input search value!!");
    }
    //Tìm kiếm user
    for(var i = 0;i < search_item.length;i++){
        if(search_input != search_item[i]){
            find = false;
        }else{
            find = true;
            find_item = search_item[i];
        }
    }
    //Trả ra kết quả
    if(find_item != ""){
        console.log(find_item);
    }else{
        console.log("Not found!!");
    }