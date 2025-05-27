import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { act } from "react"
import "@testing-library/jest-dom"
import Home, { TodoContext } from "../app/page"

// Mock các components
jest.mock("@/components/header", () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>
  }
})

jest.mock("@/components/todo-input", () => {
  return function MockTodoInput() {
    return <div data-testid="todo-input">Todo Input</div>
  }
})

jest.mock("@/components/todo-list", () => {
  return function MockTodoList({ todos }: { todos: any[] }) {
    return (
      <div data-testid="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} data-testid={`todo-${todo.id}`}>
            {todo.title} - {todo.completed ? "completed" : "active"}
          </div>
        ))}
      </div>
    )
  }
})

jest.mock("@/components/footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>
  }
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders tất cả components chính", () => {
    render(<Home />)

    expect(screen.getByTestId("header")).toBeInTheDocument()
    expect(screen.getByTestId("todo-input")).toBeInTheDocument()
    expect(screen.getByTestId("todo-list")).toBeInTheDocument()
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })

  it("render với layout đúng", () => {
    render(<Home />)

    const container = screen.getByTestId("header").closest(".max-w-md")
    expect(container).toHaveClass("max-w-md", "mx-auto", "bg-white", "rounded-lg", "shadow-md")
  })

  it("provides TodoContext with initial state", () => {
    let contextValue: any

    function TestComponent() {
      const context = React.useContext(TodoContext)
      contextValue = context
      return null
    }

    render(
      <>
        <Home />
        <TestComponent />
      </>
    )

    expect(contextValue).toBeDefined()
    expect(contextValue.state).toBeDefined()
    expect(contextValue.dispatch).toBeDefined()
    expect(contextValue.state.todos).toEqual([])
    expect(contextValue.state.filter).toBe("all")
  })

  it("loads dữ liệu từ localStorage khi khởi tạo", async () => {
    const mockTodos = [
      { id: 1, title: "Test todo", completed: false },
      { id: 2, title: "Another todo", completed: true },
    ]

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTodos))

    await act(async () => {
      render(<Home />)
    })

    await waitFor(() => {
      expect(localStorageMock.getItem).toHaveBeenCalledWith("todos")
      expect(screen.getByTestId("todo-list")).toBeInTheDocument()
    })
  })

  it("lưu todos vào localStorage khi state thay đổi", async () => {
    localStorageMock.getItem.mockReturnValue(null)

    await act(async () => {
      render(<Home />)
    })

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith("todos", "[]")
    })
  })

  it("xử lý localStorage error gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("localStorage error")
    })

    await act(async () => {
      render(<Home />)
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading from localStorage:", expect.any(Error))
    consoleErrorSpy.mockRestore()
  })

  it("filters todos dựa trên filter state", () => {
    const mockTodos = [
      { id: 1, title: "Active todo", completed: false },
      { id: 2, title: "Completed todo", completed: true },
      { id: 3, title: "Another active", completed: false },
    ]

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTodos))

    render(<Home />)

    // Với filter "all", hiển thị tất cả todos
    expect(screen.getByText("Active todo - active")).toBeInTheDocument()
    expect(screen.getByText("Completed todo - completed")).toBeInTheDocument()
    expect(screen.getByText("Another active - active")).toBeInTheDocument()
  })

  it("xử lý invalid JSON trong localStorage", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    localStorageMock.getItem.mockReturnValue("invalid json")

    await act(async () => {
      render(<Home />)
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading from localStorage:", expect.any(Error))
    consoleErrorSpy.mockRestore()
  })
})
