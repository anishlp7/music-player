const music = document.querySelector('audio');
const image = document.querySelector('img');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration'); 
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 

const songs = [
    {
        name:"96-1",
        displayName:"Kaathalae Kaathalae",
        artist:"Govind Vasantha"
    },
    {
        name:"96-2",
        displayName:"Yean",
        artist:"Govind Vasantha"
    },
    {
        name:"96-3",
        displayName:"The Life Of Ram",
        artist:"Govind Vasantha"
    },
    {
        name:"96-4",
        displayName:"Thaabangale",
        artist:"Govind Vasantha"
    }

];

// Check if Playing
let isPlaying = false;

// Play pause Functionalities
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', "Pause")
    music.play();
}

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', "Play")
    music.pause();
}


// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong())) 

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}



// OnLoad
loadSong(songs[songIndex])

// Update Progress & Time

function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime } = e.srcElement;
        // Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60)
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60)
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        
    }
}


// Set Progress Bar
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
music.addEventListener('ended', nextSong)
