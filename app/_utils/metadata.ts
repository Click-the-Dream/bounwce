import type { Metadata } from "next";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  imageUrl?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraph?: Partial<Metadata["openGraph"]>;
  twitter?: Partial<Metadata["twitter"]>;
}

const BASE_URL = "https://bouwnce.com";

export function generatePageMetadata({
  title,
  description,
  imageUrl,
  path = "",
  keywords = [],
  noIndex = false,
  openGraph = {},
  twitter = {},
}: PageMetadataOptions = {}): Metadata {
  const finalTitle =
    title || "Bouwnce | Redefining the Campus Experience for Students";

  const finalDescription =
    description ||
    "Bouwnce redefines how students experience campus life — connect, learn, and grow in a smarter digital environment designed for collaboration and success.";

  const finalImage = imageUrl || `${BASE_URL}/logo-white.png`;
  const url = `${BASE_URL}${path}`;

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      default: finalTitle,
      template: `%s | Bouwnce`,
    },

    description: finalDescription,

    keywords: ["Bouwnce", "campus app", "student experience", ...keywords],

    authors: [{ name: "Bouwnce Team" }],

    robots: noIndex ? "noindex, nofollow" : "index, follow",

    manifest: "/manifest.json",

    icons: {
      icon: "/logo-white.png",
      apple: "/icons/apple-touch-icon.png",
      shortcut: "/icons/favicon-192.png",
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: "Bouwnce",
      type: "website",
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: "Bouwnce",
        },
      ],
      ...openGraph,
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      ...twitter,
    },

    formatDetection: {
      telephone: false,
    },
  };
}
