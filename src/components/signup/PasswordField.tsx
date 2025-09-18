import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<Props> = ({ name, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-full px-[10px] py-[8px] relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex w-full h-[48px] px-[16px] rounded-lg bg-[#223449] text-white border-none"
      />
      <button
        type="button"
        className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-[#90abcb]"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordField;
