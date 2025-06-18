// 222222222222

// import { createChatHeader } from './ChatHeader';
// import { createChatWindow } from './ChatWindow';
// import { createMessageInput } from './MessageInput';
// import { getMessages } from "../../services/MessageService";
// import { getCurrentUser } from '../../authentification/AuthService';

// export function createChatView() {
//     const chatSection = document.createElement('div');
//     chatSection.className = 'flex-1 flex flex-col';

//     const header = createChatHeader();
//     const chatWindow = createChatWindow();
//     const messageInput = createMessageInput();

//     chatSection.appendChild(header);
//     chatSection.appendChild(chatWindow);
//     chatSection.appendChild(messageInput);

//     let currentContactId = null;

//     // Fonction pour formater l'heure
//     function formatTime(timestamp) {
//         const date = new Date(timestamp);
//         return date.toLocaleTimeString('fr-FR', { 
//             hour: '2-digit', 
//             minute: '2-digit' 
//         });
//     }

//     // Fonction pour charger et afficher les messages
//     async function loadAndDisplayMessages(contactId) {
//         if (!contactId) return;

//         const currentUser = getCurrentUser();
//         const allMessages = await getMessages(currentUser.id);
        
//         // Filtrer les messages pour cette conversation
//         const filteredMessages = allMessages.filter(msg =>
//             (msg.senderId === currentUser.id && msg.receiverId === contactId) ||
//             (msg.senderId === contactId && msg.receiverId === currentUser.id)
//         );

//         // Trier par timestamp
//         filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

//         // Générer le HTML des messages avec de vraies bulles
//         const messageHTML = filteredMessages.map(msg => {
//             const isMe = msg.senderId === currentUser.id;
//             const time = formatTime(msg.timestamp);
            
//             return `
//                 <div class="flex ${isMe ? 'justify-end' : 'justify-start'} mb-2">
//                     <div class="relative max-w-[70%] ${isMe ? 'ml-auto' : 'mr-auto'}">
//                         <div class="px-3 py-2 rounded-lg shadow-sm ${
//                             isMe 
//                                 ? 'bg-[#005c4b] text-white rounded-br-none' 
//                                 : 'bg-white text-[#111b21] rounded-bl-none'
//                         }">
//                             <p class="text-sm leading-5 break-words">${msg.content}</p>
//                             <span class="text-xs ${
//                                 isMe ? 'text-[#8696a0]' : 'text-[#667781]'
//                             } float-right mt-1 ml-2">
//                                 ${time}
//                                 ${isMe ? '<i class="fas fa-check-double text-[#53bdeb] ml-1"></i>' : ''}
//                             </span>
//                         </div>
//                         ${isMe 
//                             ? '<div class="absolute bottom-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-[#005c4b] border-t-[8px] border-t-transparent"></div>'
//                             : '<div class="absolute bottom-0 left-[-8px] w-0 h-0 border-r-[8px] border-r-white border-t-[8px] border-t-transparent"></div>'
//                         }
//                     </div>
//                 </div>
//             `;
//         }).join('');

//         // Mettre à jour le contenu du chat
//         const chatContent = chatWindow.querySelector('.chat-messages') || chatWindow;
//         chatContent.innerHTML = `
//             <div class="flex flex-col p-4 space-y-1 h-full">
//                 ${messageHTML || '<div class="text-center text-[#8696a0] mt-8">Aucun message pour le moment</div>'}
//             </div>
//         `;

//         // Scroll vers le bas pour voir le dernier message
//         setTimeout(() => {
//             chatContent.scrollTop = chatContent.scrollHeight;
//         }, 100);
//     }

//     // Gestionnaire pour la sélection d'un contact
//     document.addEventListener('chat-selected', async (e) => {
//         const contact = e.detail;
//         const currentUser = getCurrentUser();
//         currentContactId = contact.id;

//         if (contact) {
//             // Mettre à jour l'en-tête
//             const contactName = header.querySelector('.contact-name');
//             const contactStatus = header.querySelector('.contact-status');
//             if (contactName && contactStatus) {
//                 contactName.textContent = contact.name || 'Contact inconnu';
//                 contactStatus.textContent = 'en ligne';
//             }

//             // Informer MessageInput du contact sélectionné
//             if (messageInput.setContactSelected) {
//                 messageInput.setContactSelected(contact.id, contact.name);
//             }

//             // Charger et afficher les messages
//             await loadAndDisplayMessages(contact.id);
//         }
//     });

//     // Gestionnaire pour les nouveaux messages (rafraîchissement automatique)
//     document.addEventListener('message-sent', async (e) => {
//         if (currentContactId) {
//             await loadAndDisplayMessages(currentContactId);
//         }
//     });

//     // Gestionnaire pour les groupes sélectionnés
//     document.addEventListener('group-selected', async (e) => {
//         const group = e.detail;
//         currentContactId = `group_${group.id}`;

//         // Mettre à jour l'en-tête pour le groupe
//         const contactName = header.querySelector('.contact-name');
//         const contactStatus = header.querySelector('.contact-status');
//         if (contactName && contactStatus) {
//             contactName.textContent = group.name || 'Groupe inconnu';
//             contactStatus.textContent = `${group.members.length} membres`;
//         }

//         // Note: Pour les groupes, vous devrez adapter getMessages() 
//         // pour gérer les messages de groupe
//     });

//     return chatSection;
// }

import { createChatHeader } from './ChatHeader';
import { createChatWindow } from './ChatWindow';
import { createMessageInput } from './MessageInput';
import { getMessages, getGroupMessages } from "../../services/MessageService";
import { getCurrentUser } from '../../authentification/AuthService';

