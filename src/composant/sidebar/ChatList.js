export function createChatList() {
    const chatList = document.createElement('div');
    chatList.className = 'flex-1 overflow-y-scroll';

     chatList.style.cssText = `
        scrollbar-width: thin;
        scrollbar-color: #374045 #111b21;
    `;
    
     chatList.innerHTML = `
        <style>
            /* Styles pour WebKit (Chrome, Safari, etc.) */
            ::-webkit-scrollbar {
                width: 6px;
            }
            
            ::-webkit-scrollbar-track {
                background: #111b21;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #374045;
                border-radius: 3px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #202c33;
            }
        </style>
        ${generateChatItems()}
    `;
    
    return chatList;
}

function generateChatItems() {
    return Array(20).fill(0).map(() => `
        <div class="flex items-center px-3 py-3 hover:bg-[#202c33] cursor-pointer">
            <img src="https://via.placeholder.com/40" class="w-12 h-12 rounded-full" alt="Contact">
            <div class="ml-3 flex-1 border-b border-[#2a373f] pb-3">
                <div class="flex justify-between items-center">
                    <span class="text-[#e9edef] font-medium">Contact Name</span>
                    <span class="text-[#8696a0] text-sm">10:30</span>
                </div>
                <div class="flex items-center">
                    <span class="text-[#8696a0] text-sm truncate">Last message...</span>
                </div>
            </div>
        </div>
    `).join('');
}


