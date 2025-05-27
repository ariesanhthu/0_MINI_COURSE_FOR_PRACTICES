import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createContext } from "react";
import TodoItem from "@/components/todo-item";

// Mock TodoContext
const mockDispatch = jest.fn();
const TodoContext = createContext({
  todos: [],
  dispatch: mockDispatch
});

// Wrapper component để provide context
const TodoWrapper = ({ children }: { children: React.ReactNode }) => (
  <TodoContext.Provider value={{ todos: [], dispatch: mockDispatch }}>
    {children}
  </TodoContext.Provider>
);

describe("TodoItem", () => {
  const baseTodo = { id: 1, title: "Learn Next.js", completed: false };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("hiển thị tiêu đề", () => {
    render(
      <TodoWrapper>
        <TodoItem todo={baseTodo} />
      </TodoWrapper>
    );
    expect(screen.getByText("Learn Next.js")).toBeInTheDocument();
  });

  it("hiển thị checkbox với trạng thái đúng", () => {
    render(
      <TodoWrapper>
        <TodoItem todo={baseTodo} />
      </TodoWrapper>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("hiển thị checkbox checked khi todo completed", () => {
    const completedTodo = { ...baseTodo, completed: true };
    render(
      <TodoWrapper>
        <TodoItem todo={completedTodo} />
      </TodoWrapper>
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("gọi dispatch TOGGLE khi click checkbox", async () => {
    render(
      <TodoWrapper>
        <TodoItem todo={baseTodo} />
      </TodoWrapper>
    );

    await userEvent.click(screen.getByRole("checkbox"));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "TOGGLE", payload: 1 });
  });

  it("gọi dispatch REMOVE khi bấm nút thùng rác", async () => {
    render(
      <TodoWrapper>
        <TodoItem todo={baseTodo} />
      </TodoWrapper>
    );

    await userEvent.click(screen.getByRole("button", { name: /delete task/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: "REMOVE", payload: 1 });
  });

  it("hiển thị text line-through khi todo completed", () => {
    const completedTodo = { ...baseTodo, completed: true };
    render(
      <TodoWrapper>
        <TodoItem todo={completedTodo} />
      </TodoWrapper>
    );
    const text = screen.getByText("Learn Next.js");
    expect(text).toHaveClass("line-through", "text-gray-400");
  });
});
