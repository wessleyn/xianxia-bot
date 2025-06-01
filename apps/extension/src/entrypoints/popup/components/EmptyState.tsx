import React from 'react';
import { Link } from 'react-router-dom';

export interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionPath?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    actionLabel,
    actionPath,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[250px] w-full  py-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm mx-auto">
            <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">{description}</p>

            {actionLabel && (actionPath || onAction) && (
                actionPath ? (
                    <Link
                        to={actionPath}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-md transition-colors shadow-sm"
                    >
                        {actionLabel}
                    </Link>
                ) : (
                    <button
                        onClick={onAction}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-md transition-colors shadow-sm"
                    >
                        {actionLabel}
                    </button>
                )
            )}
        </div>
    );
};

export default EmptyState;