import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import BlogListTable from '../components/BlogListTable';
import { getBlogsOfCurrentUser } from '../services/blog.service';

const mockBlogs = [
  {
    id: 1,
    title: 'Test Blog 1',
    content: 'This is a test blog.',
    createdAt: '2023-08-13T12:00:00Z',
    authorId: 'sadasdghad-asdasd',
    categoryId: 'sadhasdjhjahskd',
  },
];

jest.mock('../services/blog.service', () => ({
  getBlogsOfCurrentUser: jest.fn(),
}));

const queryClient = new QueryClient();

test('displays loading spinner while loading data', async () => {
  (getBlogsOfCurrentUser as jest.Mock).mockReturnValueOnce(
    Promise.resolve({ data: [] })
  );

  render(
    <QueryClientProvider client={queryClient}>
      <BlogListTable />
    </QueryClientProvider>
  );

  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );
});

test('displays error message when network error occurs', async () => {
  (getBlogsOfCurrentUser as jest.Mock).mockRejectedValueOnce({
    message: 'Network Error',
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BlogListTable />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(
      screen.getByText(/can't connect to the network/i)
    ).toBeInTheDocument()
  );
});

test('displays error message when response status text exists', async () => {
  (getBlogsOfCurrentUser as jest.Mock).mockRejectedValueOnce({
    response: { statusText: 'Not Found' },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BlogListTable />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  );
});

test('displays blogs list when data is loaded', async () => {
  (getBlogsOfCurrentUser as jest.Mock).mockResolvedValueOnce({
    data: mockBlogs,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <BlogListTable />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/test blog 1/i)).toBeInTheDocument();
  });
});
