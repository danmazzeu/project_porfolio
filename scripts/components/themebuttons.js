const themeButtons = document.querySelectorAll('.theme-button');

function setThemeFromStorage() {
    const storedTheme = localStorage.getItem('themeColor');
    if (storedTheme) {
        document.documentElement.style.setProperty('--theme', storedTheme);
    } else {
        const root = document.documentElement;
        const theme = getComputedStyle(root).getPropertyValue('--theme');
        document.documentElement.style.setProperty('--theme', theme);
    }
}

themeButtons.forEach(button => {
    const color = button.dataset.color;
    button.style.color = color;
    button.addEventListener('click', () => {
        themeButtons.forEach(btn => btn.style.border = "");
        document.documentElement.style.setProperty('--theme', color);
        localStorage.setItem('themeColor', color);
    });
});

setThemeFromStorage();