import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './app.css';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Layout from './Layout.tsx';
import CreateBlog from './pages/CreateBlog.tsx';
import Blog from './pages/Blog.tsx';
import BlogList from './pages/BlogList.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './Context/AuthContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/create-blog', element: <CreateBlog /> },
      { path: '/blog/:id', element: <Blog /> },
      { path: 'my-blogs', element: <BlogList /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
