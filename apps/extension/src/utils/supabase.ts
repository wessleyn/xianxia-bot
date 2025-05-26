import createSupabaseClient from "@repo/auth/client";

const supabase = createSupabaseClient({})

export const getLoggedInUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error checking user:', error);
        return null;
    }
    return user;
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