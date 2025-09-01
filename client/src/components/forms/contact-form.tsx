import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      message: "",
      type: "contact",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Prepare data for Netlify Forms submission
      const formData = {
        "form-name": "launchin7-contact",
        "bot-field": "", // Honeypot field (empty for humans)
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        website: data.website || "",
        message: data.message
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
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
        // Don't auto-redirect - let the user see the success message
        // They can manually navigate if needed
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
        <h3 className="font-poppins font-semibold text-xl mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600">
          We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6"
      data-netlify="true"
      data-react-form="true"
      name="launchin7-contact"
      method="POST"
      action="/thanks"
      netlify-honeypot="bot-field"
    >
      {/* Hidden input for Netlify form detection */}
      <input type="hidden" name="form-name" value="launchin7-contact" />
      {/* Honeypot field (hidden from users) */}
      <p className="hidden">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </Label>
          <Input
            id="contact-name"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent focus:outline-none focus:ring-offset-2"
            data-testid="input-contact-name"
            aria-required="true"
            aria-describedby={form.formState.errors.name ? "contact-name-error" : undefined}
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p id="contact-name-error" className="text-red-500 text-sm mt-1" role="alert" aria-live="polite">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            data-testid="input-contact-email"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            data-testid="input-contact-phone"
            {...form.register("phone")}
          />
        </div>

        <div>
          <Label htmlFor="contact-website" className="block text-sm font-medium text-gray-700 mb-2">
            Current Website
          </Label>
          <Input
            id="contact-website"
            type="url"
            placeholder="https://yourwebsite.com (optional)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            data-testid="input-contact-website"
            {...form.register("website")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
          Project Details *
        </Label>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
          data-testid="textarea-contact-message"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
        data-testid="button-submit-contact"
      >
        {form.formState.isSubmitting ? "Sending..." : "Send My Project Details"}
      </Button>
    </form>
  );
}
