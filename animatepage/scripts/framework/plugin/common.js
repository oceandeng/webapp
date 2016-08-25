$(function() {
    //页面大小改变
    $(window).resize(function() {
        bodyResize();
    });
});
//重置页面高度
function bodyResize(){
    //左侧菜单最小高度设置
    var ch = $("body").height();
    var sh = $(window).height();
    $(".body").css ("height","");
    if(ch<sh){
        $(".body").css ("min-height", sh-54);
    }
}
//获取对应code代码的值
function getCode(name,id,style){
    if(!$.isEmptyObject(code[name]) && !$.isEmptyObject(code[name][id])){
        if(style=="style"){
            return code[name][id].style || "";
        }else{
            return code[name][id].name || "";
        }
    }else{
        return "";
    }
}
//时间格式转时间戳"2016-4-18 10:45:56"
function dateToMs(date){
    var getDate = function(strDate) {return date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');}
    return Ms = Date.parse(new Date(getDate(date)))*10;//毫秒*10//////14位时间戳
}
//时间戳转日期时间
function msToDateTime(ms) {//接收14位时间戳
    var date = new Date(parseInt(parseInt(ms)/10));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? ('0' + date.getHours()) :  date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) :  date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) :  date.getSeconds());

    var dateTime = Y + M + D + h + m + s;
    return dateTime;
}
//时间戳转日期
function msToDate(ms) {//接收14位时间戳  
    var date = new Date(parseInt(parseInt(ms)/10));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    var _date = Y + M + D;
    return _date;
}
//格式化金额，保留2位小数
function formatAmount(amount) {
    return parseFloat(amount).toFixed(2);
}
(function($) {
    $.extend({
        //普通弹窗提示
        showAlert: function(options) {
            var opts = {
                msg: "", //提示语，表现标题
                des: "", //描述语，表现原因
                type: 1, //1：成功，2：失败
                time: 1000, //持续时间
                template: '<div class="valert"><a class="iconfont icon-iconfontclose2"></a><div class="v_title"></div><div class="v_des"></div></div>',
                close: function() {
                    $(".valert").remove();
                }
            };
            var opts = $.extend(opts, options);
            opts.close();
            $("body").append(opts.template);
            var valert = $(".valert");
            var vclose = $(".valert a");
            var vtitle = $(".valert .v_title").text(opts.msg);
            var vdes = $(".valert .v_des").text(opts.des);
            if (opts.type == 1) {
                opts.time = 1000; //成功显示2秒，消失延迟占用1秒
                valert.addClass("suc");
                vclose.remove();
            } else if (opts.type == 2) {
                opts.time = 3000; //失败显示4秒，消失延迟占用1秒
                valert.addClass("fail");
                vclose.click(function() {
                    opts.close();
                });
            }
            var t = setTimeout(function() { valert.fadeOut(1000) }, opts.time); //渐隐
            var s = setTimeout(function() { opts.close() }, (opts.time + 1000)); //移除
        },
        //确认弹窗提示
        showConfirm: function(options) {
            var opts = {
                title1: "", //第一个标题
                title2: "", //第二个标题
                title3: "", //第三个标题
                _func: function() {
                    //点击确认执行函数
                },
                _close: function() {
                    //关闭按钮执行函数
                    $(".clayer_mask,.clayer_confirm").remove();
                },
                template: '<div class="clayer_mask"></div><div class="clayer_confirm"><div class="title"><span></span><a href="javascript:;" class="close">关闭</a></div><div class="content"><div class="con"><div class="main_msg"><i class="iwarning"></i><span></span></div><div class="add_msg"></div></div></div><div class="clayer_btn"><a href="javascript:;" class="submit btn btn-guide">确认</a><a href="javascript:;" class="cancel btn btn-normal">取消</a></div></div>'
            };
            var opts = $.extend(opts, options);
            $("body").append(opts.template);
            var _title1 = $(".clayer_confirm .title span"),
                _title2 = $(".clayer_confirm .main_msg span"),
                _title3 = $(".clayer_confirm .add_msg"),
                _submit = $(".clayer_confirm .submit"),
                _close = $(".clayer_confirm .close, .clayer_confirm .cancel");
            _title1.text(opts.title1);
            _title2.text(opts.title2);
            _title3.text(opts.title3);
            _submit.on("click", opts._func);
            _close.on("click", opts._close);
        },
        //获取url中的参数
        GetRequest:function(name){
            var url = location.href; //获取url中"?"符后的字串   
            var theRequest = new Object();   
            if (url.indexOf("?") != -1) {   
                var str = url.substr(url.indexOf("?")+1);   
                strs = str.split("&");   
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
                }
            }           
            return theRequest[name] || theRequest;
         
        },

        //判断是否为Null
        isNull: function(obj) {
            if (obj == undefined || obj == "" )
                return true;
            else
                return false;
        },
        //正则表达式
        getExp: function(name, value) {
            var regExp = {};
            regExp.chinese = "^[^u4E00-u9FA5]$"; //验证中文
            // regExp.mobile="^[1][3|4|5|7|8][0-9]{9}$";//验证手机号
            regExp.mobile = "^[1][0-9]{10}$"; //以一开头的11位数字
            regExp.telephone = "^([0-9]{3,4}-)?[0-9]{7,8}$"; //校验座机
            regExp.postcode = "^[1-9][0-9]{5}$"; //验证邮编
            regExp.number = "^-?\d+$"; //数字
            regExp.zNum = "^[0-9]*$"; //正整数
            regExp.areacode = "^0[0-9]{2,3}$"; //区号
            regExp.guhua = "^[0-9]{7,8}$"; //固话号
            regExp.lgzNum = "^[0-9]*[1-9][0-9]*$"; // >0的正整数
            regExp.enCode = "^[A-Za-z]+$"; //英文字母
            regExp.pwd = "^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{5,18}$";//长度在5-18之间
            //regExp.idCard="^[d{15}|d{}18$";//身份证
            regExp.email = "^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$";//Email
            //regExp.date="^\d{4}-\d{2}-\d{2}$";//日期 yyyy-mm-dd
            regExp.bankId = "^[0-9]{16}|[0-9]{19}$"; //银行卡号
            regExp.specialChar = "[`~!@#$^&%*()=|{}':;\",\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";
            regExp.userName = /^\w*[A-Za-z\u2E80-\u9FFF]+\w*$/; // 不能是纯数字、可包含中文字符
            regExp.userNameN = /^[A-Za-z0-9\u2E80-\u9FFF_()\\[\\]+$/; // 不包含特殊字符
            regExp.seat = /^[0-9a-zA-Z]+$/g;//只能英文字母或数字
            var exp = new RegExp(regExp[name]);
            return exp.test(value);
        }
    });
})(jQuery);

