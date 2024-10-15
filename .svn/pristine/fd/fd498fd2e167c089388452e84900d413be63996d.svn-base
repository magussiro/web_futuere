<?php
    $mapUser    = SSP::getUser();
    $mapMenu    = isset($mapUser['menu']) ? $mapUser['menu'] : array(); // menu不存在時，給預設值，避免造成 JS 錯誤
?>
<script type="text/javascript">

$(function(){
    var source = activeInjector(<?php echo json_encode($mapMenu, true); ?>);
    if (typeof source.main === 'object'){
        $('#side-nav').append( $("#menu_tmpl").render(source.main) );
    }
    if (typeof source.sub === 'object'){
        $('#sub-nav').append( $("#sub_menu_tmpl").render(source.sub) );
        $('#sub-nav .heading').text(source.subHeading);
    }
});

function activeInjector(source){
    var subSource;
    var subHeading
    for(var key in source) {
        var tmp = source[key].item;
        for (var key2 in tmp){
            if (tmp[key2]['url'] === "<?php echo substr($_SERVER['REQUEST_URI'],strpos($_SERVER['REQUEST_URI'],'?')) ?>"){
                source[key].isactive = 1;
                subSource = tmp;
                subHeading = source[key]['group_name'];
                tmp[key2].isSubActive = 1;
            }
        }
    }
    return {main:source,sub:subSource,subHeading:subHeading};
};
</script>

<!-- Header Start -->
<header>
    <a href="?c=account" class="logo">
        <img src="assets/img/logo.png" alt="SPACE CYCLE"/>
    </a>

    <div class="pull-right top-bar-controls">
        <ul id="mini-nav" class="clearfix">
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

</header>
<!-- Header End -->

<div class="dashboard-container">
    <div class="container">

    <nav id='cssmenu'>
        <ul id="side-nav" class="side-nav"></ul>
    </nav>

    <div class="sub-nav hidden-sm hidden-xs">
        <ul id="sub-nav" >
            <li><a href="" class="heading"></a></li>
        </ul>
    </div>

<script id="menu_tmpl" type="text/x-jsrender">
<li class="panel {{if isactive=='1'}}active{{/if}}">
    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#side-nav" href="#menu_{{:group_key}}_admin">
        <i class="fa fa-folder-open"></i><span class="name">{{:group_name}}</span>
    </a>
    <ul id="menu_{{:group_key}}_admin" class="panel-collapse collapse ">
        {{for item}}
            <li class=""><a href="{{:url}}" {{if is_pjax == "0" }} data-no-pjax {{/if}} >{{:title}}</a></li>
        {{/for}}
    </ul>
</li>
</script>

<script id="sub_menu_tmpl" type="text/x-jsrender">
    <li class="hidden-sm hidden-xs">
        <a href="{{:url}}" class="{{if isSubActive ==1}}selected{{/if}}">{{:title}}</a>
    </li>
</script>
