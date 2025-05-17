'use server'

import { createProfile } from "@repo/db/queries";
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
        return {
            status: "success",
            data,
        };
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const supabase = await createClient();
    let data, error, isNew = false;

    ({ data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
        },
    }))

    if (error) {
        ({ data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: true,
            },
        }))
        if (!error) {
            isNew = true;
        }
    }


    if (error) {
        console.log('Error signing in', error)
        return {
            status: "error",
            message: error.message,
            data,
        }
    }
    return {
        status: "success",
        data,
        isNew,
    };
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/auth");
};

export const verifyOtp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const token = formData.get("otp") as string;

    const supabase = await createClient();

    const { data, error, } = await supabase.auth.verifyOtp({
        type: 'email',
        email,
        token,
    })

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

export async function signInWithSlack() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'slack_oidc',
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

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
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

export async function authenticateCode(code: string) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    return error
}