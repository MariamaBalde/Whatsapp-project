import { saveMessage } from "../../services/MessageService";
import { getCurrentUser } from "../../authentification/AuthService";

export function createMessageInput() {
    const messageInputContainer = document.createElement('div');
    messageInputContainer.className = 'bg-[#285b76] p-4 flex items-center space-x-4';

    let selectedContactId = null;
    let selectedContactName = null;

    messageInputContainer.innerHTML = `
        <div class="flex items-center space-x-2">
            <button class="text-[#8696a0] hover:text-[#00a884] transition-colors attach-button">
                <i class="fas fa-paperclip text-xl"></i>
            </button>
            <button class="text-[#8696a0] hover:text-[#00a884] transition-colors camera-button">
                <i class="fas fa-camera text-xl"></i>
            </button>
        </div>
        
        <div class="flex-1 flex items-center bg-[#2d6a97] rounded-lg px-4 py-2">
            <input 
                type="text" 
                placeholder="Tapez un message..." 
                class="flex-1 bg-transparent text-[#e9edef] placeholder-[#8696a0] outline-none message-input"
                disabled
            />
            <button class="text-[#8696a0] hover:text-[#00a884] transition-colors ml-2 emoji-button">
                <i class="fas fa-smile text-xl"></i>
            </button>
        </div>
        
        <button class="text-[#8696a0] hover:text-[#00a884] transition-colors send-button" disabled>
            <i class="fas fa-microphone text-xl"></i>
        </button>
    `;

    const messageInput = messageInputContainer.querySelector('.message-input');
    const sendButton = messageInputContainer.querySelector('.send-button');
    const attachButton = messageInputContainer.querySelector('.attach-button');
    const cameraButton = messageInputContainer.querySelector('.camera-button');
    const emojiButton = messageInputContainer.querySelector('.emoji-button');

    messageInputContainer.setContactSelected = (contactId, contactName) => {
        selectedContactId = contactId;
        selectedContactName = contactName;
        
        messageInput.disabled = false;
        messageInput.placeholder = `Tapez un message à ${contactName}...`;
        
        messageInput.focus();
    };

    async function sendMessage() {
        const content = messageInput.value.trim();
        const currentUser = getCurrentUser();

        if (!content || !selectedContactId || !currentUser) {
            return;
        }

        try {
            messageInput.disabled = true;
            sendButton.disabled = true;

            const messageData = {
                senderId: currentUser.id,
                receiverId: selectedContactId,
                content: content
            };

            await saveMessage(messageData);

            messageInput.value = '';
            
            sendButton.innerHTML = '<i class="fas fa-microphone text-xl"></i>';

            const event = new CustomEvent('message-sent', {
                detail: {
                    message: messageData,
                    contactId: selectedContactId
                }
            });
            document.dispatchEvent(event);

            messageInput.disabled = false;
            messageInput.focus();

        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            alert('Erreur lors de l\'envoi du message');
            
            messageInput.disabled = false;
            sendButton.disabled = false;
        }
    }

    messageInput.addEventListener('input', () => {
        const hasContent = messageInput.value.trim().length > 0;
        
        if (hasContent) {
            sendButton.innerHTML = '<i class="fas fa-paper-plane text-xl"></i>';
            sendButton.className = 'text-[#00a884] hover:text-[#06cf9c] transition-colors send-button';
            sendButton.disabled = false;
        } else {
            sendButton.innerHTML = '<i class="fas fa-microphone text-xl"></i>';
            sendButton.className = 'text-[#8696a0] hover:text-[#00a884] transition-colors send-button';
            sendButton.disabled = selectedContactId ? false : true;
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (messageInput.value.trim()) {
                sendMessage();
            }
        }
    });

    sendButton.addEventListener('click', () => {
        if (messageInput.value.trim()) {
            sendMessage();
        }
    });

    attachButton.addEventListener('click', () => {
        console.log('Fonctionnalité pièce jointe à implémenter');
    });

    cameraButton.addEventListener('click', () => {
        console.log('Fonctionnalité caméra à implémenter');
    });

    emojiButton.addEventListener('click', () => {
        console.log('Fonctionnalité emoji à implémenter');
    });

    return messageInputContainer;
}
