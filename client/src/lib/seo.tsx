import { useEffect } from "react";

interface SEOData {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  noindex?: boolean;
}

export function updateSEO({
  title = "Launchin7 — Business systems that move growth",
  description = "Launchin7 builds connected websites, lead generation, CRM, automation, booking, payments, analytics, and practical AI workflows for serious businesses.",
  url = typeof window !== "undefined" ? window.location.href : "",
  image = "/og-image.png",
  noindex = false
}: SEOData) {
  if (typeof window === "undefined") return;

  // Get absolute URL for the image
  const getAbsoluteUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const baseUrl = typeof window !== "undefined" 
      ? `${window.location.protocol}//${window.location.host}`
      : "";
    return `${baseUrl}${path}`;
  };

  const absoluteImageUrl = getAbsoluteUrl(image);
  const canonicalUrl = url || window.location.href;

  // Update title
  document.title = title;

  // Update or create meta tags
  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateNameMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  // Standard meta tags
  updateNameMetaTag("description", description);

  // Open Graph tags for social sharing (iMessage, Facebook, etc.)
  updateMetaTag("og:title", title);
  updateMetaTag("og:description", description);
  updateMetaTag("og:url", canonicalUrl);
  updateMetaTag("og:image", absoluteImageUrl);
  updateMetaTag("og:image:secure_url", absoluteImageUrl);
  updateMetaTag("og:image:type", "image/png");
  updateMetaTag("og:image:width", "1200");
  updateMetaTag("og:image:height", "630");
  updateMetaTag("og:image:alt", "Launchin7 — connected business systems that make growth move");
  updateMetaTag("og:type", "website");
  updateMetaTag("og:site_name", "Launchin7");

  // Twitter Card tags
  updateNameMetaTag("twitter:card", "summary_large_image");
  updateNameMetaTag("twitter:title", title);
  updateNameMetaTag("twitter:description", description);
  updateNameMetaTag("twitter:image", absoluteImageUrl);
  updateNameMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

export function SEOProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set default SEO on app load
    updateSEO({});
  }, []);

  return <>{children}</>;
}

export function addStructuredData(data: any) {
  if (typeof window === "undefined") return;

  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
