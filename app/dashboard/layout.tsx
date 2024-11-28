
'use client'
import "/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "./Navbar/page";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchProvider } from "./contexts/searchContext";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
    <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <SidebarProvider>
        <Navbar />
        <AppSidebar />
          <SidebarTrigger />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="pt-16"> {/* Ajout d'un padding en haut de 16 unités */}
            <Suspense fallback={null}>
              {children}
              </Suspense>
            </div>
          </ThemeProvider>
      </SidebarProvider>
    </SearchProvider>
    </QueryClientProvider>
    </main>

  );
}
