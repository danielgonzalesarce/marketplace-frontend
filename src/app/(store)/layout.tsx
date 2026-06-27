import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WelcomeBanner from '@/components/WelcomeBanner';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <WelcomeBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
