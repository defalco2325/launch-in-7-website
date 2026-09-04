import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { shouldNavigateToClientSuccess } from "@/lib/client-submission";

interface ClientsFormData {
  businessName: string;
  website: string;
  shortDescription: string;
  biggestChallenge: string;
  contactName: string;
  email: string;
  phone: string;
  solutionsInterested: string[];
  objectives: string[];
  timeline: string;
  budget: string;
}

const INITIAL_FORM_DATA: ClientsFormData = {
  businessName: "",
  website: "",
  shortDescription: "",
  biggestChallenge: "",
  contactName: "",
  email: "",
  phone: "",
  solutionsInterested: [],
  objectives: [],
  timeline: "",
  budget: "",
};

const SOLUTIONS_OPTIONS = [
  "Customer Acquisition Systems",
  "CRM & Automation Systems",
  "Conversion Website Systems",
  "Booking & Transaction Systems",
  "Data & Intelligence Systems",
  "AI Business Tools",
  "Not Sure — Help Me Diagnose",
];

const OBJECTIVES_OPTIONS = [
  "Generate more leads",
  "Convert more traffic",
  "Automate follow-up",
  "Reduce manual work",
  "Track performance & ROI",
  "Improve customer experience",
  "Scale operations",
  "Speed up booking / sales",
];

const TIMELINE_OPTIONS = [
  { value: "focused-launch", label: "Focused Launch — may qualify for a 7-day sprint" },
  { value: "4-8-weeks", label: "4–8 weeks — scoped build" },
  { value: "2-3-months", label: "2–3 months — larger connected build" },
  { value: "flexible", label: "Flexible — let's talk" },
];

const BUDGET_OPTIONS = [
  { value: "launch-2500", label: "$2,500 — Launch" },
  { value: "growth-4500", label: "$4,500 — Growth" },
  { value: "scale-7500-plus", label: "$7,500+ — Scale" },
  { value: "growth-os-1250-monthly", label: "$1,250+/month — Growth OS" },
  { value: "not-sure", label: "Not sure yet" },
];

interface ClientsFormProps {
  onSolutionChange?: (value: string) => void;
}

