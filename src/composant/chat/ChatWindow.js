export function createChatWindow() {
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window flex-1 bg-[#0b141a] overflow-y-auto';
    chatWindow.style.backgroundImage = "url('https://i.pinimg.com/736x/d2/a7/76/d2a77609f5d97b9081b117c8f699bd37.jpg')";
    
    chatWindow.innerHTML = `
        <div class="flex flex-col p-4 space-y-4">
        </div>
    `;
    
    return chatWindow;
}
