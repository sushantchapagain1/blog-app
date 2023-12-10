import { useMutation } from 'react-query';
import { createBlog as createBlogApi } from '../../services/blog.service';

export type BlogFormData = {
  id?: string;
  title: string;
  content: string;
  image: string;
  authorId: string;
  categoryId: string;
};

export function useCreateBlog() {
  const {
    mutate: createBlog,
    isLoading: isCreating,
    isError,
    error,
    isSuccess,
  } = useMutation<BlogFormData, any, any, any>(createBlogApi);

  return { createBlog, isCreating, isError, error, isSuccess };
}
