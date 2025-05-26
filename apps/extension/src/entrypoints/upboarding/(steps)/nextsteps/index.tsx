import React from 'react';
import NextStepsActions from './components/NextStepsActions';
import UpdateFeedback from './components/UpdateFeedback';

const NextSteps: React.FC = () => {
    return (
        <div className="space-y-6">
            <NextStepsActions />
            <UpdateFeedback />
        </div>
    );
};

export default NextSteps;