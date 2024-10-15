
<?php
    date_default_timezone_set("Asia/Taipei");

?>
<html>

<head>

    <style>
        body
        {
            padding:10px;
        }
    
        td{
            border:solid 1px #dcdcdc;
            padding:10px;
        }
    </style>

</head>

<body>
<div>
    對帳單
    <br>
        <input type="text" value="" />
        <input type="button" value="查詢" />
        <input type="button" value="匯出excel" />
</div>
<br>

    <table border="0" style="border:solid 1px gray;">
        <tr style="background-color:#dcdcdc;color:black;font-weight:bold;">
           
            <td>父層</td>
            <td>帳號類別</td>
             <td>交收日期</td>
            <td>ID</td>
            <td>使用者</td>
       
        
            <td>手續費</td>
            <td>損益</td>
        
            <td>數量</td>
            <td>總金額</td>
           
            <td>佔成</td>
            <td>交收金額</td>
           
            <td></td>
        </tr>
        <?php
            if(isset($list))
            {
                foreach($list as $item)
                {
                    echo '<tr>';
                  
                    
                    echo '<td>'.  $item['parent'] .'</td>';
                    if($item['user_group'] == 1)
                    {
                        echo '<td>使用者</td>';
                    }
                    else
                    {
                        echo '<td>代理</td>';
                    }
                    echo '<td>'.  date('Y-m-d', strtotime( $item['date'])) .'</td>';
                    echo '<td>'.  $item['user_id'] .'</td>';
                    echo '<td>'.  $item['name'] .'</td>';
                    echo '<td>'.  $item['total_charge'] .'</td>';
                    echo '<td>'.  $item['total_profit'] .'</td>';
                    echo '<td>'.  $item['total_amount'] .'</td>';
                    echo '<td>'.  ($item['total_charge'] +  $item['total_profit'] ) .'</td>';
                    echo '<td>'.  $item['percentage'] .'%</td>';
                    echo '<td>'.  ( ($item['total_profit'] +  $item['total_charge'] ) * $item['percentage'] /100)  .'</td>';
                    echo '<td><a href="123">詳細資料</a></td>';
                    echo '</tr>';
                }


            }
        ?>
    </table>




</body>


</html>







