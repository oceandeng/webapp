console.log('\'Allo \'Allo!');

function sayHello(){
	console.log('hello world');
}

sayHello();

$(function(){
	bodyResize();
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