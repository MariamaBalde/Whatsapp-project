import { saveContact } from "../../services/ContactService";
import { getCurrentUser } from "../../authentification/AuthService";


export function createAddContactForm() {
        const currentUser = getCurrentUser();

  const container = document.createElement("div");
  container.className = "flex flex-col h-full bg-[#111b21]";

  container.innerHTML = `
        <div class="h-[60px] bg-[#202c33] flex items-center px-4">
            <div class="flex items-center">
                <button class="mr-4 back-button">
                    <i class="fas fa-arrow-left text-[#00a884]"></i>
                </button>
                <h1 class="text-[#d8dadf] font-bold text-xl">Nouveau contact</h1>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
            <form id="contact-form" class="space-y-6">
                <div class="flex items-center mb-6">
                    <div class="w-12 h-12 rounded-full bg-[#202c33] flex items-center justify-center">
                        <i class="fa-solid fa-user text-[#d8dadf]"></i>
                    </div>
                </div>

                <div class="space-y-4">
                    <input type="text" 
                           placeholder="Prénom"
                           class="w-full p-3 bg-transparent text-[#d8dadf] border-b border-[#2a373f] outline-none"
                           id="firstname" required>

                    <input type="text" 
                           placeholder="Nom"
                           class="w-full p-3 bg-transparent text-[#1f2020] border-b border-[#2a373f] outline-none"
                           id="lastname" required>

                    <div class="flex space-x-3">
                        <select class="w-32 p-3 bg-transparent text-[#d8dadf] border-b border-[#2a373f] outline-none"
                                id="country">
                            <option value="SN">SN +221</option>
                            <option value="ML">ML +223</option>
                            <option value="CI">CI +225</option>
                            <option value="GN">GN +224</option>
                        </select>

                        <input type="tel" 
                               placeholder="Téléphone"
                               class="flex-1 p-3 bg-transparent text-[#d8dadf] border-b border-[#2a373f] outline-none"
                               id="phone" required>
                    </div>

                    <div class="">
                     <button type="submit" 
                        class="p-3 w-full mt-7 bg-[#00a884] text-white rounded-full hover:bg-[#029676]">
                        Enregistrer
                     </button>
                    </div>

                  
                </div>
            </form>
        </div>
    `;
    
    const firstnameInput = container.querySelector('#firstname');
    const lastnameInput = container.querySelector('#lastname');

    function updateInitials() {
        const firstname = firstnameInput.value.trim();
        const lastname = lastnameInput.value.trim();
        
        const initials = [firstname, lastname]
            .map(name => name ? name.charAt(0).toUpperCase() : '')
            .filter(initial => initial)
            .join('');
            
        // initialsSpan.textContent = initials || 'AN';
    }

    firstnameInput.addEventListener('input', updateInitials);
    lastnameInput.addEventListener('input', updateInitials);

  return container;
}
