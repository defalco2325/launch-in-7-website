import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema, type AuditFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import CalendlyPopup from "@/components/ui/calendly-popup";

export default function AuditForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      goal: undefined,
      timeline: undefined,
      budget: undefined,
    },
  });

  const onSubmit = async (data: AuditFormData) => {
    try {
      // Prepare data for Netlify Forms submission
      const formData = {
        "form-name": "launchin7-audit",
        "bot-field": "",
        name: data.name,
        email: data.email,
        website: data.website,
        goal: data.goal || "",
        timeline: data.timeline || "",
        budget: data.budget || ""
      };

      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: Object.keys(formData)
          .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key as keyof typeof formData]))
          .join("&"),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
        onSubmit={form.handleSubmit(onSubmit)} 
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
            <Label htmlFor="audit-name" className="block text-sm font-semibold text-deep-navy mb-3">
              Full Name *
            </Label>
            <Input
              id="audit-name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="audit-email" className="block text-sm font-semibold text-deep-navy mb-3">
              Email Address *
            </Label>
            <Input
              id="audit-email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="audit-website" className="block text-sm font-semibold text-deep-navy mb-3">
              Website URL *
            </Label>
            <Input
              id="audit-website"
              type="url"
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy placeholder-gray-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-audit-website"
              {...form.register("website")}
            />
            {form.formState.errors.website && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.website.message}</p>
            )}
          </div>

          <div>
            <Label id="lbl-audit-goal" htmlFor="audit-goal" className="block text-sm font-semibold text-deep-navy mb-3">
              Primary Goal *
            </Label>
            <Select onValueChange={(value) => form.setValue("goal", value as AuditFormData["goal"])} value={form.watch("goal")}>
              <SelectTrigger 
                id="audit-goal"
                aria-labelledby="lbl-audit-goal"
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
                data-testid="select-audit-goal"
              >
                <SelectValue placeholder="Select your main goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase-traffic">Increase Traffic</SelectItem>
                <SelectItem value="improve-conversions">Improve Conversions</SelectItem>
                <SelectItem value="better-performance">Better Performance</SelectItem>
                <SelectItem value="modernize-design">Modernize Design</SelectItem>
                <SelectItem value="add-ecommerce">Add E-commerce</SelectItem>
                <SelectItem value="mobile-optimization">Mobile Optimization</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.goal && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.goal.message}</p>
            )}
          </div>

          <div>
            <Label id="lbl-audit-timeline" htmlFor="audit-timeline" className="block text-sm font-semibold text-deep-navy mb-3">
              Timeline *
            </Label>
            <Select onValueChange={(value) => form.setValue("timeline", value as AuditFormData["timeline"])} value={form.watch("timeline")}>
              <SelectTrigger 
                id="audit-timeline"
                aria-labelledby="lbl-audit-timeline"
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
                data-testid="select-audit-timeline"
              >
                <SelectValue placeholder="When do you need this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="exploring">Just Exploring</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.timeline && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.timeline.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label id="lbl-audit-budget" htmlFor="audit-budget" className="block text-sm font-semibold text-deep-navy mb-3">
              Budget Range *
            </Label>
            <Select onValueChange={(value) => form.setValue("budget", value as AuditFormData["budget"])} value={form.watch("budget")}>
              <SelectTrigger 
                id="audit-budget"
                aria-labelledby="lbl-audit-budget"
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
                data-testid="select-audit-budget"
              >
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="200-500">$200 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                <SelectItem value="3000-4000">$3,000 - $4,000</SelectItem>
                <SelectItem value="4000-5000">$4,000 - $5,000</SelectItem>
                <SelectItem value="5000-plus">$5,000+</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.budget && (
              <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.budget.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-4 pt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            data-testid="button-audit-submit"
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Analyzing...
              </div>
            ) : (
              "Get My Free Audit"
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsCalendlyOpen(true)}
            className="w-full bg-white border-2 border-gray-300 text-deep-navy hover:bg-gray-50 hover:border-gray-400 font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
            data-testid="button-schedule-consultation"
          >
            Schedule a Free Consultation
          </Button>
        </div>
      </form>

      {/* Calendly Popup */}
      <CalendlyPopup
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        url="https://calendly.com/infolaunchin7/30min"
      />
    </>
  );
}