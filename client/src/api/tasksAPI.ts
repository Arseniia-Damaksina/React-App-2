import axios, { AxiosResponse } from 'axios';
import { TaskInterface, addTask } from '../types/types';
import { API_BASE_URL } from '../utils/url';

export const fetchTasks = async (): Promise<AxiosResponse<TaskInterface[]>> => {
  try {
    const response = await axios.get<TaskInterface[]>(`${API_BASE_URL}/tasks`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

export const createTask = async (task: addTask): Promise<AxiosResponse<addTask>> => {
  try {
    const response = await axios.post<TaskInterface>(`${API_BASE_URL}/tasks`, task);
    return response;
  } catch (error) {
    throw new Error('Failed to add task');
  }
};

export const updateTask = async (taskId: number, updatedTask: addTask): Promise<AxiosResponse<TaskInterface>> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}/update`, updatedTask);
    return response;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}/delete`);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};
