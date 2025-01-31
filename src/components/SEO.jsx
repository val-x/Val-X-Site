import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "VAL-X - IT Services & Solutions",
  description = "Professional IT services, software development, and digital solutions for businesses. Expert consulting, custom development, and innovative technology solutions.",
  image = "https://www.val-x.in/assets/images/logo.png",
  url = "https://www.val-x.in",
  keywords = "IT services, software development, digital solutions, technology consulting, web development, mobile apps, cloud solutions, India, Kerala",
}) => {
  const domains = {
    main: "https://www.val-x.in",
    com: "https://www.val-x.com",
    dev: "https://www.val-x.dev",
  };

  return (
    <Helmet>
      {/* Add canonical URL */}
      <link rel="canonical" href={domains.main} />

      {/* Add alternate domain links */}
      <link rel="alternate" href={domains.com} hreflang="en" />
      <link rel="alternate" href={domains.dev} hreflang="en" />
      <link rel="alternate" href={domains.main} hreflang="x-default" />

      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//www.val-x.com" />
      <link rel="dns-prefetch" href="//www.val-x.dev" />
      <link
        rel="preconnect"
        href="https://www.val-x.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://www.val-x.dev"
        crossOrigin="anonymous"
      />

      {/* Add favicon links */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      {/* Add preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

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
      <meta property="og:url" content={domains.main} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="1600" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="VAL-X Logo" />
      <meta property="og:site_name" content="VAL-X" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@valx" />
      <meta name="twitter:creator" content="@joeljmathew_" />
      <meta name="twitter:url" content={domains.main} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="VAL-X Logo" />

      {/* WhatsApp specific */}
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:aspect_ratio" content="1" />

      {/* Enhanced JSON-LD with multiple domains */}
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VAL-X",
            legalName: "VAL-X Technologies",
            url: domains.main,
            logo: "https://www.val-x.in/assets/images/logo.png",
            foundingDate: "2024",
            slogan: "Innovate Beyond Limits",
            description:
              "VAL-X is a leading technology company specializing in innovative IT solutions, software development, and digital transformation services.",
            founders: [
              {
                "@type": "Person",
                name: "Joel J Mathew",
                jobTitle: "Chief Technology Officer",
                url: "https://www.linkedin.com/in/joel-j-mathew-71393a210/",
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
              addressRegion: "Kerala",
              addressLocality: "Alappuzha",
            },
            sameAs: [
              domains.com,
              domains.dev,
              "https://www.linkedin.com/company/val-x",
              "https://twitter.com/valx",
              "https://www.facebook.com/valx",
              "https://github.com/JJ-Dynamite",
            ],
            offers: {
              "@type": "AggregateOffer",
              description: "IT Services and Solutions",
              availabilityStarts: "2024-01-01",
              category: "IT Services",
              serviceType: [
                "Web Development",
                "Mobile App Development",
                "Cloud Solutions",
                "IT Consulting",
                "AI/ML Solutions",
                "Web3 Development",
                "DevOps Services",
                "UI/UX Design",
              ],
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["English", "Hindi", "Malayalam"],
              areaServed: ["IN"],
              email: "contact@val-x.in",
            },
            keywords: [
              "IT Services",
              "Software Development",
              "Web Development",
              "Mobile Apps",
              "Cloud Solutions",
              "AI/ML",
              "Web3",
              "Digital Transformation",
              "Kerala IT Company",
              "Technology Solutions",
            ],
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              minValue: "10",
              maxValue: "50",
            },
            award: [
              "Best Emerging IT Company in Kerala 2024",
              "Innovation Excellence Award",
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "ISO 9001:2015 Certification",
                validFrom: "2024",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Joel J Mathew",
            jobTitle: "Chief Technology Officer",
            worksFor: {
              "@type": "Organization",
              name: "VAL-X",
            },
            image:
              "https://avatars.githubusercontent.com/u/45507367?s=400&u=87eab888ace4284d9345a551c8db0963ba714213&v=4",
            description:
              "A full stack developer with a passion for building scalable and efficient solutions in AI and Web3",
            sameAs: [
              "https://github.com/JJ-Dynamite",
              "https://www.linkedin.com/in/joel-j-mathew-71393a210/",
              "https://64f1618cc38df21ea31b3961--funny-faun-e09034.netlify.app/",
              "https://x.com/joeljmathew_",
              "https://www.instagram.com/joeljmathew_/",
              "https://www.threads.net/@joeljmathew_",
            ],
            knowsAbout: [
              "Full Stack Development",
              "AI/ML",
              "Web3",
              "Software Architecture",
              "Cloud Computing",
            ],
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "College of Engineering Kidangoor",
            },
          },
        ])}
      </script>

      {/* Additional Open Graph Tags for Multiple Domains */}
      <meta property="og:see_also" content={domains.com} />
      <meta property="og:see_also" content={domains.dev} />
    </Helmet>
  );
};

export default SEO;
