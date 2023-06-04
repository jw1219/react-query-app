import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as usersLoader } from './users';
import { User, loader as userLoader } from './user';
import { Post, loader as postLoader } from './post';

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: usersLoader(client),
  },
  {
    path: 'users/:userId',
    element: <User />,
    loader: userLoader(client),
  },
  {
    path: 'posts/:postId',
    element: <Post />,
    loader: postLoader(client),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
