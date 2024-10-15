<?php
	$mapUser	= SSP::getUser();
	$mapMenu	= isset($mapUser['menu']) ? $mapUser['menu'] : array();	// menu不存在時，給預設值，避免造成 JS 錯誤
?>
<script type="text/javascript">
$(function(){
	$('#side-nav').append( $("#menu_tmpl").render(<?php echo json_encode($mapMenu, true); ?>) );	
});
</script>
<script id="menu_tmpl" type="text/x-jsrender">
<li class="panel">
	<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#side-nav" href="#menu_{{:group_key}}_admin">
		<i class="fa fa-folder-open"></i> <span class="name">{{:group_name}}</span>
	</a>
	<ul id="menu_{{:group_key}}_admin" class="panel-collapse collapse ">
		{{for item}}
			<li class=""><a href="{{:url}}" {{if is_pjax == "0" }} data-no-pjax {{/if}} >{{:title}}</a></li>
		{{/for}}
	</ul>
</li>
</script>

<style>

/* 隱藏右上角的功能列 */
.navbar .nav {
    display:none;
}

/* 隱藏左邊的 menu */
nav.sidebar#sidebar {
    display:none;
}

/* 內文靠左 */
.wrap {
    margin-left: 0px;
}

</style>

<div class="logo">
    <h4 class="text-nowrap">
        SPACE CYCLE
        <small>&nbsp;&nbsp;&nbsp;
            <a href="?c=account"><i class="fa fa-home"></i> 回首頁</a>
        </small>
    </h4>
</div>

<!-- Navigation -->
<nav id="sidebar" class="sidebar nav-collapse collapse">
	<ul id="side-nav" class="side-nav"></ul>
</nav>
<!-- Navigation END -->

<div class="wrap">

    <header class="page-header">
        <div class="navbar">
            <ul class="nav navbar-nav navbar-right pull-right">
                <li class="visible-phone-landscape">
                    <a href="#" id="search-toggle">
                        <i class="fa fa-search"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a href="#" title="Messages" id="messages"
                       class="dropdown-toggle"
                       data-toggle="dropdown">
                        <i class="fa fa-comments"></i>
                    </a>
                    <ul id="messages-menu" class="dropdown-menu messages" role="menu">
                        <li role="presentation">
                            <a href="#" class="message">
                                <img src="img/1.jpg" alt="">
                                <div class="details">
                                    <div class="sender">Jane Hew</div>
                                    <div class="text">
                                        Hey, John! How is it going? ...
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="message">
                                <img src="img/2.jpg" alt="">
                                <div class="details">
                                    <div class="sender">Alies Rumiancaŭ</div>
                                    <div class="text">
                                        I'll definitely buy this template
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="message">
                                <img src="img/1.jpg" alt="">
                                <div class="details">
                                    <div class="sender">Michał Rumiancaŭ</div>
                                    <div class="text">
                                        Is it really Lore ipsum? Lore ...
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="text-align-center see-all">
                                See all messages <i class="fa fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" title="8 support tickets"
                       class="dropdown-toggle"
                       data-toggle="dropdown">
                        <i class="fa fa-group"></i>
                        <span class="count">8</span>
                    </a>
                    <ul id="support-menu" class="dropdown-menu support" role="menu">
                        <li role="presentation">
                            <a href="#" class="support-ticket">
                                <div class="picture">
                                    <span class="label label-important"><i class="fa fa-bell-o"></i></span>
                                </div>
                                <div class="details">
                                    Check out this awesome ticket
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="support-ticket">
                                <div class="picture">
                                    <span class="label label-warning"><i class="fa fa-question-circle"></i></span>
                                </div>
                                <div class="details">
                                    "What is the best way to get ...
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="support-ticket">
                                <div class="picture">
                                    <span class="label label-success"><i class="fa fa-tag"></i></span>
                                </div>
                                <div class="details">
                                    This is just a simple notification
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="support-ticket">
                                <div class="picture">
                                    <span class="label label-info"><i class="fa fa-info-circle"></i></span>
                                </div>
                                <div class="details">
                                    12 new orders has arrived today
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="support-ticket">
                                <div class="picture">
                                    <span class="label label-important"><i class="fa fa-plus"></i></span>
                                </div>
                                <div class="details">
                                    One more thing that just happened
                                </div>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="text-align-center see-all">
                                See all tickets <i class="fa fa-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li class="hidden-xs">
                    <a href="#" id="settings"
                       title="Settings"
                       data-toggle="popover"
                       data-placement="bottom">
                        <i class="fa fa-cog"></i>
                    </a>
                </li>
                <li class="hidden-xs dropdown">
                    <a href="#" title="Account" id="account"
                       class="dropdown-toggle"
                       data-toggle="dropdown">
                        <i class="fa fa-user"></i>
                    </a>
                    <ul id="account-menu" class="dropdown-menu account" role="menu">
                        <li role="presentation" class="account-picture">
                            <img src="img/2.jpg" alt="">
                            Philip Daineka
                        </li>
                        <li role="presentation">
                            <a href="?c=account&m=profile" class="link">
                                <i class="fa fa-user"></i>
                                Profile
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="?c=account&m=calendar" class="link">
                                <i class="fa fa-calendar"></i>
                                Calendar
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#" class="link">
                                <i class="fa fa-inbox"></i>
                                Inbox
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="visible-xs">
                    <a href="#" class="btn-navbar" data-toggle="collapse" data-target=".sidebar" title="">
                        <i class="fa fa-bars"></i>
                    </a>
                </li>
                <li class="hidden-xs"><a href="?c=account&m=logout"><i class="fa fa-sign-out"></i></a></li>
            </ul>
        </div>
    </header>
        
	<div class="content container">