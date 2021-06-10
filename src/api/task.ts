import { sendGet } from './axios';

export const getTaskList = (params: any) => sendGet('/tasks', params);
