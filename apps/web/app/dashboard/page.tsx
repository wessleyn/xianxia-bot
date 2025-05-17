import { getCurrentUser } from "@repo/auth/utils";

export default async function Dashboard() {
    const user = await getCurrentUser();
    const signedInAt = new Date(user.last_sign_in_at!);
    return (
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center antialiased text-2xl">
            <h1>Welcome, {user.email?.split("@")[0]}! </h1>
            <h2>Your have been added to the waiting list</h2>
            <h3> We&apos;ll notify you via your email: <span>{user.email}</span></h3>
            <h4>You last check in at: {signedInAt.toLocaleString()}</h4>
        </div>
    )
}