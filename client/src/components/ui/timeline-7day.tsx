
interface TimelineProps {
  activeDay?: number;
}

export default function Timeline7Day({ activeDay = 1 }: TimelineProps) {
  const steps = [
    { day: "1", title: "Day 1", description: "Strategy & Intake" },
    { day: "2-3", title: "Day 2-3", description: "UX/UI Design", span: 2 },
    { day: "4-6", title: "Day 4-6", description: "Build & Integrations", span: 3 },
    { day: "7", title: "Day 7", description: "QA & Launch" },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-center ${step.span ? `md:col-span-${step.span}` : ""} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-lg mb-4 mx-auto text-white ${
              index === 0 ? "bg-electric-blue" : 
              index === 1 ? "bg-aqua" : 
              index === 2 ? "bg-electric-blue" : 
              "bg-success-green"
            }`}>
              {step.day}
            </div>
            <h3 className="font-poppins font-semibold text-lg text-deep-navy mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      
      {/* Progress Line - Hidden on mobile */}
      <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-gray-300">
        <div 
          className="h-full gradient-bg transition-all duration-1000"
          style={{ width: `${(activeDay / 7) * 100}%` }}
        />
      </div>
    </div>
  );
}
