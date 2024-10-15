<!doctype html>
<html lang="en">
<head>
    <script src="<?=$base_url?>assets/js/common.js"></script>
    <script>
        $(document).ready(function() {
                var order_id  = QueryString('pre_id'); 
                load_pre_Limit(order_id, 'up');


                //損利點數加10點
                $('#bt_p1').click(function(){
                    var v = $('#input_stop_loss').val();
                    $('#input_stop_loss').val(Number(v)+10);
                    rePrice(); 
                });

                //損利點數減10點
                 $('#bt_m1').click(function(){
                    var v = $('#input_stop_loss').val();
                    var up_down = $('#up_down').val();
                   $('#input_stop_loss').val(Number(v)-10);
                    rePrice();
                });


                 $('#bt_p2').click(function(){
                    var v = $('#input_loss_price').val();
                    $('#input_loss_price').val(Number(v)+10);
                    rePrice2();
                });

                 $('#bt_m2').click(function(){
                    var v = $('#input_loss_price').val();
                    $('#input_loss_price').val(Number(v)-10);
                    rePrice2();
                });

                $("#input_stop_loss").bind('keyup mouseup', function () {
                    //alert("changed");
                    rePrice();            
                });

                 $("#input_loss_price").bind('keyup mouseup', function () {
                    //alert("changed");
                    rePrice2();            
                });
        });

        function rePrice()
        {
            var price = $('#input_price').val();
            var up = $('#up').val();
            var down =$('#down').val();
            var loss = $('#loss').val();
            var profit = $('#profit').val();

            var up_down = $('#up_down').val();

            var setPoint = $('#input_stop_loss').val();

            var point = 0;
            if(up_down == 'up')
            {
                point = Number(price) - Number(setPoint) ;
            }
            else
            {
                point = Number(price) + Number(setPoint) ;
            }
            $('#input_loss_price').val(point);
        }

        function rePrice2()
        {
            var price = $('#input_price').val();
            var up = $('#up').val();
            var down =$('#down').val();
            var loss = $('#loss').val();
            var profit = $('#profit').val();
            var up_down = $('#up_down').val();
            var setPrice = $('#input_loss_price').val();

            //alert('price='+price + ',set='+setPrice);


            var point = 0;
            if(up_down == 'up')
            {
                point = Number(price) - Number(setPrice) ;
            }
            else
            {
                point =  Number(setPrice) - Number(price)  ;
            }
            //alert(point);
            $('#input_stop_loss').val(point);
        }
        
        //手動設定停損停利
        function load_pre_Limit(pre_id, up_down) {
            //清空控制項，恢復預設值
            $('#selected_order_id').val(pre_id);
            $('#loss_point').val(0);
            $('#profit_point').val(0);

            //讀取此筆訂單，停損停利
            var obj = ajaxSave({
                'pre_id': pre_id
            }, 'load_close_Limit');
            obj.success(function(res) {
                $('#input_price').val(res['price']);

                $('#up_down').val(res['up_down']);
                $('#up').val(res['up_limit']);
                $('#down').val(res['up_limit']);

                $('#loss').val(res['stop_loss']);
                $('#profit').val(res['stop_profit']);

                //alert(JSON.stringify(res));
                $('#loss_point').val(res['down_limit']);
                $('#profit_point').val(res['up_limit']);

                //停損需  //記停利需
                $('#stop_profit').val(res['stop_profit']);
                $('#stop_loss').val(res['stop_loss']);

                $('#span_stop_loss').html(res['stop_loss']);
                $('#input_stop_loss').val(res['down_limit']);

                if(res['up_down']=='up')
                {
                    /*$('#input_loss_price').val(Number(res['price']) - Number(res['stop_loss']));

                    var slimit =  Number(res['price']) - (Number(res['system_offset_rate'])  * Number(res['last_close_price']) /100);
                    slimit = Math.floor(slimit); 
                    $('#spStart').html( slimit );
                    $('#spEnd').html(Number(res['price']) - Number(res['stop_loss']));

                    $('#sPoint').html( Number(res['stop_loss']) + Number(res['max_profit_rate_per_amount']) );
                    var epoint = Math.abs(slimit - Number(res['price']))  ;

                    $('#ePoint').html(epoint);*/

                    //點數上下限
                    var sPoint = 0;
                    var ePoint = 0;

                    //從停損需 ～ 每口最大漲跌
                    sPoint = res['stop_loss'];
                    ePoint = res['max_profit_rate_per_amount'];

                    if(ePoint == 0)
                    {
                        var slimit =  Number(res['price']) - (Number(res['system_offset_rate'])  * Number(res['last_close_price']) /100);
                        slimit = Math.floor(slimit); 
                        ePoint = slimit;

                    }
                    //設定點數上下限至畫面
                    $('#sPoint').html(sPoint);
                    $('#ePoint').html(ePoint);

                    //計算出金額範圍
                    var price =  Number(res['price']) - Number(res['down_limit']);
                    var price_top = Number(res['price']) - ePoint;
                    var price_down =  Number(res['price']) - sPoint;

                    $('#input_loss_price').val(price);
                    $('#spStart').html(price_top);
                    $('#spEnd').html(price_down);

                    
                }
                else
                {
                     //點數上下限
                    var sPoint = 0;
                    var ePoint = 0;

                    //從停損需 ～ 每口最大漲跌
                    sPoint = res['stop_loss'];
                    ePoint = res['max_profit_rate_per_amount'];

                    if(ePoint == 0)
                    {
                        var slimit =  Number(res['price']) + (Number(res['system_offset_rate'])  * Number(res['last_close_price']) /100);
                        slimit = Math.floor(slimit); 
                        ePoint = slimit;

                    }
                    //設定點數上下限至畫面
                    $('#sPoint').html(sPoint);
                    $('#ePoint').html(ePoint);

                    //計算出金額範圍
                    var price =  Number(res['price']) + Number(res['down_limit']);
                    var price_top = Number(res['price']) + Number(sPoint);
                    var price_down =  Number(res['price']) + Number(ePoint);

                    $('#input_loss_price').val(price);
                    $('#spStart').html(price_top);
                    $('#spEnd').html(price_down);
                }
            });
        }

        function saveLimit() {
            var id = $('#selected_order_id').val();
            //alert(id);
            var spoint = Number( $('#sPoint').html() );
            var epoint = Number( $('#ePoint').html() );

            var nowPoint = Number( $('#input_stop_loss').val() );

            if(nowPoint <spoint)
            {
                alert('設定點數需大於'+spoint);
                return false;
            }
            //alert(nowPoint +' ,' + epoint);
            if(nowPoint > epoint)
            {
                alert('設定點數需小於'+epoint);
                return false;
            }

            var model = {
                    'pre_id': id,
                    'loss': $('#input_stop_loss').val(),
                    'profit': 0
                }
                //alert(JSON.stringify(model));
            var obj = ajaxSave(model, 'saveCloseLimit');
            obj.success(function(res) {
                //alert(JSON.stringify(res.msg));
                if (res.msg == 'success') {
                    $('#selected_order_id').val('');
                    $('#loss_point').val(0);
                    $('#profit_point').val(0);
                    parent.close_limitWin();
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
            <input id="up" type="hidden" value="" />
            <input id="down" type="hidden" value="" />
            <input id="loss" type="hidden" value="" />
            <input id="profit" type="hidden" value="" />
            <input id="up_down" type="hidden" value="" />
            <div >
                <div>未成交新損失點需<span style="color:red;">大於</span>[ <span id="span_stop_loss"></span> ]點</div>
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
