import { IconBrandGoogle, IconBrandSlack } from '@tabler/icons-react';

interface OTPBtnsProps {
    handleGoogle: () => void;
    handleSlack: () => void;
    
    isGoogleLoading: boolean;
    isSlackLoading: boolean;
}

const OTPBtns = ({ handleGoogle, handleSlack, isGoogleLoading, isSlackLoading }: OTPBtnsProps) => {
  return (
      <div className="grid grid-cols-2 gap-3">
          <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading || isSlackLoading}
              className={`flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all ${(isGoogleLoading || isSlackLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
              <IconBrandGoogle className="h-5 w-5" />
              {isGoogleLoading ? 'Connecting...' : 'Google'}
          </button>

          <button
              onClick={handleSlack}
              type="button"
              disabled={isGoogleLoading || isSlackLoading}
              className={`flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all ${(isGoogleLoading || isSlackLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
              <IconBrandSlack className="h-5 w-5" />
              {isSlackLoading ? 'Connecting...' : 'Slack'}
          </button>
      </div>  )
}

export default OTPBtns