import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface HeaderIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  tooltip: string
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, tooltip }) => {
  return (
    <button className="p-2 rounded-full hover:bg-slate-100 w-full h-full">
            {icon}
      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </button>
  );
};

export default HeaderIcon;
