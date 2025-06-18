// src/services/GroupService.js
import { API_URL } from "../config/constants";

export async function getGroups() {
    const response = await fetch(`${API_URL}/groupes`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des groupes");
    return await response.json();
}

export async function saveGroup(groupData) {
    const group = {
        id: crypto.randomUUID(),
        name: groupData.name,
        members: groupData.members, // tableau d'IDs de contacts
        createdAt: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/groupes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group)
    });

    if (!response.ok) throw new Error("Erreur lors de la création du groupe");
    return await response.json();
}



