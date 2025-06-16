import { API_URL } from "../config/constants";

export async function saveMessage(messageData) {
    try {
        const message = {
            id: crypto.randomUUID(),
            senderId: messageData.senderId,
            receiverId: messageData.receiverId,
            content: messageData.content,
            timestamp: new Date().toISOString()
        };

        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });
        
        if (!response.ok) {
            console.error('Response status:', response.status);
            const errorText = await response.text();
            console.error('Response text:', errorText);
            throw new Error('Failed to save message');
        }

        const savedMessage = await response.json();
        return savedMessage;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
}

export async function getMessages(userId) {
    try {
        const response = await fetch(`${API_URL}/messages`);
        if (!response.ok) throw new Error('Failed to load messages');
        const messages = await response.json();
        
        return messages.filter(msg => 
            msg.senderId === userId || msg.receiverId === userId
        );
    } catch (error) {
        console.error('Error loading messages:', error);
        return [];
    }
}
