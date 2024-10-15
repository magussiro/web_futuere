var oTable;
var page = QueryString("p");
var firstLoad = true;


/*
 * jQuery Double Tap
 * Developer: Sergey Margaritov (sergey@margaritov.net)
 * Date: 22.10.2013
 * Based on jquery documentation http://learn.jquery.com/events/event-extensions/
 */
(function($) {

    $.event.special.doubletap = {
        bindType: 'touchend',
        delegateType: 'touchend',

        handle: function(event) {
            var handleObj = event.handleObj,
                targetData = jQuery.data(event.target),
                now = new Date().getTime(),
                delta = targetData.lastTouch ? now - targetData.lastTouch : 0,
                delay = delay == null ? 300 : delay;

            if (delta < delay && delta > 30) {
                targetData.lastTouch = null;
                event.type = handleObj.origType;
                ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
                    event[property] = event.originalEvent.changedTouches[0][property];
                })

                // let jQuery handle the triggering of "doubletap" event handlers
                handleObj.handler.apply(this, arguments);
            } else {
                targetData.lastTouch = now;
            }
        }
    };

})(jQuery);

function DataTableUse(ColumnDefs, ajaxUrl, Buttons, displayOpt) {
    if (Buttons == null)
        Buttons = [];

    //預設
    var option = displayOpt;
    if (option == null) {
        option = {
            "tableID": "example",
            "firstColumnIndex": false,
            "LengthChange": false,
            "responsive": true,
            "selection": "none", //none multi single os
            "ShowHideColumn": "", //C
            "pageStyle": "full_numbers", //full_numbers ,bootstrap ellipses extStyle listbox
            "search": "", //f
            "adjustColumn": "", // dom:R
            "fixedHeader": true,
            "bPaginate": true,
            "pageInfo": "i" //要顯示就打 i,不顯示就打空字串
        };
    }

    var langageSetting = {
        "sLengthMenu": "每頁 _MENU_ 筆",
        "sInfo": "從 _START_ 到 _END_ /共 _TOTAL_ 筆",
        "sInfoEmpty": "没有資料",
        "sInfoFiltered": "(從 _MAX_ 條資料中搜尋)",
        "oPaginate": {
            "sFirst": "第一頁",
            "sPrevious": "",
            "sNext": "",
            "sLast": "最後一頁"
        },
        "sSearch": "搜尋",
        "sZeroRecords": "没有搜尋到資料",

        "sProcessing": "<img src='../assets/img/loading.gif' />"
    }

    /* Buttons.push({
         "sExtends": "collection", "sButtonText": "輸出",
         "aButtons": ["csv",
                     "xls",
                     { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "List of product." },
                     "print",
                     { "sExtends": "copy", "sButtonText": "複製" }
         ]
     }); */
    //"sDom": "Tfrtip<'row-fluid'<'span6'l>r>t<'row-fluid'<'span6'i><'span6'p>>",
    oTable = $('#' + option.tableID).dataTable({
        "iDisplayStart": 0,
        "iDisplayLength": 10,
        "lengthMenu": [
            [10, 50, 100],
            [10, 50, 100]
        ],
        "sDom": "<'row-fluid'l<'float-left'T" + option.adjustColumn + option.ShowHideColumn + ">" + option.search + "<'float-right'>r>t<'row-fluid'<'span6'" + option.pageInfo + "><'span6'p>>", //C:顯示、隱藏欄位BUTTON;R:可手動調整欄位位置;f:搜尋
        "oLanguage": langageSetting,
        "bFilter": true,
        "bInfo": true,
        "bAutoWidth": false, //這個選項，可以動態讓TABLE跟著螢幕變大,上面那個不行
        "bProcessing": true,
        "bServerSide": true,

        "bPaginate": option.bPaginate,
        "fixedHeader": option.fixedHeader, // not working
        "fnInitComplete": function(oSettings, json) { //datatable 第一次初始化
            if (oTable) {
                // var oSettings = oTable.fnSettings();
                // var iLength = oSettings._iDisplayLength;
                // oTable.fnDisplayStart(page * iLength, true);
            }
        },
        "fnDrawCallback": function(oSettings) {}, //每次DRAW完
        "sPaginationType": option.pageStyle,
        "bLengthChange": option.LengthChange,
        "responsive": option.responsive,
        "sAjaxSource": ajaxUrl,
        "aoColumnDefs": ColumnDefs,
        "fnServerData": function(sSource, aoData, fnCallback, oSettings) {

            /* Add some extra data to the sender */
            //aoData.push( { "name": "DataTableParamter", "value": $("#DataTableParamter").val() } );

            //var formData = $("#searchForm").closest('form').serializeArray();
            //formData.push({ name: $(this).attr('name'), value: $(this).val() });
            //alert(formData);
            //var x = $("form").serializeArray();
            //alert(x);
            var x = $('input').serializeArray();
            /*$.each(x, function(i, field) {
                if (field.type == 'checkbox') {
                    if (!$(this).prop('checked')) {
                        aoData.push({
                            "name": field.name,
                            "value": field.value
                        });
                    }
                } else if (field.type == 'text' || field.type == 'hidden') {
                    aoData.push({
                        "name": field.name,
                        "value": field.value
                    });
                } else {}
            });*/
            $('body input').each(function() {
                var type = $(this).attr('type');
                var name = $(this).attr('name');
                if (name != null) {
                    switch (type) {
                        case 'checkbox':
                            if ($(this).prop('checked')) {
                                aoData.push({
                                    "name": $(this).attr('name'),
                                    "value": $(this).val()
                                });
                            }
                            break;
                        case 'text':
                            aoData.push({
                                "name": $(this).attr('name'),
                                "value": $(this).val()
                            });
                            break;
                        case 'hidden':
                            aoData.push({
                                "name": $(this).attr('name'),
                                "value": $(this).val()
                            });
                            break;
                    }
                }
            });

            //下拉
            $('select').each(function() {
                if ($(this).attr('name') != null) {
                    aoData.push({
                        "name": $(this).attr('name'),
                        "value": $(this).val()
                    });
                }
            });
            //console.log(JSON.stringify(aoData));
            //alert(JSON.stringify(aoData));
            $.ajax({
                type: 'post',
                dataType: 'json', // to client
                contentType: "application/x-www-form-urlencoded;", //to server
                url: sSource,
                cache: false,
                data: aoData,
                error: function(xhr, ajaxOptions, thrownError) {

                    console.log("server msg:" + JSON.stringify(xhr));
                    console.log("msg:" + thrownError);
                    //alert(JSON.stringify(xhr) + "," + thrownError);
                    //alert("error");
                },
                success: function(json) {
                    //return JSON.parse(response);
                    fnCallback(json)
                },
                complete: function(data) {}
            });

            /*
			//alert(JSON.stringify( aoData));
			$.getJSON( sSource, aoData, function (json) { 
			//alert(JSON.stringify( aoData));
				// Do whatever additional processing you want on the callback, then tell DataTables /
				//alert(JSON.stringify( json));
				fnCallback(json)
			}).done(function(d) {
                //alert("success");
            }).fail(function(d, textStatus, error) {
			//	alert(error);
                 console.log("getJSON failed, status: " + textStatus + ", error: "+error);
            }).always(function(d) {
                //alert("complete");
            });
			*/

        },

        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //設定停用的樣式,欄位名稱統一叫showDisable =1
            if (aData.showDisable != null) {
                if (aData.showDisable == 1) {
                    $(nRow).addClass("tr_disable");
                }
            }
            $(nRow).attr("id", option.tableID + "_" + aData.intID);
            return nRow;
        },

        "fnCreatedRow": function(nRow, aData, iDataIndex) {
            if (option.firstColumnIndex == true) {
                $('td:eq(0)', nRow).html(iDataIndex + 1);
            }
        },
        "tableTools": { //自訂按鈕、單選多選
            "sRowSelect": option.selection,
            "sSwfPath": "/Content/copy_csv_xls_pdf.swf",
            "aButtons": Buttons,
            "fnRowSelected": function(node) {},
            "fnRowDeselected": function(node) {}
        }
    });

    //在TR上加上double click事件
    $('#' + option.tableID + ' tbody').on('dblclick', 'tr', function() {
        datatableDoubleClick(this, option.tableID);
    });

    $('#' + option.tableID + ' tbody').on('doubletap', 'tr', function(event) {
        datatableDoubleClick(this, option.tableID);
    });


}



