// src/pages/Settings.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Bell, Database } from 'lucide-react';
import { Button } from '../components/common/Button';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage system preferences and configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <User size={24} className="text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Manage user accounts, roles, and permissions for hospital staff.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate('/settings/users')}>
            Manage Users
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Shield size={24} className="text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Configure security settings, password policies, and access controls.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate('/settings/security')}>
            Security Settings
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Bell size={24} className="text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Configure notification settings for appointments, reminders, and alerts.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate('/settings/notifications')}>
            Notification Settings
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Database size={24} className="text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Backup, restore, and export hospital data and reports.
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate('/settings/data')}>
            Data Settings
          </Button>
        </div>
      </div>
    </div>
  );
};
