import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'VAL-X - IT Services & Solutions',
  description = 'Professional IT services, software development, and digital solutions for businesses. Expert consulting, custom development, and innovative technology solutions.',
  image = '/assets/images/VAL-X-SB05.png',
  url = 'https://www.val-x.in',
  keywords = 'IT services, software development, digital solutions, technology consulting, web development, mobile apps, cloud solutions, India, Kerala'
}) => {
  return (
    <Helmet>
      {/* Add canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Add favicon links */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Add preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Joel J Mathew" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Enhanced JSON-LD with more details */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "VAL-X",
          "legalName": "VAL-X Technologies",
          "url": "https://www.val-x.in",
          "logo": "https://www.val-x.in/assets/images/VAL-X-SB05.png",
          "foundingDate": "2024",
          "founders": [{
            "@type": "Person",
            "name": "Joel J Mathew"
          }],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "Kerala"
          },
          "sameAs": [
            "https://www.linkedin.com/company/val-x",
            "https://twitter.com/valx",
            "https://www.facebook.com/valx"
          ],
          "offers": {
            "@type": "AggregateOffer",
            "description": "IT Services and Solutions",
            "availabilityStarts": "2024-01-01",
            "category": "IT Services",
            "serviceType": [
              "Web Development",
              "Mobile App Development",
              "Cloud Solutions",
              "IT Consulting"
            ]
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi", "Malayalam"],
            "areaServed": ["IN"]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 