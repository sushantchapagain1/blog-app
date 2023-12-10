import { useQuery } from 'react-query';
import { getAllBlogs } from '../../services/blog.service';

export function useBlogs() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });

  return { data, isLoading, isError, error };
}
