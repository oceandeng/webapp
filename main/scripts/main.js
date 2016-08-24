(function(e) {
/****************************************************************
// 锁APP屏
*****************************************************************/
    document.addEventListener('touchmove', function (e){e.preventDefault()}, false);
    document.addEventListener('touchstart', function (e){e.preventDefault()}, false);

/****************************************************************
// 游戏开始
*****************************************************************/
    function start() {
        function start() {
            var roadImg = R.createImage(gConfig.path + "images/road.png"),
                sw = e(window).width() * 2,
                sh = e(window).height() * 2,
                w = roadImg.width,
                h = roadImg.height,
                ch = sw / (w / h);

            ctx.drawImage(roadImg, 0, 0, w, h, 0, 0, sw, ch);
        }

        function n() {
            e("#guidePanel").hide(),
            road.init(),
            road.start()
        }

        start(),
        R.loadImage(source.gameImg, function() {
            e("#gamePanel").on("touchstart", function() {
                n(),
                n = function() {}
            })
        })
    }
/****************************************************************
// 舞台全屏渲染 绘制公路和开始页面
*****************************************************************/
    function render() {
        function render() {
            var w = e(window).width(),
                h = e(window).height();

            sw = w;
            sh = h;
            e(canvas).css({
                width: sw,
                height: sh
            }).attr({
                width: sw * 2,
                height: sh * 2
            });
        }
        R.loadImage(source.loadImg, start),
        render();
        var r = e(canvas).parent();
        e(window).on("resize", render)
    }
/****************************************************************
// 定义初始变量  及模块功能 Touch Support
*****************************************************************/
    var r = {},
        canvas = document.getElementById("stage"),
        ctx = canvas.getContext("2d"),
        scoreDom = document.getElementById("score"),
        sw = e(window).width(),
        sh = e(window).height(),
        supTouch = "ontouchend" in document,
        roadLevel = 1,
        gameCount = 60,
        source = {
            loadImg: [gConfig.path + "images/road.png", gConfig.path + "images/start.png"],
            gameImg: [gConfig.path + "images/car-two.png", gConfig.path + "images/car-one.png", gConfig.path + "images/gril.png", gConfig.path + "images/lady-boy.png", gConfig.path + "images/score-bg.png", gConfig.path + "images/heart.png"]
        },
/****************************************************************
// 设置 COOKIE -- cookiefn
*****************************************************************/
        cookiefn = function() {

            var cookieFn = {
                // TOOLS.setcookie(VDZ_COOKIE_PRE + SITE_ID + "_viewstack", gameover, 30000, null, "", null)
                setCookie: function(cookieName, cookieValue, seconds, path, domain, secure){
                    var expires = new Date();
                    expires.setTime(expires.getTime() + seconds);
                    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
                            + (expires ? '; expires=' + expires.toGMTString() : '')
                            + (path ? '; path=' + path : '; path=/')
                            + (domain ? '; domain=' + domain : '')
                            + (secure ? '; secure' : '');
                },
                getCookie: function(name){
                    var cookie_start = document.cookie.indexOf(name);
                    var cookie_end = document.cookie.indexOf(";", cookie_start);
                    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
                }
            }
            return cookieFn
        }(),
/****************************************************************
// 绘制汽车模块 -- car
*****************************************************************/
        car = (function() {
            function e(e, t) {
                n.lastX = n.x,
                n.lastY = n.y,
                n.x = e - n.width / 2,
                n.y = t - n.height / 2,
                n.x = n.x > sw - n.width ? sw - n.width : n.x,
                n.x = n.x < 0 ? 0 : n.x,
                n.y = n.y > sh - n.height ? sh - n.height : n.y,
                n.y = n.y < 0 ? 0 : n.y
            }

            function t(e) {
                if (!n.status) return;
                ctx.drawImage(road.time % 20 > 15 ? n.model : n.model2, n.x * 2, n.y * 2, n.width * 2, n.height * 2)
            }
            var n = {};
            return n.init = function() {
                n.x,
                n.y,
                n.lastX,
                n.lastY,
                n.status = !0,
                n.model = R.createImage(gConfig.path + "images/car-two.png"),
                n.model2 = R.createImage(gConfig.path + "images/car-one.png"),
                n.width = sw / 480 * n.model.width,
                n.height = n.width / n.model.width * n.model.height
            },
            n.move = e,
            n.moving = t,
            n
        })(),
/****************************************************************
// 障碍物模块  -- obstacle
*****************************************************************/
        obstacle = function() {
            function e(e) {
                this.type = e,
                this.height = 0,
                this.width = 0,
                this.maxSpeed = 0,
                this.status = !0;
                switch (e) {
                    case 1:
                        this.score = 1,
                        this.maxSpeed = 15;
                        break;
                    case 2:
                        this.score = 0,
                        this.maxSpeed = 25
                }
                var t = [gConfig.path + "images/gril.png", gConfig.path + "images/lady-boy.png"];
                this.modelImg = t[this.type - 1],
                this.model = R.createImage(this.modelImg),
                this.width = sw / 480 * this.model.width,
                this.height = this.width / this.model.width * this.model.height,
                this.x = Math.random() * (sw - this.width),
                this.y = -this.height;
                var n = road.time > 2475 ? 100 : road.time/800 ;
                // var n = road.time > 2750 ? 100 : road.time > 1650 ? 50 : road.time/800 ;
                // var n = road.time / 800 > 100 ? 100 : road.time / 800;
                this.speed = Math.random() * (n - 1) + 5,
                this.speed = this.speed < .5 ? Math.random() * .5 + .5 : this.speed,
                this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed
            }

            function t(t) {
                return new e(t)
            }
            var n = {},
                r = n.planes = [],
                i = n.planesNum = 0;
            n.planes,
            e.prototype.show = function() {
                ctx.drawImage(this.model, this.x * 2, this.y * 2, this.width * 2, this.height * 2)
            },
            e.prototype.die = function() {
                var e = this.type;
                road.score += this.score,
                this.status = !1
            };
            var addSome = n.addSome = function() {
                if (road.time % 30 != 0) return;
                i == 36 && (i = 0),
                i++;
                if(i <= 3){
                    n.planes.push(t(1));
                }else{
                    switch (!0) {
                        case i % Math.floor(Math.random() * 9) == 0:
                            n.planes.push(t(2));
                            break;
                        default:
                            n.planes.push(t(1))
                    }                  
                }
            };
            return n.scrolling = function() {
                function e(e) {
                    var t = [e.x, e.y],
                        n = [e.x + e.width, e.y + e.height],
                        r = [car.x + 16, car.y + 10],
                        i = [car.x + car.width - 16, car.y + car.height - 26],
                        s = [Math.max(t[0], r[0]), Math.max(t[1], r[1])],
                        o = [Math.min(n[0], i[0]), Math.min(n[1], i[1])];
                    return s[0] < o[0] && s[1] < o[1] ? !0 : !1
                }
                addSome();
                var t = n.planes.length;
                for (var r = t; r--;) {
                    var i = n.planes[r];
                    if (i.y > sh || i.status == 0) {
                        n.planes.splice(r, 1);
                        continue
                    }
                    // i = gril 图片
                    i.show(),
                    e(i) && (i.type == "1" ? scoreModel.showheart() : road.stop(), i.die()),
                    // e(i) && (i.type == "1" ? scoreModel.showheart() : scoreModel.downheart(), i.die()),
                    i.y = i.y + i.speed;
                }
            }, n
        }(),
/****************************************************************
// 倒计时模块 countDown
*****************************************************************/
        countDown = function(){
            var timer = null;
            var count = {
                start: function(){
                    timer = setInterval(function(){
                        road.gameTime -= 1;
                        if(road.gameTime == 0){
                            road.timeoutFn()
                        }
                    }, 1000);
                },
                doUpdate: function(){
                    e('#time').html(road.gameTime)
                },
                clear: function(){
                    clearInterval(timer);
                }
            }
            return count.init = function(){
                road.gameTime = gameCount;
                this.clear();
            },
            count
        }(),
/****************************************************************
// 得分模块 -- score model
*****************************************************************/
        scoreModel = function() {
            var t = {};
            return t.format = function(e) {
                return function(t, n) {
                    return n = n || 5,
                           0 >= (n -= t.toString().length) ? t : (e[n] || (e[n] = Array(n + 1).join(0))) + t
                }
            }([]),
            t.showheart = function() {
                e(".heart").removeClass("hearthot").addClass("hearthot"),
                setTimeout(function() {
                    e(".heart").removeClass("hearthot")
                }, 200)
            },
            t.downheart = function(){
               e(".heart").removeClass("heartdown").addClass("heartdown"), 
               setTimeout(function(){
                    e(".heart").removeClass("heartdown");
               }, 200)
            },
            t.show = function() {
                e(".score-wrap").show();
                e(".count-down").show();
            },
            t
        }(),
/****************************************************************
// 游戏结束页面模块  -- gameover
*****************************************************************/
        gameover = function() {
            var t = e("#resultPanel"),
                u = e("#replay"),
                n = function() {
                    var n = "click";
                    supTouch && (n = "touchstart"),
                    t.find("#enter").on(n, function(){
                        location.href = $(this).attr('data-href');
                    }),
                    u.find(".replay").on(n, function() {
                        u.hide(),
                        road.init(),
                        road.start()
                    })
                    // t.find(".share").on(n, function() {
                    //     gConfig.wxData.desc = e(this).data("desc").replace(/\{x\}/ig, road.score) || ""
                    // })
                    // t.find(".lottery").on(n, function() {
                    //     y.open()
                    // })
                },
                r = {
                    show: function() {
                        r.showScore()
                    },
                    hide: function() {
                        t.hide()
                    },
                    showScore: function() {
                        // var e = 1;
                        var n = road.score;
                        // n === 0 ? e = 1 : n < 10 ? e = 2 : e = 3;
                        var r = t.find("#scoreBoard");
                        // y.hide(),
                        // t.find("#scoreBoard .score-result").hide(),
                        // r.show(),
                        // e < 3 ? t.find("#scoreBoard .rank").show() : (t.find("#scoreBoard .rank").hide(), y.preLoad()),
                        // y.preLoad();
                        e.ajax({
                            type: "POST",
                            url: gConfig.sApi,
                            timeout: 5e4,
                            dataType: "json",
                            data: {
                                // mid: cookiefn,
                                score: n,
                                openid: gConfig.openId
                            },
                            beforeSend: function(){
                                ajaxBFn();
                            },
                            success: function(res) {
                                if(res.code == 0){
                                    cookiefn.setCookie('num', res.playnum, 30000, null, "", null);
                                    t.show(),
                                    t.find('#enter').attr('data-href', res.url);
                                }else{
                                    oTools.alertmess(res.msg);
                                    setTimeout(function(){
                                        location.href = res.url;
                                    }, 2000);
                                }
                                ajaxSFn(res);
                            },
                            error: function() {
                                u.show(),
                                ajaxEFn();
                            },
                            complete: function(){
                                ajaxCFn();
                                // cookiefn.setCookie('num', gConfig.i++, 30000, null, "", null);
                            }
                        })
                        r.find(".tips span").html(n);
                    }
                    // wxHide: function() {
                    //     t.find(".weixin-share").hide()
                    // }
                };
            return n(), r
        }();
/****************************************************************
// 游戏奖励页面模块 -- Y
*****************************************************************/
        // y = function() {
        //     var t = null,
        //         n = e("#prize"),
        //         r,
        //         i = {
                    // preLoad: function() {
                    //     e.ajax({
                    //         type: "GET",
                    //         url: gConfig.sApi,
                    //         timeout: 2e4,
                    //         dataType: "json",
                    //         data: {
                    //             // mid: cookiefn,
                    //             active: gConfig.activeId
                    //         },
                    //         success: function(response) {
                    //             // t = e.data || {}
                    //             ajaxSFn(response);
                    //         },
                    //         error: function() {
                    //             // t = {}
                    //             ajaxEFn();
                    //         }
                    //     })
                    // },
                    // open: function() {
                    //     var e = 100,
                    //         n = setInterval(function() {
                    //             if (t || !e) {
                    //                 e--, clearInterval(n);
                    //                 try {
                    //                     t.drawtype && t.info1 ? i.showPrize(t.drawtype, t.info1) : i.showDefault(parseInt(Math.random() * 1002, 10) % 2 + 1)
                    //                 } catch (r) {
                    //                     i.showDefault(parseInt(Math.random() * 1002, 10) % 2 + 1)
                    //                 }
                    //             }
                    //         }, 10)
                    // },
                    // hide: function() {
                    //     n.hide()
                    // },
                    // showDefault: function(t) {
                    //     var r = ["images/safety.png", "images/taohua.png"],
                    //         i;
                    //     t %= r.length, e("#prizeResult").hide(), n.show().find(".prize-default").show().find(".random-prize").attr("src", r[t]), i = n.find(".prize-default .share").attr("data-desc").split("|"), n.find(".prize-default .share").data("desc", i[t % i.length])
                    // },
                    // showPrize: function(t, i) {
                    //     var s = ["images/piao.png", "images/qi.png", "images/helmet.png"],
                    //         o = ["\u65b9\u7a0b\u5f0f\u5927\u5956\u8d5b\u95e8\u7968", "\u8d5b\u9053\u72c2\u98d9\u4f53\u9a8c\u7279\u6743","\u8d5b\u8f66\u6fc0\u60c5\u4f53\u9a8c\u8d44\u683c"],
                    //         u;
                    //     t = (3 - t) % s.length, n.show().find(".prize-default").hide(), e("#prizeResult").show().find(".prize-content").find("cookiefn span").html(o[t]).end().find("img").attr("src", s[t]).end().find(".yards span").html(i), e("#prizeResult .scroll-rst").removeAttr("style"), r ? r.scrollTo(0, 0) : r = new IScroll("#prizeResult")
                    // }
        //         };
        //     return i
        // }();
    // window.prize = y;
/****************************************************************
// 公路对象 -- road
*****************************************************************/
    var road = new Best.Game({
            FPS: 60,
            score: 0,
            time: 0,
            bgImg: R.createImage(gConfig.path + "images/road.png"),
            bgScrollTime: 0,
            speed: 0,
            gameTime : gameCount,
            initGraphicContext: function() {
                this.canvas = document.getElementById("stage"),
                this.context = this.canvas.getContext("2d")
            },
            onInit: function() {
                car.init(),
                countDown.init(),
                countDown.start()
            },
            onStart: function() {
                this.scene = this.getScene(0),
                this.scene.init(this),
                this.scene.enter()
            },
            getScene: function(e) {
                var t = w[e];
                return t
            },
            bgScroll: function() {
                var w = this.bgImg.width,
                    h = this.bgImg.height,
                    sw = e(window).width() * 2,
                    sh = e(window).height() * 2;
                    ch = sw / (w / h);

                 this.speed = this.time > 2475 ? 40 : this.time > 1100 ? 36 : 10;

                // this.bgScrollTime += 12 + ((this.time + this.time * .9) / 1e3 > 20 ? 20 : (this.time + this.time * .9) / 1e3),

                this.bgScrollTime += 12 + this.speed;
                this.bgScrollTime > ch && (this.bgScrollTime = 0);

                ctx.drawImage(this.bgImg, 0, 0, w, h, 0, this.bgScrollTime - ch, sw, ch);
                ctx.drawImage(this.bgImg, 0, 0, w, h, 0, this.bgScrollTime, sw, ch);

                countDown.doUpdate();

            },
            onStop: function() {
                e("#gameoverPanel").show(),
                setTimeout(function() {
                    gameover.show(),
                    e("#gameoverPanel").hide()
                }, 1e3),
                road.gameTime = gameCount
            },
            onTimeout: function() {
                e("#timeoutPanel").show(),
                setTimeout(function(){
                    gameover.show(),
                    e("#timeoutPanel").hide()
                }, 1e3);
            }
        }),
        w = {};
/****************************************************************
// 游戏控制 -- T
*****************************************************************/
    (function() {
        var t = new Best.Scene({
            id: 0,
            init: function(t) {
                this.game = t,
                e(canvas).addClass("playing"),
                scoreModel.show(),
                this.initEvent()
            },
            initEvent: function() {
                this.clear(),
                car.move(e(canvas).width() / 2, e(canvas).height()),
                canvas = e(canvas);
                if (supTouch) {
                    var t = function(e) {
                        e.preventDefault();
                        var t = e.targetTouches[0],
                            n = t.pageX - canvas.offset().left,
                            r = t.pageY - canvas.offset().top;
                        car.move(n, r)
                    };
                    canvas.get(0).removeEventListener("touchmove", t),
                    canvas.get(0).addEventListener("touchmove", t, !1)
                } else canvas.off("mousemove").on("mousemove", function(e) {
                    var t = e.clientX - canvas.offset().left,
                        n = e.clientY - canvas.offset().top;
                    car.move(t, n)
                })
            },
            clear: function() {
                this.game.time = 0,
                this.game.score = 0,
                this.game.bgScrollTime = 0,
                car.status = !0,
                obstacle.planes = [],
                obstacle.planesNum = 0,
                scoreDom.innerHTML = scoreModel.format(this.game.score),
                gameover.hide()
            },
            enter: function() {},
            update: function() {
                this.game.time++,
                this.game.bgScroll(),
                obstacle.scrolling(),
                car.moving(this.game.time),
                scoreDom.innerHTML = scoreModel.format(this.game.score)
            },
            handleInput: function() {},
            render: function() {}
        });
        w[t.id] = t
    })();

    render();

    // if(cookiefn.getCookie('num') && cookiefn.getCookie('num') < 1){
    //         location.href = gConfig.localPath;
    // }

})(Zepto);