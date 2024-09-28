import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GradualSpacing from '@/components/ui/gradual-spacing';
import BlurFade from '@/components/ui/blur-fade';
import DotPattern from '@/components/ui/dot-pattern';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { RouteEnum } from '@/lib/enum/route-enum';

export default function HomeHero() {
  return (
    <section className="bg-backgroundl relative flex h-[500px] w-full flex-col items-center gap-y-8 overflow-hidden rounded-lg py-32">
      <div className="z-10 flex items-center justify-center">
        <Link to="/">
          <AnimatedGradientText>
            🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
            &nbsp;
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Introducing Erudite
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </div>
      <div className="flex flex-col justify-center gap-y-2 lg:gap-y-4">
        <GradualSpacing
          className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-primary dark:text-white md:leading-[5rem] lg:text-7xl"
          text="Welcome to Erudite"
        />
        <p className="max-w-4xl text-center sm:text-lg lg:text-xl">
          💭&nbsp;Unleash your creativity and share your thoughts with the
          world&nbsp;🔥
        </p>
      </div>
      <div className="z-20 flex items-center justify-center">
        <BlurFade delay={0.5} inView>
          <Link to={RouteEnum.HOME}>
            <Button>Get Started</Button>
          </Link>
        </BlurFade>
      </div>
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(250px_circle_at_center,white,transparent)]',
        )}
      />
    </section>
  );
}
