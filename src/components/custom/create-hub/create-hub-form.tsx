import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CloudUpload } from 'lucide-react';
import { useRef } from 'react';
import CreateHubSetRulesList from './create-hub-set-rules-list';
import { Separator } from '@/components/ui/separator';
import { HubDto, HubSchema } from '@/lib/model/schema/hub/hub.dto';
import { RuleDto } from '@/lib/model/schema/hub/rule.dto';
import { useCreateHub } from '@/hooks/hub/use-create-hub';
import { useNavigate } from 'react-router';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import { useHubContext } from '@/contexts/hub-context';
import { useMembershipContext } from '@/contexts/membership-context';

export default function CreateHubForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { execute } = useCreateHub();
  const { fetchJoinedHubs } = useHubContext();

  const navigate = useNavigate();

  const form = useForm<HubDto>({
    resolver: zodResolver(HubSchema),
    defaultValues: {
      hubName: '',
      hubDescription: '',
      hubBannerImage: undefined,
      hubRules: [],
    },
  });

  const onRulesChange = (rules: RuleDto[]) => {
    form.setValue('hubRules', rules);
  };

  const onSubmit = async (hubDto: HubDto) => {
    const result = await execute(hubDto);
    if (result) {
      fetchJoinedHubs();
      navigate(
        generateDynamicRoutePath(RouteEnum.HUB, { hubId: result.hubID }),
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-8"
      >
        <FormField
          control={form.control}
          name="hubName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormDescription>
                This is the name of your hub. Make it so many people can relate
                to!
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="Cookie Clicker Nation"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hubDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                This is the description of your hub. Explain what your hub is
                all about.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="A hub for all things Cookie Clicker!"
                  className="w-full h-44"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hubBannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hub Banner</FormLabel>
              <FormDescription>
                Upload a banner image for your hub. This image will be displayed
                at the top of your hub.
              </FormDescription>
              <FormControl>
                <>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="w-full h-44 border-2 border-dashed flex flex-col items-center justify-center rounded-md text-muted-foreground text-sm cursor-pointer"
                  >
                    {!field.value ? (
                      <>
                        <CloudUpload className="size-6" />
                        Click to upload files
                      </>
                    ) : (
                      <img
                        src={URL.createObjectURL(field.value)}
                        alt="Uploaded Preview"
                        className="h-44 w-full object-cover rounded-md"
                      />
                    )}
                  </div>
                  <Input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <CreateHubSetRulesList onRulesChange={onRulesChange} />
        <Button type="submit" className="w-fit self-end">
          Create
        </Button>
      </form>
    </Form>
  );
}
