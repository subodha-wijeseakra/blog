import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as default for now
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PostProvider } from "@/context/PostContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogger Clone",
  description: "A simple blogging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostProvider>
            {children}
          </PostProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
