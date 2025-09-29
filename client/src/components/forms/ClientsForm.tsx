import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

interface ClientsFormData {
  // Business Basics
  businessName: string;
  tagline: string;
  website: string;
  shortDescription: string;
  
  // Contact
  contactName: string;
  email: string;
  phone: string;
  
  // Pages Needed
  pages: string[];
  
  // Features
  features: string[];
  
  // Copywriting
  copywriting: string;
  
  // SEO
  seo: string;
  
  // Timeline
  timeline: string;
  
  // Package Interest
  packageInterest: string;
}

const INITIAL_FORM_DATA: ClientsFormData = {
  businessName: "",
  tagline: "",
  website: "",
  shortDescription: "",
  contactName: "",
  email: "",
  phone: "",
  pages: [],
  features: [],
  copywriting: "",
  seo: "",
  timeline: "",
  packageInterest: ""
};

const PAGES_OPTIONS = [
  "Home", "About", "Services", "Blog", "Contact", "Portfolio/Case Studies", "Other"
];

const FEATURES_OPTIONS = [
  "Contact Form", "Email Opt-in", "Calendar Booking", "Payments/Checkout", 
  "Member Area", "Blog+CMS", "Other"
];

const COPYWRITING_OPTIONS = [
  { value: "have-copy", label: "Have Copy" },
  { value: "need-polish", label: "Need Polish" },
  { value: "need-full-copy", label: "Need Full Copy" }
];

const SEO_OPTIONS = [
  { value: "basic", label: "Basic" },
  { value: "deeper", label: "Deeper" }
];

const TIMELINE_OPTIONS = [
  { value: "7-days", label: "7 Days" },
  { value: "2-3-weeks", label: "2–3 Weeks" },
  { value: "flexible", label: "Flexible" }
];

const PACKAGE_OPTIONS = [
  { value: "starter", label: "Starter" },
  { value: "professional", label: "Professional" },
  { value: "premium", label: "Premium" },
  { value: "not-sure", label: "Not Sure" }
];

interface ClientsFormProps {
  onPackageChange?: (packageValue: string) => void;
}