//========================================================
//自訂column的RENDER回傳值
//=========================================================
//千分位
function commafy(mData, type, full, meta) {

    //alert(mData);
    mData = mData + "";
    var re = /(-?\d+)(\d{3})/
    while (re.test(mData)) {
        mData = mData.replace(re, "$1,$2")
    }
    return mData;
}


function IndexType(mData, type, full, meta) {
    return meta.row + 1;
}

function SexType(mData, type, full, meta) {
    if (mData == 1)
        return "男";
    else
        return "女";
}

function DateType(mData, type, full, meta) {
    if (mData != null) {
        return (moment(mData).format('YYYY/MM/DD'));
    } else {
        return "";
    }
}

function DateTimeType(mData, type, full, meta) {
    if (mData != null) {
        return (moment(mData).format('YYYY/MM/DD H:mm:ss'));
    } else {
        return "";
    }
}



function GetButtons(name, clickEvent) {
    var buttons = [];
    for (var i = 0; i < name.length; i++) {
        buttons.push({
            "sExtends": "text",
            "sButtonText": name[i],
            "fnClick": clickEvent[i]
        });
    }
    //buttons.push({ "sExtends": "copy", "sButtonText": "複製" });
    //buttons.push({ "sExtends": "collection", "sButtonText": "輸出", "aButtons": ["csv", "xls", { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "List of product." }, "print"] } );
    return buttons;
}

