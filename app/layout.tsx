import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brainstorming With AI",
  description: "A responsive brainstorming interface with switchable conversation modes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
