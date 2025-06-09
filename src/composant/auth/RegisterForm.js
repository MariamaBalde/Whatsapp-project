import { register } from '../../authentification/AuthService';

export function createRegisterForm() {
    const formElement = document.createElement('form');
    
    formElement.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 class="text-2xl font-bold mb-6 text-center text-green-600">Create Account</h2>
                <div class="mb-4">
                    <input type="text" id="username" 
                        class="w-full p-2 border rounded" 
                        placeholder="Choose Username" required>
                </div>
                <div class="mb-4">
                    <input type="password" id="password" 
                        class="w-full p-2 border rounded" 
                        placeholder="Choose Password" required>
                </div>
                <div class="mb-6">
                    <input type="tel" id="phone" 
                        class="w-full p-2 border rounded" 
                        placeholder="Phone Number" required>
                </div>
                <button type="submit" 
                    class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Register
                </button>
                <p class="mt-4 text-center text-gray-600">
                    Already have an account? 
                    <a href="#" id="login-link" class="text-green-500">Login</a>
                </p>
            </div>
        </div>
    `;

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            username: formElement.querySelector('#username').value,
            password: formElement.querySelector('#password').value,
            phone: formElement.querySelector('#phone').value
        };

        if (register(userData)) {
            window.location.href = '/chat';
        }
    });

    return formElement;
}