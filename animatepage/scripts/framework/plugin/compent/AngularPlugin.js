common.directive('laydate', function() {//时间日期
    return {
        restrict : 'A',
        link : function(scope, element, attr,ngModel) {
            if (attr.skin){
                laydate.skin(attr.skin);
            }else{
                laydate.skin("blue");
            }
            element.on('click', function() {
                laydate({
                    elem : '#' + attr.id,
                    skin: 'blue',
                    format:attr.format!=undefined&&attr.format!=''?attr.format:'YYYY-MM-DD hh:mm:ss',//日期格式
                    istime:attr.istime!=undefined&&attr.istime!=''?true:false,//是否开启时间选择
                    isclear: true, //是否显示清空
                    istoday: true, //是否显示今天
                    issure: true, //是否显示确认
                    festival: true, //是否显示节日
                    min: '1900-01-01 00:00:00', //最小日期
                    max: '2099-12-31 23:59:59', //最大日期
                    //start: '2014-6-15 23:00:00',    //开始日期
                    fixed: true, //是否固定在可视区域
                    //zIndex: 99999999, //css z-index
                    choose:function(data){
                        scope.dateChange && scope.dateChange();
                    },
                    closeFn: function(){
                        scope.dataClose && scope.dataClose();
                    }
                });
            });
        }
    }
});
common.directive('bankcard', function() {//银行卡号高亮显示
    return {
        restrict : 'A',
        link : function(scope, element, attr,ngModel) {
            element.before("<span></span>");//高亮显示的span
            element.prev("span").css({//高亮样式
                "display":"block",
                "line-height":"20px",
                "font-size":"20px",
                "color":"#01a50f",
                "font-weight":"bold",
                "padding-bottom":"5px"
            });
            element.on('keyup paste blur', function() {
                //限制只能输入数字
                var val=element.val().replace(/[^\d]/g,'');
                //判断输入卡号长度
                val = val.length > 19 ? val.substr(0, 19) : val;
                //操作后的卡号显示在输入框
                element.val(val);
                //分隔银行卡号，四位一分隔
                var temp = val.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                //分隔后的卡号填充到label显示
                element.prev("span").html(temp);
            });
        }
    }
});
common.directive('selectbox', function() {//下拉列表美化
    return {
        restrict : 'A',
        link : function(scope, element, attr, ngModel) {
            element.selectBox();
        }
    }
});
common.directive('loading', ['$timeout',function ($timeout) {//加载完成刷新列表数据
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    element.parent().selectBox().selectBox("refresh");
                });
            }
        }
    };
}]);
common.directive('repeatFinish', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('rFinish',element.parent());
                });
            }
        }
    };
}]);
// common.directive('citypicker', function() {//地区选择
//     return {
//         restrict : 'A',
//         link : function(scope, element, attr, ngModel) {
//             element.citypicker();
//         }
//     }
// });
common.directive('uploadimg', ['$compile', '$timeout', '$rootScope', function($compile,$timeout,$rootScope) {//上传图片
    return {
        restrict:"EA",
        template: '<div class="uploadimg"><div class="upload-btn"><input type="file" multiple="true"><span>建议上传尺寸640px*640px，格式支持：bmp,png,jpg,jpeg,gif, 每张图片不超过5M</span><span class="tips"></span></div><div class="queue"></div><input type="hidden" class="vali-input"></div>',
        replace:true,
        link : function(scope, element, attrs) {
            var ImgArr = []; //图片集合
            var id=attrs.id;
            var uploadimgFile=element.find("input[type='file']");
            var uploadimgQueue=element.find(".queue");
            var uploadimgVali = element.find(".vali-input");
            var uploadimgTips = element.find(".tips");
            uploadimgFile.attr("id",id+"-btn").attr("name",id+"-btn");
            uploadimgQueue.attr("id",id+"-con");
            uploadimgVali.attr("name", id);
            uploadimgVali.attr("id", id);
            uploadimgTips.attr("id", id + "Tips");
            uploadimgFile.uploadifive({
                'auto'             : true,
                'buttonText'       : '选择图片',
                'fileType'         : 'image/*',
                'queueID'          : id+"-con",
                'uploadScript'     : $rootScope.httpUrl+'/Util/UploadFile/upload',
                // 'uploadScript'     : 'http://ocean.cn/interface/uploadimg.php',
                'onUploadComplete' : function(file, data) {
                    uploadSuccessCallback(file, data, id);
                    scope[attrs.callback] && scope[attrs.callback]();
                },
                'onCancel'         : function(file, close){
                    uploadDelCallback(close, id);
                    scope[attrs.callback] && scope[attrs.callback]();
                }
            });
            //删除队列中的图片
            uploadimgQueue.on('click', '.close', function(){
                var $_this = $(this);
                customDelFn($_this, id);
                scope[attrs.callback] && scope[attrs.callback]();
            });
            //删除图片从数组中删除
            function customDelFn($_this, ele){
                var $upload = $("#"+ele);
                ImgArr = $upload.attr('data-arr').split('#');
                var thisName = $_this.parents('.uploadItem').find('.fileBase64').find('span').attr('data-path').split('.')[0];
                $_this.parents('.uploadItem').fadeOut(function(){
                    $(this).remove();
                });

                for(var i = 0, l = ImgArr.length; i < l; i++){
                    try{
                        var _thisName = ImgArr[i].split('.')[0];
                        if(thisName == _thisName){
                            ImgArr.splice(i, 1);
                        }
                    }catch(e){}
                }
                $upload.attr('data-arr', ImgArr.join('#'));
                $upload.find('.vali-input').val(ImgArr.join('#'));
            }
            //上传成功回调
            function uploadSuccessCallback(file, data, ele){
                var $upload = $("#"+ele);
                try{
                    ImgArr = $upload.attr('data-arr').split('#');
                }catch(e){};
                var resData = JSON.parse(data);
                if(resData.staus == 101){
                    var resImgPath = resData.data.imgpath;
                    file.queueItem.find('.fileBase64').find('span').attr('data-path', resImgPath);
                    ImgArr.push(resImgPath);
                    $upload.attr('data-arr', ImgArr.join('#'));
                    $upload.find('.vali-input').val(ImgArr.join('#'));
                }
            }
            //删除上传图片回调
            function uploadDelCallback(close, ele){
                var $upload = $("#"+ele);
                ImgArr = $upload.attr('data-arr').split('#');
                var tPath = $(close).parents('.uploadifive-queue-item').find('.fileBase64').find('span').attr('data-path');
                var fileName = tPath.split('.')[0];
                for(var i = 0, l = ImgArr.length; i < l; i++){
                    try{
                        var _thisName = ImgArr[i].split('.')[0];
                        if(fileName == _thisName){
                            ImgArr.splice(i, 1);
                        }
                    }catch(e){}
                }
                $upload.attr('data-arr', ImgArr.join('#'));
                $upload.find('.vali-input').val(ImgArr.join('#'));
            }
        }
    }
}]);
common.directive('timepicker', function(){ //HH:mm时间选择插件 storeBusinessCtrl
    return {
        restrict: 'EA',
        link: function(scope, element, attrs){
            element.DateTimePicker({
                setButtonContent:  "确认",
                clearButtonContent: "取消",
                buttonClicked: function(sButtonType, oInputElement){ //按钮回调
                    $(oInputElement).trigger("validate");
                    switch(sButtonType){
                        case "SET": // 确认回调
                            // console.log(oInputElement);
                            break;
                        case "CLEAR": // 删除回调
                            // console.log(oInputElement);
                            break;
                    }
                }
            });
        }
    }
});
common.directive('tab', function(){ //tab指令 storeBusinessCtrl
    return {
        restrict: 'EA',
        link: function(scope, element, attr){
            element.find('.tab-tit').find('input').on('click', function(e){
                var $_this = $(this),
                    index = $_this.parent().index();

                element.find('.tab-con').each(function(k, v){
                    var $__this = $(v);
                    $__this.hide();

                    if(k == index){
                        $__this.show();
                    }
                });
            });
        }
    }
});
common.directive('checktab', function(){ //tab指令
    return {
        restrict: 'EA',
        link: function(scope, element, attr){
            element.find('.c-tab-tit').find('input').on('click', function(e){
                var $_this = $(this),
                    index = $_this.parent().index();
                    
                    if($_this.is(':checked')){
                        element.find('.freight-set').find('.c-tab-con').eq(index).show();
                    }else{
                        element.find('.freight-set').find('.c-tab-con').eq(index).hide();
                    }
            })
        }
    }
});
common.directive('tofixed', function(){ //
    return {
        restrict: 'A',
        link: function(scope, element, attr){
            attr.max = attr.max || 100;
            element.on("blur",function(){
                var val = parseFloat($.trim($(this).val()));
                if(isNaN(val) || val == "" || val < 0){val = 0}
                if(val > attr.max){val = attr.max}
                val = parseFloat(val).toFixed(2);
                $(this).val(val);
            });
        }
    }
});

