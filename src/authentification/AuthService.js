import { loadFromStorage, saveToStorage } from "../utils/storage";
import { loadUsersFromJson,saveUserToJson } from '../utils/userLoader';


export async function initUsers() {
    let users = loadFromStorage('users');
    if (!users) {
        users = await loadUsersFromJson();
        saveToStorage('users', users);
    }
    return users;
}


export async function login(phone, password) {
    try {
        const users = await loadUsersFromJson();
        
        function normalizePhoneNumber(phone) {
            let normalized = phone.replace(/\s+/g, '');
            if (!normalized.startsWith('+')) {
                normalized = '+221' + normalized;
            }
            return normalized;
        }

        const normalizedInputPhone = normalizePhoneNumber(phone);
        
        const user = users.find(u => {
            const normalizedStoredPhone = normalizePhoneNumber(u.phone);
            return normalizedStoredPhone === normalizedInputPhone;
        });

        if (!user) {
            return false;
        }

        if (user.password === password) {
            saveToStorage('currentUser', user);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}


export async function register(userData) {
    try {
        const users = await loadUsersFromJson();
        const existingUser = users.find(u =>
            u.username === userData.username ||
            u.phone === userData.phone
        );

        if (existingUser) {
            throw new Error('Username or phone number already exists');
        }

        const newUser = await saveUserToJson(userData);
        saveToStorage('currentUser', newUser);
        return true;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}


export function logout() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return loadFromStorage("currentUser");
}

export function isAuthenticated() {
  return !!getCurrentUser();
}
