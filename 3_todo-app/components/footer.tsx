"use client"

import { useContext } from "react"
import { TodoContext } from "@/app/page"

export default function Footer() {
  const { state, dispatch } = useContext(TodoContext)

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ]

  const activeCount = state.todos.filter((todo) => !todo.completed).length
  const completedCount = state.todos.filter((todo) => todo.completed).length

  return (
    <footer className="bg-gray-50 px-4 py-3 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">{activeCount} items left</div>

        <div className="flex space-x-1">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => dispatch({ type: "SET_FILTER", payload: filter.value })}
              className={`px-2 py-1 text-sm rounded ${
                state.filter === filter.value ? "bg-black text-white" : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500">{completedCount} completed</div>
      </div>
    </footer>
  )
}
