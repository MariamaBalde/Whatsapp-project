import { logout } from "../../authentification/AuthService";

export function createSettingsView() {
  const settingsView = document.createElement("div");
  settingsView.className =
    "w-[420px] flex flex-col bg-[#2d6a97] border-r border-[#2a373f]";

  settingsView.innerHTML = `
        <div class="h-[60px] bg-[#feffff] flex items-center px-4">
            <h1 class="text-[#292a2b] font-bold text-xl">Paramètres</h1>
        </div>
        <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center p-3 hover:bg-[#202c33] cursor-pointer rounded-lg">
                <i class="fa-solid fa-key text-2xl text-[#d8dadf] mr-4"></i>
                <div>
                    <h3 class="text-[#e9edef] text-xl font-bold">Confidentialité</h3>
                    <p class="text-[#8696a0] text-sm">Blocage, timing des messages</p>
                </div>
            </div>
            <div class="flex items-center p-3 hover:bg-[#202c33] cursor-pointer rounded-lg">
                <i class="fa-solid fa-bell text-2xl text-[#d8dadf] mr-4"></i>
                <div>
                    <h3 class="text-[#e9edef] text-xl font-bold">Notifications</h3>
                    <p class="text-[#8696a0] text-sm">Sons des messages, groupes</p>
                </div>
            </div>
               <div class="flex items-center p-3 hover:bg-[#202c33] cursor-pointer rounded-lg  logout-button">
               <i class="fa-solid fa-arrow-right-from-bracket mr-6" style="color: #ed0741;"></i>
                <div>
                    <h3 class="text-[#ed0741] text-xl font-bold">Se déconnecter</h3>
                </div>
            </div>
            <!-- Autres options de paramètres -->
        </div>
    `;
  const logoutButton = settingsView.querySelector(".logout-button");
  logoutButton.addEventListener("click", () => {
    logout();
    history.pushState(null, "", "/login");
    window.location.reload();
  });
  return settingsView;
}
