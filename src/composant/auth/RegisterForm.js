import { register } from "../../authentification/AuthService";
import { validateForm } from "../../utils/validations";
import { COUNTRY_CODES } from '../../config/constants';


export function createRegisterForm() {
  const formElement = document.createElement("form");
  const errorDiv = document.createElement("div");
  errorDiv.className = "text-red-500 text-sm mt-2";

  formElement.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-white">
            <div class="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 class="text-2xl font-bold mb-6 text-center text-[#285b76]">Create Account</h2>
                <div class="mb-4">
                    <label for="fullname" class="block font-medium text-gray-700 mb-1">FullName</label>
                    <input type="text" id="fullname" 
                        class="w-full p-2 border rounded  " 
                        placeholder="FullName"
                        >
           
                </div>
                <div class="mb-4">
                    <label for="username" class="block font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" id="username" 
                        class="w-full p-2 border rounded" 
                        placeholder="Username"
                        >
                </div>

                <div class="w-full max-w-sm mx-auto mb-6">
                    <label for="country" class="block font-medium text-gray-700 mb-1">Country</label>
                    <select id="country" name="country"
                        class="block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white"
                        >
                        <option value="">Select Country</option>
                        <option value="SN">Senegal</option>
                        <option value="ML">Mali</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="GN">Guinée</option>
                    </select>
                </div>
                
                <div class="mb-6">
                    <label for="phone" class="block font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" id="phone" 
                        class="w-full p-2 border rounded" 
                        placeholder="XX XXX XX XX"
 pattern="^\+(?:221|224|223|225)\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$"
                        title="Format valide: +XXX XX XXX XX XX">
                  
                </div>

                <div class="mb-4">
                    <label for="password" class="block font-medium text-gray-700 mb-1">Choose Password</label>
                    <input type="password" id="password" 
                        class="w-full p-2 border rounded"
                        placeholder="Choose Password"
                        
                        minlength="4">
                </div>
               
                <button type="submit" 
                    class="w-full bg-[#285b76] text-white p-2 rounded hover:bg-[#3989b4]">
                    Register
                </button>
                <p class="mt-4 text-center text-gray-600">
                    Already have an account? 
                    <a href="#" id="login-link" class="text-[#285b76]">Login</a>
                </p>
            </div>
        </div>
    `;


    const countrySelect = formElement.querySelector('#country');
    const phoneInput = formElement.querySelector('#phone');

    countrySelect.addEventListener('change', (e) => {
        const selectedCountry = e.target.value;
        if (selectedCountry && COUNTRY_CODES[selectedCountry]) {
            const oldNumber = phoneInput.value.replace(/^\+\d{3}/, '').trim();
            phoneInput.value = `${COUNTRY_CODES[selectedCountry]} ${oldNumber}`;
            phoneInput.placeholder = `${COUNTRY_CODES[selectedCountry]} XX XXX XX XX`;
        }
    });
  
  function clearErrors() {
    formElement.querySelectorAll('.text-red-500').forEach(el => el.remove());
    formElement.querySelectorAll('input, select').forEach(input => {
        input.classList.remove('border-red-500');
    });
}



  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
        clearErrors();

    const userData = {
      fullname: formElement.querySelector("#fullname").value,
      username: formElement.querySelector("#username").value,
      country: formElement.querySelector("#country").value,
      phone: formElement.querySelector("#phone").value,
      password: formElement.querySelector("#password").value,
      created_at: new Date().toISOString(),
    };

   try {
        validateForm(userData);
        if (await register(userData)) {
            alert("Account created successfully!");
            window.location.href = "/chat";
        }
    } catch (error) {
        const errors = JSON.parse(error.message);
        Object.entries(errors).forEach(([field, message]) => {
            const input = formElement.querySelector(`#${field}`);
            input.classList.add('border-red-500');
            const errorSpan = document.createElement('span');
            errorSpan.className = 'text-red-500 text-sm mt-1';
            errorSpan.textContent = message;
            input.parentNode.appendChild(errorSpan);
        });
    }
  });



  return formElement;
}
