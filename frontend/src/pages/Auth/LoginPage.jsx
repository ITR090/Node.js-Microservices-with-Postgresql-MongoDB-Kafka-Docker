import React from "react";
// import { FaGoogle, FaApple, FaPhone } from "react-icons/fa";

const LoginPage =() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        
        {/* Logo / Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue
        </p>

        {/* Phone Login */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Phone Number</label>
          <div className="flex items-center border rounded-lg mt-1 px-3 py-2">
            {/* <FaPhone className="text-gray-400 mr-2" /> */}
            <input
              type="tel"
              placeholder="+966 5xxxxxxxx"
              className="w-full outline-none"
            />
          </div>
          <button className="w-full bg-black text-white py-2 rounded-lg mt-3 hover:opacity-90">
            Continue with Phone
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">
            OR continue with
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button className="flex items-center justify-center w-full border rounded-lg py-2 hover:bg-gray-50">
            {/* <FaGoogle className="text-red-500 mr-2" /> */}
            Sign in with Google
          </button>

          <button className="flex items-center justify-center w-full border rounded-lg py-2 hover:bg-gray-50">
            {/* <FaApple className="mr-2 text-black" /> */}
            Sign in with Apple
          </button>
          
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default LoginPage;