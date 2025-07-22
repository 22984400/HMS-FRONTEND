// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, CreditCard } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { AppointmentChart } from '../components/dashboard/AppointmentChart';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { DashboardStats } from '../types';
import { apiService } from '../services/api';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        
        // Optional fallback mock stats (for dev/testing)
        setStats({
          totalPatients: 42,
          patientGrowth: 8,
          totalDoctors: 12,
          todayAppointments: 5,
          pendingBills: 4,
          appointmentTrends: [
            { date: '2025-07-01', count: 3 },
            { date: '2025-07-02', count: 4 },
            { date: '2025-07-03', count: 2 },
            { date: '2025-07-04', count: 6 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Hospital overview and key metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          trend={{ value: stats.patientGrowth, isPositive: stats.patientGrowth > 0 }}
          color="blue"
        />
        <StatsCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon={UserCheck}
          color="green"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={Calendar}
          color="yellow"
        />
        <StatsCard
          title="Pending Bills"
          value={stats.pendingBills}
          icon={CreditCard}
          color="red"
        />
      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentChart data={stats.appointmentTrends} />

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New patient registered - TCHEBE MBIAFEU</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Appointment scheduled with Dr. MERLIN</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Bill payment received - FCFA 150,000</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Appointment cancelled - Follow-up needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
