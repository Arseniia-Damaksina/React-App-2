import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskInterface, addTask, TasksState } from "../types/types";
import { RootState } from "../store/rootReducer";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasksAPI";

const initialState: TasksState = {
  tasks: [],
  status: "",
  error: null,
};

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await fetchTasks();
      return response.data as TaskInterface[];
    } catch (error) {
      throw new Error("Failed to fetch tasks");
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (task: addTask) => {
    try {
      const response = await createTask(task);
      return response.data as TaskInterface;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedTask }: { taskId: number, updatedTask: addTask }) => {
    try {
      await updateTask(taskId, updatedTask);
      return updatedTask;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
    try {
      await deleteTask(taskId);
      return taskId;
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  }
);


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      });
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;

export default taskSlice.reducer;
