/////var wsUri = "ws://202.55.227.39:8002";
// 'ws://www.christophe.tw:9111/websocket/server2.php';

//==========packet id ,暫時註解
    var sdCache = new SourceDataCache();
//
//
// //
    setTimeout(initShowSourceData,500);
    function initShowSourceData (){
        setInterval("sdCache.checkHashIntegrity()", 100);
        setInterval("sdCache.prepareShowData()", 200);
    }
// =======end
var token = '';
document.write("<script type='text/javascript' src='https://rawgit.com/kawanet/msgpack-lite/master/dist/msgpack.min.js'></script>");

var neg_money = 0;
var max_win = 0;
var pop_status_trigger = false;
var ori_user_money = 0;
var last_receive_time = 0;
var user_product = [];
//判斷現在選取的 product_code
var selectedProduct = '';
var price_no = '';
var nowSelectedPrice = 0;
var lastestProduct = {};
//量價分佈
var selected_product_open_price = 0;
var selected_product_close_price = 0;
var selected_product_total = 0; //
var centerHeight = 0; //計算量價分佈，element的實際高
var btn_flag = 0;
var user_status = 1;

var userProductMap = {};
//設定trigger
var sendUpdateProfit = false;
//var user_account = '';


//記錄最後五檔報價
var lastestFivePrice = {};

var price_amount_timer;
var now_selected_show_list = '';

//判斷是不是要出現倉按鈕
var storing = new Array();
var kicked = false;

//websocket
var ws = BuildWebSocket();

//顏色
// var green = '#55DF56';
var green = '#01b72c';
var red = '#eb6b61';
var blue = '#66d9ff';

//650 記錄server的訂單
var oList1 =[], oList2 =[], oList3=[], uConfig, uProduct;

//控制訂單列表，button是不是有作用
var diableAllButton = false;
var logined = false;

var isClosed = false;
var isNotFirstTime = false;

var ctlId =null;

