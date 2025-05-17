import { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import OAuthHandler from "./_components/OAuthHandler";
import { createProfile } from "@repo/db/queries";

export const metadata: Metadata = {
    title: "Xianxiu",
    description: "A webnovel curator.",
};

export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
    }) {
    await createProfile("test", "test", false);
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