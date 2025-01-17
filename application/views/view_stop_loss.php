<!doctype html>
<html lang="en">
    <head>
        <script src="<?= $base_url ?>assets/js/common.js"></script>
        <script>
            $(document).ready(function () {
                var order_id = QueryString('order_id');
                loadLimit2(order_id, 'UP');
                loadLimit(order_id, 'up');

                //點數
                $('#bt_p1').click(function () {
                    var v = $('#input_stop_loss').val();
                    $('#input_stop_loss').val(Number(v) + 10);
                    rePrice();
                });
                $('#bt_m1').click(function () {
                    var v = $('#input_stop_loss').val();
                    $('#input_stop_loss').val(Number(v) - 10);
                    rePrice();
                });

                $("#input_stop_loss").bind('keyup mouseup', function () {
                    rePrice();
                });

                //價格
                $('#bt_p2').click(function () {
                    var v = $('#input_loss_price').val();
                    $('#input_loss_price').val(Number(v) + 10);
                    rePrice2();
                });

                $('#bt_m2').click(function () {
                    var v = $('#input_loss_price').val();
                    $('#input_loss_price').val(Number(v) - 10);
                    rePrice2();
                });

                $("#input_loss_price").bind('keyup mouseup', function () {
                    rePrice2();
                });
            });

            function rePrice()
            {
                var price = $('#input_price').val();            //成交價
                var up_down = $('#up_down').val();              //下單類型:多/空

                var setPoint = $('#input_stop_loss').val();     //設定點數

                var point = 0;

                if (up_down == 'up')
                    point = Number(price) - Number(setPoint);
                else
                    point = Number(price) + Number(setPoint);

                $('#input_loss_price').val(point);
            }

            function rePrice2()
            {
                var price = $('#input_price').val();            //成交價
                var up_down = $('#up_down').val();              //下單類型:多/空
                var setPrice = $('#input_loss_price').val();    //設定金額

                var point = 0;
                if (up_down == 'up')
                    point = Number(price) - Number(setPrice);
                else
                    point = Number(setPrice) - Number(price);

                $('#input_stop_loss').val(point);
            }

            //手動設定停損停利
            function loadLimit(pre_id, up_down) {
                //清空控制項，恢復預設值
                $('#selected_order_id').val(pre_id);
                $('#loss_point').val(0);
                $('#profit_point').val(0);


                //讀取此筆訂單，停損停利
                var obj = ajaxSave({'pre_id': pre_id}, 'loadLimit');
                obj.success(function (res) {

                    $('#input_price').val(res['price']);                //成交價
                    $('#new_price').val(Number(res['new_price']));      //現價


                    $('#new_price').val(Number(res['new_price']));      //現價

                    $('#up_down').val(res['up_down']);              //下單類型:多/空
                    $('#down').val(res['down_limit']);              //使用者設定的 停損點

                    $('#loss').val(res['stop_loss']);               //停損設定下限

                    //停損需  //記停利需
                    $('#stop_loss').val(res['stop_loss']);          //停損設定下限
                    $('#span_stop_loss').html(res['stop_loss']);    //停損設定下限
                   // $('#input_stop_loss').val(res['down_limit']);

                    //點數上下限
                    var sPoint = res['stop_loss'];
                    var ePoint = res['max_profit_rate_per_amount'];     //每日最大漲跌幅
                    if (ePoint == 0)
                    {
                        //成交價 - (系統強平比值 * 昨收盤價 / 100)
                        var slimit = Number(res['price']) - (Number(res['system_offset_rate']) * Number(res['last_close_price']) / 100);
                        ePoint = Math.floor(slimit);
                    }

                    //設定點數上下限至畫面
                    $('#sPoint').html(sPoint);      //點數範圍
                    $('#ePoint').html(ePoint);      //點數範圍

                    //計算出金額範圍
                    var price, price_top, price_down;

                    if (res['up_down'] == 'up')
                    {
                        price = Number(res['price']) - Number(res['down_limit']);
                        price_top = Number(res['price']) - ePoint;
                        price_down = Number(res['price']) - sPoint;
                    } else
                    {
                        price = Number(res['price']) + Number(res['down_limit']);
                        price_top = Number(res['price']) + Number(sPoint);
                        price_down = Number(res['price']) + Number(ePoint);
                    }

                    $('#input_loss_price').val(price);  //停損價格
                    $('#spStart').html(price_top);      //價位範圍
                    $('#spEnd').html(price_down);       //價位範圍
                    //判斷是買多或買空
                    //console.log(res['new_price']);
                    // if (res['up_down'] == 'up') {
                    //     show_point = Math.abs(Number(res['new_price']) - Number(res['price']));
                    //     // show_point = sPoint;
                    // } else {
                    //     show_point = Number(res['price']) - Number(res['new_price']);
                    // }

                                    //判斷是買多或買空
                    if(res['up_down'] == 'up'){
                        show_point = Number(res['price']) - Number(res['new_price']);
                    }else{
                        show_point = Number(res['new_price']) - Number(res['price']);
                        
                    }
                    // if (show_point >= 0)
                    // {
                    //     show_point = Number(sPoint);
                    // }
                    // if (show_point < 0)
                    // {
                    //     show_point = Math.abs(Number(res['price']) - Number(res['new_price']));
                    // }

                    if(show_point < 0 )                                 //如果資料載入當下沒獲利,下限顯示 0
                    show_point = Number(sPoint);
                    else if( show_point < Number(res['stop_profit']) )  //如果資料載入獲利點 < 設定下限,下限顯示0
                    show_point =  Number(sPoint);
                    else if( show_point > Number(res['down_limit']) )     //如果資料載入獲利點 > 使用者設定上限,下限=上限
                    show_point = Number(res['down_limit']);




                    // console.log( Number(res['price']) - Number(res['new_price']));
                    // console.log( Number(res['new_price']) - Number(res['price']));
//                    if (show_point < 0)                                 //如果資料載入當下沒獲利,下限顯示 0
//                        show_point;
//                    else if (show_point < Number(res['stop_profit']))  //如果資料載入獲利點 < 設定下限,下限顯示0
//                        show_point;
//                    else if (show_point > Number(res['up_limit']))     //如果資料載入獲利點 > 使用者設定上限,下限=上限
//                        show_point;
//如果資料載入獲利點 > 使用者設定上限,下限=上限
                    //show_point = Number(res['up_limit']);
                    //判斷是買多或買空
//                    if (res['up_down'] == 'up') {
//                        show_point = Number(res['new_price']) - Number(res['price']);
//                    } else {
//                        show_point = Number(res['price']) - Number(res['new_price']);
//                    }
//
//                    if (show_point < 0)                                 //如果資料載入當下沒獲利,下限顯示 0
//                        show_point = 0;
//                    else if (show_point < Number(res['stop_profit']))  //如果資料載入獲利點 < 設定下限,下限顯示0
//                        show_point = 0;
//                    else if (show_point > Number(res['up_limit']))     //如果資料載入獲利點 > 使用者設定上限,下限=上限
//                        show_point = Number(res['up_limit']);

                    $('#span_stop_loss').html(show_point);
                });
                setTimeout("loadLimit(" + pre_id + ",'ip','true')", 1000);
            }

            function loadLimit2(pre_id, up_down) {
                //清空控制項，恢復預設值
                $('#selected_order_id').val(pre_id);
                $('#loss_point').val(0);
                $('#profit_point').val(0);


                var obj2 = ajaxSave({'pre_id': pre_id}, 'loadLimit');
                obj2.success(function (res) {

                    $('#input_stop_loss').val(res['down_limit']);



                });

            }


            function saveLimit() {
                var id = $('#selected_order_id').val();

                var spoint = Number($('#sPoint').html());         //起始點
                var epoint = Number($('#ePoint').html());         //結束點

                var nowPoint = Number($('#input_stop_loss').val());       //設定停鎖點數 新損失 XX點

                var point = $('#span_stop_loss').val();       //應該點數設定值 應大於XX點



                var new_price = Number($('#new_price').val());           //現在價

                var price = Number($('#input_price').val());		       //商品成交價格
                var up_down = $('#up_down').val();   //多跟空

                if (up_down == 'up') { //
                    point = Math.abs(Number(price) - Number(new_price)); // >0 賺錢  < 0賠錢
                    
                } else {
                    point = Math.abs(Number(new_price) - Number(price)); //空單  現價大於成交價
                    
                }
                 if (up_down == 'down') 
                { 
                    win_point = Number(price) -Number(new_price) ;
                }
                else
                {
                     win_point = Number(new_price) - Number(price);
                }
                //alert(win_point);
                // alert(nowPoint);
                // alert(point);
                if(win_point > 0) //贏錢
                {
                     if(nowPoint < spoint) // 12 < 2 then >3
                    {
                        alert('設定點數需大於' + spoint);
                        return false;
                    }
                    else if (nowPoint > epoint)  // 12 > 200 then < 200
                    {
                        alert('設定點數需小於' + epoint);
                        return false;
                    } 

                    else  if (nowPoint < point)  //12 < 32
                    {
                        // if(up_down == "up")
                        // {
                        //     alert('設定點數需大於3-' + point);
                        //     return false;
                        // }
                    }
                    
                }
                else
                {
                    if (nowPoint > epoint)  //12 < 32
                    {

                            alert('設定點數需小於' + epoint);
                            return false;
                        

                        
                    }
                    else  if (nowPoint < point)  //12 < 32
                    {
                        alert('設定點數需大於' + point);
                        return false;
                    }
                    
                    
                }

                // alert(point);
                //  alert(nowPoint);
                //alert(nowPoint);
                // console.log('spoint'+spoint);
                // console.log('epoint'+epoint);
                // alert(nowPoint);
                // alert(point);
                
                // if(nowPoint < spoint) // 12 < 2 then >3
                // {
                //     alert('設定點數需大於' + spoint);
                //     return false;
                // } 
                // else if (nowPoint > epoint)  // 12 > 200 then < 200
                // {
                //     alert('設定點數需小於' + epoint);
                //     return false;
                // // }
                // if (up_down == 'up') {  //訂單為上

                    
                //      if(nowPoint < spoint) // 12 < 2 then >3
                //     {
                //         alert('設定點數需大於' + spoint);
                //         return false;
                //     }
                //     else if (nowPoint > epoint)  // 12 > 200 then < 200
                //     {
                //         alert('設定點數需小於' + epoint);
                //         return false;
                //     }

                    
                // }

                //  alert(nowPoint);
                //  alert(point);
//                if (nowPoint < point)
//                {
//                    alert('設定點數需大於' + point);
//                    return false;
//                }


                // alert(point);

                var model = {
                    'pre_id': id,
                    'loss': $('#input_stop_loss').val(),
                    'ss': $('#span_stop_loss').val(),
                    'profit': 0
                }

                var obj = ajaxSave(model, 'saveLimit');
                obj.success(function (res) {
                    if (res.msg == 'success') {
                        $('#selected_order_id').val('');
                        $('#loss_point').val(0);
                        $('#profit_point').val(0);
                        parent.close_limitWin();
                        alert('修改停損成功!');
                    } else {
                        alert(res.msg);
                    }
                });
            }
        </script>

    </head>
    <body>
        <!-- 修改停損利視窗 -->
        <div id="divLimit" class="popClass">
            <input id="selected_order_id" type="hidden" value='' />
            <input id="input_price" type="hidden" value="" />
            <input id="new_price" type="hidden" value="" />
            <input id="up" type="hidden" value="" />
            <input id="down" type="hidden" value="" />
            <input id="loss" type="hidden" value="" />
            <input id="profit" type="hidden" value="" />
            <input id="up_down" type="hidden" value="" />
            <div >
                <div>新損失點需<span style="color:red;">大於</span>[ <span id="span_stop_loss" name="span_stop_loss" ></span> ]點</div>
                <br>
                <div>
                    新損失點 <input id="input_stop_loss" name="input_stop_loss" type="number" value="" style="width:80px;" class="controler"  /> 
                    <input id="bt_p1" type="button" value="+10" class="blueBut" /> 
                    <input id="bt_m1" type="button" value="-10" class="blueBut" />
                </div>
                <div style="padding-left:60px;color:gray;">
                    (點範圍: <span id="sPoint">0</span> ~ <span id="ePoint"></span>)
                </div>
            </div>
            <div >
                <br>
                <div>
                    停損價格 <input id="input_loss_price" type="number" value="" style="width:80px;" class="controler"  /> 
                    <input id="bt_p2" type="button" value="+10" class="blueBut" /> 
                    <input id="bt_m2" type="button" value="-10" class="blueBut" />
                </div>
                <div style="padding-left:60px;color:gray;">
                    (價位範圍: <span id="spStart">0</span> ~ <span id="spEnd"></span>)
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
    </body>
</html>
