/**
 * StructuredData — server component that injects JSON-LD schemas into <head>.
 *
 * Schemas included:
 *   • Organization    — brand authority, sameAs social links
 *   • WebSite         — sitelinks search box via potentialAction
 *   • LocalBusiness   — Google Business Profile linkage (Nairobi, Kenya)
 *     ↳ typed as [ClothingStore, Store, LocalBusiness] for max category coverage
 *   • ItemList        — top-level product category listing for Google Products
 *   • FAQPage         — common sneaker-buying FAQ signals (boosts rich results)
 */
export function StructuredData() {
  const SITE_URL = "https://iqfits47.store";

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "IQFITS-47",
    legalName: "IQFITS-47",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      "Kenya's home for authentic kicks, streetwear and designer clothing. Shop original sneakers, apparel and accessories — pay with M-Pesa, track every order.",
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    sameAs: [
      "https://www.instagram.com/iqfits47",
      "https://www.tiktok.com/@iqfits47",
      "https://www.facebook.com/iqfits47",
      "https://twitter.com/iqfits47",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "IQFITS-47",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-KE",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["ClothingStore", "Store", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "IQFITS-47",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },
    description:
      "IQFITS-47 sells authentic sneakers, streetwear and designer fits in Kenya. Original Nike, Adidas, New Balance, Jordan and more. Fast delivery across Nairobi and Kenya. Pay with M-Pesa.",
    // TODO: Add your WhatsApp / business phone: e.g. "+254700000000"
    // telephone: "+254700000000",
    priceRange: "KES 3,500 – KES 35,000",
    currenciesAccepted: "KES",
    paymentAccepted: "M-Pesa, Cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nairobi",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      postalCode: "00100",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.286389,
      longitude: 36.817223,
    },
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "City", name: "Mombasa" },
      { "@type": "City", name: "Kisumu" },
      { "@type": "City", name: "Nakuru" },
      { "@type": "City", name: "Eldoret" },
      { "@type": "Country", name: "Kenya" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sneakers, Streetwear & Designer Fits",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Sneakers & Kicks",
          description:
            "Authentic Nike, Adidas, New Balance, Jordan, Yeezy and more — original sneakers delivered across Kenya.",
        },
        {
          "@type": "OfferCatalog",
          name: "Streetwear Apparel",
          description:
            "Hoodies, graphic tees, cargo pants, caps and streetwear clothing from top brands.",
        },
        {
          "@type": "OfferCatalog",
          name: "Accessories",
          description:
            "Hats, beanies, socks, bags and sneaker accessories.",
        },
      ],
    },
    // Merchant return policy — helps Google Merchant Center free listings
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "KE",
      returnPolicyCategory:
        "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    // Shipping — helps Google Shopping free product listings
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: 0,
        currency: "KES",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "KE",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 1,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 4,
          unitCode: "DAY",
        },
      },
    },
  };

  // ItemList — top product categories for Google rich results
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shop IQFITS-47 — Sneakers, Streetwear & Accessories in Kenya",
    url: `${SITE_URL}/shop`,
    numberOfItems: 3,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Sneakers & Kicks",
        url: `${SITE_URL}/shop?category=sneakers`,
        description:
          "Shop authentic Nike, Adidas, New Balance, Jordan sneakers and kicks. Original, genuine, delivered across Kenya. Pay with M-Pesa.",
        image: `${SITE_URL}/og-image.png`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Streetwear Apparel",
        url: `${SITE_URL}/shop?category=apparel`,
        description:
          "Hoodies, graphic tees, oversized fits, cargo trousers — streetwear clothing delivered across Kenya.",
        image: `${SITE_URL}/og-image.png`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Accessories",
        url: `${SITE_URL}/shop?category=accessories`,
        description:
          "Caps, beanies, bags, sneaker socks and accessories from top streetwear brands.",
        image: `${SITE_URL}/og-image.png`,
      },
    ],
  };

  // FAQPage — drives rich result snippets on Google Search
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are the sneakers at IQFITS-47 authentic and original?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. IQFITS-47 only sells 100% authentic, original sneakers and streetwear. Every product is genuine — no replicas, no fakes.",
        },
      },
      {
        "@type": "Question",
        name: "Can I pay with M-Pesa on IQFITS-47?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. IQFITS-47 accepts M-Pesa payments securely at checkout. Simply place your order and complete payment via M-Pesa STK push on your phone.",
        },
      },
      {
        "@type": "Question",
        name: "How fast is delivery in Nairobi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orders within Nairobi and Kiambu are delivered within 1–2 business days. Nationwide delivery across Kenya takes 2–4 business days. Free delivery on orders over KES 15,000 within Nairobi and Kiambu.",
        },
      },
      {
        "@type": "Question",
        name: "Do you deliver nationwide across Kenya?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. IQFITS-47 delivers countrywide across Kenya — including Mombasa, Kisumu, Nakuru, Eldoret and all other counties — within 2–4 business days.",
        },
      },
      {
        "@type": "Question",
        name: "What sneaker brands does IQFITS-47 stock?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IQFITS-47 stocks Nike (Air Force 1, Dunk, Air Max), Adidas (Samba, Gazelle, Stan Smith), New Balance (550, 574, 990), Air Jordan (Jordan 1, Jordan 4), Yeezy, Puma, Asics, Converse, Vans and more.",
        },
      },
      {
        "@type": "Question",
        name: "What is IQFITS-47's return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept returns within 7 days of delivery. Items must be in original, unworn condition with original packaging. Returns are free.",
        },
      },
      {
        "@type": "Question",
        name: "How do I track my order from IQFITS-47?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can track your order anytime at iqfits47.store/track-order using your order number. You will also receive SMS and email updates at every stage of your delivery.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
