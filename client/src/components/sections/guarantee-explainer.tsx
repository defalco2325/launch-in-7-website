import { motion } from "framer-motion";
import Timeline7Day from "@/components/ui/timeline-7day";

export default function GuaranteeExplainer() {
  return (
    <section className="py-20 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-deep-navy mb-6">
              Our 7-Day Guarantee
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              If we miss the 7-day launch due to our process, your build is free.
            </p>
          </motion.div>
          
          <Timeline7Day activeDay={3} />
        </div>
      </div>
    </section>
  );
}
