export const users = [
    {
        username: 'mrocher',
        password: '$2y$10$eqQ6Lh6OErlyiJcJXuq17eRv.i/s10gGknNr1jchXLSce5tbIM8CO',
    }
];




export function addUser(username:string, password:string) {
    // Vérifie si l'utilisateur existe déjà
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        throw new Error("L'utilisateur existe déjà."); // Lève une erreur si l'utilisateur existe
    }

    // Ajoute le nouvel utilisateur
    users.push({ username, password });
    return { success: true, message: "Utilisateur ajouté avec succès." };
}
