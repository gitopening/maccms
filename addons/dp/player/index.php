<?php
$MacCmsBox = require('../../../application/extra/blibliplay.php');
$l = '/addons/dp/player/'.$MacCmsBox['play-type'].'.php?key='.$_GET['key'].'&from='.$_GET['from'].'&id='.$_GET['id'].'&api='.$_GET['api'].'&url='.$_GET['url'].'&jump='.$_GET['jump'];
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>资源加载中</title>
    <style>
        body{padding:0;margin:0;overflow:hidden;position:relative}
        .bg{background:url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d83be038-d395-4d8c-b3b6-f74c025473f7/057931e9-1b51-4fc2-9ff7-039e095688c3.jpg);background-size:150%;width:100%;height:100%;opacity:.38;position:absolute}
        .main{position:absolute;left:1px;right:1px;top:1px;bottom:1px;margin:auto;height:15vh;width:100%;z-index:1;text-align:center}
        .loading{width:60px;height:60px;display:inline-block;vertical-align:middle;animation:Loading .6s steps(8,end) infinite;background:#b3b2b2 url(img/load.svg) no-repeat;background-size:100%;border-radius:50px;border:10px solid #b3b2b2;box-sizing:border-box}
        @keyframes Loading{0%{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}
            100%{-webkit-transform:rotate3d(0,0,1,360deg);transform:rotate3d(0,0,1,360deg)}
        }
        .tips{color:#fff;margin-top:30px;font-size:16px;font-weight:200}
        @media (max-width:1239px){.logo img{height:48px}
            .loading{height:48px;width:48px}
        }
        @media (max-width:899px){.logo img{height:40px}
        }
        @media (max-width:899px){.bg{opacity:.56}
            .loading{height:40px;width:40px;border-width:8px}
            .tips{margin-top:15px;font-size:12px}
        }
    </style>
</head>
<body bgcolor="#000000" oncontextmenu="return!1" ondragstart="window.event.returnValue=!1" onsource="event.returnValue=!1" onselectstart="return false">
<div class="bg"></div>
<div class="main">
    <div class="loading"></div>
    <div class="tips">资源加载中 精彩马上呈现...</div>
</div>
</body>
<script>window.location.href="<?php echo $l; ?>";</script>
</html>