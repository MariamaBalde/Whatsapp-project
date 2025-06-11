export function createTabsSection() {
    const tabs = document.createElement('div');
    tabs.className = 'px-3 py-2';
    
    tabs.innerHTML = `
        <div class="flex text-[#8696a0]">
            <button class="flex-1 text-[#00a884] border-b-2 border-[#00a884] pb-3">Toutes</button>
            <button class="flex-1 hover:text-[#d1d7db]">Non lues</button>
            <button class="flex-1 hover:text-[#d1d7db]">Favoris</button>
            <button class="flex-1 hover:text-[#d1d7db]">Groupes</button>
        </div>
    `;
    
    return tabs;
}