import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { useHubContext } from '@/contexts/hub-context';

interface CreatePostSelectHubComboBoxProps {
  onHubChange: (hubId: bigint) => void;
}

export default function CreatePostSelectHubComboBox({
  onHubChange,
}: CreatePostSelectHubComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const { joinedHubs } = useHubContext();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? joinedHubs.find((hub) => hub.hubID === value)?.hubName
            : 'Select hub...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search hub..." />
          <CommandList>
            <CommandEmpty>No joined hub.</CommandEmpty>
            <CommandGroup>
              {joinedHubs.map((hub) => (
                <CommandItem
                  key={hub.hubID}
                  value={hub.hubID}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    onHubChange(BigInt(hub.hubID));
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === hub.hubName ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {hub.hubName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
