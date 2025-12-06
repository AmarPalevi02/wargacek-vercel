import Cookies from 'js-cookie';

const handleError = (error) => {
   if (
      error.response &&
      error.response.data &&
      error.response.data.msg === 'jwt expired'
   ) {

      Cookies.remove('token');
      Cookies.remove('username');
      Cookies.remove('email');
      Cookies.remove('role');

      window.location.href = '/';
      return Promise.reject(error);
   }

   return Promise.reject(error);
};

export default handleError;
