// server/api/todos/[id].patch.ts
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const fields: string[] = []
    const values: any[] = []

    if (body.task !== undefined) {
        fields.push('task = ?')
        values.push(body.task)
    }
    if (body.deadline !== undefined) {
        fields.push('deadline = ?')
        values.push(body.deadline)
    }
    if (body.done !== undefined) {
        fields.push('done = ?')
        values.push(body.done ? 1 : 0)
    }

    if (fields.length === 0) {
        return { success: false, message: 'No fields to update' }
    }

    values.push(id)
    db.prepare(`UPDATE todos SET ${fields.join(', ')} WHERE id = ?`).run(...values)

    return { success: true }
})