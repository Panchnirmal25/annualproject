import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="bg-white shadow-lg p-8 rounded-xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="mb-4 text-gray-700">You do not have permission to view this page.</p>
        <Link to="/" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go Home</Link>
      </div>
    </div>
  );
}
