"use strict";

(function(e, t) {

    function n(e) {
        return Best.extend(e, this)
    }
    var Best = e.Best = e.Best || {},
        i = Best.Game = function(e) {
            for (var t in e) this[t] = e[t]
        };

    i.prototype = {
        constructor: i,
        id: null,
        width: 0,
        height: 0,
        FPS: 60,
        caption: "",
        context: null,
        init: function() {
            var e = this;
            this._run = function() {
                e.run()
            },
            this.timer = {
                now: 0,
                last: 0,
                step: Math.round(1e3 / this.FPS)
            },
            this.initGraphicContext(),
            this.onInit && this.onInit.apply(this, arguments)
        },
        initGraphicContext: function() {},
        start: function() {
            this.timer.now = Date.now(),
            this.timer.last = Date.now(),
            this.paused = !1,
            this.running = !0,
            this.onStart && this.onStart(), this.run()
        },
        stop: function() {
            this.running = !1,
            this.onStop && this.onStop()
        },
        timeoutFn: function() {
            this.running = !1,
            this.onTimeout && this.onTimeout()
        },
        pause: function() {
            this.paused = !0,
            this.onPause && this.onPause()
        },
        resume: function() {
            this.paused = !1,
            this.onResume && this.onResume()
        },
        run: function() {
            var e = this.timer.now = Date.now(),
                t = e - this.timer.last;
            this.timer.last = e,
            clearTimeout(this.loopId),
            this.loopId = setTimeout(this._run, this.timer.step),
            this.handleInput(t, e),
            !this.paused && t > 1 && (this.update(t, e),
            this.render(t, e)),
            this.running || clearTimeout(this.loopId)
        },
        setScene: function(e) {
            this.scene = e, e.enter()
        },
        update: function(e, t) {
            this.scene && this.scene.update(e, t)
        },
        render: function(e, t) {
            this.scene && this.scene.render(this.context, e, t)
        },
        handleInput: function(e, t) {
            this.scene && this.scene.handleInput(e, t)
        },
        onInit: null,
        onStart: null,
        onPause: null,
        onResume: null,
        onStop: null,
        onTimeout: null
    };

    var s = Best.Scene = function(e) {
        for (var t in e) this[t] = e[t]
    };
    s.prototype = {
        constructor: s,
        id: null,
        init: function(e) {},
        enter: function() {},
        leave: function(e) {},
        update: function(e, t) {},
        render: function(e, t, n) {}
    },
    Best.extend = function(e, t) {
        var n = function(e) {
                for (var t in e) this[t] = e[t]
            },
            Best = n.prototype,
            i;
        if (t) {
            i = t.prototype;
            for (var s in i) Best[s] = i[s]
        }
        for (var s in e) Best[s] = e[s];
        return Best.constructor = n,
        n.$super = i,
        n.superclass = t || null,
        n.extend = this.extend,
        n
    },
    i.extend = n,
    s.extend = n
})(this);