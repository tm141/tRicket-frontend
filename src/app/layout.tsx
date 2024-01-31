import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_components/footer";
import Logout from "./lib/logout/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tRicket",
  description: "Find your perfect event",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
