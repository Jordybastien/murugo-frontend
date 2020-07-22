import jwtDecode from 'jwt-decode';

export const tokenKey = 'MurugoApp:Token';

export const decodeToken = () => {
  const token = localStorage.getItem(tokenKey);
  if (token) {
    return jwtDecode(token);
  }
  return null;
};