(function($){
    $.fn.getFormData=function(data){
        //元素名,input类型,数据字段名称,结构组名,前缀名,后缀名
        var tag,tp,FullName,NameArray,fstName,secName;
        //json结构
        var jsonData={};
        if(!$.isEmptyObject(data)){
            jsonData=data;
        }
        /*说明：前缀和后缀是为了组装兼容复合结构的json  
        例：a#b 这样的名字产生出来的json结构如下
        {
            a:{
                "b":""
            }
        }*/
        $(this).find("input,select,textarea,hidden").each(function(){ 
            tp=$(this).attr("type");
            tag=$(this)[0].tagName;
            FullName=$(this).attr("data-input"); 
            if($.isEmptyObject(FullName)){
                return true;
            }
            NameArray=FullName.split("#");
            if(NameArray.length>1){              
                fstName=NameArray[0];
                secName=NameArray[1];
            }else{
                fstName="";
                secName="";
            }
            //前缀名为空则不是复合结构json
            if(tag=="INPUT"){
                if($.isEmptyObject(fstName)){
                    if(tp=="text"||tp=="hidden"||tp=="password"||tp=="time"){
                       jsonData[FullName]=$(this).val();
                    }else if(tp=="checkbox" && $(this).is(":checked")){  
                        jsonData[FullName]=$(this).val();
                    }else if(tp=="radio" && $(this).is(":checked")){
                        jsonData[FullName]=$(this).val();
                    }else if($.isEmptyObject(jsonData[FullName])){
                        jsonData[FullName]="";
                    }
                }else{
                    if($.isEmptyObject(jsonData[fstName])){
                        jsonData[fstName]={};
                    }
                    if(tp=="text"||tp=="hidden"||tp=="password"||tp=="time"){
                        jsonData[fstName][secName]=$(this).val();
                    }else if(tp=="checkbox" && $(this).is(":checked")){           
                        jsonData[fstName][secName]=$(this).val();
                    }else if(tp=="radio" && $(this).is(":checked")){
                        jsonData[fstName][secName]=$(this).val();
                    }else if($.isEmptyObject(jsonData[fstName][secName])){
                        jsonData[fstName][secName]="";
                    }
                }
            }else if(tag=="SELECT"){
                if($.isEmptyObject(fstName)){
                    jsonData[FullName]=$(this).val();
                }else{
                    if($.isEmptyObject(jsonData[fstName])){
                        jsonData[fstName]={};
                    }
                    jsonData[fstName][secName]=$(this).val();
                }
            }else if(tag=="TEXTAREA"){
                if($.isEmptyObject(fstName)){
                    jsonData[FullName]=$(this).val();
                }else{
                    if($.isEmptyObject(jsonData[fstName])){
                        jsonData[fstName]={};
                    }
                    jsonData[fstName][secName]=$(this).val();
                }
            }
        })
        return jsonData;
    }
})(jQuery);

