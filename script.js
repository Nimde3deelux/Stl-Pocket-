// Son lorsque la souris se déplace
let mouseMoveSound = new Audio('mouse-move-sound.mp3');
let isMouseMoving = false;

document.addEventListener('mousemove', () => {
    if (!isMouseMoving) {
        mouseMoveSound.play();
        isMouseMoving = true;
    }
});

// Arrête le son lorsque la souris s'arrête
let mouseStopTimer;
document.addEventListener('mousemove', () => {
    clearTimeout(mouseStopTimer);
    mouseStopTimer = setTimeout(() => {
        isMouseMoving = false;
        mouseMoveSound.pause();
        mouseMoveSound.currentTime = 0; // Reset audio
    }, 1000); // 1 seconde après le dernier mouvement
});
