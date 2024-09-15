import { PanelsTopLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { Menu } from './menu';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { SidebarToggle } from './sidebar-toggle';
import { Link } from 'react-router-dom';
import { Icons } from '@/components/icons';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72',
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'mb-1 select-none text-primary transition-transform duration-300 ease-in-out dark:text-primary-foreground',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
            sidebar?.isOpen === true && '!justify-start',
          )}
          variant="link"
          asChild
        >
          <Link
            to="/dashboard"
            className="flex select-none items-center gap-2 !no-underline"
          >
            <Icons.erudite className="mr-1 size-10 h-8 w-8 fill-primary dark:fill-primary-foreground" />
            <h1
              className={cn(
                'whitespace-nowrap text-lg font-bold text-primary transition-[transform,opacity,display] duration-300 ease-in-out dark:text-white',
                sidebar?.isOpen === false
                  ? 'hidden -translate-x-96 opacity-0'
                  : 'translate-x-0 opacity-100',
              )}
            >
              Erudite
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
