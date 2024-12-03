function navigateTo(page) {
    window.location.href = page;
}

function highlight(id) {
    const section = document.getElementById(id);
    section.style.transform = "scale(1.3) translateY(-10px)";
}

function reset(id) {
    const section = document.getElementById(id);
    section.style.transform = "scale(1) translateY(0)";
}
