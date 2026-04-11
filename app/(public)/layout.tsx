import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-[#0A0F1E] min-h-screen">
            <Navbar />
            <main className="pt-20">
              {children}
            </main>
            <Footer />
        </div>
    );
}
