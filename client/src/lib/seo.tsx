import { useEffect } from "react";

interface SEOData {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export function updateSEO({
  title = "Launch in 7 - Your New Website, Live in 7 Days",
  description = "Conversion-focused, SEO-ready website builds designed to grow your business fast. 7-day turnaround guarantee.",
  url = typeof window !== "undefined" ? window.location.href : "",
  image = "/og-image.jpg"
}: SEOData) {
  if (typeof window === "undefined") return;

  // Get absolute URL for the image
  const getAbsoluteUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const baseUrl = typeof window !== "undefined" 
      ? `${window.location.protocol}//${window.location.host}`
      : "https://launchin7.netlify.app";
    return `${baseUrl}${path}`;
  };

  const absoluteImageUrl = getAbsoluteUrl(image);

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
  updateMetaTag("og:url", url);
  updateMetaTag("og:image", absoluteImageUrl);
  updateMetaTag("og:image:width", "1200");
  updateMetaTag("og:image:height", "630");
  updateMetaTag("og:type", "website");
  updateMetaTag("og:site_name", "Launch in 7");

  // Twitter Card tags
  updateNameMetaTag("twitter:card", "summary_large_image");
  updateNameMetaTag("twitter:title", title);
  updateNameMetaTag("twitter:description", description);
  updateNameMetaTag("twitter:image", absoluteImageUrl);
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
