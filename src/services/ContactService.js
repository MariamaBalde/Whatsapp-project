// const API_URL = 'http://localhost:3000';
const API_URL = 'https://json-server-deployment-bq1r.onrender.com/';


export async function saveContact(contactData) {
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
        
        if (!response.ok) throw new Error('Failed to save contact');
        return await response.json();
    } catch (error) {
        console.error('Error saving contact:', error);
        throw error;
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