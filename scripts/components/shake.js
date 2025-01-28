$(document).ready(function() {
    const elementPhrase = $('.presentation-fade span');
    const shakeElements = document.querySelectorAll('section');
    const logo = document.getElementById('logo');
    let audioContext = '';
    let audioSource;

    logo.addEventListener('click', () => {
        audioContext = new window.AudioContext();
        elementPhrase.text('');

        if (audioSource) {
            audioSource.stop(); 
        }

        fetch('/audios/logo.mp3')
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                audioSource = audioContext.createBufferSource();
                audioSource.buffer = audioBuffer;
                audioSource.connect(audioContext.destination);
                audioSource.start();
            });

        shakeElements.forEach(el => {
            el.classList.add('shake');
        });

        function typer(phrase) {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < phrase.length) {
                    elementPhrase.append(phrase[i++]);
                } else {
                    clearInterval(typeInterval); 
                }
            }, 50); 
        }

        typer('"Peça para a DAN.IA te dar alguma dica sobre o enigma"');

        setTimeout(() => {
            shakeElements.forEach(el => {
                el.classList.remove('shake');
            });
        }, 8000);

        setTimeout(() => {
            elementPhrase.text('');
            typer('"Consigo ouvir um som próximo"'); 
        }, 20000);
    });

    function redirectTo() {
        const urlParams = new URLSearchParams(window.location.search);
        const criatura = urlParams.get('criatura');
    
        if (criatura == 'dragao') {
            window.location.href = '/dragao.html?criatura=dragao';
        }
    }
    
    window.onload = redirectTo;
});