// ==========================================================
// FILE: src/pages/Profile/ProfileDetail.jsx (REDESIGNED)
// ==========================================================
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfileDetail = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Account Details</h2>
      <div className="space-y-6 text-lg">
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Full Name</label>
            <p className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-800">{user.name}</p>
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1 tracking-wider uppercase">Email Address</label>
            <p className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-800">{user.email}</p>
        </div>
        <div className="pt-4 border-t mt-8">
            <button className="bg-red-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-900 transition-transform transform hover:scale-105">
                Edit Profile
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;