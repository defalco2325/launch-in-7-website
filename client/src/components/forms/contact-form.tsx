import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

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

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/lead", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
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
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </Label>
          <Input
            id="contact-name"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            data-testid="input-contact-name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
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
        disabled={submitMutation.isPending}
        className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
        data-testid="button-submit-contact"
      >
        {submitMutation.isPending ? "Sending..." : "Send My Project Details"}
      </Button>
    </form>
  );
}
