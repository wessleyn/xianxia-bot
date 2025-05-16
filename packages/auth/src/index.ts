'use server'

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
        // TODO: save the name too here using prisma
        return {
            status: "success",
            data,
        };
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
        },
    })


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

export async function signInWithSlack({ redirectTo }: { redirectTo: string }) {
    const supabase = await createClient();
    console.log('signInWithSlack', redirectTo)
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'slack_oidc',
        options: {
            redirectTo
        }
    })
    console.log('signInWithSlack', data, error)

    return {
        data,
        error
    }
  }
export async function signInWithGoogle({ redirectTo }: { redirectTo: string}) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo,
        },
      })
    return {
        data,
        error
    }
  }