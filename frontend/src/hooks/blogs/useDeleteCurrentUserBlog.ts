import { useMutation, useQueryClient } from 'react-query';
import { deleteBlog } from '../../services/blog.service';

export function useDeleteCurrentUserBlog() {
  const queryClient = useQueryClient();

  const { mutate: removeBlogOfCurrentUser, isLoading: isDeleting } =
    useMutation(deleteBlog, {
      onSuccess() {
        queryClient.invalidateQueries(['blogs-of-current-user']);
      },
    });

  return { removeBlogOfCurrentUser, isDeleting };
}
