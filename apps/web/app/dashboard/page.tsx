import { getCurrentUser } from "@repo/auth/utils";

export default async function Dashboard() {
    const user = await getCurrentUser();
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.email}!</p>
            <p>Your user ID is: {user.id}</p>
            <p>Your user metadata is: {JSON.stringify(user.user_metadata)}</p>
            <p>Your user app metadata is: {JSON.stringify(user.app_metadata)}</p>
            <p>Your user created at: {user.created_at}</p>
            <p>Your user updated at: {user.updated_at}</p>
            <p>Your user email confirmed at: {user.email_confirmed_at}</p>
            <p>Your user phone number: {user.phone}</p>
            <p>Your user phone number confirmed at: {user.phone_confirmed_at}</p>
            <p>Your user last sign in at: {user.last_sign_in_at}</p>
        </div>
    )
}