import React, { useState } from 'react';

const StartMeeting: React.FC = () => {
  const [meetingId, setMeetingId] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-bold text-lg mb-2">Start a Meeting</h2>
        <p className="text-sm text-gray-500">
          Start or join a video meeting with others.
        </p>

        <div className="mt-6 space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">New Meeting</h3>
            <p className="text-sm text-gray-500 mb-3">
              Start a new meeting and invite others
            </p>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
              Start New Meeting
            </button>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Join Meeting</h3>
            <p className="text-sm text-gray-500 mb-3">
              Enter a meeting code to join
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter meeting code"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="flex-1 border rounded-l-md px-3 py-2 text-sm"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md text-sm">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMeeting;
