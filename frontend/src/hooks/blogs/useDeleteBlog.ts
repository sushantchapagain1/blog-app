import { useMutation, useQueryClient } from 'react-query';
import { deleteBlog } from '../../services/blog.service';
import { useLocation, useNavigate } from 'react-router-dom';

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  const naviagte = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[2] ?? '';

  const { mutate: removeBlog, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteBlog({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['']);
      naviagte('/my-blogs');
    },
  });

  return { removeBlog, isDeleting };
}
