import api from '../utils/api';

export const createBlog = async function (formData: FormData) {
  const response = await api?.post('/api/blogs', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response?.data;
};

export const getAllBlogs = async function () {
  const response = await api?.get('/api/blogs');
  return response?.data;
};

export const updateBlog = async function (
  id: string | undefined,
  updateData: any
) {
  const response = await api?.patch(`/api/blogs/${id}`, updateData);
  return response?.data;
};

export const getBlogById = async function (data: { id: string | undefined }) {
  const response = await api?.get(`/api/blogs/${data.id}`);
  return response?.data;
};

export const deleteBlog = async function (data: { id: string | any }) {
  const response = await api?.delete(`/api/blogs/${data.id}`);
  return response?.data;
};

export const getBlogsOfCurrentUser = async function () {
  const response = await api?.get('/api/blogs/my');
  return response?.data;
};
