import axios, { AxiosResponse } from 'axios';
import { TaskList } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTaskLists = async (): Promise<AxiosResponse<TaskList[]>> => {
  try {
    const response = await axios.get<TaskList[]>(`${API_BASE_URL}/tasklists`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch task lists');
  }
};

export const createTaskList = async (title: string, taskBoardId: number): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.post<TaskList>(`${API_BASE_URL}/tasklists`, { title, taskBoardId });
    return response;
  } catch (error) {
    throw new Error('Failed to create task list');
  }
};

export const updateTaskList = async (taskBoardId: number, taskListId: number, title: string): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.put<TaskList>(`${API_BASE_URL}/tasklists/${taskBoardId}/${taskListId}/update`, { title, taskBoardId });
    return response;
  } catch (error) {
    throw new Error('Failed to edit task list');
  }
};

export const deleteTaskList = async (taskBoardId: number, taskListId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/tasklists/${taskBoardId}/${taskListId}/delete`);
  } catch (error) {
    throw new Error('Failed to delete task list');
  }
};