(function($){
    $.fn.FillFormData=function(jsonData){
        //元素名,input类型,数据字段名称,结构组名,前缀名,后缀名
        var tag,tp,FullName,NameArray,fstName,secName;
        /*说明：前缀和后缀是为了组装兼容复合结构的json  
        例：a#b 这样的名字产生出来的json结构如下
        {
            a:{
                "b":""
            }
        }*/
        $(this).find("input,select,textarea").each(function(){
            fstName="";
            secName="";
            tp=$(this).attr("type");
            tag=$(this)[0].tagName;
            FullName=$(this).attr("data-input");
            if($.isEmptyObject(FullName)){
                return true;
            }
            NameArray=FullName.split("#");
            if(NameArray.length>1){
                fstName=NameArray[0];
                secName=NameArray[1];
            }

            //前缀名为空则不是复合结构json
            if(tag=="INPUT" || tag=="SELECT"){                  
                if($.isEmptyObject(fstName)){
                    if(tp=="text"){
                        $(this).val(jsonData[FullName]);
                    }else if(tp=="radio" && jsonData[FullName]==$(this).val()){
                        console.info($(this).val());
                        $(this).attr("checked",true);
                    }else if(tp=="checkbox"){
                        if($(this).val()==jsonData[FullName]){
                            $(this).attr("checked",true);
                        }else{
                            $(this).attr("checked",false);
                        }
                    }else if(tag=="SELECT"){
                        $(this).val(jsonData[FullName]);
                    }
                }else{                     
                    if(tp=="text"){
                        $(this).val(jsonData[fstName][secName]);
                    }else if(tp=="radio" && jsonData[fstName][secName]==$(this).val()){
                        $(this).attr("checked",true);
                    }else if(tp=="checkbox"){
                        if($(this).val()==jsonData[fstName][secName]){
                            $(this).attr("checked",true);
                        }else{
                            $(this).attr("checked",false);
                        }
                    }else if(tag=="SELECT" ){
                        $(this).val(jsonData[fstName][secName]);
                    }
                }
            }
            if(tag=="TEXTAREA"){
                if($.isEmptyObject(fstName)){
                    $(this).val(jsonData[FullName]);
                }else{
                    $(this).val(jsonData[fstName][secName]);
                }
            }
        })
    }
})(jQuery);

