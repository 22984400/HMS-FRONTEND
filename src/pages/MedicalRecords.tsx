// MedicalRecords.tsx
import React, { useEffect, useState } from 'react';
import { FileText, Search, Plus } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { apiService } from '../services/api';
import { MedicalRecord } from '../types';
import { MedicalRecordForm } from '../components/medical/MedicalRecordForm';

export const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadRecords = async () => {
    const data = await apiService.getMedicalRecords();
    setRecords(data);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // ✅ Accept record and save
  const handleRecordSaved = async (record: Omit<MedicalRecord, 'id' | 'createdAt'>) => {
    await apiService.createMedicalRecord(record);
    setIsFormOpen(false);
    loadRecords();
  };

  const filteredRecords = records.filter(record =>
    record.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
    record.notes?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">Patient medical history and records</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={20} className="mr-2" />
          Add Record
        </Button>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search records..."
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2">Patient ID</th>
                <th className="py-2">Doctor ID</th>
                <th className="py-2">Diagnosis</th>
                <th className="py-2">Treatment</th>
                <th className="py-2">Notes</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id} className="border-t">
                  <td className="py-2">{record.patientId}</td>
                  <td className="py-2">{record.doctorId}</td>
                  <td className="py-2">{record.diagnosis || '—'}</td>
                  <td className="py-2">{record.treatment || '—'}</td>
                  <td className="py-2">{record.notes || '—'}</td>
                  <td className="py-2">{new Date(record.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Medical Records Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Start by adding a new medical record. Once added, it will show up here.
          </p>
        </div>
      )}

      {isFormOpen && (
        <MedicalRecordForm onSave={(newRecord) => {
  setRecords(prev => [...prev, newRecord]);
  setShowForm(false);
}} />

      )}
    </div>
  );
};
