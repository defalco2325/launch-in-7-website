import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Check, AlertCircle, X } from "lucide-react";
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
  
  // Files
  logoFiles: File[];
  brandGuide: File | null;
  photos: File[];
  otherAssets: File[];
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
  packageInterest: "",
  logoFiles: [],
  brandGuide: null,
  photos: [],
  otherAssets: []
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
      // Don't save files to localStorage
      delete (dataToSave as any).logoFiles;
      delete (dataToSave as any).brandGuide;
      delete (dataToSave as any).photos;
      delete (dataToSave as any).otherAssets;
      
      localStorage.setItem('client-onboarding-draft', JSON.stringify(dataToSave));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    console.log('Form validation - checking values:', {
      businessName: formData.businessName,
      contactName: formData.contactName,
      email: formData.email,
      businessNameTrimmed: formData.businessName?.trim(),
      contactNameTrimmed: formData.contactName?.trim(),
      emailTrimmed: formData.email?.trim()
    });

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
      console.log('Validation failed: Business name missing');
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
      console.log('Validation failed: Contact name missing');
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      console.log('Validation failed: Email missing');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Form validation result:', isValid, 'Errors:', newErrors);
    return isValid;
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

  const handleFileChange = (field: keyof Pick<ClientsFormData, 'logoFiles' | 'brandGuide' | 'photos' | 'otherAssets'>, files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (field === 'brandGuide') {
      setFormData(prev => ({ ...prev, [field]: files[0] || null }));
    } else {
      const fileArray = Array.from(files);
      // Append new files to existing ones
      setFormData(prev => ({ 
        ...prev, 
        [field]: [...(prev[field] as File[]), ...fileArray]
      }));
    }
  };

  const removeFile = (field: keyof Pick<ClientsFormData, 'logoFiles' | 'brandGuide' | 'photos' | 'otherAssets'>, index: number) => {
    if (field === 'brandGuide') {
      setFormData(prev => ({ ...prev, [field]: null }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as File[]).filter((_, i) => i !== index)
      }));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileList = (files: File[], field: keyof Pick<ClientsFormData, 'logoFiles' | 'photos' | 'otherAssets'>) => {
    if (files.length === 0) return null;
    
    return (
      <div className="mt-3 space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(field, index)}
              className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              data-testid={`remove-file-${field}-${index}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    
    // Check if already submitting
    if (isSubmitting) {
      return;
    }

    // Validate form
    console.log('About to validate form...');
    if (!validateForm()) {
      console.log('Form validation failed, not submitting');
      return;
    }
    console.log('Form validation passed, proceeding with submission');

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors
    
    try {
      // Clear draft from localStorage before submitting
      localStorage.removeItem('client-onboarding-draft');
      
      // Create FormData for file upload to Netlify Function
      const formDataToSubmit = new FormData();
      
      // Add text fields
      formDataToSubmit.append('businessName', formData.businessName?.trim() || '');
      formDataToSubmit.append('tagline', formData.tagline?.trim() || '');
      formDataToSubmit.append('website', formData.website?.trim() || '');
      formDataToSubmit.append('shortDescription', formData.shortDescription?.trim() || '');
      formDataToSubmit.append('contactName', formData.contactName?.trim() || '');
      formDataToSubmit.append('email', formData.email?.trim() || '');
      formDataToSubmit.append('phone', formData.phone?.trim() || '');
      formDataToSubmit.append('pagesSelected', formData.pages?.join(', ') || '');
      formDataToSubmit.append('featuresSelected', formData.features?.join(', ') || '');
      formDataToSubmit.append('copywriting', formData.copywriting || '');
      formDataToSubmit.append('seo', formData.seo || '');
      formDataToSubmit.append('timeline', formData.timeline || '');
      formDataToSubmit.append('packageInterest', formData.packageInterest || '');
      
      // Add file attachments
      formData.logoFiles.forEach((file, index) => {
        if (file instanceof File) {
          formDataToSubmit.append('logoFiles', file);
        }
      });
      
      if (formData.brandGuide instanceof File) {
        formDataToSubmit.append('brandGuide', formData.brandGuide);
      }
      
      formData.photos.forEach((file, index) => {
        if (file instanceof File) {
          formDataToSubmit.append('photos', file);
        }
      });
      
      formData.otherAssets.forEach((file, index) => {
        if (file instanceof File) {
          formDataToSubmit.append('otherAssets', file);
        }
      });
      
      // Submit to existing local route (already has SendGrid integration)
      const response = await fetch('/api/clients/submit', {
        method: 'POST',
        body: formDataToSubmit,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Form submission failed. Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.ok) {
        // Success - navigate to success page
        navigate('/clients/success');
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrors({ submit: `There was an error submitting your form: ${errorMessage}. Please try again.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.businessName.trim() && formData.contactName.trim() && 
    formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

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

      {/* File Uploads */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-deep-navy">File Uploads</h3>
        
        {/* Logo Files */}
        <div>
          <Label htmlFor="logoFiles" className="block text-sm font-medium text-gray-700 mb-2">
            Logo Files (multiple)
          </Label>
          <div className="relative">
            <input
              id="logoFiles"
              name="logoFiles"
              type="file"
              multiple
              accept="image/*,.pdf,.ai,.eps,.svg"
              onChange={(e) => handleFileChange('logoFiles', e.target.files)}
              className="hidden"
              data-testid="file-logo"
            />
            <label
              htmlFor="logoFiles"
              className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-electric-blue transition-colors"
            >
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">
                  {formData.logoFiles.length > 0 
                    ? `Add more logo files (${formData.logoFiles.length} selected)`
                    : "Click to upload logo files"
                  }
                </span>
              </div>
            </label>
          </div>
          {renderFileList(formData.logoFiles, 'logoFiles')}
        </div>

        {/* Brand Guide */}
        <div>
          <Label htmlFor="brandGuide" className="block text-sm font-medium text-gray-700 mb-2">
            Brand Guide (single file)
          </Label>
          <div className="relative">
            <input
              id="brandGuide"
              name="brandGuide"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => handleFileChange('brandGuide', e.target.files)}
              className="hidden"
              data-testid="file-brand-guide"
            />
            <label
              htmlFor="brandGuide"
              className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-electric-blue transition-colors"
            >
              <div className="text-center">
                <Upload className="mx-auto h-5 w-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">
                  {formData.brandGuide 
                    ? "Replace brand guide"
                    : "Click to upload brand guide"
                  }
                </span>
              </div>
            </label>
          </div>
          {formData.brandGuide && (
            <div className="mt-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{formData.brandGuide.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(formData.brandGuide.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('brandGuide', 0)}
                  className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  data-testid="remove-file-brand-guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Photos */}
        <div>
          <Label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
            Photos (multiple)
          </Label>
          <div className="relative">
            <input
              id="photos"
              name="photos"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange('photos', e.target.files)}
              className="hidden"
              data-testid="file-photos"
            />
            <label
              htmlFor="photos"
              className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-electric-blue transition-colors"
            >
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">
                  {formData.photos.length > 0 
                    ? `Add more photos (${formData.photos.length} selected)`
                    : "Click to upload photos"
                  }
                </span>
              </div>
            </label>
          </div>
          {renderFileList(formData.photos, 'photos')}
        </div>

        {/* Other Assets */}
        <div>
          <Label htmlFor="otherAssets" className="block text-sm font-medium text-gray-700 mb-2">
            Other Assets (multiple)
          </Label>
          <div className="relative">
            <input
              id="otherAssets"
              name="otherAssets"
              type="file"
              multiple
              onChange={(e) => handleFileChange('otherAssets', e.target.files)}
              className="hidden"
              data-testid="file-other-assets"
            />
            <label
              htmlFor="otherAssets"
              className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-electric-blue transition-colors"
            >
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">
                  {formData.otherAssets.length > 0 
                    ? `Add more files (${formData.otherAssets.length} selected)`
                    : "Click to upload other assets"
                  }
                </span>
              </div>
            </label>
          </div>
          {renderFileList(formData.otherAssets, 'otherAssets')}
        </div>
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