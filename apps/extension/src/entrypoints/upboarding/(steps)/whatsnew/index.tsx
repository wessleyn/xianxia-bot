import React from 'react';
import UpdateHighlights from './components/UpdateHighlights';
import VersionDetails from './components/VersionDetails';

const WhatsNew: React.FC = () => {
    return (
        <div className="space-y-6">
            <VersionDetails />
            <UpdateHighlights />
        </div>
    );
};

export default WhatsNew;