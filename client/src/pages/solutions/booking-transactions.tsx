import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import SolutionPageTemplate from "./SolutionPageTemplate";
import { BookingTransactionsAnimation } from "@/components/solutions/SolutionAnimations";
import { Calendar } from "lucide-react";
import heroImg from "@assets/generated_images/hero-booking-transactions.png";

export default function BookingTransactions() {
  useEffect(() => {
    updateSEO({
      title: "Booking & Transaction Systems | Launchin7",
      description: "We streamline how customers schedule, pay, confirm, and complete transactions.",
    });
  }, []);

  return (
    <SolutionPageTemplate
      title="Booking & Transaction Systems"
      category="Scheduling & Payments"
      position="Streamline scheduling, payments, and confirmations."
      heroDescription="Friction in the booking or payment process kills conversions. We build seamless transaction systems that make it easy for customers to schedule, pay, and confirm — while automating the backend so your team doesn't have to manage it manually."
      icon={Calendar}
      gradient="from-tech-orange to-accent-purple"
      problems={[
        { title: "Friction in the Booking Process", description: "Customers have to go through too many steps to book, leading to drop-offs." },
        { title: "Manual Scheduling Overhead", description: "The team spends hours managing calendars, confirmations, and rescheduling." },
        { title: "Disconnected Payment Systems", description: "Payments are collected separately from bookings, creating confusion and delays." },
        { title: "No Automated Confirmations", description: "Customers don't receive timely reminders, leading to no-shows and poor experience." },
      ]}
      builds={[
        { title: "Online Booking System", description: "Fully configured booking calendar embedded in your site with real-time availability." },
        { title: "Payment Integration", description: "Secure payment collection via Stripe or similar, connected directly to your booking flow." },
        { title: "Automated Confirmations", description: "Instant email and SMS confirmations sent to customers upon booking." },
        { title: "Reminder Sequences", description: "Automated reminders sent before appointments to reduce no-show rates." },
        { title: "Rescheduling Flows", description: "Self-serve rescheduling so customers can change bookings without contacting your team." },
        { title: "CRM Integration", description: "All bookings logged automatically in your CRM and follow-up triggered." },
      ]}
      howItWorks={[
        { step: "01", title: "Transaction Flow Design", description: "We map out the full customer journey from intent to completed transaction." },
        { step: "02", title: "System Configuration", description: "We set up and configure the booking, payment, and communication systems." },
        { step: "03", title: "Integration & Automation", description: "We connect all systems and build the automation sequences for confirmations and reminders." },
        { step: "04", title: "Testing & Launch", description: "We test every scenario end-to-end before launching to ensure a seamless experience." },
      ]}
      ctaHeadline="Ready to Streamline How Customers Book and Pay?"
      animationSection={<BookingTransactionsAnimation />}
      heroImage={heroImg}
    />
  );
}
