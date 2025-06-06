import type { TodoAction, TodoType } from "@/types/Todo.type";
import { CircleCheckBig, SquarePen, Trash2, BadgeX } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TodoTitle({ children }: { children: string }) {
  return <h1 className="text-md font-bold">{children}</h1>;
}

function TodoDescription({ children }: { children: string }) {
  return <div className="description text-sm text-zinc-300">{children}</div>;
}

function TodoButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-1 rounded hover:bg-green-700 transition delay-50 ${className}`}
    >
      {children}
    </div>
  );
}

function Todo({
  children,
  todo,
  dispatch,
}: {
  children: ReactNode;
  todo: TodoType;
  dispatch: (action: TodoAction) => TodoType[];
}) {
  const handleComplete = () => {
    dispatch({ type: "check", payload: { id: todo.id } });
    toast.success("تم تعديل المهمة");
  };

  const handleRemove = () => {
    dispatch({ type: "remove", payload: { id: todo.id } });
    toast.success("تم حذف المهمة");
  };

  const handleEdit = (e: Event) => {
    e.preventDefault();
    dispatch({
      type: "edit",
      payload: {
        id: todo.id,
        title: title,
        description: description,
      },
    });
    toast.success("تم تعديل المهمة");
  };

  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  return (
    <div className="bg-sky-800 text-white w-1/1 rounded p-3 flex justify-between items-center shadow-black shadow-md hover:-translate-y-1 transition delay-50">
      <div className="flex flex-col gap-1 ">{children}</div>
      <div className="flex items-center gap-1 flex-col justify-center sm:flex-row">
        {!todo.isComeleted ? (
          <TodoButton>
            <CircleCheckBig onClick={handleComplete} />
          </TodoButton>
        ) : (
          <TodoButton className="hover:bg-red-900 ">
            <BadgeX onClick={handleComplete} />
          </TodoButton>
        )}

        <Dialog>
          <DialogTrigger>
            <TodoButton>
              <SquarePen />
            </TodoButton>
          </DialogTrigger>
          <DialogContent className="rounded">
            <DialogHeader>
              <DialogTitle className="text-center">تعديل المهمة</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="flex flex-col gap-3">
              <Label htmlFor="title">عنوان المهمه:</Label>
              <Input
                id="title"
                placeholder="عنوان المهمه"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded bg-zinc-900  "
              />
              <Label htmlFor="desc  ">شرح المهمه:</Label>
              <Input
                id="desc  "
                placeholder="شرح المهمه"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded bg-zinc-900"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <DialogClose asChild>
                  <Button
                    asChild
                    className="bg-white hover:bg-white/90! text-black"
                  >
                    <input type="submit" value={"تعديل"} />
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button asChild>
                    <input type="submit" value={"الغاء"} />
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <TodoButton className="hover:bg-red-900">
              <Trash2 />
            </TodoButton>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded">
            <AlertDialogHeader className="sm:text-right">
              <AlertDialogTitle>
                هل انت متاكد من حذف هذه المهمة؟
              </AlertDialogTitle>
              <AlertDialogDescription>
                اذا مسحت المهمة فلا يمكن اعادتها مجددا ابدا.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-start">
              <AlertDialogAction
                className="bg-white hover:bg-white/90! text-black"
                onClick={handleRemove}
              >
                حذف
              </AlertDialogAction>
              <AlertDialogCancel className="bg-zinc-800 text-white shadow-xs hover:bg-zinc-800/90 rounded">
                الغاء
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export { Todo, TodoTitle, TodoDescription };
