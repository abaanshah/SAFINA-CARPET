// FILE: src/pages/Profile/Settings.jsx (New File)
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Account Settings</h2>
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <SettingsIcon size={48} className="mx-auto text-gray-400" />
        <p className="mt-4 text-gray-600">Account settings and preferences will be available here soon.</p>
      </div>
    </div>
  );
};
export default Settings;