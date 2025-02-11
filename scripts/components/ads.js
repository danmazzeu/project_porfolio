function sendmail(name, callback) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');
    const userAgent = navigator.userAgent;

    fetch('https://projectsendmail-production.up.railway.app/sendmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: "danmazzeu9@gmail.com",
            to: "danmazzeu9@gmail.com",
            subject: "Novo click anúncio - " + name,
            message: `Horário: ${formattedTime} Data: ${formattedDate}\nUser-Agent: ${userAgent}`,
            smtp: "smtp.gmail.com",
            port: 465,
            tls: true,
            username: "danmazzeu9@gmail.com",
            password: "fpzj cadg ztit ejmz"
        })
    })
    .then(async response => {
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta da API:', data);
        if (callback) {
            callback();
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

const URLS = {
    "1": ["Secando Em 30 Dias - Kiwify", "https://pay.kiwify.com.br/xPKpEd8?afid=SBDC9eH9"],
};

function getParametroUrl(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const id = getParametroUrl("id");

document.addEventListener('DOMContentLoaded', () => {
    const description = document.querySelector('main p');
    const link = document.querySelector('a');

    if (isMobile) {
        description.textContent = 'Clique no botão abaixo para continuar para o aplicativo.';
        link.addEventListener('click', function (event) {
            link.textContent = 'Redirecionando...';
            event.preventDefault();
            sendmail(URLS[id][0], () => {
                window.location.href = URLS[id][1];
            });
        });
        link.style.display = 'flex';
    } else {
        description.textContent = 'Aguarde enquanto redirecionamos você para a publicidade...';
        link.style.display = 'none';
        sendmail(URLS[id][0], () => {
            window.location.href = URLS[id][1];
        });
    }
});