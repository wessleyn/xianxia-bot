import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
        </div>
    );
};

export default StatCard;
