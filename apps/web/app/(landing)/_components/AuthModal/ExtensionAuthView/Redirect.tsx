
const Redirect = () => {
  return (
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Redirecting to Authentication Provider
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                You&apos;ll be redirected to sign in securely. After authentication, you&apos;ll return here automatically.
            </p>
            <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
        </div>)
}

export default Redirect