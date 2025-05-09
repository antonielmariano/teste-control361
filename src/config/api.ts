import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error('Erro ao processar a requisição', {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid #333'
      }
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'Ocorreu um erro inesperado';

    if (error.response) {
      errorMessage = error.response.data?.message || 'Erro na resposta do servidor';
      console.error('Erro na resposta:', error.response.data);
    } else if (error.request) {
      errorMessage = 'Não foi possível conectar ao servidor';
      console.error('Erro na requisição:', error.request);
    } else {
      errorMessage = error.message || 'Erro desconhecido';
      console.error('Erro:', error.message);
    }

    toast.error(errorMessage, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid #333'
      }
    });

    return Promise.reject(error);
  }
);

export default api; 