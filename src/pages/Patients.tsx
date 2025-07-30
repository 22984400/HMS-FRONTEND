import React, { useEffect, useState } from 'react';
import { Patient } from '../types';
import { apiService } from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { PatientForm } from '../components/patients/PatientForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtered, setFiltered] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await apiService.getPatients();
      setPatients(data);
      setFiltered(data);
    } catch (error) {
      console.error('❌ Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    const lower = query.toLowerCase();
    const filteredData = patients.filter(
      (p) =>
        p.firstName?.toLowerCase().includes(lower) ||
        p.lastName?.toLowerCase().includes(lower) ||
        p.phoneNumber?.includes(query)
    );
    setFiltered(filteredData);
  };

  const handleSave = async (savedPatient: Patient) => {
    try {
      if (savedPatient.id) {
        await apiService.updatePatient(savedPatient.id, savedPatient);
      } else {
        await apiService.createPatient(savedPatient);
      }
      await fetchPatients();
      setShowForm(false);
      setEditingPatient(null);
    } catch (error) {
      console.error('❌ Failed to save patient:', error);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await apiService.deletePatient(id);
      await fetchPatients();
    } catch (error) {
      console.error('❌ Failed to delete patient:', error);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 text-sm">Manage patient records and information</p>
        </div>
        <Button onClick={() => {
          setShowForm(true);
          setEditingPatient(null);
        }}>
          Add Patient
        </Button>
      </div>

      <Input
        placeholder="Search patients..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full max-w-md"
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">No patients found.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Date of Birth</th>
                <th className="px-4 py-3">Blood Type</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{patient.phoneNumber || '-'}</td>
                  <td className="px-4 py-2 text-gray-600">{patient.dateOfBirth || '-'}</td>
                  <td className="px-4 py-2 text-gray-600">{patient.bloodType || '-'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(patient)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="border p-6 mt-6 rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <PatientForm
            patient={editingPatient}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingPatient(null);
            }}
          />
        </div>
      )}
    </div>
  );
};
