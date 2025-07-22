import React, { useState } from 'react';
import { Patient } from '../../types';
import { apiService } from '../../services/api';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface PatientFormProps {
  patient?: Patient | null;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSave,
  onCancel,
  readOnly = false
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    email: patient?.email || '',
    phoneNumber: patient?.phoneNumber || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || 'male',
    address: patient?.address || '',
    bloodType: patient?.bloodType || '',
    emergencyContactName: patient?.emergencyContact?.name || '',
    emergencyContactPhone: patient?.emergencyContact?.phone || '',
    emergencyContactRelationship: patient?.emergencyContact?.relationship || '',
    insuranceId: patient?.insuranceId || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const patientData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        address: formData.address,
        bloodType: formData.bloodType,
        emergencyContact: {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
          relationship: formData.emergencyContactRelationship
        },
        insuranceId: formData.insuranceId,
        medicalHistory: patient?.medicalHistory || []
      };

      let savedPatient: Patient;
      if (patient?.id) {
        savedPatient = await apiService.updatePatient(patient.id, patientData);
      } else {
        savedPatient = await apiService.createPatient(patientData);
      }

      onSave(savedPatient);
    } catch (error) {
      console.error('❌ Error saving patient:', error);
      alert('Failed to save patient. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <Input label="Phone" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
        <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
        <Input label="Blood Type" name="bloodType" value={formData.bloodType} onChange={handleChange} placeholder="e.g., A+, O-, B+" required />
      </div>

      <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
          <Input label="Phone" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleChange} required />
          <Input label="Relationship" name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} placeholder="e.g., Spouse, Parent" required />
        </div>
      </div>

      <Input label="Insurance ID" name="insuranceId" value={formData.insuranceId} onChange={handleChange} placeholder="Optional" />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>
          {loading ? <LoadingSpinner size="sm" /> : null}
          {patient?.id ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};
