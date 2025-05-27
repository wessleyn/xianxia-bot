import createSupabaseClient from "@repo/auth/client";
import { localUserInfo } from "../constants/storage";

const supabase = createSupabaseClient({})

export const getLoggedInUser = async () => {
    const data = await localUserInfo.getValue()
    if (data.id && data.isAuthenticated) {
        return {
            id: data.id,
            email: data.email,
            lastLoginTime: data.lastLoginTime,
        }
    } else {
        console.error('user Not logged in')
       return null;
    }
};

export const getUserId = async (): Promise<string | null> => {
    const user = await getLoggedInUser();
    if (!user) {
        console.warn('No user is logged in');
        return null;
    }
    return user.id;
};

export const getLoggedInStatus = async (): Promise<boolean> => {
    const user = await getLoggedInUser();
    return !!user;
};
export default supabase