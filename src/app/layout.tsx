import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";

const font = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Converse",
  description: "Secure messaging designed for the discerning user.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <ConvexClientProvider>
        {children}
      </ConvexClientProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
