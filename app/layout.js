import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ['latin', 'cyrillic']});

export const metadata = {
  title: "project_tt4u",
  description: "Универсальная Финансовая Платформа",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        {/* header */}
        <main className="min-h-screen">{children}</main>
        {/* footer */} 
        <footer className="bg-purple-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© {new Date().getFullYear()} nester.era@gmail.com</p>
          </div>
        </footer> 
        </body>
    </html>
  );
}
