<script type="text/javascript">
$(function(){
    //取得訊息清單
    var apiGetImList = '?c=im&m=getImList';

    //上方未讀訊息清單
    var imList = $('#messages-menu');

    //上方未讀訊息數量
    var imCount = $('#messages .count');

    //訊息 template
    var imTmpl = $.templates('#im_tmpl');

    //未讀訊息的 see all 連結
    var imSeeAllTmpl = $.templates('#im_see_all_tmpl');


    getMessages();
    setInterval( function() {
        getMessages();
    }, 15000);

    function getMessages() {
        act(apiGetImList, {iDisplayStart:0, iDisplayLength:3}, function(json) {
            for(var key in json.data) {
                var tmp = json.data[key];
            }

            if (json.unread != '0') {
                imCount.html(json.unread).show();
            }
            else {
                imCount.hide();
            }

            if (json.data.length == 0) {
                imList.html('').append( '<li>目前沒有新訊息</li>');
            }
            else {
                imList.html('').append( imTmpl.render( json.data )).append( imSeeAllTmpl.render() );
            }
        });

    }
});
</script>

<style>
/* 取消訊息框的 hover 效果 */
#messages-menu a.message:hover {
    background-color:white !important;
}

#messages-menu li {
    width: 250px;
}
#account-menu a.link{
    color : black !important;
}

</style>


<script id="im_tmpl" type="text/x-jsrender">
<li role="presentation">
    <a class="message">
        <img src="{{:sender_src}}" alt="">
        <div class="details">
            <div class="sender">{{:sender_name}}</div>
            <div class="text ellipsis">
                {{:body}}
            </div>
        </div>
    </a>
</li>
</script>

<script id="im_see_all_tmpl" type="text/x-jsrender">
    <li role="presentation">
        <a href="?c=im&m=admin" class="text-align-center see-all">
            See all messages <i class="fa fa-arrow-right"></i>
        </a>
    </li>
</script>
    <a href="?c=account" class="logo">
        <img src="assets/img/logo.png" alt="SPACE CYCLE"/>
    </a>

    <!-- <header class="page-header"> -->
    <div class="pull-right top-bar-controls">
        <ul id="mini-nav" class="clearfix">
            <li class="list-box dropdown">
                <a id="messages" title="Messages" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="info-label success-bg count"></span>
                    <i class="fa fa-comments"></i>
                </a>

                <ul id="messages-menu" class="dropdown-menu server-activity messages" role="menu">
                </ul>
            </li>
            <li class="list-box dropdown hidden-xs ">
                <a id="account" title="Account" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-user"></i>
                </a>

                <ul id="account-menu" class="dropdown-menu server-activity account" role="menu">
                    <li  role="presentation">
                        <a href="?c=account&m=profile" class="link"><p><i class="fa fa-user text-info"></i>Profile</p></a>
                    </li>
                    <li  role="presentation">
                        <a href="?c=im&m=admin" class="link"><p><i class="fa fa-inbox text-info"></i>Inbox</p></a>
                    </li>
                </ul>
            </li>
            <li class="list-box hidden-xs"><a href="?c=account&m=logout"><i class="fa fa-sign-out"></i></a></li>
        </ul>

        </div>
    <!-- </header> -->