(function($){
    $.extend ({
        ConfirmTable : function(options){
            var opts,result;
            opts={
                columns:[], 
                data:{},
                No:false 
            };
            opts = $.extend({},opts,options);
            result='<table class="tableList"><tbody>';
            var confirmTh = function(rData){
                var tmp='<tr>';
                for(var i=0; i<rData.length; i++){
                    tmp+='<th';
                    if(rData[i].width){
                        tmp+=' width="'+rData[i].width+'"';
                    }
                    if(rData[i].align){
                        tmp+=' style="text-align:'+rData[i].align+'"';
                    }
                    tmp+='>'+rData[i].th+'</th>';
                }
                tmp+='</tr>';
                return tmp;
            }
            var confirmTd = function(rData,jData){
                var tmp='<tr>';
                for(var i=0; i<rData.length; i++){
                    var names=rData[i].name;
                    var render=rData[i].render;
                    tmp+='<td';
                    if(rData[i].align){
                        tmp+=' style="text-align:'+rData[i].align+'"';
                    }
                    tmp+='>';
                    if(render){
                        tmp+=render(jData);
                    }else{
                        tmp+=jData[names];
                    }
                    tmp+='</td>';
                }
                tmp+='</tr>';
                return tmp;
            }
            result+=confirmTh(opts.columns);
            var jsonData = opts.data;
            for(var i=0;i<jsonData.rows.length; i++){
                result+=confirmTd(opts.columns,jsonData.rows[i]);
            }
            result+='</tbody></table>';
            if(!opts.data.rows[0]){
                result+='<div class="table-noData">无数据</div>';
            }
            return result
        },
        initPageCount : function (pageIndex,pageSize,dataCount,pageChange){
            //分页数
            var countNum=Math.ceil(dataCount/pageSize);
             //当前页数不能大于总页数
            pageIndex=pageIndex>countNum?countNum:pageIndex
             //当前偏移量
            var pNum=3;
            //页码集合 
            var pageCount=[];
            //是否修改尾
            var updateEnd=false;
            //是否修改头
            var updateBegin=false
            //左页码数量
            var leftCount=0;
            if(pageIndex-pNum>1){
                leftCount=pNum;
                updateBegin=true;
            }else
                leftCount=pageIndex;
            //右页码数量=当前页码+偏移量
            var rightCount=0;
            if(pageIndex+pNum<countNum){
                rightCount=pNum;
                updateEnd=true;
            }else
                rightCount=countNum-pageIndex;
            //当前数组下标
            var j=0;
            var p=1;
            var html="";
            if(pageIndex<=1){
                pageIndex=1;
                html+="<a ng-click='"+pageChange+"(1)'><</a>";
            }else{
                html+="<a ng-click='"+pageChange+"("+(pageIndex-1)+")'><</a>";
            }
            var pageNum;
            //当前页左边页码        
            for(var i=0;i<leftCount;i++){
                if(pageIndex-leftCount+i<=0)
                    continue;
                pageNum= pageIndex-leftCount+i
                if(pageNum!=1 && updateBegin){
                    pageNum=1;
                }
                html+=createNumHtml(p++,pageNum);
                if(updateBegin){
                    html+="<span>...</span>";
                    updateBegin=false;
                }
                pageCount[j++]=pageIndex-leftCount+i;
            }  
            if(pageCount.length!=0){
                pageCount[j++]=pageIndex;
                html+=createNumHtml(p++,pageIndex,true);
            }
            else{
                pageCount[j++]=pageIndex;
                html+=createNumHtml(p++,1,true);
            }
            //当前页右边页码
            for(var i=0;i<rightCount;i++){
              if(pageIndex-leftCount+i>countNum)
                    continue; 
               pageNum=pageIndex+i+1;
               pageCount[j++]=pageNum;
              if(i+1==rightCount  && updateEnd){
                    html+="<span>...</span>";
                    pageNum=countNum;
              }           
               html+=createNumHtml(p++,pageNum);        
            }

            if(pageIndex == countNum){
                html+="<a ng-click='"+pageChange+"("+ countNum +")'>></a>";
            }else{
                html+="<a ng-click='"+pageChange+"("+(pageIndex+1)+")'>></a>";
            }

            function createNumHtml(index,pageNum,isActive){
                var temp="";
                if(isActive){
                    temp= "<a class='active' ng-click='"+pageChange+"("+pageNum+")'>"+pageNum+"</a>";
                }else{
                    temp= "<a ng-click='"+pageChange+"("+pageNum+")'>"+pageNum+"</a>";
                }
                return  temp;
            }
            return html;
        },
        ConfirmPage : function(options){
            var opts,pageSize,pageIndex,total,html;
            opts={
                pagesize: 20, 
                pageindex: 2,
                total: 120 ,
                pageChange : "",
                sizeChange : ""
            };
            opts = $.extend({},opts,options);
            pageSize = parseInt(opts.pagesize);//每页条数
            pageIndex = parseInt(opts.pageindex);//当前页
            total = parseInt(opts.total);//总条数

            html = '<ul class="pageCon">';
            html += '<li>共'+total+'条</li>';  
            html += '<li class="pageNum">';
            html += this.initPageCount(pageIndex,pageSize,total,opts.pageChange);
            html += '</li>';
            html += '<li class="pageChange" ng-controller="commonCtrl">';
                html += '<span class="lable">每页</span><input type="text" class="pageSize" readonly value="'+pageSize+'" ng-click="common.showPageSize($event)" /><span>条</span>';
                html += '<div class="pageSizeCon" ng-click="'+opts.sizeChange+'($event)">';
                    html += '<a>1</a>';
                    html += '<a>2</a>';
                    html += '<a>3</a>';
                    html += '<a>4</a>';
                    html += '<a>50</a>';
                    html += '<a>60</a>';
                    html += '<a>70</a>';
                html += '</div>';
            html += '</li>';
            html += '</ul>';

            return html;
        }
    });
})(jQuery);

