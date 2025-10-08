import type { Metadata } from "next";
import DeleteButton from "./_components/DeleteButton";

export const metadata: Metadata = {
    title: "Dashboard | Xianxu",
    description: "Your personal dashboard for reading stats, recent novels, and more.",
}

export default function DeleteAccountPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Delete Account</h1>
            <p className="mb-8 text-center text-gray-600">
                Are you sure you want to delete your account? This action cannot be undone.
            </p>
          <DeleteButton />
        </div>
    );
}