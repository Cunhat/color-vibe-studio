import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the text-to-line-art technology work?",
    answer:
      "Our platform uses advanced AI algorithms to interpret your text prompts and transform them into clean line art illustrations. The system has been trained on thousands of coloring book illustrations to ensure the output is suitable for coloring activities.",
  },
  {
    question: "Can I use the illustrations commercially?",
    answer:
      "Yes, with our Creator and Enterprise plans, you get full commercial usage rights for the illustrations you generate. The Free plan is limited to personal use only.",
  },
  {
    question: "What file formats are available for download?",
    answer:
      "We offer PNG downloads on all plans. SVG and PDF formats are available on our Creator and Enterprise plans for scalable, high-quality prints.",
  },
  {
    question: "How many illustrations can I create?",
    answer:
      "Our Free plan includes 5 generations per day. The Creator plan offers 50 generations daily, and our Enterprise plan provides unlimited generations for educational institutions and publishers.",
  },
  {
    question: "Is there a mobile app available?",
    answer:
      "Currently, ColorVibe Studio is available as a web application that works on all devices including desktops, tablets, and smartphones. A dedicated mobile app is on our roadmap for future development.",
  },
  {
    question: "Can I request custom features for my organization?",
    answer:
      "Absolutely! Enterprise customers get access to our customer success team who can discuss custom feature development for specific organizational needs. Contact our sales team to learn more.",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container max-w-4xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4">
            Have a question about ColorVibe Studio? Find quick answers below.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? We're here to help.
          </p>
          <p className="mt-2 font-medium">
            <a
              href="mailto:support@colorvibestudio.com"
              className="text-primary hover:underline"
            >
              support@colorvibestudio.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
