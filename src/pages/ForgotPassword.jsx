import React from "react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600">

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-200">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <input
          placeholder="Enter Email"
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300"
        />

        <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white w-full p-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
          Send Reset Link
        </button>

      </div>

    </div>
  );
}