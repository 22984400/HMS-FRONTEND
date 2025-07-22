import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';

export const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-gray-600">This is the User Management section.</p>
      <Button onClick={() => navigate('/settings')} variant="outline">
        ← Back to Settings
      </Button>
    </div>
  );
};
