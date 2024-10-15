<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>儲值紀錄</title>
  <!--<link rel="stylesheet" href="<?=$webroot;?>assets/css/popup.css">-->
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


<script>

 $( document ).ready(function() {
       $('#sdate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});
       $('#edate').datepicker({format:'yyyy-mm-dd',autoclose:true,todayHighlight:true});

        var source = 'depositList?token='+QueryString('token');

        //設定資料欄位
        var dbName = ["id",'value', "type", "created_at" ];
        var title = ["編號",'儲值金額', "類型", "儲值日期"   ];
        var visible = [true ,true, true, true  ];
        var render = [null, null , type_name, timestamp2str];
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
                "bPaginate": false,
                "pageInfo" : ''  //要顯示就打 i,不顯示就打空字串
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

 function type_name ( type )
{
    var str;

    str = '';
    switch ( type )
    {
        case '5' :
            str = '儲值';
        break;

        case '4' :
            str = '交收呆帳';
        break;
        case '3' :
            str = '呆帳';
        break;
        case '2' :
            str = '交收';
        break;
        case '1' :
            str = '折讓';
        break;
    }

    return str;
}

//timestamp转换成datetime
function timestamp2str(created_at) {//timestamp转换成datetime 年-月-日
  var num = created_at * 1000;
  var dd = new Date(num);
  Y = dd.getFullYear() + '-';
  M = (dd.getMonth()+1 < 10 ? '0'+(dd.getMonth()+1) : dd.getMonth()+1) + '-';
  D = dd.getDate() + ' ';
  h = dd.getHours() + ':';
  m = dd.getMinutes() + ':';
  s = dd.getSeconds();
  return Y+M+D+h+m+s;
  // return Y+M+D+h+m+s;
}

function get_week_days ( pre_weeks = 0 )
{
    var w, fw, lw,sd, ed;
 
    sd = new Date();
    ed = new Date();
    w = new Date();
    w = w.getDay();
    console.log('week:'+w);

    if ( w ) {
        fw = w-1;
        lw = 7-w;
    } else {
        fw = w-6;
        lw = 0;
    }

    if ( pre_weeks > 0 ) pre_weeks *= 7;

    console.log('first week:'+fw+", last week:"+lw);
    sd = sd.setDate(sd.getDate() - fw - pre_weeks );
    ed = ed.setDate(ed.getDate() + lw - pre_weeks );

    sd = new Date(sd);
    ed = new Date(ed);

    return [sd, ed];
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
                $('#sdate').val(moment().format('YYYY-MM-DD'));
                $('#edate').val(moment().format('YYYY-MM-DD'));
            break;
            case 'yesterday':
                $('#sdate').val(moment().add('days',-1).format('YYYY-MM-DD'));
                $('#edate').val(moment().add('days',-1).format('YYYY-MM-DD'));

            break;
            case 'week':
                wdays = get_week_days();
                sd = new Date(wdays[0]);
                ed = new Date(wdays[1]);
                sdate = sd.getFullYear() + "-" + (sd.getMonth() + 1 ) + "-" + sd.getDate();
                //console.log("sdate:"+sdate);
                edate = ed.getFullYear() + "-" + (ed.getMonth() + 1 ) + "-" + ed.getDate();
                //console.log("edate:"+edate);
                $('#sdate').val(sdate);
                $('#edate').val(edate);
                // $('#sdate').val(moment().startOf('week').format('YYYY-MM-DD'));
                // $('#edate').val(moment().endOf('week').format('YYYY-MM-DD'));

            break;
            case 'lastWeek':
                wdays = get_week_days(1);
                sd = new Date(wdays[0]);
                ed = new Date(wdays[1]);
                sdate = sd.getFullYear() + "-" + (sd.getMonth() + 1 ) + "-" + sd.getDate();
                //console.log("sdate:"+sdate);
                edate = ed.getFullYear() + "-" + (ed.getMonth() + 1 ) + "-" + ed.getDate();
                //console.log("edate:"+edate);
                $('#sdate').val(sdate);
                $('#edate').val(edate);


            break;
            case 'month':
                $('#sdate').val(moment().startOf('month').format('YYYY-MM-DD'));
                $('#edate').val(moment().endOf('month').format('YYYY-MM-DD'));
            break;
            case 'lastMonth':
                var nowdays = new Date();
                var year = nowdays.getFullYear();
                var month = nowdays.getMonth();
                if(month==0)
                {
                    month=12;
                    year=year-1;
                }
                if (month < 10) {
                    month = "0" + month;
                }
                var firstDay = year + "-" + month + "-" + "01";//上个月的第一天

                

                var myDate = new Date(year, month, 0);
                var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

                $('#sdate').val(firstDay);
                $('#edate').val(lastDay);
            break;
        }
    }
    reloadToFirst('example');
}

 function perior(data,meta,row)
 {
     return data +" ~ " + row.close_time;
 }

 function addCheck(data,meta,row)
 {
     var strCheck = "";
     if(row.is_show == '1')
     {
         strCheck = "checked='checked'";
     }
     return "<input id='chk_"+ data +"' class='chkSelect' type='checkbox' "+strCheck+" />";
 }

</script>
</head>
<body>
               
<div style="padding:10px;">
    <h2>儲值記錄</h2>
</div>
<div id="deposit_wrap" style="padding:10px;">
    <div id="deposit_content">
        <ul class="deposit_select">
            <li class="deposit_option">
                
                    開始日期
                    <input id="sdate" name="sdate" type="text">
                    結束日期
                    <input id="edate" name="edate" type="text">
                    <button type="button" onclick="reloadToFirst();">送出</button>
               
            </li>
            <li class="deposit_option">
                快速查詢
                <a class="btn btn-default" href="" onclick="srhDate('today');return false;">今日</a>
                <a class="btn btn-default" href="" onclick="srhDate('yesterday');return false;">昨日</a>
                <a class="btn btn-default" href="" onclick="srhDate('week');return false;">本周</a>
                <a class="btn btn-default" href="" onclick="srhDate('lastWeek');return false;">上週</a>
                <a class="btn btn-default" href="" onclick="srhDate('month');return false;">本月</a>
                <a class="btn btn-default" href="" onclick="srhDate('lastMonth');return false;">上月</a>
            </li>
        </ul>
        <div>
             <table id="example" class="table table-bordered display"></table>
        </div>
     
    </div>
</div>
</body>
</html>