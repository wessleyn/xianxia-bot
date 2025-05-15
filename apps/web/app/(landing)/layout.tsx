import { Metadata } from "next";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export const metadata: Metadata = {
    title: "Xianxiu",
    description: "A webnovel curator.",
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}