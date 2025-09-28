import PackageFitWizard from '@/components/PackageFitWizard'

const PackageFitWizardPage = () => {
  const handleResult = (data: any) => {
    console.log('Package Fit Wizard Results:', data)
    // TODO: Integration with backend/email service
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <PackageFitWizard onResult={handleResult} />
      </div>
    </div>
  )
}

export default PackageFitWizardPage