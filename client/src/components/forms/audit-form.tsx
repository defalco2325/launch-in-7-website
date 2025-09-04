import { useState } from "react";
import { Check } from "lucide-react";

export default function AuditForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch("/", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-poppins font-semibold text-xl mb-2 text-deep-navy">
          Audit Request Submitted!
        </h3>
        <p className="text-gray-600">
          We'll review your site and send insights within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        data-netlify="true"
        name="launchin7-audit"
        method="POST"
        netlify-honeypot="bot-field"
      >
        {/* Hidden input for Netlify form detection */}
        <input type="hidden" name="form-name" value="launchin7-audit" />
        {/* Honeypot field (hidden from users) */}
        <p className="hidden">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>
        
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="audit-name" className="block text-sm font-semibold text-deep-navy mb-3">
              Full Name *
            </label>
            <input
              id="audit-name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-name"
            />
          </div>

          <div>
            <label htmlFor="audit-email" className="block text-sm font-semibold text-deep-navy mb-3">
              Email Address *
            </label>
            <input
              id="audit-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-email"
            />
          </div>

          <div>
            <label htmlFor="audit-website" className="block text-sm font-semibold text-deep-navy mb-3">
              Website URL *
            </label>
            <input
              id="audit-website"
              name="website"
              type="url"
              required
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-website"
            />
          </div>

          <div>
            <label htmlFor="audit-goal" className="block text-sm font-semibold text-deep-navy mb-3">
              Primary Goal *
            </label>
            <select
              id="audit-goal"
              name="goal"
              required
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="select-audit-goal"
            >
              <option value="">Select your main goal</option>
              <option value="increase-traffic">Increase Traffic</option>
              <option value="improve-conversions">Improve Conversions</option>
              <option value="better-performance">Better Performance</option>
              <option value="modernize-design">Modernize Design</option>
              <option value="add-ecommerce">Add E-commerce</option>
              <option value="mobile-optimization">Mobile Optimization</option>
            </select>
          </div>

          <div>
            <label htmlFor="audit-timeline" className="block text-sm font-semibold text-deep-navy mb-3">
              Timeline *
            </label>
            <select
              id="audit-timeline"
              name="timeline"
              required
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="select-audit-timeline"
            >
              <option value="">When do you need this?</option>
              <option value="asap">ASAP</option>
              <option value="this-month">This Month</option>
              <option value="next-month">Next Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="exploring">Just Exploring</option>
            </select>
          </div>

          <div>
            <label htmlFor="audit-budget" className="block text-sm font-semibold text-deep-navy mb-3">
              Budget Range *
            </label>
            <select
              id="audit-budget"
              name="budget"
              required
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="select-audit-budget"
            >
              <option value="">Select budget range</option>
              <option value="200-500">$200 - $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000-4000">$3,000 - $4,000</option>
              <option value="4000-5000">$4,000 - $5,000</option>
              <option value="5000-plus">$5,000+</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            data-testid="button-audit-submit"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Analyzing...
              </div>
            ) : (
              "Get My Free Audit"
            )}
          </button>

          <button
            type="button"
            className="sm:w-auto bg-gradient-to-r from-success-green to-tech-orange hover:from-success-green/90 hover:to-tech-orange/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            data-testid="button-book-call"
          >
            Book a Call Instead
          </button>
        </div>
      </form>
    </>
  );
}