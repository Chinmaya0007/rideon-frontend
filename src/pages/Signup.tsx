// import React, { useState, useRef } from "react";
// import StepEmail from "../components/signup/StepEmail";
// import StepOtp from "../components/signup/StepOtp";
// import StepDetails from "../components/signup/StepDetails";

// const SignUp: React.FC = () => {
//   const [step, setStep] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     birthday: "",
//     role: "user",
//     vehicleNo: "",
//     licenseNo: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const otpRefs = Array.from({ length: 6 }, () =>
//     useRef<HTMLInputElement>(null)
//   );

//   const [otpVerified, setOtpVerified] = useState(false);

//   return (
//     <div
//       className="relative flex w-full min-h-screen items-center justify-center bg-[#101923] px-[20px]"
//       style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
//     >
//       <div className="w-full max-w-[400px] flex flex-col py-[20px]">
//         <h2 className="text-white text-[28px] font-bold text-center pb-[20px]">
//           Create Account
//         </h2>

//         {step === 1 && (
//           <StepEmail
//             form={form}
//             setForm={setForm}
//             onNext={() => setStep(2)}
//           />
//         )}

//         {step === 2 && (
//           <StepOtp
//             otp={otp}
//             setOtp={setOtp}
//             otpRefs={otpRefs}
//             email={form.email}   // ✅ add this
//             onBack={() => setStep(1)}
//             onVerify={() => {
//               setOtpVerified(true);
//               setStep(3);
//             }}
//           />
//         )}


//         {step === 3 && (
//           <StepDetails
//             form={form}
//             setForm={setForm}
//             otpVerified={otpVerified}
//             onBack={() => setStep(2)}
//           />
//         )}

//         <p className="text-[#90abcb] text-[14px] pt-[8px] text-center">
//           Already have an account?{" "}
//           <a href="/login" className="underline hover:text-white">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import StepEmail from "../components/signup/StepEmail";
import StepDetails from "../components/signup/StepDetails";

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    role: "user",
    vehicleNo: "",
    licenseNo: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div
      className="relative flex w-full min-h-screen items-center justify-center bg-[#101923] px-[20px]"
      style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
    >
      <div className="w-full max-w-[400px] flex flex-col py-[20px]">
        <h2 className="text-white text-[28px] font-bold text-center pb-[20px]">
          Create Account
        </h2>

        {step === 1 && (
          <StepEmail form={form} setForm={setForm} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <StepDetails
            form={form}
            setForm={setForm}
            otpVerified={true} // ✅ always true now
            onBack={() => setStep(1)}
          />
        )}

        <p className="text-[#90abcb] text-[14px] pt-[8px] text-center">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-white">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
