import axios, { AxiosResponse } from 'axios';
import { TaskBoard } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTaskBoards = async (): Promise<AxiosResponse<TaskBoard[]>> => {
  try {
    const response = await axios.get<TaskBoard[]>(`${API_BASE_URL}/taskboards`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch task boards');
  }
};

export const createTaskBoard = async (board: string): Promise<AxiosResponse<TaskBoard>> => {
  try {
    const response = await axios.post<TaskBoard>(`${API_BASE_URL}/taskboards`, { board });
    return response;
  } catch (error) {
    throw new Error('Failed to create task board');
  }
};

export const updateTaskBoard = async (taskBoardId: number, board: string): Promise<AxiosResponse<TaskBoard>> => {
  try {
    const response = await axios.put<TaskBoard>(`${API_BASE_URL}/taskboards/${taskBoardId}/update`, { board });
    return response;
  } catch (error) {
    throw new Error('Failed to edit task board');
  }
};

export const deleteTaskBoard = async (taskBoardId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/taskboards/${taskBoardId}/delete`);
  } catch (error) {
    throw new Error('Failed to delete task board');
  }
};