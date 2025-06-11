const API_URL = 'http://localhost:3000';

export async function loadUsersFromJson() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to load users');
    return await response.json();
}

export async function saveUserToJson(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to save user');
    return await response.json();
}

export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
}