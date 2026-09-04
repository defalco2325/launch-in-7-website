import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { addStructuredData } from "@/lib/seo";

const faqs = [
  {
    question: "Could my project launch in seven days?",
    answer: "Focused Launch projects may qualify for a seven-day sprint when the scope, inputs, and decisions support it. Larger connected builds receive a scoped timeline covering strategy, content, integrations, testing, and handoff."
  },
  {
    question: "What do you need from me to start?",
    answer: "We need your business goals, target audience information, any existing brand assets (logo, colors, content), and examples of websites you like. We'll also need access to your domain and hosting if you have them, or we can help set those up. The more information you provide upfront, the smoother the process."
  },
  {
    question: "Can you add online booking or e-commerce?",
    answer: "Absolutely! We specialize in integrating booking systems for service-based businesses and e-commerce functionality for product sales. We work with leading platforms like Stripe for payments, Calendly for bookings, and can build custom solutions based on your specific needs."
  },
  {
    question: "What's included post-launch?",
    answer: "We document the build, train your team, and hand over working assets and access. Ongoing optimization, reporting, automation, and strategic systems work are available through Growth OS."
  },
  {
    question: "Why don't you show pricing?",
    answer: "Every business has unique needs, and we believe in providing accurate quotes based on your specific requirements. Rather than showing generic pricing that might not apply to your situation, we prefer to understand your goals first and provide a detailed, personalized proposal that ensures you get exactly what you need."
  },
  {
    question: "How do revisions and decisions work?",
    answer: "We agree on the decision points and review moments in the scope. Focused Launch work stays deliberately narrow; larger builds receive the review cadence appropriate to their integrations and content."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Add FAQ structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    addStructuredData(structuredData);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-deep-navy mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Clear answers about scope, timelines, handoff, and ongoing support.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  data-testid={`faq-button-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-semibold text-lg text-deep-navy pr-4">
                      {faq.question}
                    </h3>
                    <div
                      className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </button>
                {openIndex === index && (
                  <div
                    className="px-6 pb-6 animate-fade-in-up"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
