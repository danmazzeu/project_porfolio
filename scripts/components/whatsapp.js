const linksWhatsapp = document.querySelectorAll('.whatsapp');

const wppNumber = '5516993630686';

linksWhatsapp.forEach(link => {
    link.href = 'https://wa.me/' + wppNumber;
});