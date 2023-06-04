export const getUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return users;
};

export const getUser = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  return user;
};

export const getPosts = async (userId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  const posts = await res.json();
  return posts;
};

export const getPost = async (postId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await res.json();
  return post;
};
