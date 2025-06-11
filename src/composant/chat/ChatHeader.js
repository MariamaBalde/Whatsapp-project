export function createChatHeader() {
    const header = document.createElement('div');
    header.className = 'h-[60px] bg-[#202c33] flex items-center px-4 border-l border-[#2a373f]';
    
    header.innerHTML = `
        <div class="flex items-center flex-1">
            <img src="https://via.placeholder.com/40" class="w-10 h-10 rounded-full" alt="Contact">
            <div class="ml-4 text-[#e9edef]">
                <div class="font-medium">Contact Name</div>
                <div class="text-sm text-[#8696a0]">en ligne</div>
            </div>
        </div>
        <div class="flex items-center space-x-3 text-[#aebac1]">
            <button class="p-2 hover:bg-[#374045] rounded-full">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path>
                </svg>
            </button>
            <button class="p-2 hover:bg-[#374045] rounded-full">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                </svg>
            </button>
        </div>
    `;
    
    return header;
}