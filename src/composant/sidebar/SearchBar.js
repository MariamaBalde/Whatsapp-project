
export function createSearchBar() {
    const searchBar = document.createElement('div');
    searchBar.className = 'px-3 py-2';
    
    searchBar.innerHTML = `
        <div class="bg-[#202c33] flex items-center rounded-lg px-4 py-1">
           <i class="fa-solid fa-magnifying-glass" style="color: #d8dadf;"></i>
            <input type="text" 
                   placeholder="Rechercher ou démarrer une nouvelle discussion" 
                   class="bg-transparent border-none w-full p-2 outline-none text-[#aebac1] placeholder-[#8696a0] text-sm">
        </div>
    `;
    
    return searchBar;
}