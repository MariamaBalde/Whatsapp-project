import { saveMessage } from '../../services/MessageService';
import { getCurrentUser } from '../../authentification/AuthService';

export function createMessageInput() {
    const inputContainer = document.createElement("div");
    inputContainer.className = "bg-[#285b76] px-4 py-2 flex items-center space-x-4";
       let selectedContactId = null;
    let selectedContactName = null;


    inputContainer.innerHTML = `
        <button class="py-1 px-2 text-[#8696a0] hover:bg-[#374045] rounded-full">
           <i class="fa-regular text-2xl fa-face-smile"></i>
        </button>
        <button class="py-2 px-1 text-[#8696a0] hover:bg-[#374045] rounded-full">
           <i class="fa-solid fa-paperclip text-2xl"></i>
        </button>
        <input type="text" 
               placeholder="Sélectionnez un contact pour envoyer un message" 
               class="message-input flex-1 bg-[#2d6a97] text-[#d1d7db] placeholder-[#8696a0] px-4 py-2 rounded-lg focus:outline-none"
               disabled>
        <button class="send-button py-1 px-3 text-[#8696a0] hover:bg-[#374045] rounded-full hidden">
           <i class="fa-solid fa-paper-plane text-2xl"></i>
        </button>
        <button class="mic-button py-1 px-3 text-[#8696a0] hover:bg-[#374045] rounded-full">
           <i class="fa-solid fa-microphone text-2xl"></i>
        </button>
    `;

    const messageInput = inputContainer.querySelector('.message-input');
    const sendButton = inputContainer.querySelector('.send-button');
    const micButton = inputContainer.querySelector('.mic-button');

        async function loadContactMessages() {
        if (!selectedContactId) return;
        
        const chatWindow = document.querySelector('.chat-window');
        if (!chatWindow) return;

        let messagesContainer = chatWindow.querySelector('.flex.flex-col');
        if (!messagesContainer) {
            messagesContainer = document.createElement('div');
            messagesContainer.className = 'flex flex-col p-4 space-y-4';
            chatWindow.appendChild(messagesContainer);
        }

        messagesContainer.innerHTML = '';

        try {
            const currentUser = getCurrentUser();
            const messages = await getMessages(currentUser.id, selectedContactId);
            
            messages.forEach(msg => {
                const isOwnMessage = msg.senderId === currentUser.id;
                displayMessage(msg.content, isOwnMessage);
            });
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message && selectedContactId) {
            const currentUser = getCurrentUser();
            const messageData = {
                senderId: currentUser.id,
                receiverId: selectedContactId,
                content: message,
                timestamp: new Date().toISOString()
            };

            try {
                const savedMessage = await saveMessage(messageData);
                if (savedMessage) {
                    displayMessage(message,true);
                    messageInput.value = '';
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }


        function displayMessage(message, isOwnMessage) {
        const chatWindow = document.querySelector('.chat-window');
        if (chatWindow) {
            let messagesContainer = chatWindow.querySelector('.flex.flex-col');
            if (!messagesContainer) {
                messagesContainer = document.createElement('div');
                messagesContainer.className = 'flex flex-col p-4 space-y-4';
                chatWindow.appendChild(messagesContainer);
            }

            const messageElement = document.createElement('div');
            messageElement.className = `max-w-[60%] p-2 rounded-lg mb-2 ${
                isOwnMessage 
                    ? 'self-end bg-[#005c4b] text-white' 
                    : 'self-start bg-[#202c33] text-white'
            }`;
            messageElement.innerHTML = `
                <p>${message}</p>
                <span class="text-xs text-gray-300 float-right">${
                    new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                }</span>
            `;
            messagesContainer.appendChild(messageElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

   
    function setContactSelected(contactId, contactName) {
        selectedContactId = contactId;
        selectedContactName = contactName;
        messageInput.disabled = !contactId;
        messageInput.placeholder = contactId ? "Tapez un message" : "Sélectionnez un contact pour envoyer un message";
        sendButton.classList.toggle('hidden', !contactId);
        micButton.classList.toggle('hidden', contactId);

        loadContactMessages();
    }
  
  
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

   
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    inputContainer.setContactSelected = setContactSelected;

    return inputContainer;
}
