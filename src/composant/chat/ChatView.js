import { createChatHeader } from './ChatHeader';
import { createChatWindow } from './ChatWindow';
import { createMessageInput } from './MessageInput';

export function createChatView() {
    const chatSection = document.createElement('div');
    chatSection.className = 'flex-1 flex flex-col';
    
    chatSection.appendChild(createChatHeader());
    
    chatSection.appendChild(createChatWindow());
    
    chatSection.appendChild(createMessageInput());
    
    return chatSection;
}