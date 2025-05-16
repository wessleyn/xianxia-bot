import AutoAuth from "./_components/AutoAuth";

export default function AuthPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Extract parameters from the URL
    const callback = typeof searchParams.callback === 'string'
        ? searchParams.callback
        : undefined;

    const mode = typeof searchParams.mode === 'string'
        ? searchParams.mode as 'login' | 'register'
        : 'login';

    return (
        <div className="h-screen">
            <AutoAuth mode={mode} callback={callback} />
        </div>
    )
}