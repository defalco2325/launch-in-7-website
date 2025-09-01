import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditFormSchema, type AuditFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export default function AuditForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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
      // Create a form element for Netlify submission
      const formElement = document.createElement('form');
      formElement.setAttribute('data-netlify', 'true');
      formElement.setAttribute('name', 'audit');
      formElement.style.display = 'none';
      
      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.name = key;
        input.value = value || '';
        formElement.appendChild(input);
      });
      
      document.body.appendChild(formElement);
      
      // Submit to Netlify
      const formData = new FormData(formElement);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });
      
      document.body.removeChild(formElement);
      
      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Audit Request Submitted!",
          description: "We'll review your site and send insights within 24 hours.",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isSuccess) {
    return (
      <div
        className="text-center py-8 animate-fade-in-up"
      >
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
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6"
      data-netlify="true"
      name="audit"
      method="POST"
    >
      {/* Hidden input for Netlify form detection */}
      <input type="hidden" name="form-name" value="audit" />
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

        <div>
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
          <Label htmlFor="audit-goal" className="block text-sm font-semibold text-deep-navy mb-3">
            Primary Goal *
          </Label>
          <Select onValueChange={(value) => form.setValue("goal", value as any)} data-testid="select-audit-goal">
            <SelectTrigger 
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              aria-label="Select your primary goal for the website audit"
            >
              <SelectValue placeholder="Select your goal" />
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
          <Label htmlFor="audit-timeline" className="block text-sm font-semibold text-deep-navy mb-3">
            Timeline *
          </Label>
          <Select onValueChange={(value) => form.setValue("timeline", value as any)} data-testid="select-audit-timeline">
            <SelectTrigger 
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              aria-label="Select your project timeline for website development"
            >
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP (Within 7 days)</SelectItem>
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

        <div>
          <Label htmlFor="audit-budget" className="block text-sm font-semibold text-deep-navy mb-3">
            Budget *
          </Label>
          <Select onValueChange={(value) => form.setValue("budget", value as any)} data-testid="select-audit-budget">
            <SelectTrigger 
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              aria-label="Select your project budget range"
            >
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="200-500">$200+</SelectItem>
              <SelectItem value="500-1000">$500+</SelectItem>
              <SelectItem value="1000-2000">$1,000+</SelectItem>
              <SelectItem value="2000-3000">$2,000+</SelectItem>
              <SelectItem value="3000-4000">$3,000+</SelectItem>
              <SelectItem value="4000-5000">$4,000+</SelectItem>
              <SelectItem value="5000-plus">$5,000+</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.budget && (
            <p className="text-red-500 text-sm mt-1 font-medium">{form.formState.errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="gradient-bg text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 glow-effect min-w-[240px]"
          data-testid="button-submit-audit"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Get My Free Audit"}
        </Button>
        
        {/* Alternative: Schedule a Call */}
        <div className="flex items-center space-x-4 text-gray-500">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-sm font-medium">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => window.open('https://calendly.com/launchin7/website-strategy-discovery', '_blank')}
          className="bg-white border-2 border-electric-blue text-electric-blue px-8 py-3 rounded-xl font-semibold hover:bg-electric-blue hover:text-white transition-all duration-300"
          data-testid="button-schedule-call"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Schedule Strategy Call
        </Button>
      </div>
    </form>
  );
}
