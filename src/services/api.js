import axios from 'axios';

// https://api.hgbrasil.com/weather?key=suakey&lat=-23.682&lon=-46.875

export const key = 'suakey';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
});

export default api;
