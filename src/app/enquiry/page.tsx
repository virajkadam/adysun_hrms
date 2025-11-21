import type { Metadata } from "next";
import EnquiryFormClient from "./EnquiryFormClient";

export const metadata: Metadata = {
  title: "Adysun Ventures | Candidate Enquiry",
  description:
    "Submit your enquiry to Adysun Ventures to explore career opportunities, share your profile, and connect with our HR team.",
  keywords: [
    "Adysun Ventures enquiry",
    "candidate enquiry",
    "HR enquiry",
    "job enquiry",
    "Adysun careers",
  ],
  alternates: {
    canonical: "https://www.adysunventures.com/enquiry",
  },
  openGraph: {
    title: "Adysun Ventures | Candidate Enquiry",
    description:
      "Submit your enquiry to Adysun Ventures to explore career opportunities, share your profile, and connect with our HR team.",
    type: "website",
    url: "https://www.adysunventures.com/enquiry",
    siteName: "Adysun Ventures",
    images: [
      {
        url: "https://www.adysunventures.com/adysun-logo.png",
        width: 1200,
        height: 630,
        alt: "Adysun Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adysun Ventures | Candidate Enquiry",
    description:
      "Submit your enquiry to Adysun Ventures to explore career opportunities, share your profile, and connect with our HR team.",
    images: ["https://www.adysunventures.com/adysun-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnquiryPage() {
  return <EnquiryFormClient />;
}
