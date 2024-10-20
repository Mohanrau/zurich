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
      <body className="bg-white">
        <AppProvider basePath="/api/auth">
          <Header />
          <div className="w-full flex flex-wrap md:h-screen pt-32">
            {children}
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
