package com.hospital.service;

import com.hospital.entity.Patient;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient savePatient(Patient patient) {
        if (patient.getPassword() != null) {
            patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        }
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        patient.setName(patientDetails.getName());
        patient.setEmail(patientDetails.getEmail());
        patient.setPhone(patientDetails.getPhone());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setAddress(patientDetails.getAddress());
        patient.setEmergencyContact(patientDetails.getEmergencyContact());
        patient.setBloodType(patientDetails.getBloodType());
        patient.setAllergies(patientDetails.getAllergies());
        patient.setMedications(patientDetails.getMedications());
        patient.setMedicalHistory(patientDetails.getMedicalHistory());
        patient.setInsuranceProvider(patientDetails.getInsuranceProvider());
        patient.setInsurancePolicyNumber(patientDetails.getInsurancePolicyNumber());
        patient.setInsuranceGroupNumber(patientDetails.getInsuranceGroupNumber());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}