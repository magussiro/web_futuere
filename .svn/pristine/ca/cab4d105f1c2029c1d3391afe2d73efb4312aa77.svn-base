
<script src="<?=$webroot?>assets/js/jquery.js"></script>
<script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />

<script src="<?=$webroot?>assets/js/common.js"></script>
<script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>

<script type="text/javascript" src="<?=$webroot?>assets/js/bootstrap-datepicker.js"></script>
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-select.css" />
<script type="text/javascript" src="<?=$webroot?>assets/js/moment.js"></script>

<script src="<?=$webroot?>assets/js/bootstrap.js"></script>
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap.css" />
<link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-theme.css" />
<link rel="stylesheet" href="<?php echo $webroot;?>assets/css/colorbox.css">
<script src="<?php echo $webroot;?>assets/js/jquery.colorbox.js"></script>

<style>
    li{
        list-style:none;
    }
</style>
<script>

 $( document ).ready(function() {
    $('#export1').click(function () {
        console.log($("#example").html());
        $("#example").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "offsetreport",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    });

      $('#start_date').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true,container:'#myModalId'});
      $('#end_date').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true,container:'#myModalId'});
        var source = 'getReportMember';

        //設定資料欄位
        var dbName = ['rh_id','account','create_date','large_charge','med_charge','small_charge','mini_charge','total_rent'];
        var title = ['編號','帳號','日期','大台數','中台數','小台數','迷你台數','總租金'];
        var visible = [true,true,true,true,true,true,true,true];
        var render = [null, null ,null, null, null, null, null, null];
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
                "pageInfo" : 'i',  //要顯示就打 i,不顯示就打空字串
                "pageLength": 100,
            };
        DataTableUse(ColumnDefs, source, null,option);

 });

 function default_money_popup ( id,acc )
 {
     window.parent.popwin("member/popup_save_deposit?id="+id+"&type=user",700,500,'['+acc+'][預設額度]增減');
 }

 function user_money_popup ( id,acc )
 {
     window.parent.popwin("member/popup_save_deposit?id="+id+"&type=deposit",700,500,'['+acc+'][帳戶餘額]儲值');
 }

 function empty(data,meta , row)
 {
     return "";
 }

 function default_money ( data, m, row )
 {
     return Number(data) + '<button onclick="default_money_popup('+row.user_id+',\''+row.pacc+'\')">增減</button>';
 }

 function user_money ( data, m, row )
 {
     return Number(data) + '<button onclick="user_money_popup('+row.user_id+',\''+row.pacc+'\')">儲值</button>';
 }

 function user_option ( data )
 {
     return '<button type="button" id="'+data+'"class="view_history">查看儲值紀錄</button>';
 }

function search_report ()
 {
     var str;

     str = "st="+$('#start_date').val()+"&ed="+$('#end_date').val();
     window.parent.change_report('offset',str);
 }

 function search_mode ( mode )
 {
     var str, st, ed, dt, tmp_dt, year, month, sec;

     dt = new Date();
     switch ( mode )
     {
         case 1 :
            st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
            ed = st;
         break;

         case 2 :
            dt = new Date(dt.getTime()-86400000);
            st = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
            ed = st;
         break;

         case 3 :
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
         break;

         case 4 :
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
         break;

         case 5 :
            month = dt.getMonth()+1;
            st = dt.getFullYear() + "-" + month + "-01";
            if ( month < 12 ) {
                dt = new Date(dt.getFullYear(),month,1,0,0,0,0);
            } else {
                dt = new Date(dt.getFullYear(),1,1,0,0,0,0);
            }

            dt = new Date(dt.getTime()-86400000);
            ed = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();
         break;

         case 6 :
            month = dt.getMonth();
            if ( month == 0 ) {
                dt = new Date(dt.getFullYear(),1,1);
                dt = new Date(dt.getTime()-86400000);
                year = dt.getFullYear();
                month = dt.getMonth()+1;
                ed = year + "-" + month + "-" + dt.getDate();
                st = year + "-" + month + "-01";
            } else {
                
                year = dt.getFullYear();
                month = dt.getMonth();
                st = year + "-" + month + "-01";
                dt = new Date(year+"-"+(month+1)+"-01");
                dt = new Date(dt.getTime()-86400000);
                ed = dt.getFullYear() + "-" + month + "-" + dt.getDate();
            }
            
         break;

     }

     str = "st="+st+"&ed="+ed;
     window.parent.change_report('offset',str);   
 }
           
 function user_status ( data )
 {
     switch ( Number(data) )
     {
        case 0 :
            return '停用';
        break;

        case 1 :
            return '正常';
        break;

        case 2 :
            return '凍結';
        break;
     }
 }

 function user_group ( data )
 {
     switch ( Number(data) )
     {
        case 1 :
            return '會員';
        break;

        case 2 :
            return '代理';
        break;
        
        case 31 :
        case 32 :
            return '測試帳號';

        case 999 :
            return '管理者';
        break;
     } 
 }


 </script>
        <div>
        <button id='export1'>複製到EXCEL</button>
                    開始日期
                    <input id="start_date" name="start_date" type="text" data-date-container='#myModalId' data-provide='datepicker' value='<?php echo $start_date;?>' />
                    結束日期
                    <input id="end_date" name="end_date" type="text" data-date-container='#myModalId' data-provide='datepicker'  value='<?php echo $end_date;?>'/>

<!--
                    顯示:
                    <select name="view" id="opt_view">
                        <option value='all'>全部</option>
                        <option value='agent'>代理</option>
                        <option value='uesr'>會員</option>                        
                   </select>
               
                        日期
                        <input id="date" name="date" type="text" data-date-container='#myModalId' data-provide='datepicker'  />
                        條件
                        <select name="conditionType">
                            <option value="time">時間</option>
                            <option value="price">價位</option>
                            <option value="order">次序</option>
                        </select>
-->
                        <button type="button" onclick="reloadToFirst();">送出</button>
                        快速查詢
                        <button id='today' type='button' onclick="search_mode(1)">今日</button>
                        <button id='yestoday' type='button' onclick="search_mode(2)">昨日</button>
                        <button id='week' type='button' onclick="search_mode(3)">本週</button>
                        <button id='pre_week' type='button' onclick="search_mode(4)">上週</button>
                        <button id='month' type='button' onclick="search_mode(5)">本月</button>
                        <button id='pre_month' type='button' onclick="search_mode(6)">上月</button>
<!--
               
                    <br>開始：
                        <select name="sHour">
                        <?php for( $i=0;$i<24;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>時
                        <select name="sMin">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>分
                        <select name="sSec">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>秒
-->
                    <!--<input name="sHour" type="text">時 
                        <input name="sMin" type="text">分 
                        <input name="sSec" type="text">秒-->
<!--
                    &nbsp;結束：
                        <select name="eHour">
                        <?php for( $i=0;$i<24;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>時
                        <select name="eMin">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>分
                        <select name="eSec">
                        <?php for( $i=0;$i<60;$i++)
                        {
                            echo '<option value="'.$i.'">'.$i.'</option>';
                        } ?>
                        </select>秒
-->
                        <!--
                        <input name="eHour" type="text">時 
                        <input name="eMin" type="text">分 
                        <input name="sSec" type="text">秒
                        -->
               
        </div>


<div class="condition  sub_tab1" style="padding:10px;">
    <div class="table table1">
        <table id="example" class="table table-bordered display"></table>
    </div>
</div>
                    