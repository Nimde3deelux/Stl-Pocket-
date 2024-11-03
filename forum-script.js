function sendMessage() {
    const input = document.getElementById("message-input");
    const messageContainer = document.getElementById("messages");
    const messageText = input.value.trim();

    if (messageText) {
        const message = document.createElement('div');
        message.textContent = messageText;
        messageContainer.appendChild(message);
        input.value = ''; // Clear input field
        messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll
    }
}