function GetColumns(db, title, visible, render, colWidth) {
    var ColumnDefs = [];

    for (var i = 0; i < db.length; i++) {
        //修正responsive 和 column.visible 同時使用時,visible會失效
        var classname = "";
        if (visible[i] == false)
            classname = "none";
        ColumnDefs.push({
            "aTargets": [i],
            "searchable": false,
            "bSortable": false,
            "bVisible": visible[i],
            "sTitle": title[i],
            "mData": db[i],
            "mRender": render[i],
            "className": classname
        });
    }


    /*if (colWidth != null) {
        for (var j = 0; j < ColumnDefs.length; j++) {
            ColumnDefs[j].width = colWidth[j];
        }
    }*/
    //console.log(ColumnDefs);

    return ColumnDefs;
}

function setCRUD_Button(addUrl, editUrl, delUrl) {
    var buttons = [{
            "sExtends": "text",
            "sButtonText": "新增",
            "fnClick": function(nButton, oConfig, Flash) {
                PopWindow(addUrl);
            }
        }, {
            "sExtends": "text",
            "sButtonText": "編輯",
            "fnClick": function(nButton, oConfig, Flash) {

                PopWindow(editUrl);
            }
        }, {
            "sExtends": "text",
            "sButtonText": "刪除",
            "fnClick": function(nButton, oConfig, Flash) {

                PopWindow(delUrl);
            }
        },

        {
            "sExtends": "copy",
            "sButtonText": "複製"
        }, {
            "sExtends": "collection",
            "sButtonText": "輸出",
            "aButtons": ["csv",
                "xls", {
                    "sExtends": "pdf",
                    "sPdfOrientation": "landscape",
                    "sPdfMessage": "List of product."
                },
                "print"
            ]
        }
    ];
    return buttons;
}

function GetWidth() {
    //取得瀏覽器畫面寬度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //取得瀏覽器畫面高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    /*nasty hack to deal with doctype swith in IE*/
    //透過深入Document内部對body進行檢測，獲取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    //结果输出至兩個文本框
    // document.form1.availHeight.value = winHeight;
    //document.form1.availWidth.value = winWidth;
    return winWidth;
}

function GetHeight() {
    //取得瀏覽器畫面寬度
    if (window.innerWidth)
        winWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        winWidth = document.body.clientWidth;
    //取得瀏覽器畫面高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    /*nasty hack to deal with doctype swith in IE*/
    //透過深入Document内部對body進行檢測，獲取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    //结果输出至兩個文本框
    //document.form1.availHeight.value = winHeight;
    //document.form1.availWidth.value = winWidth;
    return winHeight;
}


