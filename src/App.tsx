import './App.css';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { router } from './lib/constants/router/router';
import RegisterPage from './pages/(public)/register_page';

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
    <div className="flex min-h-screen">
      <RouterProvider router={router}/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