export function createChatView() {
    const chatSection = document.createElement('div');
    chatSection.className = 'flex-1 flex flex-col';

    const header = createChatHeader();
    const chatWindow = createChatWindow();
    const messageInput = createMessageInput();

    chatSection.appendChild(header);
    chatSection.appendChild(chatWindow);
    chatSection.appendChild(messageInput);

    let currentContactId = null;
    let isGroupChat = false;

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    async function loadAndDisplayMessages(contactId) {
        if (!contactId) return;

        const currentUser = getCurrentUser();
        const allMessages = await getMessages(currentUser.id);
        
        const filteredMessages = allMessages.filter(msg =>
            (msg.senderId === currentUser.id && msg.receiverId === contactId) ||
            (msg.senderId === contactId && msg.receiverId === currentUser.id)
        );

        filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        displayMessages(filteredMessages, false);
    }

    async function loadAndDisplayGroupMessages(groupId) {
        if (!groupId) return;

        const currentUser = getCurrentUser();
        try {
            const groupMessages = await getGroupMessages(groupId);
            
            groupMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            displayMessages(groupMessages, true);
        } catch (error) {
            console.error('Erreur lors du chargement des messages de groupe:', error);
            displayEmptyState();
        }
    }

    function displayMessages(messages, isGroup = false) {
        const currentUser = getCurrentUser();
        
        const messageHTML = messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            const time = formatTime(msg.timestamp);
            
            const senderName = isGroup && !isMe ? msg.senderName || 'Utilisateur inconnu' : '';
            
            return `
                <div class="flex ${isMe ? 'justify-end' : 'justify-start'} mb-2">
                    <div class="relative max-w-[70%] ${isMe ? 'ml-auto' : 'mr-auto'}">
                        ${isGroup && !isMe && senderName ? `
                            <div class="text-xs text-[#667781] mb-1 ml-2">${senderName}</div>
                        ` : ''}
                        <div class="px-3 py-2 rounded-lg shadow-sm ${
                            isMe 
                                ? 'bg-[#005c4b] text-white rounded-br-none' 
                                : 'bg-white text-[#111b21] rounded-bl-none'
                        }">
                            <p class="text-sm leading-5 break-words">${msg.content}</p>
                            <span class="text-xs ${
                                isMe ? 'text-[#8696a0]' : 'text-[#667781]'
                            } float-right mt-1 ml-2">
                                ${time}
                                ${isMe ? '<i class="fas fa-check-double text-[#53bdeb] ml-1"></i>' : ''}
                            </span>
                        </div>
                        ${isMe 
                            ? '<div class="absolute bottom-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-[#005c4b] border-t-[8px] border-t-transparent"></div>'
                            : '<div class="absolute bottom-0 left-[-8px] w-0 h-0 border-r-[8px] border-r-white border-t-[8px] border-t-transparent"></div>'
                        }
                    </div>
                </div>
            `;
        }).join('');

        const chatContent = chatWindow.querySelector('.chat-messages') || chatWindow;
        chatContent.innerHTML = `
            <div class="flex flex-col p-4 space-y-1 h-full">
                ${messageHTML || '<div class="text-center text-[#8696a0] mt-8">Aucun message pour le moment</div>'}
            </div>
        `;

        setTimeout(() => {
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 100);
    }

    function displayEmptyState() {
        const chatContent = chatWindow.querySelector('.chat-messages') || chatWindow;
        chatContent.innerHTML = `
            <div class="flex flex-col p-4 space-y-1 h-full">
                <div class="text-center text-[#8696a0] mt-8">Aucun message pour le moment</div>
            </div>
        `;
    }

    document.addEventListener('chat-selected', async (e) => {
        const contact = e.detail;
        const currentUser = getCurrentUser();
        currentContactId = contact.id;
        isGroupChat = false;

        if (contact) {
            const contactName = header.querySelector('.contact-name');
            const contactStatus = header.querySelector('.contact-status');
            if (contactName && contactStatus) {
                contactName.textContent = contact.name || 'Contact inconnu';
                contactStatus.textContent = 'en ligne';
            }

            if (messageInput.setContactSelected) {
                messageInput.setContactSelected(contact.id, contact.name, false);
            }

            await loadAndDisplayMessages(contact.id);
        }
    });

    document.addEventListener('message-sent', async (e) => {
        if (currentContactId) {
            if (isGroupChat) {
                const groupId = currentContactId.replace('group_', '');
                await loadAndDisplayGroupMessages(groupId);
            } else {
                await loadAndDisplayMessages(currentContactId);
            }
        }
    });

    document.addEventListener('group-selected', async (e) => {
        const group = e.detail;
        currentContactId = `group_${group.id}`;
        isGroupChat = true;

        const contactName = header.querySelector('.contact-name');
        const contactStatus = header.querySelector('.contact-status');
        if (contactName && contactStatus) {
            contactName.textContent = group.name || 'Groupe inconnu';
            contactStatus.textContent = `${group.members.length} membres`;
        }

        if (messageInput.setContactSelected) {
            messageInput.setContactSelected(group.id, group.name, true);
        }

        await loadAndDisplayGroupMessages(group.id);
    });

    document.addEventListener('group-message-received', async (e) => {
        const { groupId } = e.detail;
        if (isGroupChat && currentContactId === `group_${groupId}`) {
            await loadAndDisplayGroupMessages(groupId);
        }
    });

    return chatSection;
}