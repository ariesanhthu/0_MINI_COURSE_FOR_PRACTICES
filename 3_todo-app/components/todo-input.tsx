"use client"

import { useState, useContext } from "react"
import { TodoContext } from "@/app/page"

export default function TodoInput() {
  const [text, setText] = useState("")
  const { dispatch } = useContext(TodoContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch({ type: "ADD", payload: text })
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center border-b-2 border-black py-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-black hover:bg-gray border-white hover:border-blue text-sm border-4 text-white py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </form>
  )
}
