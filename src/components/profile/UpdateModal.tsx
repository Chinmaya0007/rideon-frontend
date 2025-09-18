import React from "react";

interface Props {
  name: string;
  email: string;
  phone: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  onClose: () => void;
  onSave: () => void | Promise<void>; // 🔹 added
}

const UpdateModal: React.FC<Props> = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  onClose,
  onSave, // 🔹 destructure onSave
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
      <div className="bg-[#182534] p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Update Details</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full bg-[#223449] px-4 py-2 rounded-lg mb-3 text-white text-sm sm:text-base"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-[#223449] px-4 py-2 rounded-lg mb-3 text-white text-sm sm:text-base"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full bg-[#223449] px-4 py-2 rounded-lg mb-3 text-white text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={async () => {
              try {
                await onSave(); // ✅ ensures API is awaited
              } catch (err) {
                console.error("Update failed:", err);
              }
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
