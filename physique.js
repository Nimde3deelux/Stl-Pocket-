let currentChapter = 1;

function selectChapter(chapterNumber) {
    const chapters = document.querySelectorAll('.chapter');
    chapters.forEach(chapter => chapter.classList.remove('selected'));

    // Mettez en surbrillance le chapitre sélectionné
    const selectedChapter = document.querySelector(`.timeline .chapter:nth-child(${chapterNumber})`);
    selectedChapter.classList.add('selected');

    currentChapter = chapterNumber;
}
