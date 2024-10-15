<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>量價分佈</title>
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup_black.css">
    <script src="<?=$webroot?>assets/js/jquery.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />

    <script src="<?=$webroot?>assets/js/common.js?11"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-theme.css" />
    <script type="text/javascript" src="<?=$webroot?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-select.css" />
    <script type="text/javascript" src="<?=$webroot?>assets/js/moment.js"></script>
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
        $("#formAmountData").submit();
    });
});
</script>
<style>
    #pop_data_output table { border:solid 1px #dcdcdc; width:100%; }
    #pop_data_output thead tr { background-color:#eb6b61; }
    #pop_data_output thead td { padding:5px; color:white; text-align:center; }
    #pop_data_output tbody td { padding-left:5px; padding-right:5px; text-align:center; width: 15%; }
    #pop_data_output tbody tr td:nth-child(3) { background-color:transparent; text-align:left; padding:1px; width: 70%; overflow: hidden; }
    #pop_data_output tbody div { background-color:#55DF56; }
    .table-condensed { background-color:black; color:white; }
</style>
</head>
<body>
               
<div style="padding:10px;">
    <h2>量價分佈</h2>
</div>
<div id="deposit_wrap" style="padding:10px;">
    <div id="deposit_content">
        <form id="formAmountData" method="post">
        <ul class="deposit_select">
            <li class="deposit_option">
            開始日期
            <input id="sdate" name="sdate" type="text" class="inputStyle1" value="<?php echo $sdate ?>">
            結束日期
            <input id="edate" name="edate" type="text" class="inputStyle1" value="<?php echo $edate ?>">
            <button class="btnStyle1" type="submit">送出</button>
               
            </li>
            <li class="deposit_option" style="margin-top:5px;">
                快速查詢
                <a class="btnStyle1 quickDate" href="#" data-val="today">今日</a>
                <a class="btnStyle1 quickDate" href="#" data-val="yesterday">昨日</a>
                <a class="btnStyle1 quickDate" href="#" data-val="week">本周</a>
                <a class="btnStyle1 quickDate" href="#" data-val="lastWeek">上週</a>
                <a class="btnStyle1 quickDate" href="#" data-val="month">本月</a>
                <a class="btnStyle1 quickDate" href="#" data-val="lastMonth">上月</a>
            </li>
        </ul>
        </form>
        <div id="pop_data_output">

            <table border="1">
                <thead>
                    <tr>
                        <td>價格</td><td>口</td><td>比例</td>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    $total = 0;
                    if(isset($data)){
                        foreach($data as $k=>$v) $total += $v;
                        
                        foreach($data as $k=>$v)
                        {
                            $width = $v / $total * 100;
                            if($width<1) $width = 1;  ?>
                            <tr>
                                <td><?php echo $k; ?></td>
                                <td><?php echo $v;?></td>
                                <td>
                                    <div style="width:<?php echo $width;?>%;" title="<?php echo $width;?>%">&nbsp;</div>
                                </td>
                            </tr>
                <?php
                        }
                    }else{ ?>
                        <tr><td colspan="4">數據讀取失敗，請重試</td></tr>
                <?php    }
                ?>
                </tbody>
                
            </table>
            
        </div>
     
    </div>
</div>

</body>
</html>