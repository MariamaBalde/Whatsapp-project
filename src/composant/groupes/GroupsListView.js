// src/composant/groupes/GroupsListView.js
import { getGroups } from "../../services/GroupeService";
import { getContacts } from "../../services/ContactService";
import { createUserProfile } from "../sidebar/UserProfile";
import { createSearchBar } from "../sidebar/SearchBar";
import { createChatList } from "../sidebar/ChatList";
import { createGroupCreationView } from "./ GroupCreationView";

export function createGroupsListView() {
    const container = document.createElement('div');
    container.className = 'flex flex-col h-full bg-[#feffff]';

    async function renderGroupsList() {
        try {
            const [groups, contacts] = await Promise.all([getGroups(), getContacts()]);
            
            if (groups.length === 0) {
                return '<div class="text-center text-gray-500 mt-8">Aucun groupe créé</div>';
            }

            return groups.map(group => {
                // Récupérer les noms des membres
                const memberNames = group.members.map(memberId => {
                    const contact = contacts.find(c => c.id === memberId);
                    return contact ? contact.name : 'Contact inconnu';
                }).join(', ');

                // Créer les initiales du groupe
                const groupInitials = group.name
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase())
                    .slice(0, 2)
                    .join('');

                return `
                    <div class="group-item flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd]" 
                         data-group='${JSON.stringify({
                             id: group.id,
                             name: group.name,
                             members: group.members,
                             createdAt: group.createdAt
                         })}'>
                        
                        <div class="w-12 h-12 mr-4 bg-[#00a884] rounded-full flex items-center justify-center">
                            <span class="text-white text-xl font-semibold">${groupInitials}</span>
                        </div>
                        <div class="flex-1">
                            <h3 class="text-[#292a2b] font-semibold">${group.name}</h3>
                            <p class="text-[#272829] text-sm truncate">${memberNames}</p>
                            <p class="text-[#8696a0] text-xs">${group.members.length} membres</p>
                        </div>
                    </div>
                `;
            }).join('');
        } catch (error) {
            console.error('Erreur lors du chargement des groupes:', error);
            return '<div class="text-center text-red-500 mt-8">Erreur lors du chargement des groupes</div>';
        }
    }

    const loadGroups = async () => {
        const groupsList = container.querySelector('.groups-list');
        if (groupsList) {
            groupsList.innerHTML = await renderGroupsList();
        }
    };

    container.innerHTML = `
        <div class="h-[60px] bg-[#feffff] flex items-center px-4 border-b border-[#e9edef]">
            <div class="flex items-center">
                <button class="mr-4 back-button">
                    <i class="fas fa-arrow-left text-[#ffffff]"></i>
                </button>
                <h1 class="text-[#292a2b] font-bold text-xl">Groupes</h1>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd] new-group">
                <div class="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center mr-4">
                    <i class="fa-solid fa-user-plus text-xl text-white"></i>
                </div>
                <div>
                    <h3 class="text-[#292a2b]">Nouveau groupe</h3>
                </div>
            </div>

            <div class="mt-6">
                <h2 class="text-[#292a2b] font-bold text-lg px-3 mb-2">Mes groupes</h2>
                <div class="groups-list">
                    <!-- Les groupes seront chargés ici -->
                </div>
            </div>
        </div>
    `;

    const backButton = container.querySelector('.back-button');
    const newGroupButton = container.querySelector('.new-group');

    backButton.addEventListener('click', () => {
        const mainSection = document.querySelector('#main-section');
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

    newGroupButton.addEventListener('click', async () => {
        try {
            const mainSection = document.querySelector('#main-section');
            if (mainSection) {
                mainSection.innerHTML = '';
                mainSection.appendChild(createGroupCreationView());
            }
        } catch (error) {
            console.error('Erreur lors du chargement de GroupCreationView:', error);
        }
    });

    container.addEventListener('click', (e) => {
        const groupItem = e.target.closest('.group-item');
        if (groupItem) {
            const groupData = JSON.parse(groupItem.dataset.group);
            
            const event = new CustomEvent('group-selected', {
                detail: groupData
            });
            document.dispatchEvent(event);
            
            const mainSection = document.querySelector('#main-section');
            if (mainSection) {
                mainSection.innerHTML = '';
                const userProfileHeader = createUserProfile();
                mainSection.appendChild(userProfileHeader);
                const searchBar = createSearchBar();
                mainSection.appendChild(searchBar);
                const discussionView = createChatList();
                mainSection.appendChild(discussionView);
            }
        }
    });

    loadGroups();

    return container;
}