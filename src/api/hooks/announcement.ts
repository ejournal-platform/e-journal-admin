import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export interface Announcement {
    id: number;
    title: string;
    content: string;
    imageUrl?: string | null;
    publishDate?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAnnouncementRequest {
    title: string;
    content: string;
    imageUrl?: string;
    publishDate?: string;
}

export const useGetAnnouncements = () => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await client.get<Announcement[]>('/admin/announcement');
            return response.data;
        },
    });
};

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateAnnouncementRequest) => {
            const response = await client.post('/admin/announcement', data);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate relevant queries if any, e.g., 'announcements'
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};
