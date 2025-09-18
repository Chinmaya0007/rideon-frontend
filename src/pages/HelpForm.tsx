import React, { useState } from "react";

const HelpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    description: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Help Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#101923] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[480px] bg-[#182534] p-6 rounded-2xl shadow-lg space-y-4"
      >
        <h2 className="text-white text-2xl font-bold mb-2">Help</h2>

        {/* Category */}
        <label className="flex flex-col">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input rounded-lg text-white border border-[#314b68] bg-[#101923] h-12 px-3 focus:outline-none focus:border-[#0d78f2]"
          >
            <option value="">Select a category</option>
            <option value="ride">Ride</option>
            <option value="app related">App related</option>
            <option value="payment">Payment</option>
          </select>
        </label>

        {/* Subject */}
        <label className="flex flex-col">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input rounded-lg text-white border border-[#314b68] bg-[#101923] h-12 px-3 placeholder:text-[#90abcb] focus:outline-none focus:border-[#0d78f2]"
          />
        </label>

        {/* Description */}
        <label className="flex flex-col">
          <textarea
            name="description"
            placeholder="Describe your issue"
            value={formData.description}
            onChange={handleChange}
            className="form-input rounded-lg text-white border border-[#314b68] bg-[#101923] min-h-[120px] px-3 py-2 placeholder:text-[#90abcb] focus:outline-none focus:border-[#0d78f2]"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input rounded-lg text-white border border-[#314b68] bg-[#101923] h-12 px-3 placeholder:text-[#90abcb] focus:outline-none focus:border-[#0d78f2]"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="bg-[#0d78f2] hover:bg-[#0b65d1] px-5 h-10 rounded-lg text-white text-sm font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm;
