import { loadFromStorage, saveToStorage } from '../utils/storage';

import users from '../data/users.json';



export function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        saveToStorage('currentUser', user);
        return true;
    }
    return false;
}

export function register(userData) {
    const newUser = {
        id: users.length + 1,
        ...userData
    };
    users.push(newUser);
    saveToStorage('currentUser', newUser);
     saveToStorage('users', users);
    return true;
}

export function logout() {
    localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
    return loadFromStorage('currentUser');
}

export function isAuthenticated() {
    return !!getCurrentUser();
}