import { createNavigationButtons } from "./NavigationButtons.js";
import { createUserProfile } from "./UserProfile.js";
import { createSearchBar } from "./SearchBar.js";
import { createChatList } from "./ChatList.js"

export function createSideBar() {
    const sidebarContainer = document.createElement("div");
    sidebarContainer.className = "flex";

    sidebarContainer.appendChild(createNavigationButtons());

    const mainSection = document.createElement("div");
        mainSection.id = "main-section";

        mainSection.className = "w-[420px] flex flex-col bg-[#feffff] border-r border-[#2a373f]";

    
    mainSection.appendChild(createUserProfile());
    mainSection.appendChild(createSearchBar());
    mainSection.appendChild(createChatList());
    
    sidebarContainer.appendChild(mainSection);

    return sidebarContainer;
}