(function($){
    //根据唯一标识查找对应的Json对象
    $.fn.getJsonItem=function(key,value){
        if($.isEmptyObject(value))
            return "";
        for(var i=0;i<$(this).length;i++){
           if($(this)[i][key]==value){
                return $(this)[i];           
           }
        }
    }
})(jQuery);
(function($){
    //根据唯一标识查找对应的Json对象
    $.fn.delJsonItem=function(key,value){
        alert(value);
        alert($.isEmptyObject(value));
        if($.isEmptyObject(value))
            return "";
        console.info($(this));
        for(var i=0;i<$(this).length;i++){
            if($(this)[i][key]==value){
                alert(333);
                $(this).splice(i,1);             
            }
        }
    }
})(jQuery);

function recursionLoop(obj){ // 获取渠道节点数据处理递归函数函数
    var json = obj.data;
    var arr = [];

    if(obj.defaultVal) arr.push(obj.defaultVal);

    for(var i = 0, l = json.length; i < l; i ++){
        var obj = {};
        obj.text = json[i].name;
        obj.id = json[i].im;
        recursionSub(obj, json[i]);
        arr.push(obj);
    }
    return arr;
}
function recursionSub(obj, json){ // 获取渠道节点数据处理递归函数函数
    if(json.child != undefined){
        obj.children = [];
        for(var j = 0, len = json.child.length; j < len; j++){
            var objc = {};
            objc.text = json.child[j].name;
            objc.id = json.child[j].im;
            obj.children.push(objc);
            recursionSub(objc, json.child[j]);
        }
    }
}

;(function($){
    // 配置项
    var defaultSet = {};

    $.fn.pingTable = function(config){
        var config = $.extend({}, config, defaultSet)
        var $_this = $(this);

        return $_this.each(function(){
            $_this.find('.s-table-con').css({
                width: config.width,
            });

            $_this.css({height: config.height}).each(function(){
                $_this.data('slt', {sl: this.scrollLeft, st: this.scrollTop});
            }).scroll(function(){
                var sl = this.scrollLeft,
                    st = this.scrollTop,
                    d = $_this.data('slt');

                if(sl != d.sl){
                    if(sl == 0){
                        $_this.find('.leftPing,.ltPing').css({
                            position: 'static'
                        }).parent().css({
                            paddingLeft: 0
                        })
                    }else{
                        $_this.find('.leftPing,.ltPing').css({
                            position: 'absolute',
                            left: sl,
                            zIndex: 1
                        }).parent().css({
                            paddingLeft: $_this.find('.leftPing').outerWidth()
                        });
                        $_this.find('.topPing').css({
                            zIndex: 2
                        })
                    }
                }
                if(st != d.st){
                    if(st == 0){
                        $_this.find('.topPing,.lTopPing').css({
                            position: 'static'
                        }).next().css({
                            paddingTop: 0
                        })
                    }else{
                        $_this.find('.leftPing').css({
                            zIndex: 1
                        })
                        $_this.find('.lTopPing').css({
                            position: 'absolute',
                            top: st,
                            zIndex: 9
                        }).next().css({
                            paddingTop: $_this.find('.topPing').outerHeight()
                        });
                        $_this.find('.topPing').css({
                            position: 'absolute',
                            top: st,
                            zIndex: 2
                        }).next().css({
                            paddingTop: $_this.find('.topPing').outerHeight()
                        })
                    }
                }
                $_this.data('slt', {sl: sl, st: st});
            });

        });
    }
/*
    // 各行换色
    $('.part-one').find('.leftPing').each(function(k, v){
        if(k % 2 == 0){
            $(v).css({
                background: '#ccc'
            })
        }
    });
*/
})(jQuery);

