import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DotPattern from '@/components/ui/dot-pattern';
import { Input } from '@/components/ui/input';
import ProfileAvatar from '@/components/ui/profile-avatar';
import { RouteEnum } from '@/lib/enum/route-enum';
import { cn } from '@/lib/utils';
import { Users, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen items-center w-full">
      <header className="w-full px-4 lg:px-6 h-14 flex items-center justify-center  sticky top-0 bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="flex items-center justify-between container w-full px-4">
          <Link className="flex items-center justify-center" to="#">
            <Icons.erudite className="h-6 w-6 mr-2" />
            <span className="font-bold">Erudite</span>
          </Link>
          <div className="flex items-center text-xs font-medium">
            Unleash your creativity and share your thoughts with the world 💭🔥
          </div>
        </div>
      </header>
      <main className="w-full flex-1 flex flex-col items-center">
        <section className="w-full flex justify-center">
          <div className="container py-4 px-4 md:px-6">
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
              <div className="z-50 flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to Erudite
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl dark:text-gray-200">
                    Join the conversation in our hubs. Connect with like-minded
                    individuals. Share your thoughts and ideas.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link to={RouteEnum.HOME}>
                    <Button>Get Started</Button>
                  </Link>
                </div>
              </div>
              <DotPattern
                className={cn(
                  '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
                )}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose Erudite?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Vibrant Community</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with people who share your interests and passions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Decentralized Discussions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Data is stored on the blockchain, ensuring privacy and
                  security.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-lg font-bold">Global Reach</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interact with users from all around the world and broaden your
                  horizons.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Community Highlights
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">
                      The Illusion of Selflessness
                    </h3>
                    <Badge>Psychology Now</Badge>
                  </div>
                  <div className="h-full flex flex-col flex-1 justify-between gap-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      It's easy to be selfless when you don't value yourself.
                      But there&apos;s a difference between being selfless and
                      letting people walk over you and lot of selfless people
                      don't see it that way when they should.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <ProfileAvatar
                          username="Japiik"
                          profileImageUrl="https://avatars.akamai.steamstatic.com/d28bb1bea3780e720e82b34d6a0d417e20e8f3a6_full.jpg"
                        />
                        <span className="text-xs font-medium">Japiik</span>
                      </div>
                      <Link to={RouteEnum.LOGIN}>
                        <Button className="mt-4" variant="outline">
                          Join Discussion
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">
                      Unspoken Truths of Slavery
                    </h3>
                    <Badge>Equality Tomorrow</Badge>
                  </div>
                  <div className="h-full flex flex-col flex-1 justify-between gap-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      If you want to make a change, you have to stand up and
                      tell people to change. Make small differences, donate to
                      people of power or vote them in office, slavery should
                      have never started.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <ProfileAvatar
                          username="ObertCoy"
                          profileImageUrl="https://avatars.githubusercontent.com/u/122689867?v=4"
                        />
                        <span className="text-xs font-medium">ObertCoy</span>
                      </div>
                      <Link to={RouteEnum.LOGIN}>
                        <Button className="mt-4" variant="outline">
                          Join Discussion
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">
                      What do you call a man in debt?
                    </h3>
                    <Badge>Only Humor</Badge>
                  </div>
                  <div className="h-full flex flex-col flex-1 justify-between gap-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Owen.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <ProfileAvatar
                          username="SyeReal"
                          profileImageUrl="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png"
                        />
                        <span className="text-xs font-medium">SyeReal</span>
                      </div>
                      <Link to={RouteEnum.LOGIN}>
                        <Button className="mt-4" variant="outline">
                          Join Discussion
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to join the conversation?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up now and become a part of our growing community.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex items-center justify-center gap-x-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Link to={RouteEnum.REGISTER}>
                    <Button type="submit">Sign Up</Button>
                  </Link>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 SROOMY Team. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
