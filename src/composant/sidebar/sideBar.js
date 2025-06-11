// import { createUserProfile } from "./UserProfile.js";
// import { createSearchBar } from "./SearchBar.js";
// import { createTabsSection } from "./TabsSection.js";
// import { createChatList } from "./ChatList.js";

// export function createSideBar() {
//   const sidebar = document.createElement("div");
//   sidebar.className =
//     "w-[30%] border-r border-[#2a373f] bg-[#111b21] flex flex-col";

//   sidebar.appendChild(createUserProfile());
//   sidebar.appendChild(createSearchBar());
//   sidebar.appendChild(createTabsSection());

//   sidebar.appendChild(createChatList());

//   return sidebar;
// }

import { createNavigationButtons } from "./NavigationButtons.js";
import { createUserProfile } from "./UserProfile.js";
import { createSearchBar } from "./SearchBar.js";
import { createChatList } from "./ChatList.js";

export function createSideBar() {
    const sidebarContainer = document.createElement("div");
    sidebarContainer.className = "flex";

    sidebarContainer.appendChild(createNavigationButtons());

    const mainSection = document.createElement("div");
        mainSection.className = "w-[420px] flex flex-col bg-[#111b21] border-r border-[#2a373f]";

    
    mainSection.appendChild(createUserProfile());
    mainSection.appendChild(createSearchBar());
    mainSection.appendChild(createChatList());
    
    sidebarContainer.appendChild(mainSection);

    return sidebarContainer;
}
