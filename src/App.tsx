import './App.css';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { router } from './lib/constants/router/router';
import RegisterPage from './pages/(public)/register_page';
import { ThemeProvider } from './components/theme-provider';
import ErrorBoundary from './lib/error-boundary';

function App() {
  // const { data: count, call: refetchCount } = useQueryCall({
  //   functionName: 'get',
  // });

  // const { call: increment, loading } = useUpdateCall({
  //   functionName: 'inc',
  //   onSuccess: () => {
  //     refetchCount();
  //   },
  // });

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          {/* <BrowserRouter>
        <Routes>
        <Route path="/register" element={<RegisterPage />} />
        </Routes>
        </BrowserRouter> */}
      </ThemeProvider>
    </>
  );
}

export default App;
