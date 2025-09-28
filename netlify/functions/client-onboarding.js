const sgMail = require('@sendgrid/mail');
const multipart = require('aws-lambda-multipart-parser');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, message: 'Method not allowed' })
    };
  }

  try {
    // Initialize SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    // Parse the multipart form data
    const parsed = multipart.parse(event, true);
    
    // Log the parsed data for debugging
    console.log('Parsed data:', JSON.stringify(parsed, null, 2));
    console.log('Event body type:', typeof event.body);
    console.log('Event headers:', JSON.stringify(event.headers, null, 2));
    
    // Extract form fields - handle both direct fields and nested structure
    const businessName = parsed.businessName || parsed.fields?.businessName || '';
    const tagline = parsed.tagline || parsed.fields?.tagline || '';
    const website = parsed.website || parsed.fields?.website || '';
    const shortDescription = parsed.shortDescription || parsed.fields?.shortDescription || '';
    const contactName = parsed.contactName || parsed.fields?.contactName || '';
    const email = parsed.email || parsed.fields?.email || '';
    const phone = parsed.phone || parsed.fields?.phone || '';
    const pagesSelected = parsed.pagesSelected || parsed.fields?.pagesSelected || '';
    const featuresSelected = parsed.featuresSelected || parsed.fields?.featuresSelected || '';
    const copywriting = parsed.copywriting || parsed.fields?.copywriting || '';
    const seo = parsed.seo || parsed.fields?.seo || '';
    const timeline = parsed.timeline || parsed.fields?.timeline || '';
    const packageInterest = parsed.packageInterest || parsed.fields?.packageInterest || '';
    
    console.log('Extracted fields:', {
      businessName,
      contactName,
      email,
      hasBusinessName: !!businessName,
      hasContactName: !!contactName,
      hasEmail: !!email
    });

    // Validate required fields
    const businessNameTrimmed = String(businessName || '').trim();
    const contactNameTrimmed = String(contactName || '').trim();
    const emailTrimmed = String(email || '').trim();
    
    console.log('Validation check:', {
      businessNameTrimmed,
      contactNameTrimmed,
      emailTrimmed,
      businessNameValid: !!businessNameTrimmed,
      contactNameValid: !!contactNameTrimmed,
      emailValid: !!emailTrimmed
    });
    
    if (!businessNameTrimmed || !contactNameTrimmed || !emailTrimmed) {
      console.log('Validation failed - missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: `Missing required fields. Received: business=${!!businessNameTrimmed}, contact=${!!contactNameTrimmed}, email=${!!emailTrimmed}` 
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          ok: false, 
          message: 'Please provide a valid email address.' 
        })
      };
    }

    // Process file attachments
    const attachments = [];
    const fileList = [];
    
    // Handle different file types from the form
    if (parsed.logoFiles) {
      const logoFiles = Array.isArray(parsed.logoFiles) ? parsed.logoFiles : [parsed.logoFiles];
      logoFiles.forEach((file, index) => {
        if (file && file.content) {
          attachments.push({
            content: file.content.toString('base64'),
            filename: file.filename || `logo-${index + 1}.png`,
            type: file.contentType || 'image/png',
            disposition: 'attachment'
          });
          fileList.push(`Logo: ${file.filename || `logo-${index + 1}.png`}`);
        }
      });
    }

    if (parsed.brandGuide && parsed.brandGuide.content) {
      attachments.push({
        content: parsed.brandGuide.content.toString('base64'),
        filename: parsed.brandGuide.filename || 'brand-guide.pdf',
        type: parsed.brandGuide.contentType || 'application/pdf',
        disposition: 'attachment'
      });
      fileList.push(`Brand Guide: ${parsed.brandGuide.filename || 'brand-guide.pdf'}`);
    }

    if (parsed.photos) {
      const photos = Array.isArray(parsed.photos) ? parsed.photos : [parsed.photos];
      photos.forEach((file, index) => {
        if (file && file.content) {
          attachments.push({
            content: file.content.toString('base64'),
            filename: file.filename || `photo-${index + 1}.jpg`,
            type: file.contentType || 'image/jpeg',
            disposition: 'attachment'
          });
          fileList.push(`Photo: ${file.filename || `photo-${index + 1}.jpg`}`);
        }
      });
    }

    if (parsed.otherAssets) {
      const otherAssets = Array.isArray(parsed.otherAssets) ? parsed.otherAssets : [parsed.otherAssets];
      otherAssets.forEach((file, index) => {
        if (file && file.content) {
          attachments.push({
            content: file.content.toString('base64'),
            filename: file.filename || `asset-${index + 1}`,
            type: file.contentType || 'application/octet-stream',
            disposition: 'attachment'
          });
          fileList.push(`Asset: ${file.filename || `asset-${index + 1}`}`);
        }
      });
    }

    // Create the email subject
    const subject = `New Client Onboarding — ${businessNameTrimmed}`;

    // Create HTML email content
    const htmlContent = `
      <h2>New Client Onboarding Submission</h2>
      
      <h3>Business Information</h3>
      <p><strong>Business Name:</strong> ${businessNameTrimmed}</p>
      <p><strong>Tagline:</strong> ${tagline}</p>
      <p><strong>Website:</strong> ${website}</p>
      <p><strong>Description:</strong> ${shortDescription}</p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${contactNameTrimmed}</p>
      <p><strong>Email:</strong> ${emailTrimmed}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      
      <h3>Project Details</h3>
      <p><strong>Pages Selected:</strong> ${pagesSelected}</p>
      <p><strong>Features Selected:</strong> ${featuresSelected}</p>
      <p><strong>Copywriting:</strong> ${copywriting}</p>
      <p><strong>SEO:</strong> ${seo}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Package Interest:</strong> ${packageInterest}</p>
      
      ${fileList.length > 0 ? `
      <h3>Attached Files</h3>
      <ul>
        ${fileList.map(file => `<li>${file}</li>`).join('')}
      </ul>
      ` : '<p><em>No files attached</em></p>'}
      
      <hr>
      <p><em>Submitted via Launch in 7 Client Onboarding Form</em></p>
    `;

    // Create text version
    const textContent = `
New Client Onboarding Submission

Business Information:
Business Name: ${businessNameTrimmed}
Tagline: ${tagline}
Website: ${website}
Description: ${shortDescription}

Contact Information:
Name: ${contactNameTrimmed}
Email: ${emailTrimmed}
Phone: ${phone}

Project Details:
Pages Selected: ${pagesSelected}
Features Selected: ${featuresSelected}
Copywriting: ${copywriting}
SEO: ${seo}
Timeline: ${timeline}
Package Interest: ${packageInterest}

${fileList.length > 0 ? `
Attached Files:
${fileList.map(file => `- ${file}`).join('\n')}
` : 'No files attached'}

Submitted via Launch in 7 Client Onboarding Form
    `;

    // Prepare email message
    const msg = {
      to: 'team@launchin7.io',
      from: 'onboarding@launchin7.io',
      subject: subject,
      text: textContent,
      html: htmlContent,
      attachments: attachments
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        ok: true,
        message: 'Client onboarding submission received successfully!'
      })
    };

  } catch (error) {
    console.error('Client onboarding submission error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        message: 'There was an error processing your submission. Please try again.'
      })
    };
  }
};