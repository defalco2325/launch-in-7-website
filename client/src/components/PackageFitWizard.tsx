import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Check, ChevronLeft, ChevronRight, Star, Clock, Users, Globe, Zap, Shield } from 'lucide-react'

// Form validation schema
const packageFitSchema = z.object({
  businessStage: z.enum(['solo', 'growing', 'established']),
  timeline: z.enum(['7days', '2-3weeks', 'flexible']),
  pagesNeeded: z.enum(['1-3', '5-7', '8-12']),
  features: z.array(z.enum(['leadCapture', 'onlineBookings', 'payments', 'gatedContent', 'blogCMS'])),
  copywritingHelp: z.enum(['none', 'somePages', 'fullSite']),
  seoNeeds: z.enum(['basic', 'deeper']),
  budgetComfort: z.enum(['under1k', '2-3.5k', '5-7k', 'notSure']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number')
})

type PackageFitFormData = z.infer<typeof packageFitSchema>

type TierResult = {
  tier: 'ignite' | 'growth' | 'scale'
  confidence: number
  alsoFits?: string[]
}

interface PackageFitWizardProps {
  onResult?: (data: PackageFitFormData & { result: TierResult }) => void
}

const PackageFitWizard = ({ onResult }: PackageFitWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState<TierResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<PackageFitFormData>({
    resolver: zodResolver(packageFitSchema),
    defaultValues: {
      businessStage: 'solo',
      timeline: '7days',
      pagesNeeded: '1-3',
      features: [],
      copywritingHelp: 'none',
      seoNeeds: 'basic',
      budgetComfort: 'under1k',
      name: '',
      email: '',
      phone: ''
    }
  })

  const watchedFeatures = form.watch('features')

  // Scoring logic based on requirements
  const calculateTier = (data: PackageFitFormData): TierResult => {
    let igniteScore = 0
    let growthScore = 0
    let scaleScore = 0

    // Pages scoring
    if (data.pagesNeeded === '1-3') igniteScore += 3
    else if (data.pagesNeeded === '5-7') growthScore += 3
    else if (data.pagesNeeded === '8-12') scaleScore += 3

    // Features scoring
    const hasPaymentsOrBookings = data.features.includes('payments') || data.features.includes('onlineBookings')
    const hasLeadCaptureOrBlog = data.features.includes('leadCapture') || data.features.includes('blogCMS')
    const hasGatedContent = data.features.includes('gatedContent')

    if (data.features.length <= 1 && !hasPaymentsOrBookings) igniteScore += 2
    if (hasLeadCaptureOrBlog) growthScore += 2
    if (hasPaymentsOrBookings || hasGatedContent) scaleScore += 3

    // Copywriting scoring
    if (data.copywritingHelp === 'none') igniteScore += 1
    else if (data.copywritingHelp === 'somePages') { igniteScore += 1; growthScore += 2 }
    else if (data.copywritingHelp === 'fullSite') scaleScore += 3

    // SEO scoring
    if (data.seoNeeds === 'basic') { igniteScore += 1; growthScore += 1 }
    else if (data.seoNeeds === 'deeper') scaleScore += 2

    // Budget scoring
    if (data.budgetComfort === 'under1k') igniteScore += 2
    else if (data.budgetComfort === '2-3.5k') growthScore += 2
    else if (data.budgetComfort === '5-7k') scaleScore += 3

    // Timeline scoring
    if (data.timeline === '7days') { igniteScore += 1; growthScore += 1 }
    else if (data.timeline === '2-3weeks') growthScore += 1

    // Determine winning tier (highest score)
    const scores = { ignite: igniteScore, growth: growthScore, scale: scaleScore }
    const maxScore = Math.max(igniteScore, growthScore, scaleScore)
    
    let winningTier: 'ignite' | 'growth' | 'scale'
    if (scaleScore === maxScore) winningTier = 'scale'
    else if (growthScore === maxScore) winningTier = 'growth'
    else winningTier = 'ignite'

    // Calculate also fits
    const alsoFits: string[] = []
    Object.entries(scores).forEach(([tier, score]) => {
      if (tier !== winningTier && score >= maxScore * 0.7) {
        alsoFits.push(tier)
      }
    })

    return {
      tier: winningTier,
      confidence: Math.round((maxScore / 15) * 100), // Normalize to percentage
      alsoFits: alsoFits.length > 0 ? alsoFits : undefined
    }
  }

  const onSubmit = async (data: PackageFitFormData) => {
    setIsLoading(true)
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const tierResult = calculateTier(data)
    setResult(tierResult)
    
    // Save to localStorage
    localStorage.setItem('packageFitWizardResult', JSON.stringify({ ...data, result: tierResult }))
    
    // Call onResult callback
    onResult?.({ ...data, result: tierResult })
    
    // Show success toast
    toast({
      title: "Plan unlocked!",
      description: "Check your inbox for a copy too.", // TODO: Implement email integration
    })
    
    setIsLoading(false)
    setShowResults(true)
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const steps = [
    { title: 'Business Info', fields: ['businessStage', 'timeline'] },
    { title: 'Project Scope', fields: ['pagesNeeded', 'features'] },
    { title: 'Requirements', fields: ['copywritingHelp', 'seoNeeds', 'budgetComfort'] },
    { title: 'Contact Info', fields: ['name', 'email', 'phone'] }
  ]

  const isStepValid = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields
    return stepFields.every(field => {
      const value = form.getValues(field as keyof PackageFitFormData)
      if (field === 'features') return true // Features can be empty
      return value && value !== ''
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const featureOptions = [
    { id: 'leadCapture', label: 'Lead capture', icon: Users },
    { id: 'onlineBookings', label: 'Online bookings', icon: Clock },
    { id: 'payments', label: 'Payments', icon: Zap },
    { id: 'gatedContent', label: 'Gated content', icon: Shield },
    { id: 'blogCMS', label: 'Blog + CMS', icon: Globe }
  ]

  const tierInfo = {
    ignite: {
      name: 'Ignite',
      subtitle: 'Starter',
      price: '$800',
      description: 'Get online fast with a clean, credible presence.',
      isPopular: false,
      features: [
        '1–3 pages (Home, About, Contact)',
        'Mobile-friendly, branded design',
        'Contact form + social links',
        'Hosting & domain setup support',
        '7-day delivery'
      ]
    },
    growth: {
      name: 'Growth',
      subtitle: 'Professional',
      price: '$2,500',
      description: 'Capture leads with a polished, conversion-ready site.',
      isPopular: true,
      features: [
        '5–7 pages + custom layouts',
        'Copywriting for 3–4 pages',
        'SEO foundation',
        'Lead capture (opt-in / calendar link)',
        '1 revision round, 7-day launch'
      ]
    },
    scale: {
      name: 'Scale',
      subtitle: 'Premium',
      price: '$5,000',
      description: 'Scale with premium features and conversion-driven UX.',
      isPopular: false,
      features: [
        '8–12 custom pages',
        'Advanced features (bookings, payments, gated content)',
        'Conversion copywriting (all pages)',
        'Blog setup + CMS training',
        'Deeper SEO (keywords, schema basics)',
        '2–3 revisions + 30-day maintenance, PM included, 7-day delivery'
      ]
    }
  }

  if (showResults && result) {
    return (
      <div id="results-section" className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Results Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl font-bold text-foreground">Your best fit:</h2>
            <span className="text-4xl font-bold gradient-text">{tierInfo[result.tier].name}</span>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Recommendation
            </span>
          </div>
          {result.alsoFits && result.alsoFits.length > 0 && (
            <p className="text-muted-foreground">
              Also fits: {result.alsoFits.map(tier => tierInfo[tier as keyof typeof tierInfo].name).join(', ')}
            </p>
          )}
        </div>

        {/* Pricing Table */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(tierInfo).map(([tierKey, tier]) => (
            <Card key={tierKey} className={`p-6 relative ${
              tier.isPopular ? 'ring-2 ring-primary scale-105' : ''
            } ${tierKey === result.tier ? 'bg-primary/5 border-primary' : ''}`}>
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              {tierKey === result.tier && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.subtitle}</p>
                  <p className="text-3xl font-bold mt-2">Starting at {tier.price}</p>
                </div>
                
                <p className="text-center text-muted-foreground italic">
                  {tier.description}
                </p>
                
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="w-full sm:w-auto"
            onClick={() => window.open('https://calendly.com/YOUR-LINK', '_blank')}
            data-testid="button-discovery-call"
          >
            <Clock className="w-4 h-4 mr-2" />
            Book a 15-min Discovery Call
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            data-testid="button-start-launch"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start My 7-Day Launch
          </Button>
        </div>

        {/* Reset Option */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => {
              setShowResults(false)
              setCurrentStep(0)
              form.reset()
            }}
            data-testid="button-retake-quiz"
          >
            Take Quiz Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">See Which Package Fits You Best</h1>
        <p className="text-lg text-muted-foreground">
          Answer 6 quick questions to unlock your 7-day launch plan & pricing.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>
            
            {/* Step 0: Business Info */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What stage is your business?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: 'solo', label: 'Solo' },
                            { value: 'growing', label: 'Growing team' },
                            { value: 'established', label: 'Established' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-business-stage-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your timeline?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: '7days', label: '7 days' },
                            { value: '2-3weeks', label: '2–3 weeks' },
                            { value: 'flexible', label: 'Flexible' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-timeline-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 1: Project Scope */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="pagesNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How many pages do you need?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: '1-3', label: '1–3 pages' },
                            { value: '5-7', label: '5–7 pages' },
                            { value: '8-12', label: '8–12 pages' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-pages-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which key features do you need? (select all that apply)</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {featureOptions.map((option) => {
                            const Icon = option.icon
                            const isSelected = field.value?.includes(option.id as any)
                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                  const currentFeatures = field.value || []
                                  if (isSelected) {
                                    field.onChange(currentFeatures.filter(f => f !== option.id))
                                  } else {
                                    field.onChange([...currentFeatures, option.id])
                                  }
                                }}
                                className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                                  isSelected 
                                    ? 'border-primary bg-primary/10 text-primary' 
                                    : 'border-muted hover:border-muted-foreground'
                                }`}
                                data-testid={`option-feature-${option.id}`}
                              >
                                <Icon className="w-5 h-5" />
                                <span>{option.label}</span>
                                {isSelected && <Check className="w-4 h-4 ml-auto" />}
                              </button>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="copywritingHelp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you need copywriting help?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { value: 'none', label: 'None' },
                            { value: 'somePages', label: 'Some pages' },
                            { value: 'fullSite', label: 'Full site' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-copywriting-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seoNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What level of SEO do you need?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'basic', label: 'Basic' },
                            { value: 'deeper', label: 'Deeper' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-seo-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budgetComfort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What's your budget comfort level?</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'under1k', label: '<$1K' },
                            { value: '2-3.5k', label: '$2–3.5K' },
                            { value: '5-7k', label: '$5–7K' },
                            { value: 'notSure', label: 'Not sure' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 border rounded-lg text-center transition-all ${
                                field.value === option.value 
                                  ? 'border-primary bg-primary/10 text-primary' 
                                  : 'border-muted hover:border-muted-foreground'
                              }`}
                              data-testid={`option-budget-${option.value}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Contact Info */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Contact information is required to unlock your personalized results.
                </p>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter your email address" 
                          {...field} 
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          {...field} 
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              data-testid="button-previous"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                type="submit"
                disabled={!isStepValid(currentStep) || isLoading}
                data-testid="button-get-results"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Getting Results...
                  </>
                ) : (
                  <>
                    Get My Results
                    <Star className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                data-testid="button-next"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PackageFitWizard