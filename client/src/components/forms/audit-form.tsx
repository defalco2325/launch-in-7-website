import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { auditFormSchema, type AuditFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

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
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: AuditFormData) => {
      return apiRequest("POST", "/api/audit", data);
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: "Audit Request Submitted!",
        description: "We'll review your site and send insights within 24 hours.",
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

  const onSubmit = (data: AuditFormData) => {
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
        <h3 className="font-poppins font-semibold text-xl mb-2 text-deep-navy">
          Audit Request Submitted!
        </h3>
        <p className="text-gray-600">
          We'll review your site and send insights within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <SelectTrigger className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all">
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

        <div className="md:col-span-2">
          <Label htmlFor="audit-timeline" className="block text-sm font-semibold text-deep-navy mb-3">
            Timeline *
          </Label>
          <Select onValueChange={(value) => form.setValue("timeline", value as any)} data-testid="select-audit-timeline">
            <SelectTrigger className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-deep-navy focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all">
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
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={submitMutation.isPending}
          className="gradient-bg text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 glow-effect min-w-[240px]"
          data-testid="button-submit-audit"
        >
          {submitMutation.isPending ? "Submitting..." : "Get My Free Audit"}
        </Button>
      </div>
    </form>
  );
}
