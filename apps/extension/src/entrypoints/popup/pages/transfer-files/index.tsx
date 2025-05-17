import React from 'react';

const TransferFiles: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-bold text-lg mb-2">Transfer Files</h2>
        <p className="text-sm text-gray-500">
          Send files to other devices or receive files from others.
        </p>

        <div className="mt-6 space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Send Files</h3>
            <p className="text-sm text-gray-500 mb-3">
              Select files to send to another device
            </p>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
              Select Files
            </button>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Receive Files</h3>
            <p className="text-sm text-gray-500 mb-3">
              Enter a sharing code to receive files
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter sharing code"
                className="flex-1 border rounded-l-md px-3 py-2 text-sm"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md text-sm">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferFiles;
