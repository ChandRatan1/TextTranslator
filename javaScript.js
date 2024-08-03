async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const targetLang = document.getElementById('language-select').value;

    if (!userInput.trim()) return;

    // Add user message to chat box
    addMessageToChatBox('User', userInput);

    // Translate the message
    const translatedText = await translateText(userInput, targetLang);

    // Add translated message to chat box
    addMessageToChatBox('Bot', translatedText);

    // Clear input field
    document.getElementById('user-input').value = '';
}

function addMessageToChatBox(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function translateText(text, targetLang) {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();
    return data[0][0][0];
}
