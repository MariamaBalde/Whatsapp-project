// import { API_URL } from "../config/constants";

// export async function saveMessage(messageData) {
//     try {
//         const message = {
//             id: crypto.randomUUID(),
//             senderId: messageData.senderId,
//             receiverId: messageData.receiverId,
//             content: messageData.content,
//             timestamp: new Date().toISOString()
//         };

//         const response = await fetch(`${API_URL}/messages`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(message)
//         });
        
//         if (!response.ok) {
//             console.error('Response status:', response.status);
//             const errorText = await response.text();
//             console.error('Response text:', errorText);
//             throw new Error('Failed to save message');
//         }

//         const savedMessage = await response.json();
//         return savedMessage;
//     } catch (error) {
//         console.error('Error saving message:', error);
//         throw error;
//     }
// }

// export async function getMessages(userId) {
//     try {
//         const response = await fetch(`${API_URL}/messages`);
//         if (!response.ok) throw new Error('Failed to load messages');
//         const messages = await response.json();
        
//         return messages.filter(msg => 
//             msg.senderId === userId || msg.receiverId === userId
//         );
//     } catch (error) {
//         console.error('Error loading messages:', error);
//         return [];
//     }
// }


// 222222
import { API_URL } from "../config/constants";

// Fonction pour sauvegarder un message individuel
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

// Fonction pour sauvegarder un message de groupe
export async function saveGroupMessage(messageData) {
    try {
        const message = {
            id: crypto.randomUUID(),
            senderId: messageData.senderId,
            senderName: messageData.senderName, // Nom de l'expéditeur pour l'affichage
            receiverId: messageData.groupId, // Utiliser receiverId pour stocker l'ID du groupe
            content: messageData.content,
            timestamp: new Date().toISOString(),
            type: 'group' // Identifier que c'est un message de groupe
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
            throw new Error('Failed to save group message');
        }

        const savedMessage = await response.json();
        return savedMessage;
    } catch (error) {
        console.error('Error saving group message:', error);
        throw error;
    }
}

// Fonction pour récupérer les messages individuels
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

// Fonction pour récupérer les messages d'un groupe spécifique
export async function getGroupMessages(groupId) {
    try {
        const response = await fetch(`${API_URL}/messages`);
        if (!response.ok) throw new Error('Failed to load group messages');
        const messages = await response.json();
        
        // Filtrer les messages de groupe pour le groupe spécifique
        return messages.filter(msg => 
            msg.type === 'group' && msg.receiverId === groupId
        );
    } catch (error) {
        console.error('Error loading group messages:', error);
        return [];
    }
}

// Fonction pour récupérer tous les messages de groupe d'un utilisateur
export async function getUserGroupMessages(userId) {
    try {
        // Récupérer tous les messages
        const response = await fetch(`${API_URL}/messages`);
        if (!response.ok) throw new Error('Failed to load messages');
        const allMessages = await response.json();
        
        // Filtrer les messages de groupe où l'utilisateur est l'expéditeur
        return allMessages.filter(msg => 
            msg.type === 'group' && msg.senderId === userId
        );
    } catch (error) {
        console.error('Error loading user group messages:', error);
        return [];
    }
}

// Fonction pour marquer les messages comme lus
export async function markMessagesAsRead(userId, contactId, isGroup = false) {
    try {
        // Pour JSON Server, nous devrons implémenter cette fonctionnalité différemment
        // ou l'ignorer pour l'instant car JSON Server ne supporte pas facilement les PATCH bulk
        console.log('Mark as read functionality would be implemented here');
    } catch (error) {
        console.error('Error marking messages as read:', error);
    }
}

// Fonction pour supprimer un message
export async function deleteMessage(messageId) {
    try {
        const response = await fetch(`${API_URL}/messages/${messageId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete message');
        }

        return true;
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
}

// Fonction pour modifier un message
export async function updateMessage(messageId, newContent) {
    try {
        const response = await fetch(`${API_URL}/messages/${messageId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                content: newContent,
                editedAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update message');
        }

        const updatedMessage = await response.json();
        return updatedMessage;
    } catch (error) {
        console.error('Error updating message:', error);
        throw error;
    }
}