import axios from 'axios';

// API Configuration
const API_VERSION = 1;
const BASE_URL = 'http://apiv2.binaryexpertsystems.com/api/v' + API_VERSION + '/';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    
    // Check if the response has the expected structure with isTransactionDone
    if (response.data && typeof response.data === 'object' && 'isTransactionDone' in response.data) {
      const { isTransactionDone, transactionErrorMessage } = response.data;
      
      if (!isTransactionDone) {
        // If transaction failed, reject with the error message
        const error = new Error(transactionErrorMessage || 'Transaction failed');
        error.response = response;
        return Promise.reject(error);
      }
    }
    
    return response;
  },
  (error) => {
    console.error('API Call Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || 
                          error.response.data?.transactionErrorMessage || 
                          'Server error';
      const enhancedError = new Error(errorMessage);
      enhancedError.response = error.response;
      enhancedError.statusCode = error.response.status;
      return Promise.reject(enhancedError);
    } else if (error.request) {
      // Request was made but no response received
      const networkError = new Error('Network error - No response from server');
      networkError.request = error.request;
      networkError.statusCode = 0;
      return Promise.reject(networkError);
    } else {
      // Something else happened
      const unknownError = new Error(error.message || 'Unknown error occurred');
      unknownError.statusCode = 0;
      return Promise.reject(unknownError);
    }
  }
);


// Usage examples:
// GET: axiosInstance.get('endpoint').then(res => {}).catch(err => {}).finally(() => {})
// POST: axiosInstance.post('endpoint', data).then(res => {}).catch(err => {}).finally(() => {})
// PUT: axiosInstance.put('endpoint', data).then(res => {}).catch(err => {}).finally(() => {})
// DELETE: axiosInstance.delete('endpoint').then(res => {}).catch(err => {}).finally(() => {})

export default axiosInstance;
