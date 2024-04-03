import { ReactNode } from "react";

export interface FormData {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
}

export interface TaskInterface {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
  taskListTitle: string;
  taskBoardId: number;
  taskBoard: string;
}

export interface addTask {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  taskListId: number;
  taskListTitle: string
}

export interface TasksState {
  tasks: TaskInterface[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface TaskList {
  id: number;
  title: string;
  taskBoardId: number;
}

export interface TaskListsState {
  taskLists: TaskList[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface TaskBoard {
  id: number;
  board: string;
}

export interface TaskBoardsState {
  taskBoards: TaskBoard[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface Activity {
  id: number,
  actionType: string;
  entityType: string;
  entityTypeId: number;
  createdAt: Date;
  log: {
    text: string,
    date: string
  };
}

export interface ActivityState {
  activity: Activity[];
  status: "loading" | "succeeded" | "failed" | "";
  error: string | null;
}

export interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export interface onClickButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  text?: string
}