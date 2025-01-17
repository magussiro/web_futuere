    //var wsUri = "ws://202.55.227.39:8002";
    // 'ws://www.christophe.tw:9111/websocket/server2.php';
    var token = '';
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

    var user_status = 1;
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
    var green = '#55DF56';
    var red = '#eb6b61';
    var blue = '#66d9ff';

    //650 記錄server的訂單
    var oList1, oList2, oList3, uConfig, uProduct;

    //控制訂單列表，button是不是有作用
    var diableAllButton = false;
    var logined = false;

    //當頁面載入完成
    $(document).ready(function() {

        //$('.tb_list').fixedHeaderTable({ footer: false, cloneHeadToFoot: false, fixedColumn: false });
        //建立web socket

        //投顧訊息 時間
        $('#advicer_sdate').val(moment().format('YYYY-MM-DD'));
        $('#advicer_edate').val(moment().format('YYYY-MM-DD'));


        $('#amount').change(function(){
            var ob;
            ob = $(this);
            if ( parseInt(ob.val()) < 1 ) ob.val(1);
            if ( ob.val() % 1 !== 0 ) ob.val(parseInt(ob.val()));
        });

        $(".modal-dialog").draggable({
            drag: position
        });
        position();

        $("#marquee3").marquee();

        $('#chk_list1_unoffset').click(function() {
            refresh();
        });

        $('#orderList1_con').click(function() {
            refresh();
        });

        $('#chkShowAllProduct').click(function() {
            refresh();
        });

        //設定日期欄位：
        $('#advicer_sdate').datepicker({ dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true });
        $('#advicer_edate').datepicker({ dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true });

        $('#bill_sdate').datepicker({ dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true });
        $('#bill_edate').datepicker({ dateFormat: 'yy-mm-dd', autoclose: true, todayHighlight: true });
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
        var dbName = ["id", 'type', "name", "msg", 'create_date'];
        var title = ["ID", '類別', "老師", "訊息內容", "發佈時間"];
        var visible = [false, true, true, true, true];
        var render = [null, null, null, null, null];
        var ColumnDefs = GetColumns(dbName, title, visible, render);


        //預設
        var option = {
            "tableID": "example",
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
        DataTableUse(ColumnDefs, source, null, option);

        //===========================================
        //初始化 datatable －對帳表
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
        var dbName = ["id", 'date', "default_money", "user_money", 'total_profit', "total_amount", "money","adj_money","max_win", "pay_money_range", "total_profit"];
        var title = ["ID", "日期", '預設額度', "帳戶餘額", "今日損益", "口數", "留倉預扣","極輸","極贏", "對匯額度", "交收"];
        var visible = [false, true, true, true, true, true, true,true,true,true,true];
        var render = [null, DateType, null, UserMoney,null,null, null, null, null, null, UserBill];
        var ColumnDefs = GetColumns(dbName, title, visible, render);
        DataTableUse(ColumnDefs, source, null, option2);


        // #option5 - calculate td width
        for (var n = 1; n < 10; n++) {
            $("#option5 table tbody tr td:nth-child(" + n + ")").css("width", $("#option5 table thead tr th:nth-child(" + n + ")").width() + "px");
        }

        // #option6 - calculate td width
        for (var n = 1; n < 10; n++) {
            $("#option6 table tbody tr td:nth-child(" + n + ")").css("width", $("#option6 table thead tr th:nth-child(" + n + ")").width() + "px");
        }
   	
	
	function UserMoney(data,meta,row)
	{
		var _money = 0;
                _money = parseInt(data) + parseInt(row.total_profit)  + parseInt(row.money) + parseInt(row.max_win) + parseInt(row.adj_money) ;		
		return _money ;
 	}

	function UserBill(data,meta,row)
	{
		var _user_bill = 0;
		_user_bill = parseInt(data) + parseInt(row.max_win) + parseInt(row.adj_money);
		return _user_bill;
	}
        //============================================
        //各button click事件
        //============================================
        //五檔報價
        $("#price_amount").click(function() {
            now_selected_show_list = "price_amount";
            ajaxLoad_price_amount();
        });

        $('#butFivePrice').click(function() {
            now_selected_show_list = 'five_price';
        });
        $('#butEachPrice').click(function() {
            now_selected_show_list = 'each_price';
	});

        $('#butSearch_advicer').click(function() {

            searchAdvicer();
        });

        $('#butBillSearch').click(function() {
            searchBill();
        });

        $('#butPopTeacher').click(function() {
            //popwin('popup/advicerList',800,600);
            //$('#divTeacherList').colorbox({'inline':true,'width':"50%"});
            $.colorbox({ inline: true, href: "#divTeacherList", width: '50%', height: '50%' });
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
        $('#but_amount_price').click(function() {
            popwin('popup/amount_price?code=' + selectedProduct, 800, 600);
        });


        //選擇老師popup，按確定
        $('#but_tcEnter').click(function() {
            reload('example');
            close();
        });
        //選擇老師popup，按取消
        $('#but_tcCancel').click(function() {
            close();
        });

        //未平倉列表，全選按鈕
        $('#list2_chk_select_all').click(function() {
            if ($(this).prop('checked')) {
                $('.chkList2').each(function() {
                    if ( $(this).css('display') == 'none' ) {
                        $(this).prop('checked',false);
//                        continue;
                    } else {
                        $(this).prop('checked', true);
                    }
                });
            } else {
                $('.chkList2').each(function() {
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


        $("#bt1").click(function() {
            $("#amount").val(1);
        });
        $("#bt2").click(function() {
            $("#amount").val(2);
        });
        $("#bt3").click(function() {
            $("#amount").val(3);
        });
        $("#bt4").click(function() {
            $("#amount").val(4);
        });
        $("#bt5").click(function() {
            $("#amount").val(5);
        });


        //===============================================================
        //--------------一進頁面，從DB中初始化產品項目-----------------------           
        //===============================================================

        $('.productItem').each(function() {

            var code = $(this).attr('id');
            if (code != 'TS') {
                //每個商品 點擊選取事件
                $(this).click(function() {
                    selectProduct($(this));
//                    $("#amount").val(1);
                    //所有商品，取消選取的CSS
//                    $('.productItem').each(function() {
                        /*$(this).css('border-top', 'solid 1px #E7E7E7');
                        $(this).css('border-bottom', 'solid 1px #B7BABC');
                        $(this).css('border-left', 'solid 1px #B7BABC');
                        $(this).css('border-right', 'solid 1px #B7BABC');*/
//                        $(this).css('background-color', '');
                        //$(this).find('.name').css('color', 'white');
/*
                    });

                    //下單不確認，取消勾選
                    $('#not_confirm').prop('checked', false);

                    //設定此筆被選取
                    $(this).css('background-color', '#696969');

                    //$('#info1').html('');
                    $('#info3').html('');

                    selectedProduct = $(this).attr('id');
                    price_no = $(this).find('.price_no').val();

                    //點選商品若是未開盤則不顯示下單區
                    var status = $(this).find('.status').html();
                    if (status == '未開盤') {
                        $('#userMenu').hide();
                        $('#emptyMenu').show();
                    } else {
                        $('#userMenu').show();
                        $('#emptyMenu').hide();
                    }


                    //在各地方，顯示商品名稱
                    var infoName = $(this).find('.name').html();
                    $('#info1_name').html(infoName);
                    $('#info2_name').html(infoName);
                    $('#info3_name').html(infoName);
                    $('#info4_name').html(infoName);
                    $('#info5_name').html(infoName);
                    $('#info6_name').html(infoName);
                    //$(this).css('background-color','white');


                    //設定最後交易日
                    var last_day = $(this).attr('last_day');
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

*/
                    //商品月份，先清空，避免暫存
                    /*
                    $('#product_month').html('');
                    if (obj != null) {
                        var deny_new = "<span style='color:" + green + ";'>" + obj['deny_new_order_min'] + "</span> ~ <span style='color:" + red + ";'>" + obj['deny_new_order_max'] + "</span>";
                        $('#deny_new_range').html(deny_new);
                        var offset = "<span style='color:" + green + ";'>" + obj['system_offset_min'] + "</span> ~ <span style='color:" + red + ";'>" + obj['system_offset_max'] + "</span>";
                        $('#offset_range').html(offset);
                        //最上頭，設定商品月份
                        var month = obj['price_code'];
                        month = month.substr(month.length - 2, 2);
                        if (month == 'EA')
                            month = ''
                        $('#product_month').html(Number(month));
                    }*/

/*
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
                    serv_cmd.data = {
                        "product_code": selectedProduct
                    };
                    doSend(JSON.stringify(serv_cmd));
*/
                });
            }
        });


        //點擊下單不確認
        $('#not_confirm').click(function() {
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
        $('#chkShowAllProduct').click(function() {
            if ($(this).prop('checked')) {

            }
        });

        //手動送出命令
        $('#butCmd').click(function() {
            var command = $('#txtCmd').val();
            doSend(command);
        });

        //買多
        $('#butBuy_up').click(function() {
            sendCmd('up');
        });

        //買空
        $('#butBuy_down').click(function() {
            sendCmd('down');
        });

        //在挑選市價單或限價單時，要產生的控制項
        $('.type').each(function() {
            $(this).click(function() {
                var radID = $(this).attr('id');
                //alert(radID);
                if (radID == 'rad_limitPrice') {
                    var obj = lastestProduct[selectedProduct];

                    $('#li_limitPrice').show();
                    $('#txtLimitPrice').val(obj['new_price']);
                } else {
                    $('#li_limitPrice').hide();
                    $('#li_limitPrice').val('');
                }
            });
        });

        //限價單按鈕
        $('#butLimitPrice').click(function() {
            var obj = lastestProduct[selectedProduct];
            $('#txtLimitPrice').val(obj['new_price']);
        });

        //限價單+
        $('#plus').click(function() {
            var price = $('#txtLimitPrice').val();
            price = Number(price) + 1;
            $('#txtLimitPrice').val(price);
        });
        //限價單-
        $('#mins').click(function() {
            var price = $('#txtLimitPrice').val();
            price = Number(price) - 1;
            $('#txtLimitPrice').val(price);
        });

        //往上
        $('#but_left_up').click(function() {
            //price_amount_list

            var objDiv = document.getElementById("price_amount_left_bottom_body");
            objDiv.scrollTop = objDiv.scrollTop - 10;
            //console.log(objDiv.scrollTop);
        });
        //往下
        $('#but_left_down').click(function() {
            //price_amount_list
            var objDiv = document.getElementById("price_amount_left_bottom_body");
            objDiv.scrollTop = objDiv.scrollTop + 10;
            //console.log(objDiv.scrollTop);
        });

        //置中
        /* $('#but_left_mid').click(function() {
             //price_amount_list
             var objDiv = document.getElementById("price_amount_left_bottom_body");
             objDiv.scrollTop = objDiv.scrollHeight / 2;
             //console.log(objDiv.scrollTop);
         });*/

        //電雷單
        $('#fast_order').click(function() {
            $('#div_menu_speed').hide();
            //$('#div_menu_amount').hide();
            $('#div_order_type').hide();
            $('#butStoreAll').prop("disabled", true);
            $('#fast_info').show();
        });
        //一般單
        $('#normal_order').click(function() {
            $('#div_menu_speed').show();
            //$('#div_menu_amount').show();
            $('#div_order_type').show();
            $('#butStoreAll').prop("disabled", false);
            $('#fast_info').hide();
        });

        //限價單成交提示，click
        $('#limitOrderMsg').click(function() {
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
        $('#butDelAll_close_limit').click(function() {
            if (window.confirm('確定刪除所有未成交的收盤單和限價單?')) {
                //var chkV = $(this).prop('checked');
                var serv_cmd = {};
                serv_cmd.token = QueryString('token');
                serv_cmd.cmd = 'clear_close_limit_order';
                serv_cmd.data = {};
                doSend(JSON.stringify(serv_cmd));
            }

        });
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

    function waitSelectDefaultProduct ()
    {
        var ob;
        ob = $('#TX');
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

    //每秒重整頁面損益
    function updateOrderList() {
        //console.log('trigger by timer');
        orderList1(oList1, uProduct);
        orderList2(oList2, uProduct,oList3);
        orderList3(oList3);
        orderList4(oList2, oList3, uConfig);
    }

    function getAdminTag(){
	//取網址參數
	$.UrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);                                                        
		if (r != null) return unescape(r[2]); return null;
	}
	var isadmin = '' ;
        isadmin = $.UrlParam("admin");
        if($.UrlParam("admin") == null) isadmin = '0';
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
        //console.log('做完抓表單資料' + serArray);
        /*if (strStatus == '參考用' || strStatus == '未開盤') {
            alertify.error("未開盤");
            return false;
        }*/
	//取網址參數
	$.UrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
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
        if ( tmp_amount < 1 ) {
            alertify.error('口數最少必需輸入1口');
            return false;
        }
        
        if ( cmd.amount % 1 !== 0 ) {
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

        if (cmd.stop_up != '' && cmd.stop_up != 0) {
	   if (cmd.stop_up < setting_upLimit) {
                alertify.error("停利不能小於" + setting_upLimit + "點");
                return false;
            }
        }

        if (cmd.stop_down != '' && cmd.stop_down != 0) {
            if (cmd.stop_down < setting_downLimit) {
                alertify.error("停損不能小於" + setting_downLimit + "點");
                return false;
            }
        }
        //console.log('檢查完停利需');
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

        //下單不確認
        if ($('#not_confirm').prop('checked')) {} else {
            if (window.confirm(obj.name + '買' + strUpDown + ' ' + cmd.amount + '口 ' + strType + '單，是否送出訂單？')) {} else {
                return false;
            }
        }

        //送出指令格式
        var serv_cmd = {};
        if (cmd.type == 3) {
            serv_cmd.cmd = 'closeOrder';
        } else {
            serv_cmd.cmd = 'preOrder';
        }
        // alert(cmd.order_speed);


        serv_cmd.token = QueryString('token');
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
        };
  //      console.log(JSON.stringify(serv_cmd));

        doSend(JSON.stringify(serv_cmd));
        //重置數量
        $('#amount').val('1');

    }

    function checkAlive ()
    {
        var d, check, now;
        
        d = new Date();
        now = d.getTime();
        check = now - last_receive_time;

        if ( check > 30000 ) {
            console.log('last:' + last_receive_time +',' + new Date(last_receive_time));
            console.log('now:' + now +',' + new Date(now));
            alert('逾時登出');

            if ( parent.close ) {
                parent.close();
            }
            
            document.location='login';
            return;
        }
//        console.log('is alive. see you next time:'+check);
        setTimeout(checkAlive,30000);
    }

    function BuildWebSocket() {
        ws = new WebSocket(wsUri);
        ws.onopen = function(evt) {
            onOpen(evt)
        };
        ws.onclose = function(evt) {
            onClose(evt)
        };
        ws.onmessage = function(evt) {
            onMessage(evt)
        };
        ws.onerror = function(evt) {
            onError(evt)
        };
        return ws;
    }

    function load_closeOffset(product_code) {
        //alert(product_code);
        var obj = ajaxSave({ 'product_code': product_code }, 'operation/load_closeOffset');
        obj.success(function(res) {
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


    function onOpen(evt) {
        var token = QueryString('token');
        // writeToScreen("CONNECTED"); 
        doSend('{"cmd":"login" ,"token":"' + token + '"}');
        $('#loading').fadeOut("slow", function() {});
        setTimeout(checkAlive,30000);
        waitSelectDefaultProduct();
        setTimeout(checkOnlineStatus,5000);	
	window.addEventListener("online",onlineHandler)
        window.addEventListener("offnline",offlineHandler)
        //render(token);
    }

    function onClose(evt) {
        //render('closed');
        //$('#loading').show();
        //ws =  BuildWebSocket() ;
        //writeToScreen("DISCONNECTED"); 
        if ( parent.close ) {
            parent.close();
        }
        window.location = 'login';
    }

    function onError(evt) {
//        console.log('ERROR: ' + evt.data);
        window.location = 'login';
    }

    function doSend(message) {
        //writeToScreen("SENT: " + message);
        ws.send(message);
    }


    //==================================================
    //------------------接收訊息------------------------
    //=================================================
    function onMessage(evt) {
        var obj, d;
        try {
            obj = JSON.parse(evt.data);
        } catch (err) {
            console.log(err);
            console.log(evt);
        }

        if (obj == null) {
            return false;
        }

        if (typeof obj.type == null) {
            render(JSON.stringify(obj));
        }

        
        //render(JSON.stringify(obj));
        switch (obj.type) {
            case 0: //接收商品價格
                d = new Date();
                last_receive_time = d.getTime();

                //render(JSON.stringify(obj.data));
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

                //將使用者產品設定放到全域變數
                user_product = obj.user_product;

                //更新 買賣下單列表
                //var data = obj.data;

                //記錄最後的訂單列表
                oList1 = obj.list1;
                oList2 = obj.list2;
                oList3 = obj.list3;
                uProduct = obj.user_product;
                uConfig = obj.user_config;

                //更新預設額度
                $('#default_money2').html(uConfig[0].default_money);

                //更新訂單
                orderList1(obj.list1, obj.user_product);
                orderList2(obj.list2, obj.user_product, obj.list3);
                orderList3(obj.list3);
                orderList4(obj.list2, obj.list3, obj.user_config);
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
		console.log(product);
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

                //最後交易日
                $('#product_month').html(product.last_order_date);
                //禁新
                var deny_new = "<span style='color:" + green + ";'>" + deny_min + "</span> ~ <span style='color:" + red + ";'>" + deny_max + "</span>";
                $('#deny_new_range').html(deny_new);
                //強平
                var offset = "<span style='color:" + green + ";'>" + offset_min + "</span> ~ <span style='color:" + red + ";'>" + offset_max + "</span>";
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

                //console.log(JSON.stringify(user_product));
                if (user_product.order_fast == 1) {
                    $('#divOrderFast').show();

                    $("#normal_order").trigger("click");
                } else {
                    $('#divOrderFast').hide();
                    $("#normal_order").trigger("click");
                }

                //close_msg


                break;
            case 6:
                //每秒更新商品狀態
                var list = obj.productStatus;
                //console.log(list.length);
                for (var h = 0; h < list.length; h++) {
                    //跳過加權期
                    //console.log(list[i].code);
                    //if (list[i].code != 'TS') {
                    $('#' + list[h].code).find('.status').html(list[h].status);
                    if (list[h].status == '未開盤') {
                        $('#' + list[h].code).find('.status').removeClass('figure_result');
                        $('#' + list[h].code).find('.status').addClass('gray');
                    } else {
                        $('#' + list[h].code).find('.status').removeClass('gray');
                        $('#' + list[h].code).find('.status').addClass('figure_result');
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

                //是不是交收中
                if (obj.now_paying == 'true') {
                    //交收中 , 將所有input disable
                    $('#div_paying').show();
                    diableAllButton = true;
                } else {
                    //交收中結束 , 將所有input enable
                    $('#div_paying').hide('slow');
                    diableAllButton = false;
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
                            break;
                        case '2':
                            $('#divUserStatus').html(user_account + '(凍結)');
                            alert('帳號被凍結，所有下單動作將無作用');
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
                logined = true;
           break;
           
            case 900 : //keep alive
                d = new Date();
                last_receive_time = d.getTime();
            break;

            case 999:
//                if ( kicked ) return;

                kicked = true;
                alert('重複登入!');
                window.location = webroot + '/login/logout';
            break;
            default:
        }
    }

    function selectProduct ( prod_ob )
    {
//            var code = $(this).attr('id');
//            if (code != 'TS') {
                //每個商品 點擊選取事件
//                $(this).click(function() {
                    $("#amount").val(1);
                    //所有商品，取消選取的CSS
                    $('.productItem').each(function() {
                        /*$(this).css('border-top', 'solid 1px #E7E7E7');
                        $(this).css('border-bottom', 'solid 1px #B7BABC');
                        $(this).css('border-left', 'solid 1px #B7BABC');
                        $(this).css('border-right', 'solid 1px #B7BABC');*/
                        $(this).css('background-color', '');
                        //$(this).find('.name').css('color', 'white');
                    });

                    //下單不確認，取消勾選
                    $('#not_confirm').prop('checked', false);

                    //設定此筆被選取
                    prod_ob.css('background-color', '#696969');

                    //$('#info1').html('');
                    $('#info3').html('');

                    selectedProduct = prod_ob.attr('id');
                    price_no = prod_ob.find('.price_no').val();

                    //點選商品若是未開盤則不顯示下單區
                    var status = prod_ob.find('.status').html();
                    if (status == '未開盤' && !prodCloseOrder ) {
                        $('#userMenu').hide();
                        $('#emptyMenu').show();
                    } else {
                        $('#userMenu').show();
                        $('#emptyMenu').hide();
                    }


                    //在各地方，顯示商品名稱
                    var infoName = prod_ob.find('.name').html();
                    $('#info1_name').html(infoName);
                    $('#info2_name').html(infoName);
                    $('#info3_name').html(infoName);
                    $('#info4_name').html(infoName);
                    $('#info5_name').html(infoName);
                    $('#info6_name').html(infoName);
                    //$(this).css('background-color','white');


                    //設定最後交易日
                    var last_day = prod_ob.attr('last_day');
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


                    //商品月份，先清空，避免暫存
                    /*
                    $('#product_month').html('');
                    if (obj != null) {
                        var deny_new = "<span style='color:" + green + ";'>" + obj['deny_new_order_min'] + "</span> ~ <span style='color:" + red + ";'>" + obj['deny_new_order_max'] + "</span>";
                        $('#deny_new_range').html(deny_new);
                        var offset = "<span style='color:" + green + ";'>" + obj['system_offset_min'] + "</span> ~ <span style='color:" + red + ";'>" + obj['system_offset_max'] + "</span>";
                        $('#offset_range').html(offset);
                        //最上頭，設定商品月份
                        var month = obj['price_code'];
                        month = month.substr(month.length - 2, 2);
                        if (month == 'EA')
                            month = ''
                        $('#product_month').html(Number(month));
                    }*/


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
                    serv_cmd.data = {
                        "product_code": selectedProduct
                    };
                    doSend(JSON.stringify(serv_cmd));


//                });
//            }    
    }


    //買賣下單列表 －－處理欄位資料
    function orderList1(data, user_product) {
        if (data == null) {
            return false;
        }
        var img = '<img src="' + webroot + '/assets/img/loading2.gif" width="15" >';
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
                color = 'style="color:#55DF56;"';

            var row = {};
            var type = data[i].type;
            var status = data[i].status;

            //列表上每筆資料的編號
            row.key = 'list1_' + data[i].type + '_' + data[i].order_id;

            row.co1 = '';
            if (data[i].type == 'orders' && data[i].status == 0) {
                row.co1 = '<input ' + strEnable + ' class="blueBut" id="but_' + data[i].order_id + '" type="button" value="平倉" onclick="storeProduct(' + data[i].order_id + ')" />';
            } else if (data[i].type == 'pre_orders') {
                if (data[i].order_type == 4) {
                    row.co1 = '<button ' + strEnable + ' class="blueBut" type="button" onclick="deletePreorder(' + data[i].pre_id + ');">' + del_icon + '</button>';
                    row.co1 += '&nbsp;<button ' + strEnable + ' class="blueBut"  onclick="open_modify_limit(' + data[i].pre_id + ',' + data[i].amount + ',\'' + data[i].product_code + '\');">' + edit_icon + '</button>';
                }

            } else if (data[i].type == 'close_order') {
                row.co1 = '<button ' + strEnable + ' type="button" class="blueBut"  onclick="deleteCloseorder(' + data[i].pre_id + ');" >' + del_icon + '</button>';
            } else {
                row.co1 = '';
            }

            //假如現在此張單商品收盤，不顯示按鈕
            //console.log(lastestProduct[data[i].product_code].status_name);
            if (lastestProduct[data[i].product_code].status_name == '未開盤') {
                row.co1 = '';
            }

            row.co2 = data[i].order_id;
            row.co3 = '<span ' + color + '>' + data[i].name + '</span>';
            row.co4 = '';  
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
		    if(data[i].isFast == 1) showstyle = '雷電';
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
	    if(data[i].is_admin != 0 && data[i].is_admin !== '') showstyle = '人工';
            var sAmount = '<span ' + color + '>' + data[i].amount + '</span>';

            if (data[i].amount != data[i].remaining_amount) {
                sAmount += '<span ' + color + '> (' + data[i].remaining_amount + ')</span>';
            }
            row.co7 = sAmount;

            row.co8 = '<span ' + color + '>' + data[i].price + '</span>';
            row.co9 = '<span ' + color + '>' + removeDate(data[i].action_time) + '</span>';
            //row.co9 = '<span ' + color + '>' + removeDate(data[i].create_date) + '</span>';
	    row.co10 = '<span ' + color + '>' + removeDate(data[i].finish_time) + '</span>';
            
	    row.co11 = '<span ' + color + '>'+ showstyle +'</span>';
	    //row.co11 = '<span ' + color + '>一般</span>';

            //獲利點數
            var point = 0;
            if (type == 'orders') {
                var obj = lastestProduct[data[i].code];
                var sellPrice = obj.new_price;

                if (data[i].up_down == 'up') {
                    point = sellPrice - data[i].price;
                } else {
                    point = data[i].price - sellPrice;
                }
            }


            var loss_enable = 'disabled';
            var profit_enable = 'disabled';
	/*
            if (type == 'orders' && data[i].status == 0) //未平倉單，可以修改停損利
            {
	*/
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
                        if(now_user_product.show_order_market_price_profit ==1)
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
                row.co12 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + ' style="width:50px;" onclick="openLossSetting(\'' + data[i].order_id + '\' , \'down\')"  type="button">' + strUP + '</button>';
                row.co13 = '<button ' + strEnable + ' class="blueBut" ' + profit_enable + ' style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\' , \'up\')"  type="button">' + strDown + '</button>';
            } else if(type == 'pre_orders' ) {
                //row.co12 = data[i].down_limit;
                //row.co13 = data[i].up_limit;
 		row.co12 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + ' style="width:50px;" onclick="openLossSetting(\'' + data[i].pre_id + '\' , \'down\' ,\''+ type +'\')"  type="button">' + strUP + '</button>';
                row.co13 = '<button ' + strEnable + ' class="blueBut" ' + profit_enable + ' style="width:50px;" onclick="openProfitSetting(\'' + data[i].pre_id + '\' , \'up\' ,\''+ type +'\')"  type="button">' + strDown + '</button>';    
	    }else if(type == 'close_order' ) {  
		row.co12 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + ' style="width:50px;" onclick="openLossSetting(\'' + data[i].pre_id + '\' , \'down\' ,\''+ type +'\')"  type="button">' + strUP + '</button>';
            	row.co13 = '<button ' + strEnable + ' class="blueBut" ' + profit_enable + ' style="width:50px;" onclick="openProfitSetting(\'' + data[i].pre_id + '\' , \'up\' ,\''+ type +'\')"  type="button">' + strDown + '</button>';
	}else{
		row.co12 = data[i].down_limit;
                row.co13 = data[i].up_limit;
            }


	    if(lastestProduct[data[i].product_code].status_name == '未開盤'){
                row.co12 = data[i].down_limit;
                row.co13 = data[i].up_limit;
	       }

            switch (type) {
                case 'pre_orders':
                    row.co14 = img + '未成交';
                    break;
                case 'close_order':
                    row.co14 = img + '收盤單';
                    break;
                case 'orders':
                    if (data[i].status == 2) {
                        row.co14 = img + '平倉中';
                    }else {
			if(data[i].is_trans_order == 1) {
                        	row.co14 = '轉新單';
		    }
                        row.co14 = data[i].memo;
		    }

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
        //一直刷新table 頁面
        var html = '';

        for (var i = 0; i < list.length; i++) {
            var obj = $('#' + list[i]['key']).length;
            var rowID = list[i]['key'];

            html += '<tr id="' + rowID + '">';
            for (var index in list[i]) {
                if (index == 'key')
                    continue;
                html += '<td class="' + index + '" style="text-align:center;color:white;">' + list[i][index] + '</td>';
            }
            html += '</tr>';
        }
        $('#orderList').html(html);


        //設定，table的 header 的寬到底下 td，避免標題和內容沒有對齊
        for (var n = 1; n < 15; n++) {
            $("#option1 table tbody tr td.co" + n).css("width", $("#option1 table thead tr th:nth-child(" + n + ")").width() + "px");
        }

        /*$("#option1 table tbody tr td.co1").css("width", $("#option1 table thead tr th:nth-child(1)").width() + "px");
        $("#option1 table tbody tr td.co2").css("width", $("#option1 table thead tr th:nth-child(2)").width() + "px");
        $("#option1 table tbody tr td.co3").css("width", $("#option1 table thead tr th:nth-child(3)").width() + "px");
        $("#option1 table tbody tr td.co4").css("width", $("#option1 table thead tr th:nth-child(4)").width() + "px");
        $("#option1 table tbody tr td.co5").css("width", $("#option1 table thead tr th:nth-child(5)").width() + "px");
        $("#option1 table tbody tr td.co6").css("width", $("#option1 table thead tr th:nth-child(6)").width() + "px");
        $("#option1 table tbody tr td.co7").css("width", $("#option1 table thead tr th:nth-child(7)").width() + "px");
        $("#option1 table tbody tr td.co8").css("width", $("#option1 table thead tr th:nth-child(8)").width() + "px");
        $("#option1 table tbody tr td.co9").css("width", $("#option1 table thead tr th:nth-child(9)").width() + "px");
        $("#option1 table tbody tr td.co10").css("width", $("#option1 table thead tr th:nth-child(10)").width() + "px");
        $("#option1 table tbody tr td.co11").css("width", $("#option1 table thead tr th:nth-child(11)").width() + "px");
        $("#option1 table tbody tr td.co12").css("width", $("#option1 table thead tr th:nth-child(12)").width() + "px");
        $("#option1 table tbody tr td.co13").css("width", $("#option1 table thead tr th:nth-child(13)").width() + "px");
        $("#option1 table tbody tr td.co14").css("width", $("#option1 table thead tr th:nth-child(14)").width() + "px");*/
    }

    function openLossSetting(order_id,up_down,type=null) {
	if(type == null){
        	$('#ifStopLossProfit').attr('src', 'operation/stop_loss?order_id=' + order_id);
        }else if (type == 'pre_orders' ){
		$('#ifStopLossProfit').attr('src', 'operation/pre_stop_loss?pre_id=' + order_id );
	}else if (type == 'close_order' ){
                $('#ifStopLossProfit').attr('src', 'operation/close_stop_loss?pre_id=' + order_id );
        }
	$('#tallModelTitle2').html('<span style="font-weight:bold;color:' + green + '">修改停損</span>');
        $("#tallModal2").modal('show');
    }

    function openProfitSetting(order_id,up_down,type=null) {
     	//$('#ifStopLoss').attr('src', 'operation/stop_profit?order_id=' + order_id);
	if(type == null){
                $('#ifStopLossProfit').attr('src', 'operation/stop_profit?order_id=' + order_id);
	}else if (type == 'pre_orders' ){
		$('#ifStopLossProfit').attr('src', 'operation/pre_stop_profit?pre_id=' + order_id );
        }else if (type == 'close_order' ){
                $('#ifStopLossProfit').attr('src', 'operation/close_stop_profit?pre_id=' + order_id );
        }
	$('#tallModelTitle2').html('<span style="font-weight:bold;color:' + red + '">修改停利</span>');
        $("#tallModal2").modal('show');
    }



    //未平倉
    function orderList2(data, user_product,data2) {
        if (data == null) {
            return false;
        }

        var strEnable = '';
        if (!diableAllButton) {
            //strEnable = 'disabled = "disabled"';
        }

        //初始化倉位數量
        var unoffset_count = {};
        $('.productItem').each(function() {
            var code = $(this).attr('id');
            unoffset_count[code] = { 'count': 0, 'color': '#66d9ff' };
        });

        var img = '<img src="' + webroot + '/assets/img/loading2.gif" width="15" >';
        var list = []; //處理後的資料

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
                color = 'style="color:#55DF56;"';
                unoffset_count[data[i].code].color = 'green';
            }
            var type = data[i].type;
            var status = data[i].status;
            row.co1 = data[i].order_id;

            if (data[i].status == 2) {
                row.co2 = '';
            } else {
                row.co2 = '<input ' + strEnable + ' class="blueBut" type="button" onclick="storeProduct(' + data[i].order_id + ');" value="平倉" />';
            }

            //假如現在此張單商品收盤，不顯示按鈕
            //console.log(lastestProduct[data[i].product_code].status_name);
            if (lastestProduct[data[i].product_code].status_name == '未開盤') {
                row.co2 = '';
               $('.chkList2').each(function() {
                 $('.chkList2').hide();
		});

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
	            if(data[i].isFast == 1) row.co5 = '<span ' + color + '>雷電單</span>';    
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

            var loss_enable = 'disabled';

            var profit_enable = 'disabled';

            switch (data[i].type) {
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
                    /*if(now_user_product.show_order_market_price_profit ==1)
                    {
                        loss_enable = true;
                        profit_enable = true;
                    }*/
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
            //if (data[i].order_type != '3') {
            row.co9 = '<button ' + strEnable + ' class="blueBut" ' + loss_enable + ' style="width:50px;" onclick="openLossSetting(\'' + data[i].order_id + '\' , \'down\')"  type="button">' + strUP + '</button>';
            row.co10 = '<button ' + strEnable + ' class="blueBut" ' + profit_enable + ' style="width:50px;" onclick="openProfitSetting(\'' + data[i].order_id + '\' , \'up\')"  type="button">' + strDown + '</button>';
            //}
            row.co11 = '';

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
                row.co13 = '<span style="color:#55DF56">▼' + removeNe + '</span>';
            } else {
                row.co13 = point;
            }
            //row.co13 = point;

            //console.log(data[i]);

            row.co14 = data[i].offline_day;
            if (data[i].status == 0) {
                //row.co15 = '';
//                console.log(data[i]);
//		console.log(data[i].is_trans_order);
		if (data[i].is_trans_order == 1) {
                    row.co15 = '轉新單';
                } /*else if(data[i].order_id == data2[i].stoID){
		  console.log("xxxx");  
		  roe.co15 = data2[i].newID; 
		}*/ else {
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

        //未平倉頁纖上顯示的多，空，數量
        $('#title_unoffset_up_count').html(up_count);
        $('#title_unoffset_down_count').html(down_count);
        //雷電單下的資訊
        $('#title_unoffset_up_count2').html(up_count);
        $('#title_unoffset_down_count2').html(down_count);

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
                    $('#' + rowID).find('.' + index).html(list[i][index]);
                }

            } else {
                html = '<tr id="' + rowID + '">';
                for (var index in list[i]) {
                    if (index == 'key') {
                        html += '<td class="' + index + '"><input class="chkList2" id="chk_' + list[i][index] + '" type="checkbox" /></td>';
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
        $("#option2 table tbody tr td.key").css("width", $("#option2 table thead tr th:nth-child(1)").width() + "px");
        for (var n = 1; n < 16; n++) {
            $("#option2 table tbody tr td.co" + n).css("width", $("#option2 table thead tr th:nth-child(" + (n + 1) + ")").width() + "px");
        }
    }

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
                color = 'style="color:#55DF56;"';
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
            row.co10 = removeDate(data[i].buyTime);
            row.co11 = removeDate(data[i].sellTime);

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
                row.co12 = '<span style="color:#55DF56">▼' + removeNe + '</span>';
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


            list.push(row);
        }
        updateList3(list);
        //未平倉列表
        //$('#storeOrderList').html(strOrder3);
    }


    function updateList3(list) {
        var html = '';
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                var obj = $('#' + list[i]['key']).length;
                var rowID = list[i]['key'];

                //用編好的ID去找，有找到此筆資料


                html += '<tr id="' + rowID + '">';
                for (var index in list[i]) {
                    if (index == 'key') {
                        //html += '<td class="' + index + '"><input class="list2" id="chk_' + list[i][index] + '" type="checkbox" /></td>';
                    } else {
                        html += '<td class="' + index + '">' + list[i][index] + '</td>';
                    }
                }
                //continue;


                html += '</tr>';

            }
            $('#storeOrderList').html(html);
        }
        // #option3 - calculate td width
        for (var n = 1; n < 16; n++) {
            $("#option3 table tbody tr td.co" + n).css("width", $("#option3 table thead tr th:nth-child(" + n + ")").width() + "px");
        }
    }

    //商品統計
    function orderList4(list2, list3, user_config) {
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
            $('.productItem').each(function() {
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
        for (var n = 1; n < 9; n++) {
            $("#option4 table tbody tr td:nth-child(" + n + ")").css("width", $("#option4 table thead tr th:nth-child(" + n + ")").width() + "px");
        }

        //處理者用者損益
        var userMoney = 0; //Number($('#user_money').val());
	var win_max = 0;
	var win_max_check = 0;
        //console.log();
        if (user_config != null) {
            for (p = 0; p < user_config.length; p++) {
                userMoney = user_config[p].user_money;
		win_max = user_config[p].max_win_money_range; 
	   	win_max_check = user_config[p].is_max_win_check;
	    }
        }
        if (userMoney == null) {
            userMoney = 0;
        }

        if (totalProfit != null) {
            userMoney = Number(userMoney) + Number(totalProfit);
//                console.log('$$:'+userMoney + "," + Number(win_max));
	}
	
	if(userMoney <= 0 ){
		userMoney = 0 ;
	}
	if(userMoney >= Number(win_max) && win_max_check == 1 ){
		userMoney = Number(win_max);
	}
        //帳戶餘額
        //console.log('餘額＝' + userMoney);
        $('#li_user_money').html(userMoney);
        $('#li_user_money2').html(userMoney);


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
	    "is_admin":_isadmin
        };
        //{"cmd":"preOrder","token":" DD5F125C-12E9-07A1-3232-01282A23FB71","data":{"product_code":"TN","up_down":"up","amount":1,"up_limit":199,"down_limit":50}}
        //storing.push(arrID[1]);
        doSend(JSON.stringify(serv_cmd));
        //alertify.success('送出訂單平倉');
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

	var model = { 'id': id }
        var obj = ajaxSave(model, 'operation/deleteCloseorder');
        obj.success(function(res) {
            if (res.msg == 'success') {
                alertify.success('刪除收盤單成功');
            } else {
                alertify.error('刪除收盤單失敗');
            }
        });
    }

    //刪除掛單
    function deletePreorder(id) {

        var model = { 'id': id }
        var obj = ajaxSave(model, 'operation/deletePreorder');
        //alert(JSON.stringify(model));
        obj.success(function(res) {
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
            color = 'white';
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
        var upDown = '';
        if (obj.up_down_sign == '+')
            upDown = '▲';
        if (obj.up_down_sign == '-')
            upDown = '▼';

        var color = '';
        if (obj.up_down_sign == '+') {
            color = '#eb6b61';
        } else if (obj.up_down_sign == '-') {
            color = '#55DF56';
        } else {
            color = 'white';
        }


        var strTotal = '';
        if (obj.product_code == 'TS') {
            strTotal = '(億)';
        }
        //console.log(obj.product_code + ' , ' + strTotal);

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

        var bool = false;
        $('.figure').each(function() {
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
                $(this).find('.amount').css('color', color);
                $(this).find('.buy').css('color', color);
                $(this).find('.sell').css('color', color);
                $(this).find('.buy').css('color', color);
                $(this).find('.updown').css('color', color);
                $(this).find('.percentage').css('color', color);
                //$(this).find('.total').css('color', color);
                $(this).find('.open').css('color', color);
                $(this).find('.max').css('color', color);
                $(this).find('.min').css('color', color);
                $(this).find('.y_total').css('color', color);
                $(this).find('.y_close').css('color', color);

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
            $('.productItem').each(function() {
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

        var obj = ajaxSave({ 'product_code': selectedProduct }, url);
        obj.success(function(res) {
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

        var obj = ajaxSave({ 'pre_id': id }, 'operation/loadPreOrder');
        obj.success(function(res) {
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

        var obj = ajaxSave({ 'pre_id': id, 'price': price, 'amount': amount, 'type': type }, 'operation/savePreOrder');
        obj.success(function(res) {
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
        var obj = ajaxSave({ 'order_id': order_id }, 'operation/storeOrder');
        obj.success(function(res) {
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
        $('.chkList2').each(function() {
            if ($(this).prop('checked')) {
                var id = $(this).attr('id');
                //alert(id);
                var arrID = id.split('_');
                arrOrderID.push(arrID[2]);
            }
        });

        //ajax送出，這些ID，平倉
        var obj = ajaxSave({ 'arrID': arrOrderID }, 'operation/storeMulti');
        //alert(selectedProduct);
        obj.success(function(res) {
            if (res.msg = 'success') {
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
        var obj = ajaxSave({ 'product_code': selectedProduct }, 'operation/storeProduct');
        obj.success(function(res) {
            if (res.msg = 'success') {
                alertify.success(name + "全平送出");
            } else {
                alertify.error(res.msg);
            }

        });

    }


    function saveLimitMulti() {
        var arrOrderID = [];
        $('.chkList2').each(function() {
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
        var data = { 'product': selectedProduct };
        var obj = ajaxSave(data, 'operation/loadPriceAmount');
        obj.success(function(res) {

            if (res != null) {
                //計算總量，
                selected_product_total = 0;
                var arrNew = [];
                for (var key in res) {
                    var item = { 'price': key, 'amount': res[key] };
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
        for (var i = arrLength; i > 0; i--) {
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


            var border = '';
            if (i == 0 || i == (arrNew.length - 1)) {
                border = 'style="border:solid 1px red;"';
            }
            if (arrNew[i].price == obj.new_price) {
                now_index = j;
                now_price_index = j;

            }
            if (arrNew[i].price == obj.open_price) {
                open_index = j;
            }
            j++;
        }

        $('#price_amount_list').html(shtml);
        $('#ul_amount_price_0').css('border', 'solid 1px red');
        $('#ul_amount_price_' + (arrLength)).css('border', 'solid 1px red');
        $('#ul_amount_price_' + now_index).css('border', 'solid 1px red');
        $('#ul_amount_price_' + open_index).css('border', 'solid 1px red');

        $('#ul_amount_price_0').find('.two').html('<span style="color:white;">最高</span>');
        $('#ul_amount_price_' + (arrLength)).find('.two').html('<span style="color:white;">最低</span>');
        $('#ul_amount_price_' + now_index).find('.two').html('<span style="color:white;">現價</span>');
        $('#ul_amount_price_' + open_index).find('.two').html('<span style="color:white;">開盤</span>');

        //將目前現價 index放到全域變數
        centerHeight = now_price_index;
    }

    //每有價位更新，更新量價分佈
    function amount_price_per_tick(product) {
        var price = product.new_price;
        var amount = product.now_amount;

        //console.log(JSON.stringify(product));
        selected_product_total += amount;


        var isSamePrice = false;
        $('.amount_price').each(function(index) {
            if (index == 0) {
                $(this).find('.two').html('最高');
                $(this).addClass('borderRed');
                $(this).css('border', 'solid 1px red');
                return;
            }
            if (index == (selected_product_total - 1)) {
                $(this).find('.two').html('最低');
                $(this).addClass('borderRed');
                $(this).css('border', 'solid 1px red');
                return;
            }

            //價位一樣，設定為現價
            if ($(this).attr('price') == price) {
                isSamePrice = true;
                var old_price = $(this).find('.four').html();

                $(this).find('.four').html(Number(old_price) + amount);
                $(this).find('.two').html('現價');
                $(this).addClass('borderRed');
                $(this).css('border', 'solid 1px red');
                //將目前現價 index放到全域變數
                centerHeight = index;
                //break;
            } else {
                //非現價，重置css
                $(this).removeClass('borderRed');
                $(this).css('border', '');
                $(this).find('.two').html('');
            }
        });


        if (isSamePrice == false) {
            //插入新的價位
            $('.amount_price').each(function(index) {
                if (price > $(this).attr('price')) {

                    //var selected_product_open_price = 0;
                    //var selected_product_close_price = 0;
                    //var selected_product_total = 0;

                    var barLength = amount / selected_product_total * 6000;
                    if (barLength < 1)
                        barLength = 1;
                    if (barLength > 45)
                        barLength = 45;
                    //alert(arrNew[i].price + ","+ arrNew[i].amount);
                    var shtml = '<ul style="border:solid 1px red;" id="ul_amount_price_" class="list2 amount_price" price="' + price + '" amount="' + amount + '" >';
                    shtml += '      <li class="item2 one">' + price + '</li>';
                    shtml += '       <li class="item2 two"></li>';
                    shtml += '       <li class="item2 three">xx';
                    shtml += '          <div style="width:' + barLength + 'px;">xx</div>';
                    shtml += '      </li>';
                    shtml += '      <li class="item2 four">現價</li>';
                    shtml += '  </ul>';

                    $(this).insertBefore(shtml);

                    centerHeight = index;
                    /* var old_price = $(this).find('.four').html();

                    $(this).find('.four').html(Number(old_price) + amount);
                    $(this).find('.two').html('現價');
                    $(this).addClass('borderRed');
                    $(this).css('border', 'solid 1px red');*/
                    return false;
                }
            });
        }

    }

    //量價分佈，置中
    function center() {
        //alert(centerHeight);
        var objDiv = document.getElementById("price_amount_left_bottom_body");

        //console.log(objDiv.scrollTop);
        $('#ul_amount_price_' + centerHeight).get(0).scrollIntoView();
        //var now = objDiv.scrollTop;
        objDiv.scrollTop = objDiv.scrollTop - 150;

        //console.log(objDiv.scrollTop);
        //objDiv.scrollTop = objDiv.scrollTop - 150;
        //$.scrollTo('#ul_amount_price_' + centerHeight, 500);
        //console.log('#ul_amount_price_' + centerHeight);
    }

    //============================================
    //查詢投顧訊息
    //============================================
    function searchAdvicer(type) {
        var str, st, ed, dt, tmp_dt, year, month, sec;
        dt = new Date();
        
        if (type == null) {} else {
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
                    
                    if ( wk < 7 ) {
                        sec = (7-wk) * 86400000;
                        tmp_dt = new Date(dt.getTime() + sec);
                        ed = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                        wk--;
                        tmp_dt = new Date(dt.getTime() - (wk * 86400000));
                        st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                    } else {
                        tmp_dt = new Date( dt.getTime() - wk*86400000 );
                        st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                        
                    }
                    
                    $('#advicer_sdate').val(st);
                    $('#advicer_edate').val(ed);

                    break;
                    
                case 'lastWeek':
                    wk = dt.getDay();
                    if ( wk < 7 ) {
                        dt = new Date(dt- (wk*86400000));
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
                        dt = new Date(dt.getTime()-(6*86400000));
                        st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                
                    } else {
                        dt = new Date(dt.getTime() - (7*86400000));
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
                        dt = new Date(dt.getTime() - (6*86400000));
                        st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                                
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
    //查詢對帳單
    //============================================
    function searchBill(type) {
        if (type == null) {} else {
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
                    
                    if ( wk < 7 ) {
                        sec = (7-wk) * 86400000;
                        tmp_dt = new Date(dt.getTime() + sec);
                        ed = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                        wk--;
                        tmp_dt = new Date(dt.getTime() - (wk * 86400000));
                        st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                    } else {
                        tmp_dt = new Date( dt.getTime() - wk*86400000 );
                        st = tmp_dt.getFullYear() + "-" + (tmp_dt.getMonth()+1) + "-" + tmp_dt.getDate();
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                        
                    }
                    
                    $('#bill_sdate').val(st);
                    $('#bill_edate').val(ed);

                    break;
                    
                case 'lastWeek':
                    wk = dt.getDay();
                    if ( wk < 7 ) {
                        dt = new Date(dt- (wk*86400000));
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
                        dt = new Date(dt.getTime()-(6*86400000));
                        st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                
                    } else {
                        dt = new Date(dt.getTime() - (7*86400000));
                        ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
                        dt = new Date(dt.getTime() - (6*86400000));
                        st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();                                
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
            onComplete: function() {}
        });
    }

    function close() {
        $.colorbox.close();
    }

    function connect() {


    }

    function disconnect() {


    }

    function position() {
        //alert('12');
        $(".modal-dialog").position({
            of: $("#stock"),
            my: 'left' + " " + 'bottom',
            at: 'left' + " " + 'bottom',
            collision: 'fit' + " " + 'flip'
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
    /*
    function checkOnline(){
	if(typeof(navigator.onLine) != "undefined"){
		var _status = navigator.onLine;
		return _status;
	}else{
		console.log("不支援偵測");
		return false;
	}
    }*/

    function checkOnline(){
var image = new Image();
image.src  = 'https://aws.amazon.com/jp/?nc1=h_ls';
        if ( !image.complete || !image.naturalWidth )    
	    //alert("Fail");
	    return true;
        else
	    return false;
            //alert("Success");	
    }
    function onlineHandler(){
        var _onlinestatus = checkOnline();
//        console.log("online:"+_onlinestatus);
        if(_onlinestatus) {
		$("#onlinestatus").html("網路正常");
		$("#onlinestatus").attr('class', 'online');
        }
    }

    function offlineHandler(){
         var _onlinestatus = checkOnline();
         if(_onlinestatus) {
		$("#onlinestatus").html("連線中斷");
         	$("#onlinestatus").attr('class', 'online');
                }
    }

    function checkOnlineStatus(){
	var _status = checkOnline();
	var _onlinestatus = checkOnline();
//        console.log("online:"+_onlinestatus);
        if(_onlinestatus) {
                $("#onlinestatus").html("網路正常");
                $("#onlinestatus").attr('class', 'online');
        }else{
	 	$("#onlinestatus").html("連線中斷");
                $("#onlinestatus").attr('class', 'online');
        }
	setTimeout(checkOnlineStatus,5000);	
    }


