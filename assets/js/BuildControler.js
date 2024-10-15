

//====================================
//產生控制項-開始
//====================================

function AddChangeEvent(id) {
    $("#" + id).change(function () {
        model[id] = $(this).val();
    });
    $("#" + id).click(function () {
        model[id] = $(this).val();
    });

    $("#" + id).blur(function () {
        model[id] = $(this).val();
    });

    $("#" + id).focus(function () {
        model[id] = $(this).val();
    });
}

function AddTextareaChangeEvent(id) {
    $("#" + id).on('change keyup paste', function () {
        //alert($(this).val());
        model[id] = $(this).val();
    });
}

function AddFckChange(id) {
    //var editor = CKEDITOR.replace(id);

    //alert(CKEDITOR.instances[id]);
    //if (CKEDITOR.instances[id] == "undefined")
    //    eidtor = CKEDITOR.replace(id);
    //else
    
    //var editor = CKEDITOR.instances[id];
    //if (CKEDITOR.instances[id]) {
    //    delete CKEDITOR.instances[id]
    //};
    //$(".ckeditor").each(function () {
    //    $(this).removeClass("ckeditor");
    //});
    
    //for(html in CKEDITOR.instances[id])
    //{
    //    CKEDITOR.instances[html].destroy();
    //}

    //alert(CKEDITOR.instances[id]);
    //var editor = CKEDITOR.instances[id];
    //if (editor) { editor.destroy(true); }
    //editor = CKEDITOR.replace(id);
    //alert(editor);

    //for (k in CKEDITOR.instances) {
    //    var instance = CKEDITOR.instances[k];
    //    instance.destroy()
    //}
    //CKEDITOR.replaceAll();

    //var instance = CKEDITOR.instances[id];
    //alert(instance);
    //if (instance) {
    //    CKEDITOR.remove(instance);
    //}
    //alert(instance);
    var editor = CKEDITOR.replace(id,
    //{
        //filebrowserBrowseUrl : '/UploadImage?type=Images', //上傳圖檔路徑
        //filebrowserUploadUrl: '/UploadFile?type=Files' //上傳其他檔案的路徑，例如.rar

    //}
    {
        filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
        filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?Type=Images',
        filebrowserFlashBrowseUrl: '/ckfinder/ckfinder.html?Type=Flash',
        filebrowserUploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
        filebrowserImageUploadUrl: '/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images',
        filebrowserFlashUploadUrl: '/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash',
        customConfig: '/ckeditor/config.js'
    }
        );
    //editor.toolbar = "toolbarGroups";
    //alert(editor);
    //var editor = CKEDITOR.instances[id];
    //alert(editor);
     //The "change" event is fired whenever a change is made in the editor.
    editor.on('change', function (evt) {
         //getData() returns CKEditor's HTML content.
        console.log('Total bytes: ' + evt.editor.getData().length);
        model[id] = evt.editor.getData();
        //CKEDITOR.instances[id].getData();
    });
}

function AddCheckboxChange(id) {

    $(".ChkGroup_" + id).each(function () {
        $(this).change(function () {
            var gValue = "";
            $(".ChkGroup_" + id).each(function () {
                if ($(this).prop("checked")) {
                    var cid = $(this).attr("id");
                    cid = cid.replace("chk_", "");
                    gValue += cid + ",";
                }
            });
            if (gValue.length > 0)
                gValue = gValue.substring(0, gValue.length - 1);
            model[id] = gValue;
        });
    });
}

function AddTimeChange(id) {
    $("#" + id + "_h").change(function () {
        var h = $(this).val();
        if (h.length == 1)
            h = "0" + h;

        var m = $("#" + id + "_m").val();
        if (m.length == 1)
            m = "0" + m;

        model[id] = h + ":" + m;
    });

    $("#" + id + "_m").change(function () {
        var h = $("#" + id + "_h").val();
        if (h.length == 1)
            h = "0" + h;

        var m = $(this).val();
        if (m.length == 1)
            m = "0" + m;

        model[id] = h + ":" + m;
    });
}

