import React from "react";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  height?: number; // px, default 56
}

const InputField: React.FC<Props> = ({
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon,
  height = 56,
}) => {
  // inline style ensures exact pixel-perfect line-height matching height
  const style: React.CSSProperties = {
    height: `${height}px`,
    lineHeight: `${height}px`,
    boxSizing: "border-box",
    paddingTop: 0,
    paddingBottom: 0,
  };

  return (
    <div className="flex flex-col w-full px-[10px] py-[8px] relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        className={`w-full rounded-lg text-white border-none bg-[#223449] ${
          icon ? "pl-[40px]" : "pl-[16px]"
        } pr-[16px] placeholder:text-[#90abcb] text-[16px] font-normal focus:outline-0 focus:ring-0`}
      />
      {icon && (
        <span
          className="absolute left-[20px] top-1/2 transform -translate-y-1/2 text-[#90abcb] pointer-events-none"
          aria-hidden
        >
          {icon}
        </span>
      )}
    </div>
  );
};

export default InputField;
