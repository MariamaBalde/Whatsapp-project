

import { getCurrentUser } from "../../authentification/AuthService";
import { createProfileView } from "../profile/ProfileView";
import { createSettingsView } from "../settings/SettingsView";
import { createChatList } from "./ChatList";
import { createSearchBar } from "./SearchBar";
import { createUserProfile } from "./UserProfile";

export function createNavigationButtons() {
    const nav = document.createElement('div');
    nav.className = 'flex flex-col bg-[#285b76] w-[70px] border-r border-[#2a373f] h-full justify-between py-4';

    const currentUser = getCurrentUser();
    const userInitials = currentUser ? currentUser.fullname
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') : '?';

    nav.innerHTML = `
    <div class="flex flex-col items-center space-y-4">
        <div class="relative">
            <div class="w-12 h-12 flex items-center justify-center text-[#00a884] hover:bg-[#202c33] rounded-lg cursor-pointer message-button">
               <i class="fa-solid fa-message" style="color: #d8dadf;"></i>
            </div>
            <span class="absolute top-0 right-1 bg-[#00a884] text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                
            </span>
        </div>

        <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer communities-button">
           <i class="fa-solid fa-users" style="color: #d8dadf;"></i>
        </div>

        <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer status-button">
           <i class="fa-solid fa-circle-notch" style="color: #d8dadf;"></i>
        </div>
    </div>

    <div class="flex flex-col items-center space-y-4">
        <div class="w-12 h-12 flex items-center justify-center text-[#aebac1] hover:bg-[#202c33] rounded-lg cursor-pointer settings-button">
           <i class="fa-solid fa-gear" style="color:#d8dadf;"></i>
        </div>

        <div class="w-12 h-12 cursor-pointer bg-[#d8dadf] rounded-full flex items-center justify-center profile-button">
            <span class="text-[111b21] text-xl font-semibold">${userInitials}</span>
        </div>
    </div>
`;

    const messageButton = nav.querySelector('.message-button');
    const communitiesButton = nav.querySelector('.communities-button');
    const settingsButton = nav.querySelector('.settings-button');
    const profileButton = nav.querySelector('.profile-button');

    function getMainSection() {
        return document.querySelector('#main-section');
    }

    messageButton.addEventListener('click', () => {
        const mainSection = getMainSection();
        if (mainSection) {
            mainSection.innerHTML = '';

            const userProfileHeader = createUserProfile();
            mainSection.appendChild(userProfileHeader);

            const searchBar = createSearchBar();
            mainSection.appendChild(searchBar);

            const discussionView = createChatList();
            mainSection.appendChild(discussionView);
        }
    });

    communitiesButton.addEventListener('click', async () => {
        try {
            const { createGroupsListView } = await import('../groupes/GroupsListView.js');
            const mainSection = getMainSection();
            if (mainSection) {
                mainSection.innerHTML = '';
                mainSection.appendChild(createGroupsListView());
            }
        } catch (error) {
            console.error('Erreur lors du chargement de GroupsListView:', error);
            alert('Erreur lors du chargement des groupes');
        }
    });

    settingsButton.addEventListener('click', () => {
        const mainSection = getMainSection();
        if (mainSection) {
            const settingsView = createSettingsView();
            mainSection.innerHTML = '';
            mainSection.appendChild(settingsView);
        }
    });

    profileButton.addEventListener('click', () => {
        const mainSection = getMainSection();
        if (mainSection) {
            const profileView = createProfileView();
            mainSection.innerHTML = '';
            mainSection.appendChild(profileView);
        }
    });

    return nav;
}
