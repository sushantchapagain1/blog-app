import api from '../utils/api';

export const fetchCategories = async function () {
  try {
    const response = await api?.get('/api/category');
    return response?.data?.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
