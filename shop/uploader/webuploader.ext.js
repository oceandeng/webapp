(function ($) {
    $.fn.extend({
        WebUpload: function (opt) {
            var me = this;
            var arg = $.extend({
                idf: null,
                path: '/data/file/',
                success: function (file, ret) { }
            }, opt);
            var picker = me.find('div'), wrap = me.find('p'), pack = me.find('textarea');
            var type = null, accp = null;
            if(wrap.hasClass('uploader-atts')){
                type = 'att';
                accp = {
                    title: 'Files',
                    extensions: 'gif,jpg,jpeg,bmp,png,doc,docx,xls,xlsx,pdf,txt,zip,rar',
                    mimeTypes: '*/*'
                };
            }else{
                type = 'img';
                accp = {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            }
            var uri = function () {
                var h = window.location.href;
                var e = h.indexOf('/', 8);
                return h.substr(0, e);
            };
            var sync = function(){
                var v = me.find('[_src]').map(function () {
                    var t = $(this);
                    return {
                        src: t.attr('_src'),
                        name: t.html(),
                        md5: (t.attr('md5') || '')
                    };
                }).get();
                var s = JSON.stringify(v);
                pack.val(s);
            };
            var del = function(o, u){
                var d = $(o).closest('div');
                var o = d.find('[_src]');
                var id = (o.attr('id') || '');
                if(id != ''){ u.removeFile(u.getFile(id));}
                d.remove();
                sync();
            };
            WebUploader.Uploader.register({'before-send-file': 'preupload'}, {
                preupload: function( file ) {
                    var me = this, owner = this.owner, deferred = WebUploader.Deferred();
                    owner.md5File( file.source ).fail(function() {
                        deferred.reject();
                    }).then(function( md5 ) {
                        $.ajax({
                            cache: false,
                            method: 'POST',
                            url: '/-/sys/upload.html?do=md5',
                            data: {'idf': arg.idf, 'val': md5},
                            complete: function(xhr){
                                var rel = xhr.responseText;
                                if(/^[\w\-]+\.\w+$/.test(rel)){
                                    $('#' + file.id).attr({'_src': rel, 'md5': md5, 'exit': 1});
                                    owner.skipFile(file);
                                }
                                deferred.resolve();
                            }
                        });
                    });
                    return deferred.promise();
                }
            });
            var uploader = WebUploader.create({
                auto: true,
                swf: '/lib/uploader/Uploader.swf',
                server: uri() + '/lib/uploader/fileupload.php',
                pick: picker,
                accept: accp,
                resize: false,
                chunked: true,
                chunkSize: 1572864,
                sendAsBinary: false,
                formData: { idf: arg.idf }
            });
            uploader.on('fileQueued', function (file) {
                var div = $('<div/>');
                $('<a/>').html('×').click(function(){ del(this, uploader);}).appendTo(div);
                if(type == 'img') {
                    var img = $('<img/>').attr('id', file.id).appendTo(div);
                    uploader.makeThumb(file, function (error, src) {
                        if (error) {  return;}
                        img.attr('src', src);
                    }, 0, 100);
                }else{
                    $('<label/>').attr('id', file.id).html(file.name).appendTo(div);
                }
                uploader.md5File(file).then(function( md5 ){
                    $('#' + file.id).attr({'md5': md5});
                    console.log(md5);
                });
                wrap.append(div);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                var o = $('#' + file.id);
                var d = o.parent();
                var p = d.find('p');
                if (p.length == 0){p = $('<p/>');}
                p.html(Math.round(percentage * 100, 0) + '%').appendTo(d);
            });
            uploader.on('uploadSuccess', function (file, ret) {
                if(ret == undefined){ sync(); return; }
                var o = $('#' + file.id).attr('_src', ret.key);
                var m = o.attr('md5');
                o.parent().find('p').remove();
                sync();
                $.ajax({
                    cache: false,
                    method: 'POST',
                    url: '/-/sys/upload.html?do=insert',
                    //data: {'idf': arg.idf, 'name': file.name, 'size': file.size, 'url': ret.key, 'md5': m ,'vpath':ret.dfsPath.vpath},
                    data: {'idf': arg.idf, 'name': file.name, 'size': file.size, 'url': ret.dfspath.objId, 'md5': m ,'vpath':ret.dfspath.vpath},
                    complete: function(xhr) {
                        var rel = xhr.responseText;
                        if(rel != 'ok'){
                            alert(rel);
                        }
                    }
                });
            });
            uploader.on('uploadError', function (file){ $('#' + file.id).parent().find('p').html('ERR!');});
            $(eval('(' + (pack.val() || '[]') + ')')).each(function (i, v) {
                var d = $('<div/>'), o = null;
                $('<a/>').html('×').click(function(){del(this, null);}).appendTo(d);
                if(type == 'img'){
                    //o = $('<img/>').attr('src', arg.path + v.src);
                    o = $('<img/>').attr('src', v.src);
                }else{
                    o = $('<label/>').html(v.name);
                }
                o.attr({_src: v.src, md5: v.md5}).appendTo(d);
                wrap.append(d);
            });
        }
    });
})(jQuery);