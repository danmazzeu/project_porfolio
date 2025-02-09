const URLS = {
    "digio": "https://mgm.digio.com.br/bc50/y3ygie6o",
    "shopee": "https://s.shopee.com.br/8pWnMHi6Nc",
};

function getParametroUrl(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
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