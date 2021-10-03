const users = []

export function addUser(id, username, room) {
    const user = { id, username, room }
    users.push(user)
    return user
}
export function getCurrentUser(id) {
    return users.find(user => user.id === id)
}