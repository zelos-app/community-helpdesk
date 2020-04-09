import history from './history';
import axios from './axios';

export const login = async (email, password) => {
  let res;
  try {
    res = await axios.post('/api/auth/login', {
      email,
      password,
    });
  } catch(e) {
    alert(e.message);
  }

  const { token, exp } = res.data;

  localStorage.setItem('jwtToken', token);
  localStorage.setItem('jwtExpires', exp);

  history.push('/dashboard');
}

export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('jwtExpires');

  history.push('/auth');
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('jwtToken');
}