// 验证指令
common.directive('length20', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attr){
            element.on('keyup', function(){
                var val = $(this).val();
                if(val.length > 20){
                    $(this).val(val.substr(0, 20));
                }
            })
        }
    }
});
common.directive('length24', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attr){
            element.on('keyup', function(){
                var val = $(this).val();
                if(val.length > 24){
                    $(this).val(val.substr(0, 24));
                }
            })
        }
    }
});
common.directive('specialchar', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attr){
            var pattern = new RegExp("[`~!@#$^&%*()=|{}':;\",\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            element.on('blur', function(){
                var val = $(this).val();
                var len = val.length;
                var ptn = pattern.exec(val);

                if(ptn != null){
                    var fVal = val.substr(0, ptn['index']) + val.substr(ptn['index'] + 1);
                }else{
                    fVal = val;
                };
                $(this).val(fVal);
            })
        }
    }
});
common.directive('mosueenterShow', function(){
    return {
        restrict: 'A',
        link: function($scope, iElm, iAttrs) {
            var timer = null;
            iElm.find('.detail-btn').on('mouseenter', function(){
                if(timer){clearTimeout(timer)}
                $(this).siblings('div').show();
            });
            iElm.find('.detail-con').on('mouseenter', function(){
                if(timer){clearTimeout(timer)}
            });
            iElm.on('mouseleave', function(e){
                var $_this = $(this);
                timer = setTimeout(function(){
                    $_this.find('.detail-con').hide();
                    timer = null;
                }, 200);
            });
        }
    };
});
// 滚动表格指令封装
common.directive('stable', function(){
    return {
        restrict: 'EA',
        templateUrl : 'pages/financial/financialRecon/stable.html',
        replace: true,
        link: function(scope, element, attr){
            /****************** 表格ping插件调用 S **********************/
            var allW = $('.part-one').outerWidth() + $('.part-two').outerWidth() + $('.part-thr').outerWidth() + $('.part-fou').outerWidth() + $('.part-fiv').outerWidth();
            var dyanH = $(window).height() - $('.header').height() - $('.main-title').height() - 200;

            scope.$on('rFinish', function(){
                element.pingTable({
                    width: allW,
                    height: dyanH
                });
            });
            /****************** 表格ping插件调用 E **********************/
        }
    }
});
common.directive('perTab', function(){
    return {
        restrict: 'EA',
        link: function(scope, element, attr){
           element.find('.tab').find('a').on('click', function(e){
                var $_this = $(this),
                    index = $_this.index();

                $_this.siblings().removeClass('active');
                $_this.addClass('active');

                scope.$apply(function(){
                    switch($_this.attr('data-type')){
                        case 'channel':
                            scope.financial.batchtype = "渠道节点";
                            break;
                        case 'store':
                            scope.financial.batchtype = "门店";
                            break;
                        case 'shop':
                            scope.financial.batchtype = "分销店";
                            break;
                    }
                })

                element.find('.tab-con').each(function(k, v){
                    var $__this = $(v);
                    $__this.hide();

                    if(k == index){
                        $__this.show();
                    }
                });
                e.preventDefault();
            });
        }
    }
});
common.directive('cityPicker', function(){
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        link: function(scope, element, attr) {
            element.citypicker({
                onClose: function(){
                    scope[attr.callback] && scope[attr.callback]();
                }
            });
        }
    };
});
common.directive('wordlimit', function(){
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        scope: {
            tlen: "="
        },
        link: function(scope, element, attr) {
            var limitnum = element.find('#limitwarp').text() * 1;
            element.find('textarea').on('keyup', function(e){
                var $_this = $(this);
                var val = $_this.val();
                var num1 = limitnum - val.length;

                if(num1 < 0) {
                    $_this.val(val.substr(0, limitnum))
                    return;
                }else{
                    $_this.val(val)
                }
                var num = $_this.val().length;
                element.find('#limitnum').text(num);
            })

            scope.$watch('tlen', function(){
                if(scope.tlen == ''){
                    element.find('#limitnum').text(0);
                }
            })

        }
    };
});
common.directive('lightbox', function(){
    return {
        restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
        link: function(scope, element, attr) {
            element.find('a').lightBox({});
        }
    };
});


