<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>量價分佈歷史查詢</title>
      <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup.css">
    <script src="<?=$webroot?>assets/js/jquery.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />

    <script src="<?=$webroot?>assets/js/common.js?11"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>


<script>

 $( document ).ready(function() {
        var source = 'productList?token='+QueryString('token');

        //設定資料欄位
        var dbName = ["id",'id', "code", "name", 'open_time' , 'source_from'   ,"id","id","id","id","id"];
        var title = ["NO",'商品', "新倉序號", "成交日" , "平倉序號" ,"口數"    ,"多空","新倉型別","平倉型別","手續費","損益"];
        var visible = [false,true, true, true , true ,true  ,true,true,true,true,true];
        var render = [null, null , null, null, null ,null ,null,null,null,null,null];
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

                    <table id="example" class="table table-bordered display"></table>

<div id="history_wrap">
    <div id="history_content">
        <ul class="history_select">
            <li class="history_option">
                商品
                <select name="product" id="">
                    <option value="">加權指</option>
                    <option value="">壹指其</option>
                    <option value="">電子期</option>
                    <option value="">金融期</option>
                    <option value="">恆生期</option>
                    <option value="">上海期</option>
                    <option value="">滬深期</option>
                    <option value="">日經期</option>
                    <option value="">歐元期</option>
                    <option value="">法蘭克</option>
                    <option value="">道瓊期</option>
                    <option value="">那斯達</option>
                    <option value="">輕油期</option>
                    <option value="">黃金期</option>
                    <option value="">白銀期</option>
                </select>
            </li>
            <li class="history_option">
                <form action="">
                    開始日期
                    <input type="text">
                    結束日期
                    <input type="text">
                    <button>送出</button>
                </form>
            </li>
            <li class="history_option">
                快速查詢
                <a href="">今日</a>
                <a href="">昨日</a>
                <a href="">本周</a>
                <a href="">上週</a>
                <a href="">本月</a>
                <a href="">上月</a>
            </li>
        </ul>
        <div class="history_result">
            <ul class="history_content head">
                <li class="a">價格</li>
                <li class="b">口</li>
                <li class="c">比例</li>
            </ul>
            <ul class="history_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx<div>xx</div></li>
            </ul>
            <ul class="history_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx<div>xx</div></li>
            </ul>
            <ul class="history_content">
                <li class="a">xxx</li>
                <li class="b">xxx</li>
                <li class="c">xxx<div>xx</div></li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>