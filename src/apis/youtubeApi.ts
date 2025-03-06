import type {YoutubeResponse} from '@/types/YoutubeResponse';
import {youtubeApiInstance} from '@/utils/axiosInstance';

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY; // API 키 가져오기

export const fetchYoutube = async (keyword: string): Promise<YoutubeResponse> => {
  try {
    const parameters = {
      q: keyword,
      type: 'video',
      maxResults: '2',
      videoDuration: 'medium',
      videoEmbeddable: true,
    };
    const response = await youtubeApiInstance.get<YoutubeResponse>('/search', {params: parameters});
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching youtube:', error);
    throw error;
  }
};
