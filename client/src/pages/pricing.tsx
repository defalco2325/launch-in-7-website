import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  // Features for each pricing tier
  const igniteFeatures = [
    "1–3 pages (Home, About, Contact)",
    "Mobile-friendly, branded design",
    "Contact form + social links",
    "Hosting & domain setup support",
    "7-day delivery"
  ];

  const growthFeatures = [
    "5–7 pages + custom layouts",
    "Copywriting for 3–4 pages",
    "SEO foundation",
    "Lead capture (opt-in / calendar link)",
    "1 revision round",
    "7-day launch"
  ];

  const scaleFeatures = [
    "8–12 custom pages",
    "Advanced features (bookings, payments, gated content)",
    "Conversion copywriting (all pages)",
    "Blog setup + CMS training",
    "Deeper SEO (keywords, schema basics)",
    "2–3 revisions + 30-day maintenance",
    "Dedicated project manager",
    "7-day delivery"
  ];

  const handleGetStarted = (tier: string) => {
    // TODO: Insert link/navigation logic for CTA buttons
    console.log(`Get started with ${tier} package`);
    // Example: navigate to contact form with pre-selected package
    // window.location.href = `/contact?package=${tier.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Launch Your Website in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              7 Days
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect package for your business. Professional websites delivered fast, 
            with no compromise on quality.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          
          {/* Ignite Package */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ignite</h3>
              <p className="text-gray-500 mb-4">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-sm text-gray-500">Starting at</span>
                <div className="text-4xl font-bold text-gray-900">$800</div>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {igniteFeatures.map((feature, index) => (
                <li key={index} className="flex items-start" data-testid={`ignite-feature-${index}`}>
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleGetStarted("Ignite")}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
              data-testid="button-ignite-get-started"
            >
              Get Started
            </Button>
          </div>

          {/* Growth Package - Most Popular */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-500 p-8 hover:shadow-2xl transition-shadow duration-300 relative lg:scale-105">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-8 pt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-500 mb-4">For growing businesses</p>
              <div className="mb-6">
                <span className="text-sm text-gray-500">Starting at</span>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  $2,500
                </div>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {growthFeatures.map((feature, index) => (
                <li key={index} className="flex items-start" data-testid={`growth-feature-${index}`}>
                  <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleGetStarted("Growth")}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
              data-testid="button-growth-get-started"
            >
              Get Started
            </Button>
          </div>

          {/* Scale Package */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Scale</h3>
              <p className="text-gray-500 mb-4">For enterprise solutions</p>
              <div className="mb-6">
                <span className="text-sm text-gray-500">Starting at</span>
                <div className="text-4xl font-bold text-gray-900">$5,000</div>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {scaleFeatures.map((feature, index) => (
                <li key={index} className="flex items-start" data-testid={`scale-feature-${index}`}>
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleGetStarted("Scale")}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
              data-testid="button-scale-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Not sure which package is right for you?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Schedule a free consultation and we'll help you choose the perfect solution for your business goals.
            </p>
            <Button
              onClick={() => {
                // TODO: Insert link to consultation booking
                console.log("Book consultation clicked");
              }}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
              data-testid="button-book-consultation"
            >
              Book Free Consultation
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-500">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>7-Day Delivery Guarantee</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>Professional Design</span>
            </div>
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>No Long-Term Contracts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}