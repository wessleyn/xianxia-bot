import { IconCheck, IconStar, IconThumbUp } from '@tabler/icons-react';
import React, { useState } from 'react';

const UpdateFeedback: React.FC = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleRating = (value: number) => {
        setRating(value);
    };

    const handleSubmitFeedback = () => {
        // Logic to submit feedback
        console.log('Feedback submitted with rating:', rating);
        setFeedbackSubmitted(true);
    };

    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Your Feedback Matters</h2>

            {feedbackSubmitted ? (
                <div className="flex flex-col items-center py-6">
                    <div className="bg-teal-100 dark:bg-teal-600 p-3 rounded-full mb-3">
                        <IconCheck className="h-8 w-8 text-teal-600 dark:text-teal-200" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-center text-[var(--color-card-foreground)] dark:text-gray-100">
                        Thank You for Your Feedback
                    </h3>
                    <p className="text-center text-[var(--color-card-foreground)] dark:text-gray-200">
                        Your input helps us improve Xianxu for everyone.
                    </p>
                </div>
            ) : (
                <div>
                    <p className="mb-6 text-[var(--color-card-foreground)] dark:text-gray-200">
                        How would you rate this update? Your feedback helps us improve future releases.
                    </p>

                    <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRating(star)}
                                className={`mx-1 p-1 rounded-full transition-all ${rating && star <= rating
                                        ? 'text-yellow-400 transform scale-110'
                                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300 dark:hover:text-yellow-500'
                                    }`}
                            >
                                <IconStar size={32} fill={rating && star <= rating ? 'currentColor' : 'none'} />
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmitFeedback}
                            disabled={!rating}
                            className={`
                                flex items-center px-6 py-2 rounded-md transition-colors
                                ${rating
                                    ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                }
                            `}
                        >
                            <IconThumbUp size={18} className="mr-2" />
                            Submit Feedback
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UpdateFeedback;