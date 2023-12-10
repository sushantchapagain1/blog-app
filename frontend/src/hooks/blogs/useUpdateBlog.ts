import { useMutation, useQueryClient } from 'react-query';
import { BlogFormData } from './useCreateBlog';

import { updateBlog as updateBlogApi } from '../../services/blog.service';

interface UpdateBlogParams {
  updateData: BlogFormData;
  id: number | string | any;
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  const {
    mutate: updateBlog,
    isSuccess: isEditSuccess,
    isLoading: isEditing,
  } = useMutation<void, any, UpdateBlogParams>({
    mutationFn: ({ updateData, id }) => updateBlogApi(id, updateData),

    onSuccess: () => {
      queryClient.invalidateQueries([
        'blogs',
        'blogs-of-current-user',
        'blogDetail',
      ]);
    },
  });

  return { updateBlog, isEditSuccess, isEditing };
}
