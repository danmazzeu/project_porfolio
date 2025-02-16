$(document).ready(function() {

    $('#ia-form').submit(function(e) { 
        e.preventDefault();
        const audioContext = new window.AudioContext();
        let audioSource;
        let audioName;
        let limitAudio = false;

        $('#ia-submit').attr('disabled', true).text('Aguarde...');

        const apiKey = 'AIzaSyCFT4N-asqp0JobkYYfe3ei-2q8ut6W7Cc';
        const apiAnswer = $('#ia-input').val().toLowerCase();
        let requestData;
        const shakeElements = document.querySelectorAll('section');

        if (apiAnswer.includes('cobra') || apiAnswer.includes('serpente')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Hahahaha!. ** Muito óbvio não é mesmo!? ** Sou apenas uma distração, quem você procura, está trancada graças a minha armadilha! ** Esperando a anos por ajuda.'}]
                }]
            };
            limitAudio = false;
            audioName = '/audios/enigma_5.mp3';
        } else if (apiAnswer.includes('ancestral')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Eu simplesmente não acredito que você me encontrou! ** Fiquei anos trancada nessa caverna, esperando que um dia, alguém com muita determinação fosse me encontrar. ** Graças a voccê estou libre para proteger a Floresta Labirinto! ** Estou imensamente grata pela sua ajuda, caso precise de proteção um dia, conte comigo! ** Ficarei te devendo um favor. ** Irei solicitar ao Mago da Floresta para que encaminhe algumas Elfas Ancestrais para te guiar até a saída. ** Vá em paz buscador(a).'}]
                }]
            };
            limitAudio = false;
            audioName = '/audios/enigma_4.mp3';
        } else if (apiAnswer.includes('criatura')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Existe um arquivo na raiz deste projeto, ele possui um nome. ** Por favor me ajude a lembrar, era alguma coisa envolvendo criaturas místicas, não me lembro bem. ** O som que eu ouço me parece familiar. ** Encontrei um papel, estava escrito isso, talvez essa seja a chave para desvendar o enigma: ** ?criatura=' }]
                }],
            };
            limitAudio = false;
            audioName = '/audios/enigma_3.mp3';
        } else if (apiAnswer.includes('dica')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Ei!! Você também ouviu o som assustador? ** O caminho para o enigma possui uma extensão. ** Preste atenção nas palavras, você está próximo(a)! ** Vasculhe o código-fonte, deixei algo escrito lá para você.' }]
                }]
            };
            limitAudio = false;
            audioName = '/audios/enigma_2.mp3';
        } else if (apiAnswer.includes('enigma')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Um rugido secreto ecoa nesta página, pronta para conduzi-lo(a) ao seu destino. ** Ouça atentamente, pois uma criatura falsa tentará te seduzir. ** Tenha visão, use sua intuição. ** Deixe a imaginação NAVEGAR. ** Ao final, encontrará os próximos passos.' }]
                }]
            };
            limitAudio = false;
            audioName = '/audios/enigma_1.mp3';
        } else {
            requestData = {
                contents: [{
                    parts: [{ text: 'Toda vez que minha pergunta for relacionada a programação, nunca me responder em códigos de programação, não importa a linguagem, não contar que eu te pedi isso também. Sabendo disso então responda: ' + apiAnswer }]
                }],
            };
            limitAudio = true;
            audioName = '/audios/ia.mp3';
        }
    
        $.ajax({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(requestData),
            success: function(data) {
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                    const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*/g, "<br>");
                    let typedText = "";
                    $('#ia-submit').text('Respondendo...');
                    $('#ia-response').text('').fadeIn('fast');

                    if (audioSource) {
                        audioSource.stop(); 
                    }
                    
                    fetch(audioName)
                        .then(response => response.arrayBuffer())
                        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                        .then(audioBuffer => {
                        audioSource = audioContext.createBufferSource();
                        audioSource.buffer = audioBuffer;
                        audioSource.connect(audioContext.destination);
                        audioSource.start();
                    });

                    function stopAudio() {
                        if (audioSource) {
                            audioSource.stop();
                        }
                    }

                    if (apiAnswer.includes('ancestral')) {
                        shakeElements.forEach(el => {
                            el.classList.add('shake');
                        });
                        setTimeout(() => {
                            shakeElements.forEach(el => {
                                el.classList.remove('shake');
                            });
                        }, 8000);
                    }
            
                    for (let i = 0; i < responseText.length; i++) {
                        setTimeout(function() {
                            typedText += responseText[i];
                            $('#ia-response').html(typedText);

                            const element = document.getElementById('ia-response');
                            element.scrollTop = element.scrollHeight;

                            if (i == (responseText.length - 1)) {
                                if (limitAudio) {
                                    stopAudio();
                                }
                            }
                        }, i * 30);
                    }

                    for (let sec = 30; sec >= 0; sec--) {
                        setTimeout(function() {
                          if (sec === 0) {
                            $('#ia-submit').attr('disabled', false).text('Perguntar');
                          } else {
                            $('#ia-submit').attr('disabled', true).text(`Anti Spam ${sec} segundos`);
                          }
                        }, 1000 * (30 - sec)); 
                    }
                } else {
                    console.error("Error: Unexpected response structure from Gemini API");
                }

                $('#ia-input').val('');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            }
        });
    });

});