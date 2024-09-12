import './App.css';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/(public)/login_page';
import RegisterPage from './pages/(public)/register_page';

function App() {
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  return (
    <div className="flex w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
