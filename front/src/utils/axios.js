import axios from 'axios';
import history from './history';

const instance = axios.create();

// do not send JWT to these paths
const publicEndpoints = ['/api/public', '/api/auth'];
const shouldAuth = url => !publicEndpoints.some(endpoint => url.startsWith(endpoint));

instance.interceptors.request.use((request) => {
  const jwtToken = localStorage.getItem('jwtToken');

  if (jwtToken && shouldAuth(request.url)) {
    request.headers['x-access-token'] = jwtToken;
  }

  return request;
});

instance.interceptors.response.use(a => a, ({response}) => {
  if (response.status >= 400) {
    history.push('/auth');
  }
  return response;
});

export default instance;
