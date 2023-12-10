import { useQuery } from 'react-query';
import { getBlogsOfCurrentUser } from '../../services/blog.service';

export function useCurrentUserBlog() {
  const { data, isLoading, isError, error } = useQuery<any, any>({
    queryKey: ['blogs-of-current-user'],
    queryFn: getBlogsOfCurrentUser,
  });

  return { data, isLoading, isError, error };
}
