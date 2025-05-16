export const LoadingState = ({ message }: { message: string; }) => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-500"></div>
        <p className="text-center text-gray-600 dark:text-gray-300">{message}</p>
    </div>
);
