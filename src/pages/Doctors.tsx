import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Doctor } from '../types';
import { apiService } from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { DoctorForm } from '../components/doctor/DoctorForm';

export const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await apiService.getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await apiService.deleteDoctor(id);
        setDoctors(doctors.filter(d => d.id !== id));
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const handleSaveDoctor = (savedDoctor: Doctor) => {
    setDoctors(prev =>
      prev.some(d => d.id === savedDoctor.id)
        ? prev.map(d => (d.id === savedDoctor.id ? savedDoctor : d))
        : [...prev, savedDoctor]
    );
    setShowForm(false);
    setEditingDoctor(null);
  };

  const filteredDoctors = doctors.filter(doctor =>
    `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600">Manage medical staff and their information</p>
        </div>
        <Button onClick={() => {
          setShowForm(true);
          setEditingDoctor(null);
        }}>
          <Plus size={20} className="mr-2" />
          Add Doctor
        </Button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {doctor.firstName[0]}{doctor.lastName[0]}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye size={16} />
                </button>
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    setEditingDoctor(doctor);
                    setShowForm(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {doctor.firstName} {doctor.lastName}
              </h3>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
              <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
              <p className="text-sm text-gray-500">{doctor.email}</p>
              <p className="text-sm text-gray-500">{doctor.phone}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="text-xs text-gray-500">
                  License: {doctor.licenseNumber}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <DoctorForm
          initialData={editingDoctor}
          onSave={handleSaveDoctor}
          onCancel={() => {
            setShowForm(false);
            setEditingDoctor(null);
          }}
        />
      )}
    </div>
  );
};
