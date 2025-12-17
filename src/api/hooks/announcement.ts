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
    mediaId?: string;
    publishDate?: string;
}

export interface UpdateAnnouncementRequest {
    title: string;
    content: string;
    mediaId?: string;
    publishDate?: string;
}

export const useGetAnnouncements = () => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            console.log('🔵 Fetching announcements from API: /announcements/announcements');
            try {
                const response = await client.get<Announcement[]>('/announcements/announcements');
                console.log('✅ Announcements fetched successfully:', response.data);
                return response.data;
            } catch (error) {
                console.error('❌ Error fetching announcements:', error);
                throw error;
            }
        },
    });
};

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateAnnouncementRequest) => {
            console.log('🔵 Creating announcement:', data);
            try {
                const response = await client.post('/announcements/announcements', data);
                console.log('✅ Announcement created successfully:', response.data);
                return response.data;
            } catch (error) {
                console.error('❌ Error creating announcement:', error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log('✅ Announcement created, invalidating cache...');
            // Invalidate relevant queries if any, e.g., 'announcements'
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};

export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateAnnouncementRequest }) => {
            console.log('🔵 Updating announcement:', id, data);
            try {
                const response = await client.put(`/announcements/announcements/${id}`, data);
                console.log('✅ Announcement updated successfully:', response.data);
                return response.data;
            } catch (error) {
                console.error('❌ Error updating announcement:', error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log('✅ Announcement updated, invalidating cache...');
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            console.log('🔵 Deleting announcement:', id);
            try {
                const response = await client.delete(`/announcements/announcements/${id}`);
                console.log('✅ Announcement deleted successfully:', response.data);
                return response.data;
            } catch (error) {
                console.error('❌ Error deleting announcement:', error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log('✅ Announcement deleted, invalidating cache...');
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
        },
    });
};
