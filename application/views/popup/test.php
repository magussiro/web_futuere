<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>jQuery实现表格行上移下移和置顶</title>
<meta name="keywords" content="jquery,滑动" />
<meta name="description" content="Helloweba文章结合实例演示HTML5、CSS3、jquery、PHP等WEB技术应用。" />
<link rel="stylesheet" type="text/css" href="css/main.css" />
<style type="text/css">
.demo{width:600px; margin:60px auto 10px auto; font-size:16px}
.table {border-collapse: collapse !important;width: 100%;max-width: 100%;margin-bottom: 20px;}
.table td,.table th {background-color: #fff !important;}
.table-bordered th,.table-bordered td {border: 1px solid #ddd !important;}
.table tr td {padding: 8px;line-height: 1.42857143;vertical-align: middle;border-bottom: 1px solid #ddd;}
.table tr:hover {background-color: #f5f5f5;}
</style>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script>
$(function(){
 //上移
 var $up = $(".up")
 $up.click(function() {
  var $tr = $(this).parents("tr");
  if ($tr.index() != 0) {
   $tr.fadeOut().fadeIn();
   $tr.prev().before($tr);
  }
 });
 //下移
 var $down = $(".down");
 var len = $down.length;
 $down.click(function() {
  var $tr = $(this).parents("tr");
  if ($tr.index() != len - 1) {
   $tr.fadeOut().fadeIn();
   $tr.next().after($tr);
  }
 });
 //置顶
 var $top = $(".top");
 $top.click(function(){
  var $tr = $(this).parents("tr");
  $tr.fadeOut().fadeIn();
  $(".table").prepend($tr);
  $tr.css("color","#f60");
 });
});
</script>
</head>
<body>
<div id="main">
 <div class="demo">
  <table class="table">
   <tr>
    <td>HTML5获取地理位置定位信息</td>
    <td>2015-04-25</td>
    <td><a href="#" class="up">上移</a> <a href="#" class="down">下移</a> <a href="#" class="top">置顶</a></td>
   </tr>
   <tr>
    <td>CSS+Cookie实现的固定页脚广告条</td>
    <td>2015-04-18</td>
    <td><a href="#" class="up">上移</a> <a href="#" class="down">下移</a> <a href="#" class="top">置顶</a></td>
   </tr>
   <tr>
    <td>纯CSS3制作漂亮的价格表</td>
    <td>2015-04-10</td>
    <td><a href="#" class="up">上移</a> <a href="#" class="down">下移</a> <a href="#" class="top">置顶</a></td>
   </tr>
   <tr>
    <td>jQuery实现的测试答题功能</td>
    <td>2015-03-29</td>
    <td><a href="#" class="up">上移</a> <a href="#" class="down">下移</a> <a href="#" class="top">置顶</a></td>
   </tr>
  </table>
 </div>
</div>
</body>
</html>