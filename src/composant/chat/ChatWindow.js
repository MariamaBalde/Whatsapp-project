export function createChatWindow() {
    const chatWindow = document.createElement('div');
    chatWindow.className = 'flex-1 bg-[#0b141a] overflow-y-auto';
    chatWindow.style.backgroundImage = "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')";
    
    return chatWindow;
}