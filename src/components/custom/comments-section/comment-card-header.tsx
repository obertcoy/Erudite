import { CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function CommentCardHeader() {
  return (
    <CardHeader className="p-0 flex flex-col justify-center gap-y-3">
      <div className="flex items-center gap-x-2">
        <Avatar className="size-6">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          <div className="text-sm">Example User</div>
          &nbsp;·&nbsp;
          <div className="text-xs text-muted-foreground">2 hours ago</div>
        </div>
      </div>
    </CardHeader>
  );
}
