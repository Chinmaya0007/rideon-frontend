// import React, { useState } from "react";
// import InputField from "./InputField";
// import toast from "react-hot-toast";
// import { Loader2, Mail } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// interface Props {
//   form: any;
//   setForm: React.Dispatch<React.SetStateAction<any>>;
//   onNext: () => void;
// }

// const StepEmail: React.FC<Props> = ({ form, setForm, onNext }) => {
//   const [loading, setLoading] = useState(false);
//   const { sendOtp } = useAuth();

//   const handleSendOtp = async () => {
//     if (!form.email) {
//       toast.error("Please enter your email");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await sendOtp(form.email);
//       toast.success(res?.message || "OTP sent successfully 🎉");
//       onNext(); // ✅ only go next if success
//     } catch (error: any) {
//       toast.error(error.message || "Failed to send OTP"); // ✅ show API error
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <InputField
//         name="email"
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         icon={<Mail size={20} />}
//       />

//       <div className="flex w-full px-[10px] py-[8px] justify-center items-center">
//         <button
//           onClick={handleSendOtp}
//           disabled={loading}
//           className="flex w-full h-[48px] items-center justify-center rounded-lg bg-[#0d78f2] text-white font-bold disabled:opacity-70"
//         >
//           {loading ? <Loader2 size={20} className="animate-spin" /> : "Send OTP"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default StepEmail;
import React from "react";
import InputField from "./InputField";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
}

const StepEmail: React.FC<Props> = ({ form, setForm, onNext }) => {
  const handleNext = () => {
    if (!form.email) {
      toast.error("Please enter your email");
      return;
    }
    onNext(); // ✅ directly go to details step
  };

  return (
    <>
      <InputField
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        icon={<Mail size={20} />}
      />

      <div className="flex w-full px-[10px] py-[8px] justify-center items-center">
        <button
          onClick={handleNext}
          className="flex w-full h-[48px] items-center justify-center rounded-lg bg-[#0d78f2] text-white font-bold"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default StepEmail;
