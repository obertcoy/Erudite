import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreatePostForm from './create-post-form';

export default function CreatePostCard() {
  return (
    <Card className="max-w-4xl w-full shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a new post</CardTitle>
        <CardDescription>
          <p>Fill out the form below to create a new post.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <CreatePostForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Please note that all posts are moderated before they are published.
        </p>
      </CardFooter>
    </Card>
  );
}
