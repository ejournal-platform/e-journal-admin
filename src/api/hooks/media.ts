import { useMutation } from '@tanstack/react-query';
import client from '../client';

export interface MediaUploadRequest {
    fileName: string;
    type: string;
}

export interface MediaUploadResponse {
    mediaId: string;
    uploadUrl: string;
}

export const useUploadMedia = () => {
    return useMutation({
        mutationFn: async (data: MediaUploadRequest) => {
            const response = await client.post<MediaUploadResponse>('/media/upload', data);
            return response.data;
        },
    });
};
