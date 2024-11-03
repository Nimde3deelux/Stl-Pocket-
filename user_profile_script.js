document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById('saveButton');
    const userDescription = document.getElementById('userDescription');
    const menuButton = document.getElementById('menuButton');
    const profileImg = document.getElementById('profileImg');

    // Sauvegarde de la description
    saveButton.addEventListener('click', function() {
        const description = userDescription.value;
        const selectedImage = document.querySelector('input[name="profileImage"]:checked');
        
        if (selectedImage) {
            profileImg.src = selectedImage.value; // Change l'image de profil affichée
        } else {
            alert("Veuillez sélectionner une image de profil.");
            return;
        }

        if (description) {
            // Simuler la sauvegarde (ici, tu pourrais faire une requête AJAX pour envoyer la description au serveur)
            alert("Description sauvegardée : " + description);
        } else {
            alert("Veuillez entrer une description avant de sauvegarder.");
        }
    });

    // Retour au menu principal
    menuButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Remplace 'index.html' par le nom de ta page d'accueil
    });
});
