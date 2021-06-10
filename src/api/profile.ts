import { sendGet } from './axios';

export const getProfile = (params?: any) => sendGet('/users/profile', params);
