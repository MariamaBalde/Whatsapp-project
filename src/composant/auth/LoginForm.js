import { login } from '../../authentification/AuthService';
import { validateLogin } from '../../utils/validations';
import { loadUsersFromJson } from '../../utils/userLoader';

function normalizePhoneNumber(phone) {
    let normalized = phone.replace(/\s+/g, '');
    
    if (!normalized.startsWith('+')) {
        normalized = '+221' + normalized;
    }
    
    return normalized;
}

export function createLoginForm() {
    const formElement = document.createElement('form');
     
    
    formElement.innerHTML = `
        <div class="bg-[#00a884] px-8 py-[120px] rounded-lg w-[400px] h-auto container my-52 mx-auto ">
          <h2 class="text-3xl font-bold mb-8 text-center text-white">whatsapp Login</h2>
            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="phone" 
                        class="w-full p-3 bg-[#eeeeee] text-black placeholder-[#8a8a8a]  border-3 outline-none rounded-xl" 
                        placeholder="Phone Number" >                   
                </div>
            </div>
            <div class="mb-6">
                <div class="relative">
                    <input type="password" id="password" 
                        class="w-full p-3 bg-[#eeeeee] text-black placeholder-[#8a8a8a]  border-3 outline-none rounded-xl" 
                        placeholder="Password" >
                      
                </div>
            </div>
          
            <button type="submit" 
                class="w-full p-3  bg-gradient-to-r from-[#12552e] from 37% to-[#16c9a2] to-37%  text-white text-2xl font-bold rounded-full hover:bg-[#22a1aa] transition-color mb-4">
                Login
            </button>
            <p class="text-center text-white  text-xl">
                Don't have an account? 
                <a href="#" id="register-link" class="text-[#12552e] underline">Register</a>
            </p>
        </div>
    `;


     function clearErrors() {
        formElement.querySelectorAll('.text-red-500').forEach(el => el.remove());
        formElement.querySelectorAll('input').forEach(input => {
            input.classList.remove('border-red-500');
        });
    }

    function showFieldError(field, message) {
        const input = formElement.querySelector(`#${field}`);
        input.classList.add('border-red-500');
        const errorSpan = document.createElement('span');
        errorSpan.className = 'text-red-500 text-sm mt-1';
        errorSpan.textContent = message;
        input.parentNode.appendChild(errorSpan);
    }



    formElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const loginData = {
            phone: formElement.querySelector('#phone').value,
            password: formElement.querySelector('#password').value
        };

        try {
             validateLogin(loginData);
            const users = await loadUsersFromJson();
            
            const normalizedInputPhone = normalizePhoneNumber(loginData.phone);
            
            const user = users.find(u => {
                const normalizedStoredPhone = normalizePhoneNumber(u.phone);
                return normalizedStoredPhone === normalizedInputPhone;
            });

            if (!user) {
                showFieldError('phone', 'Ce numéro de téléphone n\'existe pas');
                return;
            }

            if (user.password !== loginData.password) {
                showFieldError('password', 'Mot de passe incorrect');
                return;
            }

            await login(loginData.phone, loginData.password);
            window.location.href = '/chat';

        } catch (error) {
            if (error.message.startsWith('{')) {
                const errors = JSON.parse(error.message);
                Object.entries(errors).forEach(([field, message]) => {
                    showFieldError(field, message);
                });
            } else {
                console.error('Login error:', error);
                showFieldError('phone', 'Une erreur est survenue lors de la connexion');
            }
        }
    });

    return formElement;
}
