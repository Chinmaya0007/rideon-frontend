import React, { forwardRef } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onBackspace: () => void;
}

const OtpInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, onBackspace }, ref) => {
    return (
      <input
        ref={ref}
        maxLength={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && !value) onBackspace();
        }}
        className="w-[40px] h-[48px] text-center rounded-lg bg-[#223449] text-white text-[18px] font-bold border-2 border-transparent focus:border-[#0d78f2]"
      />
    );
  }
);

export default OtpInput;
