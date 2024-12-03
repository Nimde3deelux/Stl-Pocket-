function navigateTo(page) {
    window.location.href = page;
}

function highlight(id) {
    const section = document.getElementById(id);
    section.style.zIndex = 10; // Apporte la carte au premier plan
}

function reset(id) {
    const section = document.getElementById(id);
    section.style.zIndex = 1; // Remet la carte à sa position originale
}
