import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { Zap, Eye, Target, Check } from "lucide-react";

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "About Launch in 7 - Building Better Websites, Faster",
      description: "Learn about our team, values, and proven 7-day process for delivering premium websites. Speed, clarity, and results-driven outcomes.",
      url: typeof window !== "undefined" ? window.location.href : "",
    });
  }, []);

  const values = [
    { icon: Zap, title: "Speed", description: "Fast delivery without compromising quality" },
    { icon: Eye, title: "Clarity", description: "Transparent process and clear communication" },
    { icon: Target, title: "Outcomes", description: "Results-driven design that converts" },
  ];

  const processSteps = [
    { day: "1", title: "Strategy", description: "Goals, audience, and competitive analysis" },
    { day: "2-3", title: "Design", description: "Wireframes, mockups, and user experience" },
    { day: "4-6", title: "Build", description: "Development, integrations, and content" },
    { day: "7", title: "Launch", description: "Testing, optimization, and go-live" },
  ];

  const qualityStandards = [
    {
      title: "Quality Assurance",
      items: ["Cross-browser testing", "Mobile responsiveness", "Performance optimization", "SEO implementation"]
    },
    {
      title: "Accessibility",
      items: ["WCAG 2.1 compliance", "Keyboard navigation", "Screen reader friendly", "Color contrast ratios"]
    },
    {
      title: "Performance",
      items: ["Sub-2s load times", "Core Web Vitals optimization", "Image optimization", "CDN implementation"]
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Main Content */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Founder/Team Intro */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional development team in modern office" 
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="font-poppins font-bold text-4xl text-deep-navy mb-6">
                  Building Better Websites, Faster
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We started Launch in 7 because we saw too many businesses waiting months for websites that didn't deliver results. Our team of designers, developers, and strategists created a streamlined process that delivers premium websites in just 7 days.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  With over 500+ successful launches, we've proven that speed doesn't mean compromising on quality. Every website we build is designed to convert visitors into customers while meeting the highest standards for performance and accessibility.
                </p>
                
                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mx-auto mb-3">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-poppins font-semibold text-deep-navy mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Mini Process Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="font-poppins font-bold text-3xl text-deep-navy mb-4">Our Proven Process</h2>
                <p className="text-lg text-gray-600">The same 7-day process we use for every client, refined over hundreds of projects.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 text-white rounded-full font-bold text-lg flex items-center justify-center mx-auto mb-4 ${
                      index === 0 ? "bg-electric-blue" : 
                      index === 1 ? "bg-aqua" : 
                      index === 2 ? "bg-electric-blue" : 
                      "bg-success-green"
                    }`}>
                      {step.day}
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-deep-navy mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Our Standards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 lg:p-12"
            >
              <h2 className="font-poppins font-bold text-3xl text-deep-navy mb-8 text-center">Our Standards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualityStandards.map((standard, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="font-poppins font-semibold text-lg text-deep-navy mb-4">{standard.title}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {standard.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <Check className="w-4 h-4 text-success-green mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
