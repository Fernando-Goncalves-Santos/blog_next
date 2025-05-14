import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Blog ",
  description: "Blog usando Next.js",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br">
      <header>Header</header>
      <body>{children}</body>
      <footer>Footer</footer>
    </html>
  );
}
