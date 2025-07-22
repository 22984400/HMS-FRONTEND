package com.hospital.controller;

import com.hospital.repository.PatientRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillRepository billRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalPatients", patientRepository.count());
        stats.put("totalDoctors", doctorRepository.count());
        stats.put("todayAppointments", appointmentRepository.countByDate(LocalDate.now()));
        stats.put("pendingBills", billRepository.countByStatus("pending"));
        stats.put("appointmentTrends", appointmentRepository.findLast7DaysTrend());

        return stats;
    }
}
