// src/components/appointments/AppointmentForm.tsx
import React, { useState } from 'react';
import { Appointment } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Select } from '../common/Select';

interface AppointmentFormProps {
  initialData?: Partial<Omit<Appointment, 'id' | 'createdAt'>>;
  onSave: (data: Omit<Appointment, 'id' | 'createdAt'>) => void;
  onCancel?: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData = {},
  onSave,
  onCancel,
}) => {
  const [patientId, setPatientId] = useState(initialData.patientId || '');
  const [doctorId, setDoctorId] = useState(initialData.doctorId || '');
  const [date, setDate] = useState(initialData.date || '');
  const [time, setTime] = useState(initialData.time || '');
  const [duration, setDuration] = useState(initialData.duration || 30);
  const [status, setStatus] = useState(initialData.status || 'scheduled');
  const [type, setType] = useState(initialData.type || 'consultation');
  const [notes, setNotes] = useState(initialData.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !doctorId || !date || !time) {
      alert('Please fill all required fields.');
      return;
    }
    onSave({ patientId, doctorId, date, time, duration, status, type, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Patient ID"
        value={patientId}
        onChange={e => setPatientId(e.target.value)}
        required
      />
      <Input
        label="Doctor ID"
        value={doctorId}
        onChange={e => setDoctorId(e.target.value)}
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <Input
        label="Time"
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      <Input
        label="Duration (minutes)"
        type="number"
        min={5}
        max={180}
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
      />
      <Select label="Status" value={status} onChange={e => setStatus(e.target.value)}>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </Select>
      <Select label="Type" value={type} onChange={e => setType(e.target.value)}>
        <option value="consultation">Consultation</option>
        <option value="follow-up">Follow-up</option>
        <option value="emergency">Emergency</option>
      </Select>
      <Input
        label="Notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <div className="flex space-x-4">
        <Button type="submit">Save</Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
