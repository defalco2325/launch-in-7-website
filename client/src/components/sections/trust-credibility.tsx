import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function TrustCredibility() {
  const expectations = [
    {
      title: "Dedicated PM & Clear Daily Updates",
      description: "Stay informed with transparent communication throughout the entire process.",
    },
    {
      title: "Mobile-First Design", 
      description: "Optimized for smartphones and tablets where most of your traffic comes from.",
    },
    {
      title: "Accessibility (WCAG-Aware)",
      description: "Inclusive design that works for all users and improves search rankings.",
    },
    {
      title: "Secure Hosting & SSL",
      description: "Enterprise-grade security and fast global content delivery.",
    },
    {
      title: "Clean Handoff & Documentation",
      description: "Complete documentation and training so you can manage your site confidently.",
    },
  ];

  const techStack = [
    "Next.js", "Tailwind CSS", "shadcn/ui", "Node.js", "Stripe Ready",
    "Booking Systems", "Analytics", "SEO Tools", "Security"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* What You Can Expect */}
            <div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-bold text-3xl text-deep-navy mb-8">
                What You Can Expect
              </h2>
              <div className="space-y-4">
                {expectations.map((item, index) => (
                  <div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-success-green rounded-full flex items-center justify-center mr-4 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tools & Stack */}
            <div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-poppins font-bold text-3xl text-deep-navy mb-8">
                Our Tools & Stack
              </h2>
              <p className="text-gray-600 mb-8">
                We use cutting-edge technologies to build fast, secure, and scalable websites.
              </p>
              
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  <span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
