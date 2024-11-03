// Fonction pour gérer le défilement en douceur
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Affiche un message de confirmation
        alert(`Vous allez être redirigé vers ${this.textContent}`);
        
        // Redirige après quelques millisecondes
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 500); // 500 ms pour laisser le temps de lire le message
    });
});

// Fonction pour ajouter un effet de survol aux liens
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = '#004d40'; // Change la couleur au survol
    });
    link.addEventListener('mouseout', () => {
        link.style.color = '#00796b'; // Restaure la couleur initiale
    });
});

// Exemple d'ajout d'un menu déroulant si besoin
const siteMap = document.querySelector('.site-map');
const dropdown = document.createElement('div');
dropdown.classList.add('dropdown');
dropdown.innerHTML = `
    <h3>Menu Déroulant</h3>
    <ul>
        <li><a href="additional_page1.html">Page Supplémentaire 1</a></li>
        <li><a href="additional_page2.html">Page Supplémentaire 2</a></li>
    </ul>
`;
siteMap.appendChild(dropdown);

// Ajouter des styles de dropdown via JavaScript
const style = document.createElement('style');
style.innerHTML = `
    .dropdown {
        margin-top: 20px;
        background-color: #b2dfdb;
        padding: 15px;
        border-radius: 5px;
    }
    .dropdown h3 {
        color: #00796b;
        margin: 0;
    }
    .dropdown ul {
        list-style: none;
        padding: 0;
    }
    .dropdown ul li {
        margin: 5px 0;
    }
    .dropdown ul li a {
        color: #00796b;
    }
`;
document.head.appendChild(style);
