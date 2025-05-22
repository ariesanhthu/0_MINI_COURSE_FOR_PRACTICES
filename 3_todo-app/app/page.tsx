"use client"

import { useEffect, useReducer, createContext } from "react"
import Header from "@/components/header"
import TodoInput from "@/components/todo-input"
import TodoList from "@/components/todo-list"
import Footer from "@/components/footer"

// Define the TodoContext
export const TodoContext = createContext(null)

// Define the initial state
const initialState = {
  todos: [],
  filter: "all",
}

// Define the reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        todos: action.payload,
      }
    case "ADD":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            title: action.payload,
            completed: false,
          },
        ],
      }
    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      }
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}

// Custom hook for localStorage persistence
function usePersistentState(key, initialValue) {
  const [state, dispatch] = useReducer(todoReducer, initialValue)

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue) {
        dispatch({ type: "INIT", payload: JSON.parse(storedValue) })
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
  }, [key])

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state.todos))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }, [key, state.todos])

  return [state, dispatch]
}

export default function Home() {
  const [state, dispatch] = usePersistentState("todos", initialState)

  // Filter todos based on current filter
  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed
    if (state.filter === "completed") return todo.completed
    return true // "all" filter
  })

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Header />
          <div className="p-6">
            <TodoInput />
            <TodoList todos={filteredTodos} />
          </div>
          <Footer />
        </div>
      </div>
    </TodoContext.Provider>
  )
}
