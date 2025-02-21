const playIcons = document.querySelectorAll('.bi-play-circle-fill');
const audioPlayer = new Audio();

const audioData = [
    { id: 'elf', src: 'audios/elf.mp3' },
    { id: 'dragon', src: 'audios/dragon.mp3' },
    { id: 'wizard', src: 'audios/wizard.mp3' },
    { id: 'forest', src: 'audios/forest.mp3' },
];

let previouslyClickedIcon = null;

playIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const audioItem = audioData.find(item => item.id === icon.id);

        if (audioItem) {
            if (previouslyClickedIcon === icon && !audioPlayer.paused) {
                playIcons.forEach(otherIcon => {
                    otherIcon.classList.remove('bi-pause-circle-fill');
                    otherIcon.classList.add('bi-play-circle-fill');
                });

                audioPlayer.pause();
            } else {
                if (previouslyClickedIcon && previouslyClickedIcon !== icon) {
                    previouslyClickedIcon.classList.remove('bi-pause-circle-fill');
                    previouslyClickedIcon.classList.add('bi-play-circle-fill');
                    audioPlayer.pause();
                }

                audioPlayer.src = audioItem.src;
                audioPlayer.play();
            }

            if (!audioPlayer.paused) {
                icon.classList.add('bi-pause-circle-fill');
                icon.classList.remove('bi-play-circle-fill');
            } else {
                icon.classList.remove('bi-pause-circle-fill');
                icon.classList.add('bi-play-circle-fill');
            }

            previouslyClickedIcon = icon;
        }
    });

    audioPlayer.addEventListener('ended', () => {
        icon.classList.remove('bi-pause-circle-fill');
        icon.classList.add('bi-play-circle-fill');
        previouslyClickedIcon = null;
    });
});

audioPlayer.addEventListener('ended', () => {
    if (previouslyClickedIcon) {
        previouslyClickedIcon.classList.remove('bi-pause-circle-fill');
        previouslyClickedIcon.classList.add('bi-play-circle-fill');
        previouslyClickedIcon = null; 
    }
});