function initUserStatus() {
    // 初始化使用者狀態
    var old_select = _getCookie("selectProduct");
    if(old_select !== undefined){
        selectProduct(old_select);
    }
}
//當頁面載入完成
$(document).ready(function () {


    setTimeout("initUserStatus()",300)





    $("#btn_muted").click(function (e) {
        if ($(this).find('i').hasClass('fa-bell-o')) {
            sound_player.muted = true;
            mini_player.muted = true;
        } else {
            sound_player.muted = false;
            mini_player.muted = false;
        }
        $(this).find('i').toggleClass('fa-bell-o fa-bell-slash-o');

        e.preventDefault();
    });
    //套音效
    $("a ,.hasMidi")
            .on("mouseover", function () {
                call_midi(1);
            })
            .on("click", function () {
                call_midi(2);
            });

    //$('.tb_list').fixedHeaderTable({ footer: false, cloneHeadToFoot: false, fixedColumn: false });
    //建立web socket

    //投顧訊息 時間
    $('#advicer_sdate').val(moment().format('YYYY-MM-DD'));
    $('#advicer_edate').val(moment().format('YYYY-MM-DD'));


    $('#amount').change(function () {
        var ob;
        ob = $(this);
        if (parseInt(ob.val()) < 1)
            ob.val(1);
        if (ob.val() % 1 !== 0)
            ob.val(parseInt(ob.val()));
    });

    $(".modal-dialog").draggable();
    dialog_position();

    $("#marquee3").marquee();

    $('#chk_list1_unoffset').click(function () {
        refresh();
    });

    $('#orderList1_con').click(function () {
        refresh();
    });

    $('#chkShowAllProduct').click(function () {
        refresh();
    });

    //設定日期欄位：
    $('#advicer_sdate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true});
    $('#advicer_edate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true});

    $('#bill_sdate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, minDate: -60, maxDate: 0, todayHighlight: true});
    $('#bill_edate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, minDate: -60, maxDate: 0, todayHighlight: true});
    $('#po_sdate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, minDate: -60, maxDate: 0, todayHighlight: true});
    $('#po_edate').datepicker({dateFormat: 'yy-mm-dd', autoclose: true, minDate: -60, maxDate: 0, todayHighlight: true});
    var loading = '<img style="margin-left:120px;margin-top:50px;" src="' + webroot + '/assets/img/loading2.gif" width="20" />';
    if (selectedProduct == '') {
        $('#price_amount_list').html('<div style="color:white;text-align:center;padding-top:100px;">請選擇商品</div>');
    } else {
        $('#price_amount_list').html(loading);
    }
    //===========================================
    //初始化 datatable －投顧訊息
    //===========================================
    var source = 'operation/loadAdvicerList?token=' + QueryString('token');
    var dbName = ["id", 'type', 'create_date', "name", "msg"];
    var title = ["ID", '類別', "發佈時間", "老師", "訊息內容"];
    var visible = [false, true, true, true, true];
    var render = [null, null, null, null, null];
    var ColumnDefs = GetColumns(dbName, title, visible, render);


    //預設
    var option = {
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
        "bPaginate": false,
        "pageInfo": 'i' //要顯示就打 i,不顯示就打空字串
    };
    DataTableUse(ColumnDefs, source, null, option);

    //===========================================
    //初始化 datatable －帳單
    //===========================================
    var option2 = {
        "tableID": "tb2",
        "firstColumnIndex": false,
        "LengthChange": false,
        "responsive": false,
        "selection": "none", //none multi single os
        "ShowHideColumn": "", //C
        "pageStyle": "full_numbers", //full_numbers ,bootstrap ellipses extStyle listbox
        "search": "", //f
        "adjustColumn": "", // dom:R
        "fixedHeader": true,
        "bPaginate": true,
        "pageInfo": 'i' //要顯示就打 i,不顯示就打空字串
    };

    //設定資料欄位
    var source = 'operation/loadBillList?token=' + QueryString('token');
    var dbName = ["id", 'date', "default_money", "user_money", 'total_profit', "total_amount", "money", "adj_money", "max_win", "pay_money_range", "total_profit"];
    var title = ["ID", "日期", '預設額度', "帳戶餘額", "今日損益", "口數", "留倉預扣", "極輸", "極贏", "對匯額度", "交收"];
    var visible = [false, true, true, true, true, true, true, true, true, true, true];
    var render = [null, DateType, null, UserMoney, null, null, null, null, null, null, UserBill];
    var ColumnDefs = GetColumns(dbName, title, visible, render);
    DataTableUse(ColumnDefs, source, null, option2);

    //===========================================
    //初始化 datatable －對帳表
    //===========================================
    var option7 = {
        "tableID": "tb7",
        "firstColumnIndex": false,
        "LengthChange": false,
        "responsive": false,
        "selection": "none", //none multi single os
        "ShowHideColumn": "", //C
        "pageStyle": "full_numbers", //full_numbers ,bootstrap ellipses extStyle listbox
        "search": "", //f
        "adjustColumn": "", // dom:R
        "fixedHeader": true,
        "bPaginate": true,
        "pageInfo": 'i' //要顯示就打 i,不顯示就打空字串
    };

    //設定資料欄位
    var source = 'operation/userReport?token=' + QueryString('token');
    var dbName = ["name", 'create_date', 'default_money', "user_money", "profit", "order_amount", "preserve_money", "bill_range_money", "account"];
    var title = ["名稱", "交收日期", '預設額度', '當下餘額', "損益", "總口數", "留倉預扣", "對匯額度", "差額"];
    var visible = [true, true, true, true, true, true, true, true, true];
    var render = [null, DateType, UserMoneyForPO, null, null, null, null, null, bill_money_for_po];
    var ColumnDefs = GetColumns(dbName, title, visible, render);
    DataTableUse(ColumnDefs, source, null, option7);


    // #option5 - calculate td width
    for (var n = 1; n < 10; n++) {
        $("#option5 table tbody tr td:nth-child(" + n + ")").css("width", $("#option5 table thead tr th:nth-child(" + n + ")").width() + "px");
    }

    // #option6 - calculate td width
    for (var n = 1; n < 10; n++) {
        $("#option6 table tbody tr td:nth-child(" + n + ")").css("width", $("#option6 table thead tr th:nth-child(" + n + ")").width() + "px");
    }
    // #option7 - calculate td width
    for (var n = 1; n < 10; n++) {
        $("#option7 table tbody tr td:nth-child(" + n + ")").css("width", $("#option7 table thead tr th:nth-child(" + n + ")").width() + "px");
    }
    function blank_column(data) {
        return "";
    }

    function UserMoney(data, meta, row)
    {
        var _money = 0;

        _money = parseInt(data) + parseInt(row.total_profit) + parseInt(row.money) + parseInt(row.max_win) + parseInt(row.adj_money);


        return _money;
    }
    function UserBill(data, meta, row)
    {
        var _user_bill = 0;
        _user_bill = parseInt(data) + parseInt(row.max_win) + parseInt(row.adj_money);
        return _user_bill;
    }
    function UserMoneyForPO(data, meta, row)
    {
        // console.log("UserMoneyForPO"+row.total_profit);

        var _money = 0;
        _money = data - row.total_profit;
        return _money;
    }
    function bill_money_for_po(data, meta, row)
    {
        // 差額。要改為結算當下的 差額 = 帳戶餘額 - 預設額度 + 留倉預扣
        // var money = (row.default_money) - row.user_money;
        var money = Number(row.user_money) - Number(row.default_money) + Number(row.preserve_money);
        //   console.log("bill_money_for_po"+money);
        return money;

    }


    //============================================
    //各button click事件
    //============================================
    //量價分佈
    $("#price_amount").click(function () {
        now_selected_show_list = "price_amount";
        ajaxLoad_price_amount();
    });

    //分價揭示
    $('#butFivePrice').click(function () {
        now_selected_show_list = 'five_price';
    });

    //五檔揭示
    $('#butEachPrice').click(function () {
        now_selected_show_list = 'each_price';

        //判斷有沒有price_no,沒有的話就重抓
        if (!price_no)
            price_no = $(".is_selected").find('.price_no').val();

        //將五檔報價的資料載入
        var fivePrice = lastestFivePrice[price_no];
        updateFivePrice(fivePrice);
    });

    $('#butSearch_advicer').click(function () {

        searchAdvicer();
    });

    $('#butBillSearch').click(function () {
        searchBill();
    });
    $('#butPOSearch').click(function () {
        searchMatchPO();
    });

    $('#butPopTeacher').click(function () {
        //popwin('popup/advicerList',800,600);
        //$('#divTeacherList').colorbox({'inline':true,'width':"50%"});
        $.colorbox({inline: true, href: "#divTeacherList", width: '50%', height: '50%'});
    });

    //一鍵全平
    /*$('#butStoreAll').click(function(){
     var obj = ajaxSave({'code':'\''+selectedProduct+'\''},'operation/storeAll' );
     //alert(selectedProduct);
     obj.success(function (res) {
     if(res.msg='success')
     {
     alertify.success('訂單處理中');
     }
     else {
     alertify.error(res.msg);
     }
     
     });
     
     });*/



    //量價分佈 歷史
    $('#but_amount_price').click(function () {
        popwin('popup/amount_price?code=' + selectedProduct, 800, 600);
    });


    //選擇老師popup，按確定
    $('#but_tcEnter').click(function () {
        reload('example');
        close();
    });
    //選擇老師popup，按取消
    $('#but_tcCancel').click(function () {
        close();
    });

    //未平倉列表，全選按鈕
    $('#list2_chk_select_all').click(function () {
        if ($(this).prop('checked')) {
            $('.chkList2').each(function () {
                if ($(this).css('display') == 'none') {
                    $(this).prop('checked', false);
//                        continue;
                } else {
                    $(this).prop('checked', true);
                }
            });
        } else {
            $('.chkList2').each(function () {
                $(this).prop('checked', false);
            });

        }
    });




    //後台下單畫面調整
    var isAdmin = QueryString("admin");
    if (isAdmin != "") {
        $("#header").hide();
        $("#left_cont").hide();
        $(".right_top").css("height", "200px");
        $("#divTime").hide();

        $("#li_head_option_result5").hide();
        $("#li_head_option_result6").hide();
        $("option5").hide();
        $("option6").hide();

        $('.right_top').css('height', '200px');
        $('.right_top').css('overflow-y', 'auto');
        $('header').hide();

        //style="height:200px;overflow-y:auto;"
    }


    $("#bt1").click(function () {
        $("#amount").val(1);
    });
    $("#bt2").click(function () {
        $("#amount").val(2);
    });
    $("#bt3").click(function () {
        $("#amount").val(3);
    });
    $("#bt4").click(function () {
        $("#amount").val(4);
    });
    $("#bt5").click(function () {
        $("#amount").val(5);
    });


    //===============================================================
    //--------------一進頁面，從DB中初始化產品項目-----------------------           
    //===============================================================

    //將各商品(除TS)套入click事件
    $('.productItem:not(#TS)').click(function () {
        var code = $(this).attr('id');
        selectProduct(code);
        _setCookie("selectProduct",code);
    });
    // // //紀錄目前的TAB
    // $('.head_option_result').click(function () {
    //     var code = $(this).find("a").attr('href');
    //     _setCookie("selectTab",code);
    // });


    //點擊下單不確認
    $('#not_confirm').click(function () {
        var chk = $(this).prop('checked');
        //送出指令格式
        var serv_cmd = {};
        serv_cmd.token = QueryString('token');
        serv_cmd.cmd = 'change_confirm';
        serv_cmd.data = {
            "product_code": selectedProduct,
            "checked": chk
        };
        doSend(JSON.stringify(serv_cmd));
    });


    //商品統計列表，顯示全部
    $('#chkShowAllProduct').click(function () {
        if ($(this).prop('checked')) {

        }
    });

    //手動送出命令
    $('#butCmd').click(function () {
        var command = $('#txtCmd').val();
        doSend(command);
    });

    //買多
    $('#butBuy_up').click(function () {
        if (btn_flag == 0) {
            sendCmd('up');
            //console.log(btn_flag);
            btn_flag = 1;
            setTimeout('setcoldtime()', 1000);
        } else if (btn_flag == 1) {
            //console.log(btn_flag); 
        }

    });

    //買空
    $('#butBuy_down').click(function () {
        if (btn_flag == 0) {
            sendCmd('down');
            //console.log(btn_flag);
            btn_flag = 1;
            setTimeout('setcoldtime()', 1000);
        } else if (btn_flag == 1) {
            //console.log(btn_flag);
        }
    });


    //在挑選市價單或限價單時，要產生的控制項
    $(".type").click(function (e) {
        var sel_option = parseInt($(this).val());     //選擇下單類型

        $("#div_menu_speed").show();        //停損利區塊顯示
        $('#li_limitPrice').hide();         //限價區塊隱藏
        $("#stop_up,#stop_down").prop("readonly", false).val(0);     //停損利欄位歸零

        //特殊單處理
        switch (sel_option)
        {
            case 3 : //收盤
                $('#stop_up,#stop_down').prop("readonly", true);
                $("#div_menu_speed").hide();
                break;
            case 4 : //限價
                var obj = lastestProduct[selectedProduct];

                $('#li_limitPrice').show();
                $('#txtLimitPrice').val(obj['new_price']);
                break;
        }

        //檢查使用者設定
        var user_setting = uProduct;

        for (var i in user_setting) {
            if (user_setting[i].product_code == selectedProduct) {
                var vis_profit = true;
                switch (sel_option) {
                    case 1 : //批分單
                        if (user_setting[i].show_order_minute_price_profit == 0)
                            vis_profit = false;
                        break;
                    case 2 : //市價單
                        if (user_setting[i].show_order_market_price_profit == 0)
                            vis_profit = false;
                        break;
                    case 3 : //收盤單
                        vis_profit = false;
                        break;
                    case 4 : //限價單
                        if (user_setting[i].show_order_limit_price_profit == 0)
                            vis_profit = false;
                        break;
                }

                if (!vis_profit) {
                    $('#stop_up,#stop_down').prop("readonly", true);
                    $("#div_menu_speed").hide();
                }
                break;
            }
        }
    });

    //限價單按鈕
    $('#butLimitPrice').click(function () {
        var obj = lastestProduct[selectedProduct];
        $('#txtLimitPrice').val(obj['new_price']);
    });

    //限價單+
    $('#plus').click(function () {
        var price = $('#txtLimitPrice').val();
        price = Number(price) + 1;
        $('#txtLimitPrice').val(price);
    });
    //限價單-
    $('#mins').click(function () {
        var price = $('#txtLimitPrice').val();
        price = Number(price) - 1;
        $('#txtLimitPrice').val(price);
    });

    //電雷單
    $('#fast_order').click(function () {
        $('#div_menu_speed').hide();
        //$('#div_menu_amount').hide();
        $('#div_order_type').hide();
        $('#butStoreAll').prop("disabled", true);
        $('#fast_info').show();
    });
    //一般單
    $('#normal_order').click(function () {
        $('#div_menu_speed').show();
        //$('#div_menu_amount').show();
        if ($('.type:checked').val() == 3)
            $("#div_menu_speed").hide();
        $('#div_order_type').show();
        $('#butStoreAll').prop("disabled", false);
        $('#fast_info').hide();
    });

    //限價單成交提示，click
    $('#limitOrderMsg').click(function () {
        var chkV = $(this).prop('checked');
        //送出指令格式
        var serv_cmd = {};
        serv_cmd.token = QueryString('token');
        serv_cmd.cmd = 'change_limit_order_msg';
        serv_cmd.data = {
            "product_code": selectedProduct,
            "checked": chkV
        };
        doSend(JSON.stringify(serv_cmd));
    });


    //全部商品 － 刪單button
    $('#butDelAll_close_limit').click(function () {
        if (window.confirm('確定刪除所有未成交的收盤單和限價單?')) {
            //var chkV = $(this).prop('checked');
            var serv_cmd = {};
            serv_cmd.token = QueryString('token');
            serv_cmd.cmd = 'clear_close_limit_order';
            serv_cmd.data = {};
            doSend(JSON.stringify(serv_cmd));
        }

    });
    updateToken();
    get_order();
    setInterval(updateToken, 30000);
    setInterval(get_order,1000);
    //keepAlive();
    /*
     setInterval(updateOrderList, 500);
     
     setInterval(keepAlive, 3000);
     
     setInterval(checkAdviceCount, 1000);
     */
    // var oTable = $("#example").dataTable();
    //alert(oTable.fnSettings().fnRecordsTotal());
    //var rowCount = $('table#example tr:last').index() + 1;
    //alert(rowCount);


    //alert(rowCount);
    //alert(table.fnSettings().fnRecordsDisplay());
    /*if (!table.data().count()) {
     alert('Empty table');
     } else {
     alert(table.data().count());
     }*/
    //預選TX
});
function setcoldtime() {
    btn_flag = 0;
}

function waitSelectDefaultProduct()
{
    var ob;
    //取出productItem有顯示的
    $(".productItem:visible").each(function (i, e) {
        ob = $(this).attr("id");
        if (ob != "TS")
            return false;   //有抓到ID就跳出each迴圈(加權期除外)
    });

    selectProduct(ob);
}

function checkAdviceCount() {
    //計算投顧訊息數量
    var rowCount = $('#example tr').length;

    var text = $('#example tr td').first().html();

    rowCount = rowCount - 1;

    if (text.indexOf('搜尋到資料') >= 0) {
        rowCount = 0;
        //console.log('11');
    } else {
        //console.log('2');
    }
    //console.log("'" + text + "'");
    $('#advice_count').html(rowCount);
}

// <!-- document.ready 結尾 -->
//每10秒，定時回傳訊息，代表client一直有反應  //送出指令格式
function keepAlive() {
    //console.log('keep alive.');
    var serv_cmd = {};
    serv_cmd.token = QueryString('token');
    serv_cmd.cmd = "keepAlive";
    serv_cmd.data = '';
    doSend(JSON.stringify(serv_cmd));
}
//每5秒更新資訊
function refreshUser() {
    var serv_cmd = {};
    serv_cmd.token = QueryString('token');
    serv_cmd.cmd = "refreshUser";
    serv_cmd.data = '';
    doSend(JSON.stringify(serv_cmd));
}

//每秒重整頁面損益
function updateOrderList() {
    //console.log('trigger by timer');
    //orderList1(oList1, uProduct);
    orderList2(oList2, uProduct, oList3);
    orderList3(oList3);
    orderList4(oList2, oList3, uConfig);
}

function getAdminTag() {
    //取網址參數
    $.UrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    var isadmin = '';
    isadmin = $.UrlParam("admin");
    if ($.UrlParam("admin") == null)
        isadmin = '0';
    return isadmin;
}

//=======================================
//--------------使用者下單----------------
//======================================
function sendCmd(up_down) {
//        console.log('送出下單命令' + up_down);

    var serArray = $("form").serializeArray();
    var cmd = {};
    var tmp_amount;

    for (var i = 0; i < serArray.length; i++) {
        cmd[serArray[i].name] = serArray[i].value;
    }

    var strStatus = $('#' + cmd.now_product_code).find('.status').html();
    //console.log(strStatus);
    //console.log('做完抓表單資料' + serArray);
    /*if (strStatus == '參考用' || strStatus == '未開盤') {
     alertify.error("未開盤");
     return false;
     }*/
    //取網址參數
    $.UrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
    /*
     var isadmin = '' ;
     isadmin = $.UrlParam("admin");
     if($.UrlParam("admin") == null) isadmin = '';
     */
    cmd.isadmin = getAdminTag();
    if (selectedProduct == '') {
        alertify.error("請選擇商品");
        return false;
    }

    //選雷電單時，自動改成市價單
    if ($('#fast_order').prop('checked')) {
        cmd.type = 2;
    }

    if (cmd.amount == '') {
        alertify.error("請輸入欲購買口數");
        return false;
    }

    if (isNaN(cmd.amount)) {
        alertify.error("口數必需為數字");
        return false;
    }

    tmp_amount = parseInt(cmd.amount);
    if (tmp_amount < 1) {
        alertify.error('口數最少必需輸入1口');
        return false;
    }

    if (cmd.amount % 1 !== 0) {
        $('#amount').val(tmp_amount);
        cmd.amount = tmp_amount;
    }


    if (cmd.type == 3 && $('#chkClose').prop('checked') == true) {
        alertify.error("收盤全平，不允許下收盤單");
        return false;
    }
    //console.log('檢查完必填');


    //抓取便用者後台設定的 停利需，停損需
    var setting_upLimit = 0;
    var setting_downLimit = 0;
    user_product = uProduct;
    for (var u = 0; u < user_product.length; u++) {
        if (user_product[u].product_code == selectedProduct) {
            setting_upLimit = user_product[u].stop_profit;
            setting_downLimit = user_product[u].stop_loss;
        }
    }
    var _stop_up = parseInt(cmd.stop_up);
    var _stop_down = parseInt(cmd.stop_down);
    if (_stop_up < 0)
    {
        alertify.error(" 停利不能小於0點 ");
    }
    if (_stop_up < 0)
    {
        alertify.error("停損不能小於0點");
    }
    if (cmd.stop_up != '' && _stop_up > 0) {
        if (_stop_up < setting_upLimit) {
            alertify.error("停利不能小於" + setting_upLimit + "點");
            return false;
        }
    }

    if (cmd.stop_down != '' && _stop_down > 0) {
        if (_stop_down < setting_downLimit) {
            alertify.error("停損不能小於" + setting_downLimit + "點");
            return false;
        }
    }


    //判斷都過了來延遲下單

    //設定延遲時間
    var limit_sec = 0;

    // var prod = getUserProduct(cmd.now_product_code);

    //107 0227 delay時間改由後端做
    // if (cmd.type == 2) {
    //
    //     limit_sec = prod.order_market_price_second;
    // } else if (cmd.type == 4) {
    //     limit_sec = prod.order_limit_price_second;
    // }
    // console.log("limit_sec" + limit_sec);
    var sertime = $('#serverTime').html();

    // sertime = plusTime(sertime, limit_sec);

    // console.log("prepare send order");
    // console.log(limit_sec * 1000);

    var obj = lastestProduct[selectedProduct];
    var price_code = $('#' + cmd.now_product_code).attr('price_code');

    //確認視窗
    var strUpDown = '';
    if (up_down == 'up') {
        strUpDown = '多';
    } else {
        strUpDown = '空';
    }
    var strType = '';
    switch (cmd.type) {
        case '1':
            strType = '批分';
            break;
        case '2':
            strType = '市價';
            break;
        case '3':
            strType = '收盤';
            break;
        case '4':
            strType = '限價';
            break;
    }


    if ($('#not_confirm').prop('checked')) {
            prepareSendCmd(sertime, up_down, cmd,price_code,obj);
        // setTimeout(function () {
        //     prepareSendCmd(sertime, up_down, cmd,price_code,obj);
        // }, limit_sec * 1000);
    }else{
        var obj = lastestProduct[selectedProduct];

        var alertifyMsg = obj.name + '買' + strUpDown + ' ' + cmd.amount + '口 ' + strType + '單，是否送出訂單？';
        alertify.set({labels: {ok: "確認", cancel: "取消"}});
        alertify.confirm(alertifyMsg, function (e) {
            if (e) {
                var sertime = $('#serverTime').html();
                // sertime = plusTime(sertime, limit_sec);
                prepareSendCmd(sertime, up_down, cmd,price_code,obj);
                // setTimeout(function () {
                //     prepareSendCmd(sertime, up_down, cmd,price_code,obj);
                // }, limit_sec * 1000);
            } else {
                return false;
            }
        });

    }



}
function prepareSendCmd(sertime, up_down, cmd,price_code,obj) {

    console.log("doing send order");
    //console.log('檢查完停利需');

    /*
     //下單不確認
     if ($('#not_confirm').prop('checked')) {} else {
     if (window.confirm(obj.name + '買' + strUpDown + ' ' + cmd.amount + '口 ' + strType + '單，是否送出訂單？')) {
     serv_cmd.data = {
     "action_time":sertime
     };
     } else {
     return false;
     }
     }*/

    //送出指令格式
    //移動至之前初始化
    // sertime= plusTime(sertime, 0);

    var serv_cmd = {};
    if (cmd.type == 3) {
        serv_cmd.cmd = 'closeOrder';
    } else {
        serv_cmd.cmd = 'preOrder';



        // setTimeout();

    }
    // alert(cmd.order_speed);

    //var sertime = $('#serverTime').html();
    serv_cmd.token = QueryString('token');
    /*
     serv_cmd.data = {
     "product_code": cmd.now_product_code,
     "price_code": price_code,
     "up_down": up_down,
     "amount": cmd.amount,
     "delay": cmd.delay,
     "order_speed": cmd.order_speed,
     "type": cmd.type,
     //            "now_price": obj.buy_1_price,
     "now_price": obj.new_price,
     "limitPrice": cmd.limitPrice,
     "up_limit": cmd.stop_up,
     "down_limit": cmd.stop_down,
     "is_admin":cmd.isadmin
     //"action_time":sertime
     };*/
    //      console.log(JSON.stringify(serv_cmd));
    //下單不確認
    //調整流程,避免 alertify.confirm 非同步處理仍會送出
    // if ($('#not_confirm').prop('checked')) {

        serv_cmd.data = {
            "product_code": cmd.now_product_code,
            "price_code": price_code,
            "up_down": up_down,
            "amount": cmd.amount,
            "delay": cmd.delay,
            "order_speed": cmd.order_speed,
            "type": cmd.type,
            "now_price": obj.new_price,
            "limitPrice": cmd.limitPrice,
            "up_limit": cmd.stop_up,
            "down_limit": cmd.stop_down,
            "is_admin": cmd.isadmin,
            "action_time": sertime
        };
        alertify.success('已送出訂單，請稍候');
        doSend(JSON.stringify(serv_cmd));
        $('#amount').val('1');
    // } else {
    //     var alertifyMsg = obj.name + '買' + strUpDown + ' ' + cmd.amount + '口 ' + strType + '單，是否送出訂單？';
    //
    //     alertify.set({labels: {ok: "確認", cancel: "取消"}});
    //     alertify.confirm(alertifyMsg, function (e) {
    //         if (e) {
    //             var sertime = $('#serverTime').html();
    //             serv_cmd.data = {
    //                 "product_code": cmd.now_product_code,
    //                 "price_code": price_code,
    //                 "up_down": up_down,
    //                 "amount": cmd.amount,
    //                 "delay": cmd.delay,
    //                 "order_speed": cmd.order_speed,
    //                 "type": cmd.type,
    //                 "now_price": obj.new_price,
    //                 "limitPrice": cmd.limitPrice,
    //                 "up_limit": cmd.stop_up,
    //                 "down_limit": cmd.stop_down,
    //                 "is_admin": cmd.isadmin,
    //                 "action_time": sertime
    //             };
    //             alertify.success('已送出訂單，請稍候');
    //             doSend(JSON.stringify(serv_cmd));
    //             $('#amount').val('1');
    //         } else {
    //             return false;
    //         }
    //     });
    // }
    // console.log(JSON.stringify(serv_cmd));
    //doSend(JSON.stringify(serv_cmd));
    //重置數量
    //    $('#amount').val('1');


}

function plusTime(timeStr, plus) {
    if (plus == undefined || plus == null) {
        plus = 0;
    }
    var actionTime;

    if (timeStr == typeof undefined)
    {
        console.log(timeStr);
        var actionTime = moment();
        //如果沒抓到server時間暫時用本地時間

    } else {
        var actionTime = moment(timeStr, "YYYY-MM-DD HH:mm:ss");

    }
    var t = actionTime.add("s", plus);
    return  t.format("YYYY-MM-DD HH:mm:ss");
}

function checkAlive()
{
    var d, check, now;

    d = new Date();
    now = d.getTime();
    check = now - last_receive_time;

    if (check > 30000) {
        console.log('last:' + last_receive_time + ',' + new Date(last_receive_time));
        console.log('now:' + now + ',' + new Date(now));
        // alert('逾時登出');

        if (parent.close) {
            parent.close();
        }

        location.reload();
        // document.location='login';
        return;
    }
//        console.log('is alive. see you next time:'+check);
    setTimeout(checkAlive, 30000);
}

function BuildWebSocket() {
    ws = new WebSocket(wsUri);
    //console.log(ws);
    ws.binaryType = 'arraybuffer';
    ws.onopen = function (evt) {
        onOpen(evt)
    };
    ws.onclose = function (evt) {
        onClose(evt)
    };
    ws.onmessage = function (evt) {
        //  console.log(evt);
        
        onMessage(evt)

    };
    ws.onerror = function (evt) {
        onError(evt)
    };
    return ws;
}

function load_closeOffset(product_code) {
    //alert(product_code);
    var obj = ajaxSave({'product_code': product_code}, 'operation/load_closeOffset');
    obj.success(function (res) {
        //alert(res.isCloseOffset);

        var name = $('#' + product_code).find('.name').html();

        if (res.isCloseOffset == '1') {
            $('#chkClose').prop('checked', true);
            $('#close_msg').html(name + '，收盤全平');
        } else {
            $('#chkClose').prop('checked', false);
            $('#close_msg').html('');
        }


        //alertify.success('訂單處理中');

    });

}
function refreshUserMoney() {
    //alert(product_code);
    var obj = ajaxSave({'token': QueryString("token")}, 'operation/getUserMoney');
    obj.success(function (res) {
        // $('#li_user_money').html(res.user_money);
        // $('#li_user_money2').html(res.user_money);
    });

}


function onOpen(evt) {
    var token = QueryString('token');
    console.log("開始連線")
    // writeToScreen("CONNECTED"); 
    doSend('{"cmd":"login" ,"token":"' + token + '"}');
    $('#loading').fadeOut("slow", function () {});
    setTimeout(checkAlive, 30000);
    waitSelectDefaultProduct();
    setTimeout(checkOnlineStatus, 1000);
    //render(token);
}

function onClose(evt) {
    //render('closed');
    //$('#loading').show();
    //ws =  BuildWebSocket() ;
    //writeToScreen("DISCONNECTED");


    console.log("關閉連線");
    // if (parent.close) {
    //     parent.close();
    // }
    if(kicked ==false){

    window.location = 'login';
    }
    // location.reload();
}
function logoutNoauto(){
    unsetSelectAccount();
    window.location = webroot + '/login/logout';

}


function onError(evt) {
    // console.log(evt);
    console.log('ERROR: ' + evt.data);
    var data = localStorage.getItem("errData");

    var time = new Date();
    var timeStr = time.toDateString();

    if (data == null) {
        var data = [];
    } else {
        data = JSON.parse(localStorage.getItem("errData"));

    }
    var errData = {};
    errData.date_time = timeStr;
    errData.error_msg = evt.data;
    data.push(errData);
    localStorage.setItem("errData", JSON.stringify(data));
    // window.location = 'login';
}

function doSend(message) {
    //writeToScreen("SENT: " + message);
    ws.send(message);
}
function getJson(evt) {
    var obj;
    try {
        //     console.log(evt);
        obj = JSON.parse(evt.data);
        return obj;

    } catch (err) {
        return null;
        // console.log("data not json");
        // console.log(err);
        // var raw_binary_data = new Uint8Array(evt.data);
        // var message = msgpack.decode(raw_binary_data);
        // obj = JSON.parse(obj);
    }
}
function getMsgPackData(evt) {
    var obj;
    obj = getJson(evt);
    if (obj == null) {
        // console.log("msg pack data recieve");
        try {
            var raw_binary_data = new Uint8Array(evt.data);
            var message = msgpack.decode(raw_binary_data);
            obj = message;
            // console.log(message);
            obj = JSON.parse(obj);
        } catch (err) {
           console.log("not msg pack data")
           // console.log(err);
        }
    }
    return obj;
}



//==================================================
//------------------接收訊息------------------------
//=================================================
function onMessage(evt) {
    var obj, d;

    //  console.log(evt.data);    
//         if(obj = JSON.parse(evt.data))
//         {
//             obj = JSON.parse(evt.data);
//         }else 
//         {
//                    var raw_binary_data = new Uint8Array(evt.data);
//            var message = msgpack.decode(raw_binary_data);   
//            obj = message;     
//         }
    obj = getMsgPackData(evt);

    if (obj == null) {
        return false;
    }

    if (typeof obj.type == null) {
        render(JSON.stringify(obj));
        return;
    }

    if (obj.type == 99) {
        // console.table(obj);
        // console.log(evt);
        //更新使用者餘額
        // $("#li_user_money").html(  obj.user_money);
        // $("#li_user_money2").html ( obj.user_money);
        // $(".user_money").html(  obj.user_money);
        // $(".user_money").text = obj.data.user_money;
        // $(".user_money").text = obj.data.user_money;
    }

    //render(JSON.stringify(obj));
    switch (obj.type) {
        case 0: //接收商品價格
            d = new Date();
            last_receive_time = d.getTime();
            //console.log(obj);
            //render(JSON.stringify(obj.data));
            //	console.log(obj);
            updateProduct(obj.data);

            lastestProduct[obj.data.product_code] = obj.data;
            //render(obj.data.product_code + " = " + lastestProduct[obj.data.product_code].buy_1_price + "<br><br>");
            //console.log(JSON.stringify(obj.data));
            //$('#serverTime').html(obj.data.create_date);

            //在收到價格，更新 分價揭示 ，
            if (obj.data.product_code == selectedProduct) {
                newPrice(obj.data);
                nowSelectedPrice = obj.data.new_price;

                //每次價位進來，更新量價分佈
                amount_price_per_tick(obj.data);
            //    console.log(obj.data.status_name);
                if (obj.data.status_name !== "交易中") {

                    console.log("選中的商品未開盤")
                    //Method 1 :這個方法 CSS要調
                    $('#userMenu').hide();
                    $('#emptyMenu').show();
                    //Method 2 這個方法會重刷頁面
                    // location.reload()

                }
            }

            //updateOrderList();
            //oList1 = obj.list1;
            //oList2 = obj.list2;
            //oList3 = obj.list3;
            //uProduct = obj.user_product;
            //uConfig = obj.user_config;


            break;


        case 1: //接收五檔報價
            //render(JSON.stringify(obj));



            lastestFivePrice[obj.price_no] = obj.data;

            if (obj.price_no == price_no) {
                updateFivePrice(obj.data);
            }

            break;
        case 3: //從user_order.php更新回來訂單資料

            // console.log(obj);
            //將使用者產品設定放到全域變數
            if (prodCloseOrder == true && obj.user_config[0].user_id != ct_id) {
                return;
            }


            user_product = obj.user_product;
         
      //   setInterval(get_order, 1000);
            //更新 買賣下單列表
            //var data = obj.data;


            //增加判斷是不是目前的使用者

            //記錄最後的訂單列表
            oList1 = obj.list1;
            oList2 = obj.list2;
            oList3 = obj.list3;
            uProduct = obj.user_product;
            refreshProductMap(uProduct);
            uConfig = obj.user_config;

            //更新使用者狀態
            user_status = uConfig.status
            switch (obj.user_status) {
                case '0':
                    $('#divUserStatus').html(user_account + '(停用)');
                    alert('帳號被停用，按確定後登出');
                    window.location = webroot + '/login/logout';
                    break;
                case '1':
                    $('#divUserStatus').html(user_account + '(正常下單)');
                    pop_status_trigger = false;
                    break;
                case '2':
                    if (pop_status_trigger == false) {

                        $('#divUserStatus').html(user_account + '(凍結)');
                        alert('帳號被凍結，所有下單動作將無作用');
                        pop_status_trigger = true;
                    }
                    break;
            }


            //更新預設額度
            $('#default_money2').html(uConfig[0].default_money);

            //更新訂單

           // console.log(obj.user_product);
           //判定是不是後台取得
           var isAdmin = QueryString("admin");
           if(isAdmin)
           {
            orderList1(obj.list1, obj.user_product);
            //alert("1");
           }
           else
           {
            //orderList1(obj.list1, obj.user_product);
            //alert("2");
           }
            
            orderList2(obj.list2, obj.user_product, obj.list3);
            orderList3(obj.list3);

            if (isNaN(obj.neg_money) == false) {
                neg_money = Number(obj.neg_money);
            }
            if (isNaN(obj.max_win) == false) {
                max_win = Number(obj.max_win);
            }
            orderList4(obj.list2, obj.list3, obj.user_config);

            isNotFirstTime = true;
            //console.log(obj.list1);
            //console.log(obj.list2);
            //console.log(obj.list3);
            //console.log(obj.user_product);

            //系統提示使用者訊息
            if (obj.msg != null) {
                if (obj.msg.length > 0) {
                    for (var k = 0; k < obj.msg.length; k++) {
                        var strMsg = JSON.stringify(obj.msg[k].msg);

                        if (strMsg.indexOf('限價單成交提示') >= 0) {
                            alert(strMsg);
                            continue;
                        }

                        if (obj.msg[k].type == 1) {
                            alertify.success(strMsg);
                        } else {
                            alertify.error(strMsg);
                        }
                    }
                }
            }
            //未平倉列表
            // $('#nowOrderList').html('');
            //$('#nowOrderList').html(strOrder1);

            //已平倉列表
            // $('#storeOrderList').html('');
            //$('#storeOrderList').html(strOrder1);
            break;

        case 4: //錯誤訊息
            if (obj.code != 0) {
                showLoginFailMessage(obj.code);
                return;
            }

            if (obj.data == null) {
                showLoginFailMessage(404);
                return;
            }

            $(".show_name").text = obj.data.show_name;
            $(".service_name").text = obj.data.service_name;
            $(".service_tel").text = obj.data.service_tel;
            $(".default_money").text = obj.data.default_money;
            $(".user_money").text = obj.data.user_money;

            // $(".user_money").text = obj.data.user_money;
            break;


        case 5:
            //點擊商品後，回覆事件
            var deny = '';
            var system_offset = '';

            var product = obj.product;
            var user_product = obj.user_product;
            var now_price = obj.now_price;
            var close_price = now_price.last_close_price;
            var last_day = product.last_bill_day;
            //console.log(JSON.stringify(obj));
            var deny_max = Number(close_price) + Number((close_price * (product.deny_new_order_rate / 100)));
            var deny_min = Number(close_price) - Number((close_price * (product.deny_new_order_rate / 100)));

            var offset_max = Number(close_price) + Number((close_price * (product.system_offset_rate / 100)));
            var offset_min = Number(close_price) - Number((close_price * (product.system_offset_rate / 100)));

            //console.log(user_product.is_deny_new_system_offset);
            //假如使用者有勾選，禁新強平
            if (user_product.is_deny_new_system_offset == 1) {
                //alert('1222');
                deny_max = Number(close_price) + Number((close_price * (user_product.deny_new_order_rate / 100)));
                deny_min = Number(close_price) - Number((close_price * (user_product.deny_new_order_rate / 100)));

                offset_max = Number(close_price) + Number((close_price * (user_product.system_offset_rate / 100)));
                offset_min = Number(close_price) - Number((close_price * (user_product.system_offset_rate / 100)));
            }

            deny_max = Math.round(deny_max);
            deny_min = Math.round(deny_min);
            offset_max = Math.round(offset_max);
            offset_min = Math.round(offset_min);

            //console.log(JSON.stringify(product));

            //檔次月份
        //    console.log(product.code_date);
            $('#code_date').html(product.code_date);
            //最後交易日
            $('#product_month').html(product.last_order_date);
            //禁新
            var deny_new = "<span style='color:" + green + ";'>" + deny_min + "</span> ~ <span style='color:" + red + ";'>" + deny_max + "</span>";
            $('#deny_new_range').html(deny_new);
            //強平
            var offset = "<span style='color:" + green + ";'>" + offset_min + "</span> ~ <span style='color:" + red + ";'>" + offset_max + "</span>";
          //  console.log(product.last_order_date);
        //    console.log(offset);
            $('#offset_range').html(offset);
            //console.log(product.name);
            //console.log(JSON.stringify(product));
            var _last_day = "<span'>" + last_day + "</span>";
            $('#last_bill_day').html(_last_day);

            //各商單的，下單不確認，限價單成交提示
            if (user_product.not_confirm == 1) {
                $('#not_confirm').prop('checked', true);
            } else {
                $('#not_confirm').prop('checked', false);
            }
            if (user_product.limit_order_msg == 1) {
                $('#limitOrderMsg').prop('checked', true);
            } else {
                $('#limitOrderMsg').prop('checked', false);
            }

            //是否可雷電下單
            if (user_product.order_fast == 1) {
                $('#divOrderFast').show();
            } else {
                $('#divOrderFast').hide();
            }

            $("#normal_order").trigger("click");

            //close_msg


            break;
        case 6:
            //每秒更新商品狀態

            var list = obj.productStatus;
            //console.log(list);
            //console.log(list.length);
            for (var h = 0; h < list.length; h++) {
                //跳過加權期
                //console.log(list[i].code);
                //if (list[i].code != 'TS') {
                $('#' + list[h].code).find('.status').html(list[h].status);
                if (list[h].status == '未開盤') {
                    $('#' + list[h].code).find('.status').removeClass('figure_result');
                    $('#' + list[h].code).find('.status').addClass('gray');

                    if (lastestProduct[list[h].code])
                        lastestProduct[list[h].code].status_name = list[h].status;
                } else {
                    $('#' + list[h].code).find('.status').removeClass('gray');
                    $('#' + list[h].code).find('.status').addClass('figure_result');
                    // $('#' + list[h].code).find('.status').css('color','rgba(41, 149, 188,1.0)');
                }
                //console.log(list[h].code + ' ' + $('#' + list[h].code).find('.status').html());
                //}
            }
            //每秒更新伺服器時間
            var serTime = obj.serverTime;
            $('#serverTime').html(serTime);
            break;


        case 7:
            //更新投顧訊息
            reloadToFirst('example');
            call_sound(6);
            break;

        case 8:
            //更新跑馬燈
            var list = obj.announce_list;
            $('#marquee3').html('');

            for (var k = 0; k < list.length; k++) {
                $('#marquee3').append('<li>' + list[k].content + '</li>');
            }

            $("#marquee3").marquee();
            break;
        case 9:
              // return;

            //是不是交收中
            if (obj.now_paying == 'true') {
                //交收中 , 將所有input disable
                $('#div_paying').show();
                diableAllButton = true;
                if (!isClosed) {
                    call_sound(4);
                    isClosed = true;
                }
            } else {
                //交收中結束 , 將所有input enable
                $('#div_paying').hide('slow');
                //交收剛結束,用ajax問有沒有結算獲利
                if (isClosed) {
                    var sysNowDate = moment().format("YYYY-MM-DD");
                    $.ajax({
                        url: 'operation/loadBillList?token=' + QueryString('token'),
                        type: 'POST', dataType: 'json',
                        data: {bill_sdate: sysNowDate, bill_edate: sysNowDate},
                        success: function (jb) {
                            var dataObj = jb.aaData;
                            if (dataObj.length > 0) {
                                var userProfit = parseInt(dataObj[0].total_profit) + parseInt(dataObj[0].max_win) + parseInt(dataObj[0].adj_money);
                                if (userProfit > 0)
                                    firwork();     //有獲利,呼叫煙火+音效
                            }
                        }
                    })

                }
                diableAllButton = false;
                isClosed = false;
            }

            //console.log(JSON.stringify(obj));

            //判斷使用者的狀態
            if (user_status != obj.user_status) {
                switch (obj.user_status) {
                    case '0':
                        $('#divUserStatus').html(user_account + '(停用)');
                        alert('帳號被停用，按確定後登出');
                        window.location = webroot + '/login/logout';
                        break;
                    case '1':
                        $('#divUserStatus').html(user_account + '(正常下單)');
                        pop_status_trigger = false;
                        break;
                    case '2':
                        if (pop_status_trigger == false) {

                            $('#divUserStatus').html(user_account + '(凍結)');
                            alert('帳號被凍結，所有下單動作將無作用');
                            pop_status_trigger = true;
                        }
                        break;
                }

                user_status = obj.user_status;
            }

            break;

        case 10:
            //逾時登出
            //alert('登入逾時，按確定後登出');
            window.location = webroot + '/login/logout';
            break;

        case 11 :
            $('#div_login').hide();
            setInterval(updateOrderList, 500);
            setInterval(keepAlive, 3000);
            setInterval(checkAdviceCount, 1000);
            setInterval(refreshUser, 5000);
            ori_user_money = $("#user_money").val();
            // setInterval(refreshUserMoney,1000);

            logined = true;
            break;

        case 900 : //keep alive
            d = new Date();
            last_receive_time = d.getTime();
            break;

        case 999:
//                if ( kicked ) return;

            console.log("準備被踢");
            kicked = true;
            var url =webroot + 'login/';
            unsetSelectAccount();
            // console.log(url);
            alert('重複登入!');
            window.location = url;
            break;
        default:
    }
}

function selectProduct(prod_ob)
{
    var prod_obj = $("#" + prod_ob);

    //重置停損利,口數設定
    $("#amount").val(1);
    $("#stop_up,#stop_down").val(0);

    //下單不確認，取消勾選
    $('#not_confirm').prop('checked', false);

    //所有商品，取消選取的CSS
    $('.productItem').css('background-color', '').removeClass('is_selected');

    //設定商品被選取
    prod_obj.css('background-color', '#c0c0c0').addClass('is_selected');

    //重置報價明細
    $('#info3').html('');

    selectedProduct = prod_ob;
    price_no = prod_obj.find('.price_no').val();

    var product_data;
    for (var i in uProduct) {
        if (uProduct[i].product_code == selectedProduct)
            product_data = uProduct[i];
    }

    //點選商品若是未開盤則不顯示下單區
    var status = prod_obj.find('.status').html();
    if (status == '未開盤' && !prodCloseOrder) {
        $('#userMenu').hide();
        $('#emptyMenu').show();
    } else {
        $('#userMenu').show();
        $('#emptyMenu').hide();
        $(".type").parent().show();
        if (product_data) {
            if (product_data.order_minute_price == 0)
                $(".type[value=1]").parent().hide();
            if (product_data.order_market_price == 0)
                $(".type[value=2]").parent().hide();
            if (product_data.order_close_price == 0)
                $(".type[value=3]").parent().hide();
            if (product_data.order_limit_price == 0)
                $(".type[value=4]").parent().hide();
        }

        $(".type:visible:first").click();
    }


    //在各地方，顯示商品名稱
    var infoName = prod_obj.find('.name').html();
    $('#info1_name').html(infoName);
    $('#info2_name').html(infoName);
    $('#info3_name').html(infoName);
    $('#info4_name').html(infoName);
    $('#info5_name').html(infoName);
    $('#info6_name').html(infoName);


    //設定最後交易日
    var last_day = prod_obj.attr('last_day');
    $('#last_day').html(last_day);

    //設定目前被選取的商品 代碼
    $("#now_product_code").val(selectedProduct);
    //取得現在商品 最後一筆報價
    var obj = lastestProduct[selectedProduct];
    //限價單時，代入的預設價位
    if (obj != null) {
        $('#txtLimitPrice').val(obj.new_price);
        nowSelectedPrice = obj.new_price;
    }


    //假如現在選取的是 '量價表' ,選取產品時，要去server要資料
    if (now_selected_show_list == "price_amount") {
        ajaxLoad_price_amount();
    }

    //新增一筆分價揭示
    newPrice(obj);
    //加最後一筆到五檔揭示
    var fivePrice = lastestFivePrice[price_no];
    updateFivePrice(fivePrice);

    //從server讀取是否收盤全平
    load_closeOffset(selectedProduct);

    //從server 抓資料，改用socket 丟
    //送出指令格式
    var serv_cmd = {};
    serv_cmd.token = QueryString('token');
    serv_cmd.cmd = 'loadProductInfo';
    serv_cmd.data = {"product_code": selectedProduct};
    doSend(JSON.stringify(serv_cmd));
}


//買賣下單列表 －－處理欄位資料
function orderList1(data, user_product) {



    if (data == null) {
        return false;
    }
    // var img = '<img src="' + webroot + '/assets/img/loading2.gif" width="15" >';
    var img = '';
    var del_icon = '刪'; //'<i class="fa fa-trash" aria-hidden="true"></i>';
    var edit_icon = '改'; //'<span class="glyphicon glyphicon-edit"></span>';

    var strEnable = '';
    if (!diableAllButton) {
        //strEnable = 'disabled = "disabled"';
    }

    //console.log(data)
    //console.log(user_product[0].product_code);
    var list = []; //處理後的資料
    for (var i = 0; i < data.length; i++) {

        //處理顯示處理中 未成交 107 0227
        var prod_code = data[i].product_code;
        var prod = getUserProduct(prod_code);
        var limit_sec = 0;
        // debugger;
        if (data[i].order_type == 2) {

            limit_sec = prod.order_market_price_second;
        } else if (data[i].order_type == 4) {
            limit_sec = prod.order_limit_price_second;
        }


        //跳過已平倉
        //if (data[i].type == 'sto_orders') {
        //    continue;
        //}
        //未成交單據
        if ($('#chk_list1_unoffset').prop('checked')) {
            if (data[i].type == 'sto_orders')
                continue;
            if (data[i].type == 'orders')
                continue;
        } else {
            if ($('#show_all_order').prop('checked')) {

            } else {
                //全部單據 不顯示已平倉
                if (data[i].type == 'sto_orders')
                    continue;
            }
        }

        //抓出此張訂單商品，對應使用者商品設定，停利損需》＝ ？點
        var loss = '';
        var profit = '';
        var now_user_product = {};
        for (j = 0; j < user_product.length; j++) {
            //console.log(data[i].product_code + "==" + user_product[j].product_code);
            if (data[i].product_code == user_product[j].product_code) {
                loss = user_product[j].stop_loss;
                profit = user_product[j].stop_profit;

                now_user_product = user_product[j];
            }
        }

        var color = '';
        if (data[i].up_down == 'up')
            color = 'style="color:#eb6b61"';
        if (data[i].up_down == 'down')
            color = 'style="color:#01b72c;"';

        var row = {};
        var type = data[i].type;
        var status = data[i].status;

        //列表上每筆資料的編號
        //row.key = 'list1_' + data[i].type + '_' + data[i].order_id;
        row.key = 'list1_' + data[i].type + '_';
        row.key += (data[i].order_id) ? data[i].order_id : data[i].pre_id;

        row.co1 = '';
        // console.log(data[i].type+':test');
        // if (cmd.type == 2) {
        //
        //     limit_sec = prod.order_market_price_second;
        // } else if (cmd.type == 4) {
        //     limit_sec = prod.order_limit_price_second;
        // }
        if (data[i].type == 'orders' && data[i].status == 0) {
            row.co1 = '<input class="blueBut" id="but_' + data[i].order_id + '" type="button" value="平倉" onclick="storeProduct(' + data[i].order_id + ')">';
        } else if (data[i].type == 'pre_orders') {
            if (data[i].order_type == 4) {
                row.co1 = '<button class="blueBut" type="button" onclick="deletePreorder(' + data[i].pre_id + ');">' + del_icon + '</button>';
                row.co1 += '&nbsp;<button class="blueBut" onclick="open_modify_limit(' + data[i].pre_id + ',' + data[i].amount + ',\'' + data[i].product_code + '\');">' + edit_icon + '</button>';
            }

        } else if (data[i].type == 'close_order') {
            row.co1 = '<button type="button" class="blueBut" onclick="deleteCloseorder(' + data[i].pre_id + ');" >' + del_icon + '</button>';
        } else {
            row.co1 = '';
        }

        //假如現在此張單商品收盤，不顯示按鈕
        //console.log(lastestProduct[data[i].product_code].status_name);
        row.co2 = data[i].order_id;
        row.co3 = '<span ' + color + '>' + data[i].name + '</span>';
        var show_reverse_up_limit = '倒限';
        if (data[i].reverse_up_limit > 0) {
            show_reverse_up_limit = data[i].reverse_up_limit;
        }

        if (now_user_product.accept_stop_order == 0) {
            row.co4 = '';
        } else if (data[i].type == 'orders' && data[i].status == 0 && now_user_product.accept_stop_order == 1) {
            row.co4 = '<button class="blueBut" style="width:50px;" onclick="openReverseSetting(\'' + data[i].order_id + '\',\'' + data[i].product_code + '\')" type="button">' + show_reverse_up_limit + '</button>';
        } else {
            row.co4 = '';
        }

        //成交音效
        var diffDate = DateDiff(getNowTime(), data[i].finish_time);


        if (diffDate < 5000)
        {

            call_sound(7);

        }

        /*
         if (lastestProduct[data[i].product_code].status_name == '未開盤') {
         row.co1 = '';
         row_co4 = '';
         }
         /*
         if(now_user_product.accept_stop_order == 1 && data[i].order_type == 4){
         row.co4 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + '  style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\' , \'up\')"  type="button">倒限</button>';
         }else{
         row.co4 = '';	
         }*/
        if (data[i].up_down == 'up') {
            row.co5 = '<span ' + color + '>多</span>';
        } else {
            row.co5 = '<span ' + color + '>空</span>';
        }
        //買賣下單的型別
        var showstyle = '一般';
        switch (data[i].order_type) {
            case '1':
                row.co6 = '<span ' + color + '>批分價</span>';
                showstyle = '批分';
                break;

            case '2':
                row.co6 = '<span ' + color + '>市價</span>';
                showstyle = '市價';
                if (data[i].isFast == 1)
                    showstyle = '雷電';
                break;

            case '3':
                row.co6 = '<span ' + color + '>收盤價</span>';
                showstyle = '收盤';
                break;

            case '4':
                //if (data[i].type == 'pre_orders') {
                row.co6 = '<span ' + color + '>' + data[i].limit_price + '</span>';
                //} else {
                //    row.co6 = '<span ' + color + '>' + data[i].now_price + '</span>';
                //}
                showstyle = '限價';
                break;
        }
        if (data[i].is_admin != 0 && data[i].is_admin !== '')
            showstyle = '人工';
        var sAmount = '<span ' + color + '>' + data[i].amount + '</span>';

        if (data[i].amount != data[i].remaining_amount) {
            sAmount += '<span ' + color + '> (' + data[i].remaining_amount + ')</span>';
        }
        row.co7 = sAmount;

        row.co8 = '<span ' + color + '>' + data[i].price + '</span>';
        row.co9 = '<span ' + color + ' title="' + data[i].action_time + '">' + removeDate(data[i].action_time) + '</span>';
        //row.co9 = '<span ' + color + '>' + removeDate(data[i].create_date) + '</span>';
        row.co10 = '<span ' + color + ' title="' + data[i].finish_time + '">' + removeDate(data[i].finish_time) + '</span>';

        row.co11 = '<span ' + color + '>' + showstyle + '</span>';
        //row.co11 = '<span ' + color + '>一般</span>';

        //獲利點數
        var point = 0;
        if (type == 'orders') {
            var obj = lastestProduct[data[i].code];
            //console.log(obj.new_price);
            if(obj.hasOwnProperty('new_price'))
            {
               var sellPrice = obj.new_price;

            if (data[i].up_down == 'up') {
                point = sellPrice - data[i].price;
            } else {
                point = data[i].price - sellPrice;
            }             
            }

        }


        var loss_enable = 'true';
        var profit_enable = 'true';
        /*
         if (type == 'orders' && data[i].status == 0) //未平倉單，可以修改停損利
         {
         */
        //這邊改規則了  一率可以調整
        switch (data[i].order_type) {
            //批分
            case '1':
                if (now_user_product.show_order_minute_price_profit == 1) {
                    loss_enable = true;
                    profit_enable = true;
                }

                break;
                //市價
            case '2':
                if (now_user_product.show_order_market_price_profit == 1) {
                    loss_enable = true;
                    profit_enable = true;
                }

                break;
                //收盤
            case '3':
                if (now_user_product.show_order_market_price_profit == 1)
                {
                    loss_enable = true;
                    profit_enable = true;
                }

                break;
                //限價
            case '4':
                if (now_user_product.show_order_limit_price_profit == 1) {
                    loss_enable = true;
                    profit_enable = true;
                }

                break;

        }


        //零，顯示為 '無'
        var strUP = data[i].down_limit;
        var strDown = data[i].up_limit;

        if (strUP == 0)
            strUP = '無';
        if (strDown == 0)
            strDown = '無';

        if (type == 'orders' && data[i].status == 0) //未平倉單，可以修改停損利
        {
            row.co12 = '<button class="blueBut" style="width:50px;" onclick="openLossSetting(\'' + data[i].order_id + '\',\'' + data[i].product_code + '\' , \'down\')" type="button">' + strUP + '</button>';
            row.co13 = '<button class="blueBut" style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\',\'' + data[i].product_code + '\' ,\'up\')" type="button">' + strDown + '</button>';
        } else if (type == 'pre_orders') {
            row.co12 = '<button class="blueBut" style="width:50px;" onclick="openLossSetting(\'' + data[i].pre_id + '\',\'' + data[i].product_code + '\' , \'down\' ,\'' + type + '\')" type="button">' + strUP + '</button>';
            row.co13 = '<button class="blueBut" style="width:50px;" onclick="openProfitSetting(\'' + data[i].pre_id + '\',\'' + data[i].product_code + '\' , \'up\' ,\'' + type + '\')" type="button">' + strDown + '</button>';
        } else if (type == 'close_order') {  //收盤單不可設定
            row.co12 = '';
            row.co13 = '';
            //row.co12 = '<button class="blueBut" style="width:50px;" onclick="openLossSetting(\'' + data[i].pre_id + '\',\''  + data[i].product_code + '\' , \'down\' ,\''+ type +'\')" type="button">' + strUP + '</button>';
            //row.co13 = '<button class="blueBut" style="width:50px;" onclick="openProfitSetting(\'' + data[i].pre_id + '\',\'' + data[i].product_code  + '\' , \'up\' ,\''+ type +'\')" type="button">' + strDown + '</button>';
        } else {
            row.co12 = data[i].down_limit;
            row.co13 = data[i].up_limit;
        }

        //未開盤統一這邊處理
        if (!lastestProduct[data[i].product_code]) {
            row.co1 = '';
            row_co4 = '';
            row.co12 = data[i].down_limit;
            row.co13 = data[i].up_limit;
        } else if (lastestProduct[data[i].product_code].status_name == '未開盤') {
            row.co1 = '';
            row_co4 = '';
            row.co12 = data[i].down_limit;
            row.co13 = data[i].up_limit;
        }

        switch (type) {
            case 'pre_orders':

                var sertime = $('#serverTime').html();
                //下單時間
                var dealTime = plusTime(data[i].create_date , limit_sec);


                console.log("now:"+moment().format("YYYY-MM-DD HH:mm:ss"));
                console.log("dealTime"+dealTime);
                console.log("sertime"+sertime);
                console.log("limit_sec"+limit_sec);
                if(sertime >=dealTime){
                    row.co14 = img + '未成交';
                }else{
                    row.co14 = img + '處理中';
                }
                break;
            case 'close_order':
                row.co14 = img + '收盤單';
                break;
            case 'orders':
                if (data[i].status == 2) {
                    row.co14 = img + '平倉中';
                } else {
                    if (data[i].is_trans_order == 1) {
                        row.co14 = '轉新單';
                    }
                    row.co14 = data[i].memo;
                }

                break;
            case 'delete_order':
                row.co14 = '已刪除';
                break;

            case 'sto_orders':
                row.co14 = data[i].memo;
                if (data[i].isStore == 1)
                    //row.co14 += '(平倉單)';
                    break;
        }

        list.push(row);
    }
    updateList1(list);

    //列表置底
    if ($('#chk_list1_bottom').prop('checked')) {
        var objDiv = document.getElementById("orderList");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}


function removeDate(datetime) {
    if (datetime == null)
        return '';
    var arrTime = datetime.split(' ');
    if (arrTime.length == 2)
        return arrTime[1];
    else
        return '';
}



/*function updateProductStatus(list) {
 //console.log(list.length);
 for (var i = 0; i < list.length; i++) {
 //跳過加權期
 //console.log(list[i].code);
 if (list[i].code != 'TS') {
 $('#' + list[i].code).find('.status').html(list[i].status);
 }
 }
 }*/

//將處理完的資料，組成HTML
function updateList1(list) {
    var pre_data = "";
    var html = '';
    var key_list = [];

    for (var i = 0; i < list.length; i++) {
        var rowID = list[i]['key'];
        var obj = $('#' + rowID);

        if (obj.length != 0) {
            for (var index in list[i]) {
                if (index == 'key')
                    continue;
                if (obj.find("." + index).html() != list[i][index])
                    obj.find("." + index).html(list[i][index]);
            }
        } else {
            var add_class = (rowID.search('pre_orders') > 0 || rowID.search('close_order') > 0) ? 'class="new_order_wait"' : '';
            html = '<tr id="' + rowID + '" ' + add_class + '>';
            for (var index in list[i]) {
                if (index == 'key')
                    continue;
                html += '<td class="' + index + '" id="stock_info" style="">' + list[i][index] + '</td>';
            }
            html += '</tr>';
            if (!pre_data) {
                $('#orderList').prepend(html);
            } else {
                $('#' + pre_data).after(html);
            }

            //檢查是否有強制平倉
            var chkMemo = list[i].co14;
            if (isNotFirstTime && (chkMemo.indexOf('強制') > 0 || chkMemo.indexOf('強平') > 0))
                call_sound(5);
        }
        key_list.push(rowID);
        pre_data = rowID;

    }
    $('#orderList tr').each(function (i, e) {
        var keyId = $(this).attr("id");
        if (key_list.indexOf(keyId) == -1)
            $(this).remove();
    });
    //$('#orderList').html(html);
}

function openLossSetting(order_id, p_code, up_down, type = null) {
    if (lastestProduct[p_code].status_name == '未開盤') {
        alert('未到開盤時間！');
        return;
    }
    if (type == null) {
        $('#ifStopLossProfit').attr('src', 'operation/stop_loss?order_id=' + order_id);
    } else if (type == 'pre_orders') {
        $('#ifStopLossProfit').attr('src', 'operation/pre_stop_loss?pre_id=' + order_id);
    } else if (type == 'close_order') {
        $('#ifStopLossProfit').attr('src', 'operation/close_stop_loss?pre_id=' + order_id);
    }
    $('#tallModelTitle2').html('<span style="font-weight:bold;color:' + green + '">修改停損</span>');
    $("#tallModal2").modal('show');
}

//開啟倒限獲利
function openReverseSetting(order_id, p_code) {
    var profit_lower_limit = $("#list2_" + order_id).find('.co12').text();
    if (lastestProduct[p_code].status_name == '未開盤') {
        alert('未到開盤時間！');
        return;
    } else if (profit_lower_limit < 0) {
        alert('尚未獲利，無法設定倒限獲利！');
        return;
    }
    $('#ifStopLossProfit').attr('src', 'operation/reverse_up_limit?order_id=' + order_id);
    $('#tallModelTitle2').html('<span style="font-weight:bold;color:' + red + '">倒限獲利</span>');
    $("#tallModal2").modal('show');
}
//停損利按鈕
function openProfitSetting(order_id, p_code, up_down, type = null) {
    //$('#ifStopLoss').attr('src', 'operation/stop_profit?order_id=' + order_id);
    if (lastestProduct[p_code].status_name == '未開盤') {
        alert('未到開盤時間！');
        return;
    }
    if (type == null) {
        $('#ifStopLossProfit').attr('src', 'operation/stop_profit?order_id=' + order_id);
    } else if (type == 'pre_orders') {
        $('#ifStopLossProfit').attr('src', 'operation/pre_stop_profit?pre_id=' + order_id);
    } else if (type == 'close_order') {
        $('#ifStopLossProfit').attr('src', 'operation/close_stop_profit?pre_id=' + order_id);
    }
    $('#tallModelTitle2').html('<span style="font-weight:bold;color:' + red + '">修改停利</span>');
    $("#tallModal2").modal('show');
}



//未平倉
function orderList2(data, user_product, data2) {
    // console.log(data);
    // console.log(data2);
    if (data == null) {
        return false;
    }

    var strEnable = '';
    if (!diableAllButton) {
        //strEnable = 'disabled = "disabled"';
    }

    //初始化倉位數量
    var unoffset_count = {};
    $('.productItem').each(function () {
        var code = $(this).attr('id');
        unoffset_count[code] = {'count': 0, 'color': '#00AFEF'};
    });

    var img = '<img src="' + webroot + '/assets/img/loading2.gif" width="15" >';
    // var img = '';
    var list = []; //處理後的資料
    var key_list = [];

    for (var i = 0; i < data.length; i++) {
        //列表上每筆資料的編號
        var row = {};
        row.key = 'list2_' + data[i].order_id;

        //若有狀態為完成的，把它從列表上移除
        //console.log(data[i]);
        if (data[i].status == 1) {
            $('#' + row.key).remove();
            //console.log($('#' + row.key));
            continue;
        }

        key_list.push(row.key);     //紀錄仍留存的訂單代號


        //抓出此張訂單商品，對應使用者商品設定，停利損需》＝ ？點
        var loss = '';
        var profit = '';
        var now_user_product = {};
        for (j = 0; j < user_product.length; j++) {
            //console.log(data[i].product_code + "==" + user_product[j].product_code);
            if (data[i].product_code == user_product[j].product_code) {
                loss = user_product[j].stop_loss;
                profit = user_product[j].stop_profit;
                now_user_product = user_product[j];
            }
        }

        //記錄未平倉數，更新至報價單
        if (unoffset_count[data[i].code] != null) {
            unoffset_count[data[i].code].count += Number(data[i].remaining_amount);
        } else {
            unoffset_count[data[i].code].count = Number(data[i].remaining_amount);
        }

        /*
         color = 'style="color:#eb6b61"';
         if (data[i].up_down == 'down')
         color = 'style="color:#55DF56;"';
         */
        var color = '';
        if (data[i].up_down == 'up') {
            color = 'style="color:#eb6b61"';
            unoffset_count[data[i].code].color = 'red';
        }
        if (data[i].up_down == 'down') {
            color = 'style="color:#01b72c;"';
            unoffset_count[data[i].code].color = 'green';
        }
        var type = data[i].type;
        var status = data[i].status;
        row.co1 = data[i].order_id;

        if (data[i].status == 2) {
            row.co2 = '';
        } else {
            row.co2 = '<input class="blueBut" type="button" onclick="storeProduct(' + data[i].order_id + ');" value="平倉">';
        }

        //假如現在此張單商品收盤，不顯示按鈕
        //console.log(lastestProduct[data[i].product_code].status_name);
        row.display_checkbox = true;
        if (lastestProduct[data[i].product_code].status_name == '未開盤') {
            row.co2 = '';
            row.display_checkbox = false;
        }

        row.co3 = '<span ' + color + '>' + data[i].name + '</span>';
        if (data[i].up_down == 'up') {
            row.co4 = '<span ' + color + '>多</span>';
        } else {
            row.co4 = '<span ' + color + '>空</span>';
        }

        switch (data[i].type) {
            case '1':
                row.co5 = '<span ' + color + '>批分單</span>';
                break;
            case '2':
                row.co5 = '<span ' + color + '>市價單</span>';
                if (data[i].isFast == 1)
                    row.co5 = '<span ' + color + '>雷電單</span>';
                break;
            case '3':
                row.co5 = '<span ' + color + '>收盤單</span>';
                break;
            case '4':
                row.co5 = '<span ' + color + '>限價單</span>';
                break;
        }


        row.co6 = '<span ' + color + '>' + data[i].price + '</span>';
        if (data[i].remaining_amount != data[i].amount) {
            //row.co7 = '<span ' + color + '>' + data[i].amount + '(' + data[i].remaining_amount + ')' + '</span>';
            //這邊改為只顯示實際成交數
            row.co7 = '<span ' + color + '>' + data[i].remaining_amount + '</span>';
        } else {
            row.co7 = '<span ' + color + '>' + data[i].amount + '</span>';
        }

        var buyCharge = 0;
        var product_price = 0;
        switch (data[i].charge_type) {
            case '0': //代理
                buyCharge = data[i].buy_charge;
                product_price = data[i].price_agent;
                break;
            case '1': //大
                buyCharge = data[i].buy_charge_large;
                product_price = data[i].price_large;
                break;
            case '2': //中
                buyCharge = data[i].buy_charge_med;
                product_price = data[i].price_med;
                break;
            case '3': //小
                buyCharge = data[i].buy_charge_small;
                product_price = data[i].price_small;
                break;
            case '4': //迷你
                buyCharge = data[i].buy_charge_mini;
                product_price = data[i].price_mini;
                break;
        }

        //console.log(buyCharge);
        buyCharge = buyCharge * data[i].remaining_amount;
        if (data[i].is_trans_order == 1) { //轉新單，不收手續費
            buyCharge = 0;
        }


        row.co8 = '<span ' + color + '>' + buyCharge + '</span>';

        //獲利點數
        var point = 0;

        var obj = lastestProduct[data[i].code];
        var sellPrice = obj.new_price;


        //假如商品 收盤，則不再變動損益，用訂單收盤的價位顯示
        if (obj.status_name == '未開盤') {
            //console.log(obj.status_name);
            if (data[i].close_price > 0) //避免沒記到收盤價時
            {
                sellPrice = data[i].close_price;
            }
        }

        if (data[i].up_down == 'up') {
            point = sellPrice - data[i].price;
        } else {
            point = data[i].price - sellPrice;
        }

        var loss_enable = 'disabled ';

        var profit_enable = 'disabled ';

        switch (data[i].type) {
            //批分
            case '1':
                if (now_user_product.show_order_minute_price_profit == 1) {
                    loss_enable = '';
                    profit_enable = '';
                }

                break;
                //市價
            case '2':
                if (now_user_product.show_order_market_price_profit == 1) {
                    loss_enable = '';
                    profit_enable = '';
                }

                break;
                //收盤
            case '3':
                /*if(now_user_product.show_order_market_price_profit ==1)
                 {
                 loss_enable = true;
                 profit_enable = true;
                 }*/
                break;
                //限價
            case '4':
                if (now_user_product.show_order_limit_price_profit == 1) {
                    loss_enable = '';
                    profit_enable = '';
                }
                break;
        }


        //零，顯示為 '無'
        var strUP = data[i].down_limit;
        var strDown = data[i].up_limit;

        if (strUP == 0)
            strUP = '無';
        if (strDown == 0)
            strDown = '無';
        //if (data[i].order_type != '3') {
        row.co9 = '<button class="blueBut" ' + loss_enable + 'style="width:50px;" onclick="openLossSetting(\'' + data[i].order_id + '\',\'' + data[i].code + '\' , \'down\')" type="button">' + strUP + '</button>';
        row.co10 = '<button class="blueBut" ' + profit_enable + 'style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\',\'' + data[i].code + '\' , \'up\')" type="button">' + strDown + '</button>';
        //}
        //倒限獲利
        //row.co11 = '';
        var show_reverse_up_limit = '倒限';
        if (data[i].reverse_up_limit > 0) {
            show_reverse_up_limit = data[i].reverse_up_limit;
        }
        if (now_user_product.accept_stop_order == 0) {
            row.co11 = '';
        } else if (now_user_product.accept_stop_order == 1) {
            row.co11 = '<button class="blueBut" ' + loss_enable + 'style="width:50px;" onclick="openReverseSetting(\'' + data[i].order_id + '\',\'' + data[i].product_code + '\')" type="button">' + show_reverse_up_limit + '</button>';
        } else {
            row.co11 = '';
        }
        if (lastestProduct[data[i].product_code].status_name == '未開盤') {
            row_co11 = '';
        }

        var win_loss = data[i].remaining_amount * product_price * point - (buyCharge);
        if (win_loss > 0) {
            row.co12 = '<span style="color:rgb(41, 149, 188);">' + win_loss + '</span>';
        } else if (win_loss < 0) {
            row.co12 = '<span style="color:#eb6b61;">' + win_loss + '</span>';
        } else {
            row.co12 = win_loss;
        }

        //row.co12 = data[i].productPrice * point;


        if (point > 0) {
            row.co13 = '<span style="color:#eb6b61">▲' + point + '</span>';
        } else if (point < 0) {
            var removeNe = point * -1;
            row.co13 = '<span style="color:#01b72c">▼' + removeNe + '</span>';
        } else {
            row.co13 = point;
        }
        //row.co13 = point;

        //console.log(data[i]);

        row.co14 = data[i].offline_day;
        if (data[i].status == 0) {
            //row.co15 = '';
            if (data[i].is_trans_order == 1) {
                row.co15 = '轉新單';
            } /*else if(data[i].order_id == data2[i].stoID){
             roe.co15 = data2[i].newID; 
             }*/
            else {
                row.co15 = '已成交';



            }
        } else if (data[i].status == 2) {
            row.co15 = img + '平倉中';
        }
        list.push(row);
    }
    updateList2(list);

    //更新報價上的倉位
    //alert(JSON.stringify(unoffset_count));
    //console.log(JSON.stringify(unoffset_count));        

    var up_count = 0;
    var down_count = 0;
    //設定報價單上的倉數
    for (var index in unoffset_count) {
        $('#' + index).find('.store').html('<sapn style="color:' + unoffset_count[index].color + ';">' + unoffset_count[index].count + '</span>');

        if (unoffset_count[index].color == 'red') {
            up_count += unoffset_count[index].count;
        }
        if (unoffset_count[index].color == 'green') {
            down_count += unoffset_count[index].count;
        }
    }

    //檢查是否有結算後還遺留的資料
    $("#nowOrderList tr").each(function (i, e) {
        var keyId = $(this).attr("id");
        if (key_list.indexOf(keyId) == -1)
            $(this).remove();
    });

    //未平倉頁纖上顯示的多，空，數量
    $('#title_unoffset_up_count').html(up_count);
    $('#title_unoffset_down_count').html(down_count);
    //雷電單下的資訊
    $('#title_unoffset_up_count2').html(up_count);
    $('#title_unoffset_down_count2').html(down_count);

    // console.log("up_count")
    // console.log(up_count)
    // console.log(down_count)
    $('#buyListCount').html(up_count + down_count);


}

function updateList2(list) {
    var html = '';

    for (var i = 0; i < list.length; i++) {
        var rowID = list[i]['key'];

        //console.log($('#' + rowID).attr('id'));
        //alert(obj);
        //用編好的ID去找，有找到此筆資料

        if ($('#' + rowID).attr('id') != null) {
            for (var index in list[i]) {
                if (index == 'key')
                    continue;
                else if (index == 'display_checkbox') {
                    //如果是未開盤,移除checkbox
                    if (!list[i][index])
                        $("#chk_" + list[i]["key"]).remove();
                    else {
                        //交易中,檢查有無checkbox,沒有就補
                        if ($("#chk_" + list[i]["key"]).length == 0) {
                            $("#" + rowID).find('td:first').append('<input class="chkList2" id="chk_' + list[i]["key"] + '" type="checkbox" />');
                        }
                    }
                    continue;
                }

                var exec_tar = $('#' + rowID).find('.' + index);
                if (exec_tar.html() != list[i][index])
                    exec_tar.html(list[i][index]);
            }

        } else {
            //新增一行
            html = '<tr id="' + rowID + '">';
            for (var index in list[i]) {
                if (index == 'key') {
                    html += '<td class="' + index + '">';
                    if (list[i].display_checkbox)
                        html += '<input class="chkList2" id="chk_' + list[i][index] + '" type="checkbox" />';
                    html += '</td>';
                } else if (index == 'display_checkbox') {
                    continue;
                } else {
                    html += '<td class="' + index + '">' + list[i][index] + '</td>';
                }
            }

            html += '</tr>';
            $('#nowOrderList').append(html);
            //}
        }

    }
    // #option2 - calculate td width
    // $("#option2 table tbody tr td.key").css("width", $("#option2 table thead tr th:nth-child(1)").width() + "px");
    // for (var n = 1; n < 16; n++) {
    //     $("#option2 table tbody tr td.co" + n).css("width", $("#option2 table thead tr th:nth-child(" + (n + 1) + ")").width() + "px");
    // }
}

var orders_offset = 0;
//己平倉
function orderList3(data) {
    //alert(list);
    var img = '<img src="' + webroot + '/assets/img/loading2.gif" width="15" >';
    var list = []; //處理後的資料

    //console.log(data);
    if (data == null)
        return;
    for (var i = 0; i < data.length; i++) {
        //列表上每筆資料的編號
        var row = {};
        row.key = 'list3_' + data[i].rel_id;

        var color = '';
        if (data[i].up_down == 'up')
            color = 'style="color:#eb6b61"';
        if (data[i].up_down == 'down')
            color = 'style="color:#01b72c;"';
        row.co1 = data[i].name;

        row.co2 = data[i].newID;
        row.co3 = data[i].stoID;

        switch (data[i].type1) {
            case '1':
                row.co4 = '批分單';
                break;
            case '2':
                row.co4 = '市價單';
                break;
            case '3':
                row.co4 = '收盤單';
                break;
            case '4':
                row.co4 = '限價單';
                break;
        }
        switch (data[i].type2) {
            case '1':
                row.co5 = '批分單';
                break;
            case '2':
                row.co5 = '市價單';
                break;
            case '3':
                row.co5 = '收盤單';
                break;
            case '4':
                row.co5 = '限價單';
                break;
        }

        row.co6 = data[i].sto_amount;
        if (data[i].up_down == 'up')
            row.co7 = '多';
        else
            row.co7 = '空';


        row.co8 = data[i].price;
        row.co9 = data[i].stoPrice;
        row.co10 = '<span title="' + data[i].buyTime + '">' + removeDate(data[i].buyTime) + '</span>';
        row.co11 = '<span title="' + data[i].sellTime + '">' + removeDate(data[i].sellTime) + '</span>';

        //獲利點數
        var point = 0;
        if (data[i].up_down == 'up') {
            point = data[i].stoPrice - data[i].price;
        } else {
            point = data[i].price - data[i].stoPrice;
        }

        if (point > 0) {
            row.co12 = '<span style="color:#eb6b61">▲' + point + '</span>';
        } else if (point < 0) {
            var removeNe = point * -1;
            row.co12 = '<span style="color:#01b72c">▼' + removeNe + '</span>';
        } else {
            row.co12 = point;
        }

        row.co13 = '';
        /*var now_user_product = {};
         for (j = 0; j < user_product.length; j++) {
         //console.log(data[i].product_code + "==" + user_product[j].product_code);
         if (data[i].product_code == user_product[j].product_code) {
         loss = user_product[j].stop_loss;
         profit = user_product[j].stop_profit;
         now_user_product = user_product[j];
         }
         }
         
         //未定義的變數...先註解掉
         if(now_user_product.accept_stop_order == 1 && data[i].order_type == 4){
         row.co13 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + '  style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\' , \'up\')"  type="button">>倒限</button>';
         }else{
         row.co13 = '';
         }*/


        row.co14 = data[i].total_charge;
        if (data[i].profit_loss == 0) {
            row.co15 = data[i].profit_loss;
        } else if (data[i].profit_loss > 0) {
            row.co15 = '<span style="color:rgb(41, 149, 188);">' + data[i].profit_loss + '</span>';
        } else {
            row.co15 = '<span style="color:#eb6b61;">' + data[i].profit_loss + '</span>';
        }

        //判斷是否有未判斷損益的單
        if (orders_offset < i) {
            orders_offset++;
            if (data[i].profit_loss > 0)
                call_sound(1);
        }


        list.push(row);
    }
    updateList3(list);
    //未平倉列表
    //$('#storeOrderList').html(strOrder3);
}


function updateList3(list) {
    var html = '';
    var pre_data = '';
    var key_list = [];
    if (list != null) {
        for (var i = 0; i < list.length; i++) {
            var rowID = list[i]['key'];
            var obj = $('#' + rowID).length;

            if (obj == 0) {
                html = '<tr id="' + rowID + '">';
                for (var index in list[i]) {
                    if (index == 'key') {
                        continue;
                    } else {
                        html += '<td class="' + index + '">' + list[i][index] + '</td>';
                    }
                }
                html += '</tr>';
                if (pre_data) {
                    $("#" + pre_data).after(html);
                } else {
                    $('#storeOrderList').prepend(html);
                }
            }
            key_list.push(rowID);
            pre_data = rowID;
        }
        //$('#storeOrderList').html(html);
    }
    $("#storeOrderList tr").each(function (i, e) {
        var keyId = $(this).attr("id");
        if (key_list.indexOf(keyId) == -1)
            $(this).remove();
    });
    // #option3 - calculate td width
    // for (var n = 1; n < 16; n++) {
    //     $("#option3 table tbody tr td.co" + n).css("width", $("#option3 table thead tr th:nth-child(" + n + ")").width() + "px");
    // }
}

//商品統計
function orderList4(list2, list3, user_config) {


    if (isNaN(neg_money)) {
        neg_money = 0;
    }
    if (isNaN(max_win)) {
        max_win = 0;
    }

    var arrProduct = [];
    //未平倉
    if (list2 != null) {
        for (var i = 0; i < list2.length; i++) {
            //排除已處理完的訂單(上面列表保留，是為了要將己處理完畢的訂單從TABLE上移除)
            if (list2[i].status == 1)
                continue;
            //手續費

            var buyCharge = getBuyCharge(list2[i]) * list2[i].remaining_amount;
            var product_price = getProductPrice(list2[i]);
            var sellCharge = getSellCharge(list2[i]) * list2[i].remaining_amount;

            if (list2[i].is_trans_order == 1) { //轉新單，不收手續費
                buyCharge = 0;
                sellCharge = 0;
            }


            //獲利點數
            var point = 0;
            var obj = lastestProduct[list2[i].code];
            var sellPrice = obj.new_price;

            //假如商品 收盤，則不再變動損益，用訂單收盤的價位顯示
            if (obj.status_name == '未開盤') {
                //console.log(obj.status_name);
                if (list2[i].close_price > 0) //避免沒記到收盤價時
                {
                    sellPrice = list2[i].close_price;
                }
            }

            if (list2[i].up_down == 'up') {
                point = sellPrice - list2[i].price;
            } else {
                point = list2[i].price - sellPrice;
            }

            //損益
            var win_loss = list2[i].remaining_amount * product_price * point - (buyCharge + sellCharge);

            var upAmount = 0;
            var downAmount = 0;
            if (list2[i].up_down == 'up') {
                upAmount = list2[i].remaining_amount;
            } else {
                downAmount = list2[i].remaining_amount;
            }


            //建立物件
            var item = {};
            item.name = list2[i].name;
            item.code = list2[i].code;
            item.upAmount = upAmount;
            item.downAmount = downAmount;
            item.remaining_amount = upAmount - downAmount;
            item.total = Number(upAmount) + Number(downAmount);
            item.charge = Number(buyCharge);
            item.win_loss = win_loss
            item.preserver_money = Number(list2[i].money);
            //更新陣列
            arrProduct = updateProductArray(item, arrProduct);
        }
    }

    //已平倉
    if (list3 != null) {
        for (var i = 0; i < list3.length; i++) {
            var buyCharge = getBuyCharge(list3[i]) * list3[i].sto_amount;
            var product_price = getProductPrice(list3[i]);
            var sellCharge = getSellCharge(list3[i]) * list3[i].sto_amount;

            //獲利點數
            var point = 0;
            var sPrice = 0;
            if (list3[i].stoPrice != '') {
                sPrice = list3[i].stoPrice;
            }
            if (list3[i].up_down == 'up') {

                point = sPrice - list3[i].price;
            } else {
                point = list3[i].price - sPrice;
            }
            //損益
            //console.log(buyCharge + " + " + sellCharge);
            var win_loss = list3[i].sto_amount * product_price * point - list3[i].total_charge;
            var upAmount = list3[i].sto_amount;
            var downAmount = list3[i].sto_amount;

            //建立物件
            var item = {};
            item.name = list3[i].name;
            item.code = list3[i].code;
            item.upAmount = upAmount;
            item.downAmount = downAmount;
            item.remaining_amount = 0;
            item.total = Number(upAmount) + Number(downAmount);
            item.charge = list3[i].total_charge;
            item.win_loss = win_loss
            item.preserver_money = list3[i].money;

            //比對陣列的值
            arrProduct = updateProductArray(item, arrProduct);
        }
    }


    //商品統計，顯示全部商品
    if ($('#chkShowAllProduct').prop('checked')) {
        //console.log('enter check');
        var arrNewAll = [];
        $('.productItem').each(function () {
            var code = $(this).attr('id');
            var name = $(this).find('.name').html();

            var item = {};
            item.name = name;
            item.code = code;

            item.upAmount = 0;
            item.downAmount = 0;

            item.remaining_amount = 0;
            item.total = 0;
            item.charge = 0;
            item.win_loss = 0;
            //item.preStore = 0;
            item.preserver_money = 0;
            //unoffset_count[code] = { 'count': 0, 'color': 'black' };
            for (var m = 0; m < arrProduct.length; m++) {
                if (code == arrProduct[m].code) {
                    item = arrProduct[m];
                }
            }
            arrNewAll.push(item);
        });
        //倒回原本陣列
        arrProduct = arrNewAll;
    }

    // console.log(JSON.stringify(arrProduct));
    //串出商品統計的 html
    var totalProfit = 0;
    var html = '';
    var totalPreserver = 0;
    for (var m = 0; m < arrProduct.length; m++) {
        html += '<tr>';

        for (var index in arrProduct[m]) {
            if (index == 'code')
                continue;
            if (index == 'win_loss') {
                if (arrProduct[m][index] > 0) {
                    html += '<td style="text-align:center;color:rgb(41, 149, 188);">' + arrProduct[m][index] + '</td>';
                } else if (arrProduct[m][index] < 0) {
                    html += '<td style="text-align:center;color:#eb6b61;">' + arrProduct[m][index] + '</td>';
                } else {
                    html += '<td >' + arrProduct[m][index] + '</td>';
                }

                //排除留倉預扣，不再影響損益
                //if (arrProduct[m].preserver_money > 0) {} else {
                totalProfit += Number(arrProduct[m][index]);
                //}

            } else {

                //如果是total這個欄位，要判斷顯示背景頻色
                var strColor = 'transparent';
                if (index == 'remaining_amount') {

                    if (arrProduct[m][index] > 0) {
                        strColor = red;
                    } else if (arrProduct[m][index] < 0) {
                        strColor = green;
                    }
                }

                html += '<td style="text-align:center;background-color:' + strColor + ';" >' + arrProduct[m][index] + '</td>';
            }

            if (index == 'preserver_money') {
                totalPreserver += Number(arrProduct[m][index]);
            }
        }
        html += '</tr>';
    }
    $('#list_static').html(html);


    // #option4 - calculate td width
    // for (var n = 1; n < 9; n++) {
    //     $("#option4 table tbody tr td:nth-child(" + n + ")").css("width", $("#option4 table thead tr th:nth-child(" + n + ")").width() + "px");
    // }

    //處理者用者損益
    var userMoney = 0; //Number($('#user_money').val());
    var money_deposit = 0;
    var win_max = 0;
    var win_max_check = 0;
    //console.log();
    if (user_config != null) {
        //原本：//
        // for (p = 0; p < user_config.length; p++) {
        // userMoney = user_config[p].user_money;
        // win_max = user_config[p].max_win_money_range;
        // win_max_check = user_config[p].is_max_win_check;
// console.log(user_config);
        money_deposit = Number(user_config[0].money_deposit);
        userMoney = Number(user_config[0].user_money) + Number(money_deposit);
        win_max = user_config[0].max_win_money_range;
        win_max_check = user_config[0].is_max_win_check;
        // }




    }
    if (userMoney == null) {
        userMoney = 0;
    }
    //加上集營
    userMoney += max_win;
    if (totalProfit != null) {


        userMoney = Number(userMoney) + Number(totalProfit);

        if (sendUpdateProfit == false) {
            setInterval(updateProfit, 3000);
            sendUpdateProfit = true;
        }

        //若有負額調整則加回 ,但要計算玩的餘額扣掉儲值金額
        if (userMoney - money_deposit < 0) {
            userMoney += Number(neg_money);
        }


//                console.log('$$:'+userMoney + "," + Number(win_max));
    }

    if (userMoney <= 0) {
        userMoney = 0;
    }
    if (userMoney >= Number(win_max) && win_max_check == 1) {
        userMoney = Number(win_max);
    }
    //帳戶餘額
    //console.log('餘額＝' + userMoney);



    var strProfit = totalProfit;
    if (totalProfit > 0) {
        strProfit = '<span style="color:red;">' + strProfit + '</span>';
    }
    if (totalProfit < 0) {
        strProfit = '<span style="color:green;">' + strProfit + '</span>';
    }
    //今日損益
    $("#user_profit").html(strProfit);
    $("#user_profit2").html(strProfit);
    $("#user_profit3").html(strProfit);
// console.log('user_money');
// console.log(userMoney);
    //更新餘額
    // $("#li_user_money").html(Number(ori_user_money)+totalProfit);
    // $("#li_user_money2").html(Number(ori_user_money)+totalProfit);
    // $("#user_money").html(Number(ori_user_money)+Number(totalProfit));
    // $(".user_money").html(Number(ori_user_money)+Number(totalProfit));
    // console.log('userMoney'+userMoney);
    if (isNaN(userMoney) == false) {
        $("#li_user_money").html(Number(userMoney));
        $("#li_user_money2").html(Number(userMoney));
        $("#user_money").html(Number(userMoney));
    }

    // $(".user_money").html(Number(userMoney));
    //預倉預扣總額
    $('#spanReserverMoney').html(totalPreserver);
}

function updateProductArray(item, arrProduct) {
    var isEqual = false;
    for (var k = 0; k < arrProduct.length; k++) {
        if (item.code == arrProduct[k].code) {

            arrProduct[k].upAmount += isNull(item.upAmount);
            arrProduct[k].downAmount += isNull(item.downAmount);

            arrProduct[k].remaining_amount += isNull(item.remaining_amount);
            arrProduct[k].total += isNull(item.total);
            arrProduct[k].charge += isNull(item.charge);
            arrProduct[k].win_loss += isNull(item.win_loss);
            arrProduct[k].preserver_money += isNull(item.preserver_money);
            isEqual = true;
            break;
        }
    }
    //建立新的一筆資料
    if (isEqual == false) {
        var newItem = {};
        newItem.name = item.name;
        newItem.code = item.code;
        newItem.upAmount = isNull(item.upAmount);
        newItem.downAmount = isNull(item.downAmount);

        newItem.remaining_amount = isNull(item.remaining_amount);
        newItem.total = isNull(item.total);
        newItem.charge = isNull(item.charge);
        newItem.win_loss = isNull(item.win_loss);
        newItem.preserver_money = isNull(item.preserver_money);
        arrProduct.push(newItem);
    }
    return arrProduct;
}

function isNull(objVal) {
    if (objVal == null)
        return 0;
    else
        return Number(objVal);
}

function getBuyCharge(item) {
    var charge = 0;
    switch (item.charge_type) {
        case '0': //代理
            charge = item.buy_charge;

            break;
        case '1': //大
            charge = item.buy_charge_large;

            break;
        case '2': //中
            charge = item.buy_charge_med;

            break;
        case '3': //小
            charge = item.buy_charge_small;

            break;
        case '4': //迷你
            charge = item.buy_charge_mini;

            break;
    }
    return charge;
}

function getSellCharge(item) {
    var sellCharge = 0;
    switch (item.charge_type) {
        case '0': //代理
            sellCharge = item.sell_charge;
            break;
        case '1': //大
            sellCharge = item.sell_charge_large;
            break;
        case '2': //中
            sellCharge = item.sell_charge_med;
            break;
        case '3': //小
            sellCharge = item.sell_charge_small;
            break;
        case '4': //迷你
            sellCharge = item.sell_charge_mini;
            break;
    }
    return sellCharge;
}

function getProductPrice(item) {
    var price = 0;
    switch (item.charge_type) {
        case '0': //代理
            price = item.price;

            break;
        case '1': //大
            price = item.price_large;

            break;
        case '2': //中
            price = item.price_med;

            break;
        case '3': //小
            price = item.price_small;

            break;
        case '4': //迷你
            price = item.price_mini;

            break;
    }
    return price;

}

function showLoginFailMessage(code) {
    var errMsg;

    switch (code) {
        case 401:
            errMsg = "此帳號目前暫停使用!!";
            break;

        case 403:
            errMsg = "此帳號已被凍結!!";
            break;

        default:
            errMsg = "登入失敗.錯誤代碼:" + code;
            break;
    }
    alertify.error(errMsg);
}

function trimDate(strDateTime) {
    var arrDate = strDateTime.split(' ');
    if (arrDate[1] == null)
        return "&nbsp;";
    if (arrDate[1] == "00:00:00")
        return "&nbsp;";

    return arrDate[1];
}

function render(str) {
    $('body').append('<p>' + str + '</p>');
}

//指定特定商品平倉
function storeProduct(id) {
    //var arrID = id.split('_');
    //$("#" + id).hide();
    var _isadmin = '';
    _isadmin = getAdminTag();
    var serv_cmd = {};
    serv_cmd.cmd = 'storeOrder';
    serv_cmd.token = QueryString('token');
    serv_cmd.data = {
        "orderID": id,
        "is_admin": _isadmin
    };
    //{"cmd":"preOrder","token":" DD5F125C-12E9-07A1-3232-01282A23FB71","data":{"product_code":"TN","up_down":"up","amount":1,"up_limit":199,"down_limit":50}}
    //storing.push(arrID[1]);
    doSend(JSON.stringify(serv_cmd));
    alertify.success('訂單處理中，請稍候');
}

function refresh() {
    var serv_cmd = {};
    serv_cmd.cmd = 'refresh';
    serv_cmd.token = QueryString('token');
    serv_cmd.data = {

    };
    doSend(JSON.stringify(serv_cmd));
}

//刪除收盤單
function deleteCloseorder(id) {

    var model = {'id': id}
    var obj = ajaxSave(model, 'operation/deleteCloseorder');
    obj.success(function (res) {
        if (res.msg == 'success') {
            alertify.success('刪除收盤單成功');
        } else {
            alertify.error('刪除收盤單失敗');
        }
    });
}
//更新即時損益
function updateProfit() {

    var profit = $("#user_profit").text();
    var model = {'profit': profit, 'token': QueryString('token')}
    var obj = ajaxSave(model, 'operation/setUserProfit');
    obj.success(function (res) {
        // console.log(res);//
        if (res.msg == 'login_expire') {
            window.location = "http://" + window.location.host
        }
        if (res.isSuccess == true) {
            // console.log("updateProfit isSuccess");
        } else {
            // console.log("updateProfit failed");
        }
    });
}

//取得物件長度
//function countProperties (obj) {
//    var count = 0;
//
//    for (var property in obj) {
//        if (Object.prototype.hasOwnProperty.call(obj, property)) {
//            count++;
//
//        }
//    }
//            if()
//            {
//                
//            }
//    return count;
//}


function get_order()
{
    //console.log(lastestProduct);
   // console.log(lastestProduct.size);
  // console.log(Object.keys(lastestProduct).length);
    if(Object.keys(lastestProduct).length > 0)
    {
        // console.log(lastestProduct);
      var model = {'token': QueryString('token')}
      // console.log(model);
      if(model)
      {
            var obj = ajaxSave(model, 'operation/get_order');
            obj.success(function (res) {
       // console.log(res);
             orderList1(res.array_oder, res.user_product);
            });             
      }
   
    }

}


function updateToken() {

    var model = {'token': QueryString('token')}
    var obj = ajaxSave(model, 'operation/updateToken');
    obj.success(function (res) {
        if (res.isSuccess == false) {
            
            alert(res.msg);
            var url =webroot + 'login/noauto';
            window.location = url;

        }
    });
}

//刪除掛單
function deletePreorder(id) {



    var model = {'id': id}
    var obj = ajaxSave(model, 'operation/deletePreorder');
    //alert(JSON.stringify(model));
    obj.success(function (res) {
        if (res.msg == 'success') {
            alertify.success('刪除掛單成功');
        } else {
            alertify.error('刪除掛單失敗');
        }
    });
}

//修改限價單
function updateLimitOrder(id) {
    alertify.success('修改限價單');
}



//五檔報價       
function updateFivePrice(obj) {
    //render(JSON.stringify(obj));
    var html = '';
    if (obj != null) {
        var totalBuy = Number(obj['buy_2_amount']) + Number(obj['buy_3_amount']) + Number(obj['buy_4_amount']) + Number(obj['buy_5_amount']);
        var totalSell = Number(obj['sell_2_amount']) + Number(obj['sell_3_amount']) + Number(obj['sell_4_amount']) + Number(obj['sell_5_amount']);

        for (var i = 5; i >= 1; i--) {
            var percentage = Number(obj['sell_' + i + '_amount']) / totalSell;
            var width = 50 * percentage;
            width = Math.round(width);
            html += '<ul class="list2">';
            html += '                   <li class="item2 one">';
            html += '                  </li>';
            html += '                   <li class="item2 two"></li>';
            html += '                   <li class="item2 three">' + obj['sell_' + i + '_price'] + '</li>';
            html += '                   <li class="item2 four">' + obj['sell_' + i + '_amount'] + '</li>';
            html += '                   <li class="item2 five">xx';
            html += '                       <div style="width:' + width + 'px;">xx</div>';
            html += '                   </li>';
            html += '               </ul>';
        }

        html += '<ul class="list2">';
        html += '                   <li class="item2 one">';
        html += '                  </li>';
        html += '                   <li class="item2 two"></li>';
        html += '                   <li class="item2 three">' + nowSelectedPrice + '</li>';
        html += '                   <li class="item2 four"></li>';
        html += '                   <li class="item2 five">xx';
        html += '                   </li>';
        html += '               </ul>';

        for (var i = 1; i < 6; i++) {
            var percentage2 = Number(obj['buy_' + i + '_amount']) / totalBuy; //sdfsdfsfsdfsd
            var width2 = 50 * percentage2;
            width2 = Math.round(width2);
            html += '<ul class="list2" >';
            html += '                   <li class="item2 one" >';
            html += '                      <div style="width:' + width2 + 'px;margin-top:-17px;"></div>';
            html += '                  </li>';
            html += '                   <li class="item2 two" >' + obj['buy_' + i + '_amount'] + '</li>';
            html += '                   <li class="item2 three">' + obj['buy_' + i + '_price'] + '</li>';
            html += '                   <li class="item2 four"></li>';
            //html += '                   <li class="item2 five">xx';
            //html += '                       <div>xx</div>';
            //html += '                   </li>';
            html += '               </ul>';
        }
    }
    //alert(selectedProduct);
    //if (selectedProduct == '') {
    //$('#info1').html('');
    //} else {
    $('#info1').html(html);
    //}

    $('#fivePrice_totalBuy').html(totalBuy);
    $('#fivePrice_totalSell').html(totalSell);

    var barWidth = Math.round(70 * (totalBuy / (totalBuy + totalSell))); //sdf
    var bar2Width = 70 - barWidth;
    //console.log(barWidth + "," + bar2Width);
    $("#fivePrice_totalBuyBar").css('width', barWidth + 'px');
    $("#fivePrice_totalSellBar").css('width', bar2Width + 'px');
}

//分價揭示
function newPrice(obj) {
    if (obj == null)
        return;
    var arrTime = obj.create_date.split(' ');
    var upDown = '';
    if (obj.up_down_sign == '+')
        upDown = '<i class="fa fa-caret-up" aria-hidden="true"></i>';
    if (obj.up_down_sign == '-')
        upDown = '<i class="fa fa-caret-down" aria-hidden="true"></i>';

    var color = '';
    if (obj.up_down_sign == '+') {
        color = red;
    } else if (obj.up_down_sign == '-') {
        color = green;
    } else {
        color = 'LightSlateGray';
    }

    var strHtml = '<ul class="list2">'; //123asd
    strHtml += '<li class="item2 one">' + arrTime[1] + '</li>';
    strHtml += '<li class="item2 two">' + obj.now_amount + '</li>';
    strHtml += '<li class="item2 three" style="width:60px;color:' + color + '">' + upDown + ' ' + obj.up_down_count + '</li>';
    strHtml += '<li class="item2 four" style="color:' + color + ';padding-left:20px;">' + obj.new_price + '</li>';
    strHtml += '</ul>';
    //alert(strHtml);
    $('#info3').append(strHtml);

    if ($('#chk_bottom').prop('checked')) {
        var div = document.getElementById('info3');
        //alert(div.scrollTop + ","+ div.scrollHeight);
        div.scrollTop = div.scrollHeight + 99999999999;
        //div.scrollTop = 99999999999;

        //alert(div.scrollTop);

    }
}

//主要商品價格
function updateProduct(obj) {
    // console.table(obj);
    var upDown = '';
    if (obj.up_down_sign == '+')
        upDown = '▲';
    if (obj.up_down_sign == '-')
        upDown = '▼';


    color ='';
    st = '';
    var color = '';
    if (obj.up_down_sign == '+') {
        color = '#eb6b61';
        st = 'UpRed';
    } else if (obj.up_down_sign == '-') {
        // color = '#55DF56';
        // color = '#0f0';
        color = '#01b72c';
        st = 'downGreen';
    } else {
        color = 'white';
        // st = 'downWhite';
    }

    var strTotal = '';
    if (obj.product_code == 'TS') {
        strTotal = '(億)';
    }
    //console.log(obj.product_code + ' , ' + strTotal);

    /*
     var str = '<ul class="figure" id="' + obj.product_code + '" >';
     str += '        <li class="figure_result product name" >' + obj.name + '</li>';
     str += '        <li class="figure_result store blue" data-bind="text: store ">0</li>';
     str += '        <li class="figure_result k" data-bind="text: k">x</li>';
     str += '        <li class="figure_result sit" data-bind="text: sit">x</li>';
     str += '        <li class="figure_result amount blue" data-bind="text: amount">' + obj.new_price + '</li>';
     str += '        <li class="figure_result buy" data-bind="text: buy" style="color:' + color + ';">' + obj.buy_1_price + '</li>';
     str += '        <li class="figure_result sell" data-bind="text: sell" style="color:' + color + ';">' + obj.sell_1_price + '</li>';
     str += '        <li class="figure_result updown" data-bind="text: updown" style="color:' + color + ';">' + upDown + obj.up_down_count + '</li>';
     str += '        <li class="figure_result percentage" data-bind="text: percentage" style="color:' + color + ';">' + obj.up_down_rate + '</li>';
     str += '        <li class="figure_result total blue" data-bind="text: total" >' + obj.total_amount + strTotal + '</li>';
     str += '        <li class="figure_result open" data-bind="text: open" style="color:' + color + ';">' + obj.open_price + '</li>';
     str += '        <li class="figure_result max" data-bind="text: max" style="color:' + color + ';">' + obj.high_price + '</li>';
     str += '        <li class="figure_result min" data-bind="text: min" style="color:' + color + ';">' + obj.low_price + '</li>';
     str += '        <li class="figure_result y_close" data-bind="text: y_close" style="color:' + color + ';">' + obj.last_close_price + '</li>';
     str += '        <li class="figure_result y_total" data-bind="text: y_total" style="color:' + color + ';">' + obj.last_new_price + '</li>';
     str += '        <li class="figure_result status" data-bind="text: status">' + obj.status_name + '</li>';
     str += '       <input type="hidden" class="price_no" value="' + obj.price_no + '"></input>';
     str += '    </ul>';
     */
    var bool = false;
    $('.figure').each(function () {
        var orginColor = '';

        $(this).find('.amount').css('background-color', orginColor);
        $(this).find('.buy').css('background-color', orginColor);
        $(this).find('.sell').css('background-color', orginColor);
        $(this).find('.buy').css('background-color', orginColor);
        $(this).find('.updown').css('background-color', orginColor);
        $(this).find('.percentage').css('background-color', orginColor);
        $(this).find('.total').css('background-color', orginColor);
        $(this).find('.open').css('background-color', orginColor);
        $(this).find('.max').css('background-color', orginColor);
        $(this).find('.min').css('background-color', orginColor);
        $(this).find('.y_close').css('background-color', orginColor);
        $(this).find('.y_total').css('background-color', orginColor);
        $(this).find('.status').css('background-color', orginColor);

        var strTotal = '';
        if (obj.product_code == 'TS') {
            strTotal = '(億)';
        }

        if (obj.product_code == $(this).attr('id')) {

            $(this).find('.amount').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.buy').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.sell').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.updown').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.percentage').removeClass('UpRed downGreen').addClass(st);
            //$(this).find('.total').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.open').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.max').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.min').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.y_close').removeClass('UpRed downGreen').addClass(st);
            $(this).find('.y_total').removeClass('UpRed downGreen').addClass(st);

            var lastUpdateColor = 'gray';
            //為了對應五價揭的資料
            $(this).find('.price_no').val(obj.price_no);
            //var properties = ['name','','','','']

            if ($(this).find('.amount').html() != obj.new_price) {
                //var amount = $(this).find('.amount');
                $(this).find('.amount').html(obj.new_price);
                //$(this).find('.amount').css('border','solid 1px blue'); 
                //$(this).find('.amount').animate({ borderColor: "#000"}, 'fast');
            }

            if ($(this).find('.buy').html() != obj.buy_1_price) {
                $(this).find('.buy').html(obj.buy_1_price);
                $(this).find('.buy').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.sell').html() != obj.sell_1_price) {
                $(this).find('.sell').html(obj.sell_1_price);
                $(this).find('.sell').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.updown').html() != obj.up_down_count) {
                $(this).find('.updown').html(upDown + ' ' + obj.up_down_count);
                $(this).find('.updown').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.percentage').html() != obj.up_down_rate) {
                $(this).find('.percentage').html(obj.up_down_rate);
                $(this).find('.percentage').css('background-color', lastUpdateColor);
            }

            //console.log(strTotal);

            if ($(this).find('.total').html() != obj.total_amount) {
                $(this).find('.total').html(obj.total_amount + strTotal);
                $(this).find('.total').css('background-color', lastUpdateColor);
            }


            if ($(this).find('.open').html() != obj.open_price) {
                $(this).find('.open').html(obj.open_price);
                $(this).find('.open').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.max').html() != obj.high_price) {
                $(this).find('.max').html(obj.high_price);
                $(this).find('.max').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.min').html() != obj.low_price) {
                $(this).find('.min').html(obj.low_price);
                $(this).find('.min').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.y_close').html() != obj.last_close_price) {
                $(this).find('.y_close').html(obj.last_close_price);
                $(this).find('.y_close').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.y_total').html() != obj.last_new_price) {
                $(this).find('.y_total').html(obj.last_new_price);
                $(this).find('.y_total').css('background-color', lastUpdateColor);
            }

            if ($(this).find('.status').html() != obj.status_name) {
                if (obj.status_name == '未開盤') {

                    $(this).find('.status').removeClass('figure_result');
                    $(this).find('.status').addClass('gray');
                } else {
                    $(this).find('.status').removeClass('gray');
                    $(this).find('.status').addClass('figure_result');
                }
                $(this).find('.status').html(obj.status_name);
                $(this).find('.status').css('background-color', lastUpdateColor);
                call_sound(3);
            }
            bool = true;
        }
    });
    //if (!bool) {
    //    $('#stock').append(str);
    //}
}

//商品統計
function productStatic(orderData) {
    if (orderData == null)
        return false;
    var arrAll = [];
    /* var obj = {
     name: '',
     code: '',
     upTotal: 0,
     downTotal: 0,
     notStore: 0,
     totalAmount: 0,
     fee: 0,
     profit: 0,
     restStore: 0
     };
     */
    //掃己平倉的商品，做商品統計
    for (var i = 0; i < orderData.length; i++) {
        if (orderData[i].listType != 'list3') {
            continue;
        }

        isNew = true;
        for (var j = 0; j < arrAll.length; j++) {
            if (arrAll[j].code == orderData[i].code) {

                if (orderData[i].up_down == "up") {
                    arrAll[j].upTotal = Number(arrAll[j].upTotal) + Number(orderData[i].amount);
                }
                if (orderData[i].up_down == "down") {
                    arrAll[j].downTotal = Number(arrAll[j].downTotal) + Number(orderData[i].amount);
                }

                arrAll[j].totalAmount = Number(arrAll[j].totalAmount) + Number(orderData[i].amount);

                arrAll[j].fee += Number(orderData[i].amount) * $('#' + orderData[i].code).attr('charge');
                isNew = false;
            }
        }

        if (isNew) {
            var obj = {
                name: orderData[i].name,
                code: orderData[i].code,
                upTotal: 0,
                downTotal: 0,
                notStore: 0,
                totalAmount: orderData[i].amount,
                fee: orderData[i].amount * $('#' + orderData[i].code).attr('charge'),
                profit: 0,
                restStore: 0
            };
            if (orderData[i].up_down == "up") {
                obj.upTotal += orderData[i].amount;

            }
            if (orderData[i].up_down == "down") {

                obj.downTotal += orderData[i].amount;
            }
            arrAll.push(obj);
        }
    }



    //商品統計，顯示全部商品
    //console.log('enter check');
    if ($('#chkShowAllProduct').prop('checked')) {
        //console.log('enter check');

        var arrNewAll = [];
        $('.productItem').each(function () {
            var code = $(this).attr('id');
            var name = $(this).find('.name').html();
            var item = {
                name: name,
                code: code,
                upTotal: 0,
                downTotal: 0,
                notStore: 0,
                totalAmount: 0,
                fee: 0,
                profit: 0,
                restStore: 0
            };
            //unoffset_count[code] = { 'count': 0, 'color': 'black' };
            for (var m = 0; m < arrAll.length; m++) {
                if (code == arrAll[m].code) {
                    item = arrAll[m];
                }
            }


            arrNewAll = item;
        });
        //倒回原本陣列
        arrAll = arrNewAll;
    }


    var html = '';
    for (var k = 0; k < arrAll.length; k++) {

        html += ' <tr > ';
        html += '<td >' + arrAll[k].name + '</td>';
        html += '<td>' + arrAll[k].upTotal + '</td>';
        html += '<td>' + arrAll[k].downTotal + '</td>';
        html += '<td>' + arrAll[k].notStore + '</td>';
        html += '<td>' + arrAll[k].totalAmount + '</td>';
        html += '<td>' + arrAll[k].fee + '</td>';
        html += '<td>' + arrAll[k].profit + '</td>';
        html += '<td>' + arrAll[k].restStore + '</td>';
        html += '</tr>';
    }

    $('#list_static').html(html);

}

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

function formatFloat(num, pos) {
    var size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}

//收盤全平
function close_offset() {
    if (selectedProduct == '') {
        alertify.error('請選擇商品');
        $('#chkClose').prop('checked', false);
        return false;
    }


    var url = '';
    var msg = '';
    if ($('#chkClose').prop('checked')) {
        url = 'operation/close_offset';
        msg = '設定收盤全平成功';
    } else {
        url = 'operation/cancel_close_offset';
        msg = '取消收盤全平';
    }

    var obj = ajaxSave({'product_code': selectedProduct}, url);
    obj.success(function (res) {
        //alert(JSON.stringify(res));
        //alertify.success(JSON.stringify(res));
        if (res.msg == 'success') {
            alertify.success(msg);

            if (url == 'operation/close_offset') {
                var product_name = $('#' + selectedProduct).find('.name').html();
                $('#close_msg').html(product_name + '，收盤全平');
            } else {
                $('#close_msg').html('');
            }

        } else {
            $('#chkClose').prop('checked', false);
            alertify.error(res.msg);
        }
    });
}

//跳出修改限價單視窗
function open_modify_limit(id, amount, product_code) {
    //alert(id);
    $('#limit_modify_price').val('');
    $('#limit_modify_amount').val('');
    $('#modify_preID').val(id);

    var obj = ajaxSave({'pre_id': id}, 'operation/loadPreOrder');
    obj.success(function (res) {
        //alert(JSON.stringify(res));
        $('#limit_modify_price').val(res.pre_order.limit_price);
        $('#limit_modify_amount').val(res.pre_order.amount);
        //alertify.error('讀取失敗');
    });

    $("#tallModal").modal('show');
    //var price = $('#'+product_code ).find('.buy').html();
    //$.colorbox({ inline: true, href: "#divModify", width: '50%', height: '50%' });
}

//儲存限價單
function limit_modify_save() {
    var id = $('#modify_preID').val();
    var price = $('#limit_modify_price').val();
    var amount = $('#limit_modify_amount').val();
    var type = 4;
    if ($('#limit_modify_type1').prop('checked')) {
        type = 2;
    }
    if ($('#limit_modify_type2').prop('checked')) {
        type = 4;
    }

    var obj = ajaxSave({'pre_id': id, 'price': price, 'amount': amount, 'type': type}, 'operation/savePreOrder');
    obj.success(function (res) {
        if (res.msg == 'success') {
            $('#limit_modify_price').val('');
            $('#limit_modify_amount').val('');
            $('#modify_preID').val('');
            $("#tallModal").modal('hide');
            //close();
        } else {
            alert(res.msg);
        }
    });

}


function storeOrder(order_id) {
    //ajax送出，這些ID，平倉
    var obj = ajaxSave({'order_id': order_id}, 'operation/storeOrder');
    obj.success(function (res) {
        if (res.msg = 'success') {
            alertify.success('訂單處理中');
        } else {
            alertify.error(res.msg);
        }
    });
}

//多選商品平倉
function storeMulti() {
    //取得第二個列表，有選取項目的平倉
    var arrOrderID = [];
    $('.chkList2').each(function () {
        if ($(this).prop('checked')) {
            var id = $(this).attr('id');
            //alert(id);
            var arrID = id.split('_');
            arrOrderID.push(arrID[2]);
        }
    });

    //ajax送出，這些ID，平倉
    var obj = ajaxSave({'arrID': arrOrderID}, 'operation/storeMulti');
    //alert(selectedProduct);
    alertify.success('訂單處理中，請稍候');
    obj.success(function (res) {
        if (res.msg == 'success') {
            alertify.success('訂單處理中');
        } else {
            alertify.error(res.msg);
        }

    });
}

//選商品，全平訂單
function storeAllProduct() {
    if (selectedProduct == '') {
        alertify.error('請選擇商品');
        return false;
    }
    var name = $('#' + selectedProduct).find('.name').html();
    var obj = ajaxSave({'product_code': selectedProduct}, 'operation/storeProduct');
    alertify.success(name + "全平送出");

    obj.success(function (res) {
        if (res.msg == 'success') {
        } else {
            alertify.error(res.msg);
        }

    });

}


function saveLimitMulti() {
    var arrOrderID = [];
    $('.chkList2').each(function () {
        if ($(this).prop('checked')) {
            var id = $(this).attr('id');

            //alert( $(this).parent().parent().find('button').attr('disabled') );

            if ($(this).parent().parent().find('button').attr('disabled') == null) {
                var arrID = id.split('_');
                arrOrderID.push(arrID[2]);
            }

        }

    });

    $('#selected_order_id').val(arrOrderID);

    //alert( $('#selected_order_id').val());
    //alert(arrOrderID);
    /*$.colorbox({
     inline: true,
     href: "#divLimit",
     width: '50%',
     height: '50%'
     });*/
    $("#tallModal2").modal('show');

}

//============================================
//查詢量價分佈
//============================================
function ajaxLoad_price_amount() {
    var loading = '<img src="' + webroot + '/assets/img/loading2.gif" width="20" />';
    //alert(selectedProduct);
    var data = {'product': selectedProduct};
    var obj = ajaxSave(data, 'operation/loadPriceAmount');
    obj.success(function (res) {

        if (res != null) {
            //計算總量，
            selected_product_total = 0;
            var arrNew = [];
            for (var key in res) {
                var item = {'price': key, 'amount': res[key]};
                arrNew.push(item);
                selected_product_total += res[key];
            }
            genAmountPriceView(arrNew);
        } else {
            $('#price_amount_list').html('');
        }

    });
}

function genAmountPriceView(arrNew) {
    var shtml = '';

    var length = 40;
    var obj = lastestProduct[selectedProduct];
    var i = 0;
    var now_index = 0;
    var open_index = 0;


    //console.log(arrNew[0]);
    var arrLength = arrNew.length - 1;
    var now_index;
    var open_index;

    //alert(total);
    var now_price_index = 0;
    var j = 0;
    for (var i = arrLength; i >= 0; i--) {
        //var barLength =  Math.floor((Math.random() * 10) + 10);
        //乘60000只是為了調整長條圖長度
        var barLength = arrNew[i].amount / selected_product_total * 6000;
        if (barLength < 1)
            barLength = 1;
        if (barLength > 45)
            barLength = 45;
        //alert(arrNew[i].price + ","+ arrNew[i].amount);
        shtml += '<ul id="ul_amount_price_' + j + '" class="list2 amount_price" price="' + arrNew[i].price + '" amount="' + arrNew[i].amount + '" >';
        shtml += '      <li class="item2 one">' + arrNew[i].price + '</li>';
        shtml += '       <li class="item2 two"></li>';
        shtml += '       <li class="item2 three">xx';
        shtml += '          <div style="width:' + barLength + 'px;">xx</div>';
        shtml += '      </li>';
        shtml += '      <li class="item2 four">' + arrNew[i].amount + '</li>';
        shtml += '  </ul>';


        // var border = '';
        // if (i == 0 || i == (arrNew.length - 1)) {
        //     border = 'style="border:solid 1px red;"';
        // }
        if (arrNew[i].price == obj.new_price) {
            now_index = j;
            now_price_index = j;

        }
        // if (arrNew[i].price == obj.open_price) {
        //     open_index = j;
        // }
        j++;
    }

    $('#price_amount_list').html(shtml);


    $("#price_amount_list")
            .find('ul[price=' + obj.open_price + ']')
            .addClass('amount_price_open')
            .find('.two').html('開盤');

    $('#ul_amount_price_' + now_index)
            .addClass('amount_price_now');

    $('#ul_amount_price_0')
            .addClass('amount_price_high');

    $("#price_amount_list").find('ul:last')
            .addClass('amount_price_low');


    //將目前現價 index放到全域變數
    centerHeight = now_price_index;
}

//每有價位更新，更新量價分佈
function amount_price_per_tick(product) {
    var price = product.new_price;
    var amount = product.now_amount;
    var open_price_value = lastestProduct[product.product_code].open_price;

    //console.log(JSON.stringify(product));
    selected_product_total += amount;


    var isSamePrice = false;

    //清除樣式
    $('.amount_price').removeClass('amount_price_now amount_price_high amount_price_low');

    $('.amount_price').each(function (index) {

        //價位一樣，設定為現價
        if ($(this).attr('price') == price) {
            isSamePrice = true;
            var old_price = $(this).find('.four').html();

            $(this).find('.four').html(Number(old_price) + amount);
            $(this).addClass('amount_price_now');

            //將目前現價 index放到全域變數
            centerHeight = index;
            return false;
        }
    });

    //如果沒有這個價位
    if (isSamePrice == false) {
        //插入新的價位
        var barLength = amount / selected_product_total * 6000;
        if (barLength < 1)
            barLength = 1;
        else if (barLength > 45)
            barLength = 45;

        var shtml = '<ul id="ul_amount_price_" class="list2 amount_price amount_price_now" price="' + price + '" amount="' + amount + '" >';
        shtml += '      <li class="item2 one">' + price + '</li>';
        shtml += '       <li class="item2 two"></li>';
        shtml += '       <li class="item2 three">xx';
        shtml += '          <div style="width:' + barLength + 'px;">xx</div>';
        shtml += '      </li>';
        shtml += '      <li class="item2 four">' + amount + '</li>';
        shtml += '  </ul>';

        //先找有沒有比他小的,有的話塞前面
        $('.amount_price').each(function (index) {
            if (price > $(this).attr('price')) {
                $(shtml).insertBefore($(this));
                centerHeight = index;
                isSamePrice = true;
                return false;
            }
        });

        //如果都沒有找到價格,塞最後
        if (isSamePrice == false)
        {
            $("#price_amount_list").append(shtml);
            centerHeight = $('.amount_price').length - 1;
        }
    }


    //設定最高價,最低價
    $('.amount_price:first')
            .addClass('amount_price_high');
    $('.amount_price:last')
            .addClass('amount_price_low');

}

function price_amount_view(type)
{
    var objDiv = $("#price_amount_left_bottom_body");       //主視窗
    objDiv.scrollTop(0);    //捲動位置歸0(不然抓不到正確位置)

    var objHeight = objDiv.height();                        //主視窗高度
    var objTop = objDiv.position().top;                     //主視窗的位置
    var moveTo = $(".amount_price_now").position().top - objTop;     //現價位置
    var objLine = $(".amount_price_now").height();                   //現價欄位高度

    switch (type)
    {
        //往上,剛剛好
        case "top" :
            break;

            //置中
        case "center" :
            moveTo -= (objHeight / 2);
            break;

            //往下
        case "bottom" :
            moveTo -= (objHeight - objLine);
            break;
    }
    objDiv.scrollTop(moveTo);
}

//量價分佈，置中
function price_amount_view_center()
{
    price_amount_view('center');
}

function price_amount_view_top()
{
    price_amount_view('top');
}

function price_amount_view_bottom()
{
    price_amount_view('bottom');
}

//============================================
//查詢投顧訊息
//============================================
function searchAdvicer(type) {
    var str, st, ed, dt, tmp_dt, year, month, sec;
    dt = new Date();

    if (type == null) {
    } else {
        switch (type)
        {
            case 'today':
                $('#advicer_sdate').val(moment().format('YYYY-MM-DD'));
                $('#advicer_edate').val(moment().format('YYYY-MM-DD'));
                break;

            case 'yesterday':
                $('#advicer_sdate').val(moment().add('days', -1).format('YYYY-MM-DD'));
                $('#advicer_edate').val(moment().add('days', -1).format('YYYY-MM-DD'));

                break;

            case 'week':
                wk = dt.getDay();

                if (wk < 7) {
                    sec = (7 - wk) * 86400000;
                    tmp_dt = new Date(dt.getTime() + sec);
                    ed = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    wk--;
                    tmp_dt = new Date(dt.getTime() - (wk * 86400000));
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                } else {
                    tmp_dt = new Date(dt.getTime() - wk * 86400000);
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#advicer_sdate').val(st);
                $('#advicer_edate').val(ed);

                break;

            case 'lastWeek':
                wk = dt.getDay();
                if (wk < 7) {
                    dt = new Date(dt - (wk * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                } else {
                    dt = new Date(dt.getTime() - (7 * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#advicer_sdate').val(st);
                $('#advicer_edate').val(ed);
                break;

            case 'month':
                $('#advicer_sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#advicer_edate').val(moment().endOf('month').format('YYYY-MM-DD'));
                break;
        }
    }
    reloadToFirst('example');
}
//============================================
//查詢帳單
//============================================
function searchBill(type) {
    if (type == null) {
    } else {
        var str, st, ed, dt, tmp_dt, year, month, sec;

        dt = new Date();
        switch (type) {
            case 'today':
                $('#bill_sdate').val(moment().format('YYYY-MM-DD'));
                $('#bill_edate').val(moment().format('YYYY-MM-DD'));
                break;
            case 'yesterday':
                $('#bill_sdate').val(moment().add('days', -1).format('YYYY-MM-DD'));
                $('#bill_edate').val(moment().add('days', -1).format('YYYY-MM-DD'));

                break;

            case 'week':
                wk = dt.getDay();

                if (wk < 7) {
                    sec = (7 - wk) * 86400000;
                    tmp_dt = new Date(dt.getTime() + sec);
                    ed = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    wk--;
                    tmp_dt = new Date(dt.getTime() - (wk * 86400000));
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                } else {
                    tmp_dt = new Date(dt.getTime() - wk * 86400000);
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#bill_sdate').val(st);
                $('#bill_edate').val(ed);

                break;

            case 'lastWeek':
                wk = dt.getDay();
                if (wk < 7) {
                    dt = new Date(dt - (wk * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                } else {
                    dt = new Date(dt.getTime() - (7 * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#bill_sdate').val(st);
                $('#bill_edate').val(ed);
                break;

            case 'month':
                $('#bill_sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#bill_edate').val(moment().endOf('month').format('YYYY-MM-DD'));
                break;
        }
    }
    reloadToFirst('tb2');
}
//============================================
//查詢對帳單
//============================================
function searchMatchPO(type) {
    if (type == null) {
    } else {
        var str, st, ed, dt, tmp_dt, year, month, sec;

        dt = new Date();
        switch (type) {
            case 'today':
                $('#po_sdate').val(moment().format('YYYY-MM-DD'));
                $('#po_edate').val(moment().format('YYYY-MM-DD'));
                break;
            case 'yesterday':
                $('#po_sdate').val(moment().add('days', -1).format('YYYY-MM-DD'));
                $('#po_edate').val(moment().add('days', -1).format('YYYY-MM-DD'));

                break;

            case 'week':
                wk = dt.getDay();

                if (wk < 7) {
                    sec = (7 - wk) * 86400000;
                    tmp_dt = new Date(dt.getTime() + sec);
                    ed = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    wk--;
                    tmp_dt = new Date(dt.getTime() - (wk * 86400000));
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                } else {
                    tmp_dt = new Date(dt.getTime() - wk * 86400000);
                    st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth() + 1) + "-" + tmp_dt.getDate();
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#po_sdate').val(st);
                $('#po_edate').val(ed);

                break;

            case 'lastWeek':
                wk = dt.getDay();
                if (wk < 7) {
                    dt = new Date(dt - (wk * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                } else {
                    dt = new Date(dt.getTime() - (7 * 86400000));
                    ed = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    dt = new Date(dt.getTime() - (6 * 86400000));
                    st = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                }

                $('#po_sdate').val(st);
                $('#po_edate').val(ed);
                break;

            case 'month':
                $('#po_sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#po_edate').val(moment().endOf('month').format('YYYY-MM-DD'));
                break;
        }
    }
    reloadToFirst('tb7');
}

//============================================
//跳出視窗
//============================================
function popwin(path, fw, fh) {
    var param = 'token=' + QueryString('token');
    var url = '';
    if (path.indexOf('?') !== -1) {
        var arrPath = path.split('?');
        url = arrPath[0] + '?' + arrPath[1] + '&' + param;
    } else {
        url = path + '?' + param;
    }
    $.colorbox({
        iframe: "true",
        href: url,
        width: fw,
        height: fh,
        onComplete: function () {}
    });
}

function close() {
    $.colorbox.close();
}

function connect() {


}

function disconnect() {


}

function dialog_position() {
    $(".modal-dialog").position({
        my: 'left top-50',
        at: 'left',
        of: '.modal'
    });
}

function clear_stop_loss_profit() {
    var url = $('#ifStopLossProfit').attr('src');
    $('#ifStopLossProfit').attr('src', url);
}

function save_stop() {
    //window.ifStopLoss.saveLimit();
    var $f = $("#ifStopLossProfit");

    //alert($('#ifStopLoss').attr('src'));
    $f[0].contentWindow.saveLimit();
}

function close_limitWin() {
    $("#tallModal2").modal('hide');
}

function checkOnlineStatus() {
    var objChkOnline = $("#onlinestatus");
    ping('https://www.kantei.go.jp/').then(function (delta) {
        var chkOnlineCss, chkOnlineTitle;
        if (delta > 500) {
            chkOnlineTitle = "連線延遲";
            chkOnlineCss = "delay";
        } else {
            chkOnlineTitle = "連線正常";
            chkOnlineCss = "online";
        }
        objChkOnline.html(chkOnlineTitle).attr({class: chkOnlineCss, "title": "Ping:" + delta});
        setTimeout(checkOnlineStatus, 5000);
    }).catch(function (err) {
        objChkOnline.html("連線中斷").attr({class: "offline", "title": "Lose connection"});
        setTimeout(checkOnlineStatus, 5000);
    });
}

//============================================
//音效功能
//============================================
var sound_player = document.getElementById("sound_media");
if (sound_player === null) {
    $("body").prepend('<audio id="sound_media"></audio>');
    sound_player = document.getElementById("sound_media");
}
var mini_player = document.getElementById("mini_player");
if (mini_player === null) {
    $("body").prepend('<audio id="mini_player"></audio>');
    mini_player = document.getElementById("mini_player");
}
function call_midi(val) {
    var play_url = webroot + "assets/sound/";
    switch (val) {
        case 1 :    //按鍵滑過
            play_url += "hover_n.mp3";
            break;
        case 2 :    //按鍵按下去
            play_url += "click_n.mp3";
            break;
    }
    if (mini_player.paused) {
        mini_player.src = play_url;
        mini_player.play();
    }
}

function call_sound(val) {
    var play_url = webroot + "assets/sound/";
    switch (val) {
        case 1 :    //平倉獲利
            play_url += "tada.mp3";
            break;
        case 2 :    //結算獲利
            play_url += "bravo.mp3";
            break;
        case 3 :    //商品開盤/收盤
            play_url += "open.mp3";
            break;
        case 4 :    //結算
            play_url += "finish_n.mp3";
            break;
        case 5 :    //強制平倉
            play_url += "notice_n.mp3";
            break;
        case 6 :    //投顧訊息
            play_url += "message.mp3";
            break;
        case 7 :    //成交
            play_url += "deal.mp3";
            break;
    }
    if (sound_player.paused) {
        sound_player.src = play_url;
        sound_player.play();
    }
}


//取得現在時間
function getNowTime(today)
{
    var timeDate = new Date();
    var tMonth = (timeDate.getMonth() + 1) > 9 ? (timeDate.getMonth() + 1) : '0' + (timeDate.getMonth() + 1);
    var tDate = timeDate.getDate() > 9 ? timeDate.getDate() : '0' + timeDate.getDate();
    var tHours = timeDate.getHours() > 9 ? timeDate.getHours() : '0' + timeDate.getHours();
    var tMinutes = timeDate.getMinutes() > 9 ? timeDate.getMinutes() : '0' + timeDate.getMinutes();
    var tSeconds = timeDate.getSeconds() > 9 ? timeDate.getSeconds() : '0' + timeDate.getSeconds();

    timeDate = timeDate.getFullYear() + '-' + tMonth + '-' + tDate + ' ' + tHours + ':' + tMinutes + ':' + tSeconds;

    return timeDate;
}

//時間差

function DateDiff(sdate1, edate2) { //sDate1和sDate2是2017-9-25格式  
    //var aDate,bDate,tDate, oDate1, oDate2, iDays;

// if (!sDate1 || !sDate2) {
//      return;
// } else {
//      sDate1 = NewDate(sDate1);
//      sDate2 = NewDate(sDate2);
// }

//  aDate = sDate1.split("-");
//  sDate = sDate1.split(" ");
//  bDate = sDate[1].split(":");


//  cDate = sDate2.split("-");
//  pDate = sDate2.split(" ");
//  dDate = pDate[1].split(":");



// var Date_A = new Date(aDate[0],aDate[1],aDate[2],bDate[0],bDate[1],bDate[2]);  
// var Date_B = new Date(cDate[0],cDate[1],cDate[2],dDate[0],dDate[1],dDate[2]);  
// var Date_C = new Date(Date_B - Date_A);

//  iDays = parseInt(Math.abs(Date_A - Date_B) / 1000 ); //把相差的毫秒數轉換為秒  





    var date1 = new Date(sdate1).getTime();  //开始时间
    var date2 = new Date(edate2).getTime();    //结束时间
    var date3 = date1 - date2; //时间差的毫秒数


//计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));

//计算出小时数

    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
//计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));


//计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);

//alert(days);


    // oDate1 = new Date(aDate[0] + '-' +  + '-' +  +'-'+  +':'+  +':'+ ) //轉換為9-25-2017格式  

    // oDate2 = new Date(aDate[0] + '-' + aDate[1] + '-' + aDate[2]+'-'+ bDate[0] +':'+ bDate[1] +':'+ bDate[2]);
    // iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 ); //把相差的毫秒數轉換為秒  
    return date3;
}

function refreshProductMap(uProduct) {
    for (var i = 0; i < uProduct.length; i++) {
        var productCode = uProduct[i].product_code;
        userProductMap[productCode] = uProduct[i];
    }

}

function putProductToMap(productCode, product) {
    userProductMap[productCode] = product;
}
function removeProductFromMap(productCode) {
    delete userProductMap[productCode];
}
function productExist(productCode) {
    return productCode in userProductMap;
}

function getUserProduct(productCode) {
    return userProductMap[productCode];
}

function unsetSelectAccount(){
    var loginObj = getCookieJson("loginObj");
    if(loginObj ===''||loginObj===undefined||loginObj===null){
        loginObj ={};
    }
    delete loginObj[loginObj.now_select];
    loginObj.now_select = "";
    setCookieJson("loginObj",loginObj);

}
function getCookieJson(key) {
    var c = _getCookie(key);
    if (c === undefined || c === '') {
        return null;
    }
    var j = JSON.parse(c);
    console.log(j);
    return j;
}
function setCookieJson(key, json) {
    var jstr = JSON.stringify(json);
    _setCookie(key,jstr,365);
}



//============================================
//新功能測試
//============================================


