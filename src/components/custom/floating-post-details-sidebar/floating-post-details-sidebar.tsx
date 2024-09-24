import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FloatingPostDetailsSidebar = () => {
  return (
    <div className="sticky top-[4.5rem] min-w-80 w-80 p-4 h-fit rounded-md bg-gray-100 dark:bg-gray-900 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-lg">Adeptus Astartes</h1>
          <Button>Join</Button>
        </div>
        <p className="text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
          ducimus voluptates, veritatis quas minus saepe quisquam quibusdam nemo
          dolor placeat quaerat corporis! Cupiditate qui architecto, odio
          pariatur fugiat recusandae quo!
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <h1 className="font-medium text-sm">21K Members</h1>
      </div>
      <Separator />
      <div>
        <h1 className="font-medium">Rules</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>1. Be humble</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>2. Always focus</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>3. Nevermind people</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>4. Start small</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>5. Have fun</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FloatingPostDetailsSidebar;
