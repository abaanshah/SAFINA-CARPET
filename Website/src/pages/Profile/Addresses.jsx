// FILE: src/pages/Profile/Addresses.jsx (New File)
import React from 'react';
import { MapPin } from 'lucide-react';

const Addresses = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">My Addresses</h2>
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <MapPin size={48} className="mx-auto text-gray-400" />
        <p className="mt-4 text-gray-600">You have no saved addresses.</p>
        <button className="mt-4 bg-red-800 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-900 transition">
          Add New Address
        </button>
      </div>
    </div>
  );
};
export default Addresses;