import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'https://server-jet-three-70.vercel.app/', // Vercel server URL
    // baseURL: 'http://localhost:5000/', // Local server URL
  });
export default baseURL;



