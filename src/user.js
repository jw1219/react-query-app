import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getPosts, getUser } from './api';
import './index.css';

const userQuery = (userId) => ({
  queryKey: ['user', userId],
  queryFn: () => getUser(userId),
});

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = userQuery(params.userId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const User = () => {
  const { userId } = useParams();
  const userQueryResult = useQuery(userQuery(userId));

  const postsQueryResult = useQuery({
    enabled: userQueryResult.data?.id != null,
    queryKey: ['posts', { userId }],
    queryFn: () => getPosts(userId),
  });
  if (userQueryResult.isLoading) return <h2>Loading...</h2>;
  if (userQueryResult.isError) return <p>Oops, something went wrong...</p>;

  let posts;
  if (postsQueryResult.isLoading) {
    posts = <div className='loader'></div>;
  } else {
    posts = (
      <ul>
        {postsQueryResult?.data.map((post) => {
          const { id, title } = post;
          return (
            <li key={id}>
              <a href={`/posts/${id}`}>{title}</a>
            </li>
          );
        })}
      </ul>
    );
  }
  const { name, email, phone } = userQueryResult.data;
  return (
    <div>
      <h1>{name}</h1>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      {posts}
      <Link to='/'>Back to All Users</Link>
    </div>
  );
};
