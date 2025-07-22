import { Patient, Doctor, Appointment, MedicalRecord, Bill, User, DashboardStats } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'TCHEBE',
    lastName: 'MBIAFEU',
    email: 'tresor.duplex@email.com',
    phone: '+237 690617752',
    dateOfBirth: '2006-01-01',
    gender: 'male',
    address: 'Essos, Yaounde',
    bloodType: 'A+',
    emergencyContact: {
      name: 'TCHEBE MBIAFEU',
      phone: '237 690617752',
      relationship: 'Spouse'
    },
    insuranceId: 'INS001234',
    medicalHistory: [],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    firstName: 'NOUDJA',
    lastName: 'CARINE',
    email: 'carine.noudja@email.com',
    phone: '+237 69980176',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    address: 'Bepanda Omnisport, Douala',
    bloodType: 'B-',
    emergencyContact: {
      name: 'Noudja Carine',
      phone: '+237 690617752',
      relationship: 'Mother'
    },
    insuranceId: 'INS005678',
    medicalHistory: [],
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    firstName: 'Dr. KUIPO',
    lastName: 'JUDE',
    email: 'kuipo.jude@hospital.com',
    phone: '+237 696152633',
    specialization: 'Cardiology',
    experience: 12,
    education: 'MD from Harvard Medical School',
    licenseNumber: 'MD123456',
    schedule: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '09:00', endTime: '15:00', isAvailable: true }
    ],
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z'
  },
  {
    id: '2',
    firstName: 'Dr. Merlin',
    lastName: 'Junior',
    email: 'merlin.jr@hospital.com',
    phone: '+237 691624048',
    specialization: 'Orthopedics',
    experience: 8,
    education: 'MD from Johns Hopkins University',
    licenseNumber: 'MD789012',
    schedule: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '08:00', endTime: '14:00', isAvailable: true }
    ],
    isActive: true,
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: '2024-01-20',
    time: '10:00',
    duration: 30,
    status: 'scheduled',
    type: 'consultation',
    notes: 'Regular checkup',
    createdAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: '2024-01-21',
    time: '14:00',
    duration: 45,
    status: 'scheduled',
    type: 'consultation',
    notes: 'Knee pain assessment',
    createdAt: '2024-01-16T09:00:00Z'
  }
];

export const mockBills: Bill[] = [
  {
    id: '1',
    patientId: '1',
    appointmentId: '1',
    amount: 250.00,
    description: 'Consultation - Cardiology',
    status: 'pending',
    dueDate: '2024-02-20',
    createdAt: '2024-01-20T15:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    appointmentId: '2',
    amount: 300.00,
    description: 'Consultation - Orthopedics',
    status: 'paid',
    dueDate: '2024-02-21',
    paidDate: '2024-01-21T16:00:00Z',
    createdAt: '2024-01-21T15:00:00Z'
  }
];

export const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@hospital.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z'
};

export const mockDashboardStats: DashboardStats = {
  totalPatients: 245,
  totalDoctors: 12,
  todayAppointments: 18,
  pendingBills: 32,
  totalRevenue: 125000,
  patientGrowth: 8.5,
  appointmentTrends: [
    { month: 'Jan', appointments: 120 },
    { month: 'Feb', appointments: 135 },
    { month: 'Mar', appointments: 152 },
    { month: 'Apr', appointments: 148 },
    { month: 'May', appointments: 165 },
    { month: 'Jun', appointments: 180 }
  ]
};

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    diagnosis: 'Hypertension',
    treatment: 'Lifestyle changes and medication',
    date: '2024-01-20',
    notes: 'Patient advised to reduce salt intake and monitor BP.',
    createdAt: '2024-01-20T12:00:00Z'
  }
];
