import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/store/use-store';
import { Footer } from '@/components/custom/footer';
import { Sidebar } from '@/components/custom/sidebar';
import { useSidebarToggle } from '@/hooks/store/use-sidebar-toggle-store';
import { Outlet } from 'react-router-dom';
import { ContentLayout } from '@/components/custom/content-layout';

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
        <ContentLayout title=''>
          <Outlet />
        </ContentLayout>
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
