import api from './client';
import type { Sweet } from '../types';

export const getSweets = async () => {
    const { data } = await api.get<Sweet[]>('/sweets');
    return data;
};

export const searchSweets = async (params: { name?: string; category?: string; minPrice?: number; maxPrice?: number }) => {
    const { data } = await api.get<Sweet[]>('/sweets/search', { params });
    return data;
};

export const createSweet = async (sweet: Omit<Sweet, 'id'>) => {
    const { data } = await api.post<Sweet>('/sweets', sweet);
    return data;
};

export const updateSweet = async (id: string, sweet: Partial<Sweet>) => {
    const { data } = await api.put<Sweet>(`/sweets/${id}`, sweet);
    return data;
};

export const deleteSweet = async (id: string) => {
    const { data } = await api.delete<{ message: string }>(`/sweets/${id}`);
    return data;
};

export const purchaseSweet = async (id: string) => {
    const { data } = await api.post<{ message: string }>(`/sweets/${id}/purchase`);
    return data;
};

export const restockSweet = async (id: string, quantity: number) => {
    const { data } = await api.post<{ message: string }>(`/sweets/${id}/restock`, { quantity });
    return data;
};
