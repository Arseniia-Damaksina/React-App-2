import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskList, TaskListsState } from "../types/types";
import { RootState } from "../store/rootReducer";
import { fetchTaskLists, createTaskList, deleteTaskList, updateTaskList } from "../api/taskListsAPI";

const initialState: TaskListsState = {
  taskLists: [],
  status: "",
  error: null,
};

export const fetchTaskListsAsync = createAsyncThunk(
  "taskLists/fetchTaskLists",
  async () => {
    try {
      const response = await fetchTaskLists();
      return response.data as TaskList[];
    } catch (error) {
      throw new Error("Failed to fetch task lists");
    }
  }
);

export const createTaskListAsync = createAsyncThunk(
  "taskLists/createTaskList",
  async (title: string) => {
    try {
      const response = await createTaskList(title);
      return response.data as TaskList;
    } catch (error) {
      throw new Error("Failed to create task list");
    }
  }
);

export const updateTaskListAsync = createAsyncThunk(
  "taskLists/updateTaskList",
  async ({ taskListId, updatedTitle }: { taskListId: number, updatedTitle: string }) => {
    try {
      await updateTaskList(taskListId, updatedTitle);
      return { taskListId, updatedTitle };
    } catch (error) {
      throw new Error("Failed to edit task list");
    }
  }
);

export const deleteTaskListAsync = createAsyncThunk(
  "taskLists/deleteTaskList",
  async (taskListId: number) => {
    try {
      await deleteTaskList(taskListId);
      return taskListId;
    } catch (error) {
      throw new Error("Failed to delete task list");
    }
  }
);

const taskListsSlice = createSlice({
  name: "taskLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskListsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskListsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskLists = action.payload;
      })
      .addCase(fetchTaskListsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(createTaskListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTaskListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskLists.push(action.payload);
      })
      .addCase(createTaskListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(updateTaskListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { taskListId, updatedTitle } = action.payload;
        const taskListIndex = state.taskLists.findIndex(taskList => taskList.id === taskListId);
        if (taskListIndex !== -1) {
          state.taskLists[taskListIndex].title = updatedTitle;
        }
      })
      .addCase(updateTaskListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(deleteTaskListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskLists = state.taskLists.filter(taskList => taskList.id !== action.payload);
      })
      .addCase(deleteTaskListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      });
  },
});

export const selectTaskLists = (state: RootState) => state.taskLists.taskLists;

export default taskListsSlice.reducer;
