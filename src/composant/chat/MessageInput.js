export function createMessageInput() {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'bg-[#285b76] px-4 py-2 flex items-center space-x-4';
    
    inputContainer.innerHTML = `
        <button class="py-1 px-2 text-[#8696a0] hover:bg-[#374045] rounded-full">
           <i class="fa-regular text-2xl fa-face-smile"></i>
        </button>
        <button class="py-2 px-1 text-[#8696a0] hover:bg-[#374045] rounded-full">
        <i class="fa-solid fa-paperclip text-2xl"></i>
        </button>
        <input type="text" 
               placeholder="Tapez un message" 
               class="flex-1 bg-[#2d6a97] text-[#d1d7db] placeholder-[#8696a0] px-4 py-2 rounded-lg focus:outline-none">
        <button class="py-1 px-3 text-[#8696a0] hover:bg-[#374045] rounded-full">
           <i class="fa-solid fa-microphone text-2xl"></i>
        </button>
    `;
    
    return inputContainer;
}