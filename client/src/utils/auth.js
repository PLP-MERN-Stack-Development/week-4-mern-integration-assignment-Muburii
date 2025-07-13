export const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Get user info (id, email, username) from token
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeToken(token);
};

// Get username from token
export const getUsername = () => {
  const user = getUserFromToken();
  return user?.username || null;
};

// (Optional) Get user id
export const getUserId = () => {
  const user = getUserFromToken();
  return user?.id || null;
};
