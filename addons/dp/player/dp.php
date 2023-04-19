<?php
$MacCmsBox = require('../../../application/extra/blibliplay.php');
include 'EcClass.php';
$EcClass = new EcClass();
if($MacCmsBox['random'] == 1){
    $MacCmsBox['gx']['pic'] = $EcClass->Random_graph($MacCmsBox['random_img']);
}
$tga_array = explode("#", $MacCmsBox['tga']);
$api_id = intval($_GET['id']);
$url = htmlspecialchars(urldecode(trim($_GET['url'])));
$from = htmlspecialchars(urldecode(trim($_GET['from'])));
$api = htmlspecialchars(urldecode(trim($_GET['api'])));
$api_url = '/';
if(!empty($api)){
    $api_url = $api;
}
$subtitle_url = "";
if(strpos($url,"/T/") !== false){
    $subtitle = explode("/T/", $url);
    $url = $subtitle[0];
    $subtitle_url = $subtitle[1];
}
$key = intval($_GET['key']);
if (substr($url,0,3) == 'dp_'){
    $url = substr($url,3);
    $decode = base64_decode($url);
    $url = $EcClass->Decrypt($decode,$MacCmsBox['key'],$MacCmsBox['iv']);
}
$api_vod_url = $url;
$json_data = $EcClass->Json_is($url,$MacCmsBox['jx'],$from,$key,$MacCmsBox['mode'],$MacCmsBox['host'],$MacCmsBox['yuan'],$api_id,$_GET['jump'],$api);
if($json_data['code'] == 200){
    $url = $json_data['url'];
}else{
    exit($json_data['html']);
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta charset="UTF-8">
    <title>DPlayer+</title>
    <link rel="stylesheet" href="../player/css/player.css">
    <script src="../player/js/jquery.min.js"></script>
    <script src="../player/js/player.js"></script>
    <script src="../player/js/hls.min.js"></script>
    <meta name="referrer" content="never"/>
    <style>
        <?php
        if(empty($MacCmsBox['gx']['load_img'])){
            if($MacCmsBox['gx']['load_icon'] == 0){
                echo '#loading-box .pic{width:320px;height:184px;z-index:3;background:url(https://img13.360buyimg.com/ddimg/jfs/t1/185080/17/2599/91779/6093991cEba246750/4634b6e0c56b6510.png) no-repeat;-webkit-transform:scale(.5);transform:scale(.5);-webkit-animation:iconAnimation .94s steps(1) infinite;animation:iconAnimation .94s steps(1) infinite;margin:-110px 0 0 -160px}';
            }
        }else{
            echo '.loading .pic{background:url('.$MacCmsBox['gx']['load_img'].') no-repeat;width:80px;}';
        }
        ?>
        #loading-box .video-panel-blur-image{background: url(<?php echo $MacCmsBox['gx']['pic']; ?>) #000000;display:block;width:110%;height:110%;position:absolute;left:-5%;top:-5%;background-size:cover;background-position:50%;-webkit-filter:blur(35px);-moz-filter:blur(35px);-ms-filter:blur(35px);filter:blur(0)}
        #close{bottom:5%;left:2%;box-shadow:unset;background:unset;top:unset;color:<?php echo $MacCmsBox['gx']['load_color']; ?>;height:auto;border-radius:0;text-align:left;font-size:12px;width:110px;cursor:pointer;position:absolute;z-index:99999;display:inline-block;line-height:16px}
        .yzmplayer-logo{<?php echo $MacCmsBox['gx']['logo_val']; ?>}
        :root{--main-color:<?php echo $MacCmsBox['color']; ?>;}
    </style>
</head>
<body>
    <div id="player"></div>
    <div id="ADplayer"></div>
    <div id="ADtip"></div>
    <script>
        var config = {
            "api": '/index.php/danmu',
            "url": "<?php echo trim($url);?>",
            "id": "<?php echo (substr(md5(htmlspecialchars(urldecode(trim($_GET['url'])))), -20)); ?>",
            "next": "",
            "jump":"<?php echo htmlspecialchars(urldecode(trim($_GET['jump']))); ?>",
            "group": "游客",
            'state':"<?php echo $MacCmsBox['state']; ?>",
            "logo": "<?php echo $MacCmsBox['logo']; ?>",
            "sendtime": "<?php echo $MacCmsBox['sendtime']; ?>",
            "marquee":"<?php echo $MacCmsBox['marquee']; ?>",
            "color":"<?php echo $MacCmsBox['color']; ?>",
            "danmuon":"<?php echo $MacCmsBox['danmuon']; ?>",
            "ads":<?php echo json_encode($MacCmsBox['ads']); ?>,
            "pbgjz":"<?php echo $MacCmsBox['pbgjz']; ?>",
            "subtitle_url":"<?php echo $subtitle_url; ?>",
            "api_id":"<?php echo $api_id; ?>",
            "api_url":"<?php echo $api_url; ?>",
            "from":"<?php echo $from; ?>",
            "group_x":"<?php echo $MacCmsBox['user']; ?>",
            "api_vod_url":"<?php echo trim($api_vod_url); ?>",
            "user_danmuon":<?php echo json_encode($MacCmsBox['user_danmuon']); ?>,
            "trysee":"<?php echo $MacCmsBox['trytime']; ?>",
            "try_user":"<?php echo $MacCmsBox['try-user']; ?>",
            "waittime":"<?php echo $MacCmsBox['waittime']; ?>",
            "default":"<?php echo $MacCmsBox['default']; ?>",
            "type":"hls",
        }
        if(config.url.indexOf('.flv')>-1){
            config.type='flv';
        }else if(config.url.indexOf('.mp4')>-1){
            config.type='mp4';
        }
        if (self.frameElement && self.frameElement.tagName == "IFRAME") {
            let MacCmsBox = $('#blibliId', parent.document).data();
            if(MacCmsBox.id.toString().length > 1){
                config.id = MacCmsBox.id;
            }
            config.next = MacCmsBox.url;
            config.group = MacCmsBox.user;
        }
    </script>
<style>
    .rotate-list{display:none}
    .along90{transition-duration:.4s;transform:rotate(90deg) scale3d(1,1,1);width:100vh!important;height:100vh!important;margin:0 auto!important;position: relative!important;}
    .along180{transition-duration:.4s;transform:rotate(180deg) scale3d(1,1,1)}
    .inverse90{transition-duration:.4s;transform:rotate(-90deg) scale3d(1,1,1);width:100vh!important;height:100vh!important;margin:0 auto!important;position: relative!important;}
    .along{transition-duration:.4s;transform:rotate(0) scale3d(1,1,1)}
    .yzmplayer-setting-box-rotate .yzmplayer-setting-origin-panel{display:none!important}
    .yzmplayer-setting-box-rotate .rotate-list{display:block!important}
</style>
</body>
</html>