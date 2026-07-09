// server/api/todos/[id].delete.ts
export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')
    db.prepare('DELETE FROM todos WHERE id = ?').run(id)
    return { success: true }
})