import { useQuery } from '@tanstack/react-query';
import { getUsers } from './api';
import './index.css';

const query = {
  queryKey: ['users'],
  queryFn: getUsers,
};

export const loader = (queryClient) => async () => {
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const Users = () => {
  const { data: users, isLoading, isError } = useQuery(query);
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <p>Oops, something went wrong...</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const { id, name, email } = user;
          return (
            <tr key={id}>
              <td>
                <a href={`users/${id}`}>{name}</a>
              </td>
              <td>{email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
