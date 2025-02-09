function sendmail(name) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');

    fetch('https://projectsendmail-production.up.railway.app/sendmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: "danmazzeu9@gmail.com",
            to: "danmazzeu9@gmail.com",
            subject: "Novo click anúncio " + name,
            message: `Horário: ${formattedTime} Data: ${formattedDate}`,
            smtp: "smtp.gmail.com",
            port: 465,
            tls: true,
            username: "danmazzeu9@gmail.com",
            password: "fpzj cadg ztit ejmz"
        })
    }).then(response => response.json()).then(data => {
        console.log('Resposta da API:', data);
    }).catch(error => {
        console.error('Erro na requisição:', error);
    });
}
    
const URLS = {
    "digio": "https://mgm.digio.com.br/bc50/y3ygie6o",
    "shopee": "https://s.shopee.com.br/8pWnMHi6Nc",
};

function getParametroUrl(name) {
    const urlParams = new URLSearchParams(window.location.search);
    sendmail(name);
    return urlParams.get(name);
}

const adsValor = getParametroUrl("ads");
const counterSpan = document.getElementById("counter");
let counter = 3;

if (adsValor && URLS.hasOwnProperty(adsValor)) {
    counterSpan.textContent = counter;

    const intervalo = setInterval(() => {
        counter--;
        counterSpan.textContent = counter;

        if (counter <= 0) {
            clearInterval(intervalo);
            window.location.assign(URLS[adsValor]);
        }
    }, 1000);
} else {
    console.error("URL não encontrada ou parâmetro ads ausente.");

}
