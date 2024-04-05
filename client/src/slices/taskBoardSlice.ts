import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskBoard, TaskBoardsState } from "../types/types";
import { RootState } from "../store/rootReducer";
import {
  createTaskBoard,
  deleteTaskBoard,
  fetchTaskBoards,
  updateTaskBoard,
} from "../api/taskBoardsAPI";

const initialState: TaskBoardsState = {
  taskBoards: [],
  status: "",
  error: null,
};

export const fetchTaskBoardsAsync = createAsyncThunk(
  "taskBoards/fetchTaskBoards",
  async () => {
    try {
      const response = await fetchTaskBoards();
      return response.data as TaskBoard[];
    } catch (error) {
      throw new Error("Failed to fetch task boards");
    }
  }
);

export const createTaskBoardAsync = createAsyncThunk(
  "taskBoards/createTaskBoard",
  async (board: string) => {
    try {
      const response = await createTaskBoard(board);
      return response.data as TaskBoard;
    } catch (error) {
      throw new Error("Failed to create task board");
    }
  }
);

export const updateTaskBoardAsync = createAsyncThunk(
  "taskBoards/updateTaskBoard",
  async ({
    taskBoardId,
    updatedBoard,
  }: {
    taskBoardId: number;
    updatedBoard: string;
  }) => {
    try {
      await updateTaskBoard(taskBoardId, updatedBoard);
      return { taskBoardId, updatedBoard };
    } catch (error) {
      throw new Error("Failed to edit task board");
    }
  }
);

export const deleteTaskBoardAsync = createAsyncThunk(
  "taskBoards/deleteTaskBoard",
  async (taskBoardId: number) => {
    try {
      await deleteTaskBoard(taskBoardId);
      return taskBoardId;
    } catch (error) {
      throw new Error("Failed to delete task board");
    }
  }
);

const taskBoardsSlice = createSlice({
  name: "taskBoards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskBoardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskBoardsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskBoards = action.payload;
      })
      .addCase(fetchTaskBoardsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(createTaskBoardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTaskBoardAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskBoards.push(action.payload);
      })
      .addCase(createTaskBoardAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(updateTaskBoardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskBoardAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { taskBoardId, updatedBoard } = action.payload;
        const updatedTaskBoard = state.taskBoards.find(
          (taskBoard) => taskBoard.id === taskBoardId
        );
        if (updatedTaskBoard) {
          updatedTaskBoard.board = updatedBoard;
        }
      })
      .addCase(updateTaskBoardAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      })
      .addCase(deleteTaskBoardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTaskBoardAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskBoards = state.taskBoards.filter(
          (taskBoard) => taskBoard.id !== action.payload
        );
      })
      .addCase(deleteTaskBoardAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string | null;
      });
  },
});

export const selectTaskBoards = (state: RootState) =>
  state.taskBoards.taskBoards;

export default taskBoardsSlice.reducer;
