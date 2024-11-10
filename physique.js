// physique.js

let currentChapter = 0;
const chapters = document.querySelectorAll('.timeline-item');

function showChapter(index) {
    chapters.forEach((chapter, i) => {
        chapter.style.display = (i === index) ? 'block' : 'none';
    });
}

function previousChapter() {
    if (currentChapter > 0) {
        currentChapter--;
        showChapter(currentChapter);
    }
}

function nextChapter() {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        showChapter(currentChapter);
    }
}

// Initialisation
showChapter(currentChapter);
