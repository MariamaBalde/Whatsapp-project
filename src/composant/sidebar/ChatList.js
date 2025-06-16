import { getContacts } from '../../services/ContactService';
import { getMessages } from '../../services/MessageService';
import { getCurrentUser } from '../../authentification/AuthService';

export function createChatList() {
    const chatList = document.createElement('div');
    chatList.className = 'flex-1 overflow-y-scroll';

    chatList.style.cssText = `
        scrollbar-width: thin;
        scrollbar-color: #374045 #285b76;
    `;
    
    async function loadChats() {
        const currentUser = getCurrentUser();
        const contacts = await getContacts();
        const messages = await getMessages(currentUser.id);
        
        const contactsWithMessages = contacts.filter(contact => 
            messages.some(msg => 
                msg.senderId === contact.id || msg.receiverId === contact.id
            )
        );

        const sortedContacts = contactsWithMessages.map(contact => {
            const contactMessages = messages.filter(msg => 
                msg.senderId === contact.id || msg.receiverId === contact.id
            );
            const lastMessage = contactMessages[contactMessages.length - 1];
            return {
                ...contact,
                lastMessage: lastMessage.content,
                timestamp: lastMessage.timestamp
            };
        }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return sortedContacts.map(contact => {
            const initials = contact.name
                .split(' ')
                .map(name => name.charAt(0).toUpperCase())
                .join('');
                
            const messageTime = new Date(contact.timestamp).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `
                <div class="flex items-center px-3 py-3 hover:bg-[#d8dadf] cursor-pointer chat-item" 
                     data-contact-id="${contact.id}">
                    <div class="w-12 h-12 rounded-full bg-[#202c33] flex items-center justify-center">
                        <span class="text-[#8696a0] text-xl font-semibold">${initials}</span>
                    </div>
                    <div class="ml-3 flex-1 border-b border-[#2a373f] pb-3">
                        <div class="flex justify-between items-center">
                            <span class="text-[#285b76] font-medium">${contact.name}</span>
                            <span class="text-[#8696a0] text-sm">${messageTime}</span>
                        </div>
                        <div class="flex items-center">
                            <span class="text-[#8696a0] text-sm truncate">${contact.lastMessage}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Charger la liste initiale
    loadChats().then(chatHTML => {
        chatList.innerHTML = `
            <style>
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #285b76;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #374045;
                    border-radius: 3px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #202c33;
                }
            </style>
            ${chatHTML}
        `;
    });

    chatList.addEventListener('click', (e) => {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const contactId = chatItem.dataset.contactId;
            const event = new CustomEvent('chat-selected', { 
                detail: { contactId } 
            });
            document.dispatchEvent(event);
        }
    });
    
    return chatList;
}

function generateChatItems() {
    return Array(20).fill(0).map(() => `
        <div class="flex items-center px-3 py-3 hover:bg-[#d8dadf] cursor-pointer">
            <img src="https://via.placeholder.com/40" class="w-12 h-12 rounded-full" alt="Contact">
            <div class="ml-3 flex-1 border-b border-[#2a373f] pb-3">
                <div class="flex justify-between items-center">
                    <span class="text-[#285b76] font-medium">Contact Name</span>
                    <span class="text-[#8696a0] text-sm">10:30</span>
                </div>
                <div class="flex items-center">
                    <span class="text-[#8696a0] text-sm truncate">Last message...</span>
                </div>
            </div>
        </div>
    `).join('');
}


