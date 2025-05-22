"use client"

import TodoItem from "./todo-item"

export default function TodoList({ todos }) {
  if (todos.length === 0) {
    return <div className="text-center text-gray-500 py-4">free! 🍵</div>
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
