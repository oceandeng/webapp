function _get(v){ return document.getElementById(v);}
function _url(){ return encodeURIComponent(window.location.pathname + window.location.search);}
function _backurl(o, x){ var url = _url(); if(x){ url += x;} var tar = encodeURI(o.href); if(tar.indexOf('?') == -1) {tar += '?url=' + url;} else {tar += '&url=' + url;} o.href = tar}
function _order(col){
    var url = window.location.pathname + window.location.search;
    if(col){
        if(/[?&]ord=(\w+)_(\w+)/.test(url)){
            var ord1 = 'ord='+ RegExp.$1 +'_'+ RegExp.$2;
            var ord2 = 'ord='+ col +'_'+ (RegExp.$2 == 'down' ? 'up' : 'down');
            url = url.replace(ord1, ord2);
        }else{
            url += (url.indexOf('?') > 0? '&' : '?') + 'ord='+ col +'_down';
        }
        window.location.href = url;
    }else{
        if(/[?&]ord=(\w+)_(\w+)/.test(url)){
            col = RegExp.$1;
            _get('odr_'+ col).innerHTML += '<i class="fa fa-long-arrow-'+ RegExp.$2 +'" style="float:right;margin-top:3px;"></i>';
        }
        var arr = '<i class="fa fa-arrows-v" style="float:right;margin-top:3px;color:#ccc;"></i>';
        if(col){
            T('a[id*=odr]').not('#odr_'+ col).append(arr);
        }else{
            T('a[id*=odr]').append(arr);
        }
    }
}
String.prototype.trim = function(){ return this.replace(/(^\s*)|(\s*$)/g, '');}
baidu.dom.extend({
    FormValidtor: function () {
        var me = this, noerr = true;
        this.ReInit = function (){ init();};
        this.Check = function () {
            noerr = true;
            me.find('[vformat]').each(function () {
                checkRule(baidu(this));
            });
            if (me.find('.error').length > 0) {
                me.find('.error').eq(0).focus();
                noerr = false;
            }
            return noerr;
        };
        this.valid = function (o) {
            noerr = true;
            checkRule(baidu(o));
            return noerr;
        };
        this.Submit = function(){
            me.submit();
        };
        var removeCls = function (o) {
            if (o.hasClass('success')) {
                o.removeClass('success');
            }
            if (o.hasClass('error')) {
                o.removeClass('error');
            }
        };
        var checkRule = function (o) {
            var format = o.attr('vformat') || '';
            if (format == '') {
                return;
            }
            baidu(format.split('/')).each(function (i, v) {
                if (v == '') {
                    return true;
                }
                if (eval('f_' + v).call(this, o)) {
                    o.removeClass('error').addClass('success');
                } else {
                    noerr = false;
                    o.removeClass('success').addClass('error');
                    return false;
                }
            });
        };
        var init = function () {
            me.find('[vformat]').each(function () {
                var o = baidu(this);
                o.unbind('focus').unbind('blur').focus(function () {
                    removeCls(o);
                }).blur(function () {
                    checkRule(o)
                });
            });
        };
        var f_nozero = function(o){
            var v = o.val().trim();
            return (v != 0);
        };
        var f_required = function (o) {
            var v = o.val().trim();
            return (v != '');
        };
        var f_letter = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^[a-zA-Z]+$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_number = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^[0-9]+$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_currency = function(o){
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_float = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^[0-9]+(\.\d+)?$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_textkey = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^([a-zA-Z0-9_\-]|%)*$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_email = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^[\w\.-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_httpurl = function(o){
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^http[s]?:\/\//.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_mobile = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            if (/^1[34578]\d{9}$/.test(v) == false) {
                return false;
            }
            return true;
        };
        var f_len = function (o) {
            var v = o.val().trim();
            if (v.length == 0) {
                return true;
            }
            var arg = o.attr('vlen') || '';
            if (arg == '') {
                return false;
            }
            var a = arg.split(','), b = v.length;
            if (a.length == 1) {
                if (b != parseInt(arg)) {
                    return false;
                }
            } else {
                var a1 = parseInt(a[0]) || 0, a2 = parseInt(a[1]) || 0;
                if (a1 > 0 && b < a1) {
                    return false;
                }
                if (a2 > 0 && b > a2) {
                    return false;
                }
            }
            return true;
        };
        var f_map = function(o){
            var v = o.val().trim();
            var m = o.attr('vmap') || '';
            if (m == '') { return false;}
            var c = document.getElementById(m).value;
            if (c != v) {
                return false;
            }
            return true;
        };
        init();
        return me;
    },
    SubmitForm: function (opts) {
        var me = this;
        var arg = baidu.extend({
            btnPostTxt: ' 保存中...',
            beforeSend: function () {
                me.find('button[type=submit]').each(function(){
                    var btn = baidu(this);
                    btn.data('preTxt', btn.html());
                    btn.attr('disabled', 'disabled').html(arg.btnPostTxt);
                });
            },
            complete: function (arg, html) {alert(html);}
        }, opts);
        var action = me.attr('action') || '';
        var submit = function (uri, val, callback) {
            baidu.ajax({
                url: uri,
                cache: false,
                type: 'POST',
                data: val,
                success: function (res, status) {
                    me.find('button[type=submit]').each(function(){
                        var btn = baidu(this);
                        btn.removeAttr('disabled').html(btn.data('preTxt'));
                    });
                    callback.call(this, val, res.trim());
                }
            });
        };

        var datas = {};
        var eles = me[0].elements;
        for(var i= 0, j=eles.length; i<j; i++){
            var ele = eles[i];
            var name = ele.name || '';
            if (name == '') {
                continue;
            }
            var type = ele.type;
            if (type == 'radio' || type == 'checkbox') {
                if (!ele.checked) {
                    continue;
                }
            }
            var value = ele.value || '';
            if (type == 'checkbox') {
                if (datas[name] == undefined) {
                    datas[name] = value;
                } else {
                    datas[name] += ',' + value;
                }
            } else {
                datas[name] = value;
            }
        }
        if (arg.beforeSend != null) {
            arg.beforeSend.call(this, datas);
            setTimeout(function () {
                submit(action, datas, arg.complete);
            }, 20);
        } else {
            submit(action, datas, arg.complete);
        }
        return me;
    },
    dropdown: function (opts) {
        var me = this;
        var arg = baidu.extend({ pos:'left', width: 0, height: 'auto', css: null, before: null, after: null, predata: null}, opts);
        var toid = me.data('to'), toname = me.attr('id'), type = me.data('type'), src = me.data('src'), txt = me.data('txt') || '';
        var stopevent = function(e){ e.stopPropagation(); e.preventDefault(); };
        var get_json = function (url) {
            var json = [];
            if (/[\.\/]/.test(url)) {
                var rel = baidu.ajax(url, {cache: false, async: false}).responseText;
                if (rel.substr(0, 1) == '[') {
                    json = baidu.json.parse(rel);
                }
            } else {
                json = eval(src);
            }
            if(arg.predata != null){ if(json[0]['id'] != arg.predata['id']){ json.unshift(arg.predata); }}
            return json;
        };
        var get_text = function(url){ return baidu.ajax(url, {cache: false, async: false}).responseText;};
        var sel_opt = function (o) {
            var src = baidu(o).data('src');
            _get(toid).value = src.id;
            _get(toname).value = src.text;
            if (arg.after != null) { arg.after.call(this, me, src);}
            baidu('#dropdown').remove();
        };
        var sel_empty = function(){
            _get(toid).value = '';
            _get(toname).value = '';
            if (arg.after != null) { arg.after.call(this, me, {id: 0, text: ''});}
            baidu('#dropdown').remove();
        };
        var set_value = function(v){
            var _toname = _get(toname);
            switch (type) {
                case 'stable':
                    _toname.value = get_text(src + ((src.indexOf('?') > -1) ? '&' : '?') +'id='+ encodeURIComponent(v));
                    break;
                case 'area':
                case 'region':
                    _toname.value = get_text(src + '?do=fullname&id='+ v);
                    break;
                case 'checkbox':
                    src = get_json(src);
                    var txts = [],  sels = v.split(',');
                    for (var i = 0, j = src.length; i < j; i++) {
                        if (sels.indexOf(src[i].id) > -1) {
                            txts.push(src[i].text);
                        }
                    }
                    _toname.value = txts.join(',');
                    break;
                case 'json':
                    src = get_json(src);
                    for (var i = 0, j = src.length; i < j; i++) {
                        if (src[i].id == v) {
                            _toname.value = src[i].text;
                            break;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (arg.after != null) { arg.after.call(this, me, { id: v, text: _toname.value});}
        };
        var dropbox = function () {
            if (arg.before != null) {
                var rel = arg.before.call(this, me, {id: toid, name: toname});
                if(rel != undefined && rel == false){
                    return;
                }
            }
            var left = 'auto', right = 'auto', width = arg.width, height = arg.height;
            var dd = baidu('#dropdown');
            if (dd.length == 0) { dd = baidu('<div id="dropdown" class="input" />').appendTo('body');}
            if(arg.pos == 'left'){ left = 0; right = 'auto'; } else { left = 'auto'; right = 0; }
            if (width == 0) { width = me.innerWidth();}
            dd.empty().css({width: width, height: height, top: me.outerHeight(), left: left, right: right, 'z-index': 10000});
            dd.click(function (e) { e.stopPropagation();});
            dd.insertAfter(me).show();
            setTimeout( function () { baidu(document).one('click', function () { dd.remove();});}, 50);
            switch (type) {
                case 'stable':
                    var attach_event = function(){
                        dd.find('a[href]').click(function(e){
                            load_html(this.href);
                            stopevent(e);
                        });
                        dd.find('tr').click(function(){
                            var obj = baidu(this);
                            var val = obj.data('val');
                            var src = baidu.json.parse('{'+ val +'}');
                            obj.data('src', src);
                            sel_opt(obj);
                        });
                    };
                    var load_html = function(u){
                        var intxt = get_text(u);
                        var inobj = baidu('<div/>').html(intxt).find('div#popupdata');
                        dd.find('div#popupdata').html(inobj.html());
                        attach_event();
                    };
                    var search = function(){
                        var datas = {};
                        dd.find('input').each(function(){
                            var n = baidu(this).attr('name') || '';
                            if(n != ''){
                                datas[n] = this.value;
                            }
                        });
                        var arg = baidu.ajax.param(datas);
                        if(arg.length > 0){
                            load_html(src + ((src.indexOf('?') > -1) ? '&' : '?') + arg);
                        }else{
                            load_html(src);
                        }
                    };
                    var html = get_text(src);
                    dd.html(html);
                    dd.find('a[href]').click(function(e){
                        load_html(this.href);
                        stopevent(e);
                    });
                    dd.find('input').keydown(function(e){
                        if(e.keyCode == 13){
                            search();
                            stopevent(e);
                        }
                    });
                    if((me.attr('onkeydown') || '').indexOf('return false') > -1){
                        dd.find('input').eq(0).focus();
                    }
                    dd.find('#popupsearch').click(search);
                    dd.find('#popupremove').click(sel_empty);
                    attach_event();
                    break;
                case 'area':
                    var rid = _get(toid).value;
                    var html = get_text(src + '?id='+ rid);
                    dd.html(html);
                    dd.on('click', 'a', function(){
                        var obj = baidu(this);
                        var val = baidu.json.parse('{'+ obj.data('val') +'}');

                        if(val.count > 0){
                            var cli = dd.find('li.focus');
                            var nli = cli.clone();
                            cli.html(val.text).removeClass('focus');
                            nli.html('<i class="fa fa-spinner fa-spin"></i>').attr('data-pid', val.id).addClass('focus');
                            cli.after(nli);
                            baidu.get(src + '?do=list&id='+ val.id, function(res){
                                dd.find('#popupdata').html(res);
                                nli.html(dd.find('a:first').html());
                            });
                            T('.fr').click(function(){
                                baidu.get(src + '?do=fullname&id='+ val.id, function(res){
                                    val.text = res;
                                    obj.data('src', val);
                                    sel_opt(obj);
                                });
                            })
                        }else{
                            baidu.get(src + '?do=fullname&id='+ val.id, function(res){
                                val.text = res;
                                obj.data('src', val);
                                sel_opt(obj);
                            });
                        }
                    });
                    dd.on('click', 'li', function(){
                        dd.find('li.focus').removeClass('focus');
                        var cli = baidu(this);
                        var pid = cli.data('pid'), name = cli.text();
                        cli.nextAll().remove();
                        cli.html('<i class="fa fa-spinner fa-spin"></i>').addClass('focus');
                        baidu.get(src + '?do=list&id='+ pid, function(res){
                            dd.find('#popupdata').html(res);
                            cli.html(name);
                        });
                    });
                    break;
                case 'checkbox':
                    var vals = get_json(src);
                    var sels = _get(toid).value.split(',');
                    for (var i = 0, j = vals.length; i < j; i++) {
                        var val = vals[i];
                        var lbl = baidu('<label>').attr('for', 'popupchk_'+ i).html(val.text);
                        var chk = baidu('<input type="checkbox" />').attr('id', 'popupchk_'+ i).data('val', val);
                        chk.click(function(){
                            var ids = [], txts = [];
                            dd.find('input').map(function(){
                                if(this.checked){
                                    var v = baidu(this).data('val');
                                    ids.push(v.id);
                                    txts.push(v.text);
                                }
                            });
                            _get(toid).value = ids.join(',');
                            _get(toname).value = txts.join(',');
                        });
                        if(sels.indexOf(val.id) > -1){ chk.attr('checked', 'checked'); }
                        var div = baidu('<div class="blc"/>');
                        if(arg.css != null){ div.css(arg.css); }
                        div.append(chk).append(lbl);
                        dd.append(div);
                    }
                    break;
                case 'json':
                    src = get_json(src);
                    for (var i = 0, j = src.length; i < j; i++) {
                        var text = src[i].text;
                        if (src[i].path) { text = src[i].path + ' ' + text;}
                        var a = baidu('<a class="opt"/>').html(text).data('src', src[i]);
                        a.click(function () { sel_opt(this);});
                        dd.append(a);
                    }
                    if(height > j * 33){ dd.css('height', 'auto'); }
                    me.unbind('keyup').keyup(function(){
                        var v1 = this.value;
                        if(v1 == ''){
                            dd.find('a').show();
                        }else{
                            dd.find('a').each(function(){
                                if(this.innerHTML.indexOf(v1) == -1){
                                    T(this).hide();
                                }else{
                                    T(this).show();
                                }
                            });
                        }
                    });
                    break;
                case 'color':
                    dd.css('width', 180);
                    src = ['#000000', '#993300', '#333300', '#003300', '#003366', '#000080', '#333399', '#333333', '#800000', '#FF6600', '#808000', '#008000', '#008080', '#0000FF', '#666699', '#808080', '#FF0000', '#FF9900', '#99CC00', '#339966', '#33CCCC', '#3366FF', '#800080', '#969696', '#FF00FF', '#FFCC00', '#FFFF00', '#00FF00', '#00FFFF', '#00CCFF'];
                    for (var i = 0, j = src.length; i < j; i++) {
                        var val = src[i];
                        var a = baidu('<a class="blc" style="background-color:' + val + '"/>').data('src', {
                            id: val,
                            text: val
                        });
                        a.click(function () {
                            sel_opt(this);
                            document.getElementById(toname).style.backgroundColor = baidu(this).data('src').id;
                        });
                        dd.append(a);
                    }
                    break;
                case 'time':
                    dd.css({'width': 220, 'height': 200});
                    for (var i = 0, j = 24; i < j; i++) {
                        var t1 = ((i < 10) ? ('0'+ i) : i) + ':00';
                        var a1 = baidu('<a class="time" />').data('src', { id: t1, text: t1 }).html(t1);
                        a1.click(function () { sel_opt(this);});
                        dd.append(a1);
                        var t2 = ((i < 10) ? ('0'+ i) : i) + ':30';
                        var a2 = baidu('<a class="time" />').data('src', { id: t2, text: t2 }).html(t2);
                        a2.click(function () { sel_opt(this);});
                        dd.append(a2);
                    }
                    break;
                case 'list':
                    src = get_json(src);
                    for (var i = 0, j = src.length; i < j; i++) {
                        var text = src[i];
                        var val = { id: text, text: text };
                        var a = baidu('<a class="list"/>').html(text).data('src', val);
                        a.click(function () { sel_opt(this);});
                        dd.append(a);
                    }
                    break;
                case 'autofill':
                    var load = function(e){
                        var cur = baidu('#'+ toname), val1 = cur.val(), val2 = cur.data('temp') || '';
                        var json = [];
                        if(val1 == val2){
                            json = cur.data('cache') || [];
                        }else{
                            var url = src + ((src.indexOf('?') == -1) ? '?' : '&') + 'word='+ encodeURIComponent(val1);
                            json = get_json(url);
                            cur.data('temp', val1);
                            cur.data('cache', json);
                        }
                        if(e != undefined){
                            _get(toid).value = '';
                        }
                        dd.empty();
                        for (var i = 0, j = json.length; i < j; i++) {
                            var text = json[i].text;
                            var a = baidu('<a class="opt"/>').html(text).data('src', json[i]);
                            a.click(function () { sel_opt(this);});
                            dd.append(a);
                        }
                        if(height > j * 33){ dd.css('height', 'auto'); }
                    };
                    me.unbind('keyup').keyup(load);
                    load();
                    break;
                default:
                    break;
            }
        };

        var _toid = _get(toid);
        this.val = function(v){ if(v == undefined){ return me;}  _toid.value = v; set_value(v); return me;};
        this.src = function(v) { src = v; return me;};
        this.enable = function(b){ _get(toname).disabled = !b; if(b == false){ _toid.value = '';} return me; };
        if(_toid && _toid.value != ''){ set_value(_toid.value);}
        me.click(function (e) { dropbox(); stopevent(e);});

        return me;
    },
    groupCheckBox: function () {
        var chk = this.find('input:checkbox');
        chk.click(function () {
            var c = this.checked;
            if (c == true) {
                chk.removeAttr('checked');
            }
            this.checked = true;
        });
    },
    CheckboxAll: function (btn) {
        var me = this;
        var all = me.find('input.chkall');
        var ones = me.find('input.chkone');
        var btn = baidu(btn);
        var stxt = btn.html(), atxt = btn.data('tog');
        this.getCheckeds = function () {
            return me.find('input.chkone:checked').map(function () {
                return this.value;
            }).get().join(',');
        };
        ones.click(function () {
            if (me.find('input.chkone:checked').length == ones.length) {
                all[0].checked = true;
                btn.html(atxt);
            } else {
                all[0].checked = false;
                btn.html(stxt);
            }
        });
        all.click(function () {
            if (this.checked) {
                ones.attr('checked', 'checked');
                btn.html(atxt);
            } else {
                ones.removeAttr('checked');
                btn.html(stxt);
            }
        });
        btn.click(function () {
            if (btn.text() == atxt) {
                ones.removeAttr('checked');
                all[0].checked = false;
                btn.html(stxt);
            } else {
                ones.attr('checked', 'checked');
                all[0].checked = true;
                btn.html(atxt);
            }
        });
        return me;
    },
    SimpleTree: function(click){
        var me = this;
        var fs = me.find('>li');
        var c1 = fs.length;
        fs.each(function(i){
            var o = baidu(this);
            var cs = o.find('li');
            var c2 = cs.length;
            if(c2 == 0){ o.addClass('n_child');} else { o.addClass('n_father'); }
            if(c1 == i+1){ o.addClass('n_last'); }
            cs.addClass('n_child').last().addClass('n_last');
        });
        me.find('label').click(function(){
            me.find('label.focus').removeClass('focus');
            baidu(this).addClass('focus');
            if(click != null && baidu.isFunction(click)){
                click.call(this, (baidu(this).data('ref') || ''));
            }
        });
        return me;
    },
    ContextMenu: function(opts){
        var cm = baidu('.context'), tar = null;
        var arg = baidu.extend({ click: null}, opts);
        var stopevent = function(e){ e.stopPropagation(); e.preventDefault(); };
        cm.contextmenu(function(e){
            stopevent(e);
        }).find('li').mouseover(function(){
            cm.show();
            cm.mouseout(function(){ cm.hide();});
        }).click(function(e){
            if(arg.click != null){ arg.click.call(this, tar, this) }
            cm.hide();
            stopevent(e);
        });
        baidu(this).contextmenu(function(e){
            var w = T(window), x = e.clientX, y = e.clientY + w.scrollTop();
            if(x + cm.width() > w.width()){ x = x - cm.width();}
            cm.css({ left: x, top: y}).show();
            tar = baidu(this);
            setTimeout( function () { baidu(document).one('click', function () { cm.hide();});}, 50);
            stopevent(e);
        });
    },
    AjaxTab: function (opt) {
        var me = this;
        var div = me.next();
        var txt = div.html();
        var opt = baidu.extend({ after: null }, opt);
        this.load = function (tar, idx) {
            tar = baidu(tar);
            tar.html(txt).find('div.showtxt').removeClass('showtxt');
            var src = me.find('li.focus').data('src');
            if (src.indexOf('?') == -1) {
                src += '?idx=' + idx;
            } else {
                src += '&idx=' + idx;
            }
            baidu.get(src, function (res) {
                var tmp = baidu('<div></div>').html(res);
                var trs = tmp.find('tr:gt(0)');
                if (trs.length > 0) {
                    tar.closest('tr').after(trs).remove();
                } else {
                    tar.html(tmp.text());
                }
            });
        };
        this.search = function (tar) {
            tar = baidu(tar);
            var src = me.find('li.focus').data('src');
            var eles = tar.closest('form')[0].elements;
            var datas = {};
            for(var i= 0, j=eles.length; i<j; i++){
                var ele = eles[i];
                var name = ele.name || '';
                if (name == '' || ele.type != 'text') {
                    continue;
                }
                var reg = new RegExp('('+ name +'=[^&]*)');
                if(reg.test(src)){
                    src = src.replace(reg, name +'='+ encodeURIComponent(ele.value));
                }else{
                    datas[name] = ele.value;
                }
            }
            var arg = baidu.ajax.param(datas);
            if(arg.length > 0){
                if (src.indexOf('?') == -1) {
                    src += '?' + arg;
                } else {
                    src += '&' + arg;
                }
            }
            me.find('li.focus').data('src', src);
            baidu.get(src, function (res) {
                tar.closest('div').html(res);
            });
        };
        me.find('li').click(function () {
            var li = baidu(this);
            var src = li.data('src');
            div.html(txt);
            me.find('li').not(li).removeClass('focus');
            li.addClass('focus');
            baidu.get(src, function (res) {div.html(res); if(opt.after != null){ opt.after.call(this, li, res);} });
        }).eq(0).trigger('click');
        return me;
    },
    AjaxLoad: function(url, data, callback){
        var me = this;
        var div = baidu('<div/>').addClass('fa fa-spin fa-spinner');
        me.empty();
        me.append(div);
        if(url == undefined){ url = me.data('url');}
        baidu.get(url, data, function (res) {
            div.removeClass('fa fa-spin fa-spinner').html(res);
            if(callback){ callback.call(this, me); }
        });
        return me;
    },
    TableAutoRow: function (opts) {
        var me = this;
        var arg = baidu.extend({key: null, evt: null, after: null, remove: null}, opts);
        var addlistener = function (tr) {
            tr.find('i').css('cursor', 'pointer').click(function () {
                baidu(this).closest('tr').remove();
                fillrow();
                if(arg.remove){ arg.remove.call(this, tr); }
            });
            tr.find('input').blur(function () {
                chkkey();
                fillrow();
            });
            if(arg.evt) {
                tr.each(function(i, v) {
                    arg.evt.call(this, baidu(v));
                });
            }
        };
        var copyrow = function () {
            var ht = me.find('tr:eq(1)').html();
            ht = ht.replace(/\[rnk\]/img, new Date().getTime());
            var tr = baidu('<tr/>').append(ht);
            addlistener(tr);
            tr.appendTo(me);
            if(arg.after){ arg.after.call(this, tr); }
            return tr;
        };
        var chkkey = function () {
            if (arg.key == null) {
                return;
            }
            var vals = [];
            me.find(arg.key).each(function () {
                var val = (this.value || '').trim();
                if (val == '') {
                    return true;
                }
                if (vals.length > 0 && baidu.array(vals).indexOf(val) > -1) {
                    baidu(this).addClass('error');
                } else {
                    baidu(this).removeClass('error');
                }
                vals.push(val);
            });
        };
        var fillrow = function () {
            var blands = 0;
            me.find('tr:gt(1)').each(function () {
                var empty = true;
                baidu(this).find('input:text').each(function () {
                    if (this.value.trim() != '') {
                        empty = false;
                        return false;
                    }
                });
                if (empty) {
                    blands++;
                }
            });
            if (blands == 0) {
                copyrow();
            }
        };
        addlistener(me.find('tr:gt(1)'));
        copyrow();
        this.fillrow = fillrow;
        this.copyrow = function(after){
            var tr = copyrow();
            if(after){ after.call(this, tr); }
        };
        this.clear = function(){
            me.find('tr:gt(1)').remove();
        };
        return me;
    },
    TableAutoHide: function (opts) {
        var me = this;
        var opts = baidu.extend({ cols: [{ w: 1440, h : '.hide1440' },{ w: 1366, h : '.hide1366' },{ w: 1280, h : '.hide1280' }]}, opts);
        baidu(window).resize(function(){
            var width = baidu(window).width();
            for(var idx in opts.cols){
                var col = opts.cols[idx];
                if(width < col.w){
                    me.find(col.h).hide();
                }else{
                    me.find(col.h).show();
                }
            }
        }).trigger('resize');
        return me;
    }
});
baidu.dom.extend({
    msg: function () {
        var me = this;
        var hide = function (){ baidu('div.msg').remove(); };
        var fade = function (d, t) {
            setTimeout(function () {
                d.addClass('msg-fade');
            }, t);
            setTimeout(hide, t + 500);
        };
        var close = baidu('<a class="fa fa-close"></a>');
        var wrap = baidu('<div class="msg"/>');
        var div = baidu('<div class="msg-body"/>').append(close).appendTo(wrap);
        close.click(hide);
        this.alert = function (m, t) {
            div.addClass('msg-alert').append(m);
            if (t != undefined && t > 0) { fade(div, t); }
        };
        this.success = function (m, t) {
            div.addClass('msg-success').append(m);
            if (t == undefined) {t = 1500;}
            fade(div, t);
        };
        hide();
        me.css('position', 'relative');
        me.prepend(wrap);
        return me;
    }
});
baidu.dom.extend({
    blockUI: function () {
        var me = this;
        if (me[0] == undefined) {
            me = baidu.dom('body');
        }
        var id = me.data('blockUI') || '';
        if (id == '') {
            id = new Date().getTime();
            me.data('blockUI', id);
        }

        var div = baidu('#' + id);
        if (div.length == 0) {
            div = baidu('<div class="blockUI"/>').attr('id', id).appendTo(me);
        }
        div.show();

        return me;
    },
    unBlockUI: function () {
        var me = this;
        if (me[0] == undefined) {
            me = baidu.dom('body');
        }
        var id = me.data('blockUI') || '';
        if (id == '') {
            baidu('.blockUI').remove();
        } else {
            baidu('#' + id).remove();
        }
        return me;
    }
});
baidu.blockUI = function () { baidu().blockUI();};
baidu.unBlockUI = function () {baidu().unBlockUI();};
baidu.popwin = function (url, width, height, title, onclose) {
    if(url == 'close'){
        baidu('div.popup').find('a.close').trigger('click');
        return false;
    }
    baidu().blockUI();
    if (width == undefined) {width = 600;}
    if (height == undefined) {height = 300;}
    if (title == undefined) {title = document.title;}
    if (baidu('.popup').length > 0) {baidu('.popup').remove();}
    var top = (T(window).height() - height - 100) / 2 + T(window).scrollTop();
    if (top < 50) {top = 50;}
    var popup = baidu('<div class="popup"/>');
    var wrap = baidu('<div class="wrap"/>').css({width: width, height: height});
    var close = baidu('<a class="close fa fa-close"/>').click(function () {
        if (onclose != undefined && T.isFunction(onclose)) {onclose.call(this);}
        popup.remove();
        baidu().unBlockUI();
    });
    var head = baidu('<div class="head"/>').html(title).append(close);
    var win = baidu('<iframe id="winframe" name="winframe" frameborder="0" class="win"/>');
    win.css({width: '100%', height: (height-35), border: 0, 'overflow-x': 'hidden'});
    win.attr('src', url);
    popup.css('top', top);
    wrap.append(head).append(win).appendTo(popup);
    baidu('body').append(popup);
    this.close = close;
    return this;
};
baidu.popup = function(txt, callback){
    baidu().blockUI();
    if(baidu('.popup').length > 0) {baidu('.popup').remove();}
    var wdw = baidu(window);
    var popup = baidu('<div class="popup"/>');
    var wrap = baidu('<div class="wrap"/>');
    var head = baidu('<div class="head"><label>提示信息</label></div>');
    var close = baidu('<i class="fa fa-close"></i>');
    var body = baidu('<p class="txt"/>').html('<i class="fa" />'+ txt);
    var btn = baidu('<div class="btns"/>').append();
    var btn1 = baidu('<button class="btn btn-primary" />').html('确定');
    var btn2 = baidu('<button class="btn btn-default" />').html('取消');
    var stop = function(){ return wdw.scrollTop() + wdw.height() * 0.3 ;};
    var act1 = function(act){
        if (callback && baidu.isFunction(callback)) {
            var rel = callback.call(this, act, body);
            if(rel != undefined && rel == false){ return;}
        }
        popup.remove();
        baidu().unBlockUI();
    };
    close.click(function () {act1(null);});
    btn1.click(function () {act1(true);});
    btn2.click(function () {act1(false);});
    head.append(close);
    popup.css('top', stop());
    wrap.append(head).append(body).append(btn).appendTo(popup);
    baidu('body').append(popup);
    this.alert = function(){
        body.find('i').addClass('fa-warning');
        btn.append(btn1);
        btn1.focus();
    };
    this.message = function(){
        body.find('i').addClass('fa-info-circle');
        btn.remove();
    };
    this.confirm = function(ext){
        body.find('i').addClass('fa-question-circle');
        btn.append(btn1).append(btn2);
        btn1.css('margin-right', 10).focus();
        if(ext){ body.append(baidu(ext).html());}
    };
    wdw.unbind('scroll').on('scroll', function(){ popup.css('top', stop()); });
    return this;
};
baidu.DropMenu = function(opts){
   baidu('.cmenu > .dd').click(function(e){
       e.stopPropagation();
       var obj = T(this);
       var arg = baidu.extend({ click: null}, opts);
       var hide = function(){ T('div.context').hide();};
       T(document).one('click', hide);
       hide();
       var menu = obj.next().show();
       var oh = obj.outerHeight();
       menu.css({'top': oh, 'right': 0});
       menu.find('li').unbind('click').click(function(){
           if(arg.click != null){ arg.click.call(this, this); }
           hide();
       });
   });
};
baidu.sure2del = function (d, u, c) {
    T.popup('确认要删除此内容吗？', function (stat) {
        if (stat == false) {return;}
        var b = function (res) {
            var rel = res.responseText;
            if (rel == 'ok') {
                if (c != undefined && baidu.isFunction(c)) {
                    c.call(this, d);
                } else {
                    window.location.reload();
                }
            } else {
                T.popup(rel).alert();
            }
        };
        baidu.ajax(u, {cache: false, data: d, type: 'POST', complete: b});
    }).confirm();
};
baidu.TableExtendRow = function (o, u) {

    var p = baidu(o).parent();
    var n = p.next(), t = p.find('td').length, i = baidu(o).find('i');
    if (n.attr('style').indexOf('none') > -1) {
        i.removeClass('fa-plus').addClass('fa-minus');
        var l = baidu('<i/>').addClass('fa fa-spin fa-spinner');
        var d = n.show().find('td').attr('colspan', t).empty().append(l);
        baidu.get(u, function (r) {
            d.html(r);
        });
    } else {
        i.removeClass('fa-minus').addClass('fa-plus');
        n.hide();
    }
};
baidu.EnsureNumberInput = function(evt, dot, neg){
    if(evt.shiftKey == true){
        evt.stopPropagation();
        evt.preventDefault();
    }
    var kc = evt.keyCode;
    if(kc != 8 && kc != 9 && kc != 13 &&kc != 37 && kc != 39 && kc != 46 && (kc < 48 || kc > 57) && (kc < 96 || kc > 105)){
        if(dot == true && (kc == 110 || kc == 190)){
            return;
        }
        if(neg == true && (kc == 189 || kc == 229)){
            return;
        }
        evt.stopPropagation();
        evt.preventDefault();
    }
};
baidu.NumberRound = function(val, pos){
    var n = Math.pow(10, pos);
    return Math.round(val * n) / n;
};