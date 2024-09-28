import { cn } from '@/lib/utils';
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from '@tabler/icons-react';
import { FlipWords } from '@/components/ui/flip-words';

export function HomeFeatures() {
  const features = [
    {
      title: 'Built for developers',
      description:
        'Built for engineers, developers, dreamers, thinkers and doers.',
      icon: <IconTerminal2 />,
    },
    {
      title: 'Ease of use',
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
    },
    {
      title: 'Pricing like no other',
      description:
        'Our prices are best in the market. No cap, no lock, no credit card required.',
      icon: <IconCurrencyDollar />,
    },
    {
      title: '100% Uptime guarantee',
      description: 'We just cannot be taken down by anyone.',
      icon: <IconCloud />,
    },
    {
      title: 'Multi-tenant Architecture',
      description: 'You can simply share passwords instead of buying new seats',
      icon: <IconRouteAltLeft />,
    },
    {
      title: '24/7 Customer Support',
      description:
        'We are available a 100% of the time. Atleast our AI Agents are.',
      icon: <IconHelp />,
    },
    {
      title: 'Money back guarantee',
      description:
        'If you donot like EveryAI, we will convince you to like us.',
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: 'And everything else',
      description: 'I just ran out of copy ideas. Accept my sincere apologies',
      icon: <IconHeart />,
    },
  ];
  return (
    <section className="flex flex-col gap-y-12">
      <div className="flex flex-col items-center justify-center gap-y-4 p-8">
        <div className="mx-auto text-center text-4xl font-normal text-black dark:text-white">
          <FlipWords
            className="pe-2 ps-0"
            words={['Refine', 'Enhance', 'Optimize']}
          />
          your resume with AI-driven insights
        </div>
        <p className="max-w-4xl text-center lg:text-lg">
          Whether you&apos;re looking to polish your existing qualifications or
          transform your resume into a compelling narrative, our AI-driven
          insights provide the tools you need to stand out. Boost your chances
          of success by aligning your resume with industry standards and the
          specific demands of your desired job.
        </p>
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r',
        (index === 0 || index === 4) && 'dark:border-neutral-800 lg:border-l',
        index < 4 && 'dark:border-neutral-800 lg:border-b',
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
