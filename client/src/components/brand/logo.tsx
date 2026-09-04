import { Link } from "wouter";

interface LogoProps {
  compact?: boolean;
  inverse?: boolean;
  linked?: boolean;
  className?: string;
}

function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <svg className={`l7-logo-mark${inverse ? " is-inverse" : ""}`} viewBox="0 0 32 32" aria-hidden="true">
      <path className="l7-logo-frame" d="M4 4h24v24H4z" />
      <path className="l7-logo-l" d="M9 9v14h7" />
      <path className="l7-logo-seven" d="M17 9h7l-7 14" />
    </svg>
  );
}

export default function Logo({ compact = false, inverse = false, linked = false, className = "" }: LogoProps) {
  const content = (
    <>
      <Mark inverse={inverse} />
      {!compact && <span className="l7-logo-type">LAUNCHIN<span>7</span></span>}
    </>
  );
  const classes = `l7-logo${compact ? " is-compact" : ""}${inverse ? " is-inverse" : ""} ${className}`.trim();
  return linked ? <Link href="/" className={classes} aria-label="Launchin7 home">{content}</Link> : <span className={classes} aria-label="Launchin7">{content}</span>;
}