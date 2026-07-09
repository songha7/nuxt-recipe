// server/api/todos.get.ts
export default defineEventHandler(() => {
  return db.prepare('SELECT * FROM todos').all()
})