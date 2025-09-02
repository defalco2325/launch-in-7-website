import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { addStructuredData } from "@/lib/seo";

const faqs = [
  {
    question: "What exactly does LaunchIn7 do?",
    answer: "We specialize in designing and building modern, mobile-friendly websites for small businesses—delivered in just 7 days. Our sites are optimized for performance, SEO, and conversions so your business looks professional and attracts more customers online."
  },
  {
    question: "How is LaunchIn7 different from other web design agencies?",
    answer: "• Speed: We deliver your new website in 7 days (most agencies take weeks or months). • Focus on ROI: We don't just design pretty websites—we create sites that convert visitors into paying customers. • All-in-one: We handle design, development, copywriting assistance, and launch. You don't need multiple vendors. • Transparent pricing: No hidden fees or hourly surprises—flat, upfront pricing."
  },
  {
    question: "What types of businesses do you work with?",
    answer: "We work with small to mid-sized businesses across industries like restaurants, salons, gyms, professional services, healthcare, contractors, and more. If you need a professional online presence that drives leads, we're a fit."
  },
  {
    question: "How does the 7-day process work?",
    answer: "1. Day 1: Kickoff call + intake (goals, branding, content, examples). 2. Day 2-4: Design + build (draft homepage, internal pages, mobile layout). 3. Day 5: Revisions + client feedback. 4. Day 6: Final polish (SEO, integrations, speed optimization). 5. Day 7: Launch (site goes live + training on how to update it)."
  },
  {
    question: "Do I need to provide all the content?",
    answer: "If you already have text, images, or branding—we'll use them. If not, we can assist with copywriting, stock images, and branding to make sure your site looks polished and professional."
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
