import { mockMedicalRecords } from '../data/mockData';

import { 
  Patient, 
  Doctor, 
  Appointment, 
  MedicalRecord, 
  Bill, 
  User, 
  DashboardStats 
} from '../types';
import {
  mockPatients,
  mockDoctors,
  mockAppointments,
  mockBills,
  mockUser,
  mockDashboardStats,
  mockMedicalRecords, 
} from '../data/mockData';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service - replace with actual API calls to Spring Boot backend
export const apiService = {
  // Authentication
  async login(username: string, password: string): Promise<{ user: User; token: string }> {
    await delay(1000);
    // Mock authentication - always returns success
    return {
      user: mockUser,
      token: 'mock-jwt-token'
    };
  },

  async logout(): Promise<void> {
    await delay(500);
    // Mock logout
  },

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(800);
    return mockDashboardStats;
  },

  // Patients
  async getPatients(): Promise<Patient[]> {
    await delay(1000);
    return mockPatients;
  },

  async getPatient(id: string): Promise<Patient | null> {
    await delay(500);
    return mockPatients.find(p => p.id === id) || null;
  },

  async createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    await delay(1000);
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPatients.push(newPatient);
    return newPatient;
  },

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient | null> {
    await delay(1000);
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockPatients[index] = {
      ...mockPatients[index],
      ...patient,
      updatedAt: new Date().toISOString()
    };
    return mockPatients[index];
  },

  async deletePatient(id: string): Promise<boolean> {
    await delay(800);
    const index = mockPatients.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockPatients.splice(index, 1);
    return true;
  },

  // Doctors
  async getDoctors(): Promise<Doctor[]> {
    await delay(1000);
    return mockDoctors;
  },

  async getDoctor(id: string): Promise<Doctor | null> {
    await delay(500);
    return mockDoctors.find(d => d.id === id) || null;
  },

  async createDoctor(doctor: Omit<Doctor, 'id' | 'createdAt'>): Promise<Doctor> {
    await delay(1000);
    const newDoctor: Doctor = {
      ...doctor,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockDoctors.push(newDoctor);
    return newDoctor;
  },

  async updateDoctor(id: string, doctor: Partial<Doctor>): Promise<Doctor | null> {
    await delay(1000);
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    mockDoctors[index] = { ...mockDoctors[index], ...doctor };
    return mockDoctors[index];
  },

  async deleteDoctor(id: string): Promise<boolean> {
    await delay(800);
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index === -1) return false;
    
    mockDoctors.splice(index, 1);
    return true;
  },

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    await delay(1000);
    return mockAppointments;
  },

  async getAppointment(id: string): Promise<Appointment | null> {
    await delay(500);
    return mockAppointments.find(a => a.id === id) || null;
  },

  async createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
    await delay(1000);
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment | null> {
    await delay(1000);
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    mockAppointments[index] = { ...mockAppointments[index], ...appointment };
    return mockAppointments[index];
  },

  async deleteAppointment(id: string): Promise<boolean> {
    await delay(800);
    const index = mockAppointments.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    mockAppointments.splice(index, 1);
    return true;
  },

  // Bills
  async getBills(): Promise<Bill[]> {
    await delay(1000);
    return mockBills;
  },

  async getBill(id: string): Promise<Bill | null> {
    await delay(500);
    return mockBills.find(b => b.id === id) || null;
  },

  async createBill(bill: Omit<Bill, 'id' | 'createdAt'>): Promise<Bill> {
    await delay(1000);
    const newBill: Bill = {
      ...bill,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockBills.push(newBill);
    return newBill;
  },

  async updateBill(id: string, bill: Partial<Bill>): Promise<Bill | null> {
    await delay(1000);
    const index = mockBills.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    mockBills[index] = { ...mockBills[index], ...bill };
    return mockBills[index];
  },

  async deleteBill(id: string): Promise<boolean> {
    await delay(800);
    const index = mockBills.findIndex(b => b.id === id);
    if (index === -1) return false;

    mockBills.splice(index, 1);
    return true;
  },

// Medical Records
async getMedicalRecords(): Promise<MedicalRecord[]> {
  await delay(1000);
  return mockMedicalRecords;
},

async getMedicalRecord(id: string): Promise<MedicalRecord | null> {
  await delay(500);
  return mockMedicalRecords.find(m => m.id === id) || null;
},

async createMedicalRecord(record: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord> {
  await delay(1000);
  const newRecord: MedicalRecord = {
    ...record,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  mockMedicalRecords.push(newRecord);
  return newRecord;
},

async deleteMedicalRecord(id: string): Promise<boolean> {
  await delay(500);
  const index = mockMedicalRecords.findIndex(r => r.id === id);
  if (index === -1) return false;
  mockMedicalRecords.splice(index, 1);
  return true;
}

};