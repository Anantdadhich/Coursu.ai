import type { Metadata } from "next";
import { Bricolage_Grotesque, Crimson_Pro, Lexend_Deca} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

import { ScrollProgress } from "@/components/ui/scrool-progress";
import Navbar from "@/components/Navbar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";




const mainFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "500", "600", "700", "800"],
  variable: '--font-main'
});

const secondaryFont = Crimson_Pro({
  subsets: ["latin"],
  weight: [ "200", "300", "500", "600", "700", "800"],
  variable: '--font-secondary'
});


export const metadata: Metadata = {
  title:"Coursu.ai",
  description: "Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(mainFont.className, secondaryFont.className, "antialiased min-h-screen")}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <SmoothCursor></SmoothCursor>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />
            <ScrollProgress></ScrollProgress>
          </div>
        </Providers>
      </body>
    </html>
  );
}