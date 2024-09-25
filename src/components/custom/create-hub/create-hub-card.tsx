import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateHubForm from './create-hub-form';

export default function CreateHubCard() {
  return (
    <Card className="max-w-4xl w-full shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a new hub</CardTitle>
        <CardDescription>
          <p>Fill out the form below to create a hub.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <CreateHubForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Please note that all hubs must conform to our community guidelines.
        </p>
      </CardFooter>
    </Card>
  );
}
