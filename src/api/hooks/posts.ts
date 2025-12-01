import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client';

export interface PostWithDetailsResponse {
    id: string;
    caption: string;
    author: {
        id: string;
        firstName: string;
        lastName: string;
        profileMediaId: string;
        profileMediaUrl?: string;
    };
    mediaUrls: string[];
    likesCount: number;
    downloadCount: number;
    comments: any[];
    createdAt: string;
    isLiked: boolean;
    status: string;
}

export const usePendingPosts = () => {
    return useQuery({
        queryKey: ['pendingPosts'],
        queryFn: async () => {
            const response = await client.get<PostWithDetailsResponse[]>('/posts/pending');
            return response.data;
        },
    });
};

export const useApprovePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await client.post(`/posts/${id}/approve`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingPosts'] });
        },
    });
};

export const useRejectPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await client.post(`/posts/${id}/reject`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingPosts'] });
        },
    });
};
