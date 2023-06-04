import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getPost } from './api';

const postQuery = (postId) => ({
  queryKey: ['post', { id: postId }],
  queryFn: () => getPost(postId),
});

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const query = postQuery(params.postId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const Post = () => {
  const { postId } = useParams();
  const { data: post, isLoading, isError } = useQuery(postQuery(postId));
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>Oops, something went wrong...</p>;
  const { title, body, userId } = post;
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <Link to={`/users/${userId}`}>Back to User</Link>
    </div>
  );
};
