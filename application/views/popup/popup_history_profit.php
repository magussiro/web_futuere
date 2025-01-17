<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>歷史損益</title>
    <link rel="stylesheet" href="<?=$webroot?>assets/css/popup_black.css">
    <script type="text/javascript" src="<?=$webroot?>assets/js/jquery.js"></script>
    <!--<link rel="stylesheet" href="<?=$webroot?>assets/css/reset.css">-->
    <link rel="stylesheet" href="<?=$webroot?>assets/css/font-awesome-4.4.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="<?=$webroot?>assets/css/colorbox.css">
    <script type="text/javascript" src="<?=$webroot?>assets/js/jquery.colorbox.js"></script>

    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    <!--<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />-->
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />
    <script src="<?=$webroot?>assets/js/common.js"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>

    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-theme.css" />


    <script type="text/javascript" src="<?=$webroot?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-select.css" />

    <script type="text/javascript" src="<?=$webroot?>assets/js/moment.js"></script>
<style>
    td{
        padding:5px;
        border:solid 1px #dcdcdc;
        
    }
    .table-condensed { background-color:black; color:white; }
</style>
<script>

 $( document ).ready(function() {

    $('#sdate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});
    $('#edate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});

    $(".quickDate").click(function(e) {
        e.preventDefault();
        var selType = $(this).attr("data-val");
        var nowDate = new Date();
        var wk_sday,wk_eday;
        switch(selType)
        {
            case 'today':
                $('#sdate').val(moment().format('YYYY-MM-DD'));
                $('#edate').val(moment().format('YYYY-MM-DD'));
                break;

            case 'yesterday':
                $('#sdate').val(moment().add('days',-1).format('YYYY-MM-DD'));
                $('#edate').val(moment().add('days',-1).format('YYYY-MM-DD'));
                break;

            case 'week':
                wk_sday = 1 - nowDate.getDay();
                wk_eday = 6 + wk_sday;
                $('#sdate').val(moment().add('days',wk_sday).format('YYYY-MM-DD'));
                $('#edate').val(moment().add('days',wk_eday).format('YYYY-MM-DD'));
                break;

            case 'lastWeek':
                wk_sday = -6 - nowDate.getDay();
                wk_eday = 6 + wk_sday;
                $('#sdate').val(moment().add('days',wk_sday).format('YYYY-MM-DD'));
                $('#edate').val(moment().add('days',wk_eday).format('YYYY-MM-DD'));
                break;

            case 'month':
                $('#sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#edate').val(moment().endOf('month').format('YYYY-MM-DD'));
                break;

            case 'lastMonth':
                $('#sdate').val(moment().add('months',-1).startOf('month').format('YYYY-MM-DD'));
                $('#edate').val(moment().startOf('month').add('days',-1).format('YYYY-MM-DD'));
                break;
        }
        $("#formProfitHistory").submit();
    });
 });
</script>

</head>
<body>
    <div style="padding:10px;"><h3>歷史損益</h3></div>

    <div style="padding:10px;">
        <form id="formProfitHistory" method="post" action="historyProfit">
            開始日期:<input class="inputStyle1" id="sdate" name="sdate" required type="text" value="<?php if(isset($sdate)) {echo $sdate;}?>" />
            結束日期:<input class="inputStyle1" id="edate" name="edate" required type="text" value="<?php if(isset($edate)) {echo $edate;}?>"/>
            <input type="hidden" name="isReport" value="true">
            <button id="butSubmit" type="submit" class="btnStyle1">送出</button>

            <br><br>
            快速查詢
            <a href="#" class="btnStyle1 quickDate" data-val="today">今日</a>
            <a href="#" class="btnStyle1 quickDate" data-val="yesterday">昨日</a>
            <a href="#" class="btnStyle1 quickDate" data-val="week">本週</a>
            <a href="#" class="btnStyle1 quickDate" data-val="lastWeek">上週</a>
            <a href="#" class="btnStyle1 quickDate" data-val="month">本月</a>
            <a href="#" class="btnStyle1 quickDate" data-val="lastMonth">上月</a>
	   </form>
    </div>
<style>
    #tableHistoryProfit_1 { border:solid 1px gray; }
    #tableHistoryProfit_1 .h_line { background-color:#eb6b61; }
    #tableHistoryProfit_1 .total_amount { text-align:right;padding-right:10px; }
</style>
    <div style="padding:10px;">
    <?php
        if(isset($list))
        {

            $all_amount = 0;        //總計數量
            $all_buy = 0;           //總計買入手續費
            $all_sell = 0;          //總計賣出手續費
            $all_profit = 0;        //總計損益

            $total_amount = 0;      //小計數量
            $total_buy = 0;         //小計買入手續費
            $total_sell = 0;        //小計賣出手續費
            $total_profit = 0;      //小計損益

            $preProductCode = '';   //目前商品品項

            if(count($list)>0)
            {
                echo '<table id="tableHistoryProfit_1" border="0" class="display tableStyle1">
                    <tr class="h_line">
                        <th>商品</th><th>新倉序號</th><th>平倉序號</th><th>新倉型別</th>
                        <th>平倉型別</th><th>大中小台</th><th>多空</th>
                        <th>買進價格</th><th>賣出價格</th><th>數量</th>
                        <th>買入手續費</th><th>賣出手續費</th><th>損益</th>
                        <th>下單時間</th><th>平倉時間</th>
                    </tr>';
                    
                    foreach($list as $item)
                    {
                        if($preProductCode != $item['code'])
                        {
                            if($preProductCode != ""){
                                echo '<tr class="h_line">
                                    <td colspan="9" class="total_amount">小計:</td>
                                    <td>'.$total_amount.'</td>
                                    <td>'.$total_buy.'</td>
                                    <td>'.$total_sell.'</td>
                                    <td>'.$total_profit.'</td>
                                    <td colspan="3" class="total_amount"></td>
                                    </tr>';
                            }

                            //歸零
                            $total_buy = 0;
                            $total_sell = 0;
                            $total_profit = 0;
                            $total_amount = 0;

                            //更新品項代號
                            $preProductCode = $item['code'];
                        }

                        echo "<tr>
                                <td>". $item['name'] . "</td>
                                <td>" .  $item['newID']  . "</td>
                                <td>" .  $item['stoID']  . "</td>";
                        
                        switch($item['type1'])
                        {
                            case 1:
                                    echo "<td>批分單</td>";
                                    break;
                            case 2:
                                    echo "<td>市價單</td>";
                                    break;
                            case 3:
                                    echo "<td>收盤單</td>";
                                    break;
                            case 4:
                                    echo "<td>限價單</td>";
                                    break;
                        }

                		switch($item['type2'])
                        {
                            case 1:
                                    echo "<td>批分單</td>";
                                    break;
                            case 2:
                                    echo "<td>市價單</td>";
                                    break;
                            case 3:
                                    echo "<td>收盤單</td>";
                                    break;
                            case 4:
                                    echo "<td>限價單</td>";
                                    break;
                        }

                        switch($item['charge_type'])
                        {
                            case 0:
                                echo '<td>代理</td>';
                                break;
                            case 1:
                                echo '<td>大台</td>';
                                break;
                            case 2:
                                echo '<td>中台</td>';
                                break;
                            case 3:
                                echo '<td>小台</td>';
                                break;
                            case 4:
                                echo '<td>迷你</td>';
                                break;
                            default:
                                echo '<td>--</td>';
                        }

                        if($item['up_down']=='up') {
                            echo '<td>多</td>';
                        } else {
                            echo '<td>空</td>';
                        }
                
                        $item['buy_charge'] *= $item['stoAmount'];
                        if ( $item['sell_charge'] > 0 ) $item['sell_charge'] *= $item['stoAmount'];

                        echo '<td>'.$item['buy_price'].'</td>
                              <td>'.$item['sell_price'].'</td>
                              <td>'.$item['stoAmount'].'</td>';
                        
                        if($item['is_trans_order'] > 0){
                            echo '<td>0</td>';
                        }else if($item['is_trans_order'] == 0){
                            echo '<td>'.$item['buy_charge'].'</td>';
                        }
                
                        echo '<td>'.$item['sell_charge'].'</td>
                              <td>'.  $item['profit_loss'].'</td>
                              <td>'.  $item['buyTime'].'</td>
                              <td>'.  $item['sellTime'].'</td>
                            </tr>';

		
                        if($item['is_trans_order'] > 0){
                            $total_buy += 0;
                            $all_buy += 0; 
                        }else if($item['is_trans_order'] == 0){
                            $total_buy += $item['buy_charge'] ;
                            $all_buy += $item['buy_charge']; 
                        }

                        $total_sell += $item['sell_charge'];
                        $total_amount += $item['stoAmount'];
                        $total_profit += $item['profit_loss'];

                        $all_sell += $item['sell_charge'];
                        $all_amount += $item['stoAmount'];
                        $all_profit += $item['profit_loss'];
                    }

                    //最後沒輸出的小計
                    echo '<tr class="h_line">
                            <td colspan="9" class="total_amount">小計:</td>
                            <td>'.$total_amount.'</td>
                            <td>'.$total_buy.'</td>
                            <td>'.$total_sell.'</td>
                            <td>'.$total_profit.'</td>
                            <td colspan="3" class="total_amount"></td>
                        </tr>';

                    //總計
                    echo '<tr class="h_line">
                            <td colspan="9" class="total_amount">總計:</td>
                            <td>'.$all_amount.'</td>
                            <td>'.$all_buy.'</td>
                            <td>'.$all_sell.'</td>
                            <td>'.$all_profit.'</td>
                            <td colspan="3" class="total_amount"></td>
                        </tr></table>';

            }
            else{
                echo "<table><tr>查無資料!</tr></table>";
            }
        }
    ?>
    </div>
</body>
</html>
