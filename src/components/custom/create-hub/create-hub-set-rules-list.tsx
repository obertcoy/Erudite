import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useImmer } from 'use-immer';
import { X } from 'lucide-react';

interface HubRule {
  title: string;
  description: string;
}

export default function CreateHubSetRulesList() {
  const [rules, setRules] = useImmer<HubRule[]>([]);

  const [rule, setRule] = useImmer<HubRule>({
    title: '',
    description: '',
  });

  function handleAddRule() {
    setRules((draft) => {
      draft.push(rule);
    });
  }

  function handleRemoveRule(index: number) {
    setRules((draft) => {
      draft.splice(index, 1);
    });
  }

  return (
    <div className="w-full flex gap-x-16">
      <div className="space-y-2">
        <h1 className="text-sm font-medium">Hub Rules</h1>
        <p className="text-xs">
          Set rules for your hub. These rules will be visible to everyone.
        </p>
        <div className="flex flex-col gap-y-2">
          <Input
            placeholder="Rule title"
            className="w-96"
            onChange={(e) => {
              setRule((draft) => {
                draft.title = e.target.value;
              });
            }}
          />
          <Textarea
            placeholder="Rule description"
            className="w-96 h-48"
            onChange={(e) => {
              setRule((draft) => {
                draft.description = e.target.value;
              });
            }}
          />
        </div>
        <Button type="button" onClick={handleAddRule}>
          Add
        </Button>
      </div>
      <div className="flex-1 w-full space-y-2">
        <h1 className="text-sm font-medium">Preview</h1>
        <p className="text-xs">
          Preview how your hub rules will look like to everyone.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {rules.map((rule, index) => (
            <div className="flex items-start gap-x-2">
              <AccordionItem
                className="flex-1 w-full"
                key={rule.title}
                value={`${index + 1}-${rule.title}`}
              >
                <AccordionTrigger>{`${index + 1}. ${
                  rule.title
                }`}</AccordionTrigger>
                <AccordionContent>{rule.description}</AccordionContent>
              </AccordionItem>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  handleRemoveRule(index);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
