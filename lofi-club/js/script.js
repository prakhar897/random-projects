function chooseRandom(list, current) {
	const randomIndex = Math.floor(Math.random() * list.length);
	if (list[randomIndex] != current) {
		return list[randomIndex];
	}
	chooseRandom(list, current);
}

// Get a random video from the pool of videos
const videos = ["assets/ashoka.mp4"];
let randomVideo = chooseRandom(videos, '');

// Set the background video
const backgroundVideo = document.getElementById("background-video");
backgroundVideo.src = randomVideo;



//-------------------------------------

const audios = ["7NOSDKb0HlU", "jfKfPfyJRdk"]
let randomAudio = chooseRandom(audios, '');

let player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('youtube-player', {
		videoId: randomAudio,
		events: {
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady(event) {
	const volumeSlider = document.getElementById('volume-slider');

	// Initialize volume slider value
	volumeSlider.value = player.getVolume();

	// Volume slider change handler  
	volumeSlider.addEventListener('input', (e) => {
		player.setVolume(e.target.value);
	});
	event.target.playVideo(); // autoplay
}

const pauseButton = document.getElementById('pause-button');

pauseButton.addEventListener('click', () => {
	if (player.getPlayerState() === 1) {
		player.pauseVideo();
		pauseButton.innerHTML = '<span> Play </span>';
	} else {
		player.playVideo();
		pauseButton.innerHTML = '<span> Pause </span>';
	}
});

const changeAudioButton = document.getElementById('change-audio');

changeAudioButton.addEventListener('click', () => {
	let newRandomAudio = chooseRandom(audios, randomAudio);
	randomAudio = newRandomAudio;
	player.loadVideoById(newRandomAudio);
});

//-------------------------

const rainAudio = document.getElementById('rain');
const rainToggle = document.getElementById('rain-toggle');
rainAudio.volume = 0.1;

let rainEnabled = false;

rainToggle.addEventListener('click', () => {
	if (rainEnabled) {
		rainAudio.pause();
		rainToggle.innerHTML = '<span>Rain: Off</span>';
	} else {
		rainAudio.play();
		rainToggle.innerHTML = '<span>Rain: On</span>';
	}

	rainEnabled = !rainEnabled;
});


