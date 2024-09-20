import { formatShortNumber } from '@/lib/utils';
import { Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface PrestigeProps {
  prestige: number;
}

export default function Prestige({ prestige }: PrestigeProps) {
  return (
    <>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <div className="flex w-fit h-fit items-center space-x-1 bg-orange-100 text-orange-600 rounded-full px-2 py-1">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">
                {formatShortNumber(prestige)}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">Prestige</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
