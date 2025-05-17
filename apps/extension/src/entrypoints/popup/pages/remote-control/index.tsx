import React, { useState } from 'react';

const RemoteControl: React.FC = () => {
  const [yourId, setYourId] = useState('893 992 234');
  const [password, setPassword] = useState('qakp2239djq');
  const [partnerIdInput, setPartnerIdInput] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add notification here
  };

  const refreshPassword = () => {
    // Generate a new random password
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let newPassword = '';
    for (let i = 0; i < 10; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-bold text-lg mb-1">Allow remote control</h2>
        <p className="text-sm text-gray-500">To share access with your device to someone.</p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">YOUR ID</label>
            <div className="flex">
              <input
                type="text"
                value={yourId}
                readOnly
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={() => copyToClipboard(yourId)}
                className="ml-1 border rounded-md p-2 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">PASSWORD</label>
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={refreshPassword}
                className="ml-1 border rounded-md p-2 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6"></path>
                  <path d="M23 20v-6h-6"></path>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-1">Take the control</h2>
        <p className="text-sm text-gray-500">Of someone's device remotely.</p>

        <div className="mt-4">
          <label className="block text-xs text-gray-500 mb-1">PARTNER ID</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter code"
              value={partnerIdInput}
              onChange={(e) => setPartnerIdInput(e.target.value)}
              className="flex-1 border rounded-l-md px-3 py-2 text-sm"
            />
            <button
              className="bg-black text-white px-4 py-2 rounded-r-md text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <button
          className="flex items-center justify-center border rounded-md py-2 flex-1 gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Connect
        </button>
        <button
          className="flex items-center justify-center border rounded-md py-2 flex-1 gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8h14"></path>
            <path d="M5 12h14"></path>
            <path d="M5 16h14"></path>
          </svg>
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default RemoteControl;
