// src/composant/contacts/GroupCreationView.js
// import { getContacts } from "../../services/ContactService";
// import { saveGroup } from "../../services/GroupeService";
// import { createNewContactView } from "../contacts/NewContactView";

// export function createGroupCreationView() {
//     const container = document.createElement("div");
//     container.className = "p-4 h-full bg-white overflow-y-auto";

//     container.innerHTML = `
//         <h2 class="text-xl font-bold text-[#202c33] mb-4">Créer un groupe</h2>
//         <input type="text" id="group-name" placeholder="Nom du groupe" class="w-full p-2 border rounded mb-4" />
//         <div class="mb-4">
//             <h3 class="font-semibold text-[#202c33] mb-2">Sélectionner les membres :</h3>
//             <div id="contact-checkboxes" class="space-y-2"></div>
//         </div>
//         <button id="create-group" class="bg-[#00a884] text-white px-4 py-2 rounded hover:bg-[#029f79]">Créer</button>
//     `;

//     const contactContainer = container.querySelector("#contact-checkboxes");

//     getContacts().then(contacts => {
//         contacts.forEach(contact => {
//             const div = document.createElement("div");
//             div.className = "flex items-center space-x-2";
//             div.innerHTML = `
//                 <input type="checkbox" id="contact-${contact.id}" value="${contact.id}" class="contact-checkbox" />
//                 <label for="contact-${contact.id}" class="text-[#202c33]">${contact.name}</label>
//             `;
//             contactContainer.appendChild(div);
//         });
//     });

//   container.querySelector("#create-group").addEventListener("click", async () => {
//     const groupName = container.querySelector("#group-name").value.trim();
//     const selectedIds = Array.from(container.querySelectorAll(".contact-checkbox:checked")).map(cb => cb.value);

//     if (!groupName || selectedIds.length < 2) {
//         alert("Entrez un nom de groupe et sélectionnez au moins deux membres.");
//         return;
//     }

//     try {
//         await saveGroup({ name: groupName, members: selectedIds });

//         // Retour à la vue principale
//         const mainSection = document.querySelector("#main-section");
//         if (mainSection) {
//             mainSection.innerHTML = '';
//             mainSection.appendChild(createNewContactView());
//         }
//     } catch (error) {
//         alert("Erreur lors de la création du groupe : " + error.message);
//     }
// });

//     return container;
// }


// src/composant/contacts/GroupCreationView.js
import { getContacts } from "../../services/ContactService";
import { saveGroup } from "../../services/GroupeService";
import { createNewContactView } from "../contacts/NewContactView.js";

export function createGroupCreationView() {
    const container = document.createElement("div");
    container.className = "p-4 h-full bg-white overflow-y-auto";

    container.innerHTML = `
        <h2 class="text-xl font-bold text-[#202c33] mb-4">Créer un groupe</h2>
        <input type="text" id="group-name" placeholder="Nom du groupe" class="w-full p-2 border rounded mb-4" />
        <div class="mb-4">
            <h3 class="font-semibold text-[#202c33] mb-2">Sélectionner les membres :</h3>
            <div id="contact-checkboxes" class="space-y-2"></div>
        </div>
        <button id="create-group" class="bg-[#00a884] text-white px-4 py-2 rounded hover:bg-[#029f79]">Créer</button>
    `;

    const contactContainer = container.querySelector("#contact-checkboxes");

    getContacts().then(contacts => {
        contacts.forEach(contact => {
            const div = document.createElement("div");
            div.className = "flex items-center space-x-2";

            div.innerHTML = `
                <input type="checkbox" id="contact-${contact.id}" value="${contact.id}" class="contact-checkbox" />
                <label for="contact-${contact.id}" class="text-[#202c33]">${contact.name}</label>
            `;
            contactContainer.appendChild(div);
        });
    });

    container.querySelector("#create-group").addEventListener("click", async () => {
        const groupName = container.querySelector("#group-name").value.trim();
        const selectedIds = Array.from(container.querySelectorAll(".contact-checkbox:checked")).map(cb => cb.value);

        if (!groupName || selectedIds.length < 2) {
            alert("Entrez un nom de groupe et sélectionnez au moins deux membres.");
            return;
        }

        try {
            await saveGroup({ name: groupName, members: selectedIds });

            // Retour à la vue des groupes après création
            const mainSection = document.querySelector("#main-section");
            if (mainSection) {
                mainSection.innerHTML = '';
                
                // Charger la vue des groupes pour voir le nouveau groupe
                try {
                    const { createGroupsListView } = await import("./GroupsListView.js");
                    mainSection.appendChild(createGroupsListView());
                } catch (error) {
                    // Fallback vers la vue des contacts
                    mainSection.appendChild(createNewContactView());
                }
            }
        } catch (error) {
            alert("Erreur lors de la création du groupe : " + error.message);
        }
    });

    return container;
}
