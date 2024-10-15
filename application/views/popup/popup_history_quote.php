<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>歷史報價</title>
    <script type="text/javascript" src="<?=$webroot?>assets/js/jquery.js"></script>
    <link rel="stylesheet" href="<?=$webroot?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$webroot?>assets/css/popup_black.css">
    <link rel="stylesheet" href="<?=$webroot?>assets/css/font-awesome-4.4.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="<?=$webroot?>assets/css/colorbox.css">
    <script type="text/javascript" src="<?=$webroot?>assets/js/jquery.colorbox.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.js"></script>

    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.css?22" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />


    <script src="<?=$webroot?>assets/js/common.js"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>

    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-theme.css" />


    <script type="text/javascript" src="<?=$webroot?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-select.css" />

    <script type="text/javascript" src="<?=$webroot?>assets/js/moment.js"></script>
<script>

 $( document ).ready(function() {

      $('#date').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true,container:'#myModalId'});
      $('#date').val(moment().format('YYYY-MM-DD'));

        var source = 'historyQuoteList?token='+QueryString('token');

        //設定資料欄位
        var dbName = [ 'date','product_code',"price_time",'now_amount',"new_price","new_price"];
        var title = ['日期','產品',"市場時間",'口數',"價格","次序"];
        var visible = [true,true,true,true,true,false];
        var render = [null,null,null, null ,null ,serOrder];
        var ColumnDefs = GetColumns(dbName, title, visible, render);

         //預設
         var   option = {
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
                "pageInfo" : 'i'  //要顯示就打 i,不顯示就打空字串
            };
        DataTableUse(ColumnDefs, source, null,option);

        $('.sorting_1').each(function(){
            $(this).css('background-color','transition');
        });

 });

 function  serOrder(v, meta, row)
 {
     //alert(meta.row().index())
     return '';
 }

    function srhDate(type)
    {
        if(type == null)
        {
        }
        else 
        {
            switch(type)
            {
                case 'today':
                    $('#date').val(moment().format('YYYY-MM-DD'));
                   
                break;
                case 'yesterday':
                    $('#date').val(moment().add('days',-1).format('YYYY-MM-DD'));
                break;
                case 'beforeYesterday':
                     $('#date').val(moment().add('days',-2).format('YYYY-MM-DD'));
                break;
               
            }
        }
        reloadToFirst('example');
    }


</script>
<style>
   
    .table-condensed
    {
        background-color:black;
        color:white;
    }
    table.dataTable.display tbody tr.even>.sorting_1, table.dataTable.order-column.stripe tbody tr.even>.sorting_1 {
     background-color: transparent;
    }
  
    table.dataTable.display tbody tr.odd > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {
        background-color: transparent;
    }

    table.dataTable.tableStyle2 thead th {
        background-color: rgba(66, 107, 174, 1.00);
        color:white;
        padding: 4px 0px;
    }

     .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_processing, .dataTables_wrapper .dataTables_paginate {
        color: white;
    }


    .dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
        cursor: default;
        color: white !important;
        border: 1px solid transparent;
        background: transparent;
        box-shadow: none;
    }


    .dataTables_wrapper .dataTables_paginate .paginate_button {
        box-sizing: border-box;
        display: inline-block;
        min-width: 1.5em;
        padding: 0.5em 1em;
        margin-left: 2px;
        text-align: center;
        text-decoration: none !important;
        cursor: pointer;
        color: white !important;
        border: 1px solid transparent;
    }


    .dataTables_wrapper .dataTables_processing {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 40px;
        margin-left: -50%;
        margin-top: -25px;
        padding-top: 20px;
        text-align: center;
        font-size: 1.2em;
         background-color: black;
         
        background: -webkit-gradient(linear, left top, right top, color-stop(0%, rgba(255, 255, 255, 0)), color-stop(25%, rgba(255, 255, 255, 0.9)), color-stop(75%, rgba(255, 255, 255, 0.9)), color-stop(100%, rgba(255, 255, 255, 0)));
        /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        /* Chrome10+,Safari5.1+ */
        background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        /* FF3.6+ */
        background: -ms-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        /* IE10+ */
        background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);
        /* Opera 11.10+ */
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0.9) 75%, rgba(255, 255, 255, 0) 100%);

         opacity:0.4; 
    }

    table.dataTable.hover tbody tr:hover,
    table.dataTable.hover tbody tr.odd:hover,
    table.dataTable.hover tbody tr.even:hover,
    table.dataTable.display tbody tr:hover,
    table.dataTable.display tbody tr.odd:hover,
    table.dataTable.display tbody tr.even:hover {
        background-color: black;
        opacity:0.5;
    }


  
</style>

</head>
<body>

              
<div style="padding:10px;">
    <div >
        <div><h2>歷史報價</h2></div>
        <div >

                    商品
                    <select name="product" id="" class="selectStyle1">
                    <?php 
                        foreach($product as $item)
                        {
                            echo '<option value="'.$item['code'].'" class="inputStyle1">'.$item['name'].'</option>';
                        }
                    ?>
                    </select>
               
                         日期
                           <input id="date" name="date" type="text" data-date-container='#myModalId' data-provide='datepicker'  class="inputStyle1"/>

                            <button onclick="srhDate('today');" class="btnStyle1">今日</button>
                            <button onclick="srhDate('yesterday');"  class="btnStyle1">昨日</button>
                            <button onclick="srhDate('beforeYesterday');"  class="btnStyle1">前日</button>
			價位
			<input id="price_point" name="price_point" type="text" data-date-container='#myModalId' class="inputStyle1">

                        <!--條件
                        <select name="conditionType" class="selectStyle1">
                            <option value="time">時間</option>
                            <option value="price">價位</option>
                            <option value="order">次序</option>
                        </select>-->
                        <button type="button" onclick="reloadToFirst();" class="btnStyle1">送出</button>

               
                    <br><br>開始：
                        <select name="sHour" class="selectStyle1">
                        <?php for( $i=0;$i<24;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>時
                        <select name="sMin" class="selectStyle1">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>分
                        <select name="sSec" class="selectStyle1">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>秒
                   
                    &nbsp;結束：
                        <select name="eHour" class="selectStyle1">
                        <?php for( $i=0;$i<24;$i++)
                        {
                            $selected = '';
                            if($i==23)
                            {
                                $selected = 'selected="selected"';
                            }

                            echo '<option '. $selected .' value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>時
                        <select name="eMin" class="selectStyle1">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            $selected = '';
                            if($i==59)
                            {
                                $selected = 'selected="selected"';
                            }
                            
                            echo '<option '.$selected.'  value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>分
                        <select name="eSec" class="selectStyle1">
                        <?php for( $i=0;$i<60;$i++)
                        {
                             $selected = '';
                            if($i==59)
                            {
                                $selected = 'selected="selected"';
                            }
                            echo '<option '.$selected.' value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>秒
                       
               
        </div>
       
       
        <div >
           
              <table id="example" class=" display tableStyle2"></table>

        </div>
    </div>
</div>
</body>
</html>
