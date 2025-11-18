import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tobago Visitor Experience Survey | Beyond Ordinary",
  description: "Share your experience in Tobago, the Greatest Little Island on the Planet. Help us ensure your visit remains Beyond Ordinary.",
  keywords: "Tobago, survey, visitor feedback, tourism, Caribbean, travel",
  openGraph: {
    title: "Tobago Visitor Experience Survey",
    description: "Share your experience in Tobago, the Greatest Little Island on the Planet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