function GenFile(id, value, name, fValidate, folder, placeholder, tabNum) {
    
    var imglist = "";
    if (value.length > 1) {
        if (value.indexOf(",") >=0) {
            var arr = value.split(",");
            for (var i = 0; i < arr.length; i++) {
                var imgFileName = arr[i];
                if (imgFileName.indexOf(".") >= 0) {
                    var arrName = imgFileName.split(".");
                    imgFileName = arrName[0] + "_s." + arrName[1];
                }

                var imgStr = GetFindUploaderLI(imgFileName);
                imglist += imgStr;
            }
        }
        else {
            var imgFileName = value;
            if (imgFileName.indexOf(".") >= 0) {
                var arrName = imgFileName.split(".");
                imgFileName = arrName[0] + "_s." + arrName[1];
            }
            var imgStr = GetFindUploaderLI(imgFileName);
            imglist = imgStr;
        }
    }

    setTimeout(function () {
        $("#fine-uploader-gallery-" + id + " .qq-upload-list-selector").append(imglist);
    }, 500);

    var strControl = ' <img onclick="javascript:funcDelFile(\''+id+'\')" id="file-del-' + id + '" src="/images/icon_nook.png" /><div id="fine-uploader-gallery-' + id + '"></div><div id="fu_imglist_' + id + '">' + "</div>";
    AddContentWithoutIcon(strControl, name, 8 ,tabNum);
}


