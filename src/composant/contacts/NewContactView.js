// import { saveContact } from "../../services/ContactService";

// export function createNewContactView() {
//     const container = document.createElement('div');
//     container.className = 'flex flex-col h-full bg-[#111b21]';

//     container.innerHTML = `
//         <div class="h-[60px] bg-[#202c33] flex items-center px-4">
//             <div class="flex items-center">
//                 <button class="mr-4 back-button">
//                     <i class="fas fa-arrow-left text-[#00a884]"></i>
//                 </button>
//                 <h1 class="text-[#d8dadf] font-bold text-xl">Nouveau contact</h1>
//             </div>
//         </div>

//         <div class="flex-1 overflow-y-auto p-4">
//             <form class="space-y-4" id="new-contact-form">
//                 <div>
//                     <input type="text" 
//                            placeholder="Nom du contact"
//                            class="w-full p-3 bg-[#2a373f] text-[#d8dadf] rounded outline-none"
//                            id="contact-name" required>
//                 </div>
                
//                 <div>
//                     <select class="w-full p-3 bg-[#2a373f] text-[#d8dadf] rounded outline-none"
//                             id="contact-country" required>
//                         <option value="">Sélectionner un pays</option>
//                         <option value="SN">Sénégal (+221)</option>
//                         <option value="ML">Mali (+223)</option>
//                         <option value="CI">Côte d'Ivoire (+225)</option>
//                         <option value="GN">Guinée (+224)</option>
//                     </select>
//                 </div>
                
//                 <div>
//                     <input type="tel" 
//                            placeholder="Numéro de téléphone"
//                            class="w-full p-3 bg-[#2a373f] text-[#d8dadf] rounded outline-none"
//                            id="contact-phone" required>
//                 </div>

//                 <button type="submit" 
//                         class="w-full p-3 bg-[#00a884] text-white rounded hover:bg-[#029676]">
//                     Ajouter le contact
//                 </button>
//             </form>
//         </div>
//     `;

//     // Gestion du retour
//     const backButton = container.querySelector('.back-button');
//     backButton.addEventListener('click', () => {
//         const mainSection = document.querySelector('#main-section');
//         if (mainSection) {
//             // Retourner à la vue précédente
//             mainSection.innerHTML = '';
//             // Vous devrez implémenter la fonction pour revenir à la vue précédente
//             const previousView = createChatList(); // ou toute autre vue précédente
//             mainSection.appendChild(previousView);
//         }
//     });

//     // Gestion du formulaire
//     const form = container.querySelector('#new-contact-form');
//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const contactData = {
//             name: form.querySelector('#contact-name').value,
//             country: form.querySelector('#contact-country').value,
//             phone: form.querySelector('#contact-phone').value,
//         };

//         try {
//             await saveContact(contactData);
//             // Retourner à la liste des contacts après l'ajout
//             const mainSection = document.querySelector('#main-section');
//             if (mainSection) {
//                 mainSection.innerHTML = '';
//                 const previousView = createChatList();
//                 mainSection.appendChild(previousView);
//             }
//         } catch (error) {
//             console.error('Error saving contact:', error);
//         }
//     });

//     return container;
// }


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
            <div class="flex items-center p-3 cursor-pointer rounded-lg hover:bg-[#b7bbbd]">
               
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

     loadContacts();

    return container;
}