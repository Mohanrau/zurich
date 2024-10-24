import Footer from '../components/Footer/Index';
import Header from '../components/Header/Index';
import './global.css';
import { AppProvider } from '../providers/AppProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white md:h-screen">
        <AppProvider basePath="/api/auth">
          <Header />
          <div className="w-full pt-32 overflow-auto px-12 h-[70vh]">
            {children}
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
