import React, { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // ✅ use your AuthContext

// 🔹 Input with Icon
const InputField: React.FC<{
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}> = ({ type = "text", placeholder, value, onChange, icon }) => (
  <div className="flex flex-col w-full px-[10px] py-[8px] relative">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex w-full rounded-lg text-white border-none bg-[#223449] h-[52px] placeholder:text-[#90abcb] pl-[40px] pr-[16px] text-[16px] font-normal focus:outline-0 focus:ring-0"
    />
    <span className="absolute left-[20px] top-1/2 transform -translate-y-1/2 text-[#90abcb]">
      {icon}
    </span>
  </div>
);

// 🔹 Password Input with toggle + icon
const PasswordInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col w-full px-[10px] py-[8px] relative">
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        value={value}
        onChange={onChange}
        className="flex w-full rounded-lg text-white border-none bg-[#223449] h-[52px] placeholder:text-[#90abcb] pl-[40px] pr-[40px] text-[16px] font-normal focus:outline-0 focus:ring-0"
      />
      <span className="absolute left-[20px] top-1/2 transform -translate-y-1/2 text-[#90abcb]">
        <Lock size={20} />
      </span>
      <button
        type="button"
        className="absolute right-[20px] top-1/2 transform -translate-y-1/2 text-[#90abcb] hover:text-white"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

// 🔹 Button with loader
const ButtonWithLoader: React.FC<{
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
}> = ({ onClick, loading, children }) => (
  <div className="flex w-full px-[10px] py-[12px]">
    <button
      onClick={onClick}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-lg h-[48px] px-[16px] bg-[#0d78f2] text-white text-[16px] font-bold disabled:opacity-70"
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  </div>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth(); // ✅ from context

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await signIn(email, password); // ✅ call API
      toast.success("Logged in successfully 🎉");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex w-full min-h-screen items-center justify-center bg-[#101923] px-[20px] font-sans">
      <div className="w-full max-w-[400px] flex flex-col py-[20px] items-center">
        <h2 className="text-white text-[28px] font-bold leading-tight text-center pb-[20px]">
          Log In
        </h2>

        {/* Email */}
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={20} />}
        />

        {/* Password */}
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

        {/* Login Button */}
        <ButtonWithLoader onClick={handleLogin} loading={loading}>
          Log In
        </ButtonWithLoader>

        {/* Sign Up link */}
        <p className="text-[#90abcb] text-[14px] pt-[8px] text-center">
          Don't have an account?{" "}
          <a href="/signup" className="underline hover:text-white">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
