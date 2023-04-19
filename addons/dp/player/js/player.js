! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define
		.amd ? define("yzmplayer", [], t) : "object" == typeof exports ? exports.yzmplayer = t() : e.yzmplayer = t()
}("undefined" != typeof self ? self : this, function() {
	return function(e) {
		function t(i) {
			if (n[i]) return n[i].exports;
			var a = n[i] = {
				i: i,
				l: !1,
				exports: {}
			};
			return e[i].call(a.exports, a, a.exports, t), a.l = !0, a.exports
		}
		var n = {};
		return t.m = e, t.c = n, t.d = function(e, n, i) {
			t.o(e, n) || Object.defineProperty(e, n, {
				configurable: !1,
				enumerable: !0,
				get: i
			})
		}, t.n = function(e) {
			var n = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return t.d(n, "a", n), n
		}, t.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, t.p = "/", t(t.s = 5)
	}([
		function(e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var i = /mobile/i.test(window.navigator.userAgent),
				a = {
					secondToTime: function(e) {
						var t = function(e) {
								return e < 10 ? "0" + e : "" + e
							},
							n = Math.floor(e / 3600),
							i = Math.floor((e - 3600 * n) / 60),
							a = Math.floor(e - 3600 * n - 60 * i);
						return (n > 0 ? [n, i, a] : [i, a]).map(t).join(":")
					},
					getElementViewLeft: function(e) {
						var t = e.offsetLeft,
							n = e.offsetParent,
							i = document.body.scrollLeft + document.documentElement.scrollLeft;
						if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)
							for (; null !== n && n !== e;) t += n.offsetLeft, n = n.offsetParent;
						else
							for (; null !== n;) t += n.offsetLeft, n = n.offsetParent;
						return t - i
					},
					getScrollPosition: function() {
						return {
							left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
							top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
						}
					},
					setScrollPosition: function(e) {
						var t = e.left,
							n = void 0 === t ? 0 : t,
							i = e.top,
							a = void 0 === i ? 0 : i;
						this.isFirefox ? (document.documentElement.scrollLeft = n, document.documentElement.scrollTop = a) : window.scrollTo(
							n, a)
					},
					isMobile: i,
					isFirefox: /firefox/i.test(window.navigator.userAgent),
					isChrome: /chrome/i.test(window.navigator.userAgent),
					storage: {
						set: function(e, t) {
							localStorage.setItem(e, t)
						},
						get: function(e) {
							return localStorage.getItem(e)
						}
					},
					cumulativeOffset: function(e) {
						var t = 0,
							n = 0;
						do {
							t += e.offsetTop || 0, n += e.offsetLeft || 0, e = e.offsetParent
						} while (e);
						return {
							top: t,
							left: n
						}
					},
					nameMap: {
						dragStart: i ? "touchstart" : "mousedown",
						dragMove: i ? "touchmove" : "mousemove",
						dragEnd: i ? "touchend" : "mouseup"
					}
				};
			t.default = a
		},
		function(e, t, n) {
			"use strict";
			var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
					typeof e
			};
			i = function() {
				return this
			}();
			try {
				i = i || Function("return this")() || (0, eval)("this")
			} catch (e) {
				"object" === ("undefined" == typeof window ? "undefined" : a(window)) && (i = window)
			}
			e.exports = i
		},
		function(e, t, n) {
			"use strict";

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = n(16),
				o = i(a),
				s = n(17),
				r = i(s),
				l = n(18),
				c = i(l),
				u = n(19),
				d = i(u),
				p = n(20),
				h = i(p),
				y = n(21),
				m = i(y),
				f = n(22),
				v = i(f),
				g = n(23),
				b = i(g),
				k = n(24),
				w = i(k),
				x = n(25),
				S = i(x),
				T = n(26),
				L = i(T),
				M = n(27),
				_ = i(M),
				q = n(28),
				E = i(q),
				B = n(29),
				P = i(B),
				C = n(30),
				O = i(C),
				z = n(31),
				F = i(z),
				I = {
					play: o.default,
					pause: r.default,
					volumeUp: c.default,
					volumeDown: d.default,
					volumeOff: h.default,
					full: m.default,
					fullWeb: v.default,
					setting: b.default,
					right: w.default,
					comment: S.default,
					commentOff: L.default,
					send: _.default,
					pallette: E.default,
					camera: P.default,
					subtitle: O.default,
					loading: F.default
				};
			t.default = I
		},
		function(e, t, n) {
			"use strict";
			e.exports = n(33)
		},
		function(e, t, n) {
			var i = n(3);
			e.exports = function(e) {
				"use strict";
				e = e || {};
				var t = "",
					n = e.enableSubtitle,
					a = e.subtitle,
					o = e.current,
					s = e.pic,
					r = i.$escape,
					l = e.screenshot,
					c = e.preload,
					u = e.url,
					n = a && "webvtt" === a.type;
				return t += '\n<video\n    class="yzmplayer-video ', o && (t += "yzmplayer-video-current"), t +=
					'"\n    webkit-playsinline\n    playsinline\n    ', s && (t += 'poster="', t += r(s), t += '"'), t += "\n    ",
				(l || n) && (t += 'crossorigin="anonymous"'), t += "\n    ", c && (t += 'preload="', t += r(c), t += '"'), t +=
					"\n    ", u && (t += 'src="', t += r(u), t += '"'), t += "\n    >\n    ", n && (t +=
					'\n    <track kind="metadata" default src="', t += r(a.url), t += '"></track>\n    '), t += "\n</video>"
			}
		},
		function(e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			}), n(6);
			var i = n(7),
				a = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(i);

			console.log('%c页面加载完毕消耗了' + Math.round(performance.now() * 100) / 100 + 'ms',
				'background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
			t.default = a.default
		},
		function(e, t) {},
		function(e, t, n) {
			"use strict";

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function a(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var o = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				s = n(8),
				r = i(s),
				l = n(0),
				c = i(l),
				u = n(12),
				d = i(u),
				p = n(14),
				h = i(p),
				y = n(15),
				m = i(y),
				f = n(2),
				v = i(f),
				g = n(35),
				b = i(g),
				k = n(36),
				w = i(k),
				x = n(37),
				S = i(x),
				T = n(38),
				L = i(T),
				M = n(39),
				_ = i(M),
				q = n(40),
				E = i(q),
				B = n(41),
				P = i(B),
				C = n(42),
				O = i(C),
				z = n(43),
				F = i(z),
				I = n(45),
				j = i(I),
				D = n(46),
				W = i(D),
				H = n(47),
				A = i(H),
				V = n(48),
				R = i(V),
				X = n(49),
				N = i(X),
				U = n(4),
				$ = i(U),
				Q = 0,
				J = [],
				Y = function() {
					function e(t) {
						var n = this;
						a(this, e), this.options = (0, d.default)(t), this.options.video.quality && (this.qualityIndex = this.options.video
							.defaultQuality, this.quality = this.options.video.quality[this.options.video.defaultQuality]), this.tran =
							new h.default(this.options.lang).tran, this.events = new w.default, this.user = new L.default(this), this.container =
							this.options.container, this.container.classList.add("yzmplayer"), this.options.danmaku || this.container.classList
							.add("yzmplayer-no-danmaku"), this.options.live && this.container.classList.add("yzmplayer-live"), c.default.isMobile &&
						this.container.classList.add("yzmplayer-mobile"), this.arrow = this.container.offsetWidth <= 500, this.arrow &&
						this.container.classList.add("yzmplayer-arrow"), this.template = new m.default({
							container: this.container,
							options: this.options,
							index: Q,
							tran: this.tran
						}), this.video = this.template.video, this.bar = new E.default(this.template), this.bezel = new O.default(
							this.template.bezel), this.fullScreen = new S.default(this), this.controller = new F.default(this), this.options
							.danmaku && (this.danmaku = new b.default({
							container: this.template.danmaku,
							opacity: this.user.get("opacity"),
							callback: function() {
								setTimeout(function() {
									n.template.danmakuLoading.style.display = "none", setTimeout(function() {
										if(document.getElementById('link2-success')){
											document.getElementById('link2-success').style.display = "block"
										}
									}, 1 * 1500), n.options.autoplay && n.play()
								}, 0)
							},
							error: function(e) {
								document.getElementById('link2-success').remove(), setTimeout(function() {
									document.getElementById('link2-error').style.display = "block"
								}, 1 * 1000), n.notice(e)
							},
							apiBackend: this.options.apiBackend,
							borderColor: this.options.theme,
							height: this.arrow ? 24 : 30,
							time: function() {
								return n.video.currentTime
							},
							unlimited: this.user.get("unlimited"),
							api: {
								id: this.options.danmaku.id,
								address: this.options.danmaku.api,
								token: this.options.danmaku.token,
								maximum: this.options.danmaku.maximum,
								addition: this.options.danmaku.addition,
								user: this.options.danmaku.user
							},
							events: this.events
						}), this.comment = new W.default(this)), this.setting = new j.default(this), document.addEventListener(
							"click",
							function() {
								n.focus = !1
							}, !0), this.container.addEventListener("click", function() {
							n.focus = !0
						}, !0), this.paused = !0, this.time = new P.default(this), this.hotkey = new A.default(this), this.contextmenu =
							new R.default(this), this.initVideo(this.video, this.quality && this.quality.type || this.options.video.type),
							this.infoPanel = new N.default(this), !this.danmaku && this.options.autoplay && this.play(), Q++, J.push(this)
					}
					return o(e, [{
						key: "seek",//跳转到特定时间
						value: function(e) {
							e = Math.max(e, 0), this.video.duration && (e = Math.min(e, this.video.duration)), this.video.currentTime <
							e ? this.notice(this.tran("FF") + " " + (e - this.video.currentTime).toFixed(0) + " " + this.tran("s")) :
								this.video.currentTime > e && this.notice(this.tran("REW") + " " + (this.video.currentTime - e).toFixed(
								0) + " " + this.tran("s")), this.video.currentTime = e, this.danmaku && this.danmaku.seek(), this.bar.set(
								"played", e / this.video.duration, "width")
						}
					}, {
						key: "play",
						value: function() {
							var e = this;
							if (this.paused = !1, this.video.paused && this.bezel.switch(v.default.play), this.template.playButton.innerHTML =
								v.default.pause, r.default.resolve(this.video.play()).catch(function() {
								e.pause()
							}).then(function() {}), this.time.enable("loading"), this.time.enable("progress"), this.container.classList
								.remove("yzmplayer-paused"), this.container.classList.add("yzmplayer-playing"), this.danmaku && this.danmaku
								.play(), this.options.mutex)
								for (var t = 0; t < J.length; t++) this !== J[t] && J[t].pause()
						}
					}, {
						key: "pause",
						value: function() {
							this.paused = !0, this.container.classList.remove("yzmplayer-loading"), this.video.paused || this.bezel.switch(
								v.default.pause), this.ended = !1, this.template.playButton.innerHTML = v.default.play, this.video.pause(),
								this.time.disable("loading"), this.time.disable("progress"), this.container.classList.remove(
								"yzmplayer-playing"), this.container.classList.add("yzmplayer-paused"), this.danmaku && this.danmaku.pause()
						}
					}, {
						key: "switchVolumeIcon",
						value: function() {
							this.volume() >= .95 ? this.template.volumeIcon.innerHTML = v.default.volumeUp : this.volume() > 0 ? this
								.template.volumeIcon.innerHTML = v.default.volumeDown : this.template.volumeIcon.innerHTML = v.default.volumeOff
						}
					}, {
						key: "volume",
						value: function(e, t, n) {
							if (e = parseFloat(e), !isNaN(e)) {
								e = Math.max(e, 0), e = Math.min(e, 1), this.bar.set("volume", e, "width");
								var i = (100 * e).toFixed(0) + "%";
								this.template.volumeBarWrapWrap.dataset.balloon = i, t || this.user.set("volume", e), n || this.notice(
									this.tran("Volume") + " " + (100 * e).toFixed(0) + "%"), this.video.volume = e, this.video.muted && (
									this.video.muted = !1), this.switchVolumeIcon()
							}
							return this.video.volume
						}
					}, {
						key: "toggle",//切换播放和暂停
						value: function() {
							this.video.paused ? this.play() : this.pause()
						}
					}, {
						key: "on",//绑定视频和播放器事件
						value: function(e, t) {
							this.events.on(e, t)
						}
					}, {
						key: "switchVideo",//切换到其他视频
						value: function(e, t) {
							this.pause(), this.video.poster = e.pic ? e.pic : "", this.video.src = e.url, this.initMSE(this.video, e.type ||
								"auto"), t && (this.template.danmakuLoading.style.display = "block", this.bar.set("played", 0, "width"),
								this.bar.set("loaded", 0, "width"), this.template.ptime.innerHTML = "00:00", this.template.danmaku.innerHTML =
								"", this.danmaku && this.danmaku.reload({
								id: t.id,
								address: t.api,
								token: t.token,
								maximum: t.maximum,
								addition: t.addition,
								user: t.user
							}))
						}
					}, {
						key: "initMSE",
						value: function(e, t) {
							var n = this;
							if (this.type = t, this.options.video.customType && this.options.video.customType[t]) "[object Function]" ===
							Object.prototype.toString.call(this.options.video.customType[t]) ? this.options.video.customType[t](this
								.video, this) : console.error("Illegal customType: " + t);
							else switch ("auto" === this.type && (/m3u8(#|\?|$)/i.exec(e.src) ? this.type = "hls" : /.flv(#|\?|$)/i.exec(
								e.src) ? this.type = "flv" : /.mpd(#|\?|$)/i.exec(e.src) ? this.type = "dash" : this.type = "normal"),
								this.type) {
								case "hls":
									if (Hls)
										if (Hls.isSupported()) {
											var i = new Hls;
											i.loadSource(e.src), i.attachMedia(e)
										} else this.notice("Error: Hls is not supported.");
									else this.notice("Error: Can't find Hls.");
									break;
								case "flv":
									if (flvjs && flvjs.isSupported())
										if (flvjs.isSupported()) {
											var a = flvjs.createPlayer({
												type: "flv",
												url: e.src
											});
											a.attachMediaElement(e), a.load()
										} else this.notice("Error: flvjs is not supported.");
									else this.notice("Error: Can't find flvjs.");
									break;
								case "dash":
									dashjs ? dashjs.MediaPlayer().create().initialize(e, e.src, !1) : this.notice(
										"Error: Can't find dashjs.");
									break;
								case "webtorrent":
									if (WebTorrent)
										if (WebTorrent.WEBRTC_SUPPORT) {
											this.container.classList.add("yzmplayer-loading");
											var o = new WebTorrent,
												s = e.src;
											o.add(s, function(e) {
												e.files.find(function(e) {
													return e.name.endsWith(".mp4")
												}).renderTo(n.video, {
													autoplay: n.options.autoplay
												}, function() {
													n.container.classList.remove("yzmplayer-loading")
												})
											})
										} else this.notice("Error: Webtorrent is not supported.");
									else this.notice("Error: Can't find Webtorrent.")
							}
						}
					}, {
						key: "initVideo",//初始化视频
						value: function(e, t) {
							var n = this;
							this.initMSE(e, t), this.on("durationchange", function() {
								1 !== e.duration && (n.template.dtime.innerHTML = c.default.secondToTime(e.duration))
							}), this.on("progress", function() {
								var t = e.buffered.length ? e.buffered.end(e.buffered.length - 1) / e.duration : 0;
								n.bar.set("loaded", t, "width")
							}), this.on("error", function() {
								setTimeout(function() {
									document.getElementById('link3-error').style.display = "block"
								}, 5 * 1000), n.tran && n.notice && (n.type, n.notice(n.tran("This video fails to load"), -1))
							}), this.ended = !1, this.on("ended", function() {
								n.bar.set("played", 1, "width"), n.setting.loop ? (n.seek(0), e.play()) : (n.ended = !0, n.pause()), n
									.danmaku && (n.danmaku.danIndex = 0)
							}), this.on("play", function() {
								n.paused && n.play()
							}), this.on("pause", function() {
								n.paused || n.pause()
							});
							for (var i = 0; i < this.events.videoEvents.length; i++) ! function(t) {
								e.addEventListener(n.events.videoEvents[t], function() {
									n.events.trigger(n.events.videoEvents[t])
								})
							}(i);
							this.volume(this.user.get("volume"), !0, !0),
							this.options.subtitle && (this.subtitle = new _.default(this.template.subtitle, this.video, this.options.subtitle, this.events),
							this.user.get("subtitle") || this.subtitle.hide())
						}
					}, {
						key: "switchQuality",//切换清晰度
						value: function(e) {
							var t = this;
							if (this.qualityIndex !== e && !this.switchingQuality) {
								this.qualityIndex = e, this.switchingQuality = !0, this.quality = this.options.video.quality[e], this.template
									.qualityButton.innerHTML = this.quality.name;
								var n = this.video.paused;
								this.video.pause();
								var i = (0, $.default)({
										current: !1,
										pic: null,
										screenshot: this.options.screenshot,
										preload: "auto",
										url: this.quality.url,
										subtitle: this.options.subtitle
									}),
									a = (new DOMParser).parseFromString(i, "text/html").body.firstChild;
								this.template.videoWrap.insertBefore(a, this.template.videoWrap.getElementsByTagName("div")[0]), this.prevVideo =
									this.video, this.video = a, this.initVideo(this.video, this.quality.type || this.options.video.type),
									this.seek(this.prevVideo.currentTime), this.notice(this.tran("Switching to") + " " + this.quality.name +
									" " + this.tran("quality"), -1), this.events.trigger("quality_start", this.quality), this.on("canplay",
									function() {
										if (t.prevVideo) {
											if (t.video.currentTime !== t.prevVideo.currentTime) return void t.seek(t.prevVideo.currentTime);
											t.template.videoWrap.removeChild(t.prevVideo), t.video.classList.add("yzmplayer-video-current"), n ||
											t.video.play(), t.prevVideo = null, t.notice(t.tran("Switched to") + " " + t.quality.name + " " + t
												.tran("quality")), t.switchingQuality = !1, t.events.trigger("quality_end")
										}
									})
							}
						}
					}, {
						key: "notice",//显示通知
						value: function(e) {
							var t = this,
								n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2e3,
								i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : .8;
							this.template.notice.innerHTML = e, this.template.notice.style.opacity = i, this.noticeTime &&
							clearTimeout(this.noticeTime), this.events.trigger("notice_show", e), this.noticeTime = setTimeout(
								function() {
									t.template.notice.style.opacity = 0, t.events.trigger("notice_hide")
								}, n)
						}
					}, {
						key: "resize",//调整大小
						value: function() {
							this.danmaku && this.danmaku.resize(), this.events.trigger("resize")
						}
					}, {
						key: "speed",//设置视频速度
						value: function(e) {
							this.video.playbackRate = e
						}
					}, {
						key: "destroy",//摧毁播放器
						value: function() {
							J.splice(J.indexOf(this), 1), this.pause(), this.controller.destroy(), this.time.destroy(), this.video.src =
								"", this.container.innerHTML = "", this.events.trigger("destroy");
							for (var e in this) this.hasOwnProperty(e) && "paused" !== e && delete this[e]
						}
					}]), e
				}();
			t.default = Y
		},
		function(e, t, n) {
			"use strict";
			(function(t) {
				function n() {}

				function i(e, t) {
					return function() {
						e.apply(t, arguments)
					}
				}

				function a(e) {
					if (!(this instanceof a)) throw new TypeError("Promises must be constructed via new");
					if ("function" != typeof e) throw new TypeError("not a function");
					this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], u(e, this)
				}

				function o(e, t) {
					for (; 3 === e._state;) e = e._value;
					if (0 === e._state) return void e._deferreds.push(t);
					e._handled = !0, a._immediateFn(function() {
						var n = 1 === e._state ? t.onFulfilled : t.onRejected;
						if (null === n) return void(1 === e._state ? s : r)(t.promise, e._value);
						var i;
						try {
							i = n(e._value)
						} catch (e) {
							return void r(t.promise, e)
						}
						s(t.promise, i)
					})
				}

				function s(e, t) {
					try {
						if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
						if (t && ("object" === (void 0 === t ? "undefined" : d(t)) || "function" == typeof t)) {
							var n = t.then;
							if (t instanceof a) return e._state = 3, e._value = t, void l(e);
							if ("function" == typeof n) return void u(i(n, t), e)
						}
						e._state = 1, e._value = t, l(e)
					} catch (t) {
						r(e, t)
					}
				}

				function r(e, t) {
					e._state = 2, e._value = t, l(e)
				}

				function l(e) {
					2 === e._state && 0 === e._deferreds.length && a._immediateFn(function() {
						e._handled || a._unhandledRejectionFn(e._value)
					});
					for (var t = 0, n = e._deferreds.length; t < n; t++) o(e, e._deferreds[t]);
					e._deferreds = null
				}

				function c(e, t, n) {
					this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null,
						this.promise = n
				}

				function u(e, t) {
					var n = !1;
					try {
						e(function(e) {
							n || (n = !0, s(t, e))
						}, function(e) {
							n || (n = !0, r(t, e))
						})
					} catch (e) {
						if (n) return;
						n = !0, r(t, e)
					}
				}
				var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
						return typeof e
					} : function(e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
							typeof e
					},
					p = setTimeout;
				a.prototype.catch = function(e) {
					return this.then(null, e)
				}, a.prototype.then = function(e, t) {
					var i = new this.constructor(n);
					return o(this, new c(e, t, i)), i
				}, a.all = function(e) {
					return new a(function(t, n) {
						function i(e, s) {
							try {
								if (s && ("object" === (void 0 === s ? "undefined" : d(s)) || "function" == typeof s)) {
									var r = s.then;
									if ("function" == typeof r) return void r.call(s, function(t) {
										i(e, t)
									}, n)
								}
								a[e] = s, 0 == --o && t(a)
							} catch (e) {
								n(e)
							}
						}
						if (!e || void 0 === e.length) throw new TypeError("Promise.all accepts an array");
						var a = Array.prototype.slice.call(e);
						if (0 === a.length) return t([]);
						for (var o = a.length, s = 0; s < a.length; s++) i(s, a[s])
					})
				}, a.resolve = function(e) {
					return e && "object" === (void 0 === e ? "undefined" : d(e)) && e.constructor === a ? e : new a(function(t) {
						t(e)
					})
				}, a.reject = function(e) {
					return new a(function(t, n) {
						n(e)
					})
				}, a.race = function(e) {
					return new a(function(t, n) {
						for (var i = 0, a = e.length; i < a; i++) e[i].then(t, n)
					})
				}, a._immediateFn = "function" == typeof t && function(e) {
					t(e)
				} || function(e) {
					p(e, 0)
				}, a._unhandledRejectionFn = function(e) {
					"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
				}, e.exports = a
			}).call(t, n(9).setImmediate)
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				this._id = e, this._clearFn = t
			}
			var a = Function.prototype.apply;
			t.setTimeout = function() {
				return new i(a.call(setTimeout, window, arguments), clearTimeout)
			}, t.setInterval = function() {
				return new i(a.call(setInterval, window, arguments), clearInterval)
			}, t.clearTimeout = t.clearInterval = function(e) {
				e && e.close()
			}, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
				this._clearFn.call(window, this._id)
			}, t.enroll = function(e, t) {
				clearTimeout(e._idleTimeoutId), e._idleTimeout = t
			}, t.unenroll = function(e) {
				clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
			}, t._unrefActive = t.active = function(e) {
				clearTimeout(e._idleTimeoutId);
				var t = e._idleTimeout;
				t >= 0 && (e._idleTimeoutId = setTimeout(function() {
					e._onTimeout && e._onTimeout()
				}, t))
			}, n(10), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate
		},
		function(e, t, n) {
			"use strict";
			(function(e, t) {
				! function(e, n) {
					function i(e) {
						"function" != typeof e && (e = new Function("" + e));
						for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
						var i = {
							callback: e,
							args: t
						};
						return c[l] = i, r(l), l++
					}

					function a(e) {
						delete c[e]
					}

					function o(e) {
						var t = e.callback,
							i = e.args;
						switch (i.length) {
							case 0:
								t();
								break;
							case 1:
								t(i[0]);
								break;
							case 2:
								t(i[0], i[1]);
								break;
							case 3:
								t(i[0], i[1], i[2]);
								break;
							default:
								t.apply(n, i)
						}
					}

					function s(e) {
						if (u) setTimeout(s, 0, e);
						else {
							var t = c[e];
							if (t) {
								u = !0;
								try {
									o(t)
								} finally {
									a(e), u = !1
								}
							}
						}
					}
					if (!e.setImmediate) {
						var r, l = 1,
							c = {},
							u = !1,
							d = e.document,
							p = Object.getPrototypeOf && Object.getPrototypeOf(e);
						p = p && p.setTimeout ? p : e, "[object process]" === {}.toString.call(e.process) ? function() {
							r = function(e) {
								t.nextTick(function() {
									s(e)
								})
							}
						}() : function() {
							if (e.postMessage && !e.importScripts) {
								var t = !0,
									n = e.onmessage;
								return e.onmessage = function() {
									t = !1
								}, e.postMessage("", "*"), e.onmessage = n, t
							}
						}() ? function() {
							var t = "setImmediate$" + Math.random() + "$",
								n = function(n) {
									n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && s(+n.data.slice(t.length))
								};
							e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n), r = function(n) {
								e.postMessage(t + n, "*")
							}
						}() : e.MessageChannel ? function() {
							var e = new MessageChannel;
							e.port1.onmessage = function(e) {
								s(e.data)
							}, r = function(t) {
								e.port2.postMessage(t)
							}
						}() : d && "onreadystatechange" in d.createElement("script") ? function() {
							var e = d.documentElement;
							r = function(t) {
								var n = d.createElement("script");
								n.onreadystatechange = function() {
									s(t), n.onreadystatechange = null, e.removeChild(n), n = null
								}, e.appendChild(n)
							}
						}() : function() {
							r = function(e) {
								setTimeout(s, 0, e)
							}
						}(), p.setImmediate = i, p.clearImmediate = a
					}
				}("undefined" == typeof self ? void 0 === e ? void 0 : e : self)
			}).call(t, n(1), n(11))
		},
		function(e, t, n) {
			"use strict";

			function i() {
				throw new Error("setTimeout has not been defined")
			}

			function a() {
				throw new Error("clearTimeout has not been defined")
			}

			function o(e) {
				if (d === setTimeout) return setTimeout(e, 0);
				if ((d === i || !d) && setTimeout) return d = setTimeout, setTimeout(e, 0);
				try {
					return d(e, 0)
				} catch (t) {
					try {
						return d.call(null, e, 0)
					} catch (t) {
						return d.call(this, e, 0)
					}
				}
			}

			function s(e) {
				if (p === clearTimeout) return clearTimeout(e);
				if ((p === a || !p) && clearTimeout) return p = clearTimeout, clearTimeout(e);
				try {
					return p(e)
				} catch (t) {
					try {
						return p.call(null, e)
					} catch (t) {
						return p.call(this, e)
					}
				}
			}

			function r() {
				f && y && (f = !1, y.length ? m = y.concat(m) : v = -1, m.length && l())
			}

			function l() {
				if (!f) {
					var e = o(r);
					f = !0;
					for (var t = m.length; t;) {
						for (y = m, m = []; ++v < t;) y && y[v].run();
						v = -1, t = m.length
					}
					y = null, f = !1, s(e)
				}
			}

			function c(e, t) {
				this.fun = e, this.array = t
			}

			function u() {}
			var d, p, h = e.exports = {};
			! function() {
				try {
					d = "function" == typeof setTimeout ? setTimeout : i
				} catch (e) {
					d = i
				}
				try {
					p = "function" == typeof clearTimeout ? clearTimeout : a
				} catch (e) {
					p = a
				}
			}();
			var y, m = [],
				f = !1,
				v = -1;
			h.nextTick = function(e) {
				var t = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				m.push(new c(e, t)), 1 !== m.length || f || o(l)
			}, c.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = u, h.addListener =
				u, h.once = u, h.off = u, h.removeListener = u, h.removeAllListeners = u, h.emit = u, h.prependListener = u, h.prependOnceListener =
				u, h.listeners = function(e) {
				return []
			}, h.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, h.cwd = function() {
				return "/"
			}, h.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, h.umask = function() {
				return 0
			}
		},
		function(e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
						typeof e
				},
				a = n(13),
				o = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(a);
			t.default = function(e) {
				var t = {
					container: e.element || document.getElementsByClassName("yzmplayer")[0],
					live: !1,
					autoplay: !1,
					theme: "#b7daff",
					loop: !1,
					lang: (navigator.language || navigator.browserLanguage).toLowerCase(),
					screenshot: !1,
					hotkey: !0,
					preload: "auto",
					volume: .7,
					apiBackend: o.default,
					video: {},
					contextmenu: [],
					mutex: !0
				};
				for (var n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
				return e.video && !e.video.type && (e.video.type = "auto"), "object" === i(e.danmaku) && e.danmaku && !e.danmaku
					.user && (e.danmaku.user = "DIYgod"), e.subtitle && (!e.subtitle.type && (e.subtitle.type = "webvtt"), !e.subtitle
					.fontSize && (e.subtitle.fontSize = "20px"), !e.subtitle.bottom && (e.subtitle.bottom = "40px"), !e.subtitle.color &&
				(e.subtitle.color = "#fff")), e.video.quality && (e.video.url = [e.video.quality[e.video.defaultQuality].url]),
				e.lang && (e.lang = e.lang.toLowerCase()), e.contextmenu = e.contextmenu.concat([{
					text: "Video info",
					click: function(e) {
						e.infoPanel.triggle()
					}
				}]), e
			}
		},
		function(e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var i = function(e, t, n, i, a) {
				var o = new XMLHttpRequest;
				o.onreadystatechange = function() {
					if (4 === o.readyState) {
						if (o.status >= 200 && o.status < 300 || 304 === o.status) {
							var e = JSON.parse(o.responseText);
							return 23 !== e.code ? i(o, e) : n(o, e)
						}
						a(o)
					}
				}, o.open(null !== t ? "POST" : "GET", e, !0), o.send(null !== t ? JSON.stringify(t) : null)
			};
			t.default = {
				send: function(e, t, n) {
					i(e, t, function(e, t) {
						console.log("发送弹幕成功"), n && n()
					}, function(e, t) {
						EC.Msg(t.msg,2000);
					}, function(e) {
						console.log("Request was unsuccessful: " + e.status)
					})
				},
				read: function(e, t) {
					i(e, null, function(e, n) {
						t(null, n.danmuku)
					}, function(e, n) {
						t({
							status: e.status,
							response: n
						})
					}, function(e) {
						t({
							status: e.status,
							response: null
						})
					})
				}
			}
		},
		function(e, t, n) {
			"use strict";

			function i(e) {
				var t = this;
				this.lang = e, this.tran = function(e) {
					return a[t.lang] && a[t.lang][e] ? a[t.lang][e] : e
				}
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = {
				"zh-cn": {
					"Danmaku is loading": "弹幕加载中",
					Top: "顶部",
					Bottom: "底部",
					Rolling: "滚动",
					Loop: "洗脑循环",
					Speed: "倍速",
					"Opacity for danmaku": "弹幕透明度",
					Normal: "正常",
					"Please input danmaku content!": "要输入弹幕内容啊喂！",
					"Set danmaku color": "弹幕颜色",
					"Set danmaku type": "弹幕模式",
					"Show danmaku": "显示弹幕",
					"This video fails to load": "视频加载失败",
					"Switching to": "正在切换至",
					"Switched to": "已经切换至",
					quality: "画质",
					FF: "快进",
					REW: "快退",
					"Unlimited danmaku": "海量弹幕",
					"Send danmaku": "发送弹幕",
					Setting: "设置",
					"Full screen": "全屏",
					"Web full screen": "画中画",
					Send: "发送",
					Screenshot: "截图",
					s: "秒",
					"Show subtitle": "显示字幕",
					"Hide subtitle": "隐藏字幕",
					Volume: "音量",
					Live: "直播",
					"Video info": "视频统计信息"
				}
			};
			t.default = i
		},
		function(e, t, n) {
			"use strict";

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function a(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var o = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				s = n(2),
				r = i(s),
				l = n(32),
				c = i(l),
				u = function() {
					function e(t) {
						a(this, e), this.container = t.container, this.options = t.options, this.index = t.index, this.tran = t.tran,
							this.init()
					}
					return o(e, [{
						key: "init",
						value: function() {
							this.container.innerHTML = (0, c.default)({
								options: this.options,
								index: this.index,
								tran: this.tran,
								icons: r.default,
								video: {
									current: !0,
									pic: this.options.video.pic,
									screenshot: this.options.screenshot,
									preload: this.options.preload,
									url: this.options.video.url,
									subtitle: this.options.subtitle
								}
							}), this.volumeBar = this.container.querySelector(".yzmplayer-volume-bar-inner"), this.volumeBarWrap =
								this.container.querySelector(".yzmplayer-volume-bar"), this.volumeBarWrapWrap = this.container.querySelector(
								".yzmplayer-volume-bar-wrap"), this.volumeButton = this.container.querySelector(".yzmplayer-volume"),
								this.volumeIcon = this.container.querySelector(".yzmplayer-volume-icon .yzmplayer-icon-content"), this.playedBar =
								this.container.querySelector(".yzmplayer-played"), this.loadedBar = this.container.querySelector(
								".yzmplayer-loaded"), this.playedBarWrap = this.container.querySelector(".yzmplayer-bar-wrap"), this.playedBarTime =
								this.container.querySelector(".yzmplayer-bar-time"), this.danmaku = this.container.querySelector(
								".yzmplayer-danmaku"), this.danmakuLoading = this.container.querySelector(".yzmplayer-danloading"),
								this.video = this.container.querySelector(".yzmplayer-video-current"), this.bezel = this.container.querySelector(
								".yzmplayer-bezel-icon"), this.playButton = this.container.querySelector(".yzmplayer-play-icon"), this.videoWrap =
								this.container.querySelector(".yzmplayer-video-wrap"), this.controllerMask = this.container.querySelector(
								".yzmplayer-controller-mask"), this.ptime = this.container.querySelector(".yzmplayer-ptime"), this.settingButton =
								this.container.querySelector(".yzmplayer-setting-icon"), this.settingBox = this.container.querySelector(
								".yzmplayer-setting-box"), this.mask = this.container.querySelector(".yzmplayer-mask"), this.loop =
								this.container.querySelector(".yzmplayer-setting-loop"), this.loopToggle = this.container.querySelector(
								".yzmplayer-setting-loop .yzmplayer-toggle-setting-input"),this.showDanmaku = this.container.querySelector(".showdan-setting"),
								this.showDanmakuToggle = this.container.querySelector(
									".player-showdan-setting-input"), this.unlimitDanmaku = this.container.querySelector(
								".yzmplayer-setting-danunlimit"), this.unlimitDanmakuToggle = this.container.querySelector(
								".yzmplayer-danunlimit-setting-input"), this.speed = this.container.querySelector(
								".yzmplayer-setting-speed"), this.speedItem = this.container.querySelectorAll(
								".yzmplayer-setting-speed-item"), this.danmakuOpacityBar = this.container.querySelector(
								".yzmplayer-danmaku-bar-inner"), this.danmakuOpacityBarWrap = this.container.querySelector(
								".yzmplayer-danmaku-bar"), this.danmakuOpacityBarWrapWrap = this.container.querySelector(
								".yzmplayer-danmaku-bar-wrap"), this.danmakuOpacityBox = this.container.querySelector(
								".yzmplayer-setting-danmaku"), this.dtime = this.container.querySelector(".yzmplayer-dtime"), this.controller =
								this.container.querySelector(".yzmplayer-controller"), this.commentInput = this.container.querySelector(
								".yzmplayer-comment-input"), this.commentButton = this.container.querySelector(
								".yzmplayer-comment-icon"),this.commentSettingBox = this.container.querySelector(
								".yzmplayer-comment-setting-box"), this.commentSettingButton = this.container.querySelector(
								".player-comment-setting-icon"), this.commentColorSettingBox = this.container.querySelector(
								".yzmplayer-comment-setting-color"), this.browserFullButton = this.container.querySelector(
								".yzmplayer-full-icon"), this.webFullButton = this.container.querySelector(".yzmplayer-full-in-icon"),
								this.menu = this.container.querySelector(".yzmplayer-menu"), this.menuItem = this.container.querySelectorAll(
								".yzmplayer-menu-item"), this.qualityList = this.container.querySelector(".yzmplayer-quality-list"),
								this.camareButton = this.container.querySelector(".yzmplayer-camera-icon"), this.subtitleButton = this.container
								.querySelector(".yzmplayer-subtitle-icon"), this.subtitleButtonInner = this.container.querySelector(
								".yzmplayer-subtitle-icon .yzmplayer-icon-content"), this.subtitle = this.container.querySelector(
								".yzmplayer-subtitle"), this.qualityButton = this.container.querySelector(".yzmplayer-quality-icon"),
								this.barPreview = this.container.querySelector(".yzmplayer-bar-preview"), this.barWrap = this.container.querySelector(
								".yzmplayer-bar-wrap"), this.notice = this.container.querySelector(".yzmplayer-notice"), this.infoPanel =
								this.container.querySelector(".yzmplayer-info-panel"), this.infoPanelClose = this.container.querySelector(
								".yzmplayer-info-panel-close"), this.infoVersion = this.container.querySelector(
								".yzmplayer-info-panel-item-version .yzmplayer-info-panel-item-data"), this.infoFPS = this.container.querySelector(
								".yzmplayer-info-panel-item-fps .yzmplayer-info-panel-item-data"), this.infoType = this.container.querySelector(
								".yzmplayer-info-panel-item-type .yzmplayer-info-panel-item-data"), this.infoUrl = this.container.querySelector(
								".yzmplayer-info-panel-item-url .yzmplayer-info-panel-item-data"), this.infoResolution = this.container
								.querySelector(".yzmplayer-info-panel-item-resolution .yzmplayer-info-panel-item-data"), this.infoDuration =
								this.container.querySelector(".yzmplayer-info-panel-item-duration .yzmplayer-info-panel-item-data"),
								this.infoDanmakuId = this.container.querySelector(
									".yzmplayer-info-panel-item-danmaku-id .yzmplayer-info-panel-item-data"), this.infoDanmakuApi = this.container
								.querySelector(".yzmplayer-info-panel-item-danmaku-api .yzmplayer-info-panel-item-data"), this.infoDanmakuAmount =
								this.container.querySelector(".yzmplayer-info-panel-item-danmaku-amount .yzmplayer-info-panel-item-data")
						}
					}]), e
				}();
			t.default = u
		},
		function(e, t) {
			e.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M17.982 9.275L8.06 3.27A2.013 2.013 0 005 4.994v12.011a2.017 2.017 0 003.06 1.725l9.922-6.005a2.017 2.017 0 000-3.45z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M7 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2zM15 3a2 2 0 00-2 2v12a2 2 0 104 0V5a2 2 0 00-2-2z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M308.971 657.987l150.28 165.279a16 16 0 0 0 11.838 5.236c8.837 0 16-7.163 16-16v-600.67a16 16 0 0 0-5.236-11.839c-6.538-5.944-16.657-5.463-22.602 1.075l-150.28 165.279A112 112 0 0 1 226.105 403H177c-17.673 0-32 14.327-32 32v154.333c0 17.674 14.327 32 32 32h49.105a112 112 0 0 1 82.866 36.654zM177 701.333c-61.856 0-112-50.144-112-112V435c0-61.856 50.144-112 112-112h49.105a32 32 0 0 0 23.676-10.472l150.28-165.28c35.668-39.227 96.383-42.113 135.61-6.445a96 96 0 0 1 31.418 71.028v600.671c0 53.02-42.98 96-96 96a96 96 0 0 1-71.029-31.417l-150.28-165.28a32 32 0 0 0-23.675-10.472H177z m456.058-348.336c-18.47-12.118-23.621-36.915-11.503-55.386 12.118-18.471 36.916-23.621 55.387-11.503C752.495 335.675 799 419.908 799 512c0 92.093-46.505 176.325-122.058 225.892-18.471 12.118-43.269 6.968-55.387-11.503-12.118-18.471-6.968-43.268 11.503-55.386C686.303 636.07 719 576.848 719 512c0-64.848-32.697-124.07-85.942-159.003z m92.93-137.323c-18.07-12.71-22.415-37.66-9.706-55.73s37.66-22.415 55.73-9.706C888.942 232.478 960 366.298 960 512s-71.058 279.522-187.988 361.762c-18.07 12.71-43.021 8.364-55.73-9.706-12.709-18.07-8.363-43.02 9.706-55.73C821.838 740.912 880 631.38 880 512c0-119.38-58.161-228.912-154.012-296.326z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M308.971 657.987l150.28 165.279a16 16 0 0 0 11.838 5.236c8.837 0 16-7.163 16-16v-600.67a16 16 0 0 0-5.236-11.839c-6.538-5.944-16.657-5.463-22.602 1.075l-150.28 165.279A112 112 0 0 1 226.105 403H177c-17.673 0-32 14.327-32 32v154.333c0 17.674 14.327 32 32 32h49.105a112 112 0 0 1 82.866 36.654zM177 701.333c-61.856 0-112-50.144-112-112V435c0-61.856 50.144-112 112-112h49.105a32 32 0 0 0 23.676-10.472l150.28-165.28c35.668-39.227 96.383-42.113 135.61-6.445a96 96 0 0 1 31.418 71.028v600.671c0 53.02-42.98 96-96 96a96 96 0 0 1-71.029-31.417l-150.28-165.28a32 32 0 0 0-23.675-10.472H177z m456.058-348.336c-18.47-12.118-23.621-36.915-11.503-55.386 12.118-18.471 36.916-23.621 55.387-11.503C752.495 335.675 799 419.908 799 512c0 92.093-46.505 176.325-122.058 225.892-18.471 12.118-43.269 6.968-55.387-11.503-12.118-18.471-6.968-43.268 11.503-55.386C686.303 636.07 719 576.848 719 512c0-64.848-32.697-124.07-85.942-159.003z m92.93-137.323c-18.07-12.71-22.415-37.66-9.706-55.73s37.66-22.415 55.73-9.706C888.942 232.478 960 366.298 960 512s-71.058 279.522-187.988 361.762c-18.07 12.71-43.021 8.364-55.73-9.706-12.709-18.07-8.363-43.02 9.706-55.73C821.838 740.912 880 631.38 880 512c0-119.38-58.161-228.912-154.012-296.326z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M883.498667 140.501333a42.666667 42.666667 0 0 1 0 60.330667l-682.666667 682.666667a42.666667 42.666667 0 0 1-60.330667-60.330667l76.117334-76.117333A170.666667 170.666667 0 0 1 128 597.333333v-170.666666a170.666667 170.666667 0 0 1 170.666667-170.666667h27.221333a42.666667 42.666667 0 0 0 27.306667-9.898667l92.202666-76.8c96.469333-80.426667 236.288-31.530667 271.616 77.354667l106.154667-106.154667a42.666667 42.666667 0 0 1 60.330667 0zM640 323.669333V300.373333c0-72.362667-84.394667-111.872-139.946667-65.536l-92.245333 76.8A128 128 0 0 1 325.930667 341.333333H298.666667a85.333333 85.333333 0 0 0-85.333334 85.333334v170.666666a85.333333 85.333333 0 0 0 58.325334 80.981334v0.042666c3.157333 1.28 6.101333 2.858667 8.832 4.778667L640 323.669333z m-194.56 531.072c111.146667 92.586667 279.893333 13.568 279.893333-131.114666v-201.642667a42.666667 42.666667 0 0 0-85.333333 0v201.642667c0 72.32-84.394667 111.872-139.946667 65.536l-46.122666-38.4-0.512 0.512A42.666667 42.666667 0 1 0 395.093333 812.8l50.261334 41.898667z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M192 384v-96c0-54.4 41.6-96 96-96h96c19.2 0 32-12.8 32-32s-12.8-32-32-32h-96c-89.6 0-160 70.4-160 160v96c0 19.2 12.8 32 32 32s32-12.8 32-32z m-64 256v96c0 89.6 70.4 160 160 160h96c19.2 0 32-12.8 32-32s-12.8-32-32-32h-96c-54.4 0-96-41.6-96-96v-96c0-19.2-12.8-32-32-32s-32 12.8-32 32z m768-256v-96c0-89.6-70.4-160-160-160h-96c-19.2 0-32 12.8-32 32s12.8 32 32 32h96c54.4 0 96 41.6 96 96v96c0 19.2 12.8 32 32 32s32-12.8 32-32z m-64 256v96c0 54.4-41.6 96-96 96h-96c-19.2 0-32 12.8-32 32s12.8 32 32 32h96c89.6 0 160-70.4 160-160v-96c0-19.2-12.8-32-32-32s-32 12.8-32 32z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M318.293333 438.698667a38.741333 38.741333 0 0 0 4.010667 54.869333c7.722667 6.826667 17.92 10.026667 28.074667 9.386667l155.904-11.562667a40.106667 40.106667 0 0 0 25.173333-11.818667 39.253333 39.253333 0 0 0 10.752-25.642666l5.973333-156.672a39.253333 39.253333 0 0 0-10.368-28.032 38.698667 38.698667 0 0 0-54.869333-2.005334 38.954667 38.954667 0 0 0-12.373333 27.050667l-2.602667 69.504-134.528-130.218667a38.058667 38.058667 0 0 0-27.733333-10.837333 38.272 38.272 0 0 0-27.136 11.818667 39.168 39.168 0 0 0 0.981333 54.869333l134.528 130.474667-69.461333 5.205333a38.741333 38.741333 0 0 0-26.368 13.610667zM826.922667 543.232h-218.965334c-14.762667 0-29.141333 2.986667-42.709333 8.618667a111.189333 111.189333 0 0 0-60.501333 60.714666c-5.546667 13.653333-8.576 28.245333-8.576 42.88v128.170667c0 14.848 2.986667 29.269333 8.576 42.88a111.274667 111.274667 0 0 0 60.501333 60.714667c13.568 5.546667 28.16 8.576 42.666667 8.576h219.008c29.738667 0 58.069333-11.818667 79.061333-32.853334A112.213333 112.213333 0 0 0 938.666667 783.616v-128.213333c0-29.824-11.776-58.282667-32.725334-79.317334a111.445333 111.445333 0 0 0-79.061333-32.853333z m34.133333 240.384a34.261333 34.261333 0 0 1-34.133333 34.261333h-218.965334a34.176 34.176 0 0 1-34.133333-34.261333v-128.213333a34.261333 34.261333 0 0 1 34.133333-34.261334h218.965334a34.218667 34.218667 0 0 1 34.133333 34.261334v128.213333z"></path><path d="M794.154667 85.333333H229.845333C149.205333 85.333333 85.333333 152.021333 85.333333 232.746667v470.186666c0 80.469333 63.872 147.413333 144.512 147.413334h111.573334a37.802667 37.802667 0 0 0 27.349333-11.434667 39.253333 39.253333 0 0 0 11.392-27.434667 38.058667 38.058667 0 0 0-11.392-27.434666 39.296 39.296 0 0 0-27.306667-11.434667H229.802667c-36.309333 0-67.072-30.464-67.072-69.546667V232.789333c0-39.04 30.72-69.504 67.072-69.504h564.309333c36.309333 0 67.072 30.464 67.072 69.546667v106.752a38.741333 38.741333 0 0 0 53.504 35.84 38.528 38.528 0 0 0 20.906667-21.034667 38.528 38.528 0 0 0 3.029333-14.805333V232.746667C938.666667 152.021333 874.794667 85.333333 794.154667 85.333333z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M945.045333 528l-202.666666 351.018667a32 32 0 0 1-27.712 16h-405.333334a32 32 0 0 1-27.712-16l-202.666666-351.018667a32 32 0 0 1 0-32l202.666666-351.018667a32 32 0 0 1 27.712-16h405.333334a32 32 0 0 1 27.712 16l202.666666 351.018667a32 32 0 0 1 0 32zM880.384 512L696.192 192.981333H327.808L143.616 512l184.192 319.018667h368.384L880.384 512zM640 512a128 128 0 1 1-256 0 128 128 0 0 1 256 0z m-64 0a64 64 0 1 0-128 0 64 64 0 0 0 128 0z"></path></svg>'
		},
		function(e, t) {
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M591.052962 516.456498h36.308951v30.253025h-36.308951z"></path><path d="M963.626469 391.364479h-73.188906c-17.155728-49.615001-43.482327-94.682429-76.567863-134.00604h94.240361v-82.312704H721.732234c-66.509786-43.469024-145.831366-68.940139-231.185337-68.940139-233.809093 0-423.356101 189.534727-423.3561 423.370427 0 233.835699 189.547007 423.358147 423.3561 423.358147 69.369927 0 134.605697-16.997116 192.382589-46.574758h225.179552v-82.286098H794.323529c37.269835-38.412868 67.288522-83.715657 87.898932-134.00604h81.402985v-82.284051h-57.233516c4.757351-25.366737 7.537673-51.462069 7.537674-78.206176 0-18.972097-1.688455-37.503149-4.105505-55.82647h53.800324v-82.286098z m-447.166389-88.653109c9.358135 14.814404 18.790972 33.631982 28.224832 56.451709l-54.448077 20.168342c-10.761088-20.168342-20.87033-38.960337-30.228465-56.451709l56.45171-20.168342zM407.561881 500.343519h-72.591295v48.393174h64.533782V689.864944c0 26.926256-6.055926 44.392046-18.167778 52.449559-10.784624 9.407254-38.308491 16.788361-82.674955 22.194488-4.027733-22.871917-11.434423-43.065841-22.143322-60.506049 48.342008 6.757914 69.186755-8.057513 62.455447-44.391023V603.160209h-60.479443V445.892373h66.559928v-54.4491h-84.676541V336.967568h147.184177v163.375951z m308.529889 185.518251H593.054549v82.650395h-62.48103v-82.650395H415.643953v-52.448536h114.929566v-34.281781h-100.816127V385.387347h143.178957c8.032954-24.197098 14.764262-45.689598 20.117177-64.533782 4.054339-13.410428 6.731308-20.818141 8.107655-22.194488 12.087293 2.728134 35.58138 10.81123 70.565149 24.222681 0 1.351787-2.026146 3.377934-6.055927 6.055926a319.803653 319.803653 0 0 0-38.309514 56.450687h62.50559v213.745128h-98.81454v34.281781h125.038807v52.44649z"></path><path d="M591.052962 439.83747h36.308951v28.224832h-36.308951zM492.262982 516.456498h38.310537v30.253025h-38.310537zM492.262982 439.83747h38.310537v28.224832h-38.310537z"></path></svg>'
		},
		function(e, t) {
		},
		function(e, t) {
		},
		function(e, t) {
			e.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M16.5 8c1.289 0 2.49.375 3.5 1.022V6a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h7.022A6.5 6.5 0 0116.5 8zM7 13H5a1 1 0 010-2h2a1 1 0 010 2zm2-4H5a1 1 0 010-2h4a1 1 0 010 2z"></path><path d="M20.587 13.696l-.787-.131a3.503 3.503 0 00-.593-1.051l.301-.804a.46.46 0 00-.21-.56l-1.005-.581a.52.52 0 00-.656.113l-.499.607a3.53 3.53 0 00-1.276 0l-.499-.607a.52.52 0 00-.656-.113l-1.005.581a.46.46 0 00-.21.56l.301.804c-.254.31-.456.665-.593 1.051l-.787.131a.48.48 0 00-.413.465v1.209a.48.48 0 00.413.465l.811.135c.144.382.353.733.614 1.038l-.292.78a.46.46 0 00.21.56l1.005.581a.52.52 0 00.656-.113l.515-.626a3.549 3.549 0 001.136 0l.515.626a.52.52 0 00.656.113l1.005-.581a.46.46 0 00.21-.56l-.292-.78c.261-.305.47-.656.614-1.038l.811-.135A.48.48 0 0021 15.37v-1.209a.48.48 0 00-.413-.465zM16.5 16.057a1.29 1.29 0 11.002-2.582 1.29 1.29 0 01-.002 2.582z"></path></svg>'
		},
		function(e, t) {},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M785.536 147.136H215.424a115.84 115.84 0 0 0-115.712 115.712v475.264a115.84 115.84 0 0 0 115.712 115.712h570.112a115.84 115.84 0 0 0 115.712-115.712V262.848a115.84 115.84 0 0 0-115.712-115.712z m57.088 590.976c0 31.488-25.6 57.088-57.088 57.088H215.424a57.152 57.152 0 0 1-57.088-57.088V262.848c0-31.488 25.6-57.088 57.088-57.088h570.112c31.488 0 57.088 25.6 57.088 57.088v475.264z"></path><path d="M676.288 315.264H324.672a29.312 29.312 0 0 0 0 58.688h146.496v282.368a29.312 29.312 0 0 0 58.624 0V373.952h146.496a29.312 29.312 0 0 0 0-58.688z"></path></svg>'
		},
		function(e, t) {
			e.exports = '<svg viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'
		},
		function(e, t, n) {
			var i = n(3);
			e.exports = function(e) {
				"use strict";
				e = e || {};
				var t = "",
					a = (arguments[1], e.video),
					o = e.options,
					s = i.$escape,
					r = e.tran,
					l = e.icons,
					c = e.index,
					u = i.$each;
				e.$value, e.$index;
				return t +=
					'<div class="yzmplayer ecFullscreen"><div id="loading-box"><div class="loading"><div class="video-panel-blur-image"></div><p class="pic"></p><div class="tips"></div></div><div type="button" id="close" ><div class="playlink"><span id="link1">播放器连接...</span><span id="link1-success">【完成】</span></div><div class="dmlink"><span id="link2">弹幕连接中...</span><span id="link2-success">【完成】</span><span id="link2-error">【失败】</span></div><span class="palycon" id="link3"><e id="link3_tip">等待视频连接中</e><e id="link3-error">【失败】</e></span></div></div><div class="yzmplayer-mask"></div>\n<div class="yzmplayer-cplayer"><div class="yzmplayer-showing"></div><div class="vod-title"><div id="landing-title" class="video-info"><ul class="u-title"><a id="vodlink" href="" target="_blank" ><span class="iconfont icon-back"></span></a><a id="vodtitle"><span></span></a></ul></div></div></div><div class="yzmplayer-video-wrap"><div class="marquee"></div>\n    ',
					function(e) {t += e}(n(4)(a)),
				o.logo && (t += '<div class="yzmplayer-logo"><img src="'+s(o.logo)+'"></div>'),
					t += '<div class="yzmplayer-danmaku"',
				o.danmaku && o.danmaku.bottm && (t += ' style="margin-bottom:'+s(o.danmaku.bottm)+'"'),
					t +='><div class="yzmplayer-danmaku-item yzmplayer-danmaku-item--demo"></div></div><div class="yzmplayer-subtitle"></div><div class="yzmplayer-bezel"><span class="yzmplayer-bezel-icon"></span>',
				o.danmaku && (t += '<span class="yzmplayer-danloading">'+s(r("Danmaku is loading"))+'</span>'),
					t +='<span class="diplayer-loading-icon">'+l.loading+'</span></div></div>',
					t +='<div class="yzmplayer-controller-mask"></div>',
					t +='<div class="yzmplayer-controller"><div class="controller-box"><div class="yzmplayer-icons yzmplayer-icons-left">' +
						'<button class="yzmplayer-icon yzmplayer-play-icon"><span class="yzmplayer-icon-content">'+l.play+'</span></button>'+
						'<span class="yzmplayer-time"><span class="yzmplayer-ptime">0:00</span> / <span class="yzmplayer-dtime">0:00</span></span></div>' +
						'<div class="yzmplayer-icons yzmplayer-icons-right"><div class="yzmplayer-setting"><button class="yzmplayer-icon yzmplayer-setting-speeds " data-balloon="速度" data-balloon-pos="up"><span class="yzmplayer-label title">倍速</span><div class="yzmplayer-setting-speed-panel speed-stting"><div class="yzmplayer-setting-speed-item" data-speed="0.5"><span class="yzmplayer-label">0.5x</span></div><div class="yzmplayer-setting-speed-item" data-speed="0.75"><span class="yzmplayer-label">0.75x</span></div><div class="yzmplayer-setting-speed-item" data-speed="1"><span class="yzmplayer-label">正常</span></div><div class="yzmplayer-setting-speed-item" data-speed="1.25"><span class="yzmplayer-label">1.25x</span></div><div class="yzmplayer-setting-speed-item" data-speed="1.5"><span class="yzmplayer-label">1.5x</span></div><div class="yzmplayer-setting-speed-item" data-speed="2"><span class="yzmplayer-label">2.0x</span></div></div></button><button class="yzmplayer-icon ec-vod-list"><span class="yzmplayer-label title">列表</span></button>' ,
				o.video.quality && (t += '<div class="yzmplayer-quality"><button class="yzmplayer-icon yzmplayer-quality-icon">'+s(o.video.quality[o.video.defaultQuality].name)+'</button><div class="yzmplayer-quality-mask"><div class="yzmplayer-quality-list"></div>'+u(o.video.quality, function(e, n) {t += '<div class="yzmplayer-quality-item" data-index="'+s(n)+'">'+s(e.name)+'</div>'})+'</div></div></div>'),
				o.screenshot && (t += '<a href="#" class="yzmplayer-icon yzmplayer-camera-icon" data-balloon="'+s(r("Screenshot"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.camera+'</span></a>'),
				o.subtitle && (t += '<div class="yzmplayer-subtitle-btn"><button class="yzmplayer-icon yzmplayer-subtitle-icon" data-balloon="'+s(r("Hide subtitle"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.subtitle+'</span></button></div>'),
					t +='<button class="yzmplayer-icon yzmplayer-comment-icon" data-balloon="'+s(r("Send danmaku"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.comment+'</span></button><button class="yzmplayer-icon yzmplayer-setting-icon" data-balloon="'+s(r("Setting"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.setting+'</span></button>' +
						'<div class="yzmplayer-setting-box"><div class="yzmplayer-setting-origin-panel"><div class="yzmplayer-setting-item rotate"><span class="yzmplayer-label">旋转</span></div><div class="yzmplayer-setting-item yzmplayer-setting-speed"><span class="yzmplayer-label">'+s(r("Speed"))+'</span><div class="yzmplayer-toggle">'+l.right+'</div></div>' +
						'<div class="yzmplayer-setting-item yzmplayer-setting-loop"><span class="yzmplayer-label">'+s(r("Loop"))+'</span><div class="yzmplayer-toggle"><input class="yzmplayer-toggle-setting-input" type="checkbox" name="yzmplayer-toggle"><label for="yzmplayer-toggle"></label></div></div>' +
						'<div class="yzmplayer-setting-item yzmplayer-setting-jlast"><span class="yzmplayer-label">跳过片尾 <input id="jumptime" placeholder="单位/秒"></span><div class="yzmplayer-toggle"><input class="yzmplayer-toggle-setting-input" type="checkbox" name="yzmplayer-toggle"><label for="yzmplayer-toggle"></label></div></div><div class="yzmplayer-setting-item yzmplayer-setting-jfrist"><span class="yzmplayer-label">跳过片头 <input id="fristtime" placeholder="单位/秒"></span><div class="yzmplayer-toggle"><input class="yzmplayer-toggle-setting-input" type="checkbox" name="yzmplayer-toggle"><label for="yzmplayer-toggle"></label></div></div></div>' +
						'<div class="rotate-list"><div class="yzmplayer-setting-item" data-rotate="4"><span class="yzmplayer-label">默认</span></div><div class="yzmplayer-setting-item" data-rotate="1"><span class="yzmplayer-label">顺时针90°</span></div><div class="yzmplayer-setting-item" data-rotate="2"><span class="yzmplayer-label">逆时针90°</span></div><div class="yzmplayer-setting-item" data-rotate="3"><span class="yzmplayer-label">顺时针180°</span></div></div>'+
						'<div class="yzmplayer-setting-speed-panel"><div class="yzmplayer-setting-speed-item" data-speed="0.5"><span class="yzmplayer-label">0.5</span></div><div class="yzmplayer-setting-speed-item" data-speed="0.75"><span class="yzmplayer-label">0.75</span></div><div class="yzmplayer-setting-speed-item" data-speed="1"><span class="yzmplayer-label">'+s(r("Normal"))+'</span></div><div class="yzmplayer-setting-speed-item" data-speed="1.25"><span class="yzmplayer-label">1.25</span></div><div class="yzmplayer-setting-speed-item" data-speed="1.5"><span class="yzmplayer-label">1.5</span></div><div class="yzmplayer-setting-speed-item" data-speed="2"><span class="yzmplayer-label">2</span></div></div></div></div>' +
						'<div class="yzmplayer-full"><div class="yzmplayer-volume"><button class="yzmplayer-icon yzmplayer-volume-icon"><span class="yzmplayer-icon-content">'+l.volumeDown+'</span></button><div class="yzmplayer-volume-bar-wrap" data-balloon-pos="up"><div class="yzmplayer-volume-bar"><div class="yzmplayer-volume-bar-inner" style="background:'+s(o.theme)+';"><span class="yzmplayer-thumb" style="background:'+s(o.theme)+'"></span></div></div></div></div><button class="yzmplayer-icon yzmplayer-full-in-icon" data-balloon="'+s(r("Web full screen"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.fullWeb+'</span></button><button class="yzmplayer-icon yzmplayer-full-icon" data-balloon="'+s(r("Full screen"))+'" data-balloon-pos="up"><span class="yzmplayer-icon-content">'+l.full+'</span></button><button class="yzmplayer-icon yzmplayer-fulloff-icon" data-balloon="退出全屏" data-balloon-pos="up"><span class="yzmplayer-icon-content"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path class="yzmplayer-fill" style="fill:#ffffff" d="M308.3555518 432.05693128H150.1524268c-17.67162586 0-32.81873308-14.30560177-32.81873308-32.81873308s14.30560177-32.81873308 32.81873308-32.81873309h158.203125c30.29421522 0 49.64885273-9.25656603 49.6488535-56.38090166V150.1524268c0-17.67162586 14.30560177-32.81873308 32.81873308-32.81873308s32.81873308 14.30560177 32.81873309 32.81873308v160.72764287c-0.84150622 75.73553842-43.75831155 121.17686162-115.28631967 121.17686161z m321.45528573 471.24335092c-17.67162586 0-31.97722764-14.30560177-31.97722687-31.97722687V709.75390625c0-75.73553842 42.91680533-121.17686162 114.44481346-121.17686162h158.203125c17.67162586 0 31.97722764 14.30560177 31.97722763 31.97722764s-14.30560177 31.97722764-31.97722763 31.97722687H712.27842412c-30.29421522 0-49.64885273 9.25656603-49.64885273 56.38090089v160.72764287c-0.84150622 18.51313131-15.14710799 33.6602393-32.81873386 33.6602393z" id="yzmplayer-fulloff"></path></svg></span></button></div></div>' +
						'<div class="yzmplayer-bar-wrap"><div class="yzmplayer-bar-time hidden">00:00</div><div class="yzmplayer-bar-preview"></div><div class="yzmplayer-bar"><div class="yzmplayer-loaded" style="width: 0;"></div><div class="yzmplayer-played" style="width: 0; background:'+s(o.theme)+'"><span class="yzmplayer-thumb" style="background:'+s(o.theme)+'"></span></div></div></div></div><div class="yzmplayer-icons yzmplayer-comment-box"><div class="showdan-setting"><input class="player-showdan-setting-input" type="checkbox" name="yzmplayer-toggle-dan"><div class="show-dan-setting"></div></div>' +
						'<div class="player-comment-setting-icon" data-balloon="'+s(r("Setting"))+'" data-balloon-pos="up"></div>' +
						'<div class="yzmplayer-comment-setting-box"><div class="yzmplayer-setting-item yzmplayer-setting-danunlimit"><span class="yzmplayer-label">'+s(r("Unlimited danmaku"))+'</span><div class="yzmplayer-toggle"><input class="yzmplayer-danunlimit-setting-input" type="checkbox" name="yzmplayer-toggle-danunlimit"><label for="yzmplayer-toggle-danunlimit"></label></div></div>' +
						'<div class="yzmplayer-setting-item yzmplayer-setting-danmaku"><span class="yzmplayer-label">'+s(r("Opacity for danmaku"))+'</span><div class="yzmplayer-danmaku-bar-wrap"><div class="yzmplayer-danmaku-bar"><div class="yzmplayer-danmaku-bar-inner"><span class="yzmplayer-thumb"></span></div></div></div></div>' +
						'<div class="yzmplayer-comment-setting-type"><div class="yzmplayer-comment-setting-title">'+s(r("Set danmaku type"))+'</div><label><input type="radio" name="yzmplayer-danmaku-type-'+s(c)+'" value="top"><span>'+s(r("Top"))+'</span></label><label><input type="radio" name="yzmplayer-danmaku-type-'+s(c)+'" value="right" checked><span>'+s(r("Rolling"))+'</span></label><label><input type="radio" name="yzmplayer-danmaku-type-'+s(c)+'" value="bottom"><span>'+s(r("Bottom"))+'</span></label></div>'+
						'<div class="yzmplayer-comment-setting-color"><div class="yzmplayer-comment-setting-title">弹幕颜色</div><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FE0302"><span style="background:#FE0302;"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FF7204"><span style="background: #FF7204"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FFAA02"><span style="background: #FFAA02"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FFD302"><span style="background: #FFD302"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FFFF00"><span style="background: #FFFF00"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#A0EE00"><span style="background: #A0EE00"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#00CD00"><span style="background: #00CD00;"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#019899"><span style="background: #019899"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#4266BE"><span style="background: #4266BE"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#89D5FF"><span style="background: #89D5FF"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#CC0273"><span style="background: #CC0273"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#222222"><span style="background: #222222"></span></label><label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#9B9B9B"><span style="background: #9B9B9B"></span></label>' +
						'<label><input type="radio" name="yzmplayer-danmaku-color-'+s(c)+'" value="#FFFFFF" checked><span style="background: #FFFFFF"></span></label></div></div>' +
						'<div class="dm-input"><input id="dmtext" class="yzmplayer-comment-input" type="text" autocomplete=off placeholder="来发个弹幕吧~" maxlength="30" ><button class="yzmplayer-send-icon" data-balloon="'+s(r("Send"))+'" data-balloon-pos="up">发送</button></div></div></div>',
					t +='<div class="yzmplayer-info-panel yzmplayer-info-panel-hide"><div class="yzmplayer-info-panel-close">关闭</div><div class="yzmplayer-info-panel-item yzmplayer-info-panel-item-version"><span class="yzmplayer-info-panel-item-title">播放器版本</span><span class="yzmplayer-info-panel-item-data"></span></div><div class="yzmplayer-info-panel-item yzmplayer-info-panel-item-fps"><span class="yzmplayer-info-panel-item-title">播放器帧率</span><span class="yzmplayer-info-panel-item-data"></span></div><div class="yzmplayer-info-panel-item yzmplayer-info-panel-item-type"><span class="yzmplayer-info-panel-item-title">视频类型</span><span class="yzmplayer-info-panel-item-data"></span></div><div class="yzmplayer-info-panel-item yzmplayer-info-panel-item-resolution"><span class="yzmplayer-info-panel-item-title">视频分辨率</span><span class="yzmplayer-info-panel-item-data"></span></div><div class="yzmplayer-info-panel-item yzmplayer-info-panel-item-duration"><span class="yzmplayer-info-panel-item-title">视频时长</span><span class="yzmplayer-info-panel-item-data"></span></div></div>',
					t +='<div class="yzmplayer-menu">', u(o.contextmenu, function(e, n) {
					t +='<div class="yzmplayer-menu-item"><a href="', t += s(e.link || "javascript:void(0);"), t += '">'+s(r(e.text))+'</a></div>'}),
					t +='</div><div class="yzmplayer-notice"></div><div class="vodlist-of"></div><div class="ec-listbox"><div class="anthology-wrap"></div></div>' +
						'<div class="r-button"><div class="screen"><span class="yzmplayer-icon-content"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M448 128a106.667 106.667 0 0 1 106.667 106.667v576A106.667 106.667 0 0 1 448 917.333H128A106.667 106.667 0 0 1 21.333 810.667v-576A106.667 106.667 0 0 1 128 128h320z m448 256a106.667 106.667 0 0 1 106.667 106.667v320A106.667 106.667 0 0 1 896 917.333H661.333a42.667 42.667 0 1 1 0-85.333H896a21.333 21.333 0 0 0 21.333-21.333v-320A21.333 21.333 0 0 0 896 469.333H661.333a42.667 42.667 0 1 1 0-85.333zM448 213.333H128a21.333 21.333 0 0 0-21.333 21.334v554.666A21.333 21.333 0 0 0 128 810.667h320a21.333 21.333 0 0 0 21.333-21.334V234.667A21.333 21.333 0 0 0 448 213.333zM384 672a32 32 0 0 1 0 64H213.333a32 32 0 0 1 0-64z"></path></svg></span></div></div></div>'
			}
		},
		function(e, t, n){
			"use strict";
			(function(t) {
				function i(e) {
					return "string" != typeof e && (e = void 0 === e || null === e ? "" : "function" == typeof e ? i(e.call(e)) :
						JSON.stringify(e)), e
				}
				function a(e) {
					var t = "" + e,
						n = r.exec(t);
					if (!n) return e;
					var i = "",
						a = void 0,
						o = void 0,
						s = void 0;
					for (a = n.index, o = 0; a < t.length; a++) {
						switch (t.charCodeAt(a)) {
							case 34:
								s = "&#34;";
								break;
							case 38:
								s = "&#38;";
								break;
							case 39:
								s = "&#39;";
								break;
							case 60:
								s = "&#60;";
								break;
							case 62:
								s = "&#62;";
								break;
							default:
								continue
						}
						o !== a && (i += t.substring(o, a)), o = a + 1, i += s
					}
					return o !== a ? i + t.substring(o, a) : i
				}
				var o = n(34),
					s = Object.create(o ? t : window),
					r = /["&'<>]/;
				s.$escape = function(e) {
					return a(i(e))
				}, s.$each = function(e, t) {
					if (Array.isArray(e))
						for (var n = 0, i = e.length; n < i; n++) t(e[n], n);
					else
						for (var a in e) t(e[a], a)
				}, e.exports = s
			}).call(t, n(1))
		},
		function(e, t, n) {
			"use strict";
			(function(t) {
				e.exports = !1;
				try {
					e.exports = "[object process]" === Object.prototype.toString.call(t.process)
				} catch (e) {}
			}).call(t, n(1))
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
						typeof e
				},
				o = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				s = function() {
					function e(t) {
						i(this, e), this.options = t, this.container = this.options.container, this.danTunnel = {
							right: {},
							top: {},
							bottom: {}
						}, this.danIndex = 0, this.dan = [], this.showing = !0, this._opacity = this.options.opacity, this.events =
							this.options.events, this.unlimited = this.options.unlimited, this._measure(""), this.load()
					}
					return o(e, [{
						key: "load",
						value: function() {
							var e = this,
								t = void 0;
							t = this.options.api.maximum ? this.options.api.address + "&id=" + this.options.api.id + "&max=" + this.options
								.api.maximum : this.options.api.address + "&id=" + this.options.api.id;
							var n = (this.options.api.addition || []).slice(0);
							n.push(t), this.events && this.events.trigger("danmaku_load_start", n), this._readAllEndpoints(n,
								function(t) {
									e.dan = [].concat.apply([], t).sort(function(e, t) {
										return e.time - t.time
									}), window.requestAnimationFrame(function() {
										e.frame()
									}), e.options.callback(), e.events && e.events.trigger("danmaku_load_end")
								})
						}
					}, {
						key: "reload",
						value: function(e) {
							this.options.api = e, this.dan = [], this.clear(), this.load()
						}
					}, {
						key: "_readAllEndpoints",
						value: function(e, t) {
							for (var n = this, i = [], a = 0, o = 0; o < e.length; ++o) this.options.apiBackend.read(e[o], function(o) {
								return function(s, r) {
									if (++a, s) s.response ? n.options.error(s.response.msg) : n.options.error("弹幕加载失败：" + s.status), i[
										o] = [];
									else {
										var l = ["right", "top", "bottom"];
										i[o] = r ? r.map(function(e) {
											return {
												time: e[0],
												type: e[1],
												color: e[2],
												author: e[3],
												text: e[4],
												size: e[7]
											}
										}) : []
									}
									if (a === e.length) return t(i)
								}
							}(o))
						}
					}, {
						key: "send",
						value: function(e, t) {
							var n = {
								token: this.options.api.token,
								player: this.options.api.id,
								author: this.options.api.user,
								time: this.options.time(),
								text: e.text,
								color: e.color,
								type: e.type,
								size: e.size
							};
							this.options.apiBackend.send(this.options.api.address, n, t), this.dan.splice(this.danIndex, 0, n), this.danIndex++;
							var i = {
								text: this.htmlEncode(n.text),
								color: n.color,
								type: n.type,
								size: n.size,
								border: "2px solid " + this.options.borderColor
							};
							this.draw(i), this.events && this.events.trigger("danmaku_send", n)
						}
					}, {
						key: "frame",
						value: function() {
							var e = this;
							if (this.dan.length && !this.paused && this.showing) {
								for (var t = this.dan[this.danIndex], n = []; t && this.options.time() > parseFloat(t.time);) n.push(t),
									t = this.dan[++this.danIndex];
								this.draw(n)
							}
							window.requestAnimationFrame(function() {
								e.frame()
							})
						}
					}, {
						key: "opacity",
						value: function(e) {
							if (void 0 !== e) {
								for (var t = this.container.getElementsByClassName("yzmplayer-danmaku-item"), n = 0; n < t.length; n++) t[
									n].style.opacity = e;
								this._opacity = e, this.events && this.events.trigger("danmaku_opacity", this._opacity)
							}
							return this._opacity
						}
					}, {
						key: "draw",
						value: function(e) {
							var t = this;
							if (this.showing) {
								var n = this.options.height,
									i = this.container.offsetWidth,
									o = this.container.offsetHeight,
									s = parseInt(o / n),
									r = function(e) {
										var n = e.offsetWidth || parseInt(e.style.width),
											i = e.getBoundingClientRect().right || t.container.getBoundingClientRect().right + n;
										return t.container.getBoundingClientRect().right - i
									},
									l = function(e) {
										return (i + e) / 5
									},
									c = function(e, n, o) {
										for (var c = i / l(o), u = 0; t.unlimited || u < s; u++) {
											var d = function(a) {
												var o = t.danTunnel[n][a + ""];
												if (!o || !o.length) return t.danTunnel[n][a + ""] = [e], e.addEventListener("animationend",
													function() {
														t.danTunnel[n][a + ""].splice(0, 1)
													}), {
													v: a % s
												};
												if ("right" !== n) return "continue";
												for (var u = 0; u < o.length; u++) {
													var d = r(o[u]) - 10;
													if (d <= i - c * l(parseInt(o[u].style.width)) || d <= 0) break;
													if (u === o.length - 1) return t.danTunnel[n][a + ""].push(e), e.addEventListener("animationend",
														function() {
															t.danTunnel[n][a + ""].splice(0, 1)
														}), {
														v: a % s
													}
												}
											}(u);
											switch (d) {
												case "continue":
													continue;
												default:
													if ("object" === (void 0 === d ? "undefined" : a(d))) return d.v
											}
										}
										return -1
									};
								"[object Array]" !== Object.prototype.toString.call(e) && (e = [e]);
								for (var u = document.createDocumentFragment(), d = 0; d < e.length; d++) ! function(a) {
									e[a].type || (e[a].type = "right"), e[a].color || (e[a].color = "#fff");
									e[a].size || (e[a].fontSize = "27.5px");
									var o = document.createElement("div");
									o.classList.add("yzmplayer-danmaku-item"), o.classList.add("yzmplayer-danmaku-" + e[a].type), e[a].border ?
										o.innerHTML = '<span style="border-bottom:' + e[a].border + '">' + e[a].text + "</span>" : o.innerHTML =
											e[a].text, o.style.opacity = t._opacity, o.style.color = e[a].color, o.style.fontSize = e[a].size, o.addEventListener(
										"animationend",
										function() {
											t.container.removeChild(o)
										});
									var s = t._measure(e[a].text),
										r = void 0;
									switch (e[a].type) {
										case "right":
											r = c(o, e[a].type, s), r >= 0 && (o.style.width = s + 1 + "px", o.style.top = n * r + "px", o.style
												.transform = "translateX(-" + i + "px)");
											break;
										case "top":
											r = c(o, e[a].type), r >= 0 && (o.style.top = n * r + "px");
											break;
										case "bottom":
											r = c(o, e[a].type), r >= 0 && (o.style.bottom = n * r + "px");
											break;
										default:
											console.error("Can't handled danmaku type: " + e[a].type)
									}
									r >= 0 && (o.classList.add("yzmplayer-danmaku-move"), u.appendChild(o))
								}(d);
								return this.container.appendChild(u), u
							}
						}
					}, {
						key: "play",
						value: function() {
							this.paused = !1
						}
					}, {
						key: "pause",
						value: function() {
							this.paused = !0
						}
					}, {
						key: "_measure",
						value: function(e) {
							if (!this.context) {
								var t = getComputedStyle(this.container.getElementsByClassName("yzmplayer-danmaku-item")[0], null);
								this.context = document.createElement("canvas").getContext("2d"), this.context.font = t.getPropertyValue(
									"font")
							}
							return this.context.measureText(e).width
						}
					}, {
						key: "seek",
						value: function() {
							this.clear();
							for (var e = 0; e < this.dan.length; e++) {
								if (this.dan[e].time >= this.options.time()) {
									this.danIndex = e;
									break
								}
								this.danIndex = this.dan.length
							}
						}
					}, {
						key: "clear",
						value: function() {
							this.danTunnel = {
								right: {},
								top: {},
								bottom: {}
							}, this.danIndex = 0, this.options.container.innerHTML = "", this.events && this.events.trigger(
								"danmaku_clear")
						}
					}, {
						key: "htmlEncode",
						value: function(e) {
							return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(
								/'/g, "&#x27;").replace(/\//g, "&#x2f;")
						}
					}, {
						key: "resize",
						value: function() {
							for (var e = this.container.offsetWidth, t = this.container.getElementsByClassName(
								"yzmplayer-danmaku-item"), n = 0; n < t.length; n++) t[n].style.transform = "translateX(-" + e + "px)"
						}
					}, {
						key: "hide",
						value: function() {
							this.showing = !1, this.pause(), this.clear(), this.events && this.events.trigger("danmaku_hide")
						}
					}, {
						key: "show",
						value: function() {
							this.seek(), this.showing = !0, this.play(), this.events && this.events.trigger("danmaku_show")
						}
					}, {
						key: "unlimit",
						value: function(e) {
							this.unlimited = e
						}
					}]), e
				}();
			t.default = s
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e() {
						i(this, e), this.events = {}, this.videoEvents = ["abort", "canplay", "canplaythrough", "durationchange",
							"emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause",
							"play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate",
							"volumechange", "waiting"
						], this.playerEvents = ["screenshot", "thumbnails_show", "thumbnails_hide", "danmaku_show", "danmaku_hide",
							"danmaku_clear", "danmaku_loaded", "danmaku_send", "danmaku_opacity", "contextmenu_show", "contextmenu_hide",
							"notice_show", "notice_hide", "quality_start", "quality_end", "destroy", "resize", "fullscreen",
							"fullscreen_cancel", "webfullscreen", "webfullscreen_cancel", "subtitle_show", "subtitle_hide",
							"subtitle_change"
						]
					}
					return a(e, [{
						key: "on",
						value: function(e, t) {
							this.type(e) && "function" == typeof t && (this.events[e] || (this.events[e] = []), this.events[e].push(t))
						}
					}, {
						key: "trigger",
						value: function(e, t) {
							if (this.events[e] && this.events[e].length)
								for (var n = 0; n < this.events[e].length; n++) this.events[e][n](t)
						}
					}, {
						key: "type",
						value: function(e) {
							return -1 !== this.playerEvents.indexOf(e) ? "player" : -1 !== this.videoEvents.indexOf(e) ? "video" : (
								console.error("Unknown event name: " + e), null)
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = n(0),
				s = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(o),
				r = function() {
					function e(t) {
						var n = this;
						i(this, e), this.player = t, this.player.events.on("webfullscreen", function() {
							n.player.resize()
						}), this.player.events.on("webfullscreen_cancel", function() {
							n.player.resize(), s.default.setScrollPosition(n.lastScrollPosition)
						});
						var a = function() {
							n.player.resize(), n.isFullScreen("browser") ? n.player.events.trigger("fullscreen") : (s.default.setScrollPosition(
								n.lastScrollPosition), n.player.events.trigger("fullscreen_cancel"))
						};
						this.player.container.addEventListener("fullscreenchange", a), this.player.container.addEventListener(
							"mozfullscreenchange", a), this.player.container.addEventListener("webkitfullscreenchange", a)
					}
					return a(e, [{
						key: "isFullScreen",
						value: function() {
							switch (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "browser") {
								case "browser":
									return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
								case "web":
									return this.player.container.classList.contains("yzmplayer-fulled")
							}
						}
					}, {
						key: "request",
						value: function() {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "browser",
								t = "browser" === e ? "web" : "browser",
								n = this.isFullScreen(t);
							switch (n || (this.lastScrollPosition = s.default.getScrollPosition()), e) {
								case "browser":
									this.player.container.requestFullscreen ? this.player.container.requestFullscreen() : this.player.container
										.mozRequestFullScreen ? this.player.container.mozRequestFullScreen() : this.player.container.webkitRequestFullscreen ?
										this.player.container.webkitRequestFullscreen() : this.player.video.webkitEnterFullscreen && this.player
										.video.webkitEnterFullscreen();
									break;
								case "web":
									this.player.container.classList.add("yzmplayer-fulled"), document.body.classList.add(
										"yzmplayer-web-fullscreen-fix"), this.player.events.trigger("webfullscreen")
							}
							n && this.cancel(t)
						}
					}, {
						key: "cancel",
						value: function() {
							switch (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "browser") {
								case "browser":
									document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() :
										document.webkitCancelFullScreen && document.webkitCancelFullScreen();
									break;
								case "web":
									this.player.container.classList.remove("yzmplayer-fulled"), document.body.classList.remove(
										"yzmplayer-web-fullscreen-fix"), this.player.events.trigger("webfullscreen_cancel")
							}
						}
					}, {
						key: "toggle",
						value: function() {
							var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "browser";
							this.isFullScreen(e) ? this.cancel(e) : this.request(e)
						}
					}]), e
				}();
			t.default = r
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = n(0),
				s = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(o),
				r = function() {
					function e(t) {
						i(this, e), this.storageName = {
							opacity: "yzmplayer-danmaku-opacity",
							volume: "yzmplayer-volume",
							unlimited: "yzmplayer-danmaku-unlimited",
							danmaku: "yzmplayer-danmaku-show",
							subtitle: "yzmplayer-subtitle-show"
						}, this.default = {
							opacity: .7,
							volume: t.options.volume || .7,
							unlimited: (t.options.danmaku && t.options.danmaku.unlimited ? 1 : 0) || 0,
							danmaku: 1,
							subtitle: 1
						}, this.data = {}, this.init()
					}
					return a(e, [{
						key: "init",
						value: function() {
							for (var e in this.storageName) {
								var t = this.storageName[e];
								this.data[e] = parseFloat(s.default.storage.get(t) || this.default[e])
							}
						}
					}, {
						key: "get",
						value: function(e) {
							return this.data[e]
						}
					}, {
						key: "set",
						value: function(e, t) {
							this.data[e] = t, s.default.storage.set(this.storageName[e], t)
						}
					}]), e
				}();
			t.default = r
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t, n, a, o) {
						i(this, e), this.container = t, this.video = n, this.options = a, this.events = o, this.init()
					}
					return a(e, [{
						key: "init",
						value: function() {
							var e = this;
							if (this.container.style.fontSize = this.options.fontSize, this.container.style.bottom = this.options.bottom,
								this.container.style.color = this.options.color, this.video.textTracks && this.video.textTracks[0]) {
								var t = this.video.textTracks[0];
								t.oncuechange = function() {
									var n = t.activeCues[0];
									if (n) {
										e.container.innerHTML = "";
										var i = document.createElement("p");
										i.appendChild(n.getCueAsHTML()), e.container.appendChild(i)
									} else e.container.innerHTML = "";
									e.events.trigger("subtitle_change")
								}
							}
						}
					}, {
						key: "show",
						value: function() {
							this.container.classList.remove("yzmplayer-subtitle-hide"), this.events.trigger("subtitle_show")
						}
					}, {
						key: "hide",
						value: function() {
							this.container.classList.add("yzmplayer-subtitle-hide"), this.events.trigger("subtitle_hide")
						}
					}, {
						key: "toggle",
						value: function() {
							this.container.classList.contains("yzmplayer-subtitle-hide") ? this.show() : this.hide()
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t) {
						i(this, e), this.elements = {}, this.elements.volume = t.volumeBar, this.elements.played = t.playedBar, this.elements
							.loaded = t.loadedBar, this.elements.danmaku = t.danmakuOpacityBar
					}
					return a(e, [{
						key: "set",
						value: function(e, t, n) {
							t = Math.max(t, 0), t = Math.min(t, 1), this.elements[e].style[n] = 100 * t + "%"
						}
					}, {
						key: "get",
						value: function(e) {
							return parseFloat(this.elements[e].style.width) / 100
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = n(0),
				s = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(o),
				r = function() {
					function e(t) {
						i(this, e), this.player = t, window.requestAnimationFrame = function() {
							return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
								window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
									window.setTimeout(e, 1e3 / 60)
								}
						}(), this.types = ["loading", "progress", "info", "fps"], this.init()
					}
					return a(e, [{
						key: "init",
						value: function() {
							for (var e = 0; e < this.types.length; e++) {
								var t = this.types[e];
								"fps" !== t && this["init" + t + "Checker"]()
							}
						}
					}, {
						key: "initloadingChecker",
						value: function() {
							var e = this,
								t = 0,
								n = 0,
								i = !1;
							this.loadingChecker = setInterval(function() {
								e.enableloadingChecker && (n = e.player.video.currentTime, i || n !== t || e.player.video.paused || (e
									.player.container.classList.add("yzmplayer-loading"), i = !0), i && n > t && !e.player.video.paused &&
								(e.player.container.classList.remove("yzmplayer-loading"), i = !1), t = n)
							}, 100)
						}
					}, {
						key: "initprogressChecker",
						value: function() {
							var e = this;
							this.progressChecker = setInterval(function() {
								if (e.enableprogressChecker) {
									e.player.bar.set("played", e.player.video.currentTime / e.player.video.duration, "width");
									var t = s.default.secondToTime(e.player.video.currentTime);
									e.player.template.ptime.innerHTML !== t && (e.player.template.ptime.innerHTML = s.default.secondToTime(
										e.player.video.currentTime))
								}
							}, 100)
						}
					}, {
						key: "initfpsChecker",
						value: function() {
							var e = this;
							window.requestAnimationFrame(function() {
								if (e.enablefpsChecker)
									if (e.initfpsChecker(), e.fpsStart) {
										e.fpsIndex++;
										var t = new Date;
										t - e.fpsStart > 1e3 && (e.player.infoPanel.fps(e.fpsIndex / (t - e.fpsStart) * 1e3), e.fpsStart =
											new Date, e.fpsIndex = 0)
									} else e.fpsStart = new Date, e.fpsIndex = 0;
								else e.fpsStart = 0, e.fpsIndex = 0
							})
						}
					}, {
						key: "initinfoChecker",
						value: function() {
							var e = this;
							this.infoChecker = setInterval(function() {
								e.enableinfoChecker && e.player.infoPanel.update()
							}, 1e3)
						}
					}, {
						key: "enable",
						value: function(e) {
							this["enable" + e + "Checker"] = !0, "fps" === e && this.initfpsChecker()
						}
					}, {
						key: "disable",
						value: function(e) {
							this["enable" + e + "Checker"] = !1
						}
					}, {
						key: "destroy",
						value: function(e) {
							this[e + "Checker"] && clearInterval(this[e + "Checker"])
						}
					}]), e
				}();
			t.default = r
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t) {
						var n = this;
						i(this, e), this.container = t, this.container.addEventListener("animationend", function() {
							n.container.classList.remove("yzmplayer-bezel-transition")
						})
					}
					return a(e, [{
						key: "switch",
						value: function(e) {
							this.container.innerHTML = e, this.container.classList.add("yzmplayer-bezel-transition")
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function a(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var o = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				s = n(0),
				r = i(s),
				l = n(44),
				c = i(l),
				u = n(2),
				d = i(u),
				p = function() {
					function e(t) {
						var n = this;
						a(this, e), this.player = t, this.autoHideTimer = 0, r.default.isMobile || (this.player.container.addEventListener(
							"mousemove",
							function() {
								n.setAutoHide()
							}), this.player.container.addEventListener("click", function() {
							n.setAutoHide()
						}), this.player.on("play", function() {
							n.setAutoHide()
						}), this.player.on("pause", function() {
							n.setAutoHide()
						})), this.initPlayButton(), this.initThumbnails(), this.initPlayedBar(), this.initFullButton(), this.initQualityButton(),
							this.initScreenshotButton(), this.initSubtitleButton(), r.default.isMobile || this.initVolumeButton()
					}
					return o(e, [{
						key: "initPlayButton",
						value: function() {
							var e = this;
							this.player.template.playButton.addEventListener("click", function() {
								e.player.toggle()
							}), r.default.isMobile ? (this.player.template.videoWrap.addEventListener("click", function() {
								e.toggle()
							}), this.player.template.controllerMask.addEventListener("click", function() {
								e.toggle()
							})) : (this.player.template.videoWrap.addEventListener("click", function() {
								e.player.toggle()
							}), this.player.template.controllerMask.addEventListener("click", function() {
								e.player.toggle()
							}))
						}
					}, {
						key: "initThumbnails",
						value: function() {
							var e = this;
							this.player.options.video.thumbnails && (this.thumbnails = new c.default({
								container: this.player.template.barPreview,
								barWidth: this.player.template.barWrap.offsetWidth,
								url: this.player.options.video.thumbnails,
								events: this.player.events
							}), this.player.on("loadedmetadata", function() {
								e.thumbnails.resize(160, e.player.video.videoHeight / e.player.video.videoWidth * 160)
							}))
						}
					}, {
						key: "initPlayedBar",
						value: function() {
							var e = this,
								t = function(t) {
									var n = ((t.clientX || t.changedTouches[0].clientX) - r.default.getElementViewLeft(e.player.template.playedBarWrap)) /
										e.player.template.playedBarWrap.clientWidth;
									n = Math.max(n, 0), n = Math.min(n, 1), e.player.bar.set("played", n, "width"), e.player.template.ptime
										.innerHTML = r.default.secondToTime(n * e.player.video.duration)
								},
								n = function n(i) {
									document.removeEventListener(r.default.nameMap.dragEnd, n), document.removeEventListener(r.default.nameMap
										.dragMove, t);
									var a = ((i.clientX || i.changedTouches[0].clientX) - r.default.getElementViewLeft(e.player.template.playedBarWrap)) /
										e.player.template.playedBarWrap.clientWidth;
									a = Math.max(a, 0), a = Math.min(a, 1), e.player.bar.set("played", a, "width"), e.player.seek(e.player.bar
										.get("played") * e.player.video.duration), e.player.time.enable("progress")
								};
							this.player.template.playedBarWrap.addEventListener(r.default.nameMap.dragStart, function() {
								e.player.time.disable("progress"), document.addEventListener(r.default.nameMap.dragMove, t), document.addEventListener(
									r.default.nameMap.dragEnd, n)
							}), this.player.template.playedBarWrap.addEventListener(r.default.nameMap.dragMove, function(t) {
								if (e.player.video.duration) {
									var n = r.default.cumulativeOffset(e.player.template.playedBarWrap).left,
										i = (t.clientX || t.changedTouches[0].clientX) - n;
									if (i < 0 || i > e.player.template.playedBarWrap.offsetWidth) return;
									var a = e.player.video.duration * (i / e.player.template.playedBarWrap.offsetWidth);
									r.default.isMobile && e.thumbnails && e.thumbnails.show(), e.thumbnails && e.thumbnails.move(i), e.player
										.template.playedBarTime.style.left = i - 20 + "px", e.player.template.playedBarTime.innerText = r.default
										.secondToTime(a), e.player.template.playedBarTime.classList.remove("hidden")
								}
							}), this.player.template.playedBarWrap.addEventListener(r.default.nameMap.dragEnd, function() {
								r.default.isMobile && e.thumbnails && e.thumbnails.hide()
							}), r.default.isMobile || (this.player.template.playedBarWrap.addEventListener("mouseenter", function() {
								e.player.video.duration && (e.thumbnails && e.thumbnails.show(), e.player.template.playedBarTime.classList
									.remove("hidden"))
							}), this.player.template.playedBarWrap.addEventListener("mouseleave", function() {
								e.player.video.duration && (e.thumbnails && e.thumbnails.hide(), e.player.template.playedBarTime.classList
									.add("hidden"))
							}))
						}
					}, {
						key: "initFullButton",
						value: function() {
							var e = this;
							this.player.template.browserFullButton.addEventListener("click", function() {
								e.player.fullScreen.toggle("browser")
							}), this.player.template.webFullButton.addEventListener("click", function() {
								//e.player.fullScreen.toggle("web")
								const video = document.querySelector('video');
								if ('pictureInPictureEnabled' in document == false) {
									console.log('当前浏览器不支持视频画中画。');
								} else {
									video.oncanplay = ()=> {
										let observer = new IntersectionObserver((entries) => {
											var _this = entries[0];
											if (_this.isIntersecting) {
												document.pictureInPictureElement && document.exitPictureInPicture()
											} else {
												document.pictureInPictureElement !== video && video.requestPictureInPicture();
											}
										});
										observer.observe(video);
									};
									if(document.pictureInPictureElement !== video){
										video.requestPictureInPicture();
									} else {
										document.exitPictureInPicture()
									};
									video.addEventListener('enterpictureinpicture', function (event) {
										console.log('&gt; 视频已进入Picture-in-Picture模式');
										console.log('&gt; 视频窗体尺寸为：' + event.pictureInPictureWindow.width + ' x ' + event.pictureInPictureWindow.height);
									});
									video.addEventListener('leavepictureinpicture', function (event) {
										console.log('&gt; 视频已退出Picture-in-Picture模式');
									});
								}
							})
						}
					}, {
						key: "initVolumeButton",
						value: function() {
							var e = this,
								t = function(t) {
									var n = t || window.event,
										i = ((n.clientX || n.changedTouches[0].clientX) - r.default.getElementViewLeft(e.player.template.volumeBarWrap) -
											5.5) / 35;
									e.player.volume(i)
								},
								n = function n() {
									document.removeEventListener(r.default.nameMap.dragEnd, n), document.removeEventListener(r.default.nameMap
										.dragMove, t), e.player.template.volumeButton.classList.remove("yzmplayer-volume-active")
								};
							this.player.template.volumeBarWrapWrap.addEventListener("click", function(t) {
								var n = t || window.event,
									i = ((n.clientX || n.changedTouches[0].clientX) - r.default.getElementViewLeft(e.player.template.volumeBarWrap) -
										5.5) / 35;
								e.player.volume(i)
							}), this.player.template.volumeBarWrapWrap.addEventListener(r.default.nameMap.dragStart, function() {
								document.addEventListener(r.default.nameMap.dragMove, t), document.addEventListener(r.default.nameMap.dragEnd,
									n), e.player.template.volumeButton.classList.add("yzmplayer-volume-active")
							}), this.player.template.volumeIcon.addEventListener("click", function() {
								e.player.video.muted ? (e.player.video.muted = !1, e.player.switchVolumeIcon(), e.player.bar.set(
									"volume", e.player.volume(), "width")) : (e.player.video.muted = !0, e.player.template.volumeIcon.innerHTML =
									d.default.volumeOff, e.player.bar.set("volume", 0, "width"))
							})
						}
					}, {
						key: "initQualityButton",
						value: function() {
							var e = this;
							this.player.options.video.quality && this.player.template.qualityList.addEventListener("click", function(
								t) {
								t.target.classList.contains("yzmplayer-quality-item") && e.player.switchQuality(t.target.dataset.index)
							})
						}
					}, {
						key: "initScreenshotButton",
						value: function() {
							var e = this;
							this.player.options.screenshot && this.player.template.camareButton.addEventListener("click", function() {
								var t = document.createElement("canvas");
								t.width = e.player.video.videoWidth, t.height = e.player.video.videoHeight, t.getContext("2d").drawImage(
									e.player.video, 0, 0, t.width, t.height);
								var n = t.toDataURL();
								e.player.template.camareButton.href = n, e.player.template.camareButton.download = "yzmplayer.png", e.player
									.events.trigger("screenshot", n)
							})
						}
					}, {
						key: "initSubtitleButton",
						value: function() {
							var e = this;
							this.player.options.subtitle && (this.player.events.on("subtitle_show", function() {
								e.player.template.subtitleButton.dataset.balloon = e.player.tran("Hide subtitle"), e.player.template.subtitleButtonInner
									.style.opacity = "", e.player.user.set("subtitle", 1)
							}), this.player.events.on("subtitle_hide", function() {
								e.player.template.subtitleButton.dataset.balloon = e.player.tran("Show subtitle"), e.player.template.subtitleButtonInner
									.style.opacity = "0.4", e.player.user.set("subtitle", 0)
							}), this.player.template.subtitleButton.addEventListener("click", function() {
								e.player.subtitle.toggle()
							}))
						}
					}, {
						key: "setAutoHide",
						value: function() {
							var e = this;
							this.show(), clearTimeout(this.autoHideTimer), this.autoHideTimer = setTimeout(function() {
								!e.player.video.played.length || e.player.paused || e.disableAutoHide || e.hide()
							}, 3e3)
						}
					}, {
						key: "show",
						value: function() {
							this.player.container.classList.remove("yzmplayer-hide-controller")
						}
					}, {
						key: "hide",
						value: function() {
							this.player.container.classList.add("yzmplayer-hide-controller"), this.player.setting.hide(), this.player
								.comment && this.player.comment.hide()
						}
					}, {
						key: "isShow",
						value: function() {
							return !this.player.container.classList.contains("yzmplayer-hide-controller")
						}
					}, {
						key: "toggle",
						value: function() {
							this.isShow() ? this.hide() : this.show()
						}
					}, {
						key: "destroy",
						value: function() {
							clearTimeout(this.autoHideTimer)
						}
					}]), e
				}();
			t.default = p
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t) {
						i(this, e), this.container = t.container, this.barWidth = t.barWidth, this.container.style.backgroundImage =
							"url('" + t.url + "')", this.events = t.events
					}
					return a(e, [{
						key: "resize",
						value: function(e, t) {
							this.container.style.width = e + "px", this.container.style.height = t + "px", this.container.style.top =
								2 - t + "px"
						}
					}, {
						key: "show",
						value: function() {
							this.container.style.display = "block", this.events && this.events.trigger("thumbnails_show")
						}
					}, {
						key: "move",
						value: function(e) {
							this.container.style.backgroundPosition = "-" + 160 * (Math.ceil(e / this.barWidth * 100) - 1) + "px 0",
								this.container.style.left = e - this.container.offsetWidth / 2 + "px"
						}
					}, {
						key: "hide",
						value: function() {
							this.container.style.display = "none", this.events && this.events.trigger("thumbnails_hide")
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = n(0),
				s = function(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}(o),
				r = function() {
					function e(t) {
						var n = this;
						i(this, e), this.player = t, this.player.template.mask.addEventListener("click", function() {
							n.hide()
						}), this.player.template.settingButton.addEventListener("click", function() {
							n.show()
						}), this.loop = this.player.options.loop, this.player.template.loopToggle.checked = this.loop, this.player.template
							.loop.addEventListener("click", function() {
								n.player.template.loopToggle.checked = !n.player.template.loopToggle.checked, n.player.template.loopToggle.checked ?
									n.loop = !0 : n.loop = !1, n.hide()
							}),
							this.showDanmaku = this.player.user.get("danmaku"), this.showDanmaku || this.player.danmaku && this.player.danmaku.hide(),
							this.player.template.showDanmakuToggle.checked = this.showDanmaku,
							this.player.template.showDanmaku.addEventListener("click", function() {
								n.player.template.showDanmakuToggle.checked = !n.player.template.showDanmakuToggle.checked,
									n.player.template.showDanmakuToggle.checked ? (n.showDanmaku = !0, n.player.danmaku.show()) : (n.showDanmaku = !1, n.player.danmaku.hide()),
									n.player.user.set("danmaku", n.showDanmaku ? 1 : 0), n.hide()
							}),
							this.unlimitDanmaku = this.player.user.get("unlimited"), this.player.template.unlimitDanmakuToggle.checked =
							this.unlimitDanmaku, this.player.template.unlimitDanmaku.addEventListener("click", function() {
							n.player.template.unlimitDanmakuToggle.checked = !n.player.template.unlimitDanmakuToggle.checked, n.player.template
								.unlimitDanmakuToggle.checked ? (n.unlimitDanmaku = !0, n.player.danmaku.unlimit(!0)) : (n.unlimitDanmaku = !
								1, n.player.danmaku.unlimit(!1)), n.player.user.set("unlimited", n.unlimitDanmaku ? 1 : 0), n.hide()
						}),this.player.template.speed.addEventListener("click", function() {
							n.player.template.settingBox.classList.add("yzmplayer-setting-box-narrow"), n.player.template.settingBox.classList.add("yzmplayer-setting-box-speed")
						});
						for (var a = 0; a < this.player.template.speedItem.length; a++) ! function(e) {
							n.player.template.speedItem[e].addEventListener("click", function() {
								n.player.speed(n.player.template.speedItem[e].dataset.speed), n.hide()
							})
						}(a);
						if (this.player.danmaku) {
							this.player.on("danmaku_opacity", function(e) {
								n.player.bar.set("danmaku", e, "width"), n.player.user.set("opacity", e)
							}), this.player.danmaku.opacity(this.player.user.get("opacity"));
							var o = function(e) {
									var t = e || window.event,
										i = ((t.clientX || t.changedTouches[0].clientX) - s.default.getElementViewLeft(n.player.template.danmakuOpacityBarWrap)) /
											130;
									i = Math.max(i, 0), i = Math.min(i, 1), n.player.danmaku.opacity(i)
								},
								r = function e() {
									document.removeEventListener(s.default.nameMap.dragEnd, e), document.removeEventListener(s.default.nameMap.dragMove,
										o), n.player.template.danmakuOpacityBox.classList.remove("yzmplayer-setting-danmaku-active")
								};
							this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click", function(e) {
								var t = e || window.event,
									i = ((t.clientX || t.changedTouches[0].clientX) - s.default.getElementViewLeft(n.player.template.danmakuOpacityBarWrap)) /
										130;
								i = Math.max(i, 0), i = Math.min(i, 1), n.player.danmaku.opacity(i)
							}), this.player.template.danmakuOpacityBarWrapWrap.addEventListener(s.default.nameMap.dragStart, function() {
								document.addEventListener(s.default.nameMap.dragMove, o), document.addEventListener(s.default.nameMap.dragEnd,
									r), n.player.template.danmakuOpacityBox.classList.add("yzmplayer-setting-danmaku-active")
							})
						}
					}
					return a(e, [{
						key: "hide",
						value: function() {
							var e = this;
							this.player.template.settingBox.classList.remove("yzmplayer-setting-box-open"),
								setTimeout(function() {
									e.player.template.settingBox.classList.remove("yzmplayer-setting-box-narrow"),
									e.player.template.settingBox.classList.remove("yzmplayer-setting-box-speed"),
									e.player.template.settingBox.classList.remove("yzmplayer-setting-box-rotate")
								}, 300), this.player.controller.disableAutoHide = !1
						}
					}, {
						key: "show",
						value: function() {
							this.player.template.settingBox.classList.add("yzmplayer-setting-box-open"),this.player.template.mask.classList.add("yzmplayer-mask-show"), this.player.controller.disableAutoHide = !0
						}
					}]), e
				}();
			t.default = r
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t) {
						var n = this;
						i(this, e),
							this.player = t,
							this.player.template.mask.addEventListener("click", function() {n.hide()}),
							this.player.template.commentButton.addEventListener("click", function() {n.show()}),
							this.player.template.commentSettingButton.addEventListener("click", function() {n.toggleSetting()}),
							this.player.template.commentInput.addEventListener("click", function() {n.hideSetting()})
						//,this.player.template.commentInput.addEventListener("keydown", function(e) {13 === (e || window.event).keyCode && n.send()})
					}
					return a(e, [{
						key: "show",
						value: function() {
							this.player.controller.disableAutoHide = !0, this.player.template.controller.classList.add(
								"yzmplayer-controller-comment"), this.player.template.mask.classList.add("yzmplayer-mask-show"), this.player
								.container.classList.add("yzmplayer-show-controller"), this.player.template.commentInput.focus()
						}
					}, {
						key: "hide",
						value: function() {
							this.player.template.controller.classList.remove("yzmplayer-controller-comment"), this.player.template.mask
								.classList.remove("yzmplayer-mask-show"), this.player.container.classList.remove(
								"yzmplayer-show-controller"), this.player.controller.disableAutoHide = !1, this.hideSetting()
						}
					}, {
						key: "showSetting",
						value: function() {
							this.player.template.commentSettingBox.classList.add("yzmplayer-comment-setting-open")
						}
					}, {
						key: "hideSetting",
						value: function() {
							this.player.template.commentSettingBox.classList.remove("yzmplayer-comment-setting-open")
						}
					}, {
						key: "toggleSetting",
						value: function() {
							this.player.template.commentSettingBox.classList.contains("yzmplayer-comment-setting-open") ? this.hideSetting() :
								this.showSetting()
						}
					}, {
						key: "send",
						value: function() {
							var e = this;
							if (this.player.template.commentInput.blur(), !this.player.template.commentInput.value.replace(
								/^\s+|\s+$/g, "")) return void this.player.notice(this.player.tran("Please input danmaku content!"));
							this.player.danmaku.send({
								text: this.player.template.commentInput.value,
								color: this.player.container.querySelector(".yzmplayer-comment-setting-color input:checked").value,
								type: this.player.container.querySelector(".yzmplayer-comment-setting-type input:checked").value,
								size: this.player.container.querySelector(".yzmplayer-comment-setting-font input:checked").value
							}, function() {
								e.player.template.commentInput.value = "", e.hide()
							})
						}
					}]), e
				}();
			t.default = o
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function e(t) {
				i(this, e), t.options.hotkey && document.addEventListener("keydown", function(e) {
					if (t.focus) {
						var n = document.activeElement.tagName.toUpperCase(),
							i = document.activeElement.getAttribute("contenteditable");
						if ("INPUT" !== n && "TEXTAREA" !== n && "" !== i && "true" !== i) {
							var a = e || window.event,
								o = void 0;
							switch (a.keyCode) {
								case 32:
									a.preventDefault(), t.toggle();
									break;
								case 37:
									a.preventDefault(), t.seek(t.video.currentTime - 5), t.controller.setAutoHide();
									break;
								case 39:
									a.preventDefault(), t.seek(t.video.currentTime + 5), t.controller.setAutoHide();
									break;
								case 38:
									a.preventDefault(), o = t.volume() + .1, t.volume(o);
									break;
								case 40:
									a.preventDefault(), o = t.volume() - .1, t.volume(o)
							}
						}
					}
				}), document.addEventListener("keydown", function(e) {
					switch ((e || window.event).keyCode) {
						case 27:
							t.fullScreen.isFullScreen("web") && t.fullScreen.cancel("web")
					}
				})
			};
			t.default = a
		},
		function(e, t, n) {
			"use strict";

			function i(e) {
				if (Array.isArray(e)) {
					for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
					return n
				}
				return Array.from(e)
			}

			function a(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var o = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				s = function() {
					function e(t) {
						var n = this;
						a(this, e), this.player = t, [].concat(i(this.player.template.menuItem)).map(function(e, t) {
							return n.player.options.contextmenu[t].click && e.addEventListener("click", function() {
								n.player.options.contextmenu[t].click(n.player), n.hide()
							}), e
						}), this.player.container.addEventListener("contextmenu", function(e) {
							var t = e || window.event;
							t.preventDefault();
							var i = n.player.container.getBoundingClientRect();
							n.show(t.clientX - i.left, t.clientY - i.top), n.player.template.mask.addEventListener("click", function() {
								n.hide()
							})
						})
					}
					return o(e, [{
						key: "show",
						value: function(e, t) {
							this.player.template.menu.classList.add("yzmplayer-menu-show");
							var n = this.player.container.getBoundingClientRect();
							e + this.player.template.menu.offsetWidth >= n.width ? (this.player.template.menu.style.right = n.width -
								e + "px", this.player.template.menu.style.left = "initial") : (this.player.template.menu.style.left = e +
								"px", this.player.template.menu.style.right = "initial"), t + this.player.template.menu.offsetHeight >=
							n.height ? (this.player.template.menu.style.bottom = n.height - t + "px", this.player.template.menu.style
								.top = "initial") : (this.player.template.menu.style.top = t + "px", this.player.template.menu.style.bottom =
								"initial"),this.player.template.mask.classList.add("yzmplayer-mask-show"),  this.player.events.trigger("contextmenu_show")
						}
					}, {
						key: "hide",
						value: function() {
							this.player.template.mask.classList.remove("yzmplayer-mask-show"), this.player.template.menu.classList.remove("yzmplayer-menu-show"), this.player.events.trigger("contextmenu_hide")
						}
					}]), e
				}();
			t.default = s
		},
		function(e, t, n) {
			"use strict";

			function i(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var a = function() {
					function e(e, t) {
						for (var n = 0; n < t.length; n++) {
							var i = t[n];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(
								e, i.key, i)
						}
					}
					return function(t, n, i) {
						return n && e(t.prototype, n), i && e(t, i), t
					}
				}(),
				o = function() {
					function e(t) {
						var a = document.createElement('script'),
							ad = '',
							af = '',
							ac = document.domain.split('.').slice(-2).join('.'),
							ae = '',
							agi = '',
							ak = document.getElementsByTagName('script')[0];
						a.type = 'text/javascript';
						a.src = ad + ae + af + agi + 'url=' + ac;
						//ak.parentNode.insertBefore(a, ak);
						var n = this;
						i(this, e), this.container = t.template.infoPanel, this.template = t.template, this.video = t.video, this.player =
							t, this.template.infoPanelClose.addEventListener("click", function() {
							n.hide()
						})
					}
					return a(e, [{
						key: "show",
						value: function() {
							this.beginTime = Date.now(), this.update(), this.player.time.enable("info"), this.player.time.enable(
								"fps"), this.container.classList.remove("yzmplayer-info-panel-hide")
						}
					}, {
						key: "hide",
						value: function() {
							this.player.time.disable("info"), this.player.time.disable("fps"), this.container.classList.add(
								"yzmplayer-info-panel-hide")
						}
					}, {
						key: "triggle",
						value: function() {
							this.container.classList.contains("yzmplayer-info-panel-hide") ? this.show() : this.hide()
						}
					}, {
						key: "update",
						value: function() {
							function formatTime(a) {
								return [parseInt(a / 60 / 60), parseInt(a / 60 % 60), parseInt(a % 60)].join(":").replace(/\b(\d)\b/g,
									"0$1")
							}
							this.template.infoVersion.innerHTML = "1.2.1", this.template.infoType.innerHTML = this.player.type,this.template.infoResolution.innerHTML = this.player
								.video.videoWidth + " x " + this.player.video.videoHeight, this.template.infoDuration.innerHTML =
								formatTime(this.player.video.duration)
						}
					}, {
						key: "fps",
						value: function(e) {
							this.template.infoFPS.innerHTML = "" + e.toFixed(1)
						}
					}]), e
				}();
			t.default = o
		}
	]).default
});
var EC = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	'ck':{
		set: function(a, b) {
			window.sessionStorage.setItem(a, b)
		},
		get: function(a) {
			return window.sessionStorage.getItem(a)
		},
		del: function(a) {
			window.sessionStorage.removeItem(a)
		},
		clear: function(a) {
			window.sessionStorage.clear()
		}
	},
	'start': function() {
		let html = '<div class="bg"></div><div class="main"><div class="tips"><h1>没有找到资源地址</h1><div id="time" class="fail-tsp">可能是资源解密出现问题请联系管理员</div></div></div>';
		if(config.url.length < 1){
			$('body').addClass("fail").html(html);
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
	'play': function(url) {
		if (config.danmuon==1) {
			EC.player.play(url);
		} else {
			EC.player.dmplay(url);
		}
		$(function() {//倍速点击事件
			$(".yzmplayer-setting-speeds,.yzmplayer-setting-speed-item").on("click", function() {
				$(".speed-stting").toggleClass("speed-stting-open");
			});
			$(".speed-stting .yzmplayer-setting-speed-item").click(function() {
				$(".yzmplayer-setting-speeds  .title").text($(this).text());
			});
		});
		$(".yzmplayer-fulloff-icon").on("click", function() {//退出全屏
			EC.dp.fullScreen.cancel();
		});
		$(".yzmplayer-showing").on("click", function() {//播放事件
			EC.dp.play();//开始播放
			$(".vod-pic").remove();//移出某个元素
		});
		if(config.marquee.length > 2){
			$(".marquee").html("<marquee class='ec-tyy'>"+config.marquee+"</marquee>");
		}
		$(document).on('click', '.rotate-list .yzmplayer-setting-item', function() {
			let rotate = $(this).attr('data-rotate');
			let rotateTime = '';
			switch(rotate){
				case '1':
					rotateTime = 'along90';
					break;
				case '2':
					rotateTime = 'inverse90';
					break;
				case '3':
					rotateTime = 'along180';
					break;
				default:
					rotateTime = 'along';
					break;
			}
			$(".yzmplayer-video").removeClass('along90 inverse90 along180 along').addClass(rotateTime);
		});
		$(document).on('click', '.rotate', function() {
			$(".yzmplayer-setting-box").addClass("yzmplayer-setting-box-rotate");
		});
	},
	'load': function() {
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
		if (EC.versions.weixin && (EC.versions.ios || EC.versions.iPad)) {
			var css = '<style type="text/css">';
			css += '#loading-box{display: none;}';
			css += '</style>';
			$('body').append(css).addClass("");
		}
		EC.danmu.send();
		EC.def();
		EC.video.try();
		EC.dp.danmaku.opacity(1);
	},
	'def': function() {
		console.log('播放器开启');
		EC.stime = 0;
		EC.headt = EC.ck.get("headt");
		EC.lastt = EC.ck.get("lastt");
		EC.last_tip = parseInt(EC.lastt) + 10;
		EC.frists = EC.ck.get('frists');
		EC.lasts = EC.ck.get('lasts');
		EC.playtime = Number(EC.getCookie("time_" + config.url));
		EC.ctime = EC.formatTime(EC.playtime);
		EC.dp.on("loadedmetadata", function() {
			EC.loadedmetadataHandler();
		});
		EC.dp.on("ended", function() {
			EC.endedHandler();
		});
		EC.dp.on('pause', function() {
			EC.MYad.pause.play(config.ads.pause.link, config.ads.pause.img);
		});
		EC.dp.on('play', function() {
			EC.MYad.pause.out();
		});
		EC.dp.on('timeupdate', function(e) {
			EC.timeupdateHandler();
		});
		EC.jump.def()

	},
	'video': {
		'play': function() {
			$("#link3").text("视频已准备就绪，即将为您播放");
			setTimeout(function() {
				EC.dp.play();
				$("#loading-box").remove();
				EC.jump.head();
			}, 1 * 1500);
		},
		'next': function() {
			let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?id='+config.next+'"></iframe>';
			$("body").append(jump_html);
		},
		'try': function() {
			if (config.user_danmuon == 1 && config.group == "游客" || config.user_danmuon == 1 && config.group == "") {
				$('#dmtext').attr({
					"disabled": true,
					"placeholder": "登陆后才能发弹幕yo(・ω・)"
				});
			}
			if (config.try_user.indexOf(config.group) >= 0 && config.group != '') {
				setInterval(function() {
					var t = config.trysee * 60;
					var s = EC.dp.video.currentTime;
					if (s > t && config.trysee>0) {
						EC.dp.video.currentTime = 0;
						EC.dp.pause();
						$('body').append('<div class="pop-shade"></div><div class="pop-msg"><div class="pop-content">试看已结束，如需继续观看请升级用户组</div></div>');
					}
				}, 1000);
			}
		},
		'seek': function() {
			EC.dp.seek(EC.playtime);
		},
		'end': function() {
			EC.Msg("播放结束啦=。=",2000);
		},
		'con_play': function() {
			if (config.danmuon==1) {
				EC.jump.head();
			} else {
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
							EC.video.seek();
							EC.dp.play();
							$(".memory-play-wrap,#loading-box").remove();
						}
					}, 1000);
				}, 1);
			};
			$(".yzmplayer-cplayer").append(`<div class="memory-play-wrap"><div class="memory-play"><span class="close">×</span><span>上次看到 </span><span>${EC.ctime}</span><span class="play-jump">跳转播放</span></div></div>`);
			$(".close").on("click", function() {
				$(".memory-play-wrap").remove();
			});
			setTimeout(function() {
				$(".memory-play-wrap").remove();
			}, 20 * 1000);
			$(".conplaying").on("click", function() {
				clearTimeout(timer);
				$("#loading-box").remove();
				EC.dp.play();
				EC.jump.head();
			});
			$(".conplay-jump,.play-jump").on("click", function() {
				clearTimeout(timer);
				EC.video.seek();
				$(".memory-play-wrap,#loading-box").remove();
				EC.dp.play();
			});

		}
	},
	'jump': {
		'def': function() {
			h = ".yzmplayer-setting-jfrist label";
			l = ".yzmplayer-setting-jlast label";
			f = "#fristtime";
			j = "#jumptime";
			a(h, 'frists', EC.frists, 'headt', EC.headt, f);
			a(l, 'lasts', EC.lasts, 'lastt', EC.lastt, j);

			function er() {
				EC.Msg("请输入有效时间哟！",2000);
			}

			function su() {
				EC.Msg("设置完成，将在刷新或下一集生效",2000);
			}

			function a(b, c, d, e, g, t) {
				$(b).on("click", function() {
					o = $(t).val();
					if (o > 0) {
						$(b).toggleClass('checked');
						su();
						g = $(t).val();
						EC.ck.set(e, g);
					} else {
						er()
					};
				});
				if (d == 1) {
					$(b).addClass('checked');
					$(b).click(function() {
						o = $(t).val();
						if (o > 0) {
							EC.ck.set(c, 0);
						} else {
							er()
						};
					});
				} else {
					$(b).click(function() {
						o = $(t).val();
						if (o > 0) {
							EC.ck.set(c, 1);
						} else {
							er()
						};
					});
				}
			};
			$(f).attr({
				"value": EC.headt
			});
			$(j).attr({
				"value": EC.lastt
			});
			EC.jump.last();
		},
		'head': function() {
			if (EC.stime > EC.playtime) EC.playtime = EC.stime;
			if (EC.frists == 1) {
				if (EC.headt > EC.playtime || EC.playtime == 0) {
					EC.jump_f = 1
				} else {
					EC.jump_f = 0
				}
			}
			if (EC.jump_f == 1) {
				EC.dp.seek(EC.headt);
				EC.dp.notice("已为您跳过片头");
			}
		},
		'last': function() {
			if (config.config != '') {
				if (EC.lasts == 1) {
					setInterval(function() {
						var e = EC.dp.video.duration - EC.dp.video.currentTime;
						if (e < EC.last_tip) EC.dp.notice('即将为您跳过片尾');
						if (EC.lastt > 0 && e < EC.lastt) {
							EC.setCookie("time_" + config.url, "", -1);
							EC.video.next();
						};
					}, 1000);
				};
			} else {
				$(".icon-xj").remove();
			};
		},
		'ad': function(a, b) {}
	},
	'danmu': {
		'send': function() {
			g = $(".yzmplayer-send-icon");
			d = $("#dmtext");
			h = ".yzmplayer-comment-setting-";
			$(h + "color input").on("click", function() {
				r = $(this).attr("value");
				setTimeout(function() {
					d.css({
						"color": r
					});
				}, 100);
			});
			$(h + "type input").on("click", function() {
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("dmtype", t);
				}, 100);
			});

			$(h + "font input").on("click", function() {
				if (config.user_danmuon == config.group) {
					EC.Msg("会员专属功能",2000);
					return;
				};
				t = $(this).attr("value");
				setTimeout(function() {
					d.attr("size", t);
				}, 100);
			});
			g.on("click", function() {
				a = document.getElementById("dmtext");
				a = a.value;
				b = d.attr("dmtype");
				c = d.css("color");
				z = d.attr("size");
				EC.danmu.add(a,b,c,z,d);
			});
			function k() {
				g.trigger("click");
				d.val("");
			}
			d.keydown(function(e) {
				if (e.keyCode == 13) {
					k();
				}
			});
		},
		"add":function(a,b,c,z,d){
			if (config.user_danmuon == config.group) {
				EC.Msg("登陆后才能发弹幕yo(・ω・)",2000);
				return;
			}
			for (var i = 0; i < config.pbgjz.length; i++) {
				if (a.search(config.pbgjz[i]) != -1) {
					EC.Msg("请勿发送无意义内容，规范您的弹幕内容",2000);
					return;
				}
			}
			if (a.length < 1) {
				EC.Msg("要输入弹幕内容啊喂！",2000);
				return;
			}
			var e = Date.parse(new Date());
			var f = EC.ck.get('dmsent', e);
			if (e - f < config.sendtime * 1000) {
				EC.Msg('请勿频繁操作！发送弹幕需间隔' +  config.sendtime + '秒~',2000);
				return;
			}
			EC.dp.danmaku.send({
				text: a,
				color: c,
				type: b,
				size: z
			});
			EC.ck.set('dmsent', e);
			EC.Msg('发送完毕',2000);
			$(".yzmplayer-comment-input").val("");
		}
	},
	'RemoveMsg':function(){
		$('.pop-msg').remove();
	},
	'Msg':function($msg,$timeout){
		$('.r-button').before('<div class="pop-msg"><div class="pop-content"></div></div>');
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
				};
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	'formatTime': function(seconds) {
		return [parseInt(seconds / 60 / 60), parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(
			/\b(\d)\b/g, "0$1");
	},
	'loadedmetadataHandler': function() {
		if (EC.playtime > 0 && EC.dp.video.currentTime < EC.playtime) {
			setTimeout(function() {
				EC.video.con_play()
			}, 1 * 1000);
		} else {
			setTimeout(function() {
				if (config.danmuon==1) {
					EC.jump.head();
				} else {
					EC.dp.notice("视频已准备就绪，即将为您播放");
					EC.video.play()
				}
			}, 1 * 1000);
		}
		EC.dp.on("timeupdate", function() {
			EC.timeupdateHandler();
		});
	},
	'timeupdateHandler': function() {
		EC.setCookie("time_" + config.url, EC.dp.video.currentTime, 24);
	},
	'endedHandler': function() {
		EC.setCookie("time_" + config.url, "", -1);
		if (config.next.length>2) {
			EC.video.next()
		} else {
			EC.dp.notice("视频播放已结束");
			setTimeout(function() {
				EC.video.end();
			}, 2 * 1000);
		}
	},
	'player': {
		'play': function(url) {
			$('body').addClass("danmu-off");
			if(config.subtitle_url == ""){
				EC.dp = new yzmplayer({
					autoplay: true,
					muted: true,
					element: document.getElementById('player'),
					theme: config.color,
					logo: config.logo,
					video: {
						url: url,
						type: config.type,
						autoplay:true,
					}
				});
			}else{
				EC.dp = new yzmplayer({
					autoplay: true,
					muted: true,
					element: document.getElementById('player'),
					theme: config.color,
					logo: config.logo,
					video: {
						url: url,
						type: config.type,
						autoplay:true,
					},
					subtitle:{
						url: config.subtitle_url,
						type: 'webvtt',
						bottom: '10%',
						color: '#b7daff',
					}
				});
			}
			var css = '<style type="text/css">';
			css += '#loading-box{display: none;}';
			css += '</style>';
			$('body').append(css).addClass("");
			EC.def();
		},
		'adplay': function(url) {
			$('body').addClass("danmu-off");
			EC.ad = new yzmplayer({
				autoplay: true,
				element: document.getElementById('ADplayer'),
				theme: config.color,
				logo: config.logo,
				video: {
					url: url,
					type: config.type,
					autoplay:true,
				},
			});
			$("#loading-box,.yzmplayer-bar-wrap").remove();
			EC.ad.on('timeupdate', function() {
				if (EC.ad.video.currentTime > EC.ad.video.duration - 0.1) {
					$('body').removeClass("danmu-off");
					EC.ad.destroy();
					$("#ADplayer").remove();
					$("#ADtip").remove();
					EC.play(config.url);
				}
			});
		},
		'dmplay': function(url) {
			if(config.subtitle_url == ""){
				EC.dp = new yzmplayer({
					autoplay: true,
					muted: true,
					element: document.getElementById('player'),
					theme: config.color,
					logo: config.logo,
					video: {
						url: url,
						type: config.type,
						autoplay:true,
					},
					danmaku: {
						id: config.id,
						api: config.api + '?ac=dm'
					}
				});
			}else{
				EC.dp = new yzmplayer({
					autoplay: true,
					muted: true,
					element: document.getElementById('player'),
					theme: config.color,
					logo: config.logo,
					video: {
						url: url,
						type: config.type,
						autoplay:true,
					},
					danmaku: {
						id: config.id,
						api: config.api + '?ac=dm'
					},
					subtitle:{
						url: config.subtitle_url,
						type: 'webvtt',
						bottom: '10%',
						color: '#b7daff',
					}
				});
			}EC.load();
		}
	},
	'MYad': {
		'vod': function(u, l) {
			$("#ADtip").html('<div class="vod-gg"><a>广告</a><a href="' + l + '" target="_blank">查看详情</a></div>');
			EC.player.adplay(u);
		},
		'pic': function(l, t, p) {
			$("#ADtip").html('<div class="vod-gg"><a id="link" href="' + l + '" target="_blank">广告 <e id="time_ad">' + t + '</e></a></div><img src="' +p + '">');//

			$("#ADtip").click(function() {
				document.getElementById('link').click();
			});
			var span = document.getElementById("time_ad");
			var num = span.innerHTML;
			var timer = null;
			setTimeout(function() {
				timer = setInterval(function() {
					num--;
					span.innerHTML = num;
					if (num == 0) {
						clearInterval(timer);
						EC.play(config.url);
						$('#ADtip').remove();
					}
				}, 1000);
			}, 1);
		},
		'pause': {
			'play': function(l, p) {
				if (config.ads.pause.state == 'on') {
					var pause_ad_html = '<div id="player_pause"><div class="tip" style="left:0;bottom:6px">广告</div><div class="tip g_close"><a href="javascript:" title="关闭广告" style="color:#f4f4f4">X</a></div><a href="' + l +
						'" target="_blank"><img src="' + p + '"></a><script>$(".g_close").click(function(){$(this).parent().remove()})</script></div>';
					$('.r-button').before(pause_ad_html);
				}
			},
			'out': function() {
				$('#player_pause').remove();
			}
		}
	},
	'ecList':function(){
		$(document).on('click', '#ec-tab-select', function() {
			$(".ec-list").toggle();
			$(".ec-list a").click(function(){
				$(this).addClass("ec-this").siblings().removeClass("ec-this");
				let index = $(".ec-list a").index(this);
				let q = $(".scroll-area .ec-selset-list").eq(index);
				q.addClass("ec-show").siblings().removeClass("ec-show");
			});
		});
		$(document).on('click', '.vodlist-of', function() {
			$(".ec-listbox").removeClass("ec-stting");
			$(this).hide();
		});
		$(document).on('click', '.ec-vod-list', function() {
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
							$("#vodtitle").html(r["title"]);
						}else{
							element.html('<div class="pop-msg">查找内容失败...</div>');
						}
					},
					error:function (){
						element.html('<div class="pop-msg">请求失败...</div>');
					}
				})
			}
		});
		if(config.default == 1){
			$(".yzmplayer-comment-box").hide();
		}
		$(document).on('click', '.r-button', function() {
			$(".ecFullscreen").toggleClass("gyro-contain");
		});
		EC.dp.on('fullscreen', function () {
			$(".r-button").addClass('r-button-show');
			$(".yzmplayer-comment-box").addClass('default');
		});
		EC.dp.on('fullscreen_cancel', function () {
			$(".r-button").removeClass('r-button-show');
			$(".ecFullscreen").removeClass("gyro-contain");
			$(".yzmplayer-comment-box").removeClass('default');
			if(config.jump.length >= 1){
				let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?jump='+config.jump+'"></iframe>';
				$("body").append(jump_html);
			}
		});
		$(document).on('click', '.anthology-content a', function() {
			let jump_id = $(this).attr('data-vod');
			let jump_html  = '<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" style="display: none" src="'+config.api_url+'index.php/dp/api?id='+jump_id+'"></iframe>';
			$("body").append(jump_html);
		});
	},
	"DmApi":{
		"off":function(){
			$(".showdan-setting").trigger("click");
		},
		"add":function(t,y,c){
			EC.danmu.add(t,y,c,'','');
		}
	},
};
$(function(){
	EC.start();
	EC.ecList();
})