$(function(){
	var music = document.querySelector('#music'),
		$playBtn = $('#playBtn');

	if(music == null || music == undefined) {
		return
	} else {
		var start = true,
			stop = null;

		music.src = 'meida/bgaudio.mp3';
		// music.loop = true;
		music.play();

		$playBtn.on(oTools.clickEvent, function(){
			if(start){
				music.pause();
				cancelAnimationFrame(stop);
				start = false;
			}else{
				music.play();
				loop();
				start = true;
			}
		});

		music.addEventListener('ended', function () {
			music.load();
			music.play();
		}, false);

		var i = 0;
		function loop(){
			if(i > 360){
				i = 1;
			}else{
				i++;
			}
			$playBtn[0].style.transform = 'rotate(' + i + 'deg)';
			$playBtn[0].style.webkitTransform = 'rotate(' + i + 'deg)';
			stop = requestAnimationFrame(loop);
		}
		loop();
	}
});