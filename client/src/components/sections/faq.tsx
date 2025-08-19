import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { addStructuredData } from "@/lib/seo";

const faqs = [
  {
    question: "How does the 7-day process work?",
    answer: "Our 7-day process is designed for maximum efficiency. Day 1 focuses on strategy and understanding your goals. Days 2-3 involve UX/UI design and getting your approval. Days 4-6 are dedicated to development and integrations. Day 7 is for quality assurance and launch. You'll receive daily updates and have opportunities for feedback throughout."
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
    answer: "Post-launch, you receive complete documentation, training videos, and 30 days of free support for any technical issues. We also offer ongoing maintenance plans that include security updates, content updates, performance monitoring, and priority support."
  },
  {
    question: "Why don't you show pricing?",
    answer: "Every business has unique needs, and we believe in providing accurate quotes based on your specific requirements. Rather than showing generic pricing that might not apply to your situation, we prefer to understand your goals first and provide a detailed, personalized proposal that ensures you get exactly what you need."
  },
  {
    question: "How do revisions work inside the 7 days?",
    answer: "We include up to 3 rounds of revisions within the 7-day timeline. These are built into our process - one after the initial design presentation, one during development, and one final review before launch. We work closely with you to ensure we get it right the first time, but revisions are there when you need them."
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
              Everything you need to know about our 7-day website building process.
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
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <div
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
