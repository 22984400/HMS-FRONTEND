// src/pages/Appointments.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Clock, UserCheck, Pencil } from 'lucide-react';
import { Appointment, Patient, Doctor } from '../types';
import { apiService } from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { format } from 'date-fns';
import { AppointmentForm } from '../components/appointments/AppointmentForm';

export const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsData, patientsData, doctorsData] = await Promise.all([
        apiService.getAppointments(),
        apiService.getPatients(),
        apiService.getDoctors()
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Omit<Appointment, 'id'>) => {
    if (editingAppointment) {
      await apiService.updateAppointment(editingAppointment.id, data);
    } else {
      await apiService.createAppointment(data);
    }
    setEditingAppointment(null);
    setShowForm(false);
    fetchData();
  };

  const getPatientName = (id: string) => patients.find(p => p.id === id)?.firstName + ' ' + patients.find(p => p.id === id)?.lastName || 'Unknown';
  const getDoctorName = (id: string) => doctors.find(d => d.id === id)?.firstName + ' ' + doctors.find(d => d.id === id)?.lastName || 'Unknown';

  const filtered = appointments.filter(a => {
    const term = searchTerm.toLowerCase();
    return getPatientName(a.patientId).toLowerCase().includes(term) || getDoctorName(a.doctorId).toLowerCase().includes(term);
  });

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments</p>
        </div>
        <Button onClick={() => { setEditingAppointment(null); setShowForm(true); }}>
          <Plus className="mr-2" /> Schedule Appointment
        </Button>
      </div>

      <Input placeholder="Search appointments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="bg-white rounded shadow">
        {filtered.map(app => (
          <div key={app.id} className="p-4 border-b flex justify-between">
            <div>
              <div className="font-bold">{getPatientName(app.patientId)}</div>
              <div className="text-sm text-gray-500">{getDoctorName(app.doctorId)}</div>
              <div className="text-sm">{format(new Date(app.date), 'MMM dd, yyyy')} at {app.time}</div>
            </div>
            <Button variant="ghost" onClick={() => { setEditingAppointment(app); setShowForm(true); }}>
              <Pencil size={16} className="mr-1" /> Edit
            </Button>
          </div>
        ))}
      </div>

      {showForm && (
        <AppointmentForm
          appointment={editingAppointment}
          patients={patients}
          doctors={doctors}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
