import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactElement,
} from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Tabs } from "@/components/ui/tabs";
import { Todo, TodoTitle, TodoDescription } from "./components/Todo";
import Todos from "./components/Todos";
import AddingTodo from "./components/AddingTodo";
import reducer from "./reducers/todos.reducer";
import { Toaster } from "sonner";
// import { v4 as uuidv4 } from "uuid";

function App(): ReactElement {
  useEffect(() => {
    if (!localStorage.getItem("todos")) {
      localStorage.setItem("todos", "[]");
    }
  }, []);

  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const [tab, setTab] = useState<"all" | "done" | "undone">("all");

  const doneTodo = useMemo(
    () => todos.filter((todo) => todo.isComeleted),
    [todos]
  );

  const unDoneTodo = useMemo(
    () => todos.filter((todo) => !todo.isComeleted),
    [todos]
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="min-h-dvh bg-zinc-800 flex justify-center items-center font-display p-3">
        <div className="bg-white p-5 max-w-100 w-1/1 rounded text-black flex flex-col gap-6 items-center">
          <Header />
          <Tabs defaultValue="all">
            <Nav handleChanginTabs={setTab} />
          </Tabs>
          <Todos>
            {(tab === "all"
              ? todos
              : tab === "done"
              ? doneTodo
              : unDoneTodo
            ).map((todo) => {
              return (
                <Todo key={todo.id.toString()} dispatch={dispatch} todo={todo}>
                  <TodoTitle>{todo.title}</TodoTitle>
                  {todo.description ? (
                    <TodoDescription>{todo.description}</TodoDescription>
                  ) : null}
                </Todo>
              );
            })}
          </Todos>
          <AddingTodo dispatch={dispatch} />
        </div>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

export default App;
