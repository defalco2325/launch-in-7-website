import { ArrowUpRight, Check, LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface Problem { title: string; description: string }
interface BuildItem { title: string; description: string }
interface HowItWorksStep { step: string; title: string; description: string }
interface SolutionPageProps {
  title: string; category: string; position: string; heroDescription: string; icon: LucideIcon;
  gradient: string; problems: Problem[]; builds: BuildItem[]; howItWorks: HowItWorksStep[];
  ctaHeadline: string; animationSection?: React.ReactNode; heroImage?: string;
}

export default function SolutionPageTemplate({ title, category, position, heroDescription, icon: Icon, problems, builds, howItWorks, ctaHeadline, animationSection, heroImage }: SolutionPageProps) {
  return <div className="l7-solution">
    <section className="l7-solution-hero">
      {heroImage && <div className="l7-solution-image hero-ken-burns" style={{ backgroundImage: `url(${heroImage})` }} />}
      <div className="l7-solution-veil" />
      <div className="l7-solution-hero-inner">
        <div className="l7-solution-kicker"><Icon size={15} /> {category}</div>
        <h1>{title}</h1>
        <p className="l7-solution-position">{position}</p>
        <p className="l7-solution-description">{heroDescription}</p>
        <div className="l7-solution-actions"><Link href="/clients" className="l7-editorial-button l7-editorial-button-coral">Discuss this system <ArrowUpRight size={16} /></Link><Link href="/" className="l7-solution-back">Back to the studio</Link></div>
        <p className="l7-solution-timeline">Focused Launch projects may qualify for a 7-day sprint. Larger builds receive a scoped timeline.</p>
      </div>
      <span className="l7-solution-scroll">SCROLL / EXPLORE</span>
    </section>
    {animationSection && <div className="l7-animation-frame">{animationSection}</div>}
    <section className="l7-solution-section l7-solution-problems"><div className="l7-solution-label">THE OPPORTUNITY</div><div className="l7-solution-heading"><h2>Remove the friction<br /><em>between intent and action.</em></h2><p>Good systems make the next useful move obvious — for your team and for the people you serve.</p></div><div className="l7-problem-grid">{problems.map(problem => <article key={problem.title}><span className="l7-feature-rule" aria-hidden="true" /><h3>{problem.title}</h3><p>{problem.description}</p></article>)}</div></section>
    <section className="l7-solution-section l7-solution-build"><div className="l7-solution-label">THE BUILD</div><div className="l7-solution-heading"><h2>Useful infrastructure.<br /><em>Nothing ornamental.</em></h2><p>We build the pieces that make the outcome easier to create, measure, and improve.</p></div><div className="l7-build-list">{builds.map(build => <article key={build.title}><span className="l7-build-rule" aria-hidden="true" /><div><h3>{build.title}</h3><p>{build.description}</p></div><Check size={17} /></article>)}</div></section>
    <section className="l7-solution-method"><div className="l7-solution-section"><div className="l7-solution-label light">THE METHOD</div><div className="l7-solution-heading"><h2>Map it. Make it.<br /><em>Make it better.</em></h2><p>Clear decisions, clean execution, a handover your team can actually use.</p></div><div className="l7-method-list">{howItWorks.map(step => <article key={step.step}><span>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
    <section className="l7-solution-close"><p className="l7-solution-label">A CONSIDERED FIRST MOVE</p><h2>{ctaHeadline}</h2><p>Tell us what is getting lost. We will recommend the most useful system to build first. Ongoing optimization is available through Growth OS, starting at $1,250/month.</p><Link href="/clients" className="l7-editorial-button l7-editorial-button-coral">Start a conversation <ArrowUpRight size={16} /></Link></section>
  </div>;
}