import { getCurrentUser } from "../../authentification/AuthService";

export function createProfileView() {
    const currentUser = getCurrentUser();
    const userInitials = currentUser ? currentUser.fullname
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join(' ') : '?';

    const profileView = document.createElement('div');
    profileView.className = 'w-[420px] flex flex-col bg-[#111b21] border-r border-[#2a373f]';
    
    profileView.innerHTML = `
        <div class="h-[60px] bg-[#202c33] flex items-center px-4">
            <h1 class="text-[#d8dadf] font-bold text-xl">Profil</h1>
        </div>
        <div class="flex-1 overflow-y-auto">
            <div class="p-6 flex flex-col items-center">
                <div class="w-48 h-48 bg-[#00a884] rounded-full flex items-center justify-center mb-4">
                    <span class="text-white text-5xl font-semibold">${userInitials}</span>
                </div>
                <div class="w-full">
                    <div class="bg-[#202c33] p-4 rounded-lg mb-4">
                        <p class="text-[#8696a0] text-sm mb-1">Nom</p>
                        <p class="text-[#e9edef]">${currentUser.fullname}</p>
                    </div>
                    <div class="bg-[#202c33] p-4 rounded-lg mb-4">
                        <p class="text-[#8696a0] text-sm mb-1">Téléphone</p>
                        <p class="text-[#e9edef]">${currentUser.phone}</p>
                    </div>
                    <div class="bg-[#202c33] p-4 rounded-lg">
                        <p class="text-[#8696a0] text-sm mb-1">À propos</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return profileView;
}