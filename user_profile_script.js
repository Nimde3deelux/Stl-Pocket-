document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const profileImg = document.getElementById('profileImg');
    const saveButton = document.getElementById('saveButton');
    const userDescription = document.getElementById('userDescription');
    const menuButton = document.getElementById('menuButton');

    // Gestion de l'upload de la photo de profil
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            const fileNumber = parseInt(file.name.replace('photodeuser', '').replace('.png', ''));
            if (fileNumber >= 1 && fileNumber <= 10) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert("Veuillez télécharger une image nommée photodeuser1.png à photodeuser10.png.");
            }
        }
    });

    // Sauvegarde de la description
    saveButton.addEventListener('click', function() {
        const description = userDescription.value;
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
