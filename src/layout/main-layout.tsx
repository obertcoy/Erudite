import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { Footer } from '@/components/custom/footer';
import { Sidebar } from '@/components/custom/sidebar';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-background transition-[margin-left] duration-300 ease-in-out',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <Outlet />
      </main>
      <footer
        className={cn(
          'transition-[margin-left] duration-300 ease-in-out',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
