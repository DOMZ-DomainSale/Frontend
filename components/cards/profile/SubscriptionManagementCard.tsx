import React from 'react';

const SubscriptionManagementCard = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow flex flex-col mb-5">
      <h2 className="text-xl font-semibold mb-6">Subscription Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Current Plan Tier</span>
            <div className="bg-white rounded border px-3 py-2 text-gray-900 shadow-sm max-w-fit">Pro Plan</div>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</span>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-1">Expiration / Next Billing</span>
            <span className="text-gray-900">2023</span>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col justify-center items-end space-y-5">
          <button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium transition">
            Upgrade Plan
          </button>
          <div className="flex space-x-3 text-gray-800 text-base">
            <span className="cursor-pointer hover:underline">Monthly</span>
            <span>.</span>
            <span className="cursor-pointer hover:underline">Yearly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagementCard;
