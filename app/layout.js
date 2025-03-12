import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const manrope = Manrope({ subsets: ['latin', 'cyrillic']});

export const metadata = {
  title: "project_tt4u",
  description: "Универсальная Финансовая Платформа",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="ru">
      <body className={`${manrope.className}`}>
        {/* header */}
        <Header/>
        <main className="min-h-screen">{children}</main>
        <Toaster richColors />
        {/* footer */} 
        <footer className="bg-purple-50 py-12 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} nester.era@gmail.com</p>
          </div>
        </footer> 
        </body>
    </html>
    </ClerkProvider>
  );
}