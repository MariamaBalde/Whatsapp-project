import { createUserProfile } from "../sidebar/UserProfile";
import { createSearchBar } from "../sidebar/SearchBar";
import { createChatList } from "../sidebar/ChatList";
import { createAddContactForm } from "./AddContactForm";
import {saveContact, getContacts } from "../../services/ContactService";

export function createNewContactView() {
    const container = document.createElement('div');
    container.className = 'flex flex-col h-full bg-[#feffff]';

  async  function renderContactList() {
        const contacts = await getContacts();
        return contacts.map(contact => {
             const initials = contact.name
            .split(' ')
            .map(name => name.charAt(0).toUpperCase())
            .join('');
          return  `
           <div class="contact-item flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd]" 
                 data-contact='${JSON.stringify({
                     id: contact.id,
                     name: contact.name,
                     phone: contact.phone,
                     country: contact.country
                 })}'>
               
                <div class="w-12 h-12 mr-4 bg-[#202c33] rounded-full flex items-center justify-center contact-initials">
    <span class="text-[#8696a0] text-xl font-semibold">${initials}</span>
</div>
                <div>
                    <h3 class="text-[#292a2b]">${contact.name}</h3>
                    <p class="text-[#272829] text-sm">${contact.phone}</p>
                </div>
            </div>
        `;
    }).join('');
    }

      const loadContacts = async () => {
        const contactsList = container.querySelector('.contacts-list');
        if (contactsList) {
            contactsList.innerHTML = await renderContactList();
        }
    };

    container.innerHTML = `
        <div class="h-[60px] bg-[#feffff] flex items-center px-4">
            <div class="flex items-center">
                <button class="mr-4 back-button">
                    <i class="fas fa-arrow-left text-[#00a884]"></i>
                </button>
                <h1 class="text-[#292a2b] font-bold text-xl">Nouveau contact</h1>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd] new-group">
                <div class="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center mr-4">
                    <i class="fa-solid fa-users text-xl text-white"></i>
                </div>
                <div>
                    <h3 class="text-[#292a2b]">Nouveau groupe</h3>
                </div>
            </div>

            <div class="flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd] new-contact">
                <div class="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center mr-4">
                    <i class="fa-solid fa-user-plus text-xl text-white"></i>
                </div>
                <div>
                    <h3 class="text-[#292a2b]">Nouveau contact</h3>
                </div>
            </div>

            <div class="mt-6">
                <h1 class="text-[#292a2b] font-bold text-lg px-3">Contacts sur WhatsApp</h1>
                <div class="contacts-list mt-2">
                    ${renderContactList()}
                </div>
            </div>
        </div>
    `;

    const backButton = container.querySelector('.back-button');
    const newContactButton = container.querySelector('.new-contact');
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

    newContactButton.addEventListener('click', () => {
        const mainSection = document.querySelector('#main-section');
        if (mainSection) {
            mainSection.innerHTML = '';
            const addContactForm = createAddContactForm();
            mainSection.appendChild(addContactForm);

            const form = addContactForm.querySelector('#contact-form');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const contactData = {
                    name: `${form.querySelector('#firstname').value} ${form.querySelector('#lastname').value}`.trim(),
                    country: form.querySelector('#country').value,
                    phone: form.querySelector('#phone').value
                };

                try {
                    await saveContact(contactData);
                    mainSection.innerHTML = '';
                    mainSection.appendChild(createNewContactView());
                } catch (error) {
                    console.error('Error saving contact:', error);
                }
            });
        }
    });


newGroupButton.addEventListener('click', async () => {
    try {
        // Import dynamique ES6 correct (notez l'extension .js et le chemin sans espace)
        const { createGroupCreationView } = await import('../groupes/ GroupCreationView');
        
        const mainSection = document.querySelector('#main-section');
        if (mainSection) {
            mainSection.innerHTML = '';
            mainSection.appendChild(createGroupCreationView());
        }
    } catch (error) {
        console.error('Erreur lors du chargement de GroupCreationView:', error);
    }
});

     loadContacts();



container.addEventListener('click', (e) => {
    const contactItem = e.target.closest('.contact-item');
    if (contactItem) {
        const contactData = JSON.parse(contactItem.dataset.contact);
       
        const event = new CustomEvent('chat-selected', {
            detail: contactData
        });
        document.dispatchEvent(event);
        
        // Fermer la vue des contacts (optionnel)
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
    return container;
}


