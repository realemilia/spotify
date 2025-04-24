const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');

const albumArt = document.querySelector('.album-art');
const songTitle = document.querySelector('.song-title');
const artistName = document.querySelector('.artist-name');
const songItems = document.querySelectorAll('.song-item');

// List of songs
const songs = [
  {
    title: "Phonk salva brazil!",
    artist: "Brzqq",
    src: "phonk.mp3",
    img: "1ong.png"
  },
  {
    title: "Malare",
    artist: "Rajesh Murugesan",
    src: "malare.mp3",
    img: "2ong.png"
  },
  {
    title: "Banjaara",
    artist: "Mohammed Irfan",
    src: "banjara.mp3",
    img: "3ong.png"
  },
  {
    title: "São Paulo(feat.Anitta)",
    artist: "Weekend, Anitta",
    src: "paulo.mp3",
    img: "4ong.png"
  },
  {
    title: "The Abyss(feat.Lana Del Rey)",
    artist: "Weekend, Lana Del Rey",
    src: "the.mp3",
    img: "5ong.png"
  }
];

let currentSongIndex = 0;
let isPlaying = false;

// Load song info into player
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  albumArt.src = song.img;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  progressBar.value = 0;
}

// Play/Pause 
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.src = 'play.png';
  } 
  else {
    audio.play();
    playBtn.src = 'pause.png';
  }
  isPlaying = !isPlaying;
}

// Play selected song from library
songItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.src = 'pause.png';
    isPlaying = true;
  });
});

// Next/Previous 
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.src = 'pause.png';
  isPlaying = true;
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  playBtn.src = 'pause.png';
  isPlaying = true;
});

// Play/Pause button
playBtn.addEventListener('click', togglePlay);

// Progress bar update
audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  progressBar.max = audio.duration;
});

// Scrubbing through the song
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

// Initial load
loadSong(currentSongIndex);
