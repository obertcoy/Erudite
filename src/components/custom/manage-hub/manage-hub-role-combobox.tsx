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
import { RoleEntity } from '@/lib/model/entity/hub/role.entity';
import { useGetHubById } from '@/hooks/hub/use-get-hub';
import useUpdateMembershipRole from '@/hooks/membership/use-update-membership-role';
import { useMembershipContext } from '@/contexts/membership-context';

interface ManageHubRoleComboboxProps {
  roles: RoleEntity[];
  currentRole: string;
  userId: string;
  hubId: string;
}

export default function ManageHubRoleCombobox({
  roles,
  currentRole,
  userId,
  hubId,
}: ManageHubRoleComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentRole);

  const { execute } = useUpdateMembershipRole();

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
            ? roles.find((role) => role.roleName === value)?.roleName
            : 'Select role...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search hub..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.roleName}
                  value={role.roleName}
                  onSelect={async (currentValue) => {
                    const newValue = currentValue === value ? '' : currentValue;
                    setValue(newValue);
                    setOpen(false);

                    if (newValue !== value) {
                      await execute(userId, newValue, hubId);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === role.roleName ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {role.roleName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
