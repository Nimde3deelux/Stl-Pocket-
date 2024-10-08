// Firebase configuration
const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "stlpocket-d8fbc.firebaseapp.com",
    projectId: "stlpocket-d8fbc",
    storageBucket: "stlpocket-d8fbc.appspot.com",
    messagingSenderId: "301138774193",
    appId: "1:301138774193:web:7b618dc6dc1aa8e587d103"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert(`Connexion réussie pour ${email}`);
    } catch (error) {
        alert(`Erreur de connexion : ${error.message}`);
    }
}

// Signup function
async function signup() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert(`Inscription réussie pour ${email}`);
    } catch (error) {
        alert(`Erreur d'inscription : ${error.message}`);
    }
}

// Tetris game functions
let gameInterval;
let currentBlock;

function startTetris() {
    // Initial game setup
    clearInterval(gameInterval);
    currentBlock = createBlock();
    gameInterval = setInterval(updateGame, 1000);
}

function createBlock() {
    return {
        x: 3, y: 0,
        shape: [[1, 1, 1], [0, 1, 0]]
    };
}

function updateGame() {
    currentBlock.y += 1;
    drawBlock();
}

function drawBlock() {
    const tetrisGame = document.getElementById('tetrisGame');
    // Drawing logic
}

function toggleMusic() {
    const music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const message = chatInput.value;
    if (message.trim()) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        document.getElementById("messages").appendChild(messageDiv);
        chatInput.value = "";
    }
}

function insertEmoji(emoji) {
    document.getElementById("chatInput").value += emoji;
}
