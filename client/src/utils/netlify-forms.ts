// Netlify Forms utility functions

// Helper function to encode form data for Netlify Forms
export function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

// Global form submission handler for progressive enhancement
// This is disabled because React components handle submissions directly
export function setupNetlifyForms() {
  // Only add fallback handling for forms without React handling
  document.addEventListener("submit", async (e) => {
    const form = e.target as HTMLFormElement;
    const formName = form.getAttribute("name");
    
    // Only handle our Netlify forms that don't have React handlers
    if (!formName?.startsWith("launchin7-")) return;
    
    // Check if this form has a React onSubmit handler (skip if it does)
    if (form.hasAttribute("data-react-form")) return;
    
    // Check if the form has data-netlify attribute
    if (!form.hasAttribute("data-netlify")) return;
    
    // Prevent default form submission for AJAX handling
    e.preventDefault();
    
    const formData = new FormData(form);
    const data: Record<string, string> = {
      "form-name": formName,
    };
    
    // Extract all form data
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    
    // Ensure honeypot field is empty (spam protection)
    if (data["bot-field"] && data["bot-field"].trim() !== "") {
      console.log("Spam detected via honeypot");
      return;
    }
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      
      if (response.ok) {
        // Show success message and redirect
        console.log("Form submitted successfully");
        window.location.href = "/thanks";
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Submission failed. Please try again.");
    }
  });
}