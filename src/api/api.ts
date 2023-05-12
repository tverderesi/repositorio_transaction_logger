import axios from 'axios';

// criar uma isntancia para setar informações padrão para todas as requisições
export const api = axios.create({
    baseURL: 'http://localhost:5173/api',
})