function GetFindUploaderLI(src)
{
    var strHtml = '<li class="qq-file-id-1 qq-upload-success" qq-file-id="1">';
    strHtml+='              <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>';
    strHtml+='                    <div class="qq-progress-bar-container-selector qq-progress-bar-container qq-hide">';
    strHtml += '                         <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar" style="width: 100%;"></div>';
    strHtml+='                     </div>';
    strHtml+='                     <span class="qq-upload-spinner-selector qq-upload-spinner qq-hide"></span>';
    strHtml+='                     <div class="qq-thumbnail-wrapper">';
    strHtml+='                         <img width="120" class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="" src="'+src+'">';
    strHtml+='                     </div>';
    strHtml+='                     <button class="qq-upload-cancel-selector qq-upload-cancel qq-hide">X</button>';
    strHtml+='                     <button class="qq-upload-retry-selector qq-upload-retry qq-hide">';
    strHtml+='                         <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>';
    strHtml+='                 Retry';
    strHtml+='             </button>';
    strHtml+='             <div class="qq-file-info">';
    strHtml+='                 <div class="qq-file-name">';
    strHtml+='                     <span class="qq-upload-file-selector qq-upload-file">'+src+'</span>';
    strHtml+='                     <span class="qq-edit-filename-icon-selector qq-edit-filename-icon" aria-label="Edit filename"></span>';
    strHtml+='                 </div>';
    strHtml+='                 <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">';
    strHtml+='                 <span class="qq-upload-size-selector qq-upload-size">80.4kB</span>';
    strHtml+='                 <button class="qq-btn qq-upload-delete-selector qq-upload-delete qq-hide">';
    strHtml+='                     <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>';
    strHtml+='                 </button>';
    strHtml+='                 <button class="qq-btn qq-upload-pause-selector qq-upload-pause qq-hide">';
    strHtml+='                    <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>';
    strHtml+='                 </button>';
    strHtml+='                 <button class="qq-btn qq-upload-continue-selector qq-upload-continue qq-hide">';
    strHtml+='                    <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>';
    strHtml+='                 </button>';
    strHtml+='            </div>';
    strHtml += '            </li>';
    return strHtml;
}

    function clearModelImgs(fieldName) {
        if (model != null) {
            if (confirm("是否要清除所有上傳檔案?")) {
                model[fieldName] = "";
                $("#fu_imglist_" + fieldName).html("");
            }
        }
    }

    function GenFck(id, value, name, fValidate, folder, placeholder, tabNum, icon) {
        var strControl = '<!--mce:2--></script> <textarea id="' + id + '" name="' + id + '" class="ckeditor"  cols="50" rows="20">' + value + '</textarea>';
        AddContent(strControl, name, 8, tabNum, icon);
    }

    function GenLabel(id, value, name, validate, options, placeholder, tabNum, icon) {
        var strControl = "";
        var ph = "";

        if (placeholder == null)
            ph = "請輸入" + name;
        else
            ph = placeholder;
        //有選項代表要轉換值(如下拉,ID用另一張表轉成名稱)
        if (options != "") {
            var isEqual = false;
            var count = 0;
            for (var index in options) {
                if (options[index].value == value) {
                    count = index;
                    isEqual = true;
                }
            }
            //欄位值,再用option的值去轉換顯示
            if (isEqual) {
                strControl = '<label id="label_' + id + '" class="form-control" >' + options[count].text + '</label>';
            }
            else {
                strControl = '<label id="label_' + id + '" class="form-control" ></label>';
            }

        }//直接顯示欄位值
        else {
            strControl = '<label id="label_' + id + '" class="form-control"  placeholder="' + ph + '" >' + value + '</label>';
        }

        strControl += '<input id="' + id + '" type="hidden" value="' + value + '"  />';

        AddContent(strControl, name, 4, tabNum, icon);
    }

    function GenText(id, value, name, validate, options, placeholders, tabNum, icon) {
        var ph = "";
        if (placeholders == null)
            ph = "請輸入" + name;
        else
            ph = placeholders;

        var strLength = checkLengthValidate(validate, options);
        var strControl = '<input id="' + id + '" type="text" value="' + value + '" class="form-control ' + validate + '" ' + strLength + ' placeholder="' + ph + '" />';
        AddContent(strControl, name, 4, tabNum, icon);
    }

    function GenLongText(id, value, name, validate, options, placeholders, tabNum, icon) {
        var ph = "";
        if (placeholders == null)
            ph = "請輸入" + name;
        else
            ph = placeholders;
        var strLength = checkLengthValidate(validate, options);
        var strControl = '<input id="' + id + '" type="text" value="' + value + '" class="form-control ' + validate + '" ' + strLength + ' placeholder="' + ph + '" />';
        AddContent(strControl, name, 8, tabNum, icon);
    }
    function GenCheckbox(id, value, name, validate, options, placeholders, tabNum, icon) {
        var strControl = '<table style="width:100%;" ><tr>';
        var arrIDs = value.split(",");
        var count = 0;
        for (var index in options) {
            count = count + 1;
            var checked = "";
            for (var i = 0 ; i < arrIDs.length; i++) {
                if (options[index].value == arrIDs[i]) {
                    checked = "checked";
                }
            }

            strControl += '<td><input id="chk_' + options[index].value + '" type="checkbox" value="' + value + '" ' + checked + ' groupName="' + id + '" class="' + validate + ' ChkGroup_' + id + '"  />';
            strControl += '<span> ' + options[index].text + '</span></td>';
            if (index == 0) {

            }
            else {
                if (count % 5 == 0) {
                    strControl += "</tr><tr>";
                    count = 0;
                }
            }
        }
        strControl += "</tr></table>";
        AddContentWithoutIcon(strControl, name, 8, tabNum, icon);
    }


    function GenHidden(id, value, name, validate, options, placeholders, tabNum, icon) {
        var strControl = '<input id="' + id + '" type="hidden" value="' + value + '" />';
        //AddContent(strControl, name);

        if (tabNum == 0)
            $("#form_content").append(strControl);
        else
            $("#tab" + tabNum).append(strControl);
    }


    function GenPassword(id, value, name, validate, options, placeholders, tabNum, icon) {
        var ph = "";
        if (placeholders == null)
            ph = "請輸入" + name;
        else
            ph = placeholders;
        var strLength = checkLengthValidate(validate, options);
        var strControl = '<input id="' + id + '" type="password" value="' + value + '" class="form-control ' + validate + '" ' + strLength + '  placeholder="' + ph + '" />';
        AddContent(strControl, name, 4, tabNum, icon);
    }

    function GenSelect(id, value, name, validate, options, placeholders, tabNum, icon) {
        var strControl = '<select id="' + id + '"  value="' + value + '" class="form-control ' + validate + '">';
        var indexCh = false;
        for (var index in options) {
            var selected = "";
            //alert(options[index].value + "," + value + (options[index].value == value));
            //這用來排掉server Null到這裡轉成""字串,JAVASCRIPT比對0和空字串,將0轉成字串為空字串,所以等號恆成立
            if (value.length > 0) {
                if (options[index].value == value) {
                    selected = "selected";
                    indexCh = true;
                }
            }
            strControl += '<option value="' + options[index].value + '" ' + selected + '>' + options[index].text + '</option>';
        }
        strControl += "</select>";
        AddContent(strControl, name, 4, tabNum, icon);
        //若DB的值和下拉值對不上,則先給MODEL下拉的預設值
        //alert(id + "," + indexCh + "," + $("#" + id).val());
        if (indexCh == false) {
            model[id] = $("#" + id).val();
        }

    }

    function GenTime(id, value, name, validate, options_h, options_m, tabNum, icon) {

        var arr = value.split(":");
        var strControl = '<select id="' + id + '_h"  value="' + arr[0] + '" class="form-control ' + validate + '">';
        for (var h in options_h) {
            var selected = "";
            if (options_h[h] == Number(arr[0])) {
                selected = "selected";
            }
            strControl += '<option value="' + options_h[h] + '" ' + selected + '>' + options_h[h] + '</option>';
        }
        strControl += "</select>";
        strControl += '<span class="input-group-addon" style="background-color:white;border:none;">:</span>'

        strControl += '<select id="' + id + '_m"  value="' + arr[1] + '"   class="form-control" style="float:left;" >';

        for (var m in options_m) {
            var selected = "";
            //alert(options_m[m]);
            if (options_m[m] == Number(arr[1])) {
                selected = "selected";
            }
            strControl += '<option value="' + options_m[m] + '" ' + selected + '>' + options_m[m] + '</option>';
        }
        strControl += "</select>";
        AddContent(strControl, name, 4, tabNum, icon);
    }


    function GenAutocomplete(id, value, name, validate, fcount, placeholders, tabNum, icon) {
        var num = 998 - fcount;
        var strControl = '<div id="autocompleteTarget" style="z-index:' + num + ';clear:both;position:relative;top:0px;left:0px;">' +
                            '<input id="' + id + '" type="text" value="' + value + '" style="height:34px;" />' +
                        '</div>';
        AddContent(strControl, name, 8, tabNum, icon);
    }

    function GenTextarea(id, value, name, validate, options, placeholders, tabNum, icon) {
        var ph = "";
        if (placeholders == null)
            ph = "請輸入" + name;
        else
            ph = placeholders;

        var strLength = checkLengthValidate(validate, options);
        var strControl = '<textarea id="' + id + '"    class="form-control ' + validate + '" ' + strLength + ' cols="50" rows="4"  placeholder="' + ph + '">' + value + '</textarea>';
        AddContent(strControl, name, 8, tabNum, icon);

    }


    //每筆欄位的固定樣式(ROW)
    function AddContent(controler, name, controlLength, tabNum, icon) {
        if (controler.indexOf("required") > 0) {
            name = name + " <span style='color:red;'>*</span>";
        }
        if (icon.indexOf("<i") >= 0) {
        }
        else {
            icon = '<span class="'+icon+'" aria-hidden="true"></span>';
        }


        if (controlLength == null)
            controlLength = 4;
        var html = '<div class="form-group">'
            + '<div class="col-sm-2 col-sm-offset-1">'
                + '<label class=" control-label" for="nvcName">' + name + ':</label>'
           + '</div>'
            + '<div class="col-sm-' + controlLength + ' input-group">'

        + '<span class="input-group-addon">'+icon+'</span></span>'
         + controler
            + '</div>'
         + '</div>'

        if (tabNum ==0)
            $("#form_content").append(html);
        else
            $("#tab" + tabNum).append(html);
    }

    function AddContentWithoutIcon(controler, name, controlLength, tabNum) {
        if (controler.indexOf("required") > 0) {
            name = name + " <span style='color:red;'>*</span>";
        }
        if (controlLength == null)
            controlLength = 4;

        var html = '<div class="form-group">'
            + '<div class="col-sm-2 col-sm-offset-1">'
                + '<label class=" control-label" for="nvcName">' + name + ':</label>'
           + '</div>'
            + '<div class="col-sm-' + controlLength + ' input-group">'

       // + '<span class="input-group-addon"><span class="glyphicon glyphicon-font" aria-hidden="true"></span></span>'
         + controler
            + '</div>'
         + '</div>'

        if (tabNum == 0)
            $("#form_content").append(html);
        else
            $("#tab" + tabNum).append(html);
    }
    function AddLine(name,tabNum) {
        var html = '<div class="form-group">'

            + '<div style="" class="col-sm-12  input-group"><div style="padding-left:70px;;font-size:16px;font-weight:bold;color:#009FCC;line-height:0.5;padding-top:30px;">《' + name + '》<hr style="width:95%;"></div>'

            + '</div>'
         + '</div>'

        if (tabNum == 0)
            $("#form_content").append(html);
        else
            $("#tab" + tabNum).append(html);
    }


    function GetIcon(controler, name) {
        var returnValue = "";
        var icons = ['<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-tags" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>',
                     '<img src="/images/key.png" width="15" />',
                     '<span class="glyphicon glyphicon-th-large" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>',
                     '<img src="/images/calendar.png" width="15" />',
                     '<img src="/images/point.png" width="15" />',
                     '<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>',
                     '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>',
                     '<img src="/images/img.png" width="15" />',
                     '<img src="/images/money.png" width="15" />',
                      '<img src="/images/text-file-icon.png" width="15" />',
                     '<span class="glyphicon glyphicon-font" aria-hidden="true"></span>'

        ];
        var num = randomNum(0, 11);
        if (name.indexOf("手機") > -1)
            returnValue = icons[10];
        else if (name.indexOf("到期日") > -1 || name.indexOf("起始日") > -1 || name.indexOf("時間") > -1 || name.indexOf("日期") > -1 || name.indexOf("扣款日") > -1 || name.indexOf("生日") > -1 || name.indexOf("日期") > -1)
            returnValue = icons[6];
        else if (name.indexOf("mail") > -1 || name.indexOf("郵件") > -1 || name.indexOf("信件") > -1)
            returnValue = icons[8];
        else if (name.indexOf("電話") > -1)
            returnValue = icons[5];
        else if (name.indexOf("狀態") > -1 || name.indexOf("描述") > -1 || name.indexOf("內容") > -1)
            returnValue = icons[11];
        else if (name.indexOf("類別") > -1 || name.indexOf("重新入會") > -1)
            returnValue = icons[11];
        else if (name.indexOf("姓名") > -1)
            returnValue = icons[2];
        else if (name.indexOf("密碼") > -1)
            returnValue = icons[3];
        else if (name.indexOf("帳號") > -1)
            returnValue = icons[1];
        else if (name.indexOf("編號") > -1)
            returnValue = icons[0];
        else if (name.indexOf("身份證字號") > -1)
            returnValue = icons[4];
        else if (name.indexOf("顧問") > -1 || name.indexOf("聯絡人") > -1)
            returnValue = icons[2];
        else if (name.indexOf("地址") > -1 || name.indexOf("住址") > -1)
            returnValue = icons[7];
        else if (name.indexOf("照片") > -1 || name.indexOf("像片") > -1 || name.indexOf("圖片") > -1)
            returnValue = icons[12];

        else if (name.indexOf("費用") > -1 || name.indexOf("月費") > -1 || name.indexOf("金額") > -1 || name.indexOf("手續費") > -1 || name.indexOf("入會費") > -1 || name.indexOf("訂金") > -1 || name.indexOf("總額") > -1)
            returnValue = icons[13];
        else
            returnValue = icons[15];

        return returnValue;

    }

    //產生控制項
    function BulidControler(fieldParameters, tabMenuNameArray) {
        for (var p = 0 ; p < fieldParameters.length; p++) {
            var fname = fieldParameters[p].name;
            var fshow = fieldParameters[p].show;
            var fControler = fieldParameters[p].controler;
            var fValidate = fieldParameters[p].validate;
            var fOption = fieldParameters[p].option;
            var fPlaceholders = fieldParameters[p].placeholders;

            var fTabNum = 0;
            if (fieldParameters[p].tabNum != null)
                fTabNum = fieldParameters[p].tabNum;

            var fIcon = "glyphicon glyphicon-th-list";
            if (fieldParameters[p].icon != null)
                fIcon = fieldParameters[p].icon;

            var fCount = 0;
            for (var fid in model) {

                if (fieldParameters[p].dbname == fid) {

                    if (fshow == false) {
                        fCount++;
                        continue;
                    }
                    switch (fControler) {
                        case "label":
                            GenLabel(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            break;
                        case "hidden":
                            GenHidden(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddChangeEvent(fid);
                            break;
                        case "password":
                            GenPassword(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddChangeEvent(fid);
                            break;

                        case "text":
                            GenText(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddChangeEvent(fid);
                            break;

                        case "longtext":
                            GenLongText(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddChangeEvent(fid);
                            break;

                        case "select":
                            //alert(fid);
                            GenSelect(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddChangeEvent(fid);
                            break;

                        case "date":
                            GenText(fid, MVC_GetDate(model[fid]), fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);

                            $.datepicker.regional['zh-TW'] = {
                                dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                                dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
                                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                                monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                                prevText: "上月",
                                nextText: "次月",
                                weekHeader: "週"
                            };
                            $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

                            $("#" + fid).datepicker({ dateFormat: 'yy/mm/dd' });

                            AddChangeEvent(fid);
                            break;

                        case "time":
                            var arrH = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
                            var arrM = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
                            GenTime(fid, model[fid], fname, fValidate, arrH, arrM, fTabNum, fIcon);

                            AddTimeChange(fid);

                            break;
                        case "timeInterval":
                            var arrH = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
                            var arrM = ["00", "10", "20", "30", "40", "50"];
                            GenTime(fid, model[fid], fname, fValidate, arrH, arrM, fTabNum, fIcon);

                            AddTimeChange(fid);

                            break;

                        case "checkbox":
                            GenCheckbox(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddCheckboxChange(fid);
                            break;

                        case "fck":
                            GenFck(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddFckChange(fid);
                            break;
                        case "file":
                            GenFile(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            //AddFckChange(fid);
                            initUploader("fine-uploader-gallery-" + fid, fid, fOption);
                           

                            break;
                        case "autocomplete":

                            GenAutocomplete(fid, model[fid], fname, fValidate, p, fPlaceholders, fTabNum, fIcon);
                            initAutocomplete(fid, fOption);
                            break;
                        case "textarea":
                            GenTextarea(fid, model[fid], fname, fValidate, fOption, fPlaceholders, fTabNum, fIcon);
                            AddTextareaChangeEvent(fid);
                            break;

                    }
                    fCount++;
                }
            }
            if (fControler == "line") {
                AddLine(fname);
            }
        }

        if (tabMenuNameArray != null) {
            $("#bootstrap-tab-x-panel1").show();

            for (var i = 0; i < 5; i++) {
                //alert(tabMenuNameArray[i]);

                if (tabMenuNameArray[i] != null) {
                   
                    var id = "tabMenuName" + (i + 1);
                    $("#" + id).html(tabMenuNameArray[i]);
                }
                else {
                   
                    $("#tabMenu" + (i+1)).remove();
                    $("#tab" + (i+1)).remove();
                }
            }
        }

    }

    function funcDelFile(id) {
       
        if (window.confirm("是否刪除已上傳圖片")) {
            $("#fine-uploader-gallery-" + id + " .qq-upload-list-selector").html("");
            model[id] = "";
        }
    }

    function initUploader(id, fid, folder) {

       

        $('#' + id).fineUploader({
            template: 'qq-template-gallery',
            request: {
                endpoint: '/backend/api/upload/?folder='+folder
            },
            thumbnails: {
                placeholders: {
                    waitingPath: '/images/waiting-generic.png',
                    notAvailablePath: '/images/not_available-generic.png'
                }
            },
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
            },
            callbacks: {
                onComplete: function (id, name, response) {
                    var serverPathToFile = response.filePath,
                        fileItem = this.getItemByFileId(id);
                    //alert(id+","+name+","+JSON.stringify(response));
                    if (response.success) {
                        //var viewBtn = qq(fileItem).getByClass("view-btn")[0];
                        //alert(model[fid] + "," + response.name);
                        if (model[fid] != null) {
                            if (model[fid].length > 1) {
                                model[fid] += ","+ response.name;
                            }
                            else {
                                model[fid] = response.name;
                            }

                        }
                        else {
                            model[fid] = response.name;
                        }
                        //alert(model[fid]);

                        $("#oldImage").remove();
                        //viewBtn.setAttribute("href", serverPathToFile);
                        //qq(viewBtn).removeClass("hide");
                    }
                }
            }
        });
    }

    function initAutocomplete(id, options) {
        $("#" + id).tokenInput(options.ajaxUrl, {
            theme: "facebook",
            preventDuplicates: true,
            searchDelay: 2000,
            tokenLimit: options.max,

            onAdd: function (item) {
                //alert("added:" + item.id);
                //alert($("#" + id).val());
                model[id] = $("#" + id).val();
            },
            onDelete: function (item) {
                //alert("deleteed:" + item.id);
                //alert($("#" + id).val());
                //$(this).tokenInput("clearCache");
                model[id] = $("#" + id).val();
            },
            //prePopulate: [
            //           {id: 123, name: "Slurms MacKenzie"},
            //           {id: 555, name: "Bob Hoskins"},
            //           {id: 9000, name: "Kriss Akabusi"}
            //],
            onResult: function (results) {
                var noinputValue = $("#" + id).val();
                //alert(noinputValue);
                var arrInput;
                if (noinputValue.length > 0) {
                    arrInput = noinputValue.split(',');
                }
                var fresult = new Array();
                $.each(results, function (index, value) {
                    //value.name = "OMG: " + value.name;
                    var index = true;

                    //var selected = $("#" + id).tokenInput("get");
                    //alert(value.id);
                    //$.each(selected, function (index2, value2) {
                    //alert(value2.id + "=="+ value.id);
                    // if (value2.id == value.id) {
                    //     index = false;
                    // }
                    // });

                    if (arrInput != null) {
                        for (var j = 0 ; j < arrInput.length; j++) {
                            //alert(arrInput[j] + "==" + value.id);
                            if (arrInput[j] == value.id) {
                                index = false;
                                break;
                            }
                        }
                    }
                    if (index) {
                        var newitem = {};
                        newitem.name = value.name;
                        newitem.id = value.id;
                        fresult.push(newitem);
                    }
                });

                //alert(fresult.length);
                return fresult;
            }

        });

        //alert(options.data);
        if (options.data != null || options.data != "") {
            for (var i = 0; i < options.data.length; i++) {
                $("#" + id).tokenInput("add", { id: options.data[i].value, name: options.data[i].text });
            }
        }
    }
