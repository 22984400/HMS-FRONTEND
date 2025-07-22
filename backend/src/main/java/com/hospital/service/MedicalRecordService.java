package com.hospital.service;

import com.hospital.dto.MedicalRecordRequest;
import com.hospital.entity.MedicalRecord;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.repository.MedicalRecordRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordRepository.findAll();
    }

    public Optional<MedicalRecord> getMedicalRecordById(Long id) {
        return medicalRecordRepository.findById(id);
    }

    public List<MedicalRecord> getMedicalRecordsByPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return medicalRecordRepository.findByPatientOrderByRecordDateDesc(patient);
    }

    public List<MedicalRecord> getMedicalRecordsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return medicalRecordRepository.findByDoctor(doctor);
    }

    public MedicalRecord createMedicalRecord(MedicalRecordRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        MedicalRecord record = new MedicalRecord(
                patient, doctor, request.getRecordDate(),
                request.getDiagnosis(), request.getTreatment()
        );
        record.setMedications(request.getMedications());
        record.setNotes(request.getNotes());
        record.setFollowUpDate(request.getFollowUpDate());

        return medicalRecordRepository.save(record);
    }

    public MedicalRecord updateMedicalRecord(Long id, MedicalRecord recordDetails) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found"));

        record.setRecordDate(recordDetails.getRecordDate());
        record.setDiagnosis(recordDetails.getDiagnosis());
        record.setTreatment(recordDetails.getTreatment());
        record.setMedications(recordDetails.getMedications());
        record.setNotes(recordDetails.getNotes());
        record.setFollowUpDate(recordDetails.getFollowUpDate());

        return medicalRecordRepository.save(record);
    }

    public void deleteMedicalRecord(Long id) {
        medicalRecordRepository.deleteById(id);
    }
}