import { useAuthModalStore } from "@store/useAuthModalStore";
import { useEffect, useState } from "react";

const Closing = () => {
    const [seconds, setSeconds] = useState(3);
    const { isAuthenticated, setIsAuthenticated, setIsFromExtension } = useAuthModalStore();
    const [attemptedClose, setAttemptedClose] = useState(false);
    
    // Effect for countdown
    useEffect(() => {
        if (isAuthenticated && seconds > 0) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);
    
    // Separate effect for window close logic
    useEffect(() => {
        if (isAuthenticated && seconds === 0 && !attemptedClose) {
            // Set flag to prevent multiple attempts
            setAttemptedClose(true);
            
            console.log('Attempting to auto-close window...');
            
            try {
                // Try using window.close()
                window.close();
                
                // If we're still here after a short delay, window.close() failed
                // In some browsers, only windows opened by scripts can be closed by scripts
                const closeCheckTimer = setTimeout(() => {
                    console.log('Window close may have failed, resetting states');
                    setIsAuthenticated(false);
                    setIsFromExtension(false);
                }, 500);
                
                return () => clearTimeout(closeCheckTimer);
            } catch (err) {
                console.error('Error closing window:', err);
                // Reset states if closing fails
                setIsAuthenticated(false);
                setIsFromExtension(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, seconds, attemptedClose]);

    return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Authentication Successful!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                You can now return to the extension and continue your cultivation journey.
            </p>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                This window will auto-close in {seconds} second{seconds !== 1 ? 's' : ''}...
            </div>
            <button
                onClick={() => window.close()}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
                Close This Window
            </button>
        </div>)
}

export default Closing