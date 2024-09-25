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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Descripition must be at least 10 characters.',
  }),
});

export default function CreateHubForm() {
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-8"
      >
        <FormField
          control={form.control}
          name="name"
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
          name="description"
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
        <div className="space-y-2">
          <h1 className="text-sm font-medium">Hub Banner</h1>
          <p className="text-xs">
            Upload a banner image for your hub. This image will be displayed at
            the top of your hub.
          </p>
          <div>
            <div
              onClick={() => {
                fileRef.current?.click();
              }}
              className="w-full h-44 border-2 border-dashed flex flex-col items-center justify-center rounded-md text-muted-foreground text-sm cursor-pointer"
            >
              <CloudUpload className="size-6" />
              Click to upload files
            </div>
            <Input ref={fileRef} type="file" className="hidden" />
          </div>
        </div>
        <Separator />
        <CreateHubSetRulesList />
        <Button type="submit" className="w-fit self-end">
          Create
        </Button>
      </form>
    </Form>
  );
}