//type==1 為民國,其它為西元
function ToJavaScriptDate(value, type) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));

    //alert(moment(value).format('YYYY/MM/D H:mm:ss'));

    return (moment(value).format('YYYY/MM/D H:mm:ss'));

    var month = dt.getMonth() + 1;
    var strMonth = month.toString();
    if (strMonth.length == 1)
        strMonth = "0" + strMonth;

    var day = dt.getDate();
    var strDay = day.toString();
    if (strDay.length == 1)
        strDay = "0" + strDay;

    var strYear = dt.getFullYear();

    if (type == 1)
        strYear = strYear - 1911;

    return strYear + "/" + strMonth + "/" + strDay;
}

function getID(tableID) {

    if (tableID == null)
        tableID = "example";

    var oTable = $("#" + tableID).dataTable();
    var rows = oTable.api().rows('.selected').data();
    var id = "";
    for (var i = 0; i < rows.length; i++) {
        id = rows[i]["intID"];
    }

    return id;
    //var oTable = $("#example").dataTable();
    // alert(oTable.api().rows('.selected').data().length + ' row(s) selected' + );
    //return arrSelected[arrSelected.length - 1].intID;

    //var rows = oTable.api().rows('.selected').data();
    //alert(rows[0]["intID"]);

}

//是否已選取
function Selected(tableID) {
    //alert("");
    if (tableID == null || tableID == "undefined")
        tableID = "example";
    var oTable = $("#" + tableID).dataTable();

    if (oTable.api().rows('.selected').data().length == 0) {
        alert("請選擇一筆資料");
        return false;
    } else {
        return true;
    }
}

//tr停用樣式
function addDisableStyle(tableID) {
    alert("111");
    if (tableID == null || tableID == "undefined")
        tableID = "example";
    var oTable = $("#" + tableID).dataTable();

    oTable.api().rows('.selected').data().addClass("tr_disable");

}

function getSelectIDs(tableID) {
    if (tableID == null)
        tableID = "example";


    var oTable = $("#" + tableID).dataTable();

    var allIDs = "";
    var rows = oTable.api().rows('.selected').data();
    for (var i = 0; i < rows.length; i++) {
        allIDs = allIDs + rows[i]["intID"] + ",";
    }

    if (allIDs.length > 0)
        allIDs = allIDs.substr(0, allIDs.length - 1);


    return allIDs;
}

//function GetSelectedRow() {
//    var row;
//    $('.DTTT_selected').each(function () {
//        var iPos = oTable.fnGetPosition(this);
//        if (iPos != null) {
//            var aData = oTable.fnGetData(iPos);
//            //alert(typeof (aData));
//            row = aData;
//            return;
//        }
//    });
//    return row;
//}



//移除陣列中某一個物件(將KEY不同的丟到新陣列,再將新陣列移回舊陣列,也就是刪KEY相同的物件)
function removeArr(arr, key) {
    var tempData = [];
    for (var index = 0; index < arr.length; index++) {
        if (arr[index]["intID"] != key) {
            tempData.push(arr[index]);
        }
    }
    arr = tempData;
    return arr;
}

function reload(tableID) {
    if (tableID == null)
        tableID = "example";
    var oTable = $("#" + tableID).dataTable();
    if (oTable) {
        // var oSettings = oTable.fnSettings();
        // var iStart = oSettings._iDisplayStart;
        //var iLength = oSettings._iDisplayLength;
        //oTable.fnDraw();
        //oTable.fnDisplayStart(iStart);
        oTable.fnStandingRedraw();
    }
}
//畫面上條件變更時，頁數改回第一頁，以免畫面上看不到資料(其實是停留在第N頁)
function reloadToFirst(tableID) {
    if (tableID == null)
        tableID = "example";
    var oTable = $("#" + tableID).dataTable();

    if (oTable) {
        var oSettings = oTable.fnSettings();
        oSettings._iDisplayStart = 0;
        //var iLength = oSettings._iDisplayLength;
        //oTable.fnDraw();
        //oTable.fnDisplayStart(iStart);
        oTable.fnStandingRedraw();
    }
}

function close() {
    //$.colorbox.close();
    $("#tallModal").modal('hide');
    $("#delModal").modal('hide');
}


//DataTable API

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
    return {
        "iStart": oSettings._iDisplayStart,
        "iEnd": oSettings.fnDisplayEnd(),
        "iLength": oSettings._iDisplayLength,
        "iTotal": oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage": Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages": Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
};



