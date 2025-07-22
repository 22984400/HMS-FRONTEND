import React, { useEffect, useState } from 'react';
import { MedicalRecord, Patient, Doctor } from '../../types';
import { apiService } from '../../services/api';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';

interface MedicalRecordFormProps {
  record?: MedicalRecord | null;
  onSave: (record: Omit<MedicalRecord, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({
  record,
  onSave,
  onClose,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [patientsData, doctorsData] = await Promise.all([
        apiService.getPatients(),
        apiService.getDoctors(),
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (record) {
      setPatientId(record.patientId);
      setDoctorId(record.doctorId);
      setDiagnosis(record.diagnosis || '');
      setTreatment(record.treatment || '');
      setNotes(record.notes || '');
    }
  }, [record]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      patientId,
      doctorId,
      diagnosis,
      treatment,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          {record ? 'Edit Medical Record' : 'Add Medical Record'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          >
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName}
              </option>
            ))}
          </Select>

          <Select
            label="Doctor"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.firstName} {d.lastName}
              </option>
            ))}
          </Select>

          <Input
            label="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />

          <Input
            label="Treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />

          <Textarea
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {record ? 'Update Record' : 'Save Record'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
