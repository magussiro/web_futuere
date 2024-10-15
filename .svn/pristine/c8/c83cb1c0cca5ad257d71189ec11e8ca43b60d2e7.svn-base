
//====================================
//檢查表單欄位-開始
//====================================
var validateSuccess = true; //檢查成功
var arrErrorMsg = new Array();            //所有錯誤訊息

function checkaccount(id) {
    if ($("#" + id).val().length > 0) {
        // if (!checklen(fmobj, "帳號", 6, 30)) return false;
        re = /^\w{1,30}$/;
        if (!re.test($("#" + id).val())) {
            setError(id, "只能由英文數字及底線")
            //alert("帳號格式有問題,只能由英文數字及底線");
            //document.getElementById(fmobj).focus();
            //return false;
        }
    }

}

function checkID(id) {
    var cid = $("#" + id).val();

    if (cid) {
        var index = false;

        tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
        A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
        A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
        Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

        if (cid.length != 10)
            index = true;
        i = tab.indexOf(cid.charAt(0));
        if (i == -1)
            index = true;
        sum = A1[i] + A2[i] * 9;

        for (i = 1; i < 10; i++) {
            v = parseInt(cid.charAt(i));
            if (isNaN(v))
                index = true;
            sum = sum + v * Mx[i];
        }

        if (sum % 10 != 0) {
            index = true;
        }

        if (index)
            setError(id, "格式不正確")

    }
    //return true;
}

function checknum(id) {
    if ($("#" + id).val() != "") {
        re = /^([0-9]*[.0-9])$/;
        if (!re.test($("#" + id).val())) {
            setError(id, "需為數字")
        }
    }

}

function checkemail(id) {
    if ($("#" + id).val() != "") {
        re = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;

        if (!re.test($("#" + id).val())) {
            setError(id, "格式不正確")
        }
    }
    //return true;
}

function checkempty(id) {

    var type = $("#" + id).attr("type");
    var value = $("#" + id).val();
    if (type == null)
        type = $("#" + id).get(0).tagName;
    type = type.toLowerCase();

    switch (type) {
        case "text":
            if (value == "") {
                setError(id, "需輸入");
            }
            break;
        case "password":
            if (value == "") {
                setError(id, "需輸入");
            }
            break;
        case "select":
            if (value == "" || value == "0") {
                setError(id, "需輸入");
            }
            break;
    }
}


function checklen(id, lenmin, lenmax) {
    if ($("#" + id).val() != "") {
        if (($("#" + id).val().length < lenmin)) {
            setError(id, "需超過" + lenmin + "個字")
        }
        if (($("#" + id).val().length > lenmax)) {
            setError(id, "不能超過過" + lenmax + "個字")
        }
    }
}


//判斷是否必埴
function ifRequired(validate) {
    if (validate != null) {
        var arrValidate = validate.split(" ");
        var index = "0";
        for (var i = 0; i < arrValidate.length; i++) {
            if (arrValidate[i] == "required") {
                index = "1";
            }
        }
        if (index == "1") {
            return true;
        }
    }
    else {
        return false;
    }
}

//檢查長度
function checkLengthValidate(validate, options) {
    if (validate != null) {
        var arrValidate = validate.split(" ");
        var strLength = "";
        var index = "0";
        for (var i = 0; i < arrValidate.length; i++) {
            if (arrValidate[i] == "length") {
                index = "1";
            }
        }
        if (index == "1") {
            strLength = "length='" + options + "'";
        }
        return strLength;
    }
    else {
        return "";
    }
}

function checkDate(id) {
    var re = new RegExp("^([0-9]{4})[./]{1}([0-9]{1,2})[./]{1}([0-9]{1,2})$");
    var strDataValue;
    var infoValidation = true;

    var str = $("#" + id).val();

    if (str != "") {
        if ((strDataValue = re.exec(str)) != null) {
            var i;
            i = parseFloat(strDataValue[1]);
            if (i <= 0 || i > 9999) { // 年
                infoValidation = false;
                setError(id, "格式不正確")
            }
            i = parseFloat(strDataValue[2]);
            if (i <= 0 || i > 12) { // 月
                infoValidation = false;
                setError(id, "格式不正確")
            }
            i = parseFloat(strDataValue[3]);
            if (i <= 0 || i > 31) { // 日
                infoValidation = false;
                setError(id, "格式不正確")
            }
        } else {
            //infoValidation = false;
            setError(id, "格式不正確")
        }
    }

}

