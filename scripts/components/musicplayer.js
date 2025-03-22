const musicFiles = ['musics/Sleep Token - Emergence.mp3', 'musics/song2.mp3', 'musics/song3.mp3'];
const musicNames = musicFiles.map(file => file.replace('musics/', '').replace('.mp3', ''));
let currentIndex = 0;
let isPlaying = false;

const audio = new Audio(musicFiles[currentIndex]);
const playPauseBtn = document.querySelector('.bi-play-circle-fill');
const prevBtn = document.querySelector('.bi-arrow-left-circle-fill');
const nextBtn = document.querySelector('.bi-arrow-right-circle-fill');
const restartBtn = document.querySelector('.bi-arrow-counterclockwise');
const musicTitle = document.querySelector('.card-music h2');

musicTitle.innerHTML = '<i class="bi bi-music-note"></i>' + musicNames[currentIndex];

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    } else {
        audio.play();
        playPauseBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + musicFiles.length) % musicFiles.length;
    changeTrack();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % musicFiles.length;
    changeTrack();
});

restartBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    playPauseBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    isPlaying = true;
});

function changeTrack() {
    audio.src = musicFiles[currentIndex];
    musicTitle.textContent = musicNames[currentIndex];
    audio.play();
    playPauseBtn.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    isPlaying = true;
}
