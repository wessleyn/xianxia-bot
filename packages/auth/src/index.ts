'use server'

import { createProfile } from "@repo/db/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const name = formData.get("name")?.toString();

    const supabase = await createClient();

    if (!email || !name) {
        return {
            status: "error",
            message: "Both email and name are required",
        };
    }

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: true,
        },
    });

    if (error) {
        console.error(error.code + " " + error.message);
        return {
            status: "error",
            message: error.message,
        };
    } else {
        if (data.user) {
            const user = data.user as { id: string };
            await createProfile(user.id, name)
        }
        if (data.user) {
            const user = data.user as { id: string };
            await createProfile(user.id, name)
        }
        return {
            status: "success",
            data,
        };
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    console.log("[SERVER DEBUG] Starting signInAction for email:", email);
    
    const supabase = await createClient();
    let data, error, isNew = false;

    console.log("[SERVER DEBUG] Attempting to sign in existing user");
    ({ data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
        },
    }))

    if (error) {
        console.log("[SERVER DEBUG] User doesn't exist, attempting to create:", error.message);
        ({ data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
            },
        }))
        if (!error) {
            isNew = true;
            console.log("[SERVER DEBUG] User created successfully, setting isNew:", isNew);
        }
    } else {
        console.log("[SERVER DEBUG] Existing user found");
    }

    if (error) {
        console.log('[SERVER DEBUG] Error signing in', error);
        return {
            status: "error",
            message: error.message,
            data,
        }
    }
    
    console.log('[SERVER DEBUG] Sign in successful, isNew:', isNew);
    return {
        status: "success",
        data,
        isNew,
    };
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
};

export const verifyOtp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const token = formData.get("otp") as string;

    console.log("[SERVER DEBUG] Verifying OTP for email:", email, "token:", token);

    const supabase = await createClient();

    console.log("[SERVER DEBUG] Calling Supabase verifyOtp");
    const { data, error } = await supabase.auth.verifyOtp({
        type: 'email',
        email,
        token,
    });
    
    console.log("[SERVER DEBUG] VerifyOtp response:", { 
        success: !error,
        error: error ? { code: error.code, message: error.message } : null,
        userData: data?.user ? { 
            id: data.user.id,
            email: data.user.email,
            isNew: data.user.app_metadata?.provider === 'email' && !data.user.user_metadata?.has_completed_profile
        } : null
    });

    if (error) {
        return {
            status: "error",
            message: error.message,
            data,
        }
    }
    return {
        status: "success",
        data
    };
};

export async function signInWithSlack(isExtension = false ) {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'slack_oidc',
        options: {
            redirectTo: `${origin}/login${isExtension ? '?ext=true' : ''}`,
        },
    });

    if (error) {
        return {
            data,
            error
        }
    } else {

        redirect(data.url)
    }
}

export async function signInWithGoogle(isExtension = false) {
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/login${isExtension ? '?ext=true' : ''}`,
        },
    });
    if (error) {
        return {
            data,
            error
        }
    } else {
        console.log(data.url)
        redirect(data.url)
    }
}

export async function authenticateCode(code: string) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    return error
}