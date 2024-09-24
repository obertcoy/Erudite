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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CloudUpload } from 'lucide-react';
import { useRef } from 'react';
import CreatePostSelectHubComboBox from './create-post-select-hub-combobox';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  body: z.string().min(10, {
    message: 'Body must be at least 10 characters.',
  }),
});

export default function CreatePostForm() {
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
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
        <CreatePostSelectHubComboBox />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormDescription>
                This is your post title. Make it catchy!
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="I just made my grandma rich!"
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormDescription>
                This is your post body. Make it interesting!
              </FormDescription>
              <FormControl>
                <Tabs defaultValue="text" className="w-full">
                  <TabsList>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                  </TabsList>
                  <TabsContent value="text">
                    <Textarea
                      placeholder="Today I just made 10 million dollars using cookie clicker..."
                      className="w-full h-44"
                      {...field}
                    />
                  </TabsContent>
                  <TabsContent value="media">
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
                  </TabsContent>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit self-end">
          Post
        </Button>
      </form>
    </Form>
  );
}
