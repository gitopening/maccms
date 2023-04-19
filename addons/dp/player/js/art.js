var EC = {
    'start': function() {
        let html = '<div class="bg"></div><div class="main"><div class="tips"><h1>没有找到资源地址</h1><div id="time" class="fail-tsp">可能是资源解密出现问题请联系管理员</div></div></div>';
        if(config.url.length < 1){
            $('body').addClass("fail").html(html);
            return;
        }
        if (config.group_x.indexOf(config.group) >= 0 && config.group != '') {
            if (config.state == '1') {
                EC.MYad.vod(config.ads.vod.time, config.ads.vod.link);
            }else{
                EC.MYad.pic(config.ads.pic.link, config.ads.pic.time, config.ads.pic.img);
            }
        } else {
            EC.play(config.url);
        }
    },
    "play" : function (url){
        if (config.danmuon==1) {
            EC.player.play(url);
        } else {
            EC.player.DmPlay(url);
        }
    },
    'MYad': {
        'vod': function(u, l) {
            EC.player.AdPlay(u,l);
        },
        'pic': function(l, t, p) {
            let bod = $(".artplayer-app");
            bod.html('<div class="vod-gg"><a id="link" href="' + l + '" target="_blank">广告 <e id="time_ad">' + t + '</e></a></div><img src="' +p + '">');
            bod.click(function() {
                document.getElementById('link').click();
            });
            bod.addClass("ad-tip");
            let span = document.getElementById("time_ad");
            let num = span.innerHTML;
            let timer = null;
            setTimeout(function() {
                timer = setInterval(function() {
                    num--;
                    span.innerHTML = num;
                    if (num == 0) {
                        clearInterval(timer);
                        EC.play(config.url);
                        bod.removeClass("ad-tip");
                        bod.html();
                        bod.off("click");
                    }
                }, 1000);
            }, 1);
        },
        'pause': {
            'play': function(l, p) {
                let pause_ad_html = '<div id="player_pause"><div class="tip" style="left:0;bottom:6px">广告</div><div class="tip g_close"><a href="javascript:" title="关闭广告" style="color:#f4f4f4">X</a></div><a href="' + l +
                    '" target="_blank"><img src="' + p + '"></a><script>$(".g_close").click(function(){$(this).parent().remove()})</script></div>';
                $('.art-video-player').prepend(pause_ad_html);
            },
            'out': function() {
                $('#player_pause').remove();
            }
        }
    },
    'player': {
        'play': function(url) {
            EC.ad = new Artplayer({
                container: '.artplayer-app',
                url: url,
                autoplay: true,
                autoPlayback: true,
                theme:config.color,
                setting: true,
                flip: true,
                playbackRate: true,
                aspectRatio: true,
                screenshot: true,
                pip: true,
                mutex: true,
                fullscreen: true,
                fullscreenWeb: false,
                whitelist: ['*'],
                fastForward: true,
                autoOrientation: true,
                settings: [
                    {
                        html: '画面旋转',
                        tooltip: '默认°',
                        selector: [
                            {
                                html: '默认°',
                            },
                            {
                                html: '顺时针90°',
                            },
                            {
                                html: '顺时针180°',
                            },
                            {
                                html: '逆时针90°',
                            },
                        ],
                        onSelect: function (item, $dom, event) {
                            switch(item.html){
                                case '顺时针90°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along90');
                                    break;
                                case '顺时针180°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along180');
                                    break;
                                case '逆时针90°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('inverse90');
                                    break;
                                default:
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along');
                                    break;
                            }
                            return item['html'];
                        },
                    },
                ],
                type: config.type,
                customType: {
                    m3u8: function (video, url) {
                        var hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    },
                    flv: function (video, url) {
                        if (flvjs.isSupported()) {
                            const flvPlayer = flvjs.createPlayer({
                                type: 'flv',
                                url: url,
                            });
                            flvPlayer.attachMediaElement(video);
                            flvPlayer.load();
                        } else {
                            EC.ad .notice.show = '不支持播放格式：flv';
                        }
                    },
                },
            });
            EC.load();
        },
        'AdPlay': function(url,l) {
            EC.ad = new Artplayer({
                container: '.artplayer-app',
                url: url,
                autoplay: true,
                muted: true,
                playbackRate: false,
                customType: {
                    m3u8: function (video, url) {
                        var hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    },
                },
            });
            $(".art-progress").hide();
            $(".art-video-player").prepend('<div class="ad-tip"><div class="vod-gg"><a>广告</a><a href="' + l + '" target="_blank">查看详情</a></div></div>');
            EC.ad.on('video:ended', () => {
                EC.ad.destroy();
                $(".ad-tip").remove();
                EC.play(config.url);
            });
        },
        'DmPlay': function(url) {
            EC.ad = new Artplayer({
                container: '.artplayer-app',
                url: url,
                autoplay: true,
                theme:config.color,
                autoPlayback: true,//自动播放
                setting: true,//显示设置按钮
                flip: true,//显示旋转
                playbackRate: true,//播放速度功能
                aspectRatio: true,//视频长宽比功能
                screenshot: true,//截图
                pip: true,//画中画
                mutex: true,//互拆
                fullscreen: true,//全屏
                fullscreenWeb: false,//网页全屏
                whitelist: ['*'],//手机端使用本播放器
                fastForward: true,//手机端长视频快进
                autoOrientation: true,//手机中旋转屏幕
                type: config.type,
                customType: {
                    m3u8: function (video, url) {
                        var hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    },
                    flv: function (video, url) {
                        if (flvjs.isSupported()) {
                            const flvPlayer = flvjs.createPlayer({
                                type: 'flv',
                                url: url,
                            });
                            flvPlayer.attachMediaElement(video);
                            flvPlayer.load();
                        } else {
                            EC.ad .notice.show = '不支持播放格式：flv';
                        }
                    },
                },
                settings: [
                    {
                        html: '画面旋转',
                        tooltip: '默认°',
                        selector: [
                            {
                                html: '默认°',
                            },
                            {
                                html: '顺时针90°',
                            },
                            {
                                html: '顺时针180°',
                            },
                            {
                                html: '逆时针90°',
                            },
                        ],
                        onSelect: function (item, $dom, event) {
                            switch(item.html){
                                case '顺时针90°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along90');
                                    break;
                                case '顺时针180°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along180');
                                    break;
                                case '逆时针90°':
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('inverse90');
                                    break;
                                default:
                                    $(".art-video").removeClass('along90 inverse90 along180 along').addClass('along');
                                    break;
                            }
                            return item['html'];
                        },
                    },
                ],
                plugins: [
                    artplayerPluginDanmuku({
                        danmuku: config.api+'/art/id/'+config.id+'.xml',
                        speed: 5, // 弹幕持续时间，单位秒，范围在[1 ~ 10]
                        opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
                        fontSize: 25, // 字体大小，支持数字和百分比
                        margin: ['2%', 60], // 弹幕上下边距，支持数字和百分比
                        antiOverlap: true, // 是否防重叠
                        useWorker: true, // 是否使用 web worker
                        synchronousPlayback: false, // 是否同步到播放速度
                        filter: (danmu) => danmu.text.length < 50, // 弹幕过滤函数
                    }),
                ]
            });
            EC.load();
            EC.DanMu.initial();
            EC.ad.on('artplayerPluginDanmuku:start', () => {
                if (config.user_danmuon == 1 && config.group == "游客" || config.user_danmuon == 1 && config.group == "") {
                    $('.art-danmuku-input').attr({"disabled": true, "placeholder": "登陆后才能发弹幕yo(・ω・)"});
                }
            });
            EC.ad.on('artplayerPluginDanmuku:emit', (danmu) => {
                EC.DanMu.add(danmu)
            });
            if(config.default == 1){
                $(".art-controls-center").hide();
            }
        }
    },
    'load': function() {
        let html = '<div id="loading-box"><div class="loading"><div class="video-panel-blur-image"></div><p class="pic"></p></div>\n' +
            '<div type="button" id="close" ><div class="playlink"><span id="link1">播放器连接...</span><span id="link1-success">【完成】</span></div>\n' +
            '<div class="dmlink" style="display:none"><span id="link2">弹幕连接中...</span><span id="link2-success">【完成】</span><span id="link2-error">【失败】</span></div>\n' +
            '<span class="palycon" id="link3"><e id="link3_tip">等待视频连接中</e><e id="link3-error">【失败】</e></span></div></div>';
        $('.artplayer-app').prepend(html);
        setTimeout(function() {
            $("#link1").fadeIn();
        }, 100);
        setTimeout(function() {
            $("#link1-success").fadeIn();
        }, 500);
        setTimeout(function() {
            $("#link2").show();
        }, 1 * 1000);
        setTimeout(function() {
            $("#link3,#span").fadeIn();
        }, 2 * 1000);
        EC.playtime = Number(EC.getCookie("time_" + config.url));
        EC.ctime = EC.formatTime(EC.playtime);
        EC.ad.on('ready', () => {
            EC.loadedmetadataHandler();
            if(config.subtitle_url.length > 2){
                EC.ad.subtitle.switch(config.subtitle_url);
            }
        });
        let vide_init = $('.art-video-player');
        if(config.logo.length > 2){
            vide_init.prepend('<div class="ec-logo"><img src="'+config.logo+'"></div>');
        }
        if(config.marquee.length  > 2){
            vide_init.prepend('<div class="marquee"><marquee class="ec-tyy">'+config.marquee+'</marquee></div>');
        }
        vide_init.prepend('<div class="vodlist-of danmu-hide"></div><div class="ec-listbox"><div class="anthology-wrap"></div></div></div><div class="r-button"><span class="yzmplayer-icon-content"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M448 128a106.667 106.667 0 0 1 106.667 106.667v576A106.667 106.667 0 0 1 448 917.333H128A106.667 106.667 0 0 1 21.333 810.667v-576A106.667 106.667 0 0 1 128 128h320z m448 256a106.667 106.667 0 0 1 106.667 106.667v320A106.667 106.667 0 0 1 896 917.333H661.333a42.667 42.667 0 1 1 0-85.333H896a21.333 21.333 0 0 0 21.333-21.333v-320A21.333 21.333 0 0 0 896 469.333H661.333a42.667 42.667 0 1 1 0-85.333zM448 213.333H128a21.333 21.333 0 0 0-21.333 21.334v554.666A21.333 21.333 0 0 0 128 810.667h320a21.333 21.333 0 0 0 21.333-21.334V234.667A21.333 21.333 0 0 0 448 213.333zM384 672a32 32 0 0 1 0 64H213.333a32 32 0 0 1 0-64z"></path></svg></span></div>');
        $(document).on('click', '.vodlist-of', function() {
            $(".ec-listbox").removeClass("ec-stting");
            $(this).hide();
        });
        if (config.ads.pause.state == 'on') {
            EC.ad.on('play', () => {
                EC.MYad.pause.out();
            });
            EC.ad.on('pause', () => {
                EC.MYad.pause.play(config.ads.pause.link, config.ads.pause.img);
            });
        }
        EC.ad.controls.add({
            disable: false,
            name: 'list',
            index: 10,
            position: 'right',
            html: '列表',
            tooltip: '打开选集列表',
            click: function () {
                EC.ecList.initial();
            },
        });
        EC.ad.controls.add({
            disable: false,
            name: 'danmu',
            index: 11,
            position: 'right',
            style:{
                "display":"none"
            },
            html: '<i class="art-icon art-icon-screenshot"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M591.052962 516.456498h36.308951v30.253025h-36.308951z"></path><path d="M963.626469 391.364479h-73.188906c-17.155728-49.615001-43.482327-94.682429-76.567863-134.00604h94.240361v-82.312704H721.732234c-66.509786-43.469024-145.831366-68.940139-231.185337-68.940139-233.809093 0-423.356101 189.534727-423.3561 423.370427 0 233.835699 189.547007 423.358147 423.3561 423.358147 69.369927 0 134.605697-16.997116 192.382589-46.574758h225.179552v-82.286098H794.323529c37.269835-38.412868 67.288522-83.715657 87.898932-134.00604h81.402985v-82.284051h-57.233516c4.757351-25.366737 7.537673-51.462069 7.537674-78.206176 0-18.972097-1.688455-37.503149-4.105505-55.82647h53.800324v-82.286098z m-447.166389-88.653109c9.358135 14.814404 18.790972 33.631982 28.224832 56.451709l-54.448077 20.168342c-10.761088-20.168342-20.87033-38.960337-30.228465-56.451709l56.45171-20.168342zM407.561881 500.343519h-72.591295v48.393174h64.533782V689.864944c0 26.926256-6.055926 44.392046-18.167778 52.449559-10.784624 9.407254-38.308491 16.788361-82.674955 22.194488-4.027733-22.871917-11.434423-43.065841-22.143322-60.506049 48.342008 6.757914 69.186755-8.057513 62.455447-44.391023V603.160209h-60.479443V445.892373h66.559928v-54.4491h-84.676541V336.967568h147.184177v163.375951z m308.529889 185.518251H593.054549v82.650395h-62.48103v-82.650395H415.643953v-52.448536h114.929566v-34.281781h-100.816127V385.387347h143.178957c8.032954-24.197098 14.764262-45.689598 20.117177-64.533782 4.054339-13.410428 6.731308-20.818141 8.107655-22.194488 12.087293 2.728134 35.58138 10.81123 70.565149 24.222681 0 1.351787-2.026146 3.377934-6.055927 6.055926a319.803653 319.803653 0 0 0-38.309514 56.450687h62.50559v213.745128h-98.81454v34.281781h125.038807v52.44649z"></path><path d="M591.052962 439.83747h36.308951v28.224832h-36.308951zM492.262982 516.456498h38.310537v30.253025h-38.310537zM492.262982 439.83747h38.310537v28.224832h-38.310537z"></path></svg></i>',
            tooltip: '发布弹幕',
            click: function () {
                EC.DanMu.wap();
            },
        });
        EC.video.try();
        $(document).on('click', '.r-button', function() {
            $(".art-video").toggleClass("gyro-contain");
        });
        EC.ad.on('fullscreen', (...args) => {
            if(args[0]){
                $(".r-button").addClass("hp");
                $(".art-controls-center").addClass('dm-input-show');
            }else {
                $(".art-video").removeClass("gyro-contain");
                $(".r-button").removeClass("hp");
                $(".art-controls-center").removeClass('dm-input-show');
                if(config.jump.length >= 1){
                    let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?jump='+config.jump+'"></iframe>';
                    $("body").append(jump_html);
                }
            }
        });
        EC.ad.on('video:ended', () => {
            EC.setCookie("time_" + config.url, "", -1);
            if (config.next.length>2) {
                EC.video.next();
            } else {
                EC.Msg("视频播放已结束",2000);
                setTimeout(function() {
                    EC.video.end();
                }, 2 * 1000);
            }
        });
    },
    'RemoveMsg':function(){
        $('.pop-msg').remove();
    },
    'Msg':function($msg,$timeout){
        $('.art-video-player').prepend('<div class="pop-msg"><div class="pop-content"></div></div>');
        $('.pop-msg .pop-close').click(function(){
            $('.pop-msg').remove();
        });
        $('.pop-msg .pop-content').html($msg);
        $('.pop-msg').show();
        setTimeout(EC.RemoveMsg,$timeout);
    },
    'setCookie': function(c_name, value, expireHours) {
        var exdate = new Date();
        exdate.setHours(exdate.getHours() + expireHours);
        document.cookie = c_name + "=" + escape(value) + ((expireHours === null) ? "" : ";expires=" + exdate.toGMTString());
    },
    'getCookie': function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    'formatTime': function(seconds) {
        return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
    },
    'loadedmetadataHandler': function() {
        setTimeout(function() {
            EC.video.con_play()
        }, 1 * 1000);
        EC.ad.on('video:timeupdate', () => {
            EC.timeupdateHandler();
        });
    },
    'timeupdateHandler': function() {
        EC.setCookie("time_" + config.url, EC.ad.currentTime, 24);
    },
    'video': {
        'play': function() {
            $("#link3").text("视频已准备就绪，即将为您播放");
            setTimeout(function() {
                $("#loading-box").remove();
            }, 1 * 1500);
        },
        'next': function() {
            let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?id='+config.next+'"></iframe>';
            $("body").append(jump_html);
        },
        'try': function() {
            if (config.try_user.indexOf(config.group) >= 0 && config.group != '') {
                setInterval(function() {
                    var t = config.trysee * 60;
                    var s = EC.ad.currentTime;
                    if (s > t && config.trysee>0) {
                        EC.ad.currentTime = 0;
                        EC.ad.pause();
                        $('.art-video-player').prepend('<div class="pop-shade"></div><div class="pop-msg"><div class="pop-content">试看已结束，如需继续观看请升级用户组</div></div>');
                    }
                }, 1000);
            }
        },
        'seek': function() {
            EC.ad.seek=EC.playtime;
        },
        'end': function() {
            EC.Msg("播放结束啦=。=",2000);
        },
        'con_play': function() {
            if (EC.playtime > 0 && EC.ad.currentTime < EC.playtime) {
                $("#link3").html(` <e>已播放至${EC.ctime}，继续上次播放？</e><d class="conplay-jump">是 <i id="num">${config.waittime}</i>s</d><d class="conplaying">否</d>`);
            }else{
                $("#link3").text("视频已准备就绪，即将为您播放");
                setTimeout(function() {
                    $("#loading-box").remove();
                    EC.ad.play();
                }, 1 * 1000);
                return;
            }
            var span = document.getElementById("num");
            var num = span.innerHTML;
            var timer = null;
            setTimeout(function() {
                timer = setInterval(function() {
                    num--;
                    span.innerHTML = num;
                    if (num == 0) {
                        clearInterval(timer);
                        EC.ad.play();
                        $("#loading-box").remove();
                    }
                }, 1000);
            }, 1);
            $(".artplayer-app").append(`<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${EC.ctime}</span><span class="play-jump">跳转播放</span></div></div>`);
            $(".close").on("click", function() {
                $(".memory-play-wrap").remove();
            });
            setTimeout(function() {
                $(".memory-play-wrap,.memory-play-wrap").remove();
            }, 20 * 1000);
            $(".conplaying").on("click", function() {
                clearTimeout(timer);
                $("#loading-box").remove();
                EC.ad.play();
            });
            $(".conplay-jump,.play-jump").on("click", function() {
                clearTimeout(timer);
                EC.video.seek();
                $(".memory-play-wrap,#loading-box").remove();
                EC.ad.play();
            });
        }
    },
    "DanMu" :{
        "initial":function(){
            $(".dmlink").show();
            EC.ad.on('artplayerPluginDanmuku:loaded', (danmus) => {
                $("#link2-success").show();
            });
            EC.ad.on('artplayerPluginDanmuku:error', (error) => {
                $("#link2-error").show();
            });
            if (config.user_danmuon == 1 && config.group == "游客" || config.user_danmuon == 1 && config.group == "") {
                $('#dmtext').attr({
                    "disabled": true,
                    "placeholder": "登陆后才能发弹幕yo(・ω・)"
                });
            }
            $(document).on('click', ".player-comment-setting-icon", function() {
                if (EC.ad.plugins.artplayerPluginDanmuku.isHide) {
                    EC.ad.plugins.artplayerPluginDanmuku.show();
                    $(this).addClass("danmu-setting-show").removeClass("danmu-setting-hide")

                } else {
                    EC.ad.plugins.artplayerPluginDanmuku.hide();
                    $(this).addClass("danmu-setting-hide").removeClass("danmu-setting-show")
                }
            });
        },
        "add" :function(d){
            if (d.text < 1) {
                EC.Msg("要输入弹幕内容啊喂！",2000);
                return;
            }
            $.ajax({
                url: config.api+"?ac=dm",
                type: "post",
                dataType: "json",
                contentType: 'application/json',
                data:JSON.stringify({
                    "color":d.color,
                    "text":d.text,
                    "time":d.time,
                    "type":d.mode == 1?'top':'',
                    "player": config.id,
                    "author": "DIYgod"
                }),
                success: function (r) {
                    if(r['code'] != "23"){
                        EC.Msg(r['msg'],2000);
                    }
                },
                error:function (){
                    EC.Msg("弹幕入库失败",2000);
                }
            })
        },
        "wap":function(){
            $(".art-controls-right,.art-progress,.art-controls-left").hide();
            $(".art-controls-center").addClass("danmu-input-show");
            $(".danmu-hide").show();
            $(".danmu-hide").click(function(){
                $(".art-controls-center").removeClass("danmu-input-show");
                $(".art-controls-right,.art-progress,.art-controls-left").show();
            });
        }
    },
    'ecList':{
        "initial":function(){
            $(document).on('click', '#ec-tab-select', function() {
                $(".ec-list").toggle();
                $(".ec-list a").click(function(){
                    $(this).addClass("ec-this").siblings().removeClass("ec-this");
                    let index = $(".ec-list a").index(this);
                    let q = $(".scroll-area .ec-selset-list").eq(index);
                    q.addClass("ec-show").siblings().removeClass("ec-show");
                });
            });
            $(".vodlist-of").show();
            $(".ec-listbox").addClass("ec-stting");
            if($(".normal-title-wrap").length < 1){
                let element = $('.anthology-wrap');
                $.ajax({
                    url: config.api_url+"index.php/dp?id="+config.api_id+"&url="+config.api_vod_url+"&wd="+config.from+"&ids="+config.api_url,
                    type: "get",
                    dataType: "json",
                    beforeSend:function(){
                        let html = '<div class="normal-title-wrap"><div class="thesis-wrap"><a class="title-link beforeSend h-2"></a></div><div class="title-info beforeSend h-2"></div></div>' +
                            '<div class="scroll-area"><a class="component-title beforeSend"></a><div class="ec-show ec-selset-list anthology-content"><a class="box-item album-title beforeSend"></a>' +
                            '<a class="box-item album-title beforeSend"></a></div><a class="component-title beforeSend"></a><div class="anthology-content"><div class="pic-text-item"><a><div class="cover beforeSend"></div></a></div></div></div>';
                        element.html(html);
                    },
                    success: function (r) {
                        if(r['code']=='200'){
                            element.html(r["html"]);
                        }else{
                            element.html('<div class="pop-msg">查找内容失败...</div>');
                        }
                    },
                    error:function (){
                        element.html('<div class="pop-msg">请求失败...</div>');
                    }
                })
            }
            $(document).on('click', '.anthology-content a', function() {
                let jump_id = $(this).attr('data-vod');
                let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?id='+jump_id+'"></iframe>';
                $("body").append(jump_html);
            });
        }
    },
    "DmApi":{
        "off":function(){
            $(".player-comment-setting-icon").trigger("click");
        },
        "add":function(t,y,c){
            let type = y=="right"?0:1;
            let d = { text: t, mode:type, color: c, border: true,"time":EC.ad.currentTime};
            EC.ad.plugins.artplayerPluginDanmuku.emit(d);
            EC.DanMu.add(d)
        }
    },
};
$(function(){
    EC.start();
})