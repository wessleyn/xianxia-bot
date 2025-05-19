import AutoAuth from "./_components/AutoAuth";
import HandleExtensionAuth from "./_components/HandleExtensionAuth";

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

    const isFromExtension = typeof params.ext === 'string'
        ? !!params.ext
        : false

    const provider = typeof params.provider === 'string'
        ? params.provider as 'google' | 'slack'
        : undefined;

    const mode = typeof params.mode === 'string'
        ? params.mode as 'login' | 'register'
        : 'login';


    const isValidExtension = isFromExtension && provider

    return (
        <div className="h-screen" >
            {
                isValidExtension && (
                    <HandleExtensionAuth provider={provider} />
                )
            }
            <AutoAuth mode={mode} callback={callback}/>
        </div>
    )
}