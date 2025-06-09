// import './style.css'
// import './index.css'
// import { isAuthenticated } from './authentification/AuthService'
// import { createLoginForm } from './composant/auth/LoginForm'

// const app = document.querySelector('#app')

// function renderAuth() {
//     if (isAuthenticated()) {
//         window.location.href = '/chat'
//     } else {
//         const loginForm = createLoginForm()
//         app.innerHTML = ''
//         app.appendChild(loginForm)
//     }
// }

// renderAuth()


import './style.css'
import './index.css'
import { isAuthenticated } from './authentification/AuthService'
import { createLoginForm } from './composant/auth/LoginForm'
import { createRegisterForm } from './composant/auth/RegisterForm'

const app = document.querySelector('#app')

function renderAuth() {
    const loginForm = createLoginForm()
    const registerForm = createRegisterForm()

    // Gérer la navigation entre login et register
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

    // Afficher le formulaire de connexion par défaut
    app.innerHTML = ''
    app.appendChild(loginForm)
}

renderAuth()