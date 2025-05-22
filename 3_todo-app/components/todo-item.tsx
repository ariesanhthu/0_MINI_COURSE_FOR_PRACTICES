"use client"

import { useContext } from "react"
import { TodoContext } from "@/app/page"
import { Trash } from "lucide-react"

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext)

  return (
    <li className="py-3 flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <span className={`ml-3 ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.title}</span>
      </div>
      <button
        onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}
        className="text-red-500 hover:text-red-700"
        aria-label="Delete task"
      >
        <Trash size={18} />
      </button>
    </li>
  )
}
