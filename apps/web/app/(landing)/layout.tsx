import { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import OAuthHandler from "./_components/OAuthHandler";

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
            <Suspense fallback={null}>
                <OAuthHandler />
            </Suspense>
            <Header />
            <main className="bg-white dark:bg-gray-900">
                {children}
            </main>
            <Footer />
        </>
    );
}