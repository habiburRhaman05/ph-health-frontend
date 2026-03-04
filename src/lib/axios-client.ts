import { envVeriables } from '@/config/envVariables'; // আপনার ভেরিয়েবল নাম অনুযায়ী চেক করুন
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { isTokenExpiring } from './jwt';

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

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // যদি ৪০১ হয় এবং এটি আগে ট্রাই করা না হয়ে থাকে
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ১. সাইলেন্টলি টোকেন রিফ্রেশ কল করুন (Better Auth বা আপনার ব্যাকেন্ড অনুযায়ী)
        // নোট: এখানে সরাসরি axios ইউজ করা ভালো যাতে এই রিকোয়েস্ট আবার ইন্টারসেপ্টরে না ফেঁসে যায়
        await axios.post(
          `${API_BASE_URL}/auth/refresh-token`, 
          {
            cookie:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1T1hqY2V2RkVaSEd3bmRQZ04wRVozbElPRWloMDdvWiIsInJvbGUiOiJQQVRJRU5UIiwibmFtZSI6IkhhYmliIFJhaG1hbiIsImVtYWlsIjoidGhpc2lzaGFiaWIyMDA1QGdtYWlsLmNvbSIsInN0YXR1cyI6IkFDVElWRSIsImlhdCI6MTc3MjU1NzU4OCwiZXhwIjoxNzczMTYyMzg4fQ.h2yoixiy8VGK83ZaBvgRJ5u0mBxCcf7RF8NCiyne-Kg",
           token:"KPmt0uQf28LCiRDglLB66EJJWTUhWoN2"
          }, 
          { withCredentials: true,headers:{
            
          } }
        );

        // ২. রিফ্রেশ সাকসেস হলে অরিজিনাল রিকোয়েস্টটি আবার পাঠান
        // ইন্টারসেপ্টর এখানেই রিকোয়েস্টটি মিটিয়ে ফেলবে, কম্পোনেন্ট জানবেও না যে এরর হয়েছিল
        return httpClient(originalRequest); 
      } catch (refreshError) {
        // ৩. যদি রিফ্রেশ ফেইল করে (ইউজার ব্লকড বা সেশন শেষ)
        console.error("Refresh token expired or failed. Redirecting to login...");
        
        // if (typeof window !== 'undefined') {
        //   window.location.href = '/login'; // বা আপনার লগইন রাউট
        // }
        // return Promise.reject(refreshError);
      }
    }

    // ৪০১ ছাড়া অন্য সব এররের জন্য কম্পোনেন্ট লেভেলে এরর পাঠানো হবে (Toast দেখাবে)
    return Promise.reject(error);
  }
);



// let refreshPromise: Promise<string | null> | null = null
// const subscribers: ((token: string) => void)[] = []

// function subscribe(cb: (token: string) => void) { subscribers.push(cb) }
// function notify(token: string) { subscribers.splice(0).forEach(cb => cb(token)) }

// // request interceptor: proactive check if we *have* access token in memory
// httpClient.interceptors.request.use(async (cfg: AxiosRequestConfig) => {
//   let token = getAccessToken()
//   if (token && isTokenExpiring(token, 30)) {
//     // refresh once
//     if (!refreshPromise) {
//       refreshPromise = (async () => {
//         try {
//           const res = await httpClient.post("/auth/refresh")
//           if (res.status !== 200) return null
//           const newToken = res.data?.accessToken ?? null
//           setAccessToken(newToken)
//           return newToken
//         } catch {
//           return null
//         } finally {
//           refreshPromise = null
//         }
//       })()
//     }
//     const newToken = await refreshPromise
//     if (!newToken) {
//       // force logout or redirect
//       window.location.href = "/login"
//       return cfg
//     }
//     token = newToken
//   }

//   if (token) {
//     cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` }
//   }
//   return cfg
// })

// // response interceptor: fallback for 401 and queueing while refresh occurs
// httpClient.interceptors.response.use(
//   r => r,
//   async (error) => {
//     const original = error.config
//     if (!original) return Promise.reject(error)

//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true

//       if (refreshPromise) {
//         // wait for ongoing refresh
//         return new Promise((resolve, reject) => {
//           subscribe((token: string) => {
//             original.headers.Authorization = token ? `Bearer ${token}` : ""
//             resolve(httpClient(original))
//           })
//         })
//       }

//       // start refresh
//       refreshPromise = (async () => {
//         try {
//           const res = await httpClient.post("/auth/refresh")
//           if (res.status !== 200) return null
//           const newToken = res.data?.accessToken ?? null
//           setAccessToken(newToken)
//           notify(newToken)
//           return newToken
//         } catch {
//           return null
//         } finally {
//           refreshPromise = null
//         }
//       })()

//       const newToken = await refreshPromise
//       if (!newToken) {
//         // refresh failed → force logout
//         window.location.href = "/login"
//         return Promise.reject(error)
//       }

//       original.headers.Authorization = `Bearer ${newToken}`
//       return httpClient(original)
//     }

//     return Promise.reject(error)
//   }
// )
export default httpClient;
