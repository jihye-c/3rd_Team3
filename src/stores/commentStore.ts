import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';
import {useAuthStore} from '@/stores/auth';

interface Comment {
  _id: string;
  comment: string;
  author: {
    fullName: string;
    image: string | null;
  };
  createdAt: string;
}

export const useCommentStore = defineStore('comment', () => {
  const comments = ref<Comment[]>([]);
  const authStore = useAuthStore();

  const fetchComments = async (postId: string) => {
    try {
      const response = await axios.get(`http://13.125.143.126:5003/posts/${postId}`);
      comments.value = response.data.comments;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const addComment = async (commentText: string, postId: string) => {
    try {
      const response = await axios.post(
        'http://13.125.143.126:5003/comments/create',
        {
          comment: commentText,
          postId: postId,
        },
        {
          headers: {
            Authorization: `bearer ${authStore.token}`,
          },
        },
      );
      comments.value.push(response.data);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return {
    comments,
    fetchComments,
    addComment,
  };
});
