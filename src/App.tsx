import './App.css';
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { router } from './lib/router/router';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { ServiceContextProvider } from './contexts/service-context';
import { HubProvider } from './contexts/hub-context';
import { AuthProvider } from './contexts/auth-context';
import { MembershipProvider } from './contexts/membership-context';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ServiceContextProvider>
        <AuthProvider>
          <HubProvider>
            <MembershipProvider>
              <RouterProvider router={router} />
            </MembershipProvider>
          </HubProvider>
        </AuthProvider>
      </ServiceContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
