import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { TodoAction } from "@/types/Todo.type";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

function AddingTodo({ dispatch }: { dispatch: (action: TodoAction) => void }) {
  const [title, setTitle] = useState("");

  const handleAdding = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    dispatch({
      type: "add",
      payload: { id: uuidv4(), title: title, isComeleted: false },
    });
    toast.success("تم اضافة مهمة");
  };

  return (
    <form className="w-1/1" onSubmit={handleAdding}>
      <div className="flex gap-1">
        <Input
          className="rounded border-1 border-zinc-800"
          placeholder="عنوان المهمة"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Button asChild>
          <input type="submit" value={"اضافة"} />
        </Button>
      </div>
    </form>
  );
}

export default AddingTodo;
