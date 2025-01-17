<!doctype html>
<html lang="en">

<head>
<script src="<?=$base_url?>assets/js/common.js"></script>
    <script>
    $(document).ready(function() {
        var order_id  = QueryString('order_id'); 
        loadLimit2(order_id, 'UP');
        loadLimit(order_id, 'up');
        


        $('#bt_p1').click(function(){
            var v = $('#input_stop_profit').val();
            $('#input_stop_profit').val(Number(v)+10);
            rePrice(); 
        });

        $('#bt_m1').click(function(){
            var v = $('#input_stop_profit').val();
           $('#input_stop_profit').val(Number(v)-10);
            rePrice();
        });
        
        $("#input_stop_profit").bind('keyup mouseup', function () {
            rePrice();            
        });

        $('#bt_p2').click(function(){
            var v = $('#input_profit_price').val();
            $('#input_profit_price').val(Number(v)+10);
            rePrice2();
        });

        $('#bt_m2').click(function(){
               var v = $('#input_profit_price').val();
            $('#input_profit_price').val(Number(v)-10);
            rePrice2();
        });

        $("#input_profit_price").bind('keyup mouseup', function () {
            rePrice2();            
        });
    });

    function rePrice()
    {
        var price = $('#input_price').val();            //成交價
        var up_down = $('#up_down').val();              //下單類型:多/空

        var setPoint = $('#input_stop_profit').val();     //設定點數
        var point = 0;

        if(up_down == 'up')
            point = Number(price) + Number(setPoint) ;
        else
            point = Number(price) - Number(setPoint) ;

        $('#input_profit_price').val(point);
    }

    function rePrice2()
    {
        var price = $('#input_price').val();
        var up_down = $('#up_down').val();

        var setPrice = $('#input_profit_price').val();
        var point = 0;

        if(up_down == 'up')
            point =  Number(setPrice) -  Number(price) ;
        else
            point =  Number(price) -  Number(setPrice);

        $('#input_stop_profit').val(point);
    }
        

    //手動設定停損停利
    function loadLimit(pre_id, up_down) {
        //清空控制項，恢復預設值
        $('#selected_order_id').val(pre_id);
        $('#loss_point').val(0);
        $('#profit_point').val(0);

        //讀取此筆訂單，停損停利
        var obj = ajaxSave({ 'pre_id': pre_id }, 'loadLimit');
            obj.success(function(res) {        
                $('#input_price').val(res['price']);                //成交價
                $('#new_price').val(Number(res['new_price']));      //現價

                $('#up_down').val(res['up_down']);              //下單類型:多/空
                $('#up').val(res['up_limit']);                  //使用者設定的 停利點

                $('#profit').val(res['stop_profit']);           //停利設定下限

                //停損需 //記停利需
                $('#stop_profit').val(res['stop_profit']);      //停利設定下限
                $('#span_stop_profit').html(res['stop_profit']);
                //$('#input_stop_profit').val(res['up_limit']);

                //點數上下限
                var sPoint = res['stop_profit'];
                var ePoint = res['max_profit_rate_per_amount'];

                if(ePoint == 0)
                {
                    //成交價 - (系統強平比值 * 昨收盤價 / 100)
                    var slimit =  Number(res['price']) + (Number(res['system_offset_rate'])  * Number(res['last_close_price']) /100);
                    slimit = Math.floor(slimit); 
                    ePoint = slimit;
                }

                //設定點數上下限至畫面
                $('#sPoint').html(sPoint);
                $('#ePoint').html(ePoint);

                //計算出金額範圍
                var price ,price_top ,price_down;

                if(res['up_down']=='up')
                {
                    price =  Number(res['price']) + Number(res['up_limit']);
                    price_top = Number(res['price']) + Number(sPoint);
                    price_down =  Number(res['price']) + Number(ePoint);
                }
                else
                {
                    price =  Number(res['price']) - Number(res['up_limit']);
                    price_top = Number(res['price']) - Number(ePoint);
                    price_down =  Number(res['price']) - Number(sPoint);
                }

                $('#input_profit_price').val(price);
                $('#spStart').html(price_top);
                $('#spEnd').html(price_down);

                var show_point;     //新獲利點設定下限

                //判斷是買多或買空
                if(res['up_down'] == 'up'){
                    show_point = Number(res['new_price']) - Number(res['price']);
                }else{
                    show_point = Number(res['price']) - Number(res['new_price']);
                }

               

                if(show_point < 0 )                                 //如果資料載入當下沒獲利,下限顯示 0
                    show_point = Number(sPoint);
                else if( show_point < Number(res['stop_profit']) )  //如果資料載入獲利點 < 設定下限,下限顯示0
                    show_point =  Number(sPoint);
                else if( show_point > Number(res['up_limit']) )     //如果資料載入獲利點 > 使用者設定上限,下限=上限
                    show_point = Number(res['up_limit']);





                $('#span_stop_profit').html(show_point);          //新獲利點下限

            });
            setTimeout("loadLimit("+pre_id+",'ip','true')", 1000);
            //讀取此筆訂單，停損停利
            
        }
        
        //手動設定停損停利
    function loadLimit2(pre_id, up_down) {
        //清空控制項，恢復預設值
        $('#selected_order_id').val(pre_id);
        $('#loss_point').val(0);
        $('#profit_point').val(0);


        var obj2 = ajaxSave({ 'pre_id': pre_id }, 'loadLimit');
            obj2.success(function(res) {        

                
                $('#input_stop_profit').val(res['up_limit']);

                

            });

        }

        function saveLimit() {
            var id = $('#selected_order_id').val();

            var spoint = Number( $('#sPoint').html() );         //點範圍
            var epoint = Number( $('#ePoint').html() );         //點範圍

            var up_down = $('#up_down').val();                         //下單類型:多/空
            var new_price = Number( $('#new_price').val() );           //現價
            var price = Number( $('#input_price').val() );             //成交價
            var point = $('#span_stop_profit').val();       //應該點數設定值 應大於XX點
            var nowPoint = Number( $('#input_stop_profit').val() );       //新獲利點




                if (up_down == 'up') { //
                    point = Math.abs(Number(price) - Number(new_price)); // >0 賺錢  < 0賠錢
                    
                } else {
                    point = Math.abs(Number(new_price) - Number(price)); //空單  現價大於成交價
                    
                }
        

            if (up_down == 'up') 
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

            //console.log(nowPoint);
            // if(nowPoint < spoint)
            // {
            //     alert('設定點數需大於'+spoint);
            //     return false;
            // } 
            // if(nowPoint > epoint)
            // {
            //     alert('設定點數需小於'+epoint);
            //     return false;
            // }
            // else if(nowPoint < set_limit )
            // {
            //     alert('設定點數需大於'+set_limit);
            //     return false;
            // }

             // if (up_down == 'up') {
             //        if (nowPoint < point)  //12 < 32
             //        {
             //            alert('設定點數需大於' + point);
             //            return false;
             //        }
             //    }
             //    else
             //    {
             //        // alert(nowPoint);
             //        // alert(point);

             //        if (nowPoint < point)  //12 < 32
             //        {
             //            alert('設定點數需大於' + point);
             //            return false;
             //        }
             //    }

            // if(up_down == 'up')
            // {
            //     if(nowPoint > st_profit)
            //     {
            //         alert('設定點數需大於'+set_limit);
            //         return false;
            //     }
            // }


            var model = {
                'pre_id': id,
                'loss': 0,
                'profit': $('#input_stop_profit').val()
            }

            var obj = ajaxSave(model, 'saveLimit');
            obj.success(function(res) {
                if (res.msg == 'success') {
                    $('#selected_order_id').val('');
                    $('#loss_point').val(0);
                    $('#profit_point').val(0);
                    parent.close_limitWin();
                    alert('修改停利成功!');
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
                <div>新獲利點需<span style="color:red;">大於</span>[ <span id="span_stop_profit"></span> ]點</div>
                <br>
                <div>
                    新獲利點 <input id="input_stop_profit" type="number" value="" style="width:80px;" class="controler"  /> 
                    <input id="bt_p1" type="button" value="+10" class="blueBut" /> 
                    <input id="bt_m1" type="button" value="-10" class="blueBut" />
                </div>
                 <div style="padding-left:60px;color:gray;">
                         (點範圍: <span id="sPoint">0</span> ~ <span id="ePoint"></span>)
                </div>
            </div>
            <br>
            <div >
               
                <div>
                        停利價格 <input id="input_profit_price" type="number" value="" style="width:80px;" class="controler"  /> 
                         <input id="bt_p2" type="button" value="+10" class="blueBut" /> 
                        <input id="bt_m2" type="button" value="-10" class="blueBut" />
                </div>
                 <div style="padding-left:60px;color:gray;">
                         (價位範圍: <span id="spStart">0</span> ~ <span id="spEnd"></span>)
                </div>
            </div>
           
        
    </div>

</body>
</html>
