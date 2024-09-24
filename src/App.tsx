import './App.css';
import { BrowserRouter, Route, RouterProvider, Routes, useNavigate } from 'react-router-dom';
import { router } from './lib/router/router';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/auth-context';
import { ServiceContextProvider } from './contexts/service-context';

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ServiceContextProvider>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
      </ServiceContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
