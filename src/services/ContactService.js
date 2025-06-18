import { API_URL } from "../config/constants"; 


// export async function saveContact(contactData) {
//     try {
//         const response = await fetch(`${API_URL}/contacts`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 ...contactData,
//                 created_at: new Date().toISOString()
//             })
//         });
        
//         if (!response.ok) throw new Error('Failed to save contact');
//         return await response.json();
//     } catch (error) {
//         console.error('Error saving contact:', error);
//         throw error;
//     }
// }

export async function saveContact(contactData) {
        console.log('Attempting to save contact:', contactData);

    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...contactData,
                created_at: new Date().toISOString()
            })
        });

                console.log('Save response status:', response.status);

         
        if (!response.ok) throw new Error('Failed to save contact');
        
        const savedContact = await response.json();
        
        // Vérification supplémentaire : relire les contacts pour confirmer
        const allContacts = await getContacts();
        const contactExists = allContacts.some(contact => contact.id === savedContact.id);
        
        if (!contactExists) {
            throw new Error('Contact not properly saved');
        }
        
        return savedContact;
    } catch (error) {
        console.error('Error saving contact:', error);
        throw error;
    }
}

export function saveContactToCache(contact) {
    try {
        const cachedContacts = JSON.parse(localStorage.getItem('cachedContacts') || '[]');
        const existingIndex = cachedContacts.findIndex(c => c.id === contact.id);
        
        if (existingIndex !== -1) {
            cachedContacts[existingIndex] = contact;
        } else {
            cachedContacts.push(contact);
        }
        
        localStorage.setItem('cachedContacts', JSON.stringify(cachedContacts));
    } catch (error) {
        console.error('Error caching contact:', error);
    }
}

export async function getContactsWithCache() {
    try {
        // Essayer d'abord de récupérer depuis l'API
        const contacts = await getContacts();
        
        // Sauvegarder dans le cache
        localStorage.setItem('cachedContacts', JSON.stringify(contacts));
        
        return contacts;
    } catch (error) {
        console.error('Error loading contacts from API, using cache:', error);
        
        // En cas d'échec, utiliser le cache
        const cachedContacts = JSON.parse(localStorage.getItem('cachedContacts') || '[]');
        return cachedContacts;
    }
}

export async function getContacts() {
    try {
        const response = await fetch(`${API_URL}/contacts`);
        if (!response.ok) throw new Error('Failed to load contacts');
        return await response.json();
    } catch (error) {
        console.error('Error loading contacts:', error);
        return [];
    }
}