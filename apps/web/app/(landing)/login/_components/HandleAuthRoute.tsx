'use client';

import { useAuthModalStore } from "@store/useAuthModalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HandleRouteParams {
    redirectTo: string;
}

// This component handles programmatic navigation after successful auth
const HandleAuthRoute = ({ redirectTo }: HandleRouteParams) => {
    const router = useRouter();
    const { closeModal } = useAuthModalStore();

    useEffect(() => {
        // Close modal and redirect
        closeModal();
        router.push(redirectTo);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirectTo]);

    return null;
};

export default HandleAuthRoute;
