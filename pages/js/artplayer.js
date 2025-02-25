/*!
 * artplayer.js v5.0.9
 * Github: https://github.com/zhw2590582/ArtPlayer
 * (c) 2017-2023 Harvey Zack
 * Released under the MIT License.
 */
!(function (e, t, r, a, o) {
  var n =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : {},
    i = "function" == typeof n[a] && n[a],
    s = i.cache || {},
    l =
      "undefined" != typeof module &&
      "function" == typeof module.require &&
      module.require.bind(module);
  function c(t, r) {
    if (!s[t]) {
      if (!e[t]) {
        var o = "function" == typeof n[a] && n[a];
        if (!r && o) return o(t, !0);
        if (i) return i(t, !0);
        if (l && "string" == typeof t) return l(t);
        var p = new Error("Cannot find module '" + t + "'");
        throw ((p.code = "MODULE_NOT_FOUND"), p);
      }
      (d.resolve = function (r) {
        var a = e[t][1][r];
        return null != a ? a : r;
      }),
        (d.cache = {});
      var u = (s[t] = new c.Module(t));
      e[t][0].call(u.exports, d, u, u.exports, this);
    }
    return s[t].exports;
    function d(e) {
      var t = d.resolve(e);
      return !1 === t ? {} : c(t);
    }
  }
  (c.isParcelRequire = !0),
    (c.Module = function (e) {
      (this.id = e), (this.bundle = c), (this.exports = {});
    }),
    (c.modules = e),
    (c.cache = s),
    (c.parent = i),
    (c.register = function (t, r) {
      e[t] = [
        function (e, t) {
          t.exports = r;
        },
        {},
      ];
    }),
    Object.defineProperty(c, "root", {
      get: function () {
        return n[a];
      },
    }),
    (n[a] = c);
  for (var p = 0; p < t.length; p++) c(t[p]);
  if (r) {
    var u = c(r);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = u)
      : "function" == typeof define &&
        define.amd &&
        define(function () {
          return u;
        });
  }
})(
  {
    "5lTcX": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("bundle-text:./style/index.less"),
          n = a.interopDefault(o),
          i = e("option-validator"),
          s = a.interopDefault(i),
          l = e("./utils/emitter"),
          c = a.interopDefault(l),
          p = e("./utils"),
          u = e("./scheme"),
          d = a.interopDefault(u),
          f = e("./config"),
          h = a.interopDefault(f),
          m = e("./template"),
          g = a.interopDefault(m),
          v = e("./i18n"),
          y = a.interopDefault(v),
          b = e("./player"),
          x = a.interopDefault(b),
          w = e("./control"),
          j = a.interopDefault(w),
          k = e("./contextmenu"),
          S = a.interopDefault(k),
          I = e("./info"),
          C = a.interopDefault(I),
          P = e("./subtitle"),
          $ = a.interopDefault(P),
          M = e("./events"),
          T = a.interopDefault(M),
          E = e("./hotkey"),
          F = a.interopDefault(E),
          A = e("./layer"),
          z = a.interopDefault(A),
          H = e("./loading"),
          D = a.interopDefault(H),
          R = e("./notice"),
          O = a.interopDefault(R),
          L = e("./mask"),
          V = a.interopDefault(L),
          N = e("./icons"),
          Y = a.interopDefault(N),
          _ = e("./setting"),
          W = a.interopDefault(_),
          q = e("./storage"),
          B = a.interopDefault(q),
          U = e("./plugins"),
          K = a.interopDefault(U);
        let G = 0;
        const Z = [];
        class X extends c.default {
          constructor(e, t) {
            super(), (this.id = ++G);
            const r = p.mergeDeep(X.option, e);
            if (
              ((r.container = e.container),
              (this.option = (0, s.default)(r, d.default)),
              (this.isLock = !1),
              (this.isReady = !1),
              (this.isFocus = !1),
              (this.isInput = !1),
              (this.isRotate = !1),
              (this.isDestroy = !1),
              (this.template = new (0, g.default)(this)),
              (this.events = new (0, T.default)(this)),
              (this.storage = new (0, B.default)(this)),
              (this.icons = new (0, Y.default)(this)),
              (this.i18n = new (0, y.default)(this)),
              (this.notice = new (0, O.default)(this)),
              (this.player = new (0, x.default)(this)),
              (this.layers = new (0, z.default)(this)),
              (this.controls = new (0, j.default)(this)),
              (this.contextmenu = new (0, S.default)(this)),
              (this.subtitle = new (0, $.default)(this)),
              (this.info = new (0, C.default)(this)),
              (this.loading = new (0, D.default)(this)),
              (this.hotkey = new (0, F.default)(this)),
              (this.mask = new (0, V.default)(this)),
              (this.setting = new (0, W.default)(this)),
              (this.plugins = new (0, K.default)(this)),
              "function" == typeof t &&
                this.on("ready", () => t.call(this, this)),
              X.DEBUG)
            ) {
              const e = (e) => console.log(`[ART.${this.id}] -> ${e}`);
              e("Version@" + X.version),
                e("Env@" + X.env),
                e("Build@" + X.build);
              for (let t = 0; t < h.default.events.length; t++)
                this.on("video:" + h.default.events[t], (t) =>
                  e("Event@" + t.type)
                );
            }
            Z.push(this);
          }
          static get instances() {
            return Z;
          }
          static get version() {
            return "5.0.9";
          }
          static get env() {
            return "production";
          }
          static get build() {
            return "2023-05-14 11:10:25";
          }
          static get config() {
            return h.default;
          }
          static get utils() {
            return p;
          }
          static get scheme() {
            return d.default;
          }
          static get Emitter() {
            return c.default;
          }
          static get validator() {
            return s.default;
          }
          static get kindOf() {
            return s.default.kindOf;
          }
          static get html() {
            return g.default.html;
          }
          static get option() {
            return {
              id: "",
              container: "#artplayer",
              url: "",
              poster: "",
              type: "",
              theme: "#f00",
              volume: 0.7,
              isLive: !1,
              muted: !1,
              autoplay: !1,
              autoSize: !1,
              autoMini: !1,
              loop: !1,
              flip: !1,
              playbackRate: !1,
              aspectRatio: !1,
              screenshot: !1,
              setting: !1,
              hotkey: !0,
              pip: !1,
              mutex: !0,
              backdrop: !0,
              fullscreen: !1,
              fullscreenWeb: !1,
              subtitleOffset: !1,
              miniProgressBar: !1,
              useSSR: !1,
              playsInline: !0,
              lock: !1,
              fastForward: !1,
              autoPlayback: !1,
              autoOrientation: !1,
              airplay: !1,
              layers: [],
              contextmenu: [],
              controls: [],
              settings: [],
              quality: [],
              highlight: [],
              plugins: [],
              thumbnails: {
                url: "",
                number: 60,
                column: 10,
                width: 0,
                height: 0,
              },
              subtitle: {
                url: "",
                type: "",
                style: {},
                escape: !0,
                encoding: "utf-8",
                onVttLoad: (e) => e,
              },
              moreVideoAttr: {
                controls: !1,
                preload: p.isSafari ? "auto" : "metadata",
              },
              i18n: {},
              icons: {},
              cssVar: {},
              customType: {},
              lang: navigator.language.toLowerCase(),
            };
          }
          get proxy() {
            return this.events.proxy;
          }
          get query() {
            return this.template.query;
          }
          get video() {
            return this.template.$video;
          }
          destroy(e = !0) {
            this.events.destroy(),
              this.template.destroy(e),
              Z.splice(Z.indexOf(this), 1),
              (this.isDestroy = !0),
              this.emit("destroy");
          }
        }
        if (
          ((r.default = X),
          (X.DEBUG = !1),
          (X.CONTEXTMENU = !0),
          (X.NOTICE_TIME = 2e3),
          (X.SETTING_WIDTH = 250),
          (X.SETTING_ITEM_WIDTH = 200),
          (X.SETTING_ITEM_HEIGHT = 35),
          (X.RESIZE_TIME = 200),
          (X.SCROLL_TIME = 200),
          (X.SCROLL_GAP = 50),
          (X.AUTO_PLAYBACK_MAX = 10),
          (X.AUTO_PLAYBACK_MIN = 5),
          (X.AUTO_PLAYBACK_TIMEOUT = 3e3),
          (X.RECONNECT_TIME_MAX = 5),
          (X.RECONNECT_SLEEP_TIME = 1e3),
          (X.CONTROL_HIDE_TIME = 3e3),
          (X.DBCLICK_TIME = 300),
          (X.DBCLICK_FULLSCREEN = !0),
          (X.MOBILE_DBCLICK_PLAY = !0),
          (X.MOBILE_CLICK_PLAY = !1),
          (X.AUTO_ORIENTATION_TIME = 200),
          (X.INFO_LOOP_TIME = 1e3),
          (X.FAST_FORWARD_VALUE = 3),
          (X.FAST_FORWARD_TIME = 1e3),
          (X.TOUCH_MOVE_RATIO = 0.5),
          (X.VOLUME_STEP = 0.1),
          (X.SEEK_STEP = 5),
          (X.PLAYBACK_RATE = [0.5, 0.75, 1, 1.25, 1.5, 2]),
          (X.ASPECT_RATIO = ["default", "4:3", "16:9"]),
          (X.FLIP = ["normal", "horizontal", "vertical"]),
          (X.FULLSCREEN_WEB_IN_BODY = !1),
          "undefined" != typeof document &&
            !document.getElementById("artplayer-style"))
        ) {
          const e = p.createElement("style");
          (e.id = "artplayer-style"),
            (e.textContent = n.default),
            document.head.appendChild(e);
        }
        "undefined" != typeof window && (window.Artplayer = X),
          console.log(
            `%c ArtPlayer %c ${X.version} %c https://artplayer.org`,
            "color: #fff; background: #5f5f5f",
            "color: #fff; background: #4bc729",
            ""
          );
      },
      {
        "bundle-text:./style/index.less": "0016T",
        "option-validator": "bAWi2",
        "./utils/emitter": "66mFZ",
        "./utils": "71aH7",
        "./scheme": "AKEiO",
        "./config": "lyjeQ",
        "./template": "X13Zf",
        "./i18n": "3jKkj",
        "./player": "a90nx",
        "./control": "8Z0Uf",
        "./contextmenu": "2KYsr",
        "./info": "02ajl",
        "./subtitle": "eSWto",
        "./events": "jo4S1",
        "./hotkey": "6NoFy",
        "./layer": "6G6hZ",
        "./loading": "3dsEe",
        "./notice": "dWGTw",
        "./mask": "5POkG",
        "./icons": "6OeNg",
        "./setting": "3eYNH",
        "./storage": "2aaJe",
        "./plugins": "8MTUM",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "0016T": [
      function (e, t, r) {
        t.exports =
          '.art-video-player{--art-theme:red;--art-font-color:#fff;--art-background-color:#000;--art-text-shadow-color:#00000080;--art-transition-duration:.2s;--art-padding:10px;--art-border-radius:3px;--art-progress-height:6px;--art-progress-color:#fff3;--art-hover-color:#ffffff80;--art-loaded-color:#fff3;--art-loop-color:#ffffffbf;--art-state-size:80px;--art-state-opacity:.8;--art-bottom-height:100px;--art-bottom-offset:20px;--art-bottom-gap:5px;--art-highlight-width:8px;--art-highlight-color:#ffffff80;--art-loop-width:2px;--art-control-height:46px;--art-control-opacity:.75;--art-control-icon-size:36px;--art-control-icon-scale:1.1;--art-volume-height:120px;--art-volume-handle-size:14px;--art-lock-size:36px;--art-indicator-scale:0;--art-indicator-size:16px;--art-fullscreen-web-index:9999;--art-settings-icon-size:24px;--art-settings-max-height:300px;--art-selector-max-height:300px;--art-contextmenus-min-width:250px;--art-subtitle-font-size:20px;--art-subtitle-gap:5px;--art-subtitle-bottom:15px;--art-subtitle-border:#000;--art-widget-background:#000000d9;--art-tip-background:#00000080;--art-scrollbar-size:4px;--art-scrollbar-background:#ffffff40;--art-scrollbar-background-hover:#ffffff80;--art-mini-progress-height:2px}.art-bg-cover{background-position:50%;background-repeat:no-repeat;background-size:cover}.art-bottom-gradient{background-image:linear-gradient(#0000,#0006,#000);background-position:bottom;background-repeat:repeat-x}.art-backdrop-filter{-webkit-backdrop-filter:saturate(180%)blur(20px);backdrop-filter:saturate(180%)blur(20px);background-color:#000000bf!important}.art-truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.art-video-player{width:100%;height:100%;zoom:1;text-align:left;direction:ltr;user-select:none;box-sizing:border-box;color:var(--art-font-color);background-color:var(--art-background-color);text-shadow:0 0 2px var(--art-text-shadow-color);-webkit-tap-highlight-color:#0000;-ms-touch-action:manipulation;touch-action:manipulation;-ms-high-contrast-adjust:none;outline:0;margin:0 auto;padding:0;font-family:PingFang SC,Helvetica Neue,Microsoft YaHei,Roboto,Arial,sans-serif;font-size:14px;line-height:1.3;position:relative}.art-video-player *,.art-video-player :before,.art-video-player :after{box-sizing:border-box;margin:0;padding:0}.art-video-player ::-webkit-scrollbar{width:var(--art-scrollbar-size);height:var(--art-scrollbar-size)}.art-video-player ::-webkit-scrollbar-thumb{background-color:var(--art-scrollbar-background)}.art-video-player ::-webkit-scrollbar-thumb:hover{background-color:var(--art-scrollbar-background-hover)}.art-video-player img{max-width:100%;vertical-align:top}.art-video-player svg{fill:var(--art-font-color)}.art-video-player a{color:var(--art-font-color);text-decoration:none}.art-icon{justify-content:center;align-items:center;line-height:1;display:flex}.art-video-player.art-backdrop .art-contextmenus,.art-video-player.art-backdrop .art-info,.art-video-player.art-backdrop .art-settings,.art-video-player.art-backdrop .art-layer-auto-playback,.art-video-player.art-backdrop .art-selector-list,.art-video-player.art-backdrop .art-volume-inner{-webkit-backdrop-filter:saturate(180%)blur(20px);backdrop-filter:saturate(180%)blur(20px);background-color:#000000bf!important}.art-video{z-index:10;width:100%;height:100%;cursor:pointer;position:absolute;inset:0}.art-poster{z-index:11;width:100%;height:100%;pointer-events:none;background-position:50%;background-repeat:no-repeat;background-size:cover;position:absolute;inset:0}.art-video-player .art-subtitle{z-index:20;width:100%;text-align:center;pointer-events:none;justify-content:center;align-items:center;gap:var(--art-subtitle-gap);bottom:var(--art-subtitle-bottom);font-size:var(--art-subtitle-font-size);transition:bottom var(--art-transition-duration)ease;text-shadow:var(--art-subtitle-border)1px 0 1px,var(--art-subtitle-border)0 1px 1px,var(--art-subtitle-border)-1px 0 1px,var(--art-subtitle-border)0 -1px 1px,var(--art-subtitle-border)1px 1px 1px,var(--art-subtitle-border)-1px -1px 1px,var(--art-subtitle-border)1px -1px 1px,var(--art-subtitle-border)-1px 1px 1px;flex-direction:column;padding:0 5%;display:none;position:absolute}.art-video-player.art-subtitle-show .art-subtitle{display:flex}.art-video-player.art-control-show .art-subtitle{bottom:calc(var(--art-control-height) + var(--art-subtitle-bottom))}.art-danmuku{z-index:30;width:100%;height:100%;pointer-events:none;position:absolute;inset:0;overflow:hidden}.art-video-player .art-layers{z-index:40;width:100%;height:100%;pointer-events:none;display:none;position:absolute;inset:0}.art-video-player .art-layers .art-layer{pointer-events:auto}.art-video-player.art-layer-show .art-layers{display:flex}.art-video-player .art-mask{z-index:50;width:100%;height:100%;pointer-events:none;justify-content:center;align-items:center;display:flex;position:absolute;inset:0}.art-video-player .art-mask .art-state{opacity:0;width:var(--art-state-size);height:var(--art-state-size);transition:all var(--art-transition-duration)ease;justify-content:center;align-items:center;display:flex;transform:scale(2)}.art-video-player.art-mask-show .art-state{cursor:pointer;pointer-events:auto;opacity:var(--art-state-opacity);transform:scale(1)}.art-video-player.art-loading-show .art-state{display:none}.art-video-player .art-loading{z-index:70;width:100%;height:100%;pointer-events:none;justify-content:center;align-items:center;display:none;position:absolute;inset:0}.art-video-player.art-loading-show .art-loading{display:flex}.art-video-player .art-bottom{z-index:60;width:100%;height:100%;opacity:0;pointer-events:none;justify-content:flex-end;gap:var(--art-bottom-gap);padding:0 var(--art-padding);transition:opacity var(--art-transition-duration)ease;background-size:100% var(--art-bottom-height);background-image:linear-gradient(#0000,#0006,#000);background-position:bottom;background-repeat:repeat-x;flex-direction:column;display:flex;position:absolute;inset:0;overflow:hidden}.art-video-player .art-bottom .art-controls,.art-video-player .art-bottom .art-progress{transform:translateY(var(--art-bottom-offset));transition:transform var(--art-transition-duration)ease}.art-video-player.art-control-show .art-bottom,.art-video-player.art-hover .art-bottom{opacity:1}.art-video-player.art-control-show .art-bottom .art-controls,.art-video-player.art-hover .art-bottom .art-controls,.art-video-player.art-control-show .art-bottom .art-progress,.art-video-player.art-hover .art-bottom .art-progress{transform:translateY(0)}.art-bottom .art-progress{z-index:0;pointer-events:auto;position:relative}.art-bottom .art-progress .art-control-progress{cursor:pointer;height:var(--art-progress-height);justify-content:center;align-items:center;display:flex;position:relative}.art-bottom .art-progress .art-control-progress .art-control-progress-inner{height:50%;width:100%;transition:height var(--art-transition-duration)ease;background-color:var(--art-progress-color);align-items:center;display:flex;position:relative}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-hover{z-index:0;width:100%;height:100%;width:0%;background-color:var(--art-hover-color);display:none;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-loaded{z-index:10;width:100%;height:100%;width:0%;background-color:var(--art-loaded-color);position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-played{z-index:20;width:100%;height:100%;width:0%;background-color:var(--art-theme);position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight{z-index:30;width:100%;height:100%;pointer-events:none;position:absolute;inset:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-highlight span{z-index:0;width:100%;height:100%;pointer-events:auto;width:var(--art-highlight-width);transform:translateX(calc(var(--art-highlight-width)/-2));background-color:var(--art-highlight-color);position:absolute;inset:0 auto 0 0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator{z-index:40;width:var(--art-indicator-size);height:var(--art-indicator-size);transform:scale(var(--art-indicator-scale));margin-left:calc(var(--art-indicator-size)/-2);transition:transform var(--art-transition-duration)ease;border-radius:50%;justify-content:center;align-items:center;display:flex;position:absolute;left:0}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator .art-icon{width:100%;height:100%;pointer-events:none}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:hover{transform:scale(1.2)!important}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator:active{transform:scale(1)!important}.art-bottom .art-progress .art-control-progress .art-control-progress-inner .art-progress-tip{z-index:50;border-radius:var(--art-border-radius);white-space:nowrap;background-color:var(--art-tip-background);padding:3px 5px;font-size:12px;line-height:1;display:none;position:absolute;top:-25px;left:0}.art-bottom .art-progress .art-control-progress:hover .art-control-progress-inner{height:100%}.art-bottom .art-progress .art-control-thumbnails{border-radius:var(--art-border-radius);pointer-events:none;background-color:var(--art-widget-background);display:none;position:absolute;bottom:10px;left:0;box-shadow:0 1px 3px #0003,0 1px 2px -1px #0003}.art-bottom .art-progress .art-control-loop{z-index:0;width:100%;height:100%;pointer-events:none;display:none;position:absolute;inset:0}.art-bottom .art-progress .art-control-loop .art-loop-point{z-index:0;width:100%;height:100%;width:var(--art-loop-width);background-color:var(--art-loop-color);transform:translateX(calc(var(--art-loop-width)/-2))scaleY(1.5);position:absolute;inset:0 0 0 0%}.art-bottom:hover .art-progress .art-control-progress .art-control-progress-inner .art-progress-indicator{transform:scale(1)}.art-controls{z-index:10;pointer-events:auto;height:var(--art-control-height);justify-content:space-between;align-items:center;display:flex;position:relative}.art-controls .art-controls-left,.art-controls .art-controls-right{height:100%;display:flex}.art-controls .art-controls-center{height:100%;flex:1;justify-content:center;align-items:center;padding:0 10px;display:none}.art-controls .art-controls-right{justify-content:flex-end}.art-controls .art-control{cursor:pointer;white-space:nowrap;opacity:var(--art-control-opacity);min-height:var(--art-control-height);min-width:var(--art-control-height);transition:opacity var(--art-transition-duration)ease;flex-shrink:0;justify-content:center;align-items:center;display:flex}.art-controls .art-control .art-icon{height:var(--art-control-icon-size);width:var(--art-control-icon-size);transform:scale(var(--art-control-icon-scale));transition:transform var(--art-transition-duration)ease}.art-controls .art-control .art-icon:active{transform:scale(calc(var(--art-control-icon-scale)*.8))}.art-controls .art-control:hover{opacity:1}.art-control-volume{position:relative}.art-control-volume .art-volume-panel{text-align:center;cursor:default;opacity:0;pointer-events:none;left:0;right:0;bottom:var(--art-control-height);width:var(--art-control-height);height:var(--art-volume-height);transition:all var(--art-transition-duration)ease;justify-content:center;align-items:center;padding:0 5px;font-size:12px;display:flex;position:absolute;transform:translateY(10px)}.art-control-volume .art-volume-panel .art-volume-inner{height:100%;width:100%;border-radius:var(--art-border-radius);background-color:var(--art-widget-background);flex-direction:column;align-items:center;gap:10px;padding:10px 0 12px;display:flex}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider{width:100%;cursor:pointer;flex:1;justify-content:center;display:flex;position:relative}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle{width:2px;border-radius:var(--art-border-radius);background-color:#ffffff40;justify-content:center;display:flex;position:relative;overflow:hidden}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-handle .art-volume-loaded{z-index:0;width:100%;height:100%;background-color:var(--art-theme);position:absolute;inset:0}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider .art-volume-indicator{width:var(--art-volume-handle-size);height:var(--art-volume-handle-size);margin-top:calc(var(--art-volume-handle-size)/-2);background-color:var(--art-theme);transition:transform var(--art-transition-duration)ease;border-radius:100%;flex-shrink:0;position:absolute;transform:scale(1)}.art-control-volume .art-volume-panel .art-volume-inner .art-volume-slider:active .art-volume-indicator{transform:scale(.9)}.art-control-volume:hover .art-volume-panel{opacity:1;pointer-events:auto;transform:translateY(0)}.art-video-player .art-notice{z-index:80;width:100%;height:100%;height:auto;padding:var(--art-padding);pointer-events:none;display:none;position:absolute;inset:0 0 auto}.art-video-player .art-notice .art-notice-inner{border-radius:var(--art-border-radius);background-color:var(--art-tip-background);padding:5px;line-height:1;display:inline-flex}.art-video-player.art-notice-show .art-notice{display:flex}.art-video-player .art-contextmenus{z-index:120;border-radius:var(--art-border-radius);background-color:var(--art-widget-background);min-width:var(--art-contextmenus-min-width);flex-direction:column;padding:5px 0;font-size:12px;display:none;position:absolute}.art-video-player .art-contextmenus .art-contextmenu{cursor:pointer;border-bottom:1px solid #ffffff1a;padding:10px 15px;display:flex}.art-video-player .art-contextmenus .art-contextmenu span{padding:0 8px}.art-video-player .art-contextmenus .art-contextmenu span:hover,.art-video-player .art-contextmenus .art-contextmenu span.art-current{color:var(--art-theme)}.art-video-player .art-contextmenus .art-contextmenu:hover{background-color:#ffffff1a}.art-video-player .art-contextmenus .art-contextmenu:last-child{border-bottom:none}.art-video-player.art-contextmenu-show .art-contextmenus{display:flex}.art-video-player .art-settings{z-index:90;border-radius:var(--art-border-radius);transform-origin:100% 100%;max-height:var(--art-settings-max-height);left:auto;right:var(--art-padding);bottom:var(--art-control-height);transform:scale(var(--art-settings-scale));transition:all var(--art-transition-duration)ease;background-color:var(--art-widget-background);flex-direction:column;display:none;position:absolute;overflow:hidden auto}.art-video-player .art-settings .art-setting-panel{flex-direction:column;display:none}.art-video-player .art-settings .art-setting-panel.art-current{display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item{cursor:pointer;transition:background-color var(--art-transition-duration)ease;justify-content:space-between;align-items:center;padding:0 5px;display:flex;overflow:hidden}.art-video-player .art-settings .art-setting-panel .art-setting-item:hover{background-color:#ffffff1a}.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current{color:var(--art-theme)}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-icon-check{visibility:hidden;height:15px}.art-video-player .art-settings .art-setting-panel .art-setting-item.art-current .art-icon-check{visibility:visible}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left{justify-content:center;align-items:center;gap:5px;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-left .art-setting-item-left-icon{height:var(--art-settings-icon-size);width:var(--art-settings-icon-size);justify-content:center;align-items:center;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right{justify-content:center;align-items:center;gap:5px;font-size:12px;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-tooltip{white-space:nowrap;color:#ffffff80}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-item-right-icon{min-width:32px;height:24px;justify-content:center;align-items:center;display:flex}.art-video-player .art-settings .art-setting-panel .art-setting-item .art-setting-item-right .art-setting-range{height:3px;width:80px;appearance:none;background-color:#fff3;outline:none}.art-video-player .art-settings .art-setting-panel .art-setting-item-back{border-bottom:1px solid #ffffff1a}.art-video-player.art-setting-show .art-settings{display:flex}.art-video-player .art-info{left:var(--art-padding);top:var(--art-padding);z-index:100;border-radius:var(--art-border-radius);background-color:var(--art-widget-background);padding:10px;font-size:12px;display:none;position:absolute}.art-video-player .art-info .art-info-panel{flex-direction:column;gap:5px;display:flex}.art-video-player .art-info .art-info-panel .art-info-item{align-items:center;gap:5px;display:flex}.art-video-player .art-info .art-info-panel .art-info-item .art-info-title{width:100px;text-align:right}.art-video-player .art-info .art-info-panel .art-info-item .art-info-content{width:250px;text-overflow:ellipsis;white-space:nowrap;user-select:all;overflow:hidden}.art-video-player .art-info .art-info-close{cursor:pointer;position:absolute;top:5px;right:5px}.art-video-player.art-info-show .art-info{display:flex}.art-hide-cursor *{cursor:none!important}.art-video-player[data-aspect-ratio]{overflow:hidden}.art-video-player[data-aspect-ratio] .art-video{object-fit:fill;box-sizing:content-box}.art-fullscreen{--art-control-height:60px;--art-control-icon-scale:1.3}.art-fullscreen-web{--art-control-height:60px;--art-control-icon-scale:1.3;z-index:var(--art-fullscreen-web-index);width:100%;height:100%;position:fixed;inset:0}.art-mini-popup{z-index:9999;width:320px;height:180px;border-radius:var(--art-border-radius);cursor:move;user-select:none;background:#000;transition:opacity .2s;position:fixed;overflow:hidden;box-shadow:0 0 5px #00000080}.art-mini-popup svg{fill:#fff}.art-mini-popup .art-video{pointer-events:none}.art-mini-popup .art-mini-close{z-index:20;cursor:pointer;opacity:0;transition:opacity .2s;position:absolute;top:10px;right:10px}.art-mini-popup .art-mini-state{z-index:30;width:100%;height:100%;pointer-events:none;opacity:0;background-color:#00000040;justify-content:center;align-items:center;transition:opacity .2s;display:flex;position:absolute;inset:0}.art-mini-popup .art-mini-state .art-icon{opacity:.75;cursor:pointer;pointer-events:auto;transition:transform .2s;transform:scale(3)}.art-mini-popup .art-mini-state .art-icon:active{transform:scale(2.5)}.art-mini-popup.art-mini-droging{opacity:.9}.art-mini-popup:hover .art-mini-close,.art-mini-popup:hover .art-mini-state{opacity:1}.art-video-player[data-flip=horizontal] .art-video{transform:scaleX(-1)}.art-video-player[data-flip=vertical] .art-video{transform:scaleY(-1)}.art-video-player .art-layer-mini-progress-bar{z-index:0;width:100%;height:100%;height:var(--art-mini-progress-height);background-color:var(--art-theme);display:flex;position:absolute;inset:auto 0 0}.art-video-player .art-layer-lock{height:var(--art-lock-size);width:var(--art-lock-size);top:50%;left:var(--art-padding);background-color:var(--art-tip-background);border-radius:50%;justify-content:center;align-items:center;display:none;position:absolute;transform:translateY(-50%)}.art-video-player .art-layer-auto-playback{border-radius:var(--art-border-radius);left:var(--art-padding);bottom:calc(var(--art-control-height) + var(--art-bottom-gap) + 10px);background-color:var(--art-widget-background);align-items:center;gap:10px;padding:10px;line-height:1;display:none;position:absolute}.art-video-player .art-layer-auto-playback .art-auto-playback-close{cursor:pointer;justify-content:center;align-items:center;display:flex}.art-video-player .art-layer-auto-playback .art-auto-playback-close svg{width:15px;height:15px;fill:var(--art-theme)}.art-video-player .art-layer-auto-playback .art-auto-playback-jump{color:var(--art-theme);cursor:pointer}.art-video-player.art-lock .art-bottom{display:none!important}.art-video-player.art-lock .art-subtitle{bottom:var(--art-subtitle-bottom)!important}.art-video-player.art-lock .art-layer-mini-progress-bar{display:flex!important}.art-video-player.art-control-show .art-layer-mini-progress-bar{display:none}.art-video-player.art-control-show .art-layer-lock{display:flex}.art-control-selector{position:relative}.art-control-selector .art-selector-list{text-align:center;border-radius:var(--art-border-radius);opacity:0;pointer-events:none;bottom:var(--art-control-height);max-height:var(--art-selector-max-height);background-color:var(--art-widget-background);transition:all var(--art-transition-duration)ease;flex-direction:column;align-items:center;display:flex;position:absolute;overflow:hidden auto;transform:translateY(10px)}.art-control-selector .art-selector-list .art-selector-item{width:100%;flex-shrink:0;justify-content:center;align-items:center;padding:10px 15px;line-height:1;display:flex}.art-control-selector .art-selector-list .art-selector-item:hover{background-color:#ffffff1a}.art-control-selector .art-selector-list .art-selector-item:hover,.art-control-selector .art-selector-list .art-selector-item.art-current{color:var(--art-theme)}.art-control-selector:hover .art-selector-list{opacity:1;pointer-events:auto;transform:translateY(0)}[class*=hint--]{font-style:normal;display:inline-block;position:relative}[class*=hint--]:before,[class*=hint--]:after{visibility:hidden;opacity:0;z-index:1000000;pointer-events:none;transition:all .3s;position:absolute;transform:translate(0,0)}[class*=hint--]:hover:before,[class*=hint--]:hover:after{visibility:visible;opacity:1;transition-delay:.1s}[class*=hint--]:before{content:"";z-index:1000001;background:0 0;border:6px solid #0000;position:absolute}[class*=hint--]:after{color:#fff;white-space:nowrap;background:#000;padding:8px 10px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:12px;line-height:12px}[class*=hint--][aria-label]:after{content:attr(aria-label)}[class*=hint--][data-hint]:after{content:attr(data-hint)}[aria-label=""]:before,[aria-label=""]:after,[data-hint=""]:before,[data-hint=""]:after{display:none!important}.hint--top-left:before,.hint--top-right:before,.hint--top:before{border-top-color:#000}.hint--bottom-left:before,.hint--bottom-right:before,.hint--bottom:before{border-bottom-color:#000}.hint--left:before{border-left-color:#000}.hint--right:before{border-right-color:#000}.hint--top:before{margin-bottom:-11px}.hint--top:before,.hint--top:after{bottom:100%;left:50%}.hint--top:before{left:calc(50% - 6px)}.hint--top:after{transform:translate(-50%)}.hint--top:hover:before{transform:translateY(-8px)}.hint--top:hover:after{transform:translate(-50%)translateY(-8px)}.hint--bottom:before{margin-top:-11px}.hint--bottom:before,.hint--bottom:after{top:100%;left:50%}.hint--bottom:before{left:calc(50% - 6px)}.hint--bottom:after{transform:translate(-50%)}.hint--bottom:hover:before{transform:translateY(8px)}.hint--bottom:hover:after{transform:translate(-50%)translateY(8px)}.hint--right:before{margin-bottom:-6px;margin-left:-11px}.hint--right:after{margin-bottom:-14px}.hint--right:before,.hint--right:after{bottom:50%;left:100%}.hint--right:hover:before,.hint--right:hover:after{transform:translate(8px)}.hint--left:before{margin-bottom:-6px;margin-right:-11px}.hint--left:after{margin-bottom:-14px}.hint--left:before,.hint--left:after{bottom:50%;right:100%}.hint--left:hover:before,.hint--left:hover:after{transform:translate(-8px)}.hint--top-left:before{margin-bottom:-11px}.hint--top-left:before,.hint--top-left:after{bottom:100%;left:50%}.hint--top-left:before{left:calc(50% - 6px)}.hint--top-left:after{margin-left:12px;transform:translate(-100%)}.hint--top-left:hover:before{transform:translateY(-8px)}.hint--top-left:hover:after{transform:translate(-100%)translateY(-8px)}.hint--top-right:before{margin-bottom:-11px}.hint--top-right:before,.hint--top-right:after{bottom:100%;left:50%}.hint--top-right:before{left:calc(50% - 6px)}.hint--top-right:after{margin-left:-12px;transform:translate(0)}.hint--top-right:hover:before,.hint--top-right:hover:after{transform:translateY(-8px)}.hint--bottom-left:before{margin-top:-11px}.hint--bottom-left:before,.hint--bottom-left:after{top:100%;left:50%}.hint--bottom-left:before{left:calc(50% - 6px)}.hint--bottom-left:after{margin-left:12px;transform:translate(-100%)}.hint--bottom-left:hover:before{transform:translateY(8px)}.hint--bottom-left:hover:after{transform:translate(-100%)translateY(8px)}.hint--bottom-right:before{margin-top:-11px}.hint--bottom-right:before,.hint--bottom-right:after{top:100%;left:50%}.hint--bottom-right:before{left:calc(50% - 6px)}.hint--bottom-right:after{margin-left:-12px;transform:translate(0)}.hint--bottom-right:hover:before,.hint--bottom-right:hover:after{transform:translateY(8px)}.hint--small:after,.hint--medium:after,.hint--large:after{white-space:normal;word-wrap:break-word;line-height:1.4em}.hint--small:after{width:80px}.hint--medium:after{width:150px}.hint--large:after{width:300px}[class*=hint--]:after{text-shadow:0 -1px #000;box-shadow:4px 4px 8px #0000004d}.hint--error:after{text-shadow:0 -1px #592726;background-color:#b34e4d}.hint--error.hint--top-left:before,.hint--error.hint--top-right:before,.hint--error.hint--top:before{border-top-color:#b34e4d}.hint--error.hint--bottom-left:before,.hint--error.hint--bottom-right:before,.hint--error.hint--bottom:before{border-bottom-color:#b34e4d}.hint--error.hint--left:before{border-left-color:#b34e4d}.hint--error.hint--right:before{border-right-color:#b34e4d}.hint--warning:after{text-shadow:0 -1px #6c5328;background-color:#c09854}.hint--warning.hint--top-left:before,.hint--warning.hint--top-right:before,.hint--warning.hint--top:before{border-top-color:#c09854}.hint--warning.hint--bottom-left:before,.hint--warning.hint--bottom-right:before,.hint--warning.hint--bottom:before{border-bottom-color:#c09854}.hint--warning.hint--left:before{border-left-color:#c09854}.hint--warning.hint--right:before{border-right-color:#c09854}.hint--info:after{text-shadow:0 -1px #1a3c4d;background-color:#3986ac}.hint--info.hint--top-left:before,.hint--info.hint--top-right:before,.hint--info.hint--top:before{border-top-color:#3986ac}.hint--info.hint--bottom-left:before,.hint--info.hint--bottom-right:before,.hint--info.hint--bottom:before{border-bottom-color:#3986ac}.hint--info.hint--left:before{border-left-color:#3986ac}.hint--info.hint--right:before{border-right-color:#3986ac}.hint--success:after{text-shadow:0 -1px #1a321a;background-color:#458746}.hint--success.hint--top-left:before,.hint--success.hint--top-right:before,.hint--success.hint--top:before{border-top-color:#458746}.hint--success.hint--bottom-left:before,.hint--success.hint--bottom-right:before,.hint--success.hint--bottom:before{border-bottom-color:#458746}.hint--success.hint--left:before{border-left-color:#458746}.hint--success.hint--right:before{border-right-color:#458746}.hint--always:after,.hint--always:before{opacity:1;visibility:visible}.hint--always.hint--top:before{transform:translateY(-8px)}.hint--always.hint--top:after{transform:translate(-50%)translateY(-8px)}.hint--always.hint--top-left:before{transform:translateY(-8px)}.hint--always.hint--top-left:after{transform:translate(-100%)translateY(-8px)}.hint--always.hint--top-right:before,.hint--always.hint--top-right:after{transform:translateY(-8px)}.hint--always.hint--bottom:before{transform:translateY(8px)}.hint--always.hint--bottom:after{transform:translate(-50%)translateY(8px)}.hint--always.hint--bottom-left:before{transform:translateY(8px)}.hint--always.hint--bottom-left:after{transform:translate(-100%)translateY(8px)}.hint--always.hint--bottom-right:before,.hint--always.hint--bottom-right:after{transform:translateY(8px)}.hint--always.hint--left:before,.hint--always.hint--left:after{transform:translate(-8px)}.hint--always.hint--right:before,.hint--always.hint--right:after{transform:translate(8px)}.hint--rounded:after{border-radius:4px}.hint--no-animate:before,.hint--no-animate:after{transition-duration:0s}.hint--bounce:before,.hint--bounce:after{-webkit-transition:opacity .3s,visibility .3s,-webkit-transform .3s cubic-bezier(.71,1.7,.77,1.24);-moz-transition:opacity .3s,visibility .3s,-moz-transform .3s cubic-bezier(.71,1.7,.77,1.24);transition:opacity .3s,visibility .3s,transform .3s cubic-bezier(.71,1.7,.77,1.24)}.hint--no-shadow:before,.hint--no-shadow:after{text-shadow:initial;box-shadow:initial}.hint--no-arrow:before{display:none}.art-video-player.art-mobile{--art-bottom-gap:10px;--art-control-height:38px;--art-control-icon-scale:1;--art-state-size:60px;--art-settings-max-height:180px;--art-selector-max-height:180px;--art-indicator-scale:1;--art-control-opacity:1}.art-video-player.art-mobile .art-controls-left{margin-left:calc(var(--art-padding)/-1)}.art-video-player.art-mobile .art-controls-right{margin-right:calc(var(--art-padding)/-1)}';
      },
      {},
    ],
    bAWi2: [
      function (e, t, r) {
        t.exports = (function () {
          "use strict";
          function e(t) {
            return (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  })(t);
          }
          var t = Object.prototype.toString,
            r = function (r) {
              if (void 0 === r) return "undefined";
              if (null === r) return "null";
              var o = e(r);
              if ("boolean" === o) return "boolean";
              if ("string" === o) return "string";
              if ("number" === o) return "number";
              if ("symbol" === o) return "symbol";
              if ("function" === o)
                return (function (e) {
                  return "GeneratorFunction" === a(e);
                })(r)
                  ? "generatorfunction"
                  : "function";
              if (
                (function (e) {
                  return Array.isArray ? Array.isArray(e) : e instanceof Array;
                })(r)
              )
                return "array";
              if (
                (function (e) {
                  return (
                    !(
                      !e.constructor ||
                      "function" != typeof e.constructor.isBuffer
                    ) && e.constructor.isBuffer(e)
                  );
                })(r)
              )
                return "buffer";
              if (
                (function (e) {
                  try {
                    if (
                      "number" == typeof e.length &&
                      "function" == typeof e.callee
                    )
                      return !0;
                  } catch (e) {
                    if (-1 !== e.message.indexOf("callee")) return !0;
                  }
                  return !1;
                })(r)
              )
                return "arguments";
              if (
                (function (e) {
                  return (
                    e instanceof Date ||
                    ("function" == typeof e.toDateString &&
                      "function" == typeof e.getDate &&
                      "function" == typeof e.setDate)
                  );
                })(r)
              )
                return "date";
              if (
                (function (e) {
                  return (
                    e instanceof Error ||
                    ("string" == typeof e.message &&
                      e.constructor &&
                      "number" == typeof e.constructor.stackTraceLimit)
                  );
                })(r)
              )
                return "error";
              if (
                (function (e) {
                  return (
                    e instanceof RegExp ||
                    ("string" == typeof e.flags &&
                      "boolean" == typeof e.ignoreCase &&
                      "boolean" == typeof e.multiline &&
                      "boolean" == typeof e.global)
                  );
                })(r)
              )
                return "regexp";
              switch (a(r)) {
                case "Symbol":
                  return "symbol";
                case "Promise":
                  return "promise";
                case "WeakMap":
                  return "weakmap";
                case "WeakSet":
                  return "weakset";
                case "Map":
                  return "map";
                case "Set":
                  return "set";
                case "Int8Array":
                  return "int8array";
                case "Uint8Array":
                  return "uint8array";
                case "Uint8ClampedArray":
                  return "uint8clampedarray";
                case "Int16Array":
                  return "int16array";
                case "Uint16Array":
                  return "uint16array";
                case "Int32Array":
                  return "int32array";
                case "Uint32Array":
                  return "uint32array";
                case "Float32Array":
                  return "float32array";
                case "Float64Array":
                  return "float64array";
              }
              if (
                (function (e) {
                  return (
                    "function" == typeof e.throw &&
                    "function" == typeof e.return &&
                    "function" == typeof e.next
                  );
                })(r)
              )
                return "generator";
              switch ((o = t.call(r))) {
                case "[object Object]":
                  return "object";
                case "[object Map Iterator]":
                  return "mapiterator";
                case "[object Set Iterator]":
                  return "setiterator";
                case "[object String Iterator]":
                  return "stringiterator";
                case "[object Array Iterator]":
                  return "arrayiterator";
              }
              return o.slice(8, -1).toLowerCase().replace(/\s/g, "");
            };
          function a(e) {
            return e.constructor ? e.constructor.name : null;
          }
          function o(e, t) {
            var a =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : ["option"];
            return (
              n(e, t, a),
              i(e, t, a),
              (function (e, t, a) {
                var s = r(t),
                  l = r(e);
                if ("object" === s) {
                  if ("object" !== l)
                    throw new Error(
                      "[Type Error]: '"
                        .concat(
                          a.join("."),
                          "' require 'object' type, but got '"
                        )
                        .concat(l, "'")
                    );
                  Object.keys(t).forEach(function (r) {
                    var s = e[r],
                      l = t[r],
                      c = a.slice();
                    c.push(r), n(s, l, c), i(s, l, c), o(s, l, c);
                  });
                }
                if ("array" === s) {
                  if ("array" !== l)
                    throw new Error(
                      "[Type Error]: '"
                        .concat(
                          a.join("."),
                          "' require 'array' type, but got '"
                        )
                        .concat(l, "'")
                    );
                  e.forEach(function (r, s) {
                    var l = e[s],
                      c = t[s] || t[0],
                      p = a.slice();
                    p.push(s), n(l, c, p), i(l, c, p), o(l, c, p);
                  });
                }
              })(e, t, a),
              e
            );
          }
          function n(e, t, a) {
            if ("string" === r(t)) {
              var o = r(e);
              if (
                ("?" === t[0] && (t = t.slice(1) + "|undefined"),
                !(-1 < t.indexOf("|")
                  ? t
                      .split("|")
                      .map(function (e) {
                        return e.toLowerCase().trim();
                      })
                      .filter(Boolean)
                      .some(function (e) {
                        return o === e;
                      })
                  : t.toLowerCase().trim() === o))
              )
                throw new Error(
                  "[Type Error]: '"
                    .concat(a.join("."), "' require '")
                    .concat(t, "' type, but got '")
                    .concat(o, "'")
                );
            }
          }
          function i(e, t, a) {
            if ("function" === r(t)) {
              var o = t(e, r(e), a);
              if (!0 !== o) {
                var n = r(o);
                throw "string" === n
                  ? new Error(o)
                  : "error" === n
                  ? o
                  : new Error(
                      "[Validator Error]: The scheme for '"
                        .concat(
                          a.join("."),
                          "' validator require return true, but got '"
                        )
                        .concat(o, "'")
                    );
              }
            }
          }
          return (o.kindOf = r), o;
        })();
      },
      {},
    ],
    "66mFZ": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        r.default = class {
          on(e, t, r) {
            const a = this.e || (this.e = {});
            return (a[e] || (a[e] = [])).push({ fn: t, ctx: r }), this;
          }
          once(e, t, r) {
            const a = this;
            function o(...n) {
              a.off(e, o), t.apply(r, n);
            }
            return (o._ = t), this.on(e, o, r);
          }
          emit(e, ...t) {
            const r = ((this.e || (this.e = {}))[e] || []).slice();
            for (let e = 0; e < r.length; e += 1) r[e].fn.apply(r[e].ctx, t);
            return this;
          }
          off(e, t) {
            const r = this.e || (this.e = {}),
              a = r[e],
              o = [];
            if (a && t)
              for (let e = 0, r = a.length; e < r; e += 1)
                a[e].fn !== t && a[e].fn._ !== t && o.push(a[e]);
            return o.length ? (r[e] = o) : delete r[e], this;
          }
        };
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "9pCYc": [
      function (e, t, r) {
        (r.interopDefault = function (e) {
          return e && e.__esModule ? e : { default: e };
        }),
          (r.defineInteropFlag = function (e) {
            Object.defineProperty(e, "__esModule", { value: !0 });
          }),
          (r.exportAll = function (e, t) {
            return (
              Object.keys(e).forEach(function (r) {
                "default" === r ||
                  "__esModule" === r ||
                  t.hasOwnProperty(r) ||
                  Object.defineProperty(t, r, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }),
              t
            );
          }),
          (r.export = function (e, t, r) {
            Object.defineProperty(e, t, { enumerable: !0, get: r });
          });
      },
      {},
    ],
    "71aH7": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./dom");
        a.exportAll(o, r);
        var n = e("./error");
        a.exportAll(n, r);
        var i = e("./subtitle");
        a.exportAll(i, r);
        var s = e("./file");
        a.exportAll(s, r);
        var l = e("./property");
        a.exportAll(l, r);
        var c = e("./time");
        a.exportAll(c, r);
        var p = e("./format");
        a.exportAll(p, r);
        var u = e("./compatibility");
        a.exportAll(u, r);
      },
      {
        "./dom": "bSNiV",
        "./error": "hwmZz",
        "./subtitle": "inzwq",
        "./file": "6b7Ip",
        "./property": "5NSdr",
        "./time": "epmNy",
        "./format": "gapRl",
        "./compatibility": "6ZTr6",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    bSNiV: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r),
          a.export(r, "query", () => n),
          a.export(r, "queryAll", () => i),
          a.export(r, "addClass", () => s),
          a.export(r, "removeClass", () => l),
          a.export(r, "hasClass", () => c),
          a.export(r, "append", () => p),
          a.export(r, "remove", () => u),
          a.export(r, "setStyle", () => d),
          a.export(r, "setStyles", () => f),
          a.export(r, "getStyle", () => h),
          a.export(r, "sublings", () => m),
          a.export(r, "inverseClass", () => g),
          a.export(r, "tooltip", () => v),
          a.export(r, "isInViewport", () => y),
          a.export(r, "includeFromEvent", () => b),
          a.export(r, "replaceElement", () => x),
          a.export(r, "createElement", () => w),
          a.export(r, "getIcon", () => j);
        var o = e("./compatibility");
        function n(e, t = document) {
          return t.querySelector(e);
        }
        function i(e, t = document) {
          return Array.from(t.querySelectorAll(e));
        }
        function s(e, t) {
          return e.classList.add(t);
        }
        function l(e, t) {
          return e.classList.remove(t);
        }
        function c(e, t) {
          return e.classList.contains(t);
        }
        function p(e, t) {
          return (
            t instanceof Element
              ? e.appendChild(t)
              : e.insertAdjacentHTML("beforeend", String(t)),
            e.lastElementChild || e.lastChild
          );
        }
        function u(e) {
          return e.parentNode.removeChild(e);
        }
        function d(e, t, r) {
          return (e.style[t] = r), e;
        }
        function f(e, t) {
          for (const r in t) d(e, r, t[r]);
          return e;
        }
        function h(e, t, r = !0) {
          const a = window.getComputedStyle(e, null).getPropertyValue(t);
          return r ? parseFloat(a) : a;
        }
        function m(e) {
          return Array.from(e.parentElement.children).filter((t) => t !== e);
        }
        function g(e, t) {
          m(e).forEach((e) => l(e, t)), s(e, t);
        }
        function v(e, t, r = "top") {
          o.isMobile ||
            (e.setAttribute("aria-label", t),
            s(e, "hint--rounded"),
            s(e, `hint--${r}`));
        }
        function y(e, t = 0) {
          const r = e.getBoundingClientRect(),
            a = window.innerHeight || document.documentElement.clientHeight,
            o = window.innerWidth || document.documentElement.clientWidth,
            n = r.top - t <= a && r.top + r.height + t >= 0,
            i = r.left - t <= o + t && r.left + r.width + t >= 0;
          return n && i;
        }
        function b(e, t) {
          return e.composedPath && e.composedPath().indexOf(t) > -1;
        }
        function x(e, t) {
          return t.parentNode.replaceChild(e, t), e;
        }
        function w(e) {
          return document.createElement(e);
        }
        function j(e = "", t = "") {
          const r = w("i");
          return s(r, "art-icon"), s(r, `art-icon-${e}`), p(r, t), r;
        }
      },
      {
        "./compatibility": "6ZTr6",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6ZTr6": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r),
          a.export(r, "userAgent", () => o),
          a.export(r, "isSafari", () => n),
          a.export(r, "isWechat", () => i),
          a.export(r, "isIE", () => s),
          a.export(r, "isAndroid", () => l),
          a.export(r, "isIOS", () => c),
          a.export(r, "isIOS13", () => p),
          a.export(r, "isMobile", () => u);
        const o = "undefined" != typeof navigator ? navigator.userAgent : "",
          n = /^((?!chrome|android).)*safari/i.test(o),
          i = /MicroMessenger/i.test(o),
          s = /MSIE|Trident/i.test(o),
          l = /android/i.test(o),
          c = /iPad|iPhone|iPod/i.test(o) && !window.MSStream,
          p = c || (o.includes("Macintosh") && navigator.maxTouchPoints >= 1),
          u =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              o
            ) || p;
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    hwmZz: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r),
          a.export(r, "ArtPlayerError", () => o),
          a.export(r, "errorHandle", () => n);
        class o extends Error {
          constructor(e, t) {
            super(e),
              "function" == typeof Error.captureStackTrace &&
                Error.captureStackTrace(this, t || this.constructor),
              (this.name = "ArtPlayerError");
          }
        }
        function n(e, t) {
          if (!e) throw new o(t);
          return e;
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    inzwq: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        function o(e) {
          return "WEBVTT \r\n\r\n".concat(
            ((t = e),
            t.replace(/(\d\d:\d\d:\d\d)[,.](\d+)/g, (e, t, r) => {
              let a = r.slice(0, 3);
              return (
                1 === r.length && (a = r + "00"),
                2 === r.length && (a = r + "0"),
                `${t},${a}`
              );
            }))
              .replace(/\{\\([ibu])\}/g, "</$1>")
              .replace(/\{\\([ibu])1\}/g, "<$1>")
              .replace(/\{([ibu])\}/g, "<$1>")
              .replace(/\{\/([ibu])\}/g, "</$1>")
              .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2")
              .replace(/{[\s\S]*?}/g, "")
              .concat("\r\n\r\n")
          );
          var t;
        }
        function n(e) {
          return URL.createObjectURL(new Blob([e], { type: "text/vtt" }));
        }
        function i(e) {
          const t = new RegExp(
            "Dialogue:\\s\\d,(\\d+:\\d\\d:\\d\\d.\\d\\d),(\\d+:\\d\\d:\\d\\d.\\d\\d),([^,]*),([^,]*),(?:[^,]*,){4}([\\s\\S]*)$",
            "i"
          );
          function r(e = "") {
            return e
              .split(/[:.]/)
              .map((e, t, r) => {
                if (t === r.length - 1) {
                  if (1 === e.length) return `.${e}00`;
                  if (2 === e.length) return `.${e}0`;
                } else if (1 === e.length) return (0 === t ? "0" : ":0") + e;
                return 0 === t ? e : t === r.length - 1 ? `.${e}` : `:${e}`;
              })
              .join("");
          }
          return `WEBVTT\n\n${e
            .split(/\r?\n/)
            .map((e) => {
              const a = e.match(t);
              return a
                ? {
                    start: r(a[1].trim()),
                    end: r(a[2].trim()),
                    text: a[5]
                      .replace(/{[\s\S]*?}/g, "")
                      .replace(/(\\N)/g, "\n")
                      .trim()
                      .split(/\r?\n/)
                      .map((e) => e.trim())
                      .join("\n"),
                  }
                : null;
            })
            .filter((e) => e)
            .map((e, t) =>
              e ? `${t + 1}\n${e.start} --\x3e ${e.end}\n${e.text}` : ""
            )
            .filter((e) => e.trim())
            .join("\n\n")}`;
        }
        a.defineInteropFlag(r),
          a.export(r, "srtToVtt", () => o),
          a.export(r, "vttToBlob", () => n),
          a.export(r, "assToVtt", () => i);
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "6b7Ip": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        function o(e) {
          return e.includes("?")
            ? o(e.split("?")[0])
            : e.includes("#")
            ? o(e.split("#")[0])
            : e.trim().toLowerCase().split(".").pop();
        }
        function n(e, t) {
          const r = document.createElement("a");
          (r.style.display = "none"),
            (r.href = e),
            (r.download = t),
            document.body.appendChild(r),
            r.click(),
            document.body.removeChild(r);
        }
        a.defineInteropFlag(r),
          a.export(r, "getExt", () => o),
          a.export(r, "download", () => n);
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "5NSdr": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r),
          a.export(r, "def", () => o),
          a.export(r, "has", () => i),
          a.export(r, "get", () => s),
          a.export(r, "mergeDeep", () => l);
        const o = Object.defineProperty,
          { hasOwnProperty: n } = Object.prototype;
        function i(e, t) {
          return n.call(e, t);
        }
        function s(e, t) {
          return Object.getOwnPropertyDescriptor(e, t);
        }
        function l(...e) {
          const t = (e) => e && "object" == typeof e && !Array.isArray(e);
          return e.reduce(
            (e, r) => (
              Object.keys(r).forEach((a) => {
                const o = e[a],
                  n = r[a];
                Array.isArray(o) && Array.isArray(n)
                  ? (e[a] = o.concat(...n))
                  : t(o) && t(n)
                  ? (e[a] = l(o, n))
                  : (e[a] = n);
              }),
              e
            ),
            {}
          );
        }
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    epmNy: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        function o(e = 0) {
          return new Promise((t) => setTimeout(t, e));
        }
        function n(e, t) {
          let r;
          return function (...a) {
            clearTimeout(r),
              (r = setTimeout(() => ((r = null), e.apply(this, a)), t));
          };
        }
        function i(e, t) {
          let r = !1;
          return function (...a) {
            r ||
              (e.apply(this, a),
              (r = !0),
              setTimeout(function () {
                r = !1;
              }, t));
          };
        }
        a.defineInteropFlag(r),
          a.export(r, "sleep", () => o),
          a.export(r, "debounce", () => n),
          a.export(r, "throttle", () => i);
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    gapRl: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        function o(e, t, r) {
          return Math.max(Math.min(e, Math.max(t, r)), Math.min(t, r));
        }
        function n(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        function i(e) {
          return ["string", "number"].includes(typeof e);
        }
        function s(e) {
          const t = Math.floor(e / 3600),
            r = Math.floor((e - 3600 * t) / 60),
            a = Math.floor(e - 3600 * t - 60 * r);
          return (t > 0 ? [t, r, a] : [r, a])
            .map((e) => (e < 10 ? `0${e}` : String(e)))
            .join(":");
        }
        function l(e) {
          return e.replace(
            /[&<>'"]/g,
            (e) =>
              ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
              }[e] || e)
          );
        }
        a.defineInteropFlag(r),
          a.export(r, "clamp", () => o),
          a.export(r, "capitalize", () => n),
          a.export(r, "isStringOrNumber", () => i),
          a.export(r, "secondToTime", () => s),
          a.export(r, "escape", () => l);
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    AKEiO: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r), a.export(r, "ComponentOption", () => d);
        var o = e("../utils");
        const n = "array",
          i = "boolean",
          s = "string",
          l = "number",
          c = "object",
          p = "function";
        function u(e, t, r) {
          return (0, o.errorHandle)(
            t === s || t === l || e instanceof Element,
            `${r.join(".")} require '${s}' or 'Element' type`
          );
        }
        const d = {
          html: u,
          disable: `?${i}`,
          name: `?${s}`,
          index: `?${l}`,
          style: `?${c}`,
          click: `?${p}`,
          mounted: `?${p}`,
          tooltip: `?${s}|${l}`,
          width: `?${l}`,
          selector: `?${n}`,
          onSelect: `?${p}`,
          switch: `?${i}`,
          onSwitch: `?${p}`,
          range: `?${n}`,
          onRange: `?${p}`,
          onChange: `?${p}`,
        };
        r.default = {
          id: s,
          container: u,
          url: s,
          poster: s,
          type: s,
          theme: s,
          lang: s,
          volume: l,
          isLive: i,
          muted: i,
          autoplay: i,
          autoSize: i,
          autoMini: i,
          loop: i,
          flip: i,
          playbackRate: i,
          aspectRatio: i,
          screenshot: i,
          setting: i,
          hotkey: i,
          pip: i,
          mutex: i,
          backdrop: i,
          fullscreen: i,
          fullscreenWeb: i,
          subtitleOffset: i,
          miniProgressBar: i,
          useSSR: i,
          playsInline: i,
          lock: i,
          fastForward: i,
          autoPlayback: i,
          autoOrientation: i,
          airplay: i,
          plugins: [p],
          layers: [d],
          contextmenu: [d],
          settings: [d],
          controls: [
            {
              ...d,
              position: (e, t, r) => {
                const a = ["top", "left", "right"];
                return (0, o.errorHandle)(
                  a.includes(e),
                  `${r.join(".")} only accept ${a.toString()} as parameters`
                );
              },
            },
          ],
          quality: [{ default: `?${i}`, html: s, url: s }],
          highlight: [{ time: l, text: s }],
          thumbnails: { url: s, number: l, column: l, width: l, height: l },
          subtitle: {
            url: s,
            type: s,
            style: c,
            escape: i,
            encoding: s,
            onVttLoad: p,
          },
          moreVideoAttr: c,
          i18n: c,
          icons: c,
          cssVar: c,
          customType: c,
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    lyjeQ: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = {
            propertys: [
              "audioTracks",
              "autoplay",
              "buffered",
              "controller",
              "controls",
              "crossOrigin",
              "currentSrc",
              "currentTime",
              "defaultMuted",
              "defaultPlaybackRate",
              "duration",
              "ended",
              "error",
              "loop",
              "mediaGroup",
              "muted",
              "networkState",
              "paused",
              "playbackRate",
              "played",
              "preload",
              "readyState",
              "seekable",
              "seeking",
              "src",
              "startDate",
              "textTracks",
              "videoTracks",
              "volume",
            ],
            methods: ["addTextTrack", "canPlayType", "load", "play", "pause"],
            events: [
              "abort",
              "canplay",
              "canplaythrough",
              "durationchange",
              "emptied",
              "ended",
              "error",
              "loadeddata",
              "loadedmetadata",
              "loadstart",
              "pause",
              "play",
              "playing",
              "progress",
              "ratechange",
              "seeked",
              "seeking",
              "stalled",
              "suspend",
              "timeupdate",
              "volumechange",
              "waiting",
            ],
            prototypes: [
              "width",
              "height",
              "videoWidth",
              "videoHeight",
              "poster",
              "webkitDecodedFrameCount",
              "webkitDroppedFrameCount",
              "playsInline",
              "webkitSupportsFullscreen",
              "webkitDisplayingFullscreen",
              "onenterpictureinpicture",
              "onleavepictureinpicture",
              "disablePictureInPicture",
              "cancelVideoFrameCallback",
              "requestVideoFrameCallback",
              "getVideoPlaybackQuality",
              "requestPictureInPicture",
              "webkitEnterFullScreen",
              "webkitEnterFullscreen",
              "webkitExitFullScreen",
              "webkitExitFullscreen",
            ],
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    X13Zf: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("./utils");
        class o {
          constructor(e) {
            this.art = e;
            const { option: t, constructor: r } = e;
            t.container instanceof Element
              ? (this.$container = t.container)
              : ((this.$container = (0, a.query)(t.container)),
                (0, a.errorHandle)(
                  this.$container,
                  `No container element found by ${t.container}`
                ));
            const o = this.$container.tagName.toLowerCase();
            (0, a.errorHandle)(
              "div" === o,
              `Unsupported container element type, only support 'div' but got '${o}'`
            ),
              (0, a.errorHandle)(
                r.instances.every(
                  (e) => e.template.$container !== this.$container
                ),
                "Cannot mount multiple instances on the same dom element"
              ),
              (this.query = this.query.bind(this)),
              (this.$container.dataset.artId = e.id),
              (this.$original = this.$container.cloneNode(!0)),
              this.init();
          }
          static get html() {
            return '<div class="art-video-player art-subtitle-show art-layer-show art-control-show art-mask-show"><video class="art-video"><track default kind="metadata" src=""></track></video><div class="art-poster"></div><div class="art-subtitle"></div><div class="art-danmuku"></div><div class="art-layers"></div><div class="art-mask"><div class="art-state"></div></div><div class="art-bottom"><div class="art-progress"></div><div class="art-controls"><div class="art-controls-left"></div><div class="art-controls-center"></div><div class="art-controls-right"></div></div></div><div class="art-loading"></div><div class="art-notice"><div class="art-notice-inner"></div></div><div class="art-settings"></div><div class="art-info"><div class="art-info-panel"><div class="art-info-item"><div class="art-info-title">Player version:</div><div class="art-info-content">5.0.9</div></div><div class="art-info-item"><div class="art-info-title">Video url:</div><div class="art-info-content" data-video="src"></div></div><div class="art-info-item"><div class="art-info-title">Video volume:</div><div class="art-info-content" data-video="volume"></div></div><div class="art-info-item"><div class="art-info-title">Video time:</div><div class="art-info-content" data-video="currentTime"></div></div><div class="art-info-item"><div class="art-info-title">Video duration:</div><div class="art-info-content" data-video="duration"></div></div><div class="art-info-item"><div class="art-info-title">Video resolution:</div><div class="art-info-content"><span data-video="videoWidth"></span> x <span data-video="videoHeight"></span></div></div></div><div class="art-info-close">[x]</div></div><div class="art-contextmenus"></div></div>';
          }
          query(e) {
            return (0, a.query)(e, this.$container);
          }
          init() {
            const { option: e } = this.art;
            e.useSSR || (this.$container.innerHTML = o.html),
              (this.$player = this.query(".art-video-player")),
              (this.$video = this.query(".art-video")),
              (this.$track = this.query("track")),
              (this.$poster = this.query(".art-poster")),
              (this.$subtitle = this.query(".art-subtitle")),
              (this.$danmuku = this.query(".art-danmuku")),
              (this.$bottom = this.query(".art-bottom")),
              (this.$progress = this.query(".art-progress")),
              (this.$controls = this.query(".art-controls")),
              (this.$controlsLeft = this.query(".art-controls-left")),
              (this.$controlsCenter = this.query(".art-controls-center")),
              (this.$controlsRight = this.query(".art-controls-right")),
              (this.$layer = this.query(".art-layers")),
              (this.$loading = this.query(".art-loading")),
              (this.$notice = this.query(".art-notice")),
              (this.$noticeInner = this.query(".art-notice-inner")),
              (this.$mask = this.query(".art-mask")),
              (this.$state = this.query(".art-state")),
              (this.$setting = this.query(".art-settings")),
              (this.$info = this.query(".art-info")),
              (this.$infoPanel = this.query(".art-info-panel")),
              (this.$infoClose = this.query(".art-info-close")),
              (this.$contextmenu = this.query(".art-contextmenus")),
              e.backdrop && (0, a.addClass)(this.$player, "art-backdrop"),
              a.isMobile && (0, a.addClass)(this.$player, "art-mobile");
          }
          destroy(e) {
            e
              ? (0, a.replaceElement)(this.$original, this.$container)
              : (0, a.addClass)(this.$player, "art-destroy");
          }
        }
        r.default = o;
      },
      {
        "./utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "3jKkj": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils"),
          n = e("./zh-cn.json"),
          i = a.interopDefault(n),
          s = e("./zh-tw.json"),
          l = a.interopDefault(s),
          c = e("./pl.json"),
          p = a.interopDefault(c),
          u = e("./cs.json"),
          d = a.interopDefault(u),
          f = e("./es.json"),
          h = a.interopDefault(f),
          m = e("./fa.json"),
          g = a.interopDefault(m),
          v = e("./fr.json"),
          y = a.interopDefault(v),
          b = e("./id.json"),
          x = a.interopDefault(b),
          w = e("./ru.json"),
          j = a.interopDefault(w);
        r.default = class {
          constructor(e) {
            (this.art = e),
              (this.languages = {
                "zh-cn": i.default,
                "zh-tw": l.default,
                pl: p.default,
                cs: d.default,
                es: h.default,
                fa: g.default,
                fr: y.default,
                id: x.default,
                ru: j.default,
              }),
              this.update(e.option.i18n);
          }
          init() {
            const e = this.art.option.lang.toLowerCase();
            this.language = this.languages[e] || {};
          }
          get(e) {
            return this.language[e] || e;
          }
          update(e) {
            (this.languages = (0, o.mergeDeep)(this.languages, e)), this.init();
          }
        };
      },
      {
        "../utils": "71aH7",
        "./zh-cn.json": "lNQi5",
        "./zh-tw.json": "eRpom",
        "./pl.json": "iEpPa",
        "./cs.json": "dBgp3",
        "./es.json": "dNIrL",
        "./fa.json": "7Plhe",
        "./fr.json": "kGNjI",
        "./id.json": "6MQTw",
        "./ru.json": "7LASr",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    lNQi5: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"统计信息","Close":"关闭","Video Load Failed":"加载失败","Volume":"音量","Play":"播放","Pause":"暂停","Rate":"速度","Mute":"静音","Video Flip":"画面翻转","Horizontal":"水平","Vertical":"垂直","Reconnect":"重新连接","Show Setting":"显示设置","Hide Setting":"隐藏设置","Screenshot":"截图","Play Speed":"播放速度","Aspect Ratio":"画面比例","Default":"默认","Normal":"正常","Open":"打开","Switch Video":"切换","Switch Subtitle":"切换字幕","Fullscreen":"全屏","Exit Fullscreen":"退出全屏","Web Fullscreen":"网页全屏","Exit Web Fullscreen":"退出网页全屏","Mini Player":"迷你播放器","PIP Mode":"开启画中画","Exit PIP Mode":"退出画中画","PIP Not Supported":"不支持画中画","Fullscreen Not Supported":"不支持全屏","Subtitle Offset":"字幕偏移","Last Seen":"上次看到","Jump Play":"跳转播放","AirPlay":"隔空播放","AirPlay Not Available":"隔空播放不可用"}'
        );
      },
      {},
    ],
    eRpom: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"統計訊息","Close":"關閉","Video Load Failed":"載入失敗","Volume":"音量","Play":"播放","Pause":"暫停","Rate":"速度","Mute":"靜音","Video Flip":"畫面翻轉","Horizontal":"水平","Vertical":"垂直","Reconnect":"重新連接","Show Setting":"顯示设置","Hide Setting":"隱藏设置","Screenshot":"截圖","Play Speed":"播放速度","Aspect Ratio":"畫面比例","Default":"默認","Normal":"正常","Open":"打開","Switch Video":"切換","Switch Subtitle":"切換字幕","Fullscreen":"全屏","Exit Fullscreen":"退出全屏","Web Fullscreen":"網頁全屏","Exit Web Fullscreen":"退出網頁全屏","Mini Player":"迷你播放器","PIP Mode":"開啟畫中畫","Exit PIP Mode":"退出畫中畫","PIP Not Supported":"不支持畫中畫","Fullscreen Not Supported":"不支持全屏","Subtitle Offset":"字幕偏移","Last Seen":"上次看到","Jump Play":"跳轉播放","AirPlay":"隔空播放","AirPlay Not Available":"隔空播放不可用"}'
        );
      },
      {},
    ],
    iEpPa: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Informacje o wideo","Close":"Zamknij","Video Load Failed":"Błąd ładowania wideo","Volume":"Głośność","Play":"Odtwórz","Pause":"Wstrzymaj","Rate":"Oceń","Mute":"Wycisz","Video Flip":"Rotacja wideo","Horizontal":"Pozioma","Vertical":"Pionowa","Reconnect":"Połącz ponownie","Show Setting":"Pokaż ustawienia","Hide Setting":"Ukryj ustawienia","Screenshot":"Zrzut ekranu","Play Speed":"Prędkość odtwarzania","Aspect Ratio":"Współczynnik proporcji","Default":"Domyślny","Normal":"Normalny","Open":"Otwórz","Switch Video":"Przełącz wideo","Switch Subtitle":"Przełącz napisy","Fullscreen":"Pełny ekran","Exit Fullscreen":"Zamknij pełny ekran","Web Fullscreen":"Tryb pełnej strony","Exit Web Fullscreen":"Zamknij tryb pełnej strony","Mini Player":"Miniodtwarzacz","PIP Mode":"Tryb PiP","Exit PIP Mode":"Zamknij tryb PiP","PIP Not Supported":"Tryb PiP nieobsługiwany","Fullscreen Not Supported":"Pełny ekran nieobsługiwany","Subtitle Offset":"Przesunięcie napisów","Last Seen":"Ostatnio widziany","Jump Play":"Skocz do gry","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay nie jest dostępny"}'
        );
      },
      {},
    ],
    dBgp3: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Info o videu","Close":"Zavřít","Video Load Failed":"Nahrání videa selhalo","Volume":"Hlasitost","Play":"Přehrát","Pause":"Pozastavit","Rate":"Hodnocení","Mute":"Ztlumit","Video Flip":"Otočit video","Horizontal":"Horizontálně","Vertical":"Vertikálně","Reconnect":"Opětovné připojení","Show Setting":"Zobrazit nastavení","Hide Setting":"Skrýt nastavení","Screenshot":"Snímek obrazovky","Play Speed":"Rychlost přehrávání","Aspect Ratio":"Poměr stran","Default":"Výchozí","Normal":"Normální","Open":"Otevřít","Switch Video":"Přepnout video","Switch Subtitle":"Přepnout titulky","Fullscreen":"Celá obrazovka","Exit Fullscreen":"Opustit režim celé obrazovky","Web Fullscreen":"Celá stránka","Exit Web Fullscreen":"Zavřít režim celé stránky","Mini Player":"Mini přehrávač","PIP Mode":"Režim PIP","Exit PIP Mode":"Opustit režim PIP","PIP Not Supported":"Režim PIP není podporován","Fullscreen Not Supported":"Režim celé obrazovky není podporován","Subtitle Offset":"Posun titulků","Last Seen":"Naposledy viděn","Jump Play":"Hra na skok","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay není k dispozici"}'
        );
      },
      {},
    ],
    dNIrL: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Información del video","Close":"Cerrar","Video Load Failed":"Falló carga de video","Volume":"Volumen","Play":"Reproduciendo","Pause":"Pausa","Rate":"Velocidad","Mute":"Silencio","Video Flip":"Rotar video","Horizontal":"Horizontal","Vertical":"Vertical","Reconnect":"Reconectando","Show Setting":"Mostrar ajustes","Hide Setting":"Ocultar ajustes","Screenshot":"Captura de Pantalla","Play Speed":"Velocidad de reproducción","Aspect Ratio":"Relación de aspecto","Default":"Por defecto","Normal":"Normal","Open":"Abrir","Switch Video":"Cambiar video","Switch Subtitle":"Cambiar subtítulo","Fullscreen":"Pantalla completa","Exit Fullscreen":"Salir de Pantalla completa","Web Fullscreen":"Pantalla completa Web","Exit Web Fullscreen":"Salir de Pantalla completa","Mini Player":"Mini reproductor","PIP Mode":"Modo PiP","Exit PIP Mode":"Cerrar modo PiP","PIP Not Supported":"Modo PiP no compatible","Fullscreen Not Supported":"Pantalla completa no soportada","Subtitle Offset":"Ajuste subtítulo","Last Seen":"Visto última vez","Jump Play":"Saltar","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay no disponible"}'
        );
      },
      {},
    ],
    "7Plhe": [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"اطلاعات ویدیو","Close":"بستن","Video Load Failed":"بارگذاری ناموفق","Play":"پخش","Volume":"میزان صدا","Pause":"توقف","Rate":"نرخ","Mute":"سکوت","Video Flip":"چرخش تصویر","Horizontal":"افقی","Vertical":"عمودی","Reconnect":"اتصال مجدد","Show Setting":"تنظیمات","Hide Setting":"بستن تنظیمات","Screenshot":"عکس از صفحه","Play Speed":"سرعت پخش","Aspect Ratio":"نسبت تصویر","Default":"حالت پیشفرض","Normal":" حالت عادی","Open":"بازکردن","Switch Video":"تغییر ویدیو","Switch Subtitle":"نغییر زیرنویس","Fullscreen":"تمام صفحه","Exit Fullscreen":"کوچک کردن","Web Fullscreen":"حالت تئاتر","Exit Web Fullscreen":"خروج از حالت تئاتر","Mini Player":"حالت پخش کوچک","PIP Mode":" مینی پلیر","Exit PIP Mode":"خروج از مینی پلیر","PIP Not Supported":"عدم پشتیبانی از مینی پلیر","Fullscreen Not Supported":"عدم پشتیبانی از حالت تمام صفحه","Subtitle Offset":"افست زیرنویس","Last Seen":"آخرین بازدید","Jump Play":"جامپ پلی","AirPlay":"ایر پلی","AirPlay Not Available":"عدم پشتیبانی از ایرپلی"}'
        );
      },
      {},
    ],
    kGNjI: [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Informations de la vidéo","Close":"Fermer","Video Load Failed":"Téléchargement de la vidéo échoué","Volume":"Volume","Play":"Lire","Pause":"Pause","Rate":"Vitesse","Mute":"Muet","Video Flip":"Rotation de la vidéo","Horizontal":"Horizontal","Vertical":"Vertical","Reconnect":"Reconnexion","Show Setting":"Afficher les paramètres","Hide Setting":"Cacher les paramètres","Screenshot":"Capture d\'écran","Play Speed":"Vitesse de lecture","Aspect Ratio":"Rapport d\'aspect","Default":"Défaut","Normal":"Normal","Open":"Ouvrir","Switch Video":"Basculer la vidéo","Switch Subtitle":"Basculer le sous-titre","Fullscreen":"Plein écran","Exit Fullscreen":"Quitter le plein écran","Web Fullscreen":"Plein écran Web","Exit Web Fullscreen":"Quitter le plein écran Web","Mini Player":"Mini lecteur","PIP Mode":"Mode PiP","Exit PIP Mode":"Fermer le mode PiP","PIP Not Supported":"Mode PiP non supporté","Fullscreen Not Supported":"Plein écran non supporté","Subtitle Offset":"Réglage des sous-titres","Last Seen":"Dernière position","Jump Play":"Continuer","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay non disponible"}'
        );
      },
      {},
    ],
    "6MQTw": [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Informasi Video","Close":"Tutup","Video Load Failed":"Gagal Memuat Video","Volume":"Volume","Play":"Putar","Pause":"Jeda","Rate":"Kecepatan","Mute":"Senyap","Video Flip":"Memutar Video","Horizontal":"Horizontal","Vertical":"Vertikal","Reconnect":"Menyambung Kembali","Show Setting":"Tampilkan Pengaturan","Hide Setting":"Sembunyikan Pengaturan","Screenshot":"Tangkapan Layar","Play Speed":"Kecepatan Putar","Aspect Ratio":"Rasio Aspek","Default":"Default","Normal":"Normal","Open":"Buka","Switch Video":"Ganti Video","Switch Subtitle":"Ganti Subtitle","Fullscreen":"Layar Penuh","Exit Fullscreen":"Keluar dari Layar Penuh","Web Fullscreen":"Layar Penuh Web","Exit Web Fullscreen":"Keluar dari Layar Penuh Web","Mini Player":"Pemutar Mini","PIP Mode":"Mode PIP","Exit PIP Mode":"Keluar dari Mode PIP","PIP Not Supported":"PIP Tidak Didukung","Fullscreen Not Supported":"Layar Penuh Tidak Didukung","Subtitle Offset":"Pergeseran Subtitle","Last Seen":"Terakhir Dilihat","Jump Play":"Lompat Putar","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay Tidak Tersedia"}'
        );
      },
      {},
    ],
    "7LASr": [
      function (e, t, r) {
        t.exports = JSON.parse(
          '{"Video Info":"Информация","Close":"Закрыть","Video Load Failed":"Ошибка загрузки видео","Volume":"Громкость","Play":"Играть","Pause":"Пауза","Rate":"Скорость","Mute":"Заглушить","Video Flip":"Развернуть видео","Horizontal":"Горизонтально","Vertical":"Вертикально","Reconnect":"Переподключенине","Show Setting":"Показать настройки","Hide Setting":"Скрыть настройки","Screenshot":"Скриншот","Play Speed":"Скорость воспроизведения","Aspect Ratio":"Соотношение сторон","Default":"По-умолчанию","Normal":"Нормальный","Open":"Открыть","Switch Video":"Переключить видео","Switch Subtitle":"Переключить субтитры","Fullscreen":"Полноэкранный режим","Exit Fullscreen":"Выход из полноэкранного режима","Web Fullscreen":"На все окно браузера","Exit Web Fullscreen":"Выход из режима полного окна","Mini Player":"Мини проигрыватель","PIP Mode":"Картинка в картинке","Exit PIP Mode":"Закрыть картинку в картинке","PIP Not Supported":"Картинка в картинке не поддерживается","Fullscreen Not Supported":"Полноэкранный режим не поддерживается","Subtitle Offset":"Настройка субтитров","Last Seen":"Последнее просмотренное","Jump Play":"Перейти","AirPlay":"AirPlay","AirPlay Not Available":"AirPlay недоступен"}'
        );
      },
      {},
    ],
    a90nx: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./urlMix"),
          n = a.interopDefault(o),
          i = e("./attrMix"),
          s = a.interopDefault(i),
          l = e("./playMix"),
          c = a.interopDefault(l),
          p = e("./pauseMix"),
          u = a.interopDefault(p),
          d = e("./toggleMix"),
          f = a.interopDefault(d),
          h = e("./seekMix"),
          m = a.interopDefault(h),
          g = e("./volumeMix"),
          v = a.interopDefault(g),
          y = e("./currentTimeMix"),
          b = a.interopDefault(y),
          x = e("./durationMix"),
          w = a.interopDefault(x),
          j = e("./switchMix"),
          k = a.interopDefault(j),
          S = e("./playbackRateMix"),
          I = a.interopDefault(S),
          C = e("./aspectRatioMix"),
          P = a.interopDefault(C),
          $ = e("./screenshotMix"),
          M = a.interopDefault($),
          T = e("./fullscreenMix"),
          E = a.interopDefault(T),
          F = e("./fullscreenWebMix"),
          A = a.interopDefault(F),
          z = e("./pipMix"),
          H = a.interopDefault(z),
          D = e("./loadedMix"),
          R = a.interopDefault(D),
          O = e("./playedMix"),
          L = a.interopDefault(O),
          V = e("./playingMix"),
          N = a.interopDefault(V),
          Y = e("./autoSizeMix"),
          _ = a.interopDefault(Y),
          W = e("./rectMix"),
          q = a.interopDefault(W),
          B = e("./flipMix"),
          U = a.interopDefault(B),
          K = e("./miniMix"),
          G = a.interopDefault(K),
          Z = e("./loopMix"),
          X = a.interopDefault(Z),
          J = e("./posterMix"),
          Q = a.interopDefault(J),
          ee = e("./autoHeightMix"),
          te = a.interopDefault(ee),
          re = e("./cssVarMix"),
          ae = a.interopDefault(re),
          oe = e("./themeMix"),
          ne = a.interopDefault(oe),
          ie = e("./typeMix"),
          se = a.interopDefault(ie),
          le = e("./stateMix"),
          ce = a.interopDefault(le),
          pe = e("./subtitleOffsetMix"),
          ue = a.interopDefault(pe),
          de = e("./airplayMix"),
          fe = a.interopDefault(de),
          he = e("./qualityMix"),
          me = a.interopDefault(he),
          ge = e("./optionInit"),
          ve = a.interopDefault(ge),
          ye = e("./eventInit"),
          be = a.interopDefault(ye);
        r.default = class {
          constructor(e) {
            (0, n.default)(e),
              (0, s.default)(e),
              (0, c.default)(e),
              (0, u.default)(e),
              (0, f.default)(e),
              (0, m.default)(e),
              (0, v.default)(e),
              (0, b.default)(e),
              (0, w.default)(e),
              (0, k.default)(e),
              (0, I.default)(e),
              (0, P.default)(e),
              (0, M.default)(e),
              (0, E.default)(e),
              (0, A.default)(e),
              (0, H.default)(e),
              (0, R.default)(e),
              (0, L.default)(e),
              (0, N.default)(e),
              (0, _.default)(e),
              (0, q.default)(e),
              (0, U.default)(e),
              (0, G.default)(e),
              (0, X.default)(e),
              (0, Q.default)(e),
              (0, te.default)(e),
              (0, ae.default)(e),
              (0, ne.default)(e),
              (0, se.default)(e),
              (0, ce.default)(e),
              (0, ue.default)(e),
              (0, fe.default)(e),
              (0, me.default)(e),
              (0, be.default)(e),
              (0, ve.default)(e);
          }
        };
      },
      {
        "./urlMix": "kQoac",
        "./attrMix": "deCma",
        "./playMix": "fOJuP",
        "./pauseMix": "fzHAy",
        "./toggleMix": "cBHxQ",
        "./seekMix": "koAPr",
        "./volumeMix": "6eyuR",
        "./currentTimeMix": "faaWv",
        "./durationMix": "5y91K",
        "./switchMix": "iceD8",
        "./playbackRateMix": "keKwh",
        "./aspectRatioMix": "jihET",
        "./screenshotMix": "36kPY",
        "./fullscreenMix": "2GYOJ",
        "./fullscreenWebMix": "5aYAP",
        "./pipMix": "7EnIB",
        "./loadedMix": "3N9mP",
        "./playedMix": "et96R",
        "./playingMix": "9DzzM",
        "./autoSizeMix": "i1LDY",
        "./rectMix": "IqARI",
        "./flipMix": "7E7Vs",
        "./miniMix": "gpugx",
        "./loopMix": "f1hVG",
        "./posterMix": "1SuFS",
        "./autoHeightMix": "8x4te",
        "./cssVarMix": "1CaTA",
        "./themeMix": "2FqhO",
        "./typeMix": "1fQQs",
        "./stateMix": "iBOQW",
        "./subtitleOffsetMix": "6vlBV",
        "./airplayMix": "eftqT",
        "./qualityMix": "5SdyX",
        "./optionInit": "fCWZK",
        "./eventInit": "f8Lv3",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    kQoac: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            option: t,
            template: { $video: r },
          } = e;
          (0, a.def)(e, "url", {
            get: () => r.src,
            async set(o) {
              if (o) {
                const n = e.url,
                  i = t.type || (0, a.getExt)(o),
                  s = t.customType[i];
                i && s
                  ? (await (0, a.sleep)(),
                    (e.loading.show = !0),
                    s.call(e, r, o, e))
                  : (URL.revokeObjectURL(n), (r.src = o)),
                  n !== e.url &&
                    ((e.option.url = o),
                    e.isReady &&
                      n &&
                      e.once("video:canplay", () => {
                        e.emit("restart", o);
                      }));
              } else await (0, a.sleep)(), (e.loading.show = !0);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    deCma: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $video: t },
          } = e;
          (0, a.def)(e, "attr", {
            value(e, r) {
              if (void 0 === r) return t[e];
              t[e] = r;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    fOJuP: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            option: o,
            constructor: { instances: n },
            template: { $video: i },
          } = e;
          (0, a.def)(e, "play", {
            value: async function () {
              const a = await i.play();
              if (((r.show = t.get("Play")), e.emit("play"), o.mutex))
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  r !== e && r.pause();
                }
              return a;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    fzHAy: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $video: t },
            i18n: r,
            notice: o,
          } = e;
          (0, a.def)(e, "pause", {
            value() {
              const a = t.pause();
              return (o.show = r.get("Pause")), e.emit("pause"), a;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    cBHxQ: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "toggle", {
            value: () => (e.playing ? e.pause() : e.play()),
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    koAPr: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { notice: t } = e;
          (0, a.def)(e, "seek", {
            set(r) {
              (e.currentTime = r),
                e.emit("seek", e.currentTime),
                e.duration &&
                  (t.show = `${(0, a.secondToTime)(e.currentTime)} / ${(0,
                  a.secondToTime)(e.duration)}`);
            },
          }),
            (0, a.def)(e, "forward", {
              set(t) {
                e.seek = e.currentTime + t;
              },
            }),
            (0, a.def)(e, "backward", {
              set(t) {
                e.seek = e.currentTime - t;
              },
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6eyuR": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $video: t },
            i18n: r,
            notice: o,
            storage: n,
          } = e;
          (0, a.def)(e, "volume", {
            get: () => t.volume || 0,
            set: (e) => {
              (t.volume = (0, a.clamp)(e, 0, 1)),
                (o.show = `${r.get("Volume")}: ${parseInt(
                  100 * t.volume,
                  10
                )}`),
                0 !== t.volume && n.set("volume", t.volume);
            },
          }),
            (0, a.def)(e, "muted", {
              get: () => t.muted,
              set: (e) => {
                t.muted = e;
              },
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    faaWv: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { $video: t } = e.template;
          (0, a.def)(e, "currentTime", {
            get: () => t.currentTime || 0,
            set: (r) => {
              (r = parseFloat(r)),
                Number.isNaN(r) ||
                  (t.currentTime = (0, a.clamp)(r, 0, e.duration));
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "5y91K": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "duration", {
            get: () => {
              const { duration: t } = e.template.$video;
              return t === 1 / 0 ? 0 : t || 0;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    iceD8: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          function t(t, r) {
            return new Promise((a, o) => {
              if (t === e.url) return;
              const { playing: n, aspectRatio: i, playbackRate: s } = e;
              e.pause(),
                (e.url = t),
                (e.notice.show = ""),
                e.once("video:error", o),
                e.once("video:canplay", async () => {
                  (e.playbackRate = s),
                    (e.aspectRatio = i),
                    (e.currentTime = r),
                    n && (await e.play()),
                    (e.notice.show = ""),
                    a();
                });
            });
          }
          (0, a.def)(e, "switchQuality", { value: (r) => t(r, e.currentTime) }),
            (0, a.def)(e, "switchUrl", { value: (e) => t(e, 0) }),
            (0, a.def)(e, "switch", { set: e.switchUrl });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    keKwh: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $video: t },
            i18n: r,
            notice: o,
          } = e;
          (0, a.def)(e, "playbackRate", {
            get: () => t.playbackRate,
            set(a) {
              if (a) {
                if (a === t.playbackRate) return;
                (t.playbackRate = a),
                  (o.show = `${r.get("Rate")}: ${
                    1 === a ? r.get("Normal") : `${a}x`
                  }`);
              } else e.playbackRate = 1;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    jihET: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            template: { $video: o, $player: n },
          } = e;
          (0, a.def)(e, "aspectRatio", {
            get: () => n.dataset.aspectRatio || "default",
            set(i) {
              if ((i || (i = "default"), "default" === i))
                (0, a.setStyle)(o, "width", null),
                  (0, a.setStyle)(o, "height", null),
                  (0, a.setStyle)(o, "margin", null),
                  delete n.dataset.aspectRatio;
              else {
                const e = i.split(":").map(Number),
                  { clientWidth: t, clientHeight: r } = n,
                  s = t / r,
                  l = e[0] / e[1];
                s > l
                  ? ((0, a.setStyle)(o, "width", l * r + "px"),
                    (0, a.setStyle)(o, "height", "100%"),
                    (0, a.setStyle)(o, "margin", "0 auto"))
                  : ((0, a.setStyle)(o, "width", "100%"),
                    (0, a.setStyle)(o, "height", t / l + "px"),
                    (0, a.setStyle)(o, "margin", "auto 0")),
                  (n.dataset.aspectRatio = i);
              }
              (r.show = `${t.get("Aspect Ratio")}: ${
                "default" === i ? t.get("Default") : i
              }`),
                e.emit("aspectRatio", i);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "36kPY": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
              notice: t,
              template: { $video: r },
            } = e,
            o = (0, a.createElement)("canvas");
          (0, a.def)(e, "getDataURL", {
            value: () =>
              new Promise((e, a) => {
                try {
                  (o.width = r.videoWidth),
                    (o.height = r.videoHeight),
                    o.getContext("2d").drawImage(r, 0, 0),
                    e(o.toDataURL("image/png"));
                } catch (e) {
                  (t.show = e), a(e);
                }
              }),
          }),
            (0, a.def)(e, "getBlobUrl", {
              value: () =>
                new Promise((e, a) => {
                  try {
                    (o.width = r.videoWidth),
                      (o.height = r.videoHeight),
                      o.getContext("2d").drawImage(r, 0, 0),
                      o.toBlob((t) => {
                        e(URL.createObjectURL(t));
                      });
                  } catch (e) {
                    (t.show = e), a(e);
                  }
                }),
            }),
            (0, a.def)(e, "screenshot", {
              value: async () => {
                const t = await e.getDataURL();
                return (
                  (0, a.download)(
                    t,
                    `artplayer_${(0, a.secondToTime)(r.currentTime)}.png`
                  ),
                  e.emit("screenshot", t),
                  t
                );
              },
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "2GYOJ": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../libs/screenfull"),
          n = a.interopDefault(o),
          i = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            template: { $video: a, $player: o },
          } = e;
          e.once("video:loadedmetadata", () => {
            n.default.isEnabled
              ? ((e) => {
                  n.default.on("change", () => {
                    e.emit("fullscreen", n.default.isFullscreen);
                  }),
                    (0, i.def)(e, "fullscreen", {
                      get: () => n.default.isFullscreen,
                      async set(t) {
                        t
                          ? ((e.state = "fullscreen"),
                            await n.default.request(o),
                            (0, i.addClass)(o, "art-fullscreen"))
                          : (await n.default.exit(),
                            (0, i.removeClass)(o, "art-fullscreen")),
                          e.emit("resize");
                      },
                    });
                })(e)
              : document.fullscreenEnabled || a.webkitSupportsFullscreen
              ? ((e) => {
                  (0, i.def)(e, "fullscreen", {
                    get: () => a.webkitDisplayingFullscreen,
                    set(t) {
                      t
                        ? ((e.state = "fullscreen"),
                          a.webkitEnterFullscreen(),
                          e.emit("fullscreen", !0))
                        : (a.webkitExitFullscreen(), e.emit("fullscreen", !1)),
                        e.emit("resize");
                    },
                  });
                })(e)
              : (0, i.def)(e, "fullscreen", {
                  get: () => !1,
                  set() {
                    r.show = t.get("Fullscreen Not Supported");
                  },
                }),
              (0, i.def)(e, "fullscreen", (0, i.get)(e, "fullscreen"));
          });
        };
      },
      {
        "../libs/screenfull": "8v40z",
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "8v40z": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        const a = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          o = (() => {
            if ("undefined" == typeof document) return !1;
            const e = a[0],
              t = {};
            for (const r of a) {
              if (r[1] in document) {
                for (const [a, o] of r.entries()) t[e[a]] = o;
                return t;
              }
            }
            return !1;
          })(),
          n = { change: o.fullscreenchange, error: o.fullscreenerror };
        let i = {
          request: (e = document.documentElement, t) =>
            new Promise((r, a) => {
              const n = () => {
                i.off("change", n), r();
              };
              i.on("change", n);
              const s = e[o.requestFullscreen](t);
              s instanceof Promise && s.then(n).catch(a);
            }),
          exit: () =>
            new Promise((e, t) => {
              if (!i.isFullscreen) return void e();
              const r = () => {
                i.off("change", r), e();
              };
              i.on("change", r);
              const a = document[o.exitFullscreen]();
              a instanceof Promise && a.then(r).catch(t);
            }),
          toggle: (e, t) => (i.isFullscreen ? i.exit() : i.request(e, t)),
          onchange(e) {
            i.on("change", e);
          },
          onerror(e) {
            i.on("error", e);
          },
          on(e, t) {
            const r = n[e];
            r && document.addEventListener(r, t, !1);
          },
          off(e, t) {
            const r = n[e];
            r && document.removeEventListener(r, t, !1);
          },
          raw: o,
        };
        Object.defineProperties(i, {
          isFullscreen: { get: () => Boolean(document[o.fullscreenElement]) },
          element: { enumerable: !0, get: () => document[o.fullscreenElement] },
          isEnabled: {
            enumerable: !0,
            get: () => Boolean(document[o.fullscreenEnabled]),
          },
        }),
          o || (i = { isEnabled: !1 }),
          (r.default = i);
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "5aYAP": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            constructor: t,
            template: { $container: r, $player: o },
          } = e;
          let n = "";
          (0, a.def)(e, "fullscreenWeb", {
            get: () => (0, a.hasClass)(o, "art-fullscreen-web"),
            set(i) {
              i
                ? ((n = o.style.cssText),
                  t.FULLSCREEN_WEB_IN_BODY && (0, a.append)(document.body, o),
                  (e.state = "fullscreenWeb"),
                  (0, a.setStyle)(o, "width", "100%"),
                  (0, a.setStyle)(o, "height", "100%"),
                  (0, a.addClass)(o, "art-fullscreen-web"),
                  e.emit("fullscreenWeb", !0))
                : (t.FULLSCREEN_WEB_IN_BODY && (0, a.append)(r, o),
                  n && ((o.style.cssText = n), (n = "")),
                  (0, a.removeClass)(o, "art-fullscreen-web"),
                  e.emit("fullscreenWeb", !1)),
                e.emit("resize");
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "7EnIB": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            template: { $video: o },
          } = e;
          document.pictureInPictureEnabled
            ? (function (e) {
                const {
                  template: { $video: t },
                  proxy: r,
                  notice: o,
                } = e;
                (t.disablePictureInPicture = !1),
                  (0, a.def)(e, "pip", {
                    get: () => document.pictureInPictureElement,
                    set(r) {
                      r
                        ? ((e.state = "pip"),
                          t.requestPictureInPicture().catch((e) => {
                            throw ((o.show = e), e);
                          }))
                        : document.exitPictureInPicture().catch((e) => {
                            throw ((o.show = e), e);
                          });
                    },
                  }),
                  r(t, "enterpictureinpicture", () => {
                    e.emit("pip", !0);
                  }),
                  r(t, "leavepictureinpicture", () => {
                    e.emit("pip", !1);
                  });
              })(e)
            : o.webkitSupportsPresentationMode
            ? (function (e) {
                const { $video: t } = e.template;
                t.webkitSetPresentationMode("inline"),
                  (0, a.def)(e, "pip", {
                    get: () =>
                      "picture-in-picture" === t.webkitPresentationMode,
                    set(r) {
                      r
                        ? ((e.state = "pip"),
                          t.webkitSetPresentationMode("picture-in-picture"),
                          e.emit("pip", !0))
                        : (t.webkitSetPresentationMode("inline"),
                          e.emit("pip", !1));
                    },
                  });
              })(e)
            : (0, a.def)(e, "pip", {
                get: () => !1,
                set() {
                  r.show = t.get("PIP Not Supported");
                },
              });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "3N9mP": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { $video: t } = e.template;
          (0, a.def)(e, "loaded", { get: () => e.loadedTime / t.duration }),
            (0, a.def)(e, "loadedTime", {
              get: () =>
                t.buffered.length ? t.buffered.end(t.buffered.length - 1) : 0,
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    et96R: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "played", { get: () => e.currentTime / e.duration });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "9DzzM": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { $video: t } = e.template;
          (0, a.def)(e, "playing", {
            get: () =>
              !!(
                t.currentTime > 0 &&
                !t.paused &&
                !t.ended &&
                t.readyState > 2
              ),
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    i1LDY: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { $container: t, $player: r, $video: o } = e.template;
          (0, a.def)(e, "autoSize", {
            value() {
              const { videoWidth: n, videoHeight: i } = o,
                { width: s, height: l } = t.getBoundingClientRect(),
                c = n / i;
              if (s / l > c) {
                const e = ((l * c) / s) * 100;
                (0, a.setStyle)(r, "width", `${e}%`),
                  (0, a.setStyle)(r, "height", "100%");
              } else {
                const e = (s / c / l) * 100;
                (0, a.setStyle)(r, "width", "100%"),
                  (0, a.setStyle)(r, "height", `${e}%`);
              }
              e.emit("autoSize", { width: e.width, height: e.height });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    IqARI: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "rect", {
            get: () => e.template.$player.getBoundingClientRect(),
          });
          const t = ["bottom", "height", "left", "right", "top", "width"];
          for (let r = 0; r < t.length; r++) {
            const o = t[r];
            (0, a.def)(e, o, { get: () => e.rect[o] });
          }
          (0, a.def)(e, "x", { get: () => e.left + window.pageXOffset }),
            (0, a.def)(e, "y", { get: () => e.top + window.pageYOffset });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "7E7Vs": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $player: t },
            i18n: r,
            notice: o,
          } = e;
          (0, a.def)(e, "flip", {
            get: () => t.dataset.flip || "normal",
            set(n) {
              n || (n = "normal"),
                "normal" === n ? delete t.dataset.flip : (t.dataset.flip = n),
                (o.show = `${r.get("Video Flip")}: ${r.get(
                  (0, a.capitalize)(n)
                )}`),
                e.emit("flip", n);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    gpugx: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            icons: t,
            proxy: r,
            storage: o,
            template: { $player: n, $video: i },
          } = e;
          let s = !1,
            l = 0,
            c = 0;
          function p() {
            const { $mini: t } = e.template;
            t &&
              ((0, a.removeClass)(n, "art-mini"),
              (0, a.setStyle)(t, "display", "none"),
              n.prepend(i),
              e.emit("mini", !1));
          }
          function u(t, r) {
            e.playing
              ? ((0, a.setStyle)(t, "display", "none"),
                (0, a.setStyle)(r, "display", "flex"))
              : ((0, a.setStyle)(t, "display", "flex"),
                (0, a.setStyle)(r, "display", "none"));
          }
          function d() {
            const { $mini: t } = e.template,
              r = t.getBoundingClientRect(),
              n = window.innerHeight - r.height - 50,
              i = window.innerWidth - r.width - 50;
            o.set("top", n),
              o.set("left", i),
              (0, a.setStyle)(t, "top", `${n}px`),
              (0, a.setStyle)(t, "left", `${i}px`);
          }
          (0, a.def)(e, "mini", {
            get: () => (0, a.hasClass)(n, "art-mini"),
            set(f) {
              if (f) {
                (e.state = "mini"), (0, a.addClass)(n, "art-mini");
                const f = (function () {
                    const { $mini: n } = e.template;
                    if (n)
                      return (
                        (0, a.append)(n, i),
                        (0, a.setStyle)(n, "display", "flex")
                      );
                    {
                      const n = (0, a.createElement)("div");
                      (0, a.addClass)(n, "art-mini-popup"),
                        (0, a.append)(document.body, n),
                        (e.template.$mini = n),
                        (0, a.append)(n, i);
                      const d = (0, a.append)(
                        n,
                        '<div class="art-mini-close"></div>'
                      );
                      (0, a.append)(d, t.close), r(d, "click", p);
                      const f = (0, a.append)(
                          n,
                          '<div class="art-mini-state"></div>'
                        ),
                        h = (0, a.append)(f, t.play),
                        m = (0, a.append)(f, t.pause);
                      return (
                        r(h, "click", () => e.play()),
                        r(m, "click", () => e.pause()),
                        u(h, m),
                        e.on("video:playing", () => u(h, m)),
                        e.on("video:pause", () => u(h, m)),
                        e.on("video:timeupdate", () => u(h, m)),
                        r(n, "mousedown", (e) => {
                          (s = 0 === e.button), (l = e.pageX), (c = e.pageY);
                        }),
                        e.on("document:mousemove", (e) => {
                          if (s) {
                            (0, a.addClass)(n, "art-mini-droging");
                            const t = e.pageX - l,
                              r = e.pageY - c;
                            (0, a.setStyle)(
                              n,
                              "transform",
                              `translate(${t}px, ${r}px)`
                            );
                          }
                        }),
                        e.on("document:mouseup", () => {
                          if (s) {
                            (s = !1), (0, a.removeClass)(n, "art-mini-droging");
                            const e = n.getBoundingClientRect();
                            o.set("left", e.left),
                              o.set("top", e.top),
                              (0, a.setStyle)(n, "left", `${e.left}px`),
                              (0, a.setStyle)(n, "top", `${e.top}px`),
                              (0, a.setStyle)(n, "transform", null);
                          }
                        }),
                        n
                      );
                    }
                  })(),
                  h = o.get("top"),
                  m = o.get("left");
                h && m
                  ? ((0, a.setStyle)(f, "top", `${h}px`),
                    (0, a.setStyle)(f, "left", `${m}px`),
                    (0, a.isInViewport)(f) || d())
                  : d(),
                  e.emit("mini", !0);
              } else p();
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    f1hVG: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          let t = [];
          (0, a.def)(e, "loop", {
            get: () => t,
            set: (r) => {
              if (
                Array.isArray(r) &&
                "number" == typeof r[0] &&
                "number" == typeof r[1]
              ) {
                const o = (0, a.clamp)(r[0], 0, Math.min(r[1], e.duration)),
                  n = (0, a.clamp)(r[1], o, e.duration);
                t = n - o >= 1 ? [o, n] : [];
              } else t = [];
              e.emit("loop", t);
            },
          }),
            e.on("video:timeupdate", () => {
              t.length &&
                (e.currentTime < t[0] || e.currentTime > t[1]) &&
                (e.seek = t[0]);
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "1SuFS": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $poster: t },
          } = e;
          (0, a.def)(e, "poster", {
            get: () => {
              try {
                return t.style.backgroundImage.match(/"(.*)"/)[1];
              } catch (e) {
                return "";
              }
            },
            set(e) {
              (0, a.setStyle)(t, "backgroundImage", `url(${e})`);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "8x4te": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            template: { $container: t, $video: r },
          } = e;
          (0, a.def)(e, "autoHeight", {
            value() {
              const { clientWidth: o } = t,
                { videoHeight: n, videoWidth: i } = r,
                s = n * (o / i);
              (0, a.setStyle)(t, "height", s + "px"), e.emit("autoHeight", s);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "1CaTA": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { $player: t } = e.template;
          (0, a.def)(e, "cssVar", {
            value: (e, r) =>
              r
                ? t.style.setProperty(e, r)
                : getComputedStyle(t).getPropertyValue(e),
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "2FqhO": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "theme", {
            get: () => e.cssVar("--art-theme"),
            set(t) {
              e.cssVar("--art-theme", t);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "1fQQs": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "type", {
            get: () => e.option.type,
            set(t) {
              e.option.type = t;
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    iBOQW: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const t = ["mini", "pip", "fullscreen", "fullscreenWeb"];
          (0, a.def)(e, "state", {
            get: () => t.find((t) => e[t]) || "standard",
            set(r) {
              for (let a = 0; a < t.length; a++) {
                const o = t[a];
                o !== r && e[o] && (e[o] = !1);
              }
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6vlBV": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const { clamp: t } = e.constructor.utils,
            { notice: r, template: o, i18n: n } = e;
          let i = 0,
            s = [];
          e.on("subtitle:switch", () => {
            s = [];
          }),
            (0, a.def)(e, "subtitleOffset", {
              get: () => i,
              set(a) {
                if (o.$track && o.$track.track) {
                  const l = Array.from(o.$track.track.cues);
                  i = t(a, -5, 5);
                  for (let r = 0; r < l.length; r++) {
                    const a = l[r];
                    s[r] ||
                      (s[r] = { startTime: a.startTime, endTime: a.endTime }),
                      (a.startTime = t(s[r].startTime + i, 0, e.duration)),
                      (a.endTime = t(s[r].endTime + i, 0, e.duration));
                  }
                  e.subtitle.update(),
                    (r.show = `${n.get("Subtitle Offset")}: ${a}s`),
                    e.emit("subtitleOffset", a);
                } else e.emit("subtitleOffset", 0);
              },
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    eftqT: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            proxy: o,
            template: { $video: n },
          } = e;
          let i = !0;
          window.WebKitPlaybackTargetAvailabilityEvent &&
          n.webkitShowPlaybackTargetPicker
            ? o(n, "webkitplaybacktargetavailabilitychanged", (e) => {
                switch (e.availability) {
                  case "available":
                    i = !0;
                    break;
                  case "not-available":
                    i = !1;
                }
              })
            : (i = !1),
            (0, a.def)(e, "airplay", {
              value() {
                i
                  ? (n.webkitShowPlaybackTargetPicker(), e.emit("airplay"))
                  : (r.show = t.get("AirPlay Not Available"));
              },
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "5SdyX": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          (0, a.def)(e, "quality", {
            set(t) {
              const { controls: r, notice: a, i18n: o } = e,
                n = t.find((e) => e.default) || t[0];
              r.update({
                name: "quality",
                position: "right",
                index: 10,
                style: { marginRight: "10px" },
                html: n ? n.html : "",
                selector: t,
                async onSelect(t) {
                  await e.switchQuality(t.url),
                    (a.show = `${o.get("Switch Video")}: ${t.html}`);
                },
              });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    fCWZK: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            option: t,
            storage: r,
            template: { $video: o, $poster: n },
          } = e;
          for (const r in t.moreVideoAttr) e.attr(r, t.moreVideoAttr[r]);
          t.muted && (e.muted = t.muted),
            t.volume && (o.volume = (0, a.clamp)(t.volume, 0, 1));
          const i = r.get("volume");
          "number" == typeof i && (o.volume = (0, a.clamp)(i, 0, 1)),
            t.poster &&
              (0, a.setStyle)(n, "backgroundImage", `url(${t.poster})`),
            t.autoplay && (o.autoplay = t.autoplay),
            t.playsInline &&
              ((o.playsInline = !0), (o["webkit-playsinline"] = !0)),
            t.theme && (t.cssVar["--art-theme"] = t.theme);
          for (const r in t.cssVar) e.cssVar(r, t.cssVar[r]);
          e.url = t.url;
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    f8Lv3: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../config"),
          n = a.interopDefault(o),
          i = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            notice: r,
            option: a,
            constructor: o,
            proxy: s,
            template: { $player: l, $video: c, $poster: p },
          } = e;
          let u = 0;
          for (let t = 0; t < n.default.events.length; t++)
            s(c, n.default.events[t], (t) => {
              e.emit(`video:${t.type}`, t);
            });
          e.on("video:canplay", () => {
            (u = 0), (e.loading.show = !1);
          }),
            e.once("video:canplay", () => {
              (e.loading.show = !1),
                (e.controls.show = !0),
                (e.mask.show = !0),
                (e.isReady = !0),
                e.emit("ready");
            }),
            e.on("video:ended", () => {
              a.loop
                ? ((e.seek = 0),
                  e.play(),
                  (e.controls.show = !1),
                  (e.mask.show = !1))
                : ((e.controls.show = !0), (e.mask.show = !0));
            }),
            e.on("video:error", async (n) => {
              u < o.RECONNECT_TIME_MAX
                ? (await (0, i.sleep)(o.RECONNECT_SLEEP_TIME),
                  (u += 1),
                  (e.url = a.url),
                  (r.show = `${t.get("Reconnect")}: ${u}`),
                  e.emit("error", n, u))
                : ((e.mask.show = !0),
                  (e.loading.show = !1),
                  (e.controls.show = !0),
                  (0, i.addClass)(l, "art-error"),
                  await (0, i.sleep)(o.RECONNECT_SLEEP_TIME),
                  (r.show = t.get("Video Load Failed")),
                  e.destroy(!1));
            }),
            e.on("video:loadedmetadata", () => {
              e.emit("resize"),
                i.isMobile &&
                  ((e.loading.show = !1),
                  (e.controls.show = !0),
                  (e.mask.show = !0));
            }),
            e.on("video:loadstart", () => {
              (e.loading.show = !0), (e.mask.show = !1), (e.controls.show = !0);
            }),
            e.on("video:pause", () => {
              (e.controls.show = !0), (e.mask.show = !0);
            }),
            e.on("video:play", () => {
              (e.mask.show = !1), (0, i.setStyle)(p, "display", "none");
            }),
            e.on("video:playing", () => {
              e.mask.show = !1;
            }),
            e.on("video:progress", () => {
              e.playing && (e.loading.show = !1);
            }),
            e.on("video:seeked", () => {
              e.loading.show = !1;
            }),
            e.on("video:seeking", () => {
              (e.loading.show = !0), (e.mask.show = !1);
            }),
            e.on("video:timeupdate", () => {
              e.mask.show = !1;
            }),
            e.on("video:waiting", () => {
              (e.loading.show = !0), (e.mask.show = !1);
            });
        };
      },
      {
        "../config": "lyjeQ",
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "8Z0Uf": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils"),
          n = e("../utils/component"),
          i = a.interopDefault(n),
          s = e("./fullscreen"),
          l = a.interopDefault(s),
          c = e("./fullscreenWeb"),
          p = a.interopDefault(c),
          u = e("./pip"),
          d = a.interopDefault(u),
          f = e("./playAndPause"),
          h = a.interopDefault(f),
          m = e("./progress"),
          g = a.interopDefault(m),
          v = e("./time"),
          y = a.interopDefault(v),
          b = e("./volume"),
          x = a.interopDefault(b),
          w = e("./setting"),
          j = a.interopDefault(w),
          k = e("./thumbnails"),
          S = a.interopDefault(k),
          I = e("./screenshot"),
          C = a.interopDefault(I),
          P = e("./loop"),
          $ = a.interopDefault(P),
          M = e("./airplay"),
          T = a.interopDefault(M);
        class E extends i.default {
          constructor(e) {
            super(e), (this.name = "control");
            const {
              proxy: t,
              constructor: r,
              template: { $player: a },
            } = e;
            let n = Date.now();
            t(a, ["click", "mousemove", "touchstart", "touchmove"], () => {
              (this.show = !0),
                (0, o.removeClass)(a, "art-hide-cursor"),
                (0, o.addClass)(a, "art-hover"),
                (n = Date.now());
            }),
              e.on("video:timeupdate", () => {
                !e.isInput &&
                  e.playing &&
                  this.show &&
                  Date.now() - n >= r.CONTROL_HIDE_TIME &&
                  ((this.show = !1),
                  (0, o.addClass)(a, "art-hide-cursor"),
                  (0, o.removeClass)(a, "art-hover"));
              }),
              this.init();
          }
          init() {
            const { option: e } = this.art;
            e.isLive ||
              this.add(
                (0, g.default)({ name: "progress", position: "top", index: 10 })
              ),
              !e.thumbnails.url ||
                e.isLive ||
                o.isMobile ||
                this.add(
                  (0, S.default)({
                    name: "thumbnails",
                    position: "top",
                    index: 20,
                  })
                ),
              this.add(
                (0, $.default)({ name: "loop", position: "top", index: 30 })
              ),
              this.add(
                (0, h.default)({
                  name: "playAndPause",
                  position: "left",
                  index: 10,
                })
              ),
              this.add(
                (0, x.default)({ name: "volume", position: "left", index: 20 })
              ),
              e.isLive ||
                this.add(
                  (0, y.default)({ name: "time", position: "left", index: 30 })
                ),
              e.quality.length &&
                (0, o.sleep)().then(() => {
                  this.art.quality = e.quality;
                }),
              e.screenshot &&
                !o.isMobile &&
                this.add(
                  (0, C.default)({
                    name: "screenshot",
                    position: "right",
                    index: 20,
                  })
                ),
              e.setting &&
                this.add(
                  (0, j.default)({
                    name: "setting",
                    position: "right",
                    index: 30,
                  })
                ),
              e.pip &&
                this.add(
                  (0, d.default)({ name: "pip", position: "right", index: 40 })
                ),
              e.airplay &&
                window.WebKitPlaybackTargetAvailabilityEvent &&
                this.add(
                  (0, T.default)({
                    name: "airplay",
                    position: "right",
                    index: 50,
                  })
                ),
              e.fullscreenWeb &&
                this.add(
                  (0, p.default)({
                    name: "fullscreenWeb",
                    position: "right",
                    index: 60,
                  })
                ),
              e.fullscreen &&
                this.add(
                  (0, l.default)({
                    name: "fullscreen",
                    position: "right",
                    index: 70,
                  })
                );
            for (let t = 0; t < e.controls.length; t++) this.add(e.controls[t]);
          }
          add(e) {
            const t = "function" == typeof e ? e(this.art) : e,
              {
                $progress: r,
                $controlsLeft: a,
                $controlsRight: n,
              } = this.art.template;
            switch (t.position) {
              case "top":
                this.$parent = r;
                break;
              case "left":
                this.$parent = a;
                break;
              case "right":
                this.$parent = n;
                break;
              default:
                (0, o.errorHandle)(
                  !1,
                  "Control option.position must one of 'top', 'left', 'right'"
                );
            }
            super.add(t);
          }
        }
        r.default = E;
      },
      {
        "../utils": "71aH7",
        "../utils/component": "18nVI",
        "./fullscreen": "c61Lj",
        "./fullscreenWeb": "03jeB",
        "./pip": "u8l8e",
        "./playAndPause": "ebXtb",
        "./progress": "bgoVP",
        "./time": "ikc2j",
        "./volume": "b8NFx",
        "./setting": "03o9l",
        "./thumbnails": "eCVx2",
        "./screenshot": "4KCF5",
        "./loop": "2hIff",
        "./airplay": "4IS2d",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "18nVI": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./dom"),
          n = e("./format"),
          i = e("./error"),
          s = e("option-validator"),
          l = a.interopDefault(s),
          c = e("../scheme");
        r.default = class {
          constructor(e) {
            (this.id = 0),
              (this.art = e),
              (this.cache = new Map()),
              (this.add = this.add.bind(this)),
              (this.remove = this.remove.bind(this)),
              (this.update = this.update.bind(this));
          }
          get show() {
            return (0, o.hasClass)(
              this.art.template.$player,
              `art-${this.name}-show`
            );
          }
          set show(e) {
            const { $player: t } = this.art.template,
              r = `art-${this.name}-show`;
            e ? (0, o.addClass)(t, r) : (0, o.removeClass)(t, r),
              this.art.emit(this.name, e);
          }
          toggle() {
            this.show = !this.show;
          }
          add(e) {
            const t = "function" == typeof e ? e(this.art) : e;
            if (
              ((t.html = t.html || ""),
              (0, l.default)(t, c.ComponentOption),
              !this.$parent || !this.name || t.disable)
            )
              return;
            const r = t.name || `${this.name}${this.id}`,
              a = this.cache.get(r);
            (0, i.errorHandle)(
              !a,
              `Can't add an existing [${r}] to the [${this.name}]`
            ),
              (this.id += 1);
            const n = (0, o.createElement)("div");
            (0, o.addClass)(n, `art-${this.name}`),
              (0, o.addClass)(n, `art-${this.name}-${r}`);
            const s = Array.from(this.$parent.children);
            n.dataset.index = t.index || this.id;
            const p = s.find(
              (e) => Number(e.dataset.index) >= Number(n.dataset.index)
            );
            p
              ? p.insertAdjacentElement("beforebegin", n)
              : (0, o.append)(this.$parent, n),
              t.html && (0, o.append)(n, t.html),
              t.style && (0, o.setStyles)(n, t.style),
              t.tooltip && (0, o.tooltip)(n, t.tooltip);
            const u = [];
            if (t.click) {
              const e = this.art.events.proxy(n, "click", (e) => {
                e.preventDefault(), t.click.call(this.art, this, e);
              });
              u.push(e);
            }
            return (
              t.selector &&
                ["left", "right"].includes(t.position) &&
                this.addSelector(t, n, u),
              (this[r] = n),
              this.cache.set(r, { $ref: n, events: u, option: t }),
              t.mounted && t.mounted.call(this.art, n),
              n
            );
          }
          addSelector(e, t, r) {
            const { hover: a, proxy: i } = this.art.events;
            (0, o.addClass)(t, "art-control-selector");
            const s = (0, o.createElement)("div");
            (0, o.addClass)(s, "art-selector-value"),
              (0, o.append)(s, e.html),
              (t.innerText = ""),
              (0, o.append)(t, s);
            const l = e.selector
                .map(
                  (e, t) =>
                    `<div class="art-selector-item ${
                      e.default ? "art-current" : ""
                    }" data-index="${t}">${e.html}</div>`
                )
                .join(""),
              c = (0, o.createElement)("div");
            (0, o.addClass)(c, "art-selector-list"),
              (0, o.append)(c, l),
              (0, o.append)(t, c);
            const p = () => {
              const e =
                (0, o.getStyle)(t, "width") / 2 -
                (0, o.getStyle)(c, "width") / 2;
              c.style.left = `${e}px`;
            };
            a(t, p);
            const u = i(c, "click", async (t) => {
              const r = (t.composedPath() || []).find((e) =>
                (0, o.hasClass)(e, "art-selector-item")
              );
              if (!r) return;
              (0, o.inverseClass)(r, "art-current");
              const a = Number(r.dataset.index),
                i = e.selector[a] || {};
              if (((s.innerText = r.innerText), e.onSelect)) {
                const a = await e.onSelect.call(this.art, i, r, t);
                (0, n.isStringOrNumber)(a) && (s.innerHTML = a);
              }
              p();
            });
            r.push(u);
          }
          remove(e) {
            const t = this.cache.get(e);
            (0, i.errorHandle)(t, `Can't find [${e}] from the [${this.name}]`),
              t.option.beforeUnmount &&
                t.option.beforeUnmount.call(this.art, t.$ref);
            for (let e = 0; e < t.events.length; e++)
              this.art.events.remove(t.events[e]);
            this.cache.delete(e), delete this[e], (0, o.remove)(t.$ref);
          }
          update(e) {
            return this.cache.get(e.name) && this.remove(e.name), this.add(e);
          }
        };
      },
      {
        "./dom": "bSNiV",
        "./format": "gapRl",
        "./error": "hwmZz",
        "option-validator": "bAWi2",
        "../scheme": "AKEiO",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    c61Lj: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("Fullscreen"),
            mounted: (e) => {
              const { proxy: r, icons: o, i18n: n } = t,
                i = (0, a.append)(e, o.fullscreenOn),
                s = (0, a.append)(e, o.fullscreenOff);
              (0, a.setStyle)(s, "display", "none"),
                r(e, "click", () => {
                  t.fullscreen = !t.fullscreen;
                }),
                t.on("fullscreen", (t) => {
                  t
                    ? ((0, a.tooltip)(e, n.get("Exit Fullscreen")),
                      (0, a.setStyle)(i, "display", "none"),
                      (0, a.setStyle)(s, "display", "inline-flex"))
                    : ((0, a.tooltip)(e, n.get("Fullscreen")),
                      (0, a.setStyle)(i, "display", "inline-flex"),
                      (0, a.setStyle)(s, "display", "none"));
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "03jeB": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("Web Fullscreen"),
            mounted: (e) => {
              const { proxy: r, icons: o, i18n: n } = t,
                i = (0, a.append)(e, o.fullscreenWebOn),
                s = (0, a.append)(e, o.fullscreenWebOff);
              (0, a.setStyle)(s, "display", "none"),
                r(e, "click", () => {
                  t.fullscreenWeb = !t.fullscreenWeb;
                }),
                t.on("fullscreenWeb", (t) => {
                  t
                    ? ((0, a.tooltip)(e, n.get("Exit Web Fullscreen")),
                      (0, a.setStyle)(i, "display", "none"),
                      (0, a.setStyle)(s, "display", "inline-flex"))
                    : ((0, a.tooltip)(e, n.get("Web Fullscreen")),
                      (0, a.setStyle)(i, "display", "inline-flex"),
                      (0, a.setStyle)(s, "display", "none"));
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    u8l8e: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("PIP Mode"),
            mounted: (e) => {
              const { proxy: r, icons: o, i18n: n } = t;
              (0, a.append)(e, o.pip),
                r(e, "click", () => {
                  t.pip = !t.pip;
                }),
                t.on("pip", (t) => {
                  (0, a.tooltip)(e, n.get(t ? "Exit PIP Mode" : "PIP Mode"));
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    ebXtb: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            mounted: (e) => {
              const { proxy: r, icons: o, i18n: n } = t,
                i = (0, a.append)(e, o.play),
                s = (0, a.append)(e, o.pause);
              function l() {
                (0, a.setStyle)(i, "display", "flex"),
                  (0, a.setStyle)(s, "display", "none");
              }
              function c() {
                (0, a.setStyle)(i, "display", "none"),
                  (0, a.setStyle)(s, "display", "flex");
              }
              (0, a.tooltip)(i, n.get("Play")),
                (0, a.tooltip)(s, n.get("Pause")),
                r(i, "click", () => {
                  t.play();
                }),
                r(s, "click", () => {
                  t.pause();
                }),
                t.playing ? c() : l(),
                t.on("video:playing", () => {
                  c();
                }),
                t.on("video:pause", () => {
                  l();
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    bgoVP: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r),
          a.export(r, "getPosFromEvent", () => n),
          a.export(r, "setCurrentTime", () => i);
        var o = e("../utils");
        function n(e, t) {
          const { $progress: r } = e.template,
            { left: a } = r.getBoundingClientRect(),
            n = o.isMobile ? t.touches[0].clientX : t.clientX,
            i = (0, o.clamp)(n - a, 0, r.clientWidth),
            s = (i / r.clientWidth) * e.duration;
          return {
            second: s,
            time: (0, o.secondToTime)(s),
            width: i,
            percentage: (0, o.clamp)(i / r.clientWidth, 0, 1),
          };
        }
        function i(e, t) {
          if (e.isRotate) {
            const r = t.touches[0].clientY / e.height,
              a = r * e.duration;
            e.emit("setBar", "played", r), (e.seek = a);
          } else {
            const { second: r, percentage: a } = n(e, t);
            e.emit("setBar", "played", a), (e.seek = r);
          }
        }
        r.default = function (e) {
          return (t) => {
            const { icons: r, option: a, proxy: s } = t;
            return {
              ...e,
              html: '<div class="art-control-progress-inner"><div class="art-progress-hover"></div><div class="art-progress-loaded"></div><div class="art-progress-played"></div><div class="art-progress-highlight"></div><div class="art-progress-indicator"></div><div class="art-progress-tip"></div></div>',
              mounted: (e) => {
                let l = !1;
                const c = (0, o.query)(".art-progress-hover", e),
                  p = (0, o.query)(".art-progress-loaded", e),
                  u = (0, o.query)(".art-progress-played", e),
                  d = (0, o.query)(".art-progress-highlight", e),
                  f = (0, o.query)(".art-progress-indicator", e),
                  h = (0, o.query)(".art-progress-tip", e);
                function m(e, t) {
                  "loaded" === e && (0, o.setStyle)(p, "width", 100 * t + "%"),
                    "played" === e &&
                      ((0, o.setStyle)(u, "width", 100 * t + "%"),
                      (0, o.setStyle)(f, "left", 100 * t + "%"));
                }
                r.indicator
                  ? (0, o.append)(f, r.indicator)
                  : (0, o.setStyle)(f, "backgroundColor", "var(--art-theme)"),
                  t.on("video:loadedmetadata", () => {
                    for (let e = 0; e < a.highlight.length; e++) {
                      const r = a.highlight[e],
                        n =
                          ((0, o.clamp)(r.time, 0, t.duration) / t.duration) *
                          100,
                        i = `<span data-text="${r.text}" data-time="${r.time}" style="left: ${n}%"></span>`;
                      (0, o.append)(d, i);
                    }
                  }),
                  m("loaded", t.loaded),
                  t.on("setBar", (e, t) => {
                    m(e, t);
                  }),
                  t.on("video:progress", () => {
                    m("loaded", t.loaded);
                  }),
                  t.on("video:timeupdate", () => {
                    m("played", t.played);
                  }),
                  t.on("video:ended", () => {
                    m("played", 1);
                  }),
                  o.isMobile ||
                    (s(e, "click", (e) => {
                      e.target !== f && i(t, e);
                    }),
                    s(e, "mousemove", (r) => {
                      !(function (e) {
                        const { width: r } = n(t, e);
                        (0, o.setStyle)(c, "width", `${r}px`),
                          (0, o.setStyle)(c, "display", "flex");
                      })(r),
                        (0, o.setStyle)(h, "display", "flex"),
                        (0, o.includeFromEvent)(r, d)
                          ? (function (r) {
                              const { width: a } = n(t, r),
                                { text: i } = r.target.dataset;
                              h.innerHTML = i;
                              const s = h.clientWidth;
                              a <= s / 2
                                ? (0, o.setStyle)(h, "left", 0)
                                : a > e.clientWidth - s / 2
                                ? (0, o.setStyle)(
                                    h,
                                    "left",
                                    e.clientWidth - s + "px"
                                  )
                                : (0, o.setStyle)(h, "left", a - s / 2 + "px");
                            })(r)
                          : (function (r) {
                              const { width: a, time: i } = n(t, r);
                              h.innerHTML = i;
                              const s = h.clientWidth;
                              a <= s / 2
                                ? (0, o.setStyle)(h, "left", 0)
                                : a > e.clientWidth - s / 2
                                ? (0, o.setStyle)(
                                    h,
                                    "left",
                                    e.clientWidth - s + "px"
                                  )
                                : (0, o.setStyle)(h, "left", a - s / 2 + "px");
                            })(r);
                    }),
                    s(e, "mouseleave", () => {
                      (0, o.setStyle)(h, "display", "none"),
                        (0, o.setStyle)(c, "display", "none");
                    }),
                    s(e, "mousedown", (e) => {
                      l = 0 === e.button;
                    }),
                    t.on("document:mousemove", (e) => {
                      if (l) {
                        const { second: r, percentage: a } = n(t, e);
                        m("played", a), (t.seek = r);
                      }
                    }),
                    t.on("document:mouseup", () => {
                      l && (l = !1);
                    }));
              },
            };
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    ikc2j: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            style: a.isMobile
              ? { fontSize: "12px", padding: "0 5px" }
              : { cursor: "auto", padding: "0 10px" },
            mounted: (e) => {
              function r() {
                const r = `${(0, a.secondToTime)(t.currentTime)} / ${(0,
                a.secondToTime)(t.duration)}`;
                r !== e.innerText && (e.innerText = r);
              }
              r();
              const o = [
                "video:loadedmetadata",
                "video:timeupdate",
                "video:progress",
              ];
              for (let e = 0; e < o.length; e++) t.on(o[e], r);
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    b8NFx: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            mounted: (e) => {
              const { proxy: r, icons: o } = t,
                n = (0, a.append)(e, o.volume),
                i = (0, a.append)(e, o.volumeClose),
                s = (0, a.append)(e, '<div class="art-volume-panel"></div>'),
                l = (0, a.append)(s, '<div class="art-volume-inner"></div>'),
                c = (0, a.append)(l, '<div class="art-volume-val"></div>'),
                p = (0, a.append)(l, '<div class="art-volume-slider"></div>'),
                u = (0, a.append)(p, '<div class="art-volume-handle"></div>'),
                d = (0, a.append)(u, '<div class="art-volume-loaded"></div>'),
                f = (0, a.append)(
                  p,
                  '<div class="art-volume-indicator"></div>'
                );
              function h(e) {
                const { top: t, height: r } = p.getBoundingClientRect();
                return 1 - (e.clientY - t) / r;
              }
              function m() {
                if (t.muted || 0 === t.volume)
                  (0, a.setStyle)(n, "display", "none"),
                    (0, a.setStyle)(i, "display", "flex"),
                    (0, a.setStyle)(f, "top", "100%"),
                    (0, a.setStyle)(d, "top", "100%"),
                    (c.innerText = 0);
                else {
                  const e = 100 * t.volume;
                  (0, a.setStyle)(n, "display", "flex"),
                    (0, a.setStyle)(i, "display", "none"),
                    (0, a.setStyle)(f, "top", 100 - e + "%"),
                    (0, a.setStyle)(d, "top", 100 - e + "%"),
                    (c.innerText = Math.floor(e));
                }
              }
              if (
                (m(),
                t.on("video:volumechange", m),
                r(n, "click", () => {
                  t.muted = !0;
                }),
                r(i, "click", () => {
                  t.muted = !1;
                }),
                a.isMobile)
              )
                (0, a.setStyle)(s, "display", "none");
              else {
                let e = !1;
                r(p, "mousedown", (r) => {
                  (e = 0 === r.button), (t.volume = h(r));
                }),
                  t.on("document:mousemove", (r) => {
                    e && ((t.muted = !1), (t.volume = h(r)));
                  }),
                  t.on("document:mouseup", () => {
                    e && (e = !1);
                  });
              }
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "03o9l": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("Show Setting"),
            mounted: (e) => {
              const { proxy: r, icons: o, i18n: n } = t;
              (0, a.append)(e, o.setting),
                r(e, "click", () => {
                  t.setting.toggle(), t.setting.updateStyle();
                }),
                t.on("setting", (t) => {
                  (0, a.tooltip)(e, n.get(t ? "Hide Setting" : "Show Setting"));
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    eCVx2: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils"),
          o = e("./progress");
        r.default = function (e) {
          return (t) => ({
            ...e,
            mounted: (e) => {
              const {
                option: r,
                template: { $progress: n, $video: i },
                events: { proxy: s, loadImg: l },
              } = t;
              let c = null,
                p = !1,
                u = !1;
              s(n, "mousemove", async (s) => {
                if (!p) {
                  p = !0;
                  const e = await l(r.thumbnails.url);
                  (c = e), (u = !0);
                }
                u &&
                  ((0, a.setStyle)(e, "display", "flex"),
                  (function (s) {
                    const { width: l } = (0, o.getPosFromEvent)(t, s),
                      {
                        url: p,
                        number: u,
                        column: d,
                        width: f,
                        height: h,
                      } = r.thumbnails,
                      m = f || c.naturalWidth / d,
                      g = h || m / (i.videoWidth / i.videoHeight),
                      v = n.clientWidth / u,
                      y = Math.floor(l / v),
                      b = Math.ceil(y / d) - 1,
                      x = y % d || d - 1;
                    (0, a.setStyle)(e, "backgroundImage", `url(${p})`),
                      (0, a.setStyle)(e, "height", `${g}px`),
                      (0, a.setStyle)(e, "width", `${m}px`),
                      (0, a.setStyle)(
                        e,
                        "backgroundPosition",
                        `-${x * m}px -${b * g}px`
                      ),
                      l <= m / 2
                        ? (0, a.setStyle)(e, "left", 0)
                        : l > n.clientWidth - m / 2
                        ? (0, a.setStyle)(e, "left", n.clientWidth - m + "px")
                        : (0, a.setStyle)(e, "left", l - m / 2 + "px");
                  })(s));
              }),
                s(n, "mouseleave", () => {
                  (0, a.setStyle)(e, "display", "none");
                }),
                t.on("hover", (t) => {
                  t || (0, a.setStyle)(e, "display", "none");
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "./progress": "bgoVP",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "4KCF5": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("Screenshot"),
            mounted: (e) => {
              const { proxy: r, icons: o } = t;
              (0, a.append)(e, o.screenshot),
                r(e, "click", () => {
                  t.screenshot();
                });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "2hIff": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            mounted: (e) => {
              const r = (0, a.append)(
                  e,
                  '<span class="art-loop-point"></span>'
                ),
                o = (0, a.append)(e, '<span class="art-loop-point"></span>');
              t.on("loop", (n) => {
                n && n.length
                  ? ((0, a.setStyle)(e, "display", "flex"),
                    (0, a.setStyle)(
                      r,
                      "left",
                      `calc(${(n[0] / t.duration) * 100}% - ${r.clientWidth}px)`
                    ),
                    (0, a.setStyle)(o, "left", (n[1] / t.duration) * 100 + "%"))
                  : (0, a.setStyle)(e, "display", "none");
              });
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "4IS2d": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => ({
            ...e,
            tooltip: t.i18n.get("AirPlay"),
            mounted: (e) => {
              const { proxy: r, icons: o } = t;
              (0, a.append)(e, o.airplay), r(e, "click", () => t.airplay());
            },
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "2KYsr": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils"),
          n = e("../utils/component"),
          i = a.interopDefault(n),
          s = e("./playbackRate"),
          l = a.interopDefault(s),
          c = e("./aspectRatio"),
          p = a.interopDefault(c),
          u = e("./flip"),
          d = a.interopDefault(u),
          f = e("./info"),
          h = a.interopDefault(f),
          m = e("./version"),
          g = a.interopDefault(m),
          v = e("./close"),
          y = a.interopDefault(v);
        class b extends i.default {
          constructor(e) {
            super(e),
              (this.name = "contextmenu"),
              (this.$parent = e.template.$contextmenu),
              o.isMobile || this.init();
          }
          init() {
            const {
              option: e,
              proxy: t,
              template: { $player: r, $contextmenu: a },
            } = this.art;
            e.playbackRate &&
              this.add((0, l.default)({ name: "playbackRate", index: 10 })),
              e.aspectRatio &&
                this.add((0, p.default)({ name: "aspectRatio", index: 20 })),
              e.flip && this.add((0, d.default)({ name: "flip", index: 30 })),
              this.add((0, h.default)({ name: "info", index: 40 })),
              this.add((0, g.default)({ name: "version", index: 50 })),
              this.add((0, y.default)({ name: "close", index: 60 }));
            for (let t = 0; t < e.contextmenu.length; t++)
              this.add(e.contextmenu[t]);
            t(r, "contextmenu", (e) => {
              if ((e.preventDefault(), !this.art.constructor.CONTEXTMENU))
                return;
              this.show = !0;
              const t = e.clientX,
                n = e.clientY,
                {
                  height: i,
                  width: s,
                  left: l,
                  top: c,
                } = r.getBoundingClientRect(),
                { height: p, width: u } = a.getBoundingClientRect();
              let d = t - l,
                f = n - c;
              t + u > l + s && (d = s - u),
                n + p > c + i && (f = i - p),
                (0, o.setStyles)(a, { top: `${f}px`, left: `${d}px` });
            }),
              t(r, "click", (e) => {
                (0, o.includeFromEvent)(e, a) || (this.show = !1);
              }),
              this.art.on("blur", () => {
                this.show = !1;
              });
          }
        }
        r.default = b;
      },
      {
        "../utils": "71aH7",
        "../utils/component": "18nVI",
        "./playbackRate": "69eLi",
        "./aspectRatio": "lUefg",
        "./flip": "kysiM",
        "./info": "gqIgJ",
        "./version": "kRU7C",
        "./close": "jQ8Pm",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "69eLi": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => {
            const {
                i18n: r,
                constructor: { PLAYBACK_RATE: o },
              } = t,
              n = o
                .map(
                  (e) =>
                    `<span data-value="${e}">${
                      1 === e ? r.get("Normal") : e.toFixed(1)
                    }</span>`
                )
                .join("");
            return {
              ...e,
              html: `${r.get("Play Speed")}: ${n}`,
              click: (e, r) => {
                const { value: a } = r.target.dataset;
                a && ((t.playbackRate = Number(a)), (e.show = !1));
              },
              mounted: (e) => {
                const r = (0, a.query)('[data-value="1"]', e);
                r && (0, a.inverseClass)(r, "art-current"),
                  t.on("video:ratechange", () => {
                    const r = (0, a.queryAll)("span", e).find(
                      (e) => Number(e.dataset.value) === t.playbackRate
                    );
                    r && (0, a.inverseClass)(r, "art-current");
                  });
              },
            };
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    lUefg: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => {
            const {
                i18n: r,
                constructor: { ASPECT_RATIO: o },
              } = t,
              n = o
                .map(
                  (e) =>
                    `<span data-value="${e}">${
                      "default" === e ? r.get("Default") : e
                    }</span>`
                )
                .join("");
            return {
              ...e,
              html: `${r.get("Aspect Ratio")}: ${n}`,
              click: (e, r) => {
                const { value: a } = r.target.dataset;
                a && ((t.aspectRatio = a), (e.show = !1));
              },
              mounted: (e) => {
                const r = (0, a.query)('[data-value="default"]', e);
                r && (0, a.inverseClass)(r, "art-current"),
                  t.on("aspectRatio", (t) => {
                    const r = (0, a.queryAll)("span", e).find(
                      (e) => e.dataset.value === t
                    );
                    r && (0, a.inverseClass)(r, "art-current");
                  });
              },
            };
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    kysiM: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          return (t) => {
            const {
                i18n: r,
                constructor: { FLIP: o },
              } = t,
              n = o
                .map(
                  (e) =>
                    `<span data-value="${e}">${r.get(
                      (0, a.capitalize)(e)
                    )}</span>`
                )
                .join("");
            return {
              ...e,
              html: `${r.get("Video Flip")}: ${n}`,
              click: (e, r) => {
                const { value: a } = r.target.dataset;
                a && ((t.flip = a.toLowerCase()), (e.show = !1));
              },
              mounted: (e) => {
                const r = (0, a.query)('[data-value="normal"]', e);
                r && (0, a.inverseClass)(r, "art-current"),
                  t.on("flip", (t) => {
                    const r = (0, a.queryAll)("span", e).find(
                      (e) => e.dataset.value === t
                    );
                    r && (0, a.inverseClass)(r, "art-current");
                  });
              },
            };
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    gqIgJ: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e) {
            return (t) => ({
              ...e,
              html: t.i18n.get("Video Info"),
              click: (e) => {
                (t.info.show = !0), (e.show = !1);
              },
            });
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    kRU7C: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e) {
            return {
              ...e,
              html: '<a href="https://artplayer.org" target="_blank">ArtPlayer 5.0.9</a>',
            };
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    jQ8Pm: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e) {
            return (t) => ({
              ...e,
              html: t.i18n.get("Close"),
              click: (e) => {
                e.show = !1;
              },
            });
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "02ajl": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./utils"),
          n = e("./utils/component"),
          i = a.interopDefault(n);
        class s extends i.default {
          constructor(e) {
            super(e), (this.name = "info"), o.isMobile || this.init();
          }
          init() {
            const {
              proxy: e,
              constructor: t,
              template: { $infoPanel: r, $infoClose: a, $video: n },
            } = this.art;
            e(a, "click", () => {
              this.show = !1;
            });
            let i = null;
            const s = (0, o.queryAll)("[data-video]", r) || [];
            this.art.on("destroy", () => clearTimeout(i)),
              (function e() {
                for (let e = 0; e < s.length; e++) {
                  const t = s[e],
                    r = n[t.dataset.video],
                    a = "number" == typeof r ? r.toFixed(2) : r;
                  t.innerText !== a && (t.innerText = a);
                }
                i = setTimeout(e, t.INFO_LOOP_TIME);
              })();
          }
        }
        r.default = s;
      },
      {
        "./utils": "71aH7",
        "./utils/component": "18nVI",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    eSWto: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./utils"),
          n = e("./utils/component"),
          i = a.interopDefault(n),
          s = e("option-validator"),
          l = a.interopDefault(s),
          c = e("./scheme"),
          p = a.interopDefault(c);
        class u extends i.default {
          constructor(e) {
            super(e),
              (this.name = "subtitle"),
              (this.eventDestroy = () => null),
              this.init(e.option.subtitle);
            let t = !1;
            e.on("video:timeupdate", () => {
              if (!this.url) return;
              const e = this.art.template.$video.webkitDisplayingFullscreen;
              "boolean" == typeof e &&
                e !== t &&
                ((t = e),
                this.createTrack(e ? "subtitles" : "metadata", this.url));
            });
          }
          get url() {
            return this.art.template.$track.src;
          }
          set url(e) {
            this.switch(e);
          }
          get textTrack() {
            return this.art.template.$video.textTracks[0];
          }
          get activeCue() {
            return this.textTrack.activeCues[0];
          }
          style(e, t) {
            const { $subtitle: r } = this.art.template;
            return "object" == typeof e
              ? (0, o.setStyles)(r, e)
              : (0, o.setStyle)(r, e, t);
          }
          update() {
            const { $subtitle: e } = this.art.template;
            (e.innerHTML = ""),
              this.activeCue &&
                (this.art.option.subtitle.escape
                  ? (e.innerHTML = this.activeCue.text
                      .split(/\r?\n/)
                      .map((e) => `<p>${(0, o.escape)(e)}</p>`)
                      .join(""))
                  : (e.innerHTML = this.activeCue.text),
                this.art.emit("subtitleUpdate", this.activeCue.text));
          }
          async switch(e, t = {}) {
            const { i18n: r, notice: a, option: o } = this.art,
              n = { ...o.subtitle, ...t, url: e },
              i = await this.init(n);
            return (
              t.name && (a.show = `${r.get("Switch Subtitle")}: ${t.name}`), i
            );
          }
          createTrack(e, t) {
            const { template: r, proxy: a } = this.art,
              { $video: n, $track: i } = r,
              s = (0, o.createElement)("track");
            (s.default = !0),
              (s.kind = e),
              (s.src = t),
              (s.track.mode = "hidden"),
              this.eventDestroy(),
              (0, o.remove)(i),
              (0, o.append)(n, s),
              (r.$track = s),
              (this.eventDestroy = a(this.textTrack, "cuechange", () =>
                this.update()
              ));
          }
          async init(e) {
            const {
              notice: t,
              template: { $subtitle: r },
            } = this.art;
            if (((0, l.default)(e, p.default.subtitle), e.url))
              return (
                this.style(e.style),
                fetch(e.url)
                  .then((e) => e.arrayBuffer())
                  .then((t) => {
                    const r = new TextDecoder(e.encoding).decode(t);
                    switch (
                      (this.art.emit("subtitleLoad", e.url),
                      e.type || (0, o.getExt)(e.url))
                    ) {
                      case "srt": {
                        const t = (0, o.srtToVtt)(r),
                          a = e.onVttLoad(t);
                        return (0, o.vttToBlob)(a);
                      }
                      case "ass": {
                        const t = (0, o.assToVtt)(r),
                          a = e.onVttLoad(t);
                        return (0, o.vttToBlob)(a);
                      }
                      case "vtt": {
                        const t = e.onVttLoad(r);
                        return (0, o.vttToBlob)(t);
                      }
                      default:
                        return e.url;
                    }
                  })
                  .then(
                    (e) => (
                      (r.innerHTML = ""),
                      this.url === e ||
                        (URL.revokeObjectURL(this.url),
                        this.createTrack("metadata", e),
                        this.art.emit("subtitleSwitch", e)),
                      e
                    )
                  )
                  .catch((e) => {
                    throw ((t.show = e), e);
                  })
              );
          }
        }
        r.default = u;
      },
      {
        "./utils": "71aH7",
        "./utils/component": "18nVI",
        "option-validator": "bAWi2",
        "./scheme": "AKEiO",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    jo4S1: [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils/error"),
          n = e("./clickInit"),
          i = a.interopDefault(n),
          s = e("./hoverInit"),
          l = a.interopDefault(s),
          c = e("./moveInit"),
          p = a.interopDefault(c),
          u = e("./resizeInit"),
          d = a.interopDefault(u),
          f = e("./gestureInit"),
          h = a.interopDefault(f),
          m = e("./viewInit"),
          g = a.interopDefault(m),
          v = e("./documentInit"),
          y = a.interopDefault(v);
        r.default = class {
          constructor(e) {
            (this.destroyEvents = []),
              (this.proxy = this.proxy.bind(this)),
              (this.hover = this.hover.bind(this)),
              (this.loadImg = this.loadImg.bind(this)),
              (0, i.default)(e, this),
              (0, l.default)(e, this),
              (0, p.default)(e, this),
              (0, d.default)(e, this),
              (0, h.default)(e, this),
              (0, g.default)(e, this),
              (0, y.default)(e, this);
          }
          proxy(e, t, r, a = {}) {
            if (Array.isArray(t)) return t.map((t) => this.proxy(e, t, r, a));
            e.addEventListener(t, r, a);
            const o = () => e.removeEventListener(t, r, a);
            return this.destroyEvents.push(o), o;
          }
          hover(e, t, r) {
            t && this.proxy(e, "mouseenter", t),
              r && this.proxy(e, "mouseleave", r);
          }
          loadImg(e) {
            return new Promise((t, r) => {
              let a;
              if (e instanceof HTMLImageElement) a = e;
              else {
                if ("string" != typeof e)
                  return r(new (0, o.ArtPlayerError)("Unable to get Image"));
                (a = new Image()), (a.src = e);
              }
              if (a.complete) return t(a);
              this.proxy(a, "load", () => t(a)),
                this.proxy(a, "error", () =>
                  r(new (0, o.ArtPlayerError)(`Failed to load Image: ${a.src}`))
                );
            });
          }
          remove(e) {
            const t = this.destroyEvents.indexOf(e);
            t > -1 && (e(), this.destroyEvents.splice(t, 1));
          }
          destroy() {
            for (let e = 0; e < this.destroyEvents.length; e++)
              this.destroyEvents[e]();
          }
        };
      },
      {
        "../utils/error": "hwmZz",
        "./clickInit": "6UrCm",
        "./hoverInit": "4jWHi",
        "./moveInit": "eqaUm",
        "./resizeInit": "eDXPO",
        "./gestureInit": "95GtS",
        "./viewInit": "InUBx",
        "./documentInit": "hoLfM",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6UrCm": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e, t) {
          const {
            constructor: r,
            template: { $player: o, $video: n },
          } = e;
          t.proxy(document, ["click", "contextmenu"], (t) => {
            (0, a.includeFromEvent)(t, o)
              ? ((e.isInput = "INPUT" === t.target.tagName),
                (e.isFocus = !0),
                e.emit("focus", t))
              : ((e.isInput = !1), (e.isFocus = !1), e.emit("blur", t));
          });
          let i = 0;
          t.proxy(n, "click", (t) => {
            const o = Date.now(),
              {
                MOBILE_CLICK_PLAY: n,
                DBCLICK_TIME: s,
                MOBILE_DBCLICK_PLAY: l,
                DBCLICK_FULLSCREEN: c,
              } = r;
            o - i <= s
              ? (e.emit("dblclick", t),
                a.isMobile
                  ? !e.isLock && l && e.toggle()
                  : c && (e.fullscreen = !e.fullscreen))
              : (e.emit("click", t),
                a.isMobile ? !e.isLock && n && e.toggle() : e.toggle()),
              (i = o);
          });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "4jWHi": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e, t) {
          const { $player: r } = e.template;
          t.hover(
            r,
            (t) => {
              (0, a.addClass)(r, "art-hover"), e.emit("hover", !0, t);
            },
            (t) => {
              (0, a.removeClass)(r, "art-hover"), e.emit("hover", !1, t);
            }
          );
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    eqaUm: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e, t) {
            const { $player: r } = e.template;
            t.proxy(r, "mousemove", (t) => {
              e.emit("mousemove", t);
            });
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    eDXPO: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e, t) {
          const { option: r, constructor: o } = e;
          e.on("resize", () => {
            const { aspectRatio: t, notice: a } = e;
            "standard" === e.state && r.autoSize && e.autoSize(),
              (e.aspectRatio = t),
              (a.show = "");
          });
          const n = (0, a.debounce)(() => e.emit("resize"), o.RESIZE_TIME);
          t.proxy(window, ["orientationchange", "resize"], () => n()),
            screen &&
              screen.orientation &&
              screen.orientation.onchange &&
              t.proxy(screen.orientation, "change", () => n());
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "95GtS": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils"),
          o = e("../control/progress");
        function n(e, t, r, a) {
          var o = t - a,
            n = r - e,
            i = 0;
          if (Math.abs(n) < 2 && Math.abs(o) < 2) return i;
          var s = (function (e, t) {
            return (180 * Math.atan2(t, e)) / Math.PI;
          })(n, o);
          return (
            s >= -45 && s < 45
              ? (i = 4)
              : s >= 45 && s < 135
              ? (i = 1)
              : s >= -135 && s < -45
              ? (i = 2)
              : ((s >= 135 && s <= 180) || (s >= -180 && s < -135)) && (i = 3),
            i
          );
        }
        r.default = function (e, t) {
          if (a.isMobile && !e.option.isLive) {
            const { $video: r, $progress: i } = e.template;
            let s = null,
              l = !1,
              c = 0,
              p = 0,
              u = 0;
            const d = (t) => {
                if (1 === t.touches.length && !e.isLock) {
                  s === i && (0, o.setCurrentTime)(e, t), (l = !0);
                  const { pageX: r, pageY: a } = t.touches[0];
                  (c = r), (p = a), (u = e.currentTime);
                }
              },
              f = (t) => {
                if (1 === t.touches.length && l && e.duration) {
                  const { pageX: o, pageY: i } = t.touches[0],
                    l = n(c, p, o, i),
                    d = [3, 4].includes(l),
                    f = [1, 2].includes(l);
                  if ((d && !e.isRotate) || (f && e.isRotate)) {
                    const t = (0, a.clamp)((o - c) / e.width, -1, 1),
                      n = (0, a.clamp)((i - p) / e.height, -1, 1),
                      l = e.isRotate ? n : t,
                      d = s === r ? e.constructor.TOUCH_MOVE_RATIO : 1,
                      f = (0, a.clamp)(u + e.duration * l * d, 0, e.duration);
                    (e.seek = f),
                      e.emit(
                        "setBar",
                        "played",
                        (0, a.clamp)(f / e.duration, 0, 1)
                      ),
                      (e.notice.show = `${(0, a.secondToTime)(f)} / ${(0,
                      a.secondToTime)(e.duration)}`);
                  }
                }
              },
              h = () => {
                l && ((c = 0), (p = 0), (u = 0), (l = !1), (s = null));
              };
            t.proxy(i, "touchstart", (e) => {
              (s = i), d(e);
            }),
              t.proxy(r, "touchstart", (e) => {
                (s = r), d(e);
              }),
              t.proxy(r, "touchmove", f),
              t.proxy(i, "touchmove", f),
              t.proxy(document, "touchend", h);
          }
        };
      },
      {
        "../utils": "71aH7",
        "../control/progress": "bgoVP",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    InUBx: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e, t) {
          const {
              option: r,
              constructor: o,
              template: { $container: n },
            } = e,
            i = (0, a.throttle)(() => {
              e.emit("view", (0, a.isInViewport)(n, o.SCROLL_GAP));
            }, o.SCROLL_TIME);
          t.proxy(window, "scroll", () => i()),
            e.on("view", (t) => {
              r.autoMini && (e.mini = !t);
            });
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    hoLfM: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e, t) {
            t.proxy(document, "mousemove", (t) => {
              e.emit("document:mousemove", t);
            }),
              t.proxy(document, "mouseup", (t) => {
                e.emit("document:mouseup", t);
              });
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "6NoFy": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("./utils");
        r.default = class {
          constructor(e) {
            (this.art = e),
              (this.keys = {}),
              e.option.hotkey && !a.isMobile && this.init();
          }
          init() {
            const { proxy: e, constructor: t } = this.art;
            this.add(27, () => {
              this.art.fullscreenWeb && (this.art.fullscreenWeb = !1);
            }),
              this.add(32, () => {
                this.art.toggle();
              }),
              this.add(37, () => {
                this.art.backward = t.SEEK_STEP;
              }),
              this.add(38, () => {
                this.art.volume += t.VOLUME_STEP;
              }),
              this.add(39, () => {
                this.art.forward = t.SEEK_STEP;
              }),
              this.add(40, () => {
                this.art.volume -= t.VOLUME_STEP;
              }),
              e(window, "keydown", (e) => {
                if (this.art.isFocus) {
                  const t = document.activeElement.tagName.toUpperCase(),
                    r = document.activeElement.getAttribute("contenteditable");
                  if (
                    "INPUT" !== t &&
                    "TEXTAREA" !== t &&
                    "" !== r &&
                    "true" !== r
                  ) {
                    const t = this.keys[e.keyCode];
                    if (t) {
                      e.preventDefault();
                      for (let r = 0; r < t.length; r++) t[r].call(this.art, e);
                      this.art.emit("hotkey", e);
                    }
                  }
                }
              });
          }
          add(e, t) {
            return (
              this.keys[e] ? this.keys[e].push(t) : (this.keys[e] = [t]), this
            );
          }
          remove(e, t) {
            if (this.keys[e]) {
              const r = this.keys[e].indexOf(t);
              -1 !== r && this.keys[e].splice(r, 1);
            }
            return this;
          }
        };
      },
      {
        "./utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6G6hZ": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./utils/component"),
          n = a.interopDefault(o);
        class i extends n.default {
          constructor(e) {
            super(e);
            const {
              option: t,
              template: { $layer: r },
            } = e;
            (this.name = "layer"), (this.$parent = r);
            for (let e = 0; e < t.layers.length; e++) this.add(t.layers[e]);
          }
        }
        r.default = i;
      },
      {
        "./utils/component": "18nVI",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "3dsEe": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./utils"),
          n = e("./utils/component"),
          i = a.interopDefault(n);
        class s extends i.default {
          constructor(e) {
            super(e),
              (this.name = "loading"),
              (0, o.append)(e.template.$loading, e.icons.loading);
          }
        }
        r.default = s;
      },
      {
        "./utils": "71aH7",
        "./utils/component": "18nVI",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    dWGTw: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("./utils");
        r.default = class {
          constructor(e) {
            (this.art = e), (this.timer = null);
          }
          set show(e) {
            const {
              constructor: t,
              template: { $player: r, $noticeInner: o },
            } = this.art;
            e
              ? ((o.innerText = e instanceof Error ? e.message.trim() : e),
                (0, a.addClass)(r, "art-notice-show"),
                clearTimeout(this.timer),
                (this.timer = setTimeout(() => {
                  (o.innerText = ""), (0, a.removeClass)(r, "art-notice-show");
                }, t.NOTICE_TIME)))
              : (0, a.removeClass)(r, "art-notice-show");
          }
        };
      },
      {
        "./utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "5POkG": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./utils"),
          n = e("./utils/component"),
          i = a.interopDefault(n);
        class s extends i.default {
          constructor(e) {
            super(e), (this.name = "mask");
            const { template: t, icons: r, events: a } = e,
              n = (0, o.append)(t.$state, r.state),
              i = (0, o.append)(t.$state, r.error);
            (0, o.setStyle)(i, "display", "none"),
              e.on("destroy", () => {
                (0, o.setStyle)(n, "display", "none"),
                  (0, o.setStyle)(i, "display", null);
              }),
              a.proxy(t.$state, "click", () => e.play());
          }
        }
        r.default = s;
      },
      {
        "./utils": "71aH7",
        "./utils/component": "18nVI",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "6OeNg": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils"),
          n = e("bundle-text:./loading.svg"),
          i = a.interopDefault(n),
          s = e("bundle-text:./state.svg"),
          l = a.interopDefault(s),
          c = e("bundle-text:./check.svg"),
          p = a.interopDefault(c),
          u = e("bundle-text:./play.svg"),
          d = a.interopDefault(u),
          f = e("bundle-text:./pause.svg"),
          h = a.interopDefault(f),
          m = e("bundle-text:./volume.svg"),
          g = a.interopDefault(m),
          v = e("bundle-text:./volume-close.svg"),
          y = a.interopDefault(v),
          b = e("bundle-text:./screenshot.svg"),
          x = a.interopDefault(b),
          w = e("bundle-text:./setting.svg"),
          j = a.interopDefault(w),
          k = e("bundle-text:./arrow-left.svg"),
          S = a.interopDefault(k),
          I = e("bundle-text:./arrow-right.svg"),
          C = a.interopDefault(I),
          P = e("bundle-text:./playback-rate.svg"),
          $ = a.interopDefault(P),
          M = e("bundle-text:./aspect-ratio.svg"),
          T = a.interopDefault(M),
          E = e("bundle-text:./config.svg"),
          F = a.interopDefault(E),
          A = e("bundle-text:./pip.svg"),
          z = a.interopDefault(A),
          H = e("bundle-text:./lock.svg"),
          D = a.interopDefault(H),
          R = e("bundle-text:./unlock.svg"),
          O = a.interopDefault(R),
          L = e("bundle-text:./fullscreen-off.svg"),
          V = a.interopDefault(L),
          N = e("bundle-text:./fullscreen-on.svg"),
          Y = a.interopDefault(N),
          _ = e("bundle-text:./fullscreen-web-off.svg"),
          W = a.interopDefault(_),
          q = e("bundle-text:./fullscreen-web-on.svg"),
          B = a.interopDefault(q),
          U = e("bundle-text:./switch-on.svg"),
          K = a.interopDefault(U),
          G = e("bundle-text:./switch-off.svg"),
          Z = a.interopDefault(G),
          X = e("bundle-text:./flip.svg"),
          J = a.interopDefault(X),
          Q = e("bundle-text:./error.svg"),
          ee = a.interopDefault(Q),
          te = e("bundle-text:./close.svg"),
          re = a.interopDefault(te),
          ae = e("bundle-text:./airplay.svg"),
          oe = a.interopDefault(ae);
        r.default = class {
          constructor(e) {
            const t = {
              loading: i.default,
              state: l.default,
              play: d.default,
              pause: h.default,
              check: p.default,
              volume: g.default,
              volumeClose: y.default,
              screenshot: x.default,
              setting: j.default,
              pip: z.default,
              arrowLeft: S.default,
              arrowRight: C.default,
              playbackRate: $.default,
              aspectRatio: T.default,
              config: F.default,
              lock: D.default,
              flip: J.default,
              unlock: O.default,
              fullscreenOff: V.default,
              fullscreenOn: Y.default,
              fullscreenWebOff: W.default,
              fullscreenWebOn: B.default,
              switchOn: K.default,
              switchOff: Z.default,
              error: ee.default,
              close: re.default,
              airplay: oe.default,
              ...e.option.icons,
            };
            for (const e in t)
              (0, o.def)(this, e, { get: () => (0, o.getIcon)(e, t[e]) });
          }
        };
      },
      {
        "../utils": "71aH7",
        "bundle-text:./loading.svg": "7tDub",
        "bundle-text:./state.svg": "1ElZc",
        "bundle-text:./check.svg": "lmgoP",
        "bundle-text:./play.svg": "lVWoQ",
        "bundle-text:./pause.svg": "5Mnax",
        "bundle-text:./volume.svg": "w3eIa",
        "bundle-text:./volume-close.svg": "rHjo1",
        "bundle-text:./screenshot.svg": "2KcqM",
        "bundle-text:./setting.svg": "8rQMV",
        "bundle-text:./arrow-left.svg": "kqGBE",
        "bundle-text:./arrow-right.svg": "aFjpC",
        "bundle-text:./playback-rate.svg": "lx7ZM",
        "bundle-text:./aspect-ratio.svg": "2sEjf",
        "bundle-text:./config.svg": "fQTgE",
        "bundle-text:./pip.svg": "2CaxO",
        "bundle-text:./lock.svg": "aCGnW",
        "bundle-text:./unlock.svg": "bTrAV",
        "bundle-text:./fullscreen-off.svg": "bA3p0",
        "bundle-text:./fullscreen-on.svg": "fTuY8",
        "bundle-text:./fullscreen-web-off.svg": "tvKf4",
        "bundle-text:./fullscreen-web-on.svg": "1F1oB",
        "bundle-text:./switch-on.svg": "7qNHs",
        "bundle-text:./switch-off.svg": "28aV8",
        "bundle-text:./flip.svg": "1uXI6",
        "bundle-text:./error.svg": "9f4dh",
        "bundle-text:./close.svg": "4nTtS",
        "bundle-text:./airplay.svg": "cDPXC",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "7tDub": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><path fill="none" class="bk" d="M0 0h100v100H0z"/><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-1s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(30 105.98 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(60 75.98 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(90 65 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(120 58.66 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(150 54.02 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(180 50 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(-150 45.98 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(-120 41.34 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(-90 35 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(-60 24.02 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect><rect x="47" y="40" width="6" height="20" rx="5" ry="5" fill="#fff" transform="rotate(-30 -5.98 65)"><animate attributeName="opacity" from="1" to="0" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect></svg>';
      },
      {},
    ],
    "1ElZc": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><path fill="#fff" d="M9.5 9.325v5.35q0 .575.525.875t1.025-.05l4.15-2.65q.475-.3.475-.85t-.475-.85L11.05 8.5q-.5-.35-1.025-.05t-.525.875ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>';
      },
      {},
    ],
    lmgoP: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:100%;height:100%"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#fff"/></svg>';
      },
      {},
    ],
    lVWoQ: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="M17.982 9.275 8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z"/></svg>';
      },
      {},
    ],
    "5Mnax": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z"/></svg>';
      },
      {},
    ],
    w3eIa: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="M10.188 4.65 6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zm4.258-.872a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z"/><path d="M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z"/></svg>';
      },
      {},
    ],
    rHjo1: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><path d="M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z"/><path d="M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zm5.195 13.195-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z"/></svg>';
      },
      {},
    ],
    "2KcqM": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 50 50"><path d="M19.402 6a5 5 0 0 0-4.902 4.012L14.098 12H9a5 5 0 0 0-5 5v21a5 5 0 0 0 5 5h32a5 5 0 0 0 5-5V17a5 5 0 0 0-5-5h-5.098l-.402-1.988A5 5 0 0 0 30.598 6ZM25 17c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10Zm0 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z"/></svg>';
      },
      {},
    ],
    "8rQMV": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22"><circle cx="11" cy="11" r="2"/><path d="M19.164 8.861 17.6 8.6a6.978 6.978 0 0 0-1.186-2.099l.574-1.533a1 1 0 0 0-.436-1.217l-1.997-1.153a1.001 1.001 0 0 0-1.272.23l-1.008 1.225a7.04 7.04 0 0 0-2.55.001L8.716 2.829a1 1 0 0 0-1.272-.23L5.447 3.751a1 1 0 0 0-.436 1.217l.574 1.533A6.997 6.997 0 0 0 4.4 8.6l-1.564.261A.999.999 0 0 0 2 9.847v2.306c0 .489.353.906.836.986l1.613.269a7 7 0 0 0 1.228 2.075l-.558 1.487a1 1 0 0 0 .436 1.217l1.997 1.153c.423.244.961.147 1.272-.23l1.04-1.263a7.089 7.089 0 0 0 2.272 0l1.04 1.263a1 1 0 0 0 1.272.23l1.997-1.153a1 1 0 0 0 .436-1.217l-.557-1.487c.521-.61.94-1.31 1.228-2.075l1.613-.269a.999.999 0 0 0 .835-.986V9.847a.999.999 0 0 0-.836-.986zM11 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>';
      },
      {},
    ],
    kqGBE: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32"><path d="m19.41 20.09-4.58-4.59 4.58-4.59L18 9.5l-6 6 6 6z" fill="#fff"/></svg>';
      },
      {},
    ],
    aFjpC: [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32"><path d="m12.59 20.34 4.58-4.59-4.58-4.59L14 9.75l6 6-6 6z" fill="#fff"/></svg>';
      },
      {},
    ],
    lx7ZM: [
      function (e, t, r) {
        t.exports =
          '<svg height="24" width="24"><path d="M10 8v8l6-4-6-4zM6.3 5l-.6-.8C7.2 3 9 2.2 11 2l.1 1c-1.8.2-3.4.9-4.8 2zM5 6.3l-.8-.6C3 7.2 2.2 9 2 11l1 .1c.2-1.8.9-3.4 2-4.8zm0 11.4c-1.1-1.4-1.8-3.1-2-4.8L2 13c.2 2 1 3.8 2.2 5.4l.8-.7zm6.1 3.3c-1.8-.2-3.4-.9-4.8-2l-.6.8C7.2 21 9 21.8 11 22l.1-1zM22 12c0-5.2-3.9-9.4-9-10l-.1 1c4.6.5 8.1 4.3 8.1 9s-3.5 8.5-8.1 9l.1 1c5.2-.5 9-4.8 9-10z" fill="#fff" style="--darkreader-inline-fill:#a8a6a4"/></svg>';
      },
      {},
    ],
    "2sEjf": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" style="width:100%;height:100%;transform:translate(0,0)"><defs><clipPath id="__lottie_element_216"><path d="M0 0h88v88H0z"/></clipPath></defs><g style="display:block" clip-path="url(\'#__lottie_element_216\')"><path fill="#FFF" d="m12.438-12.702-2.82 2.82c-.79.79-.79 2.05 0 2.83l7.07 7.07-7.07 7.07c-.79.79-.79 2.05 0 2.83l2.82 2.83c.79.78 2.05.78 2.83 0l11.32-11.31c.78-.78.78-2.05 0-2.83l-11.32-11.31c-.78-.79-2.04-.79-2.83 0zm-24.88 0c-.74-.74-1.92-.78-2.7-.12l-.13.12-11.31 11.31a2 2 0 0 0-.12 2.7l.12.13 11.31 11.31a2 2 0 0 0 2.7.12l.13-.12 2.83-2.83c.74-.74.78-1.91.11-2.7l-.11-.13-7.07-7.07 7.07-7.07c.74-.74.78-1.91.11-2.7l-.11-.13-2.83-2.82zM28-28c4.42 0 8 3.58 8 8v40c0 4.42-3.58 8-8 8h-56c-4.42 0-8-3.58-8-8v-40c0-4.42 3.58-8 8-8h56z" style="--darkreader-inline-fill:#a8a6a4" transform="translate(44 44)"/></g></svg>';
      },
      {},
    ],
    fQTgE: [
      function (e, t, r) {
        t.exports =
          '<svg height="24" width="24"><path d="M15 17h6v1h-6v-1zm-4 0H3v1h8v2h1v-5h-1v2zm3-9h1V3h-1v2H3v1h11v2zm4-3v1h3V5h-3zM6 14h1V9H6v2H3v1h3v2zm4-2h11v-1H10v1z" fill="#fff" style="--darkreader-inline-fill:#a8a6a4"/></svg>';
      },
      {},
    ],
    "2CaxO": [
      function (e, t, r) {
        t.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" height="32" width="32"><path d="M25 17h-8v6h8v-6Zm4 8V10.98C29 9.88 28.1 9 27 9H9c-1.1 0-2 .88-2 1.98V25c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2Zm-2 .02H9V10.97h18v14.05Z"/></svg>';
      },
      {},
    ],
    aCGnW: [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M298.667 426.667v-85.334a213.333 213.333 0 1 1 426.666 0v85.334H768A85.333 85.333 0 0 1 853.333 512v256A85.333 85.333 0 0 1 768 853.333H256A85.333 85.333 0 0 1 170.667 768V512A85.333 85.333 0 0 1 256 426.667h42.667zM512 213.333a128 128 0 0 0-128 128v85.334h256v-85.334a128 128 0 0 0-128-128z" fill="#fff"/></svg>';
      },
      {},
    ],
    bTrAV: [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="m666.752 194.517-49.365 74.112A128 128 0 0 0 384 341.333l.043 85.334h384A85.333 85.333 0 0 1 853.376 512v256a85.333 85.333 0 0 1-85.333 85.333H256A85.333 85.333 0 0 1 170.667 768V512A85.333 85.333 0 0 1 256 426.667h42.667v-85.334a213.333 213.333 0 0 1 368.085-146.816z" fill="#fff"/></svg>';
      },
      {},
    ],
    bA3p0: [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M768 298.667h170.667V384h-256V128H768v170.667zM341.333 384h-256v-85.333H256V128h85.333v256zM768 725.333V896h-85.333V640h256v85.333H768zM341.333 640v256H256V725.333H85.333V640h256z"/></svg>';
      },
      {},
    ],
    fTuY8: [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="22" height="22" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M625.778 256H768v142.222h113.778v-256h-256V256zM256 398.222V256h142.222V142.222h-256v256H256zm512 227.556V768H625.778v113.778h256v-256H768zM398.222 768H256V625.778H142.222v256h256V768z"/></svg>';
      },
      {},
    ],
    tvKf4: [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="18" height="18" viewBox="0 0 1152 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4a76.8 76.8 0 0 0 76.8 76.8h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0zM1024 128v768H128V128h896zM896 512a64 64 0 0 1 7.488 127.552L896 640H768v128a64 64 0 0 1-56.512 63.552L704 832a64 64 0 0 1-63.552-56.512L640 768V582.592c0-34.496 25.024-66.112 61.632-70.208l8-.384H896zm-640 0a64 64 0 0 1-7.488-127.552L256 384h128V256a64 64 0 0 1 56.512-63.552L448 192a64 64 0 0 1 63.552 56.512L512 256v185.408c0 34.432-25.024 66.112-61.632 70.144l-8 .448H256z"/></svg>';
      },
      {},
    ],
    "1F1oB": [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="18" height="18" viewBox="0 0 1152 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M1075.2 0H76.8A76.8 76.8 0 0 0 0 76.8v870.4a76.8 76.8 0 0 0 76.8 76.8h998.4a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 1075.2 0zM1024 128v768H128V128h896zm-576 64a64 64 0 0 1 7.488 127.552L448 320H320v128a64 64 0 0 1-56.512 63.552L256 512a64 64 0 0 1-63.552-56.512L192 448V262.592c0-34.432 25.024-66.112 61.632-70.144l8-.448H448zm256 640a64 64 0 0 1-7.488-127.552L704 704h128V576a64 64 0 0 1 56.512-63.552L896 512a64 64 0 0 1 63.552 56.512L960 576v185.408c0 34.496-25.024 66.112-61.632 70.208l-8 .384H704z"/></svg>';
      },
      {},
    ],
    "7qNHs": [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="26" height="26" viewBox="0 0 1664 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#648FFC" d="M1152 0H512a512 512 0 0 0 0 1024h640a512 512 0 0 0 0-1024zm0 960a448 448 0 1 1 448-448 448 448 0 0 1-448 448z"/></svg>';
      },
      {},
    ],
    "28aV8": [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" width="26" height="26" viewBox="0 0 1740 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M511.898 1024h670.515c282.419-.41 511.18-229.478 511.18-511.898 0-282.419-228.761-511.488-511.18-511.897H511.898C229.478.615.717 229.683.717 512.102c0 282.42 228.761 511.488 511.18 511.898zm-.564-975.36A464.589 464.589 0 1 1 48.026 513.024 463.872 463.872 0 0 1 511.334 48.435v.205z"/></svg>';
      },
      {},
    ],
    "1uXI6": [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M554.667 810.667V896h-85.334v-85.333h85.334zm-384-632.662a42.667 42.667 0 0 1 34.986 18.219l203.904 291.328a42.667 42.667 0 0 1 0 48.896L205.611 827.776A42.667 42.667 0 0 1 128 803.328V220.672a42.667 42.667 0 0 1 42.667-42.667zm682.666 0a42.667 42.667 0 0 1 42.368 37.718l.299 4.949v582.656a42.667 42.667 0 0 1-74.24 28.63l-3.413-4.182-203.904-291.328a42.667 42.667 0 0 1-3.03-43.861l3.03-5.035 203.946-291.328a42.667 42.667 0 0 1 34.944-18.219zM554.667 640v85.333h-85.334V640h85.334zm-358.4-320.896V716.8L335.957 512 196.31 319.104zm358.4 150.23v85.333h-85.334v-85.334h85.334zm0-170.667V384h-85.334v-85.333h85.334zm0-170.667v85.333h-85.334V128h85.334z" fill="#fff"/></svg>';
      },
      {},
    ],
    "9f4dh": [
      function (e, t, r) {
        t.exports =
          '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="50" height="50"><path d="M593.818 168.55 949.82 763.76c26.153 43.746 10.732 99.738-34.447 125.052-14.397 8.069-30.72 12.308-47.37 12.308H155.976c-52.224 0-94.536-40.96-94.536-91.505 0-16.097 4.383-31.928 12.718-45.875l356.004-595.19c26.173-43.724 84.009-58.654 129.208-33.341a93.082 93.082 0 0 1 34.448 33.341zM512 819.2a61.44 61.44 0 1 0 0-122.88 61.44 61.44 0 0 0 0 122.88zm0-512a72.315 72.315 0 0 0-71.762 81.306l25.723 205.721a46.408 46.408 0 0 0 92.078 0l25.723-205.742A72.315 72.315 0 0 0 512 307.2z"/></svg>';
      },
      {},
    ],
    "4nTtS": [
      function (e, t, r) {
        t.exports =
          '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733L571.733 512z"/></svg>';
      },
      {},
    ],
    cDPXC: [
      function (e, t, r) {
        t.exports =
          '<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="M16 1H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3v-2H3V3h12v8h-2v2h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/><path d="M4 17h10l-5-6z"/></g></svg>';
      },
      {},
    ],
    "3eYNH": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("./flip"),
          n = a.interopDefault(o),
          i = e("./aspectRatio"),
          s = a.interopDefault(i),
          l = e("./playbackRate"),
          c = a.interopDefault(l),
          p = e("./subtitleOffset"),
          u = a.interopDefault(p),
          d = e("../utils/component"),
          f = a.interopDefault(d),
          h = e("../utils/error"),
          m = e("../utils");
        class g extends f.default {
          constructor(e) {
            super(e);
            const {
              option: t,
              controls: r,
              template: { $setting: a },
            } = e;
            (this.name = "setting"),
              (this.$parent = a),
              (this.option = []),
              (this.events = []),
              (this.cache = new Map()),
              t.setting &&
                (this.init(),
                e.on("blur", () => {
                  this.show && ((this.show = !1), this.render(this.option));
                }),
                e.on("focus", (e) => {
                  const t = (0, m.includeFromEvent)(e, r.setting),
                    a = (0, m.includeFromEvent)(e, this.$parent);
                  !this.show ||
                    t ||
                    a ||
                    ((this.show = !1), this.render(this.option));
                }));
          }
          static makeRecursion(e, t, r) {
            for (let a = 0; a < e.length; a++) {
              const o = e[a];
              (o.$parentItem = t),
                (o.$parentList = r),
                g.makeRecursion(o.selector || [], o, e);
            }
            return e;
          }
          get defaultSettings() {
            const e = [],
              { option: t } = this.art;
            return (
              t.playbackRate && e.push((0, c.default)(this.art)),
              t.aspectRatio && e.push((0, s.default)(this.art)),
              t.flip && e.push((0, n.default)(this.art)),
              t.subtitleOffset && e.push((0, u.default)(this.art)),
              e
            );
          }
          init() {
            const { option: e } = this.art,
              t = [...this.defaultSettings, ...e.settings];
            (this.option = g.makeRecursion(t)),
              this.destroy(),
              this.render(this.option);
          }
          destroy() {
            for (let e = 0; e < this.events.length; e++)
              this.art.events.remove(this.events[e]);
            (this.$parent.innerHTML = ""),
              (this.events = []),
              (this.cache = new Map());
          }
          find(e = "", t = this.option) {
            for (let r = 0; r < t.length; r++) {
              const a = t[r];
              if (a.name === e) return a;
              {
                const t = this.find(e, a.selector || []);
                if (t) return t;
              }
            }
          }
          remove(e) {
            const t = this.find(e);
            (0, h.errorHandle)(t, `Can't find [${e}] from the [setting]`);
            const r = t.$parentItem?.selector || this.option;
            return (
              r.splice(r.indexOf(t), 1),
              (this.option = g.makeRecursion(this.option)),
              this.destroy(),
              this.render(this.option),
              this.option
            );
          }
          update(e) {
            const t = this.find(e.name);
            return (
              t
                ? (Object.assign(t, e),
                  (this.option = g.makeRecursion(this.option)),
                  this.destroy(),
                  this.render(this.option))
                : this.add(e),
              this.option
            );
          }
          add(e) {
            return (
              this.option.push(e),
              (this.option = g.makeRecursion(this.option)),
              this.destroy(),
              this.render(this.option),
              this.option
            );
          }
          creatHeader(e) {
            const { icons: t, proxy: r, constructor: a } = this.art,
              o = (0, m.createElement)("div");
            (0, m.setStyle)(o, "height", `${a.SETTING_ITEM_HEIGHT}px`),
              (0, m.addClass)(o, "art-setting-item"),
              (0, m.addClass)(o, "art-setting-item-back");
            const n = (0, m.append)(
                o,
                '<div class="art-setting-item-left"></div>'
              ),
              i = (0, m.createElement)("div");
            (0, m.addClass)(i, "art-setting-item-left-icon"),
              (0, m.append)(i, t.arrowLeft),
              (0, m.append)(n, i),
              (0, m.append)(n, e.$parentItem.html);
            const s = r(o, "click", () => this.render(e.$parentList));
            return this.events.push(s), o;
          }
          creatItem(e, t) {
            const { icons: r, proxy: a, constructor: o } = this.art,
              n = (0, m.createElement)("div");
            (0, m.addClass)(n, "art-setting-item"),
              (0, m.setStyle)(n, "height", `${o.SETTING_ITEM_HEIGHT}px`),
              (0, m.isStringOrNumber)(t.name) && (n.dataset.name = t.name),
              (0, m.isStringOrNumber)(t.value) && (n.dataset.value = t.value);
            const i = (0, m.append)(
                n,
                '<div class="art-setting-item-left"></div>'
              ),
              s = (0, m.append)(
                n,
                '<div class="art-setting-item-right"></div>'
              ),
              l = (0, m.createElement)("div");
            switch (((0, m.addClass)(l, "art-setting-item-left-icon"), e)) {
              case "switch":
              case "range":
                (0, m.append)(
                  l,
                  (0, m.isStringOrNumber)(t.icon) || t.icon instanceof Element
                    ? t.icon
                    : r.config
                );
                break;
              case "selector":
                t.selector && t.selector.length
                  ? (0, m.append)(
                      l,
                      (0, m.isStringOrNumber)(t.icon) ||
                        t.icon instanceof Element
                        ? t.icon
                        : r.config
                    )
                  : (0, m.append)(l, r.check);
            }
            (0, m.append)(i, l),
              (t.$icon = l),
              (0, m.def)(t, "icon", {
                configurable: !0,
                get: () => l.innerHTML,
                set(e) {
                  (0, m.isStringOrNumber)(e) && (l.innerHTML = e);
                },
              });
            const c = (0, m.createElement)("div");
            (0, m.addClass)(c, "art-setting-item-left-text"),
              (0, m.append)(c, t.html || ""),
              (0, m.append)(i, c),
              (t.$html = c),
              (0, m.def)(t, "html", {
                configurable: !0,
                get: () => c.innerHTML,
                set(e) {
                  (0, m.isStringOrNumber)(e) && (c.innerHTML = e);
                },
              });
            const p = (0, m.createElement)("div");
            switch (
              ((0, m.addClass)(p, "art-setting-item-right-tooltip"),
              (0, m.append)(p, t.tooltip || ""),
              (0, m.append)(s, p),
              (t.$tooltip = p),
              (0, m.def)(t, "tooltip", {
                configurable: !0,
                get: () => p.innerHTML,
                set(e) {
                  (0, m.isStringOrNumber)(e) && (p.innerHTML = e);
                },
              }),
              e)
            ) {
              case "switch": {
                const e = (0, m.createElement)("div");
                (0, m.addClass)(e, "art-setting-item-right-icon");
                const a = (0, m.append)(e, r.switchOn),
                  o = (0, m.append)(e, r.switchOff);
                (0, m.setStyle)(t.switch ? o : a, "display", "none"),
                  (0, m.append)(s, e),
                  (t.$switch = t.switch),
                  (0, m.def)(t, "switch", {
                    configurable: !0,
                    get: () => t.$switch,
                    set(e) {
                      (t.$switch = e),
                        e
                          ? ((0, m.setStyle)(o, "display", "none"),
                            (0, m.setStyle)(a, "display", null))
                          : ((0, m.setStyle)(o, "display", null),
                            (0, m.setStyle)(a, "display", "none"));
                    },
                  });
                break;
              }
              case "range":
                {
                  const e = (0, m.createElement)("div");
                  (0, m.addClass)(e, "art-setting-item-right-icon");
                  const r = (0, m.append)(e, '<input type="range">');
                  (r.value = t.range[0] || 0),
                    (r.min = t.range[1] || 0),
                    (r.max = t.range[2] || 10),
                    (r.step = t.range[3] || 1),
                    (0, m.addClass)(r, "art-setting-range"),
                    (0, m.append)(s, e),
                    (t.$range = r),
                    (0, m.def)(t, "range", {
                      configurable: !0,
                      get: () => r.valueAsNumber,
                      set(e) {
                        r.value = Number(e);
                      },
                    });
                }
                break;
              case "selector":
                if (t.selector && t.selector.length) {
                  const e = (0, m.createElement)("div");
                  (0, m.addClass)(e, "art-setting-item-right-icon"),
                    (0, m.append)(e, r.arrowRight),
                    (0, m.append)(s, e);
                }
            }
            switch (e) {
              case "switch":
                if (t.onSwitch) {
                  const e = a(n, "click", async (e) => {
                    t.switch = await t.onSwitch.call(this.art, t, n, e);
                  });
                  this.events.push(e);
                }
                break;
              case "range":
                if (t.$range) {
                  if (t.onRange) {
                    const e = a(t.$range, "change", async (e) => {
                      t.tooltip = await t.onRange.call(this.art, t, n, e);
                    });
                    this.events.push(e);
                  }
                  if (t.onChange) {
                    const e = a(t.$range, "input", async (e) => {
                      t.tooltip = await t.onChange.call(this.art, t, n, e);
                    });
                    this.events.push(e);
                  }
                }
                break;
              case "selector": {
                const e = a(n, "click", async (e) => {
                  if (t.selector && t.selector.length)
                    this.render(t.selector, t.width);
                  else {
                    (0, m.inverseClass)(n, "art-current");
                    for (let e = 0; e < t.$parentItem.selector.length; e++) {
                      const r = t.$parentItem.selector[e];
                      r.default = r === t;
                    }
                    if (
                      (t.$parentList && this.render(t.$parentList),
                      t.$parentItem && t.$parentItem.onSelect)
                    ) {
                      const r = await t.$parentItem.onSelect.call(
                        this.art,
                        t,
                        n,
                        e
                      );
                      t.$parentItem.$tooltip &&
                        (0, m.isStringOrNumber)(r) &&
                        (t.$parentItem.$tooltip.innerHTML = r);
                    }
                  }
                });
                this.events.push(e),
                  t.default && (0, m.addClass)(n, "art-current");
              }
            }
            return n;
          }
          updateStyle(e) {
            const {
              controls: t,
              constructor: r,
              template: { $player: a, $setting: o },
            } = this.art;
            if (t.setting && !m.isMobile) {
              const n = e || r.SETTING_WIDTH,
                { left: i, width: s } = t.setting.getBoundingClientRect(),
                { left: l, width: c } = a.getBoundingClientRect(),
                p = i - l + s / 2 - n / 2;
              p + n > c
                ? ((0, m.setStyle)(o, "left", null),
                  (0, m.setStyle)(o, "right", null))
                : ((0, m.setStyle)(o, "left", `${p}px`),
                  (0, m.setStyle)(o, "right", "auto"));
            }
          }
          render(e, t) {
            const { constructor: r } = this.art;
            if (this.cache.has(e)) {
              const t = this.cache.get(e);
              (0, m.inverseClass)(t, "art-current"),
                (0, m.setStyle)(this.$parent, "width", `${t.dataset.width}px`),
                (0, m.setStyle)(
                  this.$parent,
                  "height",
                  `${t.dataset.height}px`
                ),
                this.updateStyle(Number(t.dataset.width));
            } else {
              const a = (0, m.createElement)("div");
              (0, m.addClass)(a, "art-setting-panel"),
                (a.dataset.width = t || r.SETTING_WIDTH),
                (a.dataset.height = e.length * r.SETTING_ITEM_HEIGHT),
                e[0] &&
                  e[0].$parentItem &&
                  ((0, m.append)(a, this.creatHeader(e[0])),
                  (a.dataset.height =
                    Number(a.dataset.height) + r.SETTING_ITEM_HEIGHT));
              for (let t = 0; t < e.length; t++) {
                const r = e[t];
                (0, m.has)(r, "switch")
                  ? (0, m.append)(a, this.creatItem("switch", r))
                  : (0, m.has)(r, "range")
                  ? (0, m.append)(a, this.creatItem("range", r))
                  : (0, m.append)(a, this.creatItem("selector", r));
              }
              (0, m.append)(this.$parent, a),
                this.cache.set(e, a),
                (0, m.inverseClass)(a, "art-current"),
                (0, m.setStyle)(this.$parent, "width", `${a.dataset.width}px`),
                (0, m.setStyle)(
                  this.$parent,
                  "height",
                  `${a.dataset.height}px`
                ),
                this.updateStyle(Number(a.dataset.width)),
                e[0] &&
                  e[0].$parentItem &&
                  e[0].$parentItem.mounted &&
                  e[0].$parentItem.mounted.call(this.art, a, e[0].$parentItem);
            }
          }
        }
        r.default = g;
      },
      {
        "./flip": "kONUB",
        "./aspectRatio": "84NBV",
        "./playbackRate": "aetWt",
        "./subtitleOffset": "fIBkO",
        "../utils/component": "18nVI",
        "../utils/error": "hwmZz",
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    kONUB: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            icons: r,
            constructor: { SETTING_ITEM_WIDTH: o, FLIP: n },
          } = e;
          function i(e, r, o) {
            r && (r.innerText = t.get((0, a.capitalize)(o)));
            const n = (0, a.queryAll)(".art-setting-item", e).find(
              (e) => e.dataset.value === o
            );
            n && (0, a.inverseClass)(n, "art-current");
          }
          return {
            width: o,
            name: "flip",
            html: t.get("Video Flip"),
            tooltip: t.get((0, a.capitalize)(e.flip)),
            icon: r.flip,
            selector: n.map((r) => ({
              value: r,
              name: `aspect-ratio-${r}`,
              default: r === e.flip,
              html: t.get((0, a.capitalize)(r)),
            })),
            onSelect: (t) => ((e.flip = t.value), t.html),
            mounted: (t, r) => {
              i(t, r.$tooltip, e.flip),
                e.on("flip", () => {
                  i(t, r.$tooltip, e.flip);
                });
            },
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "84NBV": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            icons: r,
            constructor: { SETTING_ITEM_WIDTH: o, ASPECT_RATIO: n },
          } = e;
          function i(e) {
            return "default" === e ? t.get("Default") : e;
          }
          function s(e, t, r) {
            t && (t.innerText = i(r));
            const o = (0, a.queryAll)(".art-setting-item", e).find(
              (e) => e.dataset.value === r
            );
            o && (0, a.inverseClass)(o, "art-current");
          }
          return {
            width: o,
            name: "aspect-ratio",
            html: t.get("Aspect Ratio"),
            icon: r.aspectRatio,
            tooltip: i(e.aspectRatio),
            selector: n.map((t) => ({
              value: t,
              name: `aspect-ratio-${t}`,
              default: t === e.aspectRatio,
              html: i(t),
            })),
            onSelect: (t) => ((e.aspectRatio = t.value), t.html),
            mounted: (t, r) => {
              s(t, r.$tooltip, e.aspectRatio),
                e.on("aspectRatio", () => {
                  s(t, r.$tooltip, e.aspectRatio);
                });
            },
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    aetWt: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            i18n: t,
            icons: r,
            constructor: { SETTING_ITEM_WIDTH: o, PLAYBACK_RATE: n },
          } = e;
          function i(e) {
            return 1 === e ? t.get("Normal") : e.toFixed(1);
          }
          function s(e, t, r) {
            t && (t.innerText = i(r));
            const o = (0, a.queryAll)(".art-setting-item", e).find(
              (e) => Number(e.dataset.value) === r
            );
            o && (0, a.inverseClass)(o, "art-current");
          }
          return {
            width: o,
            name: "playback-rate",
            html: t.get("Play Speed"),
            tooltip: i(e.playbackRate),
            icon: r.playbackRate,
            selector: n.map((t) => ({
              value: t,
              name: `aspect-ratio-${t}`,
              default: t === e.playbackRate,
              html: i(t),
            })),
            onSelect: (t) => ((e.playbackRate = t.value), t.html),
            mounted: (t, r) => {
              s(t, r.$tooltip, e.playbackRate),
                e.on("video:ratechange", () => {
                  s(t, r.$tooltip, e.playbackRate);
                });
            },
          };
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    fIBkO: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e) {
            const { i18n: t, icons: r, constructor: a } = e;
            return {
              width: a.SETTING_ITEM_WIDTH,
              name: "subtitle-offset",
              html: t.get("Subtitle Offset"),
              icon: r.subtitle,
              tooltip: "0s",
              range: [0, -5, 5, 0.1],
              onChange: (t) => ((e.subtitleOffset = t.range), t.range + "s"),
            };
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "2aaJe": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        r.default = class {
          constructor() {
            (this.name = "artplayer_settings"), (this.settings = {});
          }
          get(e) {
            try {
              const t =
                JSON.parse(window.localStorage.getItem(this.name)) || {};
              return e ? t[e] : t;
            } catch (t) {
              return e ? this.settings[e] : this.settings;
            }
          }
          set(e, t) {
            try {
              const r = Object.assign({}, this.get(), { [e]: t });
              window.localStorage.setItem(this.name, JSON.stringify(r));
            } catch (r) {
              this.settings[e] = t;
            }
          }
          del(e) {
            try {
              const t = this.get();
              delete t[e],
                window.localStorage.setItem(this.name, JSON.stringify(t));
            } catch (t) {
              delete this.settings[e];
            }
          }
          clear() {
            try {
              window.localStorage.removeItem(this.name);
            } catch (e) {
              this.settings = {};
            }
          }
        };
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    "8MTUM": [
      function (e, t, r) {
        var a = e("@parcel/transformer-js/src/esmodule-helpers.js");
        a.defineInteropFlag(r);
        var o = e("../utils"),
          n = e("./miniProgressBar"),
          i = a.interopDefault(n),
          s = e("./autoOrientation"),
          l = a.interopDefault(s),
          c = e("./autoPlayback"),
          p = a.interopDefault(c),
          u = e("./fastForward"),
          d = a.interopDefault(u),
          f = e("./lock"),
          h = a.interopDefault(f);
        r.default = class {
          constructor(e) {
            (this.art = e), (this.id = 0);
            const { option: t } = e;
            t.miniProgressBar && !t.isLive && this.add(i.default),
              t.lock && o.isMobile && this.add(h.default),
              t.autoPlayback && !t.isLive && this.add(p.default),
              t.autoOrientation && o.isMobile && this.add(l.default),
              t.fastForward && o.isMobile && !t.isLive && this.add(d.default);
            for (let e = 0; e < t.plugins.length; e++) this.add(t.plugins[e]);
          }
          add(e) {
            this.id += 1;
            const t = e.call(this.art, this.art),
              r = (t && t.name) || e.name || `plugin${this.id}`;
            return (
              (0, o.errorHandle)(
                !(0, o.has)(this, r),
                `Cannot add a plugin that already has the same name: ${r}`
              ),
              (0, o.def)(this, r, { value: t }),
              this
            );
          }
        };
      },
      {
        "../utils": "71aH7",
        "./miniProgressBar": "87pSL",
        "./autoOrientation": "ePEg5",
        "./autoPlayback": "cVO99",
        "./fastForward": "hFDwt",
        "./lock": "1hsTH",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "87pSL": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        ),
          (r.default = function (e) {
            return (
              e.on("ready", () => {
                e.layers.add({
                  name: "mini-progress-bar",
                  mounted(t) {
                    e.on("destroy", () => {
                      t.style.display = "none";
                    }),
                      e.on("video:timeupdate", () => {
                        t.style.width = 100 * e.played + "%";
                      }),
                      e.on("setBar", (e, r) => {
                        "played" === e && (t.style.width = 100 * r + "%");
                      });
                  },
                });
              }),
              { name: "mini-progress-bar" }
            );
          });
      },
      { "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc" },
    ],
    ePEg5: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            constructor: t,
            template: { $player: r, $video: o },
          } = e;
          return (
            e.on("fullscreenWeb", (n) => {
              if (n) {
                const { videoWidth: n, videoHeight: i } = o,
                  { clientWidth: s, clientHeight: l } =
                    document.documentElement;
                ((n > i && s < l) || (n < i && s > l)) &&
                  setTimeout(() => {
                    (0, a.setStyle)(r, "width", `${l}px`),
                      (0, a.setStyle)(r, "height", `${s}px`),
                      (0, a.setStyle)(r, "transform-origin", "0 0"),
                      (0, a.setStyle)(
                        r,
                        "transform",
                        `rotate(90deg) translate(0, -${s}px)`
                      ),
                      (0, a.addClass)(r, "art-auto-orientation"),
                      (e.isRotate = !0),
                      e.emit("resize");
                  }, t.AUTO_ORIENTATION_TIME);
              } else
                (0, a.hasClass)(r, "art-auto-orientation") &&
                  ((0, a.removeClass)(r, "art-auto-orientation"),
                  (e.isRotate = !1),
                  e.emit("resize"));
            }),
            e.on("fullscreen", async (e) => {
              const t = screen.orientation.type;
              if (e) {
                const { videoWidth: e, videoHeight: n } = o,
                  { clientWidth: i, clientHeight: s } =
                    document.documentElement;
                if ((e > n && i < s) || (e < n && i > s)) {
                  const e = t.startsWith("portrait") ? "landscape" : "portrait";
                  await screen.orientation.lock(e),
                    (0, a.addClass)(r, "art-auto-orientation-fullscreen");
                }
              } else
                (0, a.hasClass)(r, "art-auto-orientation-fullscreen") &&
                  (await screen.orientation.lock(t),
                  (0, a.removeClass)(r, "art-auto-orientation-fullscreen"));
            }),
            {
              name: "autoOrientation",
              get state() {
                return (0, a.hasClass)(r, "art-auto-orientation");
              },
            }
          );
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    cVO99: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
              i18n: t,
              icons: r,
              storage: o,
              constructor: n,
              proxy: i,
              template: { $poster: s },
            } = e,
            l = e.layers.add({
              name: "auto-playback",
              html: '<div class="art-auto-playback-close"></div><div class="art-auto-playback-last"></div><div class="art-auto-playback-jump"></div>',
            }),
            c = (0, a.query)(".art-auto-playback-last", l),
            p = (0, a.query)(".art-auto-playback-jump", l),
            u = (0, a.query)(".art-auto-playback-close", l);
          return (
            e.on("video:timeupdate", () => {
              if (e.playing) {
                const t = o.get("times") || {},
                  r = Object.keys(t);
                r.length > n.AUTO_PLAYBACK_MAX && delete t[r[0]],
                  (t[e.option.id || e.option.url] = e.currentTime),
                  o.set("times", t);
              }
            }),
            e.on("ready", () => {
              const d = (o.get("times") || {})[e.option.id || e.option.url];
              d &&
                d >= n.AUTO_PLAYBACK_MIN &&
                ((0, a.append)(u, r.close),
                (0, a.setStyle)(l, "display", "flex"),
                (c.innerText = `${t.get("Last Seen")} ${(0, a.secondToTime)(
                  d
                )}`),
                (p.innerText = t.get("Jump Play")),
                i(u, "click", () => {
                  (0, a.setStyle)(l, "display", "none");
                }),
                i(p, "click", () => {
                  (e.seek = d),
                    e.play(),
                    (0, a.setStyle)(s, "display", "none"),
                    (0, a.setStyle)(l, "display", "none");
                }),
                e.once("video:timeupdate", () => {
                  setTimeout(() => {
                    (0, a.setStyle)(l, "display", "none");
                  }, n.AUTO_PLAYBACK_TIMEOUT);
                }));
            }),
            {
              name: "auto-playback",
              get times() {
                return o.get("times") || {};
              },
              clear: () => o.del("times"),
              delete(e) {
                const t = o.get("times") || {};
                return delete t[e], o.set("times", t), t;
              },
            }
          );
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    hFDwt: [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            constructor: t,
            proxy: r,
            template: { $player: o, $video: n },
          } = e;
          let i = null,
            s = !1,
            l = 1;
          const c = () => {
            clearTimeout(i),
              s &&
                ((s = !1),
                (e.playbackRate = l),
                (0, a.removeClass)(o, "art-fast-forward"));
          };
          return (
            r(n, "touchstart", (r) => {
              1 === r.touches.length &&
                e.playing &&
                !e.isLock &&
                (i = setTimeout(() => {
                  (s = !0),
                    (l = e.playbackRate),
                    (e.playbackRate = t.FAST_FORWARD_VALUE),
                    (0, a.addClass)(o, "art-fast-forward");
                }, t.FAST_FORWARD_TIME));
            }),
            r(document, "touchmove", c),
            r(document, "touchend", c),
            {
              name: "fastForward",
              get state() {
                return (0, a.hasClass)(o, "art-fast-forward");
              },
            }
          );
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
    "1hsTH": [
      function (e, t, r) {
        e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(
          r
        );
        var a = e("../utils");
        r.default = function (e) {
          const {
            layers: t,
            icons: r,
            template: { $player: o },
          } = e;
          return (
            t.add({
              name: "lock",
              mounted(t) {
                const o = (0, a.append)(t, r.lock),
                  n = (0, a.append)(t, r.unlock);
                (0, a.setStyle)(o, "display", "none"),
                  e.on("lock", (e) => {
                    e
                      ? ((0, a.setStyle)(o, "display", "inline-flex"),
                        (0, a.setStyle)(n, "display", "none"))
                      : ((0, a.setStyle)(o, "display", "none"),
                        (0, a.setStyle)(n, "display", "inline-flex"));
                  });
              },
              click() {
                (0, a.hasClass)(o, "art-lock")
                  ? ((0, a.removeClass)(o, "art-lock"),
                    (this.isLock = !1),
                    e.emit("lock", !1))
                  : ((0, a.addClass)(o, "art-lock"),
                    (this.isLock = !0),
                    e.emit("lock", !0));
              },
            }),
            {
              name: "lock",
              get state() {
                return (0, a.hasClass)(o, "art-lock");
              },
            }
          );
        };
      },
      {
        "../utils": "71aH7",
        "@parcel/transformer-js/src/esmodule-helpers.js": "9pCYc",
      },
    ],
  },
  ["5lTcX"],
  "5lTcX",
  "parcelRequire4dc0"
);
