import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";


import { ThemeProvider } from './context/theme_context';


import { router } from './App.jsx'

import {  QueryClientProvider} from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const queryClient  = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
   
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>

          <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </ThemeProvider>

)
