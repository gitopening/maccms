let EC = {
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
            EC.player.play(config.url);
        }
    },
    'MYad': {
        'vod': function(u, l) {
            EC.player.AdPlay(u,l);
        },
        'pic': function(l, t, p) {
            let bod = $(".CkPlayer");
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
                $('.ck-main').prepend(pause_ad_html);
            },
            'out': function() {
                $('#player_pause').remove();
            }
        }
    },
    'player': {
        'play': function(url) {
            if(config.subtitle_url.length > 2){
                EC.ad = new ckplayer(
                    {
                        container: '.CkPlayer',
                        plug:'hls.js',
                        video: url,
                        autoplay: true,
                        rightBar:true,
                        smallWindows:true,
                        smallWindowsDrag:true,
                        track:[
                            {
                                kind:'subtitles',
                                src:config.subtitle_url,
                                srclang:'zh',
                                label:'字幕',
                                default:true,
                            }
                        ],
                    }
                );
            }else{
                EC.ad = new ckplayer(
                    {
                        container: '.CkPlayer',
                        plug:'hls.js',
                        video: url,
                        autoplay: true,
                        rightBar:true,
                        smallWindows:true,
                        smallWindowsDrag:true,
                    }
                );
            }
            EC.load();
        },
        'AdPlay': function(url,l) {
            EC.ad = new ckplayer(
                {
                    container: '.CkPlayer',
                    plug:'hls.js',
                    video: url,
                    volume: 0,
                    autoplay: true,
                }
            );
            $(".ck-main").prepend('<div class="ad-tip"><div class="vod-gg"><a>广告</a><a href="' + l + '" target="_blank">查看详情</a></div></div>');
            $(".ck-bar-progress,.ck-bar-playbackrate-box").hide();
            EC.ad.ended(function(){
                EC.ad.remove();
                EC.player.play(config.url);
            });
        },
    },
    'load': function() {
        let html = '<div id="loading-box"><div class="loading"><div class="video-panel-blur-image"></div><p class="pic"></p></div>\n' +
            '<div type="button" id="close" ><div class="playlink"><span id="link1">播放器连接...</span><span id="link1-success">【完成】</span></div>\n' +
            '<span class="palycon" id="link3"><e id="link3_tip">等待视频连接中</e><e id="link3-error">【失败】</e></span></div></div>';
        $('.CkPlayer').prepend(html);
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
        EC.ad.loadedMetaData(function(obj){
            EC.loadedmetadataHandler();
        });
        let vide_init = $('.ck-main');
        if(config.logo.length > 2){
            vide_init.prepend('<div class="ec-logo"><img alt="logo" src="'+config.logo+'"></div>');
        }
        if(config.marquee.length  > 2){
            vide_init.prepend('<div class="marquee"><marquee class="ec-tyy">'+config.marquee+'</marquee></div>');
        }
        vide_init.prepend('<div class="vodlist-of danmu-hide"></div><div class="ec-listbox"><div class="anthology-wrap"></div></div></div>');
        $(document).on('click', '.vodlist-of', function() {
            $(".ec-listbox").removeClass("ec-stting");
            $(this).hide();
        });
        if (config.ads.pause.state == 'on') {
            EC.ad.play(function(){
                EC.MYad.pause.out();
            });
            EC.ad.pause(function(){
                EC.MYad.pause.play(config.ads.pause.link, config.ads.pause.img);
            });
        }
        EC.video.try();
        $(document).on('click', '.ck-bar-definition-box', function() {
            EC.ecList.initial();
        });
        EC.ad.ended(function(){
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
        $('.ck-main').prepend('<div class="pop-msg"><div class="pop-content"></div></div>');
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
        EC.ad.time(function(t){
            EC.timeupdateHandler(t);
        });
    },
    'timeupdateHandler': function(t) {
        EC.setCookie("time_" + config.url, t, 24);
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
                    var s = EC.ad.time();
                    if (s > t && config.trysee>0) {
                        EC.ad.seek(0);
                        EC.ad.pause();
                        $('.ck-main').prepend('<div class="pop-shade"></div><div class="pop-msg"><div class="pop-content">试看已结束，如需继续观看请升级用户组</div></div>');
                    }
                }, 1000);
            }
        },
        'seek': function() {
            EC.ad.seek(EC.playtime);
        },
        'end': function() {
            EC.Msg("播放结束啦=。=",2000);
        },
        'con_play': function() {
            $("#link3").html(` <e>已播放至${EC.ctime}，继续上次播放？</e><d class="conplay-jump">是 <i id="num">${config.waittime}</i>s</d><d class="conplaying">否</d>`);
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
            $(".ck-main").append(`<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${EC.ctime}</span><span class="play-jump">跳转播放</span></div></div>`);
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
    }
};
$(function(){
    EC.start();
})