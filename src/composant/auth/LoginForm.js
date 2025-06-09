import { login } from '../../authentification/AuthService';

export function createLoginForm() {
    const formElement = document.createElement('form');
    
    formElement.innerHTML = `
        <div class="bg-[#00a884] p-8 rounded-lg w-96 container my-52 mx-auto ">
          <h2 class="text-3xl font-bold mb-8 text-center text-white">whatsapp Login</h2>
            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="username" 
                        class="w-full p-3 bg-[#00a884] text-white placeholder-white border border-b-2 rounded-md" 
                        placeholder="Email" required>
                    <span class="absolute -left-1 top-1/2 transform -translate-y-3.5  -translate-x-3.5">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    </span>
                </div>
            </div>
            <div class="mb-6">
                <div class="relative">
                    <input type="password" id="password" 
                        class="w-full p-3 bg-[#00a884] text-white placeholder-white border-none rounded-md" 
                        placeholder="Password" required>
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            <div class="flex justify-between items-center mb-6">
                <label class="flex items-center text-white">
                    <input type="checkbox" class="mr-2 bg-[#00a884] border-none">
                    Remember me
                </label>
                <a href="#" class="text-white hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" 
                class="w-full p-3 bg-[#d9fdd3] text-[#00a884] rounded-md hover:bg-[#22a1aa] transition-colors mb-4">
                LOGIN
            </button>
            <p class="text-center text-white">
                Don't have an account? 
                <a href="#" id="register-link" class="text-white hover:underline">Register</a>
            </p>
        </div>
    `;

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = formElement.querySelector('#username').value;
        const password = formElement.querySelector('#password').value;

        if (login(username, password)) {
            window.location.href = '/chat';
        } else {
            alert('Invalid credentials');
        }
    });

    return formElement;
}