<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>動作日誌</title>
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup_black.css">
    <script src="<?=$webroot?>assets/js/jquery.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />

    <script src="<?=$webroot?>assets/js/common.js?11"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-theme.css" />
    <script type="text/javascript" src="<?=$webroot?>assets/js/bootstrap-datepicker.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/bootstrap-select.css" />
    <script type="text/javascript" src="<?=$webroot?>assets/js/moment.js"></script>


<style>
    .sorting_1
    {
        background-color:transparent;
    }
    .table-condensed
    {
        background-color:black;
        color:white;
    }

    ul{
        list-type:none;
    }

    td{
        padding:5px;
        border:solid 1px gray;
    }

   
    table.dataTable.display tbody tr.even>.sorting_1, table.dataTable.order-column.stripe tbody tr.even>.sorting_1 {
     background-color: transparent;
    }
  
    table.dataTable.display tbody tr.odd > .sorting_1, table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {
        background-color: transparent;
    }

    table.dataTable.tableStyle2 thead th {
        background-color:#eb6b61;
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
<script>

 $( document ).ready(function() {
            $('#sdate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});
       $('#edate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});

        var source = 'logList?token='+QueryString('token');

        //設定資料欄位
        var dbName = ["id","account",'type_ch','memo', "create_date","ip"];
        var title = ["序號","使用者","類別",'動作', "時間","ip"];
        var visible = [true,true,true, true,true];
        var render = [null,userlogdata, null , null,null];
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



        $('#selectAll').click(function(){
            if($(this).prop('checked'))
            {
                $('.chkSelect').each(function(){
                    $(this).prop('checked',true);
                })

            }
            else {
                 $('.chkSelect').each(function(){
                    $(this).prop('checked',false);
                })
            }
        });

        $('#butSubmit').click(function(){
            var model = {};
            var chks = [];
            $('.chkSelect').each(function(){
                if($(this).prop('checked'))
                {
                    var arrID = $(this).attr('id').split('_');
                    chks.push(arrID[1]);
                }
            });
            model.ids = chks;
            //var obj = ajaxSave(model,'productSave?token='+QueryString('token'));
            var obj  = ajaxSave(model, 'productSave?token='+QueryString('token'));
			obj.success(function (res) {
                alert(JSON.stringify(res));
				//$("#but_"+message_id).remove();
				 //alertify.success(res.message);
				
			});



        });


 });


function userlogdata(data,meta,row){
	switch(row.type_ch){
		case '系統平倉':
			return '----';
		case '結算':
                        return '----';
		case '點數預扣':
                        return '----';
		case '轉新單':
                        return '----';
		case '結算調整':
                        return '----';
		case '預扣歸還':
                        return '----';

		default :
			return data;

	}
}

function srhDate(type)
{
    var str, st, ed, dt, tmp_dt, year, month, sec;
    dt = new Date();
        
    if (type == null) {} else {
        switch (type) 
        {
            case 'today':
                $('#sdate').val(moment().format('YYYY-MM-DD'));
                $('#edate').val(moment().format('YYYY-MM-DD'));
            break;
                    
            case 'yesterday':
                $('#sdate').val(moment().add('days', -1).format('YYYY-MM-DD'));
                $('#edate').val(moment().add('days', -1).format('YYYY-MM-DD'));
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
                    
                $('#sdate').val(st);
                $('#edate').val(ed);
    
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
                    
                $('#sdate').val(st);
                $('#edate').val(ed);
            break;
                    
            case 'month':
                $('#sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#edate').val(moment().endOf('month').format('YYYY-MM-DD'));
            break;
            case 'lastMonth':
                 $('#sdate').val(moment().subtract('months',1).startOf('month').format('YYYY-MM-DD'));
                 $('#edate').val(moment().subtract('months',1).endOf('month').format('YYYY-MM-DD'));
            break;
        }
    }
    reloadToFirst('example');
}

 function searchType (type)
 {
   console.log(type); 
   reloadToFirst('example');
 }

</script>
</head>
<body>
<div style="padding:10px;">
    <h2>動作日誌</h2>
</div>

<div id="deposit_wrap" style="padding:10px;">
    <div id="deposit_content">
        <ul class="deposit_select">
            <li class="deposit_option">
                開始日期
                    <input id="sdate" name="sdate" type="text" class="inputStyle1">
                    結束日期
                    <input id="edate" name="edate" type="text" class="inputStyle1">
                    <button type="button" onclick="reloadToFirst();" class="btnStyle1">送出</button>
            </li><li class="deposit_option">
 動作類別:
            
                                <select name="action" id=""  onchange='searchType(this.value)' class="inputStyle1 iputStyle1-black-bg">
                                    <option value=0>全部</option>
                                <?php  foreach ( $types as $id => $name ) { ?>
                                    <option value=<?php echo $id;?>><?php echo $name;?></option>
                                <?php } ?>
                                </select>
		
                快速查詢
                <a  href="" type="button" onclick="srhDate('today');return false;" class="btnStyle1">今日</a>
                <a  href="" type="button" onclick="srhDate('yesterday');return false;" class="btnStyle1">昨日</a>
                <a  href="" type="button" onclick="srhDate('week');return false;" class="btnStyle1">本周</a>
                <a  href="" type="button" onclick="srhDate('lastWeek');return false;" class="btnStyle1">上週</a>
                <a  href="" type="button" onclick="srhDate('month');return false;" class="btnStyle1">本月</a>
                <a  href="" type="button" onclick="srhDate('lastMonth');return false;" class="btnStyle1">上月</a>


            </li>
        </ul>
        <div class="deposit_result">
       
          <table id="example" class="tableStyle2 display"></table>

        </div>


    </div>
</div>
</body>
</html>
