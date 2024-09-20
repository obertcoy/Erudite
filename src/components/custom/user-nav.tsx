import {
  HelpCircle,
  LayoutGrid,
  LogOut,
  Settings,
  Star,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import Profile from '@/assets/rukia.jpg';
import Banner from '@/assets/bg.jpg';
import Prestige from '../ui/prestige';

export function UserNav() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">KE</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-4 p-2">
            <div className="relative h-24 w-full overflow-hidden rounded-t-lg">
              <img
                src={Banner}
                alt="User banner"
                className="object-cover w-full h-full"
              />
              {/* <div className="bg-muted w-full h-full object-cover"></div> */}

              <div className="absolute bottom-4 left-4">
                <Avatar className="h-12 w-12 rounded-full border-2 border-foreground">
                  <AvatarImage
                    src={Profile}
                    alt="@username"
                  />
                  <AvatarFallback>KE</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Kelvinices</p>
                <p className="text-sm text-muted-foreground">@kelvinices_</p>
              </div>
              <Prestige prestige={5245}/>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link
                to={generateDynamicRoutePath(RouteEnum.USER, { userId: '1' })}
                className="flex items-center"
              >
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link to="/setting" className="flex items-center">
                <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link to="/help" className="flex items-center">
                <HelpCircle className="mr-3 h-4 w-4 text-muted-foreground" />
                Help
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {}}>
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