//跳到指定筆數
jQuery.fn.dataTableExt.oApi.fnDisplayStart = function(oSettings, iStart, bRedraw) {
    if (typeof bRedraw == 'undefined') {
        bRedraw = true;
    }
    oSettings._iDisplayStart = iStart;
    if (oSettings.oApi._fnCalculateEnd) {
        oSettings.oApi._fnCalculateEnd(oSettings);
    }
    if (bRedraw) {
        oSettings.oApi._fnDraw(oSettings);
    }
};

//不回第一頁的redraw
$.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {

    if (oSettings != null) {
        var before = oSettings._iDisplayStart;

        //redraw to account for filtering and sorting
        oSettings.oApi._fnReDraw(oSettings);

        //iDisplayStart has been reset to zero - so lets change it back
        oSettings._iDisplayStart = before;

        oSettings.oApi._fnCalculateEnd(oSettings);

        //draw the page for the new page
        oSettings.oApi._fnDraw(oSettings);
    }
};

//下拉的分頁
$.fn.dataTableExt.oPagination.listbox = {
    /*
     * Function: oPagination.listbox.fnInit
     * Purpose:  Initalise dom elements required for pagination with listbox input
     * Returns:  -
     * Inputs:   object:oSettings - dataTables settings object
     *             node:nPaging - the DIV which contains this pagination control
     *             function:fnCallbackDraw - draw function which must be called on update
     */
    "fnInit": function(oSettings, nPaging, fnCallbackDraw) {
        var nInput = document.createElement('select');
        var nPage = document.createElement('span');
        var nOf = document.createElement('span');
        nOf.className = "paginate_of";
        nPage.className = "paginate_page";
        if (oSettings.sTableId !== '') {
            nPaging.setAttribute('id', oSettings.sTableId + '_paginate');
        }
        nInput.style.display = "inline";
        nPage.innerHTML = "第 ";
        nPaging.appendChild(nPage);
        nPaging.appendChild(nInput);
        nPaging.appendChild(nOf);
        $(nInput).change(function(e) { // Set DataTables page property and redraw the grid on listbox change event.
            window.scroll(0, 0); //scroll to top of page
            if (this.value === "" || this.value.match(/[^0-9]/)) { /* Nothing entered or non-numeric character */
                return;
            }
            var iNewStart = oSettings._iDisplayLength * (this.value - 1);
            if (iNewStart > oSettings.fnRecordsDisplay()) { /* Display overrun */
                oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
                fnCallbackDraw(oSettings);
                return;
            }
            oSettings._iDisplayStart = iNewStart;
            fnCallbackDraw(oSettings);
        }); /* Take the brutal approach to cancelling text selection */
        $('span', nPaging).bind('mousedown', function() {
            return false;
        });
        $('span', nPaging).bind('selectstart', function() {
            return false;
        });
    },

    /*
     * Function: oPagination.listbox.fnUpdate
     * Purpose:  Update the listbox element
     * Returns:  -
     * Inputs:   object:oSettings - dataTables settings object
     *             function:fnCallbackDraw - draw function which must be called on update
     */
    "fnUpdate": function(oSettings, fnCallbackDraw) {
        if (!oSettings.aanFeatures.p) {
            return;
        }
        var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
        var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1; /* Loop over each instance of the pager */
        var an = oSettings.aanFeatures.p;
        for (var i = 0, iLen = an.length; i < iLen; i++) {
            var spans = an[i].getElementsByTagName('span');
            var inputs = an[i].getElementsByTagName('select');
            var elSel = inputs[0];
            if (elSel.options.length != iPages) {
                elSel.options.length = 0; //clear the listbox contents
                for (var j = 0; j < iPages; j++) { //add the pages
                    var oOption = document.createElement('option');
                    oOption.text = j + 1;
                    oOption.value = j + 1;
                    try {
                        elSel.add(oOption, null); // standards compliant; doesn't work in IE
                    } catch (ex) {
                        elSel.add(oOption); // IE only
                    }
                }
                spans[1].innerHTML = "&nbsp;/&nbsp;" + iPages + "&nbsp;頁";
            }
            elSel.value = iCurrentPage;
        }
    }
};