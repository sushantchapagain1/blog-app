import { useQuery } from 'react-query';
import { fetchCategories } from '../../services/category.service';

export function useCategory() {
  const { data: categories, isLoading } = useQuery<any, any>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return { categories, isLoading };
}