export default function ClientsForm({ onSolutionChange }: ClientsFormProps) {
  const [formData, setFormData] = useState<ClientsFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, navigate] = useLocation();

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('client-project-draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  // Save draft
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem('client-project-draft', JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(id);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ClientsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCheckboxChange = (field: 'solutionsInterested' | 'objectives', value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      localStorage.removeItem('client-project-draft');

      const response = await fetch("/api/clients/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "launchin7-clients",
          businessName: formData.businessName.trim(),
          website: formData.website.trim(),
          shortDescription: formData.shortDescription.trim(),
          biggestChallenge: formData.biggestChallenge.trim(),
          contactName: formData.contactName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          solutionsInterested: formData.solutionsInterested.join(', '),
          objectives: formData.objectives.join(', '),
          timeline: formData.timeline,
          budget: formData.budget,
        }).toString(),
      });

      const result = await response.json().catch(() => null);

      if (shouldNavigateToClientSuccess(response.ok, result)) {
        navigate('/clients/success');
      } else {
        throw new Error(result?.message || `Submission failed (${response.status})`);
      }
    } catch (error) {
      setErrors({ submit: `There was an error submitting your form. Please try again or call us directly.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.businessName.trim() &&
    formData.contactName.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const fieldClass = (field: string) =>
    `w-full px-4 py-3 bg-[#f4f0e7] border-2 rounded-xl focus:ring-2 focus:ring-[#dc7253] focus:border-[#dc7253] transition-all ${
      errors[field] ? 'border-red-400' : 'border-gray-200'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
      data-netlify="true"
      name="launchin7-clients"
      method="POST"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="launchin7-clients" />
      <p className="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      {/* Business Info */}
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-deep-navy">About Your Business</h3>
          <p className="text-sm text-gray-500 mt-1">Help us understand what you do and who you serve.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-2">
              Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className={fieldClass('businessName')}
              placeholder="Your company name"
            />
            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
          </div>

          <div>
            <Label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
              Current Website
            </Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className={fieldClass('website')}
              placeholder="example.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 mb-2">
            What does your business do?
          </Label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={3}
            value={formData.shortDescription}
            onChange={(e) => handleInputChange('shortDescription', e.target.value)}
            className={fieldClass('shortDescription')}
            placeholder="Briefly describe your business, your customers, and what you sell..."
          />
        </div>

        <div>
          <Label htmlFor="biggestChallenge" className="block text-sm font-semibold text-gray-700 mb-2">
            What's your biggest growth challenge right now?
          </Label>
          <textarea
            id="biggestChallenge"
            name="biggestChallenge"
            rows={3}
            value={formData.biggestChallenge}
            onChange={(e) => handleInputChange('biggestChallenge', e.target.value)}
            className={fieldClass('biggestChallenge')}
            placeholder="E.g. We can't generate consistent leads, our follow-up is manual, we have no visibility into our pipeline..."
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-deep-navy">Your Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className={fieldClass('contactName')}
              placeholder="First and last name"
            />
            {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={fieldClass('email')}
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="max-w-xs">
          <Label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={fieldClass('phone')}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      {/* Solutions of Interest */}
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-deep-navy">Solutions of Interest</h3>
          <p className="text-sm text-gray-500 mt-1">Which systems are most relevant to your needs? Select all that apply.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOLUTIONS_OPTIONS.map((sol) => (
            <label key={sol} className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="solutionsInterested"
                  value={sol}
                  checked={formData.solutionsInterested.includes(sol)}
                  onChange={(e) => handleCheckboxChange('solutionsInterested', sol, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  formData.solutionsInterested.includes(sol)
                    ? 'bg-[#123842] border-[#123842]'
                    : 'border-[#cbd2cb] group-hover:border-[#dc7253]'
                }`}>
                  {formData.solutionsInterested.includes(sol) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-snug group-hover:text-deep-navy transition-colors">{sol}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Key Objectives */}
      <div className="space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-deep-navy">Key Objectives</h3>
          <p className="text-sm text-gray-500 mt-1">What outcomes matter most to you?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {OBJECTIVES_OPTIONS.map((obj) => (
            <label key={obj} className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="objectives"
                  value={obj}
                  checked={formData.objectives.includes(obj)}
                  onChange={(e) => handleCheckboxChange('objectives', obj, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  formData.objectives.includes(obj)
                    ? 'bg-[#6fae91] border-[#6fae91]'
                    : 'border-[#cbd2cb] group-hover:border-[#6fae91]'
                }`}>
                  {formData.objectives.includes(obj) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-snug group-hover:text-deep-navy transition-colors">{obj}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Timeline + Budget */}
      <div className="space-y-6">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-deep-navy">Timeline & Budget</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-2">Ideal Timeline</Label>
            <Select onValueChange={(v) => handleInputChange('timeline', v)} value={formData.timeline}>
              <SelectTrigger className="w-full px-4 py-3 bg-[#f4f0e7] border-2 border-[#cbd2cb] rounded-xl focus:ring-2 focus:ring-[#dc7253] focus:border-[#dc7253] transition-all">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {TIMELINE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</Label>
            <Select onValueChange={(v) => handleInputChange('budget', v)} value={formData.budget}>
              <SelectTrigger className="w-full px-4 py-3 bg-[#f4f0e7] border-2 border-[#cbd2cb] rounded-xl focus:ring-2 focus:ring-[#dc7253] focus:border-[#dc7253] transition-all">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-2">
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-red-600 text-sm">{errors.submit}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-[#dc7253] hover:bg-[#c96347] text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#dc7253] focus:ring-offset-2 text-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="l7-loader mr-3" aria-hidden="true"></span>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Submit & Start My Project
              <Check className="w-5 h-5 ml-2" />
            </span>
          )}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          We'll review your submission within 24 hours and reach out to schedule a discovery call.
        </p>
      </div>
    </form>
  );
}
