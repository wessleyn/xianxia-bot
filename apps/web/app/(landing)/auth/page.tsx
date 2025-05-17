import AutoAuth from "./_components/AutoAuth";

export default async function AuthPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Extract parameters from the URL
    const params = await searchParams;
    const callback = typeof params.callback === 'string'
        ? params.callback
        : undefined;

    const mode = typeof params.mode === 'string'
        ? params.mode as 'login' | 'register'
        : 'login';

    return (
        <div className="h-screen">
            <AutoAuth mode={mode} callback={callback} />
        </div>
    )
}