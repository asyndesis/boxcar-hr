import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Boxcar HR",
  description: "Hobo resources recommended",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider>
          <ClerkProvider>
            <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
