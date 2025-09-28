import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import ClientsForm from "@/components/forms/ClientsForm";
import { CheckCircle, Star, Zap, Shield } from "lucide-react";

export default function Clients() {
  useEffect(() => {
    updateSEO({
      title: "Client Onboarding - Launch in 7 | Let's Get Started",
      description: "Complete your onboarding form and upload your brand assets. We'll handle the rest and have your website live in 7 days."
    });
  }, []);

  const includedFeatures = [
    "Professional website design & development",
    "Mobile-responsive across all devices",
    "SEO optimization & performance tuning", 
    "Contact forms & lead capture",
    "Social media integration",
    "Hosting & domain setup assistance",
    "7-day delivery guarantee",
    "30 days of free support",
    "Training & documentation",
    "SSL security & backups"
  ];

  const steps = [
    { number: "1", title: "Details", active: true },
    { number: "2", title: "Files", active: false },
    { number: "3", title: "Confirm", active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-blue/10 to-success-green/10 border border-electric-blue/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-electric-blue" />
            <span className="text-electric-blue font-semibold">Client Onboarding</span>
          </div>
          
          <h1 className="font-poppins font-black text-4xl lg:text-6xl text-deep-navy mb-6">
            Let's Launch in <span className="gradient-text">7 Days</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Fill out this form and upload your brand assets. We'll handle the rest.
          </p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center space-x-2 ${step.active ? 'text-electric-blue' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.active 
                      ? 'bg-electric-blue text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.number}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-12 h-px bg-gray-300 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12">
                <ClientsForm />
              </div>
            </div>

            {/* Sticky Summary Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* What's Included Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-deep-navy">
                      What's Included
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {includedFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 bg-success-green rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Card */}
                <div className="bg-gradient-to-br from-success-green/5 to-electric-blue/5 rounded-2xl border-2 border-success-green/20 p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="w-6 h-6 text-success-green" />
                    <h4 className="font-bold text-deep-navy">7-Day Guarantee</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your website will be live within 7 days of submission, or the project is completely free.
                  </p>
                </div>

                {/* Next Steps Card */}
                <div className="bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 rounded-2xl border-2 border-electric-blue/20 p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="w-6 h-6 text-electric-blue" />
                    <h4 className="font-bold text-deep-navy">What Happens Next</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                      <span>Review within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                      <span>Kickoff call scheduling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                      <span>7-day development sprint</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                      <span>Launch & handover</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}