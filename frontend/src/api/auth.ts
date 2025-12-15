import api from './client';
import type { AuthResponse } from '../types';

export const login = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    return data;
};

export const register = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', { email, password });
    return data;
};
