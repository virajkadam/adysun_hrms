import type { Metadata } from "next";
import EnquiryFormClient from "./EnquiryFormClient";
import { enquiryMetaConfig } from "./metaConfig";

const { title, description, keywords, canonical, image } = enquiryMetaConfig;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonical,
    siteName: "Adysun Ventures",
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "Adysun Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnquiryPage() {
  return <EnquiryFormClient />;
}
