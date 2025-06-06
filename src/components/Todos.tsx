import type { ReactNode } from "react";

function Todos({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5 w-1/1">{children}</div>;
}

export default Todos;
