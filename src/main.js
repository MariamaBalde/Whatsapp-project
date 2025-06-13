import './style.css'
import './index.css'
import { isAuthenticated } from './authentification/AuthService'
import { createLoginForm } from './composant/auth/LoginForm'
import { createRegisterForm } from './composant/auth/RegisterForm'
import { createSideBar } from './composant/sidebar/sideBar'
import { createChatView } from './composant/chat/ChatView'


const app = document.querySelector('#app')

function renderChat() {
    const container = document.createElement('div');
    container.className = 'flex h-screen bg-[#285b76]';
    
    container.appendChild(createSideBar());
    
    container.appendChild(createChatView());
    
    return container;
}


export function renderApp() {
    if (isAuthenticated()) {
        const chatInterface = renderChat();
        app.innerHTML = '';
        app.appendChild(chatInterface);
    } else {
        renderAuth();
    }
}

function renderAuth() {
    const loginForm = createLoginForm()
    const registerForm = createRegisterForm()

    loginForm.querySelector('#register-link').addEventListener('click', (e) => {
        e.preventDefault()
        app.innerHTML = ''
        app.appendChild(registerForm)
    })

    registerForm.querySelector('#login-link').addEventListener('click', (e) => {
        e.preventDefault()
        app.innerHTML = ''
        app.appendChild(loginForm)
    })

    app.innerHTML = ''
    app.appendChild(loginForm)
}

renderApp()