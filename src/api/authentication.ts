import { sendPost } from './axios';

export const signIn = (payload: any) => sendPost('/auth/sign-in', payload);
export const signUp = (payload: any) => sendPost('/auth/sign-up', payload);
