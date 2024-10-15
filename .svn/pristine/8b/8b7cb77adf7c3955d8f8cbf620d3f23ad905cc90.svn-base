<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>商品選擇</title>
    <!--<link rel="stylesheet" href="<?=$webroot;?>assets/css/reset.css">-->
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup_black.css">
    <script src="<?=$webroot?>assets/js/jquery.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.bootstrap.js"></script>
    <script type="text/javascript" src="<?=$webroot?>assets/js/DataTables-1.10.4/dataTables.tableTools.min.js"></script>
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.bootstrap.css" />
    <link rel="stylesheet" type="text/css"  href="<?=$webroot?>assets/css/dataTables-1.10.4/css/dataTables.tableTools.min.css" />

    <script src="<?=$webroot?>assets/js/common.js"></script>
    <script src="<?=$webroot?>assets/js/DatatablesUse.js"></script>
   
   <style>
       li{
            list-style:none;
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
        var source = 'productList?token='+QueryString('token');

        //設定資料欄位
        var dbName = ["id",'id', "code", "name", 'open_time','open_time2','open_time3' , 'source_place'];
        var title = ["ID",'選取', "代碼", "商品" , "可下單時間" ,'可下單時間','可下單時間' ,"交易所"];
        var visible = [false,true, true, true , true , true ,true ,true];
        var render = [null, addCheck , null, null, perior , perior2 , perior3 ,null ];
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
                //alert(JSON.stringify(res));
				//$("#but_"+message_id).remove();
				 //alertify.success(res.message);
                                parent.doSend('{"cmd":"viewProducts","token":"'+QueryString('token')+'","data":""}');
				parent.history.go(0);

			});



        });


 });

 function perior(data,meta,row)
 {
     return data +" ~ " + row.close_time;
 }

 function perior2(data,meta,row)
 {
     var time1 = '';
     var time2 = '';
     if(row.open_time2 !='00:00:00')
     {
         time1 = row.open_time2;
     }

     if(row.close_time2 !='00:00:00')
     {
         time2 = row.close_time2;
     }

     return time1 +" ~ " + time2;
 }

 function perior3(data,meta,row)
 {
    var time1 = '';
     var time2 = '';
     if(row.open_time3 !='00:00:00')
     {
         time1 = row.open_time3;
     }

     if(row.close_time3 !='00:00:00')
     {
         time2 = row.close_time3;
     }

     return time1 +" ~ " + time2;
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

<div>
    <div style="padding:10px;">
        <h3 class="popupH3">請選擇您要觀看的商品種類</h3>
       
        <div >
            <ul class="product_select">
                <li class="product_option">
                    <button  class="btnStyle1"><input id="selectAll" type="checkbox">全選</button>
                    <!--<button><input id="cancelAll" type="checkbox">全不選</button>-->
                </li>
            </ul>
            <div >
                <table id="example" class="tableStyle2  display"></table>

            </div>
            <br>
            <div class="product_bottom" style="text-align:center;">
                <button id="butSubmit" type="button"  class="btnStyle1">確定</button>
                <button onclick="parent.close();" type="button"  class="btnStyle1">取消</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
