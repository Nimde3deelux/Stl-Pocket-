<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STL Pocket</title>
    <style>
        /* ---- Styles de base ---- */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #fff;
            text-align: center;
            overflow: hidden;
            position: relative;
        }

        /* ---- Animation de fond ---- */
        @keyframes backgroundAnimation {
            0% { background-color: #111; }
            25% { background-color: #222; }
            50% { background-color: #333; }
            75% { background-color: #444; }
            100% { background-color: #555; }
        }

        body {
            animation: backgroundAnimation 10s infinite alternate;
        }

        nav {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 20px 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }

        nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        nav ul li {
            display: inline-block;
            margin: 0 20px;
        }

        nav ul li a {
            text-decoration: none;
            color: #fff;
            font-size: 1.2em;
            transition: text-shadow 0.3s;
        }

        nav ul li a:hover {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
        }

        h1, h2 {
            text-shadow: 0 0 5px #f0f, 0 0 10px #f0f;
        }

        section {
            padding: 100px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.5);
        }

        #login, #signup {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px;
        }

        input {
            padding: 10px;
            margin: 10px;
            width: 300px;
            border: none;
            border-radius: 5px;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #00ffff;
            color: #000;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #00cccc;
        }

        #chat {
            display: none;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin: 20px;
        }

        .cursor-effect {
            position: absolute;
            width: 15px;
            height: 15px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: transform 0.2s ease, background 0.2s ease;
        }

        /* Musique */
        audio {
            display: none;
        }
    </style>
</head>

<body>

    <!-- Musique de fond -->
    <audio id="backgroundMusic" src="https://example.com/path/to/your/music.mp3" loop></audio>

    <!-- Menu de navigation -->
    <nav>
        <ul>
            <li><a href="#login">Connexion</a></li>
            <li><a href="#signup">Inscription</a></li>
            <li><a href="#chat">Chat</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#music" onclick="toggleMusic()">Musique</a></li>
        </ul>
    </nav>

    <!-- Section de connexion -->
    <section id="login">
        <h1>Connexion</h1>
        <input type="text" id="loginEmail" placeholder="Email ou Téléphone" />
        <input type="password" id="loginPassword" placeholder="Mot de passe" />
        <button onclick="login()">Se connecter</button>
    </section>

    <!-- Section d'inscription -->
    <section id="signup">
        <h1>Inscription</h1>
        <input type="email" id="signupEmail" placeholder="Email" />
        <input type="text" id="signupPhone" placeholder="Téléphone" />
        <input type="password" id="signupPassword" placeholder="Mot de passe" />
        <button onclick="signup()">S'inscrire</button>
    </section>

    <!-- Section de chat -->
    <section id="chat">
        <h1>Chat</h1>
        <div id="messages" style="height: 200px; overflow-y: scroll; border: 1px solid #fff; padding: 10px; margin: 10px; background-color: rgba(255, 255, 255, 0.1);"></div>
        <input type="text" id="chatInput" placeholder="Votre message..." />
        <button onclick="sendMessage()">Envoyer</button>
    </section>

    <!-- Section des services -->
    <section id="services">
        <h1>Nos Services</h1>
        <p>Découvrez nos services d'assistance pour étudiants.</p>
    </section>

    <!-- Section musique -->
    <section id="music">
        <h1>Musique de Fond</h1>
        <button onclick="toggleMusic()">Jouer / Pause Musique</button>
    </section>

    <script>
        function login() {
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            alert(`Connexion avec ${email}`);
        }

        function signup() {
            const email = document.getElementById("signupEmail").value;
            const phone = document.getElementById("signupPhone").value;
            const password = document.getElementById("signupPassword").value;
            alert(`Inscription avec ${email} et ${phone}`);
        }

        function sendMessage() {
            const input = document.getElementById("chatInput");
            const message = input.value;
            const messagesDiv = document.getElementById("messages");
            messagesDiv.innerHTML += `<div>${message}</div>`;
            input.value = '';
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // faire défiler vers le bas
        }

        function toggleMusic() {
            const music = document.getElementById("backgroundMusic");
            if (music.paused) {
                music.play();
            } else {
                music.pause();
            }
        }

        // Animation du curseur
        const cursorEffect = document.createElement('div');
        cursorEffect.classList.add('cursor-effect');
        document.body.appendChild(cursorEffect);

        document.addEventListener('mousemove', (e) => {
            cursorEffect.style.left = e.pageX + 'px';
            cursorEffect.style.top = e.pageY + 'px';
        });
    </script>
</body>

</html>
