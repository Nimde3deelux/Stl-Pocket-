function showInventory(subject, type) {
    const inventoryId = `inventory-${subject}`;
    const inventoryDiv = document.getElementById(inventoryId);
    const fileType = type === 'exercices' ? 'exochap' : type === 'corriges' ? 'corrchap' : 'contchap';
    let content = `<h3>${type.charAt(0).toUpperCase() + type.slice(1)} disponibles :</h3><ul>`;
    
    // Générer 10 fichiers PDF pour chaque type
    for (let i = 1; i <= 10; i++) {
        const fileName = `${fileType}${i}${subject.replace(/-/g, '')}.pdf`;
        content += `<li><a href="pdfs/${fileName}" target="_blank">${fileName}</a></li>`;
    }
    content += '</ul>';

    inventoryDiv.innerHTML = content;
    inventoryDiv.style.display = 'block';
}
