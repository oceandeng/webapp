/* 
* @Author: ocean
* @Date:   2015-07-06 16:09:56
* @Last Modified by:   ocean
* @Last Modified time: 2015-08-25 12:55:31
*/

'use strict';

function progressbar(end){
  var step = 3,
      target = 0,
      endTarget = 0;

  var canvas = document.querySelector("#prizebar");
  var ctx = canvas.getContext("2d");

  var w = screenW*2,
      h = 100*2,
      fiv = w / 5;

  var one = 1*2,
      ten = fiv + 30,
      sixty = fiv * 2,
      hundred = fiv * 3,
      thousand = w - 80;

  var winWI = document.body.clientWidth;
  var fSize = '24px';
  var mOffset = 120;

  if(winWI <= 360){
    fSize = '20px';
    mOffset = 90;
  }

  var mark = new Image(),
      proA = new Image(),
      proN = new Image();

  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w/2 + "px";
  canvas.style.height = h/2 +"px";

  mark.src = gConfig.path + "images/mark.png";
  proA.src = gConfig.path + "images/progress-a-bg.png";
  proN.src = gConfig.path + "images/progress-n-bg.png";

  if(end >= 0 && end < 20){
    endTarget = 30;
    target = end * (endTarget / 20);
  }else if(end >= 20 && end <= 199){
    var beforeT = 30;
    endTarget = parseInt(fiv / 2) + 30;
    target = beforeT + (end - 20) * ((endTarget - beforeT) / (199 - 20));
  }else if(end > 199 && end <= 1199){
    var beforeT = parseInt(fiv / 2) + 30;
    endTarget = parseInt((fiv / 2) * 2 ) + 30;
    target = beforeT + (end - 199) * ((endTarget - beforeT) / (1199 - 199));
  }else if(end > 1199 && end <= 1999){
    var beforeT = parseInt((fiv / 2) * 2 ) + 23;
    endTarget = parseInt((fiv / 2) * 3 ) + 23;
    target = beforeT + (end - 1199) * ((endTarget - beforeT) / (1999 - 1199));
  }else if(end > 1999 && end <= 9999){
    var beforeT = parseInt((fiv / 2) * 3 ) + 23;
    endTarget = parseInt((fiv / 2) * 5 );
    target = beforeT + (end - 1999) * ((endTarget - beforeT) / (9999 - 1999));
  }else if(end == 10000){
    target = parseInt((fiv / 2) * 5 + 1 ) ;
  }else{
    target = parseInt((fiv / 2) * 5 + 1 ) ;
    // var beforeT = parseInt((fiv / 2) * 5 ) - 18;
    // endTarget = parseInt((fiv / 2) * 5 );
    // target = beforeT + (end - 9999) * ((endTarget - beforeT) / (100000 - 9999));
  }

  function reset(){
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0, 100, w, 36);
  }

  function ProgressbarClass(end){
    var self = this;

    this.widths = 8;
    this.target = end;
    proN.onload = function(){
      self.draw();
    }
  }

  ProgressbarClass.prototype.draw = function(){
      ctx.fillStyle = "#010101";
      ctx.fillRect(6, 106, w - 6 * 2, 24);

      if(end > 0 && end < 4){
        ctx.fillStyle = "#ffaa15";
        ctx.fillRect(8, 108, 1, 22);
      }
      if(end >= 5){
        ctx.fillStyle = "#ffaa15";
        ctx.fillRect(8, 108, (this.widths) - 8 * 2, 22);
      }
      // // 绘制mark
      // ctx.drawImage(mark, this.widths - 10, 36, 20, 40);
      // // 绘制刻度
      // ctx.fillStyle = "#666";
      // ctx.fillRect(10, 62, 2, 18);
      // ctx.fillRect(ten, 62, 2, 18);
      // ctx.fillRect(sixty, 62, 2, 18);
      // ctx.fillRect(hundred, 62, 2, 18);
      // ctx.fillRect(thousand, 62, 2, 18);
      this.word();
      this.money();
    }
    // 绘制文字
    ProgressbarClass.prototype.word = function(){
      ctx.font = fSize + " Microsoft YaHei";
      if(end >= 0 && end < 20){
        ctx.save();
        ctx.fillStyle = "#666";
        ctx.drawImage(mark, 0, 0, 64, 91);
        ctx.fillText('已追到', 65, 40);
        ctx.fillText(this.target +'个妹子', 65, 70);
        ctx.fillText('200个', ten + 10, 40);
        ctx.fillText('妹子', ten + 10, 70);
        ctx.fillText('1200个', sixty + 10, 40);
        ctx.fillText('妹子', sixty + 10, 70);
        ctx.fillText('2000个', hundred + 10, 40);
        ctx.fillText('妹子', hundred + 10, 70);
        ctx.fillText('10000个', thousand - 10, 40);
        ctx.fillText('妹子', thousand - 10, 70);
        ctx.restore();
      }else if(end >= 20 && end <= 199){
        // ctx.textBaseline="middle";

        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, 0, 0, 64, 91);
        ctx.fillText('已追到', 65, 40);
        ctx.fillText(this.target +'个妹子', 65, 70);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#666";
        ctx.fillText('200个', ten + 10, 40);
        ctx.fillText('妹子', ten + 10, 70);
        ctx.fillText('1200个', sixty + 10, 40);
        ctx.fillText('妹子', sixty + 10, 70);
        ctx.fillText('2000个', hundred + 10, 40);
        ctx.fillText('妹子', hundred + 10, 70);
        ctx.fillText('10000个', thousand - 10, 40);
        ctx.fillText('妹子', thousand - 10, 70);
        ctx.restore();
      }else if(end > 199 && end <= 1199){
        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, ten - 15 - 64, 0, 64, 91);
        ctx.fillText('已追到', ten - 15, 40);
        ctx.fillText(this.target +'个妹子', ten - 15, 70);
        ctx.restore();   

        ctx.save();
        ctx.fillStyle = "#666";
        // ctx.textBaseline="middle";
        ctx.fillText('1200个', sixty + 10, 40);
        ctx.fillText('妹子', sixty + 10, 70);
        ctx.fillText('2000个', hundred + 10, 40);
        ctx.fillText('妹子', hundred + 10, 70);
        ctx.fillText('10000个', thousand - 10, 40);
        ctx.fillText('妹子', thousand - 10, 70);
        ctx.restore();  
      }else if(end > 1199 && end <= 1999){
        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, sixty - 15 - 64, 0, 64, 91);
        ctx.fillText('已追到', sixty - 15, 40);
        ctx.fillText(this.target +'个妹子', sixty - 15, 70);
        ctx.restore();   
        
        ctx.save();
        ctx.fillStyle = "#666";
        // ctx.textBaseline="middle";
        ctx.fillText('2000个', hundred - 15, 40);
        ctx.fillText('妹子', hundred - 15, 70);
        ctx.fillText('10000个', thousand - 15, 40);
        ctx.fillText('妹子', thousand - 15, 70);
        ctx.restore();
      }else if(end > 1999 && end <= 9999){
        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, hundred - 15 - 64, 0, 64, 91);
        ctx.fillText('已追到', hundred - 15, 40);
        ctx.fillText(this.target +'个妹子', hundred - 15, 70);
        ctx.restore();   
        
        ctx.save();
        ctx.fillStyle = "#666";
        // ctx.textBaseline="middle";
        ctx.fillText('10000个', thousand - 15, 40);
        ctx.fillText('妹子', thousand - 15, 70);
        ctx.restore();
      }else if(end == 10000){
        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, thousand - 60 - 64, 0, 64, 91);
        ctx.fillText('已追到', thousand - 60, 40);
        ctx.fillText(this.target +'个妹子', thousand - 60, 70);
        ctx.restore();   
      }else if(end > 10000){
        ctx.save();
        ctx.fillStyle = "#ff9000";
        ctx.drawImage(mark, thousand - mOffset - 64, 0, 64, 91);
        ctx.fillText('已追到', thousand - mOffset, 40);
        ctx.fillText('10000以上个妹子', thousand - mOffset, 70);
        ctx.restore();  
      }
    }

    // 绘制钱标
    ProgressbarClass.prototype.money = function(){
      if(end >= 0 && end < 20){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";        
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.drawImage(proN, ten - 30, 150, 100, 55);
        ctx.fillText('10元', ten - 30 + 30, 190);
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.drawImage(proN, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();
      }else if(end >= 20 && end <= 199){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, ten - 30, 150, 100, 55);
        ctx.fillText('10元', ten - 30 + 30, 190);
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.drawImage(proN, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();
      }else if(end > 199 && end <= 1199){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, ten - 30, 150, 100, 55);
        ctx.fillText('10元', ten - 30 + 30, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);        
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.drawImage(proN, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();
      }else if(end > 1199 && end <= 1999){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.drawImage(proN, ten - 50, 150, 100, 55);
        ctx.fillText('10元', ten - 50 + 30, 190);        
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.drawImage(proN, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();
      }else if(end > 1999 && end <= 9999){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.drawImage(proN, ten - 50, 150, 100, 55);
        ctx.fillText('10元', ten - 50 + 30, 190);
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();
      }else if(end == 10000){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.drawImage(proN, ten - 50, 150, 100, 55);
        ctx.fillText('10元', ten - 50 + 30, 190);
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.restore();
      }else if(end > 10000){
        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#000";
        ctx.drawImage(proA, thousand - 15, 150, 100, 55);
        ctx.fillText('1000元', thousand - 15 + 15, 190);
        ctx.restore();

        ctx.save();
        ctx.font = "20px Microsoft YaHei";
        ctx.fillStyle = "#b2b2b2";
        ctx.drawImage(proN, 0, 150, 100, 55);
        ctx.fillText('1元', 30, 190);
        ctx.drawImage(proN, ten - 50, 150, 100, 55);
        ctx.fillText('10元', ten - 50 + 30, 190);
        ctx.drawImage(proN, sixty - 15, 150, 100, 55);
        ctx.fillText('60元', sixty - 15 + 25, 190);
        ctx.drawImage(proN, hundred - 15, 150, 100, 55);
        ctx.fillText('100元', hundred - 15 + 25, 190);
        ctx.restore(); 
      }      
    }

  var bar = new ProgressbarClass(end);
  
  reset();
  bar.draw();

  function draw(){
    if(end == 0){
      reset();
      bar.draw();
    }
    // if(end > 0 && end < 20){
    //   bar.widths += 0.5;
    //   if (bar.widths < target*2) {
    //     reset();
    //     bar.draw();
    //   }
    // }
    // if(end >= 20){
      bar.widths += step;
      if (bar.widths < target*2) {
          reset();
          bar.draw();
      } 
    // }
  }
  function animloop(){
        draw();
        requestAnimationFrame(animloop);
  }
  animloop();

}