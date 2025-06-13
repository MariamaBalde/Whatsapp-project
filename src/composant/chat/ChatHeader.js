export function createChatHeader() {
    const header = document.createElement('div');
        header.className = 'h-[60px] bg-[#285b76] flex items-center px-4 border-l border-[#2a373f]';
   
    
    header.innerHTML = `
        <div class="flex items-center flex-1">
            <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full" alt="Contact">
            <div class="ml-4 text-[#e9edef]">
                <div class="font-medium">Contact Name</div>
                <div class="text-sm text-[#8696a0]">en ligne</div>
            </div>
        </div>
        <div class="flex items-center space-x-3 text-[#aebac1]">
            <button class="py-2 px-3 hover:bg-[#374045] rounded-full">
               <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button class="p-2 hover:bg-[#374045] rounded-full">
               <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
        </div>
    `;
    
    return header;
}

