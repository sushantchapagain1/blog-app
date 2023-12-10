import { useQuery } from 'react-query';
import { getBlogById } from '../../services/blog.service';
import { useLocation } from 'react-router-dom';

export function useBlog() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const { data, isLoading, isError, error } = useQuery<any, any>({
    queryKey: ['blog-detail'],
    queryFn: () => getBlogById({ id: id }),
  });

  return { data, isLoading, isError, error };
}
