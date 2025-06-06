import type { UUIDTypes } from "uuid";

export type TodoType = {
  id: UUIDTypes;
  title: string;
  description?: string;
  isComeleted: boolean;
};

export type TodoAction =
  | {
      type: "edit";
      payload: { id: UUIDTypes; title?: string; description?: string };
    }
  | {
      type: "remove";
      payload: { id: UUIDTypes };
    }
  | {
      type: "check";
      payload: { id: UUIDTypes };
    }
  | {
      type: "add";
      payload: TodoType;
    };
