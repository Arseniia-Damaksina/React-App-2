import axios, { AxiosResponse } from 'axios';
import { TaskList } from '../types/types';
import { API_BASE_URL } from '../utils/url';

export const fetchTaskLists = async (): Promise<AxiosResponse<TaskList[]>> => {
  try {
    const response = await axios.get<TaskList[]>(`${API_BASE_URL}/tasklists`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch task lists');
  }
};

export const createTaskList = async (title: string): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.post<TaskList>(`${API_BASE_URL}/tasklists`, { title });
    return response;
  } catch (error) {
    throw new Error('Failed to create task list');
  }
};

export const updateTaskList = async (taskListId: number, title: string): Promise<AxiosResponse<TaskList>> => {
  try {
    const response = await axios.put<TaskList>(`${API_BASE_URL}/tasklists/${taskListId}/update`, { title });
    return response;
  } catch (error) {
    throw new Error('Failed to edit task list');
  }
};

export const deleteTaskList = async (taskListId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/tasklists/${taskListId}/delete`);
  } catch (error) {
    throw new Error('Failed to delete task list');
  }
};