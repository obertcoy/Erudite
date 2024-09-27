import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PostEntity } from '@/lib/model/entity/post/post.entity';
import { HubEntity } from '@/lib/model/entity/hub/hub.entity';
import { useHubContext } from '@/contexts/hub-context';
import { Link } from 'react-router-dom';
import { generateDynamicRoutePath } from '@/lib/utils';
import { RouteEnum } from '@/lib/enum/route-enum';

interface FloatingPostDetailsSidebarProps {
  hubData: HubEntity;
}

export default function FloatingPostDetailsSidebar({
  hubData,
}: FloatingPostDetailsSidebarProps) {
  const { isHubJoined } = useHubContext();

  const isJoined = isHubJoined(hubData.hubID);

  return (
    <div className="sticky top-[4.5rem] min-w-80 w-80 p-4 h-fit rounded-md bg-gray-100 dark:bg-gray-900 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="font-medium text-lg truncate">{hubData.hubName}</h1>
          <Link
            to={generateDynamicRoutePath(RouteEnum.HUB, {
              hubId: hubData.hubID,
            })}
          >
            <Button>{!isJoined ? 'Join' : 'Member'}</Button>
          </Link>
        </div>
        <p className="text-sm font-normal">{hubData.hubDescription}</p>
      </div>
      <div className="flex items-center gap-x-4">
        <h1 className="font-medium text-sm">21K Members</h1>
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
                    {idx + 1}. {rule.ruleTitle}
                  </AccordionTrigger>
                  <AccordionContent>{rule.ruleDescription}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        ) : (
          <p className="text-sm mt-2">No rules added yet</p>
        )}
      </div>
    </div>
  );
}
