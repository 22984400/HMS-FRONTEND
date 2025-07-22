import React, { useState } from 'react';
import { Doctor } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Select } from '../common/Select';

interface DoctorFormProps {
  onSave: (doctor: Omit<Doctor, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialData?: Doctor | null;
}

export const DoctorForm: React.FC<DoctorFormProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Omit<Doctor, 'id' | 'createdAt'>>(
    initialData || {
      firstName: '',
      lastName: '',
      specialization: '',
      email: '',
      phone: '',
      experience: 0,
      licenseNumber: '',
      isActive: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
        <Input label="Experience (years)" name="experience" type="number" value={formData.experience} onChange={handleChange} required />
      </div>

      <Input label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />

      <Select label="Status" name="isActive" value={formData.isActive ? 'true' : 'false'} onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </Select>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update Doctor' : 'Add Doctor'}</Button>
      </div>
    </form>
  );
};
