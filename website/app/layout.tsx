import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { Toaster } from "sonner";
import { Footer, Header } from "@/components/shared";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: "Ecommerce Site ",
  description:
    "Welcome to the Ecommerce Site. Buy your favorite products here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${roboto.variable} bg-bg`}>
        <ReactQueryProvider>
          <Toaster position="top-right" richColors />
          <main className="w-full overflow-x-hidden">
            <Header />
            {children}
            <Footer />
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
