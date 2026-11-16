import { getSiteUrl } from "@/lib/site";

export type Faq = {
  question: string;
  answer: string;
};

/** Grand River Labs as the `provider` of a schema.org Service. */
export function providerJsonLd() {
  return {
    "@type": "ProfessionalService",
    name: "Grand River Labs",
    url: getSiteUrl(),
    email: "hello@grandriverlabs.io",
  };
}

/**
 * schema.org FAQPage for a page's FAQ list. On-page answers can contain
 * [label](href) links; structured data gets the label text only.
 */
export function faqPageJsonLd(faqs: readonly Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
      },
    })),
  };
}
