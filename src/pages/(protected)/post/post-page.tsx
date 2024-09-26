import { Card } from '@/components/ui/card';
import PostCardHeader from '@/components/custom/post-card/post-card-header';
import PostCardContent from '@/components/custom/post-card/post-card-content';
import PostCardFooter from '@/components/custom/post-card/post-card-footer';
import FloatingPostDetailsSidebar from '@/components/custom/floating-post-details-sidebar/floating-post-details-sidebar';
import { Link, ScrollRestoration } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RouteEnum } from '@/lib/enum/route-enum';
import CommentsSection from '@/components/custom/comments-section/comments-section';

export default function PostPage() {
  return (
    <main className="w-full flex items-center justify-center py-6">
      <div className="container w-full flex justify-center items-start gap-x-4">
        <div className="flex items-start">
          <Link to={RouteEnum.HOME} className="py-6">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="size-4" />
            </Button>
          </Link>
          <div className="flex flex-col items-center  gap-y-2">
            <Card className="w-full max-w-3xl rounded-xl shadow-none border-none">
              <PostCardHeader />
              <PostCardContent />
              <PostCardFooter />
            </Card>
            <div className="w-full max-w-3xl px-6  flex flex-col gap-y-8">
              <Input className="px-4" placeholder="Add a comment" />
              <Separator />
              <CommentsSection />
            </div>
          </div>
        </div>
        <FloatingPostDetailsSidebar />
      </div>
      <ScrollRestoration />
    </main>
  );
}
