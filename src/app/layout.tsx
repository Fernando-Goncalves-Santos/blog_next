import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Container from "@/components/container";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ToastifyContainer from "@/components/ToastifyContainer";

export const metadata: Metadata = {
  title: {
    default: "The Blog",
    template: "%s | The Blog",
  },
  description: "Blog usando Next.js",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br">
      <body>
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
