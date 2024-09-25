import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FloatingFeedSidebarFilter from '../floating-feed-sidebar/floating-feed-sidebar-filter';
import { HubEntity } from '@/lib/model/entity/hub/hub.entity';

interface FloatingHubDetailsSidebarProps {
  hubData: HubEntity;
}

export default function FloatingHubDetailsSidebar({
  hubData,
}: FloatingHubDetailsSidebarProps) {
  return (
    <div className="sticky top-[4.5rem] min-w-80 w-80 p-4 h-fit rounded-md bg-gray-100 dark:bg-gray-900 flex flex-col gap-y-4">
      <FloatingFeedSidebarFilter />
      <div className="flex flex-col gap-y-2">
        <h1 className="font-medium text-lg">{hubData.hubName}</h1>
        <p className="text-sm font-normal">{hubData.hubDescription}</p>
      </div>
      <Separator />
      <div>
        <h1 className="font-medium">Rules</h1>
        {hubData.hubRules.length ? (
          <>
            <Accordion type="single" collapsible className="w-full">
              {hubData.hubRules.map((rule, idx) => (
                <AccordionItem value={`rule-${idx}`} key={idx}>
                  <AccordionTrigger>
                    {idx}. {rule.ruleTitle}
                  </AccordionTrigger>
                  <AccordionContent>{rule.ruleDescription}</AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
          </>
        ) : (
          <p className='text-sm mt-2'>No rules added yet</p>
        )}
      </div>
    </div>
  );
}
