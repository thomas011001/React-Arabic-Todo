import type { TodoAction, TodoType } from "../types/Todo.type";

function reducer(state: TodoType[], action: TodoAction): TodoType[] {
  switch (action.type) {
    case "add": {
      return [...state, action.payload];
    }

    case "edit": {
      const { id, title, description } = action.payload;
      return state.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: title ?? todo.title,
              description: description ?? todo.description,
            }
          : todo
      );
    }

    case "remove": {
      const { id } = action.payload;
      return state.filter((todo) => todo.id !== id);
    }

    case "check": {
      const { id } = action.payload;
      return state.map((todo) =>
        todo.id === id ? { ...todo, isComeleted: !todo.isComeleted } : todo
      );
    }

    default:
      throw new Error("Unknown action");
  }
}

export default reducer;