export default function ClientsForm({ onPackageChange }: ClientsFormProps) {
  const [formData, setFormData] = useState<ClientsFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [, navigate] = useLocation();

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('client-onboarding-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({ ...prev, ...parsed }));
        // Notify parent of loaded package selection
        if (parsed.packageInterest && onPackageChange) {
          onPackageChange(parsed.packageInterest);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [onPackageChange]);

  // Save draft to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const dataToSave = { ...formData };
      
      localStorage.setItem('client-onboarding-draft', JSON.stringify(dataToSave));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName || !formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.contactName || !formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ClientsFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Notify parent when package selection changes
    if (field === 'packageInterest' && onPackageChange) {
      onPackageChange(value);
    }
  };

  const handleCheckboxChange = (field: 'pages' | 'features', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if already submitting
    if (isSubmitting) {
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // Clear draft from localStorage before submitting
      localStorage.removeItem('client-onboarding-draft');
      
      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "launchin7-clients",
          businessName: formData.businessName?.trim() || '',
          tagline: formData.tagline?.trim() || '',
          website: formData.website?.trim() || '',
          shortDescription: formData.shortDescription?.trim() || '',
          contactName: formData.contactName?.trim() || '',
          email: formData.email?.trim() || '',
          phone: formData.phone?.trim() || '',
          pagesSelected: formData.pages?.join(', ') || '',
          featuresSelected: formData.features?.join(', ') || '',
          copywriting: formData.copywriting || '',
          seo: formData.seo || '',
          timeline: formData.timeline || '',
          packageInterest: formData.packageInterest || ''
        }).toString()
      });
      
      if (response.ok) {
        // Success - navigate to success page
        navigate('/clients/success');
      } else {
        throw new Error(`Form submission failed. Status: ${response.status}`);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrors({ submit: `There was an error submitting your form: ${errorMessage}. Please try again.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.businessName?.trim() && formData.contactName?.trim() && 
    formData.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-8"
      data-netlify="true"
      name="launchin7-clients"
      method="POST"
      netlify-honeypot="bot-field"
    >
      {/* Hidden input for Netlify form detection */}
      <input type="hidden" name="form-name" value="launchin7-clients" />
      {/* Honeypot field for spam protection (hidden from users) */}
      <p className="hidden">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
      </p>

      {/* Business Basics */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-deep-navy">Business Basics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all ${errors.businessName ? 'border-red-500' : ''}`}
              data-testid="input-business-name"
              required
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </Label>
            <Input
              id="tagline"
              name="tagline"
              type="text"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
              data-testid="input-tagline"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
            Current Website
          </Label>
          <Input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
            placeholder="example.com"
            data-testid="input-website"
          />
        </div>

        <div>
          <Label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </Label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={4}
            value={formData.shortDescription}
            onChange={(e) => handleInputChange('shortDescription', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
            placeholder="Tell us about your business..."
            data-testid="textarea-description"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-deep-navy">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Name *
            </Label>
            <Input
              id="contactName"
              name="contactName"
              type="text"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all ${errors.contactName ? 'border-red-500' : ''}`}
              data-testid="input-contact-name"
              required
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all ${errors.email ? 'border-red-500' : ''}`}
              data-testid="input-email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all"
            data-testid="input-phone"
          />
        </div>
      </div>

      {/* Pages Needed */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">Pages Needed</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PAGES_OPTIONS.map((page) => (
            <label key={page} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="pages"
                value={page}
                checked={formData.pages.includes(page)}
                onChange={(e) => handleCheckboxChange('pages', page, e.target.checked)}
                className="rounded border-2 border-gray-400 text-electric-blue focus:ring-electric-blue"
                data-testid={`checkbox-page-${page.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              />
              <span className="text-sm text-gray-700">{page}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES_OPTIONS.map((feature) => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={formData.features.includes(feature)}
                onChange={(e) => handleCheckboxChange('features', feature, e.target.checked)}
                className="rounded border-2 border-gray-400 text-electric-blue focus:ring-electric-blue"
                data-testid={`checkbox-feature-${feature.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Copywriting */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">Copywriting</h3>
        <div className="space-y-3">
          {COPYWRITING_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="copywriting"
                value={option.value}
                checked={formData.copywriting === option.value}
                onChange={(e) => handleInputChange('copywriting', e.target.value)}
                className="border-2 border-gray-400 text-electric-blue focus:ring-electric-blue"
                data-testid={`radio-copywriting-${option.value}`}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">SEO</h3>
        <div className="space-y-3">
          {SEO_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="seo"
                value={option.value}
                checked={formData.seo === option.value}
                onChange={(e) => handleInputChange('seo', e.target.value)}
                className="border-2 border-gray-400 text-electric-blue focus:ring-electric-blue"
                data-testid={`radio-seo-${option.value}`}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">Timeline</h3>
        <div className="space-y-3">
          {TIMELINE_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="timeline"
                value={option.value}
                checked={formData.timeline === option.value}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="border-2 border-gray-400 text-electric-blue focus:ring-electric-blue"
                data-testid={`radio-timeline-${option.value}`}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Package Interest */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-deep-navy">Package Interest</h3>
        <Select onValueChange={(value) => handleInputChange('packageInterest', value)} value={formData.packageInterest}>
          <SelectTrigger className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-electric-blue transition-all" data-testid="select-package-interest">
            <SelectValue placeholder="Select package" />
          </SelectTrigger>
          <SelectContent>
            {PACKAGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {/* Submit Button */}
      <div className="pt-6">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600">{errors.submit}</span>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-gradient-to-r from-electric-blue to-neon-cyan hover:from-electric-blue/90 hover:to-neon-cyan/90 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
          data-testid="button-submit-onboarding"
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>Submit & Launch My Website</span>
              <Check className="w-5 h-5 ml-2" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}