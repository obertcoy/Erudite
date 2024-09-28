import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeFAQ() {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="text-3xl font-bold">
        Frequently Asked <span className="text-primary">Questions</span>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the AI analyze my resume?
          </AccordionTrigger>
          <AccordionContent>
            The AI uses advanced natural language processing algorithms to
            evaluate the content of your resume, focusing on key skills,
            experiences, and keywords relevant to the job market.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Yes. We prioritize your privacy and security. Your resume data is
            encrypted and processed securely, with no unauthorized access.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I get personalized feedback?</AccordionTrigger>
          <AccordionContent>
            Absolutely. The AI provides customized feedback based on your
            resume&apos;s strengths and areas for improvement, helping you
            enhance your job application.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What formats does the AI support?</AccordionTrigger>
          <AccordionContent>
            The AI can analyze resumes in various formats, including PDF, DOCX,
            and TXT. Make sure your resume is in one of these formats for
            accurate analysis.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How accurate is the analysis?</AccordionTrigger>
          <AccordionContent>
            The AI is trained on a vast dataset of resumes and job descriptions,
            offering high accuracy in identifying relevant skills and
            experience. However, it&apos;s recommended to review the suggestions
            manually.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>How long does the analysis take?</AccordionTrigger>
          <AccordionContent>
            The analysis is typically completed within a few seconds, providing
            you with quick insights and feedback on your resume.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
