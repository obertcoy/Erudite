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
import { PostDto, PostSchema } from '@/lib/model/schema/post/post.dto';
import { useCreatePost } from '@/hooks/post/use-create-post';
import { useNavigate } from 'react-router-dom';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';
import { toast } from 'sonner';

export default function CreatePostForm() {
  const { execute } = useCreatePost();

  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<PostDto>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      postTitle: '',
      postBody: '',
    },
  });

  const onHubChange = (hubId: bigint) => {
    form.setValue('hubId', hubId);
  };

  const onSubmit = async (values: PostDto) => {
    const post = await execute(values);

    if (post) {
      navigate(
        generateDynamicRoutePath(RouteEnum.HUB, {
          hubId: values.hubId.toString(),
        }),
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-8"
      >
        <CreatePostSelectHubComboBox onHubChange={onHubChange} />
        <FormField
          control={form.control}
          name="postTitle"
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
          name="postBody"
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
                      className="w-full h-44 resize-none"
                      {...field}
                    />
                  </TabsContent>
                  <TabsContent value="media">
                    <FormField
                      control={form.control}
                      name="postBannerImage"
                      render={({ field }) => (
                        <FormItem>
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
        <div className='hidden'>
          {form.formState.errors.hubId &&
            toast.error(form.formState.errors.hubId.message)}
        </div>
      </form>
    </Form>
  );
}
