
export function createNavigationButtons() {
    const nav = document.createElement('div');
    nav.className = 'flex flex-col bg-[#111b21] w-[70px] border-r border-[#2a373f] h-full justify-between py-4';
    
    nav.innerHTML = `
        <!-- Groupe d'icônes du haut -->
        <div class="flex flex-col items-center space-y-4">
            <!-- Compteur de messages -->
            <div class="relative">
                <div class="w-12 h-12 flex items-center justify-center text-[#00a884] hover:bg-[#202c33] rounded-lg cursor-pointer">
                   <i class="fa-solid  fa-message" style="color: #d8dadf;"></i>
                </div>
                <span class="absolute top-0 right-1 bg-[#00a884] text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                    169
                </span>
            </div>

            <!-- Icône Communautés -->
            <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer">
               <i class="fa-solid  fa-users" style="color: #d8dadf;"></i>
            </div>

            <!-- Icône Statut -->
            <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer">
               <i class="fa-solid  fa-circle-notch" style="color: #d8dadf;"></i>
            </div>
        </div>

        <!-- Groupe d'icônes du bas -->
        <div class="flex flex-col items-center space-y-4">
            <!-- Icône Paramètres -->
            <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer">
               <i class="fa-solid  fa-gear" style="color:#d8dadf;"></i>
            </div>

            <!-- Avatar utilisateur -->
            <div class="w-12 h-12 cursor-pointer">
                <img src="https://via.placeholder.com/48" class="rounded-full" alt="Profile">
            </div>
        </div>
    `;
    
    return nav;
}
