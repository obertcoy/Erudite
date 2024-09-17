import ErrorBoundary from '@/lib/error-boundary';
import { Outlet } from 'react-router-dom';

export default function ErrorBoundaryLayout() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}
