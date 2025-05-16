import { IconBrandGoogle, IconBrandSlack } from '@tabler/icons-react';


const OAuth = () => {
  return (
      <div className="grid grid-cols-2 gap-3">
          <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
              <IconBrandGoogle className="h-5 w-5" />
              Google
          </button>

          <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all"
          >
              <IconBrandSlack className="h-5 w-5" />
              Slack
          </button>
      </div>

)
}

export default OAuth