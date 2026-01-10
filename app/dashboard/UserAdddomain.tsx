const UserAddDomain = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-2xl mx-4">

        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 md:p-6">

          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Add Domain
            </h3>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          <div className="py-6 space-y-4">
            <p className="text-gray-600">
              Add your domain to start tracking and managing it in your portfolio.
            </p>
            <input
              type="text"
              placeholder="example.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddDomain;
