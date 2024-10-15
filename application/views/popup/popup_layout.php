<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>版面選擇</title>
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/reset.css">
    <link rel="stylesheet" href="<?=$webroot;?>assets/css/popup_black.css">
</head>
<body>

<div style="text-align:center;">
<div style="margin:0 auto;width:300px;padding-top:30px;">
    <div id="content">
        <input type="radio" name="lay" id="lay_a" checked="checked">版面A
        <input type="radio" name="lay" id="lay_b">版面B
    </div>
    <br>
    <button class="btnStyle1">確定</button>
    <button onclick="parent.close();" type="button" class="btnStyle1">關閉</button>
</div>
</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript">
    $(function(){
        $("#lay_a").click(function(){
            if($('#lay_a').prop('checked',true)){
                console.log('A:checked');
                // var warp = $(window.parent.document).find("body");
                // warp.css("background-color","#000");
                parent.addCss("a");


            }else{
                console.log('A:unchecked');
            };
        });
        $("#lay_b").click(function(){
            if($('#lay_b').prop('checked',true)){
                console.log('B:checked');
                parent.addCss("b");
            }else{
                console.log('B:unchecked');
            };
        });



        
    })
</script>
</html>