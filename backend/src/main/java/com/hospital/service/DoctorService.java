package com.hospital.service;

import com.hospital.entity.Doctor;
import com.hospital.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
    return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
}

public List<Doctor> getDoctorsBySpecialization(String specialization) {
    return doctorRepository.findBySpecialization(specialization);
}


    public List<Doctor> getDoctorsByDepartment(String department) {
        return doctorRepository.findByDepartment(department);
    }

    public Doctor saveDoctor(Doctor doctor) {
    if (doctor.getPassword() != null) {
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
    }

    // Ensure role is set correctly
    doctor.setRole(Doctor.Role.DOCTOR);

    return doctorRepository.save(doctor);
}


    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setName(doctorDetails.getName());
        doctor.setEmail(doctorDetails.getEmail());
        doctor.setPhone(doctorDetails.getPhone());
        doctor.setSpecialization(doctorDetails.getSpecialization());
        doctor.setDepartment(doctorDetails.getDepartment());
        doctor.setLicenseNumber(doctorDetails.getLicenseNumber());
        doctor.setYearsOfExperience(doctorDetails.getYearsOfExperience());
        doctor.setConsultationFee(doctorDetails.getConsultationFee());
        doctor.setBio(doctorDetails.getBio());
        doctor.setEducation(doctorDetails.getEducation());
        doctor.setCertifications(doctorDetails.getCertifications());
        doctor.setLanguages(doctorDetails.getLanguages());

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    
}