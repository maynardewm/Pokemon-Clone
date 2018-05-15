//Audio Fade out scripts
function audioFadeOutPalletTown() {
	var vol = 1;
	var intervalID = setInterval(function() {
		if(vol > 0) {
			vol -= .05;
			audioElement.volume = vol.toFixed(2);
		} else {
			audioElement.pause();
		}
		
		if(audioElement.paused) {
			vol = 1;
			audioElement.volume = vol.toFixed(2);
			audioElement.setAttribute('src', 'music/OakLab.ogg');
			audioElement.load();
			audioElement.play();
			clearInterval(intervalID);
		}
	}, 50);
			
}

function audioFadeOutOak() {
	var vol = 1;
	var intervalID = setInterval(function() {
		if(vol > 0) {
			vol -= .05;
			audioElement.volume = vol.toFixed(2);
		} else {
			audioElement.pause();
		}
		
		if(audioElement.paused) {
			vol = 1;
			audioElement.volume = vol.toFixed(2);
			audioElement.setAttribute('src', 'music/PalletTown.ogg');
			audioElement.load();
			audioElement.play();
			clearInterval(intervalID);
		}
	}, 50);	
}

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'music/PalletTown.ogg');
audioElement.load();
setTimeout(function() {
	audioElement.play();
}, 1000);

var audioElementTwo = document.createElement('audio2');
audioElementTwo.setAttribute('src', 'music/OakLab.ogg');
audioElementTwo.preload = 'auto';


// STOP AUDIO
jq("#disable-audio").click(function() {
	audioElement.pause();
});