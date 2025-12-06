import { useMemo } from 'react';
import Cookies from 'js-cookie';

const useAuthToken = () => {
  const auth = useMemo(() => {
    const cookie = Cookies.get('auth');
    return cookie ? JSON.parse(cookie) : {};
  }, []);

  return {
    token: auth.token,
    username: auth.username,
    email: auth.email,
    role: auth.role,
    id: auth.id,
  };
};

export default useAuthToken;