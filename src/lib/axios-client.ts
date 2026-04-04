import { envVeriables } from '@/config/envVariables'; // আপনার ভেরিয়েবল নাম অনুযায়ী চেক করুন
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { isTokenExpiring } from './jwt';

import { getCookie } from './cookie';

const API_BASE_URL = envVeriables.NEXT_PUBLIC_API_URL;

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default httpClient;
