import React from 'react';

export default function StructuredData() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ElectronicsStore",
        "@id": "https://alltechbyte.pk/#organization",
        "name": "All Tech Byte",
        "alternateName": "AllTechByte Pakistan",
        "url": "https://alltechbyte.pk",
        "logo": "https://alltechbyte.pk/logo.jpg",
        "image": "https://alltechbyte.pk/logo.jpg",
        "description": "Pakistan's premier retailer for robotics, microcontrollers, Arduino, Raspberry Pi, sensors, motor drivers, and maker electronics with same-day Lahore dispatch.",
        "telephone": "+923298840694",
        "priceRange": "PKR",
        "currenciesAccepted": "PKR",
        "paymentAccepted": "Cash, Bank Transfer, EasyPaisa, JazzCash",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Main Bund Road",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "addressCountry": "PK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 31.5204,
          "longitude": 74.3587
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "20:30"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://alltechbyte.pk/#website",
        "url": "https://alltechbyte.pk",
        "name": "All Tech Byte",
        "publisher": {
          "@id": "https://alltechbyte.pk/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://alltechbyte.pk/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://alltechbyte.pk/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the direct WhatsApp ordering process work on All Tech Byte?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Browse any product on our site and click 'Order on WhatsApp' or send us your parts list. A pre-filled message with the exact item title and price will open in your WhatsApp. Our sales technician will confirm availability, answer technical questions, and book your dispatch immediately."
            }
          },
          {
            "@type": "Question",
            "name": "Where is your physical retail store located in Lahore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our retail store and dispatch outlet is located at Shop #8, Muhammadia Colony, Near Muhammadia Masjid, Bund Road, Lahore."
            }
          },
          {
            "@type": "Question",
            "name": "Do you deliver to cities outside Lahore across Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We provide express nationwide courier delivery to Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Gujranwala, Sialkot, and all other cities and towns across Pakistan via TCS, Leopards, or Trax."
            }
          },
          {
            "@type": "Question",
            "name": "What payment methods are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We support: (1) Cash on Delivery (COD) across Pakistan, (2) Direct Online Bank Transfer (Meezan Bank, HBL, Bank Alfalah), (3) JazzCash, and (4) EasyPaisa."
            }
          },
          {
            "@type": "Question",
            "name": "Are your Raspberry Pi boards, microcontrollers, and ICs genuine?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 100%. We source original microcontrollers (Raspberry Pi UK, genuine Atmel/Microchip ATmega328P, Espressif ESP32, STMicroelectronics STM32, Winsen sensors) and conduct pre-shipment testing."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get technical assistance or component recommendations for my project?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Certainly! Our staff includes experienced electronics technicians who understand pinouts, power supplies, motor drivers, and microcontroller compatibility. Send us a message on WhatsApp (03298840694) with your schematic or requirements."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
