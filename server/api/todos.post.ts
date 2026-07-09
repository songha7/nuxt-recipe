// server/api/todos.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const stmt = db.prepare(
        'INSERT INTO todos (task, deadline, done) VALUES (?, ?, ?)'
    )
    const result = stmt.run(body.task, body.deadline, body.done ? 1 : 0)
    return { id: result.lastInsertRowid }
})