function going_counter_callback(obj, json){

}
(function (){
    $('li.going-counter').each(function(){
        var li = $(this);
        var time_holder = li.find('[data-target]');
        var time_target = parseInt(time_holder.data('target'), 10) || 0;
        var time_spans = time_holder.find('span'), span_minute = time_spans.eq(0), span_second = time_spans.eq(1), span_micro1 = time_spans.eq(2), span_micro2 = time_spans.eq(3);
        var minute = Math.floor(time_target / 60);
        var second = time_target % 60;
        var getlucky = function(pid){
            $.get('/-/prd/phase.html?do=lucky', {'pid': pid, '_': new Date().getTime() }, function(res){
                console.log(res);
                var json = eval('('+ res +')');
                if(json['uid'] != '0'){
                    going_counter_callback(li, json);
                }else{
                    setTimeout(function(){
                        getlucky(pid);
                    }, 800);
                }
            });
        };
        var counting = function(){
            var micro1 = 10, micro2 = 10;
            var micro_reducing1 = setInterval(function(){
                micro1--;
                if(micro1 < 0){ micro1 = 9;}
                span_micro1.html(micro1);
            }, 100);
            var micro_reducing2 = setInterval(function(){
                micro2--;
                if(micro2 < 0){ micro2 = 9;}
                span_micro2.html(micro2);
            }, 10);
            if(minute < 10){
                span_minute.html('0'+ minute);
            }else{
                span_minute.html(minute);
            }
            if(second < 10){
                span_second.html('0'+ second);
            }else{
                span_second.html(second);
            }
            second--;
            if(second < 0){
                minute--;
                second = 59;
            }
            if(minute < 0){
                clearInterval(micro_reducing1);
                clearInterval(micro_reducing2);
                time_holder.html('正在开奖...');
                getlucky(li.data('pid'));
            }else{
                setTimeout(function(){
                    clearInterval(micro_reducing1);
                    clearInterval(micro_reducing2);
                    counting();
                }, 1000);
            }
        };
        counting();
    });
})();
