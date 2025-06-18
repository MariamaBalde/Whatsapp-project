export function createChatWindow() {
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window flex-1 bg-[#0b141a] overflow-hidden relative';
    
    chatWindow.style.backgroundImage = "url('https://i.pinimg.com/736x/d2/a7/76/d2a77609f5d97b9081b117c8f699bd37.jpg')";
    
    
    chatWindow.innerHTML = `
        <div class="messages-container flex flex-col p-4 space-y-2 overflow-y-auto h-full">
            <div class="text-center text-gray-400 mt-8">
                <i class="fas fa-comments text-4xl mb-4 opacity-50"></i>
                <p>Sélectionnez un contact pour commencer à discuter</p>
            </div>
        </div>
    `;
    
    return chatWindow;
}