//检查是否有访问链接的权限
function authcheck(para){
    var ifPermissionPassed=11;
    // $.ajax({
    //     type:"json",
    //     url:"/Admin/Authority/selectAdminMenu",
    //     data: {},
    //     dataType :"json",
    //     success:function(result){
    //         if(result.status=="101") {
    //             angular.forEach (result.data, function (obj) {
    //                 if (obj.path == para) {
    //                     ifPermissionPassed = ifPermissionPassed + 1;
    //                 } else {
    //                     ifPermissionPassed = ifPermissionPassed;
    //                 }
    //             });
    //             if (ifPermissionPassed == 0) {
    //                 window.location.href = "/#/index";
    //             } else {
    //                 $.Deferred().resolve();
    //             }
    //         }else {
    //             window.location.href = "/login/tenant/login.html";
    //         }
    //     }
    // });
}
var NK = {
    toFixedTwo: function(floatNum){
        // return (floatNum * 1).toFixed(2);
        var res = (Math.round(floatNum * 100) / 100).toFixed(2);
        if(isNaN(res)){
            return "";
        }else{
            return res;
        }
    },
    toFixed: function(floatNum){
        var res = (Math.round(floatNum * 100) / 100).toFixed(2);
        if(isNaN(res)){
            return "--";
        }else{
            return "￥"+res;
        }
    },
    recursionLoopFn: function (obj){
        var json = obj;
        var arr = [];

        for(var i = 0, l = json.length; i < l; i ++){
            var obj = {};
            obj.text = json[i].name;
            obj.id = json[i].id;
            if(json[i].ischecked != undefined) obj.ischecked = true;
            NK.recursionSubFn(obj, json[i]);
            arr.push(obj);
        }
        return arr;
    },
    recursionSubFn: function (obj, json){
        if(json.children != undefined && json.children.length != 0){
            obj.children = [];
            for(var j = 0, len = json.children.length; j < len; j++){
                var objc = {};
                objc.text = json.children[j].name;
                objc.id = json.children[j].id;
                if(json.children[j].ischecked != undefined) objc.ischecked = true;
                obj.children.push(objc);
                NK.recursionSubFn(objc, json.children[j]);
            }
        }
    },
    recursionLoopInject: function (obj, status){
        var json = obj;

        for(var i = 0, l = json.length; i < l; i ++){
            json[i]['ischecked'] = status;
            NK.recursionSubInject(json[i], status);
        }
    },
    recursionSubInject: function (json, status){
        if(json.children != undefined && json.children.length != 0){
            for(var j = 0, len = json.children.length; j < len; j++){
                json.children[j]['ischecked'] = status;
                NK.recursionSubInject(json.children[j], status);
            }
        }
    },
    getQuery: function(key) {
        var href = window.location.href;

        if (href.indexOf('?') != -1) {
            var search = href.split('?')[1];
            var params = search.split('&');
            var query = {};
            var q = [];
            var name = '';

            for (i = 0; i < params.length; i++) {
                q = params[i].split('=');
                name = decodeURIComponent(q[0]);

                if (name.substr(-2) == '[]') {
                    if (!query[name]) {
                        query[name] = [];
                    }
                    query[name].push(q[1]);
                } else {
                    query[name] = q[1];
                }

            }
            if (key) {
                if (query[key]) {
                    return query[key];
                }

                return null;
            } else {
                return query;
            }
        }
    },
    isEmptyArray: function(arr){
        if(arr.length > 0 && arr != null){
            return true;
        }else{
            return false
        }
    }
}