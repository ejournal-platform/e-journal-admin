import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export interface CreateAuthorizedUserRequest {
    nic: string;
    role: string;
    firstName: string;
    lastName: string;
}

export interface AuthorizedUserResponse {
    // Assuming the response matches the model or similar
    id?: string;
    nic: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    whatsAppNumber: number;
    district: string;
}

export const useCreateAuthorizedUser = () => {
    return useMutation({
        mutationFn: async (data: CreateAuthorizedUserRequest) => {
            const response = await client.post<AuthorizedUserResponse>('/users/authorize', data);
            return response.data;
        },
    });
};

export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    role?: string;
}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await client.get<AuthorizedUserResponse[]>('/users');
            return response.data;
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await client.delete(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateUserRequest }) => {
            const response = await client.put<AuthorizedUserResponse>(`/users/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};