function setError(id, msg) {
    var title = "";
    var title = $("#" + id).parent().parent().find("label").html();
    $("#" + id).parent().parent().addClass("has-error");

    if (title == null) {
        title = $("#" + id).parent().parent().parent().parent().parent().parent().find("label").html();
        $("#" + id).parent().parent().parent().parent().parent().parent().addClass("has-error");
    }
    if (title != null) {
        title = RemoveHTML(title);

        if (title) {
            title = title.replace(":", "");
        }
        if (title) {
            title = title.replace('*', "");
        }
    }
    else
        title = "";

    $("#" + id).focus();
    validateSuccess = false;
    arrErrorMsg.push(title + msg);
}

function AllErrorStr() {
    var total = "";
    for (i = 0; i < arrErrorMsg.length ; i++) {
        total = total + arrErrorMsg[i] + "、";
    }
    if (total.length > 0)
        total = total.substring(0, total.length - 1);

    arrErrorMsg = new Array();
    return total;
}

function ajaxCheck(id, url) {
    $.ajax({
        type: 'post',
        dataType: 'json',
        async: false,
        url: url,
        error: function (xhr, ajaxOptions, thrownError) {
        },
        success: function (response) {
            //統一回傳值,status=-1 為檢核不過
            if (response.status == "-1") {
                setError(id, "重複");
            }
            else {
            }
        },
        complete: function (data) {
        }
    });
}

function custValidate() {
    //重置錯誤CLASS和值
    validateSuccess = true;
    $(".has-error").each(function () {
        $(this).removeClass("has-error");
    })
    //檢查必埴
    var arrayChk = new Array();
    $(".required").each(function () {
        var id = $(this).attr("id");
        var type = $(this).attr("type");
        if (type == "checkbox") {
            var chkIndex = true;
            for (var i = 0; i < arrayChk.length; i++) {
                //alert(arrayChk[i].name + "," + $(this).attr("groupName"));
                if (arrayChk[i].name == $(this).attr("groupName")) {
                    if ($(this).prop("checked") == true) {
                        arrayChk[i].check = true;
                    }
                    chkIndex = false;
                }
                else {

                }
            }

            if (chkIndex) {
                var newType = {};
                newType.name = $(this).attr("groupName");
                newType.id = $(this).attr("id");
                if ($(this).prop("checked") == true) {
                    newType.check = true;
                }
                else {
                    newType.check = false;
                }
                arrayChk.push(newType);
            }
        }
        else {
            checkempty(id);
        }
    });
    for (var j = 0 ; j < arrayChk.length; j++) {
        var isCheck = arrayChk[j].check;
        if (isCheck == false) {
            setError(arrayChk[j].id, "需選取");
        }
    }


    //檢查長度
    $(".length").each(function () {
        var id = $(this).attr("id");
        var length = $(this).attr("length");
        var arr = length.split(",");
        var min = arr[0];
        var max = arr[1];
        checklen(id, Number(min), Number(max));
    });
    //檢查MAIL
    $(".mail").each(function () {
        var id = $(this).attr("id");
        checkemail(id);
    });

    //檢查帳號
    $(".account").each(function () {
        var id = $(this).attr("id");
        checkaccount(id);
    });

    //檢查數字
    $(".number").each(function () {
        var id = $(this).attr("id");
        checknum(id);
    });


    //檢查數字
    $(".date").each(function () {
        var id = $(this).attr("id");
        checkDate(id);
    });


    //檢查身份證字號
    $(".cid").each(function () {
        var id = $(this).attr("id");
        checkID(id);
    });

}

function checkBoxRequired(className) {
    var id;
    var index = false;
    $("." + className).each(function () {
        id = $(this).attr("id");
        if ($(this).prop("checked") == true)
            index = true;
    });

    if (index == false)
        setError(id, "需選取");
}


//====================================
//檢查表單欄位-結尾
//====================================

