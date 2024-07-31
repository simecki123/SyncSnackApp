import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Lora } from "next/font/google";

const lora = Lora({ style: 'normal', subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={`${lora.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
