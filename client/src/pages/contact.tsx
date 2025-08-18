import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/forms/contact-form";

export default function Contact() {
  useEffect(() => {
    updateSEO({
      title: "Contact Launch in 7 - Start Your 7-Day Website Build",
      description: "Ready to launch your website in 7 days? Contact us for a detailed proposal. 7-day turnaround guarantee.",
      url: typeof window !== "undefined" ? window.location.href : "",
    });
  }, []);

  const processSteps = [
    "We'll review your project details within 24 hours",
    "Schedule a strategy call to discuss your goals", 
    "Receive a detailed proposal and timeline",
    "Start your 7-day build process",
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="font-poppins font-bold text-4xl text-deep-navy mb-6">
                Let's Build Your Website Together
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to get started? Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                  <ContactForm />
                </div>
              </motion.div>
              
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {/* Guarantee Block */}
                <div className="bg-deep-navy text-white rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-success-green rounded-lg flex items-center justify-center mr-4">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg">7-Day Guarantee</h3>
                      <p className="text-gray-300 text-sm">or it's completely free</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    We're so confident in our process that if we miss the 7-day deadline due to our process, your entire build is free.
                  </p>
                  <div className="border-t border-white/20 pt-6">
                    <h4 className="font-semibold mb-3">What happens next?</h4>
                    <div className="space-y-3 text-sm">
                      {processSteps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-xs font-medium">{index + 1}</span>
                          </div>
                          <p className="text-gray-300">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="bg-light-gray rounded-2xl p-8">
                  <h3 className="font-poppins font-semibold text-lg text-deep-navy mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="w-5 h-5 text-electric-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-deep-navy">Email</p>
                        <p className="text-gray-600 text-sm">hello@launchin7.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="w-5 h-5 text-electric-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-deep-navy">Phone</p>
                        <p className="text-gray-600 text-sm">(555) 123-7777</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-4">
                        <Clock className="w-5 h-5 text-electric-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-deep-navy">Response Time</p>
                        <p className="text-gray-600 text-sm">Within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
