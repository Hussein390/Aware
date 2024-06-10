'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(router)/_components/Header";
import SideBar from "./(router)/_components/SideBar";
import { ThemeProvider } from "./(router)/_components/Theme-Provider"
import { ContextProvider, useMyContext } from "./(router)/_components/ContextProvider";
import { NextAuthProvider } from "./(router)/_components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-300 dark:bg-dark min-h-screen`}>
        <main>
        <NextAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

        <ContextProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ContextProvider>
        </ThemeProvider>
        </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}

const RootLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen} = useMyContext();

  return (
    <>
      {isOpen && (
        <div style={{ display: isOpen ? "block" : "none" }} className={`w-[230px] hidden sm:block bg-slate-50 dark:bg-dark shadow-md fixed h-lvh z-[100]`}>
          <SideBar />
        </div>
      )}
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'md:ml-[230px]' : 'ml-0'}`}>
        <Header />
        {children}
      </div>
    </>
  );
};