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
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateDynamicRoutePath, validateImageURL } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import Profile from '@/assets/rukia.jpg';
import Banner from '@/assets/bg.jpg';
import Prestige from '../ui/prestige';
import useAuthContext from '@/hooks/use-auth-context';
import { UserEntity } from '@/lib/model/entity/user/user.entity';
import ProfileAvatar from '../ui/profile-avatar';

interface UserNavProps {
  data: UserEntity;
}

export function UserNav({ data }: UserNavProps) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  console.log(data.bannerImageUrl);

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
                <ProfileAvatar
                  username={data.username}
                  profileImageUrl={data.profileImageUrl}
                />
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
            <div className="relative h-24 w-full overflow-hidden rounded-t-lg bg-muted object-cover">
              <img
                src={data.bannerImageUrl}
                alt="User banner"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              <div className="absolute bottom-4 left-4 border rounded-full border-white">
                <ProfileAvatar
                  username={data.username}
                  profileImageUrl={data.profileImageUrl}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{data.username}</p>
                <p className="text-sm text-muted-foreground">{data.email}</p>
              </div>
              <Prestige prestige={5245} />
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link
                to={generateDynamicRoutePath(RouteEnum.USER, {
                  userId: data.internetIdentity,
                })}
                className="flex items-center"
              >
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link to={RouteEnum.ACCOUNT} className="flex items-center">
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
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={async () => {
              await logout();
              navigate(RouteEnum.LOGIN);
            }}
          >
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
