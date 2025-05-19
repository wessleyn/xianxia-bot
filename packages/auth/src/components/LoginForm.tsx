import OTPBtns from './OTPBtns';

interface LoginFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleGoogle: () => void;
    handleSlack: () => void;
    email: string;
    setEmail: (email: string) => void;
    isLoading: boolean;
    isGoogleLoading: boolean;
    isSlackLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, handleGoogle, handleSlack, email, setEmail, isLoading, isGoogleLoading, isSlackLoading }) => {

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !email}
                    className={`w-full rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm font-medium  dark:text-white shadow-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all ${isLoading || !email ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Sending...' : 'Continue with Email'}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
            </div>
            <OTPBtns
                handleGoogle={handleGoogle}
                handleSlack={handleSlack}
                isGoogleLoading={isGoogleLoading}
                isSlackLoading={isSlackLoading}
            />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                By continuing, you acknowledge that you have read and understand our
                <a href="#" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"> Privacy Policy</a>
            </div>
        </div>
    );
};

export default LoginForm;
