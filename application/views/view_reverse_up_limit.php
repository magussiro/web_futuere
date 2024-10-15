<!doctype html>
<html lang="en">
<head>
    <script src="<?=$base_url?>assets/js/common.js"></script>
    <script>
        $(document).ready(function() {
            var order_id  = QueryString('order_id'); 
            loadLimit(order_id, 'up');


                //損利點數加10點
            $('#bt_p1').click(function(){
                var v = $('#input_limit').val();
                $('#input_limit').val(Number(v)+10);
            });

                //損利點數減10點
            $('#bt_m1').click(function(){
                var v = $('#input_limit').val();
                $('#input_limit').val(Number(v)-10);
            });

        });

        
        //手動設定停損停利
        function loadLimit(pre_id, up_down , reload = null) {
            //清空控制項，恢復預設值
            $('#selected_order_id').val(pre_id);

            //讀取此筆訂單，停損停利
            var obj = ajaxSave({ 'pre_id': pre_id }, 'loadreverseLimit');
            obj.success(function(res)
            {
                $('#input_price').val(res['price']);                //成交價
                $('#new_price').val(Number(res['new_price']));      //現價
                $('#up_down').val(res['up_down']);                  //下單類型:多/空
                $('#up').val(res['up_limit']);                      //使用者設定的 停利點
                $('#down').val(res['down_limit']);                  //使用者設定的 停損點

                $('#loss').val(res['stop_loss']);                   //停損設定下限
                $('#profit').val(res['stop_profit']);               //停利設定下限

                //停損需  //記停利需
                $('#stop_profit').val(res['stop_profit']);         //停利設定下限
                $('#stop_loss').val(res['stop_loss']);             //停損設定下限
        		
                var show_point;     //新獲利點設定下限

                //判斷是買多或買空
                if(res['up_down'] == 'up'){
                    show_point = Number(res['new_price']) - Number(res['price']);
                }else{
                    show_point = Number(res['price']) - Number(res['new_price']);
                }
                    
                if(show_point < 0 )                                 //如果資料載入當下沒獲利,下限顯示 0
                    show_point = 0;
                else if( show_point < Number(res['stop_profit']) )  //如果資料載入獲利點 < 設定下限,下限顯示0
                    show_point = 0;
                else if( show_point > Number(res['up_limit']) )     //如果資料載入獲利點 > 使用者設定上限,下限=上限
                    show_point = Number(res['up_limit']);

                $('#span_stop_loss').html(show_point);          //新獲利點下限

            });

            setTimeout("loadLimit("+pre_id+",'ip','true')", 1000);
        }

        function saveLimit() {
            var id = $('#selected_order_id').val();

            var set_limit;           //可設定上限
	    
    	    var new_price = Number( $('#new_price').val() );           //現價
    	    var price = Number( $('#input_price').val() );		       //成交價
	    
    	    var up_down = $('#up_down').val();                         //下單類型:多/空
    	    var stop_profit = Number( $('#stop_profit').val() );       //停利上限
            var nowPoint = Number( $('#input_limit').val() );          //新獲利點
	    
            if(up_down == 'up')
            {
                set_limit =  new_price - price; 
            }
            else if(up_down == 'down')
            {
                set_limit = price - new_price;
            }

    	    if(set_limit < 0){                  //尚未獲利
                alert('需等獲利才可設定');
                return false;
    	    }else if(nowPoint < 0){             //獲利點數<0
                alert('不可設定小於0');
                return false;
            }else if(nowPoint < stop_profit){     //獲利點數低於設定下限
                alert('設定點數需大於' + stop_profit);
                return false;
            }else if(nowPoint > set_limit){     //獲利點數超過設定上限
                alert('設定點數需小於' + set_limit);
                return false;
            }

            var model = {
                'pre_id': id,
                'up_limit': $('#input_limit').val(),
                'profit': 0
            }
                //alert(JSON.stringify(model));
            var obj = ajaxSave(model, 'savereverseLimit');
            obj.success(function(res) {
                //alert(JSON.stringify(res.msg));
                if (res.msg == 'success') {
                    $('#selected_order_id').val('');
                    $('#loss_point').val(0);
                    $('#profit_point').val(0);
                    parent.close_limitWin();
                    alert('設定倒限成功!');
                } else {
                    alert(res.msg);
                    //alert('失敗');
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
                <div>新獲利點需<span style="color:red;">小於</span>[ <span id="span_stop_loss"></span> ]點</div>
                <br>
                <div>
                    新獲利點 <input id="input_limit" name="input_limit" type="number" min="0" value="0" style="width:80px;" class="controler"  /> 
                    <input id="bt_p1" type="button" value="+10" class="blueBut" /> 
                    <input id="bt_m1" type="button" value="-10" class="blueBut" />
                </div>
                  <div style="padding-left:60px;color:gray;">
		</div>
            </div>
            </div>
            <div style="clear:both;"></div>
    </div>
</body>
</